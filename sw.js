// Joy English ☀️ — service worker
// Estrategia "red primero, caché de respaldo":
//  - Con el servidor encendido, SIEMPRE baja la última versión (actualizas sin reinstalar).
//  - Sin servidor (offline), la app sigue funcionando desde la caché.
const CACHE = "joy-english-v44";

// ⚠️ Mantener las ?v= de esta lista IGUALES a las de index.html en cada versión
// (quedó olvidada en v23 durante varias versiones y la precarga guardaba URLs viejas).
const ASSETS = [
  "./",
  "./index.html",
  "./css/styles.css?v=38",
  "./js/data.js?v=31",
  "./js/app.js?v=39",
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

  // "no-cache": revalida SIEMPRE contra el servidor, para que el caché HTTP del
  // navegador no pueda servir un index.html viejo (los .js/.css llevan ?v=N, pero
  // index.html no). Con el server apagado, el catch de abajo sirve desde la caché SW.
  // Nota: un Request en modo "navigate" no acepta init → se usa la URL en ese caso.
  const fresh = req.mode === "navigate"
    ? fetch(req.url, { cache: "no-cache" })
    : fetch(req, { cache: "no-cache" });

  e.respondWith(
    fresh
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
