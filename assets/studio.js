// ===== Lojik360 Studio — client (atmart.ltd/studio.html) =====
// Sends the facilitator's group description to the Cloudflare worker (/studio)
// and renders the generated session. License key optional (demo: 1/day).
// Endpoint comes from the data-endpoint attribute on this script tag.
(function () {
  var script = document.currentScript;
  var BASE = (script && script.getAttribute("data-endpoint")) || "";
  var ENDPOINT = BASE ? BASE.replace(/\/+$/, "") + "/studio" : "";

  // ---- status messages in the UI language (atmart_lang) ----
  var MSG = {
    fr: {
      gen: "Génération de votre séance… (30 à 60 secondes)",
      done: "Séance prête. Relisez-la avant de l'animer.",
      err: "Une erreur est survenue. Réessayez dans un instant.",
      no_endpoint: "Le Studio n'est pas encore connecté au serveur. Regardez l'exemple en attendant !",
      demo_limit: "Vous avez utilisé votre séance d'essai du jour. Avec une licence, c'est illimité — écrivez à sales@atmart.ltd.",
      license_invalid: "Cette clé de licence n'est pas reconnue. Vérifiez-la ou écrivez à sales@atmart.ltd.",
      rate_limited: "Limite du jour atteinte. Réessayez demain.",
      copied: "Séance copiée !",
      offline: "Impossible de joindre le serveur. Vérifiez votre connexion.",
      license_required: "Le module personnalisé est réservé aux licences. Écrivez à sales@atmart.ltd pour la vôtre.",
      custom_short: "Collez plus de contenu source (200 caractères minimum) pour un résultat fidèle à votre module.",
    },
    ht: {
      gen: "N ap prepare seyans ou a… (30 a 60 segonn)",
      done: "Seyans lan pare. Li l anvan ou anime l.",
      err: "Gen yon erè ki rive. Eseye ankò nan yon ti moman.",
      no_endpoint: "Studio a poko konekte ak sèvè a. Gade egzanp lan pou kounye a!",
      demo_limit: "Ou itilize seyans esè ou pou jodi a. Ak yon lisans, li san limit — ekri sales@atmart.ltd.",
      license_invalid: "Kle lisans sa a pa rekonèt. Verifye l oswa ekri sales@atmart.ltd.",
      rate_limited: "Ou rive nan limit jodi a. Tounen demen.",
      copied: "Seyans lan kopye!",
      offline: "Nou pa ka jwenn sèvè a. Verifye koneksyon ou.",
      license_required: "Modil pèsonalize a se pou moun ki gen lisans sèlman. Ekri sales@atmart.ltd pou pa w la.",
      custom_short: "Kole plis kontni sous (minimòm 200 karaktè) pou yon rezilta fidèl ak modil ou a.",
    },
    en: {
      gen: "Generating your session… (30 to 60 seconds)",
      done: "Session ready. Review it before you facilitate.",
      err: "Something went wrong. Please try again in a moment.",
      no_endpoint: "The Studio isn't connected to the server yet. Check out the example meanwhile!",
      demo_limit: "You've used today's free trial session. Licenses are unlimited — write to sales@atmart.ltd.",
      license_invalid: "This license key isn't recognized. Check it or write to sales@atmart.ltd.",
      rate_limited: "Daily limit reached. Try again tomorrow.",
      copied: "Session copied!",
      offline: "Can't reach the server. Check your connection.",
      license_required: "Custom modules are a licensed feature. Write to sales@atmart.ltd for yours.",
      custom_short: "Paste more source content (200 characters minimum) for a result faithful to your module.",
    },
    es: {
      gen: "Generando tu sesión… (30 a 60 segundos)",
      done: "Sesión lista. Revísala antes de facilitar.",
      err: "Ocurrió un error. Inténtalo de nuevo en un momento.",
      no_endpoint: "El Studio aún no está conectado al servidor. ¡Mira el ejemplo mientras tanto!",
      demo_limit: "Ya usaste tu sesión de prueba de hoy. Con licencia es ilimitado — escribe a sales@atmart.ltd.",
      license_invalid: "Esta clave de licencia no se reconoce. Verifícala o escribe a sales@atmart.ltd.",
      rate_limited: "Límite diario alcanzado. Vuelve mañana.",
      copied: "¡Sesión copiada!",
      offline: "No se puede contactar el servidor. Verifica tu conexión.",
      license_required: "Los módulos personalizados son una función con licencia. Escribe a sales@atmart.ltd.",
      custom_short: "Pega más contenido fuente (mínimo 200 caracteres) para un resultado fiel a tu módulo.",
    },
  };
  function t(key) {
    var lang = (localStorage.getItem("atmart_lang") || document.documentElement.lang || "fr").slice(0, 2);
    return (MSG[lang] || MSG.fr)[key] || MSG.fr[key] || "";
  }

  // ---- tiny markdown renderer (headings, bold, italic, lists, paragraphs) ----
  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function inline(s) {
    return s
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  }
  function renderMd(md) {
    var lines = md.split(/\r?\n/);
    var html = [], inUl = false, inOl = false, para = [];
    function closeLists() {
      if (inUl) { html.push("</ul>"); inUl = false; }
      if (inOl) { html.push("</ol>"); inOl = false; }
    }
    function flushPara() {
      if (para.length) { html.push("<p>" + inline(para.join(" ")) + "</p>"); para = []; }
    }
    for (var i = 0; i < lines.length; i++) {
      var raw = lines[i], line = esc(raw.trim());
      if (!line) { flushPara(); closeLists(); continue; }
      var m;
      if ((m = line.match(/^###\s+(.*)/))) { flushPara(); closeLists(); html.push("<h4>" + inline(m[1]) + "</h4>"); }
      else if ((m = line.match(/^##\s+(.*)/))) { flushPara(); closeLists(); html.push("<h3>" + inline(m[1]) + "</h3>"); }
      else if ((m = line.match(/^#\s+(.*)/))) { flushPara(); closeLists(); html.push("<h2>" + inline(m[1]) + "</h2>"); }
      else if ((m = line.match(/^[-•]\s+(.*)/))) {
        flushPara(); if (inOl) { html.push("</ol>"); inOl = false; }
        if (!inUl) { html.push("<ul>"); inUl = true; }
        html.push("<li>" + inline(m[1]) + "</li>");
      }
      else if ((m = line.match(/^\d+[.)]\s+(.*)/))) {
        flushPara(); if (inUl) { html.push("</ul>"); inUl = false; }
        if (!inOl) { html.push("<ol>"); inOl = true; }
        html.push("<li>" + inline(m[1]) + "</li>");
      }
      else { closeLists(); para.push(line); }
    }
    flushPara(); closeLists();
    return html.join("\n");
  }

  // ---- DOM ----
  var form = document.getElementById("studio-form");
  var out = document.getElementById("session-output");
  var placeholder = document.getElementById("session-placeholder");
  var toolbar = document.getElementById("st-toolbar");
  var status = document.getElementById("st-status");
  var genBtn = document.getElementById("st-generate");
  var licInput = document.getElementById("st-license");
  var lastMarkdown = "";

  // ---- doctype & custom-module field visibility ----
  var docSel = document.getElementById("st-doctype");
  var moduleSel = document.getElementById("st-module");
  function refreshGroups() {
    var dt = docSel.value;
    var custom = moduleSel.value === "custom";
    document.getElementById("grp-custom").style.display = custom ? "" : "none";
    document.getElementById("grp-focus").style.display = custom ? "none" : "";
    document.getElementById("grp-ap").style.display = dt === "avantprojet" ? "" : "none";
    document.getElementById("grp-rapport").style.display = dt === "rapport" ? "" : "none";
    // duration hidden for rapport; size label adapts for avant-projet
    var durBox = document.getElementById("st-duration").parentElement;
    durBox.style.display = dt === "rapport" ? "none" : "";
    var sizeBox = document.getElementById("st-size").parentElement;
    sizeBox.style.display = dt === "rapport" ? "none" : "";
    var sizeLabel = sizeBox.querySelector("label");
    if (sizeLabel) sizeLabel.textContent = dt === "avantprojet" ? "Bénéficiaires (total)" : "Participants";
    var g = { seance: "⚡ Générer ma séance", avantprojet: "📐 Générer l'avant-projet", rapport: "📊 Générer le rapport", slides: "🎞 Générer les slides" };
    genBtn.textContent = g[dt] || g.seance;
  }
  docSel.addEventListener("change", refreshGroups);
  moduleSel.addEventListener("change", refreshGroups);
  refreshGroups();

  function numOrNull(id) {
    var v = document.getElementById(id).value;
    return v === "" ? null : Number(v);
  }

  // ---- before/after chart (rapport) — drawn from the ENTERED numbers, never invented ----
  function chartSvg(pre, post, pres) {
    function bar(y, label, val, color) {
      if (val === null || isNaN(val)) return "";
      var w = Math.max(2, Math.round(val * 3.4));
      return '<text x="0" y="' + (y + 14) + '" fill="#d7e3f0" font-size="13">' + label + "</text>" +
        '<rect x="120" y="' + y + '" width="340" height="20" rx="4" fill="rgba(255,255,255,0.08)"/>' +
        '<rect x="120" y="' + y + '" width="' + w + '" height="20" rx="4" fill="' + color + '"/>' +
        '<text x="' + (124 + w) + '" y="' + (y + 15) + '" fill="#fff" font-size="13" font-weight="bold">' + val + "%</text>";
    }
    var rows = [];
    if (pre !== null) rows.push(bar(6, "Pré-test", pre, "#f4a261"));
    if (post !== null) rows.push(bar(34, "Post-test", post, "#2ec4b6"));
    if (pres !== null) rows.push(bar(62, "Présence", pres, "#6a9fd8"));
    if (!rows.length) return "";
    var gain = pre !== null && post !== null
      ? '<text x="120" y="104" fill="#2ec4b6" font-size="14" font-weight="bold">Gain d\'apprentissage : ' +
        (Math.round((post - pre) * 10) / 10) + " points</text>"
      : "";
    return '<div class="studio-chart"><svg viewBox="0 0 520 112" xmlns="http://www.w3.org/2000/svg" style="max-width:520px;width:100%">' +
      rows.join("") + gain + "</svg></div>";
  }

  // ---- printable attendance sheet (séance) ----
  var PRES_L = {
    fr: ["Fiche de présence", "N°", "Nom et prénom", "Signature", "Séance :        Date :        Facilitateur :"],
    ht: ["Fich prezans", "Nº", "Non ak siyati", "Siyati", "Seyans :        Dat :        Fasilitatè :"],
    en: ["Attendance sheet", "No.", "Full name", "Signature", "Session:        Date:        Facilitator:"],
    es: ["Hoja de asistencia", "N.º", "Nombre completo", "Firma", "Sesión:        Fecha:        Facilitador:"],
  };
  function presenceSheet(lang, size) {
    var L = PRES_L[lang] || PRES_L.fr;
    var n = Math.min(Math.max(size || 25, 10), 40);
    var rows = "";
    for (var i = 1; i <= n; i++) {
      rows += "<tr><td>" + i + "</td><td></td><td></td></tr>";
    }
    return '<div class="presence-block"><h3>📋 ' + L[0] + "</h3><p>" + L[4] + "</p>" +
      '<table class="presence-table"><thead><tr><th style="width:3em">' + L[1] + "</th><th>" + L[2] +
      "</th><th style=\"width:10em\">" + L[3] + "</th></tr></thead><tbody>" + rows + "</tbody></table></div>";
  }

  // remember the license key locally
  licInput.value = localStorage.getItem("atmart_studio_lic") || "";
  licInput.addEventListener("change", function () {
    localStorage.setItem("atmart_studio_lic", licInput.value.trim());
  });

  function renderSlides(md) {
    // split into slides on "## " boundaries; "# " title becomes the cover slide
    var parts = md.split(/\r?\n(?=## )/);
    var html = "";
    for (var i = 0; i < parts.length; i++) {
      html += '<div class="slide">' + renderMd(parts[i]) +
        '<span class="slide-num">' + (i + 1) + " / " + parts.length + "</span></div>";
    }
    return html;
  }
  function showSession(md, extraTop, extraBottom, asSlides) {
    lastMarkdown = md;
    out.innerHTML = asSlides ? renderSlides(md)
      : (extraTop || "") + renderMd(md) + (extraBottom || "");
    placeholder.style.display = "none";
    toolbar.style.display = "flex";
    out.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function setBusy(busy) {
    genBtn.disabled = busy;
    status.innerHTML = busy ? '<span class="studio-spin"></span>' + t("gen") : status.textContent;
  }

  // ---- generate ----
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!ENDPOINT) { status.textContent = t("no_endpoint"); return; }
    var dt = docSel.value;
    var custom = moduleSel.value === "custom";
    var payload = {
      doctype: dt,
      module: moduleSel.value,
      focus: custom ? "" : document.getElementById("st-focus").value,
      customName: custom ? document.getElementById("st-custom-name").value.trim() : "",
      customContent: custom ? document.getElementById("st-custom-content").value.trim() : "",
      audience: document.getElementById("st-audience").value,
      size: parseInt(document.getElementById("st-size").value, 10) || 25,
      duration: parseInt(document.getElementById("st-duration").value, 10) || 90,
      language: document.getElementById("st-lang").value,
      context: document.getElementById("st-context").value,
      notes: document.getElementById("st-notes").value.trim(),
      license: licInput.value.trim(),
    };
    if (dt === "avantprojet") {
      payload.sessions = parseInt(document.getElementById("st-sessions").value, 10) || 6;
      payload.period = document.getElementById("st-period").value.trim();
    }
    var pre = null, post = null, pres = null;
    if (dt === "rapport") {
      pre = numOrNull("st-r-pre"); post = numOrNull("st-r-post"); pres = numOrNull("st-r-pres");
      payload.results = {
        sessionsPlanned: numOrNull("st-r-sp"), sessionsHeld: numOrNull("st-r-sh"),
        participantsPlanned: numOrNull("st-r-pp"), participantsReached: numOrNull("st-r-pr"),
        women: numOrNull("st-r-w"), presenceRate: pres, preAvg: pre, postAvg: post,
        observations: document.getElementById("st-r-obs").value.trim(),
        storyNotes: document.getElementById("st-r-story").value.trim(),
        challenges: document.getElementById("st-r-chal").value.trim(),
      };
    }
    if (custom && payload.customContent.length < 200) {
      status.textContent = t("custom_short");
      return;
    }
    setBusy(true);
    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(function (r) { return r.json().then(function (b) { return { ok: r.ok, body: b }; }); })
      .then(function (res) {
        genBtn.disabled = false;
        if (res.ok && res.body && res.body.session) {
          var top = dt === "rapport" ? chartSvg(pre, post, pres) : "";
          var bottom = dt === "seance" ? presenceSheet(payload.language, payload.size) : "";
          showSession(res.body.session, top, bottom, dt === "slides");
          status.textContent = t("done");
        } else {
          var code = res.body && res.body.error;
          status.textContent =
            code === "demo_limit" ? t("demo_limit")
            : code === "license_invalid" ? t("license_invalid")
            : code === "license_required" ? t("license_required")
            : code === "custom_too_short" ? t("custom_short")
            : code === "rate_limited" ? t("rate_limited")
            : t("err");
        }
      })
      .catch(function () {
        genBtn.disabled = false;
        status.textContent = t("offline");
      });
  });

  // ---- toolbar ----
  document.getElementById("st-print").addEventListener("click", function () { window.print(); });
  document.getElementById("st-copy").addEventListener("click", function () {
    navigator.clipboard.writeText(lastMarkdown).then(function () { status.textContent = t("copied"); });
  });
  document.getElementById("st-download").addEventListener("click", function () {
    var blob = new Blob([lastMarkdown], { type: "text/markdown;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "lojik360-studio-" + (docSel.value || "seance") + ".md";
    a.click();
    URL.revokeObjectURL(a.href);
  });

  // ---- built-in example (no API call) ----
  var EXAMPLE = [
    "# Kanpe anvan ou kwè — seyans dekouvèt pou jèn yo",
    "",
    "## Apèsi seyans lan",
    "- **Objektif yo** : (1) konprann sa lespri kritik ye ; (2) sèvi ak 4 kesyon yo anvan nou kwè yon enfòmasyon ; (3) pratike sou egzanp WhatsApp reyèl.",
    "- **Piblik** : jèn 13–18 an — **25 patisipan**",
    "- **Dire** : 90 minit",
    "- **Materyèl** : tablo oswa gwo fèy papye, makè, ti kat papye pou chak patisipan.",
    "",
    "## Plan animasyon ak minitaj",
    "- **0–10 min — Akèy ak jwèt ouvèti** : chak moun di yon bagay li tande sou rezo yo semenn sa a — vre oswa fo ?",
    "- **10–25 min — Sa lespri kritik ye** : diskisyon — poukisa « tout moun ap di l » pa yon prèv.",
    "- **25–50 min — 4 kesyon yo** : Kisa m konnen ? Kijan m konnen l ? Kisa m ap sipoze ? Kisa yon moun ki pa dakò t ap remake ?",
    "- **50–70 min — Egzèsis « Mesaj WhatsApp la »** : an gwoup 5, analize yon mesaj viral.",
    "- **70–85 min — Quiz ak diskisyon repons yo**",
    "- **85–90 min — Fèmti** : chak moun pran yon angajman 10 segonn anvan li pataje yon bagay.",
    "",
    "## Egzèsis yo",
    "- **Egzèsis 1 — Mesaj WhatsApp la** : Li mesaj sa a fò : « Yo di gen yon pwodui nan mache a k ap rann moun malad — voye l bay tout moun ! » Chak gwoup reponn 4 kesyon yo, epi deside : pataje oswa pa pataje ? Poukisa ?",
    "- **Egzèsis 2 — Vre oswa emosyon ?** : 6 fraz sou kat — patisipan yo mete yo nan 2 kolòn : « prèv » oswa « emosyon/popilarite ».",
    "",
    "## Quiz — ak repons pou fasilitatè a",
    "1. Kisa ki yon prèv ? A) Anpil moun kwè l B) Yon enfòmasyon nou ka verifye C) Yon moun enpòtan di l D) Li fè m pè",
    "- **Repons : B** — popilarite, otorite ak emosyon pa prèv.",
    "",
    "## Fich patisipan (pou enprime)",
    "- 4 kesyon yo anvan ou kwè : Kisa m konnen ? Kijan m konnen l ? Kisa m ap sipoze ? Kisa yon moun ki pa dakò t ap remake ?",
    "- **Devwa semenn nan** : anvan ou pataje NENPÒT mesaj, kanpe 10 segonn epi poze tèt ou 4 kesyon yo.",
    "",
    "## Konsèy pou fasilitatè a",
    "- Si gwoup la gwo, fè egzèsis yo an gwoup 6–8 olye de 5.",
    "- Kite jèn yo bay pwòp egzanp pa yo — se yo k ap fè seyans lan rich.",
    "- *(Egzanp sa a se yon vèsyon kout — yon seyans reyèl Studio a pi detaye.)*",
  ].join("\n");

  document.getElementById("st-example").addEventListener("click", function () {
    showSession(EXAMPLE);
    status.textContent = "";
  });
})();
