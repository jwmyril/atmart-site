/* Atmart — bouton de partage (PWA + web) */
(function () {
  "use strict";
  var T = {
    fr: { btn: "Partager", title: "Partager cette page", copy: "Copier le lien", copied: "Lien copié ✔",
          wa: "WhatsApp", fb: "Facebook", x: "X", tg: "Telegram", li: "LinkedIn", mail: "E-mail", sms: "SMS",
          msg: "Regarde ça sur Atmart :" },
    ht: { btn: "Pataje", title: "Pataje paj sa a", copy: "Kopye lyen an", copied: "Lyen kopye ✔",
          wa: "WhatsApp", fb: "Facebook", x: "X", tg: "Telegram", li: "LinkedIn", mail: "Imèl", sms: "SMS",
          msg: "Gade sa sou Atmart :" },
    en: { btn: "Share", title: "Share this page", copy: "Copy link", copied: "Link copied ✔",
          wa: "WhatsApp", fb: "Facebook", x: "X", tg: "Telegram", li: "LinkedIn", mail: "Email", sms: "SMS",
          msg: "Check this out on Atmart:" },
    es: { btn: "Compartir", title: "Compartir esta página", copy: "Copiar el enlace", copied: "Enlace copiado ✔",
          wa: "WhatsApp", fb: "Facebook", x: "X", tg: "Telegram", li: "LinkedIn", mail: "Correo", sms: "SMS",
          msg: "Mira esto en Atmart:" }
  };
  function lang() {
    var l = document.documentElement.lang || localStorage.getItem("atmart_lang") || "fr";
    return T[l] ? l : "fr";
  }
  function pageUrl() { return location.href.split("#")[0].split("?")[0]; }
  function pageTitle() {
    var h = document.querySelector("h1");
    return (h ? h.textContent.trim() : document.title).replace(/\s+/g, " ");
  }

  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "atm-share";
  btn.innerHTML = '<span class="ic" aria-hidden="true">↗</span><span class="lbl"></span>';

  var ov = document.createElement("div");
  ov.className = "atm-sov";
  var sheet = document.createElement("div");
  sheet.className = "atm-sheet";
  sheet.innerHTML = '<div class="atm-sh"><h3></h3><button type="button" class="x" aria-label="×">×</button></div><div class="atm-sgrid"></div><button type="button" class="atm-copy"></button>';

  function nets() {
    var u = encodeURIComponent(pageUrl());
    var t = T[lang()];
    var m = encodeURIComponent(t.msg + " " + pageTitle());
    return [
      { k: "wa", i: "💬", h: "https://api.whatsapp.com/send?text=" + m + "%20" + u },
      { k: "fb", i: "📘", h: "https://www.facebook.com/sharer/sharer.php?u=" + u },
      { k: "x",  i: "✖", h: "https://twitter.com/intent/tweet?text=" + m + "&url=" + u },
      { k: "tg", i: "✈", h: "https://t.me/share/url?url=" + u + "&text=" + m },
      { k: "li", i: "💼", h: "https://www.linkedin.com/sharing/share-offsite/?url=" + u },
      { k: "mail", i: "✉", h: "mailto:?subject=" + encodeURIComponent(pageTitle()) + "&body=" + m + "%20" + u },
      { k: "sms", i: "📱", h: "sms:?&body=" + m + "%20" + u }
    ];
  }

  function paint() {
    var t = T[lang()];
    btn.querySelector(".lbl").textContent = t.btn;
    btn.setAttribute("aria-label", t.title);
    sheet.querySelector("h3").textContent = t.title;
    var cp = sheet.querySelector(".atm-copy");
    cp.textContent = "🔗 " + t.copy;
    sheet.querySelector(".atm-sgrid").innerHTML = nets().map(function (n) {
      return '<a class="atm-net" href="' + n.h + '" target="_blank" rel="noopener">' +
             '<span>' + n.i + "</span>" + t[n.k] + "</a>";
    }).join("");
  }

  function open() {
    paint();
    // Sur telephone / PWA : la feuille de partage native du systeme d'abord.
    if (navigator.share) {
      navigator.share({ title: pageTitle(), text: T[lang()].msg, url: pageUrl() })
        .catch(function () { show(); });   // refus ou echec -> on ouvre notre panneau
      return;
    }
    show();
  }
  function show() { ov.classList.add("on"); sheet.classList.add("on"); }
  function close() { ov.classList.remove("on"); sheet.classList.remove("on"); }

  function copy() {
    var t = T[lang()], cp = sheet.querySelector(".atm-copy"), u = pageUrl();
    function done() { cp.textContent = "✔ " + t.copied; setTimeout(function () { cp.textContent = "🔗 " + t.copy; }, 2000); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(u).then(done).catch(fallback);
    } else fallback();
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = u; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); done(); } catch (e) {}
      document.body.removeChild(ta);
    }
  }

  function init() {
    document.body.appendChild(btn);
    document.body.appendChild(ov);
    document.body.appendChild(sheet);
    paint();
    btn.addEventListener("click", open);
    ov.addEventListener("click", close);
    sheet.querySelector(".x").addEventListener("click", close);
    sheet.querySelector(".atm-copy").addEventListener("click", copy);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    new MutationObserver(paint).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
