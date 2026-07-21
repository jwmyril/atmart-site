/* Atmart — lanceur de produits (bouton lateral gauche + panneau) */
(function () {
  "use strict";
  var P = [
    { i: "🧭", h: "entevyou360.html", k: "ent" },
    { i: "🚗", h: "chofe360.html", k: "cho" },
    { i: "🚌", h: "setd360.html", k: "setd" },
    { i: "🪪", h: "rejistre.html", k: "pool" },
    { i: "🏢", h: "anplwaye360.html", k: "emp" },
    { i: "🌱", h: "karye360.html", k: "kar" },
    { i: "🎓", h: "studio.html", k: "fom" },
    { i: "🎨", h: "atelier.html", k: "art" },
    { i: "🗂", h: "datasets.html", k: "data" },
    { i: "🧰", h: "outils.html", k: "tools" },
    { i: "📚", h: "https://lojik360.atmart.ltd", k: "loj" },
    { i: "🎙", h: "podcast.html", k: "pod" }
  ];
  var L = {
    fr: { btn: "Produits", title: "Tous les produits Atmart", sub: "Art · Technologie · Données · IA",
      ent: ["Entèvyou360", "réussir l'entretien d'embauche"],
      cho: ["Chofè360 Wout", "test de conduite (Massachusetts)"],
      setd: ["Chofè360 7D Pro", "certificat transport scolaire"],
      pool: ["Pool Chofè360", "inscription gratuite des chauffeurs"],
      emp: ["Portail Anplwayè", "recruter des chauffeurs"],
      kar: ["Karyè360", "votre coach de carrière"],
      fom: ["Fòmasyon360", "formations pour ONG & écoles"],
      art: ["Atelier ATM", "art original signé"],
      data: ["Datasets", "données rares & documentées"],
      tools: ["Outils", "sources de données"],
      loj: ["Lojik360", "tutoriels gratuits"],
      pod: ["Podcast", "Lojik360"] },
    ht: { btn: "Pwodwi", title: "Tout pwodwi Atmart yo", sub: "Atizana · Teknoloji · Done · IA",
      ent: ["Entèvyou360", "pase entèvyou travay la"],
      cho: ["Chofè360 Wout", "tès kondwi (Massachusetts)"],
      setd: ["Chofè360 7D Pro", "sètifika transpò elèv"],
      pool: ["Pool Chofè360", "enskripsyon gratis pou chofè"],
      emp: ["Pòtay Anplwayè", "rekrite chofè"],
      kar: ["Karyè360", "coach karyè ou"],
      fom: ["Fòmasyon360", "fòmasyon pou ONG & lekòl"],
      art: ["Atelye ATM", "atizana orijinal siyen"],
      data: ["Datasets", "done ki ra epi dokimante"],
      tools: ["Zouti", "sous done yo"],
      loj: ["Lojik360", "titoryèl gratis"],
      pod: ["Podcast", "Lojik360"] },
    en: { btn: "Products", title: "All Atmart products", sub: "Art · Technology · Data · AI",
      ent: ["Entèvyou360", "win the job interview"],
      cho: ["Chofè360 Wout", "road test (Massachusetts)"],
      setd: ["Chofè360 7D Pro", "school transport certificate"],
      pool: ["Chofè360 Pool", "free driver registration"],
      emp: ["Employer portal", "recruit drivers"],
      kar: ["Karyè360", "your career coach"],
      fom: ["Fòmasyon360", "training for NGOs & schools"],
      art: ["ATM Studio", "signed original art"],
      data: ["Datasets", "rare, documented data"],
      tools: ["Tools", "data sources"],
      loj: ["Lojik360", "free tutorials"],
      pod: ["Podcast", "Lojik360"] },
    es: { btn: "Productos", title: "Todos los productos Atmart", sub: "Arte · Tecnología · Datos · IA",
      ent: ["Entèvyou360", "ganar la entrevista de trabajo"],
      cho: ["Chofè360 Wout", "examen de manejo (Massachusetts)"],
      setd: ["Chofè360 7D Pro", "certificado de transporte escolar"],
      pool: ["Pool Chofè360", "registro gratuito de choferes"],
      emp: ["Portal de empleadores", "reclutar choferes"],
      kar: ["Karyè360", "tu coach de carrera"],
      fom: ["Fòmasyon360", "formación para ONG y escuelas"],
      art: ["Taller ATM", "arte original firmado"],
      data: ["Datasets", "datos raros y documentados"],
      tools: ["Herramientas", "fuentes de datos"],
      loj: ["Lojik360", "tutoriales gratis"],
      pod: ["Podcast", "Lojik360"] }
  };
  function lang() {
    var l = document.documentElement.lang || localStorage.getItem("atmart_lang") || "fr";
    return L[l] ? l : "fr";
  }
  var here = (location.pathname.split("/").pop() || "index.html");

  var btn = document.createElement("button");
  btn.className = "atm-launch";
  btn.type = "button";
  btn.setAttribute("aria-label", "Produits");
  btn.innerHTML = '<span class="g"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span><span class="lbl"></span>';

  var ov = document.createElement("div");
  ov.className = "atm-ov";

  var dr = document.createElement("aside");
  dr.className = "atm-drawer";
  dr.innerHTML = '<div class="atm-dh"><h3></h3><button type="button" aria-label="Fermer">×</button></div>' +
                 '<p class="atm-dsub"></p><div class="atm-grid"></div>';

  function paint() {
    var t = L[lang()];
    btn.querySelector(".lbl").textContent = t.btn;
    dr.querySelector("h3").textContent = t.title;
    dr.querySelector(".atm-dsub").textContent = t.sub;
    dr.querySelector(".atm-grid").innerHTML = P.map(function (p) {
      var lbl = t[p.k];
      var cur = p.h === here ? ' style="border-color:rgba(46,196,182,.6);background:rgba(46,196,182,.12)"' : "";
      return '<a class="atm-item" href="' + p.h + '"' + cur + '>' +
        '<span class="ic">' + p.i + "</span><b>" + lbl[0] + "</b><small>" + lbl[1] + "</small></a>";
    }).join("");
  }
  function open() { ov.classList.add("on"); dr.classList.add("on"); document.body.style.overflow = "hidden"; }
  function close() { ov.classList.remove("on"); dr.classList.remove("on"); document.body.style.overflow = ""; }

  function init() {
    document.body.appendChild(btn);
    document.body.appendChild(ov);
    document.body.appendChild(dr);
    paint();
    btn.addEventListener("click", open);
    ov.addEventListener("click", close);
    dr.querySelector(".atm-dh button").addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    new MutationObserver(paint).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
