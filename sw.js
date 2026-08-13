// Atmart PWA — cache statique (les appels IA passent toujours par le reseau)
const CACHE = "atmart-v72";

// Le noyau du site : navigation et identite visuelle.
const CORE = ["/", "/index.html", "/chofe360.html", "/karye360.html", "/studio.html", "/atelier.html",
  "/oeuvre.html", "/atelier-institutions.html", "/impact.html",
  "/atelier-maison.html", "/atelier-business.html", "/atelier-artistes.html",
  "/atelier-collection.html", "/atelier-diaspora.html", "/fiche.html",
  "/processus-creation.html", "/oeuvres/table-ancetres.html", "/sitemap.xml",
  "/faq.html", "/conditions-vente.html", "/robots.txt",
  "/assets/atelier.css?v=2", "/assets/atelier.js?v=4", "/assets/atelier-offres.js?v=1",
  "/assets/atelier/oeuvres.json", "/assets/atelier/collection.json",
  "/assets/atelier/fiches/table-ancetres.json",
  "/assets/style.css?v=31", "/assets/script.js?v=2", "/assets/i18n.js?v=14",
  "/assets/i18n/ht.json", "/assets/i18n/en.json", "/assets/i18n/es.json",
  "/assets/i18n/explorateur.en.json", "/assets/i18n/explorateur.ht.json",
  "/assets/i18n/explorateur.es.json",
  "/assets/brand/logo-dark-96.png", "/assets/brand/icon-192.png"];

// Atmart Data hors connexion. C'est tout l'interet : en Haiti, une connexion
// intermittente ne doit pas empecher de consulter le profil d'une commune.
// L'Explorateur tient entierement dans ces fichiers.
const DATA = [
  "/donnees-explorateur.html", "/ht/donnees-explorateur.html",
  "/en/donnees-explorateur.html", "/es/donnees-explorateur.html",
  "/donnees.html", "/donnees-systeme.html", "/donnees-backbone.html",
  "/datasets.html", "/donnees-solutions.html", "/donnees-campus.html",
  "/donnees-parrainage.html", "/donnees-confiance.html",
  "/donnees-pack-geo-haiti.html",
  "/assets/data.css?v=17", "/assets/explorateur.js?v=32",
  "/data/atmart_referentiel_territoire_base_HT.csv",
  "/data/atmart_indicateurs_communes_HT.csv",
  "/data/atmart_referentiel_indicateurs.csv", "/data/atmart_referentiel_indicateurs_i18n.csv",
  "/data/atmart_registre_sources.csv",
  "/data/atmart_referentiel_temps_HT.csv",
  "/data/haiti_contour_simplifie.geojson", "/data/atmart_millesimes_territoriaux.csv",
  "/data/atmart_pyramide_ages_HT.csv",
  "/hors-connexion.html"
];
// La pyramide avait ete ecartee de cette liste au motif de « 1,1 Mo imposes a
// chaque visiteur ». L'audit du 12/08 a montre que le chiffre etait faux : le
// serveur sert en gzip, et le fichier pese 72 Ko sur le reseau — moins que
// style.css. Le motif ne tenait plus, la promesse hors connexion si : en Haiti,
// une connexion intermittente ne doit pas priver d'une section de la fiche.
// Elle est donc precachee. Son affichage, lui, reste differe jusqu'a ce que la
// section approche de l'ecran : ce qui coute sur un telephone bas de gamme,
// c'est l'analyse des 7 140 lignes, pas leur telechargement.

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      // addAll echoue en bloc des qu'un seul fichier manque : on tolere les absences
      .then((c) => Promise.all(CORE.concat(DATA).map((u) => c.add(u).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return; // API/worker : reseau direct

  e.respondWith(
    fetch(e.request)
      .then((r) => {
        const copy = r.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return r;
      })
      .catch(() =>
        caches.match(e.request, { ignoreSearch: true }).then((c) => {
          if (c) return c;
          // Page jamais visitee et hors connexion : on l'explique, plutot que
          // de laisser l'erreur brute du navigateur.
          if (e.request.mode === "navigate") return caches.match("/hors-connexion.html");
          return new Response("", { status: 504, statusText: "Hors connexion" });
        })
      )
  );
});
