// Atmart PWA — cache statique (les appels IA passent toujours par le reseau)
const CACHE = "atmart-v1";
const CORE = ["/", "/index.html", "/chofe360.html", "/karye360.html", "/studio.html", "/atelier.html",
  "/assets/style.css?v=11", "/assets/script.js", "/assets/i18n.js",
  "/assets/i18n/ht.json", "/assets/i18n/en.json", "/assets/i18n/es.json",
  "/assets/logo.svg", "/assets/brand/atmart-mark.svg"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return; // API/worker: reseau direct
  e.respondWith(
    fetch(e.request).then((r) => {
      const copy = r.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
