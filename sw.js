// Atmart PWA — cache statique (les appels IA passent toujours par le reseau)
const CACHE = "atmart-v30";
const CORE = ["/", "/index.html", "/chofe360.html", "/karye360.html", "/studio.html", "/atelier.html",
  "/oeuvre.html", "/atelier-institutions.html", "/impact.html",
  "/donnees.html", "/donnees-backbone.html", "/datasets.html", "/donnees-solutions.html", "/donnees-campus.html",
  "/donnees-parrainage.html", "/donnees-confiance.html", "/donnees-pack-geo-haiti.html",
  "/assets/data.css?v=2", "/data/atmart_referentiel_territoire_base_HT.csv", "/data/atmart_referentiel_temps_HT.csv",
  "/atelier-maison.html", "/atelier-business.html", "/atelier-artistes.html", "/atelier-collection.html", "/atelier-diaspora.html",
  "/assets/atelier.css?v=2", "/assets/atelier.js?v=3", "/assets/atelier-offres.js?v=1",
  "/assets/atelier/oeuvres.json", "/assets/atelier/collection.json",
  "/assets/style.css?v=31", "/assets/script.js?v=2", "/assets/i18n.js",
  "/assets/i18n/ht.json", "/assets/i18n/en.json", "/assets/i18n/es.json",
  "/assets/brand/logo-dark-96.png", "/assets/brand/icon-192.png"];
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
