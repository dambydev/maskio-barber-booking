import { randomUUID } from 'node:crypto';
import { Pool, type PoolClient } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';
import { isAuthorizedCronRequest } from '@/lib/cron-auth';
import { withPostgresAdvisoryLock } from '@/lib/postgres-advisory-lock';
import {
  getUniversalSlots,
  getAutoClosureType,
  getAutoClosureReason,
  type DayOfWeek,
} from '@/lib/universal-slots';
import { isManualExceptionalSchedule } from '@/lib/barber-schedule-exceptions';

export const runtime = 'nodejs';

const LOCK_KEY = 'maskio:daily-update:v1';

interface JobStats {
  datesAnalyzed: number;
  schedulesAdded: number;
  schedulesUpdated: number;
  schedulesSkippedUnchanged: number;
  autoClosuresCreated: number;
  sundaysSkipped: number;
  exceptionalOpeningsPreserved: number;
  oldSchedulesCleaned: number;
  activeBarbersCount: number;
}

async function isBarberClosedOnDay(client: PoolClient, barberEmail: string, dayOfWeek: number) {
  const result = await client.query(
    'SELECT closed_days FROM barber_recurring_closures WHERE barber_email = $1',
    [barberEmail],
  );

  if (result.rows.length === 0) return false;
  const closedDays = JSON.parse(result.rows[0].closed_days);
  return Array.isArray(closedDays) && closedDays.includes(dayOfWeek);
}

async function createAutoClosureIfNeeded(
  client: PoolClient,
  barberEmail: string,
  dateString: string,
  dayOfWeek: DayOfWeek,
): Promise<boolean> {
  const closureType = getAutoClosureType(barberEmail, dayOfWeek);
  if (!closureType) return false;

  const existing = await client.query(
    `SELECT id FROM barber_closures
     WHERE barber_email = $1 AND closure_date = $2 AND closure_type = $3
     LIMIT 1`,
    [barberEmail, dateString, closureType],
  );
  if (existing.rows.length > 0) return false;

  const removed = await client.query(
    `SELECT id FROM barber_removed_auto_closures
     WHERE barber_email = $1 AND closure_date = $2 AND closure_type = $3
     LIMIT 1`,
    [barberEmail, dateString, closureType],
  );
  if (removed.rows.length > 0) return false;

  await client.query(
    `INSERT INTO barber_closures (
       barber_email, closure_date, closure_type, reason, created_by, created_at, updated_at
     ) VALUES ($1, $2, $3, $4, 'system-auto', NOW(), NOW())`,
    [barberEmail, dateString, closureType, getAutoClosureReason(barberEmail, closureType)],
  );
  return true;
}

async function runDailyUpdate(client: PoolClient, now: Date): Promise<JobStats> {
  const barbersResult = await client.query(
    'SELECT id, email FROM barbers WHERE is_active = true',
  );
  const barbers = barbersResult.rows;

  const stats: JobStats = {
    datesAnalyzed: 0,
    schedulesAdded: 0,
    schedulesUpdated: 0,
    schedulesSkippedUnchanged: 0,
    autoClosuresCreated: 0,
    sundaysSkipped: 0,
    exceptionalOpeningsPreserved: 0,
    oldSchedulesCleaned: 0,
    activeBarbersCount: barbers.length,
  };

  for (let i = 0; i < 60; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);
    const dateString = date.toISOString().split('T')[0];
    const dayOfWeek = date.getDay() as DayOfWeek;

    if (dayOfWeek === 0) {
      stats.sundaysSkipped++;
      continue;
    }

    stats.datesAnalyzed++;

    for (const barber of barbers) {
      const slotsForDay = getUniversalSlots(dayOfWeek);
      const desiredSlots = JSON.stringify(slotsForDay);
      const isRecurringClosed = await isBarberClosedOnDay(client, barber.email, dayOfWeek);
      const desiredDayOff = slotsForDay.length === 0 || isRecurringClosed;

      const existingResult = await client.query(
        `SELECT id, available_slots, unavailable_slots, day_off, created_at, updated_at
         FROM barber_schedules WHERE barber_id = $1 AND date = $2 LIMIT 1`,
        [barber.id, dateString],
      );

      if (await createAutoClosureIfNeeded(client, barber.email, dateString, dayOfWeek)) {
        stats.autoClosuresCreated++;
      }

      if (existingResult.rows.length === 0) {
        await client.query(
          `INSERT INTO barber_schedules
             (barber_id, date, available_slots, unavailable_slots, day_off)
           VALUES ($1, $2, $3, $4, $5)`,
          [barber.id, dateString, desiredSlots, JSON.stringify([]), desiredDayOff],
        );
        stats.schedulesAdded++;
        continue;
      }

      const currentSchedule = existingResult.rows[0];
      const exceptionalOpening =
        !currentSchedule.day_off &&
        isRecurringClosed &&
        isManualExceptionalSchedule(currentSchedule);

      if (exceptionalOpening) {
        stats.exceptionalOpeningsPreserved++;
        continue;
      }

      const updateResult = await client.query(
        `UPDATE barber_schedules
         SET available_slots = $1, day_off = $2
         WHERE barber_id = $3 AND date = $4
           AND (available_slots IS DISTINCT FROM $1 OR day_off IS DISTINCT FROM $2)`,
        [desiredSlots, desiredDayOff, barber.id, dateString],
      );

      if ((updateResult.rowCount ?? 0) > 0) stats.schedulesUpdated++;
      else stats.schedulesSkippedUnchanged++;
    }
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const cleanup = await client.query(
    'DELETE FROM barber_schedules WHERE date < $1',
    [yesterday.toISOString().split('T')[0]],
  );
  stats.oldSchedulesCleaned = cleanup.rowCount ?? 0;

  return stats;
}

async function handleDailyUpdate(request: NextRequest) {
  if (!isAuthorizedCronRequest(request.headers.get('authorization'), process.env.CRON_SECRET)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const runId = randomUUID();
  const startedAt = Date.now();
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  let client: PoolClient | undefined;

  console.info(JSON.stringify({ event: 'daily_update_started', runId, source: 'vercel_cron' }));

  try {
    client = await pool.connect();
    const now = new Date();
    const lockedRun = await withPostgresAdvisoryLock(client, LOCK_KEY, () => runDailyUpdate(client!, now));

    if (!lockedRun.acquired) {
      console.info(JSON.stringify({ event: 'daily_update_skipped', runId, reason: 'already_running' }));
      return NextResponse.json({ success: true, skipped: true, reason: 'already_running', runId });
    }

    const statistics = lockedRun.value;
    const durationMs = Date.now() - startedAt;

    console.info(JSON.stringify({
      event: 'daily_update_completed',
      runId,
      source: 'vercel_cron',
      durationMs,
      ...statistics,
    }));

    return NextResponse.json({
      success: true,
      runId,
      durationMs,
      statistics,
      dateRange: {
        from: now.toISOString().split('T')[0],
        to: new Date(now.getTime() + 59 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
    });
  } catch (error) {
    console.error(JSON.stringify({
      event: 'daily_update_failed',
      runId,
      durationMs: Date.now() - startedAt,
      error: error instanceof Error ? error.message : 'unknown_error',
    }));
    return NextResponse.json({ success: false, runId, error: 'Daily update failed' }, { status: 500 });
  } finally {
    client?.release();
    await pool.end();
  }
}

// Vercel Cron invokes the configured path with GET and automatically supplies CRON_SECRET.
export const GET = handleDailyUpdate;
// Kept for authorized manual verification only; browser clients no longer call this route.
export const POST = handleDailyUpdate;
