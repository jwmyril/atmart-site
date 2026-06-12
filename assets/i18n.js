// ===== Atmart — sélecteur de langue FR / HT / EN =====
// v1 : traduit la navigation, le pied de page et les éléments marqués [data-i18n].
// Les contenus longs (tutoriels, articles) restent en français pour l'instant.

const ATMART_I18N = {
  fr: {
    nav_home: "Accueil", nav_tuto: "Tutoriels", nav_podcast: "Podcast",
    nav_data: "Datasets", nav_form: "Formations", nav_tools: "Outils",
    nav_cta_start: "Commencer", nav_cta_listen: "🎙 Écouter",
    footer_bottom: "© 2026 Atmart LLC — Mache Teknoloji ak Done. Lojik360 est une marque d'Atmart LLC.",
    hero_title: "Apprenez l'<em>analyse de données</em>,<br />avec les données de chez nous.",
    hero_lead: "Tutoriels gratuits en français : Excel, Power BI, Python, IA et esprit critique — avec de vrais datasets d'Haïti, de la Caraïbe et de l'Afrique francophone.",
    search_ph: "Chercher un tutoriel (ex. Excel, Power BI, IA…)",
    search_btn: "Chercher",
    tools_h1: "Outils & sources de données",
    tools_lead: "Chaque outil avec son lien officiel, ses étapes d'installation et une première pratique guidée — plus les meilleures sources de données gratuites du monde.",
    tools_search_ph: "Chercher un outil (ex. Python, Tableau, MySQL…)",
    tools_sources_h2: "Sources de données gratuites",
    tools_install: "Installation & première pratique",
    teaser_tools_h2: "🧰 Les outils du métier, expliqués simplement",
    teaser_tools_p: "Power BI, Python, R, MySQL, GitHub… où les télécharger officiellement, comment les installer, et par quoi commencer.",
    teaser_tools_btn: "Découvrir les outils"
  },
  ht: {
    nav_home: "Akèy", nav_tuto: "Toutoryèl", nav_podcast: "Podkas",
    nav_data: "Done", nav_form: "Fòmasyon", nav_tools: "Zouti",
    nav_cta_start: "Kòmanse", nav_cta_listen: "🎙 Koute",
    footer_bottom: "© 2026 Atmart LLC — Mache Teknoloji ak Done. Lojik360 se yon mak Atmart LLC.",
    hero_title: "Aprann <em>analiz done</em>,<br />ak done lakay nou.",
    hero_lead: "Toutoryèl gratis: Excel, Power BI, Python, IA ak lespri kritik — ak vrè done Ayiti, Karayib la ak Lafrik frankofòn.",
    search_ph: "Chèche yon toutoryèl (egz. Excel, Power BI, IA…)",
    search_btn: "Chèche",
    tools_h1: "Zouti ak sous done",
    tools_lead: "Chak zouti ak lyen ofisyèl li, etap enstalasyon yo ak yon premye pratik — plis pi bon sous done gratis nan mond lan.",
    tools_search_ph: "Chèche yon zouti (egz. Python, Tableau, MySQL…)",
    tools_sources_h2: "Sous done gratis",
    tools_install: "Enstalasyon ak premye pratik",
    teaser_tools_h2: "🧰 Zouti metye a, eksplike senpleman",
    teaser_tools_p: "Power BI, Python, R, MySQL, GitHub… ki kote pou w telechaje yo ofisyèlman, kòman pou w enstale yo, ak kisa pou w kòmanse fè.",
    teaser_tools_btn: "Dekouvri zouti yo"
  },
  en: {
    nav_home: "Home", nav_tuto: "Tutorials", nav_podcast: "Podcast",
    nav_data: "Datasets", nav_form: "Courses", nav_tools: "Tools",
    nav_cta_start: "Get started", nav_cta_listen: "🎙 Listen",
    footer_bottom: "© 2026 Atmart LLC — Mache Teknoloji ak Done. Lojik360 is a brand of Atmart LLC.",
    hero_title: "Learn <em>data analysis</em>,<br />with data from home.",
    hero_lead: "Free tutorials: Excel, Power BI, Python, AI and critical thinking — with real datasets from Haiti, the Caribbean and Francophone Africa.",
    search_ph: "Search a tutorial (e.g. Excel, Power BI, AI…)",
    search_btn: "Search",
    tools_h1: "Tools & data sources",
    tools_lead: "Every tool with its official link, install steps and a guided first practice — plus the best free data sources in the world.",
    tools_search_ph: "Search a tool (e.g. Python, Tableau, MySQL…)",
    tools_sources_h2: "Free data sources",
    tools_install: "Install & first practice",
    teaser_tools_h2: "🧰 The tools of the trade, explained simply",
    teaser_tools_p: "Power BI, Python, R, MySQL, GitHub… where to download them officially, how to install them, and what to practice first.",
    teaser_tools_btn: "Discover the tools"
  }
};

function atmartApplyLang(lang) {
  const t = ATMART_I18N[lang] || ATMART_I18N.fr;
  localStorage.setItem("atmart_lang", lang);
  document.documentElement.lang = lang === "ht" ? "ht" : lang;

  // Navigation (par correspondance d'URL — fonctionne sur toutes les pages)
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href") || "";
    const isBtn = a.classList.contains("btn");
    if (isBtn) {
      if (href.includes("tutoriels")) a.textContent = t.nav_cta_start;
      else a.textContent = t.nav_cta_listen;
      return;
    }
    if (href.includes("index")) a.textContent = t.nav_home;
    else if (href.includes("tutoriels")) a.textContent = t.nav_tuto;
    else if (href.includes("podcast")) a.textContent = t.nav_podcast;
    else if (href.includes("datasets")) a.textContent = t.nav_data;
    else if (href.includes("formations")) a.textContent = t.nav_form;
    else if (href.includes("outils")) a.textContent = t.nav_tools;
  });

  // Pied de page
  document.querySelectorAll(".footer-bottom").forEach((el) => { el.textContent = t.footer_bottom; });

  // Éléments marqués : data-i18n (texte), data-i18n-html (HTML), data-i18n-ph (placeholder)
  document.querySelectorAll("[data-i18n]").forEach((el) => { if (t[el.dataset.i18n]) el.textContent = t[el.dataset.i18n]; });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => { if (t[el.dataset.i18nHtml]) el.innerHTML = t[el.dataset.i18nHtml]; });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => { if (t[el.dataset.i18nPh]) el.placeholder = t[el.dataset.i18nPh]; });

  document.querySelectorAll(".lang-switch button").forEach((b) => {
    b.classList.toggle("active", b.dataset.lang === lang);
  });
}

// Injecte le sélecteur dans la navigation de chaque page
(function () {
  const navList = document.querySelector(".nav-links");
  if (!navList) return;
  const li = document.createElement("li");
  const wrap = document.createElement("span");
  wrap.className = "lang-switch";
  ["fr", "ht", "en"].forEach((lang) => {
    const b = document.createElement("button");
    b.type = "button"; b.dataset.lang = lang; b.textContent = lang.toUpperCase();
    b.setAttribute("aria-label", "Langue " + lang.toUpperCase());
    b.addEventListener("click", () => atmartApplyLang(lang));
    wrap.appendChild(b);
  });
  li.appendChild(wrap);
  navList.appendChild(li);
  atmartApplyLang(localStorage.getItem("atmart_lang") || "fr");
})();
