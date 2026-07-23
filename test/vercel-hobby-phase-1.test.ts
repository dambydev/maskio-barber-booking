import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { isAuthorizedCronRequest } from '../src/lib/cron-auth.ts';
import { withPostgresAdvisoryLock } from '../src/lib/postgres-advisory-lock.ts';
import { startVisiblePolling } from '../src/lib/visible-polling.ts';
import { normalizeBookingsPayload } from '../src/lib/normalize-bookings.ts';
import { BOOKING_CHANGED_EVENT } from '../src/lib/booking-events.ts';

class VisibilityTarget extends EventTarget {
  visibilityState: DocumentVisibilityState = 'visible';
}

class FakeAdvisoryClient {
  locked = false;
  unlocks = 0;

  async query(query: string) {
    if (query.includes('pg_try_advisory_lock')) {
      if (this.locked) return { rows: [{ locked: false }] };
      this.locked = true;
      return { rows: [{ locked: true }] };
    }
    if (query.includes('pg_advisory_unlock')) {
      this.locked = false;
      this.unlocks++;
    }
    return { rows: [] };
  }
}

test('cron authorization rejects missing/wrong secrets and accepts the configured secret', () => {
  assert.equal(isAuthorizedCronRequest(null, 'secret'), false);
  assert.equal(isAuthorizedCronRequest('Bearer wrong', 'secret'), false);
  assert.equal(isAuthorizedCronRequest('Bearer secret', 'secret'), true);
  assert.equal(isAuthorizedCronRequest('Bearer secret', undefined), false);
});

test('advisory lock permits only one concurrent daily-update run', async () => {
  const client = new FakeAdvisoryClient();
  let releaseFirst!: () => void;
  const gate = new Promise<void>((resolve) => { releaseFirst = resolve; });
  let workCount = 0;

  const first = withPostgresAdvisoryLock(client, 'daily', async () => {
    workCount++;
    await gate;
    return 'done';
  });
  await new Promise((resolve) => setImmediate(resolve));
  const second = await withPostgresAdvisoryLock(client, 'daily', async () => {
    workCount++;
    return 'duplicate';
  });

  assert.deepEqual(second, { acquired: false });
  assert.equal(workCount, 1);
  releaseFirst();
  assert.deepEqual(await first, { acquired: true, value: 'done' });
  assert.equal(client.unlocks, 1);
});

test('visible polling starts once, uses 30 seconds, pauses hidden, refreshes visible/mutation and cleans up', async () => {
  const documentTarget = new VisibilityTarget();
  const windowTarget = new EventTarget();
  let intervalCallback: (() => void) | undefined;
  let intervalMs = 0;
  let cleared = false;
  let calls = 0;
  let release!: () => void;

  const stop = startVisiblePolling({
    intervalMs: 30_000,
    eventName: BOOKING_CHANGED_EVENT,
    documentRef: documentTarget as any,
    windowRef: windowTarget as any,
    setIntervalFn: ((callback: () => void, ms: number) => {
      intervalCallback = callback;
      intervalMs = ms;
      return 1 as any;
    }) as typeof setInterval,
    clearIntervalFn: (() => { cleared = true; }) as typeof clearInterval,
    poll: async (signal) => {
      calls++;
      await new Promise<void>((resolve) => {
        release = resolve;
        signal.addEventListener('abort', () => resolve(), { once: true });
      });
    },
  });

  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(calls, 1);
  assert.equal(intervalMs, 30_000);

  intervalCallback?.();
  windowTarget.dispatchEvent(new Event(BOOKING_CHANGED_EVENT));
  assert.equal(calls, 1, 'overlapping requests are deduplicated');
  release();
  await new Promise((resolve) => setImmediate(resolve));

  documentTarget.visibilityState = 'hidden';
  intervalCallback?.();
  assert.equal(calls, 1, 'hidden tabs do not poll');

  documentTarget.visibilityState = 'visible';
  documentTarget.dispatchEvent(new Event('visibilitychange'));
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(calls, 2, 'becoming visible refreshes immediately');

  stop();
  assert.equal(cleared, true);
  release();
  windowTarget.dispatchEvent(new Event(BOOKING_CHANGED_EVENT));
  assert.equal(calls, 2, 'cleanup prevents post-unmount polling');
});

test('booking service normalizer accepts the existing API response shape', () => {
  const bookings = normalizeBookingsPayload({
    bookings: [{
      id: 'booking-1',
      barber_id: 'barber-1',
      booking_date: '2026-07-24',
      booking_time: '10:00',
      service_name: 'Taglio',
      customer_name: 'Cliente',
      customer_email: 'client@example.test',
      customer_phone: '000',
      status: 'confirmed',
    }],
  });

  assert.equal(bookings.length, 1);
  assert.equal(bookings[0].barberId, 'barber-1');
  assert.equal(bookings[0].customerInfo.name, 'Cliente');
  assert.equal(bookings[0].services[0].name, 'Taglio');
});

test('source contracts remove browser cron, duplicate provider and privileged session update', async () => {
  const [layout, authLayout, auth, vercel, dailyManager] = await Promise.all([
    readFile('src/app/layout.tsx', 'utf8'),
    readFile('src/app/auth/layout.tsx', 'utf8'),
    readFile('src/lib/auth.ts', 'utf8'),
    readFile('vercel.json', 'utf8'),
    readFile('src/components/DailyUpdateManager.tsx', 'utf8').catch(() => ''),
  ]);

  assert.equal(layout.includes('DailyUpdateManager'), false);
  assert.equal(dailyManager, '');
  assert.equal(authLayout.includes('SessionProvider'), false);
  assert.equal(auth.includes('session?.role'), false);
  const vercelConfig = JSON.parse(vercel);
  assert.deepEqual(vercelConfig.crons, [{
    path: '/api/system/daily-update',
    schedule: '0 2 * * *',
  }]);
});

test('generated service worker has no generic API runtime cache', async () => {
  const sw = await readFile('public/sw.js', 'utf8');
  assert.equal(sw.includes('cacheName:"apis"'), false);
  assert.equal(sw.includes("cacheName:'apis'"), false);
  assert.equal(/pathname\.startsWith\(["']\/api\//.test(sw), false);
});
