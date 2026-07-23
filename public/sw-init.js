// Single owner for service-worker registration and update checks.
console.log('[SW-Init] Initializing service worker system...');

window.swInitState = window.swInitState || {
  registered: false,
  ready: false,
  pushManagerReady: false,
  initializationPromise: null,
  lastUpdateCheck: 0
};

const UPDATE_CHECK_THROTTLE_MS = 6 * 60 * 60 * 1000;

async function checkForServiceWorkerUpdate(force = false) {
  if (!('serviceWorker' in navigator)) return;

  const now = Date.now();
  if (!force && now - window.swInitState.lastUpdateCheck < UPDATE_CHECK_THROTTLE_MS) return;

  const registration = await navigator.serviceWorker.getRegistration('/');
  if (!registration) return;

  window.swInitState.lastUpdateCheck = now;
  try {
    await registration.update();
  } catch (error) {
    console.warn('[SW-Init] Update check failed:', error.message);
  }
}

async function initializeServiceWorkerSystem() {
  if (!('serviceWorker' in navigator)) {
    console.warn('[SW-Init] Service Worker not supported');
    return;
  }

  if (window.swInitState.initializationPromise) {
    return window.swInitState.initializationPromise;
  }

  window.swInitState.initializationPromise = (async () => {
    try {
      const isDev = location.hostname === 'localhost' || location.hostname.includes('ngrok');
      const swPath = isDev ? '/sw-wrapper.js' : '/sw.js';
      const registration = await navigator.serviceWorker.register(swPath, {
        scope: '/',
        updateViaCache: 'none'
      });

      window.swInitState.registered = true;

      if (registration.active) {
        registration.active.postMessage({ type: 'LOAD_PUSH_HANDLERS' });
      }

      await navigator.serviceWorker.ready;
      window.swInitState.ready = true;

      // Remove legacy runtime caches that may contain authenticated/dynamic API data.
      if ('caches' in window) {
        await Promise.all([
          caches.delete('apis'),
          caches.delete('api-cache')
        ]);
      }

      if (window.PushNotificationManager) {
        try {
          await window.PushNotificationManager.initialize();
          window.swInitState.pushManagerReady = true;
        } catch (error) {
          console.warn('[SW-Init] Push manager init failed:', error.message);
        }
      } else {
        window.setTimeout(() => {
          if (window.PushNotificationManager) {
            window.PushNotificationManager.initialize();
          }
        }, 2000);
      }

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller && !isDev) {
            showUpdateNotification();
          }
        });
      });

      // Registration already performs the initial update check. Record it so focus
      // and online events cannot generate another request immediately.
      window.swInitState.lastUpdateCheck = Date.now();
      console.log('[SW-Init] Service worker ready');
    } catch (error) {
      window.swInitState.initializationPromise = null;
      console.error('[SW-Init] Initialization failed:', error);
    }
  })();

  return window.swInitState.initializationPromise;
}

function showUpdateNotification() {
  if (document.getElementById('maskio-sw-update')) return;

  const notification = document.createElement('div');
  notification.id = 'maskio-sw-update';
  notification.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:#252525;color:white;padding:16px 24px;border-radius:12px;z-index:10000;font-family:system-ui;text-align:center;';
  notification.innerHTML = '<div style="font-weight:bold;margin-bottom:8px">Aggiornamento disponibile</div><button type="button" style="background:white;color:#252525;border:0;padding:8px 20px;border-radius:6px;font-weight:bold;cursor:pointer">Aggiorna ora</button>';
  notification.querySelector('button').addEventListener('click', () => window.location.reload());
  document.body.appendChild(notification);
  window.setTimeout(() => notification.remove(), 10000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeServiceWorkerSystem, { once: true });
} else {
  void initializeServiceWorkerSystem();
}

window.addEventListener('online', () => void checkForServiceWorkerUpdate());
window.addEventListener('focus', () => void checkForServiceWorkerUpdate());

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') void checkForServiceWorkerUpdate();
});
