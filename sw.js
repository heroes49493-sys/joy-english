// Joy English ☀️ — service worker
// Estrategia "red primero, caché de respaldo":
//  - Con el servidor encendido, SIEMPRE baja la última versión (actualizas sin reinstalar).
//  - Sin servidor (offline), la app sigue funcionando desde la caché.
const CACHE = "joy-english-v17";

const ASSETS = [
  "./",
  "./index.html",
  "./css/styles.css?v=17",
  "./js/data.js?v=17",
  "./js/app.js?v=17",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || !req.url.startsWith(self.location.origin)) return;

  e.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((cache) => cache.put(req, copy));
        return res;
      })
      .catch(() =>
        caches.match(req, { ignoreSearch: false })
          .then((hit) => hit || caches.match(req, { ignoreSearch: true }))
          .then((hit) => hit || caches.match("./index.html"))
      )
  );
});
