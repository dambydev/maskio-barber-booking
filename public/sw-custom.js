// Service Worker con Workbox per Push Notifications
// NOTA: Non possiamo usare import ESM nei Service Workers, usiamo importScripts

// Importa Workbox runtime
importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');

if (workbox) {
  console.log('✅ Workbox loaded');
  
  // Precache configuration
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);
  
  // Le API possono essere personali o mutabili: usa sempre la rete, senza fallback cache.
  workbox.routing.registerRoute(
    /^https?:\/\/.*\/api\/.*/,
    new workbox.strategies.NetworkOnly()
  );
  
  // 3. Cache-First per risorse statiche
  workbox.routing.registerRoute(
    /\.(?:js|css|png|jpg|jpeg|svg|gif|webp|avif|ico|woff|woff2|ttf|eot)$/,
    new workbox.strategies.CacheFirst({
      cacheName: 'static-resources',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 1000,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        }),
      ],
    })
  );
  
  // 4. StaleWhileRevalidate per pagine
  workbox.routing.registerRoute(
    ({ request }) => request.mode === 'navigate',
    new workbox.strategies.NetworkFirst({
      cacheName: 'pages-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24,
        }),
      ],
    })
  );
  
} else {
  console.error('❌ Workbox failed to load');
}

console.log('🔔 [Custom SW] Push notification handlers loading...');

// Handler per le notifiche push
self.addEventListener('push', function(event) {
  console.log('🚨 [Push Event] Received!', event);
  
  let notificationData = {
    title: '🔔 Maskio Barber Concept',
    body: 'Hai una nuova notifica',
    icon: '/icone/predefinita/192x192.png',
    badge: '/icone/predefinita/32x32.png',
    tag: 'maskio-notification',
    requireInteraction: false,
    data: {
      url: '/area-personale',
      timestamp: Date.now()
    }
  };

  // Parse del payload
  if (event.data) {
    try {
      const payload = event.data.json();
      console.log('📦 [Push] Payload:', payload);
      notificationData = {
        title: payload.title || notificationData.title,
        body: payload.body || notificationData.body,
        icon: payload.icon || notificationData.icon,
        badge: payload.badge || notificationData.badge,
        tag: payload.tag || notificationData.tag,
        requireInteraction: payload.requireInteraction || false,
        data: payload.data || notificationData.data,
        actions: payload.actions || []
      };
    } catch (error) {
      console.error('❌ [Push] Error parsing:', error);
      try {
        notificationData.body = event.data.text();
      } catch (e) {
        console.error('❌ [Push] Could not read as text:', e);
      }
    }
  }

  console.log('📱 [Push] Showing notification:', notificationData.title);

  event.waitUntil(
    self.registration.showNotification(notificationData.title, {
      body: notificationData.body,
      icon: notificationData.icon,
      badge: notificationData.badge,
      tag: notificationData.tag,
      requireInteraction: notificationData.requireInteraction,
      data: notificationData.data,
      actions: notificationData.actions,
      silent: false,
      renotify: true
    }).then(() => {
      console.log('✅ [Push] Notification shown successfully');
    }).catch((error) => {
      console.error('❌ [Push] Error showing notification:', error);
    })
  );
});

// Handler per il click sulla notifica
self.addEventListener('notificationclick', function(event) {
  console.log('👆 [Notification Click]', event.action);
  
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      // Cerca una finestra già aperta
      for (const client of clientList) {
        if ('focus' in client) {
          return client.focus().then(() => {
            if ('navigate' in client) {
              return client.navigate(urlToOpen);
            }
          });
        }
      }
      // Apri nuova finestra
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// Handler per la chiusura della notifica
self.addEventListener('notificationclose', function(event) {
  console.log('❌ [Notification] Closed:', event.notification.tag);
});

// Handler per messaggi dal client
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[SW] SKIP_WAITING richiesto');
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    console.log('[SW] CLEAR_CACHE richiesto');
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            console.log('[SW] Deleting cache:', cacheName);
            return caches.delete(cacheName);
          })
        );
      }).then(() => {
        console.log('[SW] All caches cleared ✅');
        if (event.ports && event.ports[0]) {
          event.ports[0].postMessage({ success: true });
        }
      })
    );
  }
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate event');
  
  const cacheWhitelist = [
    'static-resources',
    'api-cache',
    'pages-cache',
    'workbox-precache-v2',
  ];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.some(wl => cacheName.includes(wl))) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Activation complete, claiming clients');
      return self.clients.claim();
    })
  );
});

console.log('✅ [Custom SW] Push handlers registered');
