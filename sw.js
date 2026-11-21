// Service worker Si DARA – tampilan offline + menampilkan notifikasi pengingat (Firebase Cloud Messaging)
const VERSI = 'sidara-v3';
const FILES = ['./', './index.html', './config.js', './manifest.json', './konfirmasi.html',
  './icons/icon-192.png', './icons/icon-512.png', './icons/badge-72.png',
  './icons/logo-donggala.png', './icons/logo-poltekkes-sby.png'];

self.addEventListener('install', e => e.waitUntil(caches.open(VERSI).then(c => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys()
  .then(ks => Promise.all(ks.filter(k => k !== VERSI).map(k => caches.delete(k)))).then(() => self.clients.claim())));

self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(caches.open(VERSI).then(async cache => {
    const lama = await cache.match(req, { ignoreSearch: url.pathname.endsWith('konfirmasi.html') });
    const baru = fetch(req).then(r => { if (r && r.ok) cache.put(req, r.clone()); return r; })
      .catch(() => lama || cache.match('./index.html'));
    return lama || baru;
  }));
});

// Pesan dari FCM (data message) → tampilkan sebagai notifikasi
self.addEventListener('push', e => {
  let d = {};
  try { const p = e.data.json(); d = p.data || p.notification || p; } catch (x) { d = { body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Si DARA', {
    body: d.body || 'Jangan lupa minum TTD-mu ya 💊', icon: 'icons/icon-192.png', badge: 'icons/badge-72.png',
    tag: 'sidara-pengingat', renotify: true, data: { url: d.url || './index.html#beranda' }
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = new URL(e.notification.data && e.notification.data.url || './index.html', self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(ws => {
    for (const w of ws) if (w.url.startsWith(self.registration.scope)) { w.navigate(url); return w.focus(); }
    return self.clients.openWindow(url);
  }));
});
