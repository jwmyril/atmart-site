/* ===== Explorateur Haïti — Atmart Data =====
   Un seul moteur, deux éditions (window.ATM_EXPLORATEUR) :
     publique      : référentiel de base + indicateurs, depuis data/
     administrateur: référentiels complets, depuis un dossier local non publié
   Aucun compteur n'est écrit en dur : tout est compté depuis les fichiers. */
(function () {
  "use strict";

  var CFG = window.ATM_EXPLORATEUR || {};
  var ADMIN = !!CFG.admin;
  var DIR = CFG.dir || "data/";
  var F = {
    terr: DIR + (ADMIN ? "atmart_referentiel_territoire_HT.csv"
                       : "atmart_referentiel_territoire_base_HT.csv"),
    vals: DIR + "atmart_indicateurs_communes_HT.csv",
    dico: DIR + "atmart_referentiel_indicateurs.csv",
    orgs: ADMIN ? DIR + "atmart_referentiel_organisations_HT.csv" : null
  };

  var terr = [], vals = [], orgs = [], dico = {};
  var parId = {}, parPcode = {}, enfantsDe = {}, orgsCom = {}, orgsSec = {};
  var parIndicateur = {}, courant = null, objectif = "tout";
  var $ = function (s) { return document.querySelector(s); };

  /* ---------------------------------------------------------------- outils */
  function parseCSV(txt) {
    txt = txt.replace(/^﻿/, "");
    var out = [], champ = "", ligne = [], q = false, i, c;
    for (i = 0; i < txt.length; i++) {
      c = txt[i];
      if (q) { if (c === '"') { if (txt[i + 1] === '"') { champ += '"'; i++; } else q = false; } else champ += c; }
      else if (c === '"') q = true;
      else if (c === ",") { ligne.push(champ); champ = ""; }
      else if (c === "\n") { ligne.push(champ); out.push(ligne); ligne = []; champ = ""; }
      else if (c !== "\r") champ += c;
    }
    if (champ !== "" || ligne.length) { ligne.push(champ); out.push(ligne); }
    var head = out.shift();
    return out.filter(function (l) { return l.length > 1; }).map(function (l) {
      var o = {}; head.forEach(function (h, j) { o[h] = (l[j] || "").trim(); }); return o;
    });
  }
  function sansAccent(s) { return (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); }
  function nb(v) { var n = parseFloat(String(v).replace(",", ".")); return isNaN(n) ? null : n; }
  function esc(s) { return String(s == null ? "" : s).replace(/[<>&"]/g, function (c) {
    return { "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]; }); }
  function fmt(v, u) {
    var n = nb(v);
    if (n === null) return esc(v) || "—";
    var s = (Math.round(n * 100) / 100).toLocaleString("fr-FR");
    return u === "%" ? s + " %" : (u && u !== "nombre" ? s + " " + esc(u) : s);
  }
  function jour(d) {
    if (!d) return "—";
    var p = d.split("-");
    return p.length === 3 ? p[2] + "/" + p[1] + "/" + p[0] : d;
  }

  var NIVEAU = { "1": "Département", "2": "Arrondissement", "3": "Commune",
                 "4": "Section communale", "5": "Localité" };
  var THEME = { Territoire: "🗺 Territoire", Santé: "🏥 Santé", Éducation: "🎓 Éducation",
                Marchés: "🛒 Marchés", Qualité: "📋 Qualité de la donnée" };
  /* Les codes du modèle de qualité, en clair pour l'utilisateur.
     Les codes eux-mêmes restent dans les exports et le bloc technique. */
  var STATUT = { O: "Valeur observée", A: "Valeur agrégée par Atmart", H: "Valeur harmonisée",
                 I: "Valeur interpolée", M: "Valeur modélisée", E: "Valeur estimée",
                 N: "Donnée non disponible" };
  var QUALITE = { A: "qualité élevée", B: "qualité acceptable", C: "qualité limitée" };

  /* Quatre objectifs plutôt que sept profils : chacun réordonne les thèmes,
     change le résumé et propose des actions différentes. */
  var OBJECTIFS = {
    tout: { nom: "Vue complète", ordre: null },
    planifier: {
      nom: "Planifier les services publics",
      ordre: ["Territoire", "Santé", "Éducation", "Marchés", "Qualité"],
      resume: function (r, s) {
        return "Profil administratif de " + esc(r.nom_fr) + ". " + s.phrase +
               " Les données disponibles couvrent " + s.themes + ". " +
               s.absents + " indicateur" + (s.nAbsents > 1 ? "s" : "") +
               " reste" + (s.nAbsents > 1 ? "nt" : "") + " à documenter sur cette commune.";
      },
      actions: [["Comparer aux communes voisines", "#comparer"],
                ["Voir ce qui reste à documenter", "#lacunes"],
                ["Licence institutionnelle", "donnees-solutions.html#licences"]]
    },
    projet: {
      nom: "Préparer un projet ou une intervention",
      ordre: ["Santé", "Éducation", "Marchés", "Territoire", "Qualité"],
      resume: function (r, s) {
        return "Avant d'intervenir sur " + esc(r.nom_fr) + " : " + s.phrase +
               " Le score de complétude vous dit d'avance sur quoi votre diagnostic " +
               "reposera — et sur quoi il ne reposera pas.";
      },
      actions: [["Voir ce qui reste à documenter", "#lacunes"],
                ["Référentiel géographique complet", "donnees-pack-geo-haiti.html"],
                ["Packs décisionnels", "donnees-solutions.html#packs"]]
    },
    recherche: {
      nom: "Réaliser une recherche",
      ordre: ["Qualité", "Territoire", "Santé", "Éducation", "Marchés"],
      resume: function (r, s) {
        return "Chaque valeur affichée pour " + esc(r.nom_fr) + " porte son année de référence, " +
               "sa source et sa méthode de calcul — de quoi les reprendre dans une méthodologie. " +
               s.phrase;
      },
      actions: [["Définitions et méthodes", "donnees-backbone.html#indicateurs"],
                ["Accès Campus pour un mémoire", "donnees-campus.html"],
                ["Registre des sources", "data/atmart_registre_sources.csv"]]
    },
    macommune: {
      nom: "Explorer ma commune",
      ordre: ["Territoire", "Éducation", "Santé", "Marchés", "Qualité"],
      resume: function (r, s) {
        return "Ce que l'on sait publiquement de " + esc(r.nom_fr) + " : " + s.phrase +
               " Tout ceci est libre et téléchargeable.";
      },
      actions: [["Télécharger les données libres", "datasets.html#shelf-free"],
                ["Comment ces chiffres sont établis", "donnees-backbone.html"]]
    }
  };

  /* ------------------------------------------------------------- recherche */
  function chercher(q) {
    var k = sansAccent(q).trim();
    if (!k) return [];
    var exact = [], debut = [], dedans = [];
    terr.forEach(function (r) {
      var a = sansAccent(r.nom_fr), b = sansAccent(r.nom_ht),
          c = sansAccent(r.pcode), d = sansAccent(r.atmart_geo_id);
      if (a === k || b === k || c === k || d === k) exact.push(r);
      else if (a.indexOf(k) === 0 || b.indexOf(k) === 0 || c.indexOf(k) === 0 || d.indexOf(k) === 0) debut.push(r);
      else if (a.indexOf(k) > 0 || b.indexOf(k) > 0 || c.indexOf(k) > -1 || d.indexOf(k) > -1) dedans.push(r);
    });
    var tri = function (x, y) { return x.niveau_admin - y.niveau_admin; };
    return exact.sort(tri).concat(debut.sort(tri), dedans.sort(tri)).slice(0, 30);
  }

  /* Suggestions en cas de faute : distance de Levenshtein bornée. */
  function proches(q) {
    var k = sansAccent(q).trim();
    if (k.length < 4) return [];
    function dist(a, b) {
      var m = a.length, n = b.length, prev = [], cur = [], i, j;
      if (Math.abs(m - n) > 3) return 99;
      for (j = 0; j <= n; j++) prev[j] = j;
      for (i = 1; i <= m; i++) {
        cur[0] = i;
        for (j = 1; j <= n; j++)
          cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        prev = cur.slice();
      }
      return prev[n];
    }
    return terr.map(function (r) { return { r: r, d: dist(k, sansAccent(r.nom_fr)) }; })
      .filter(function (x) { return x.d <= 3; })
      .sort(function (a, b) { return a.d - b.d; }).slice(0, 5).map(function (x) { return x.r; });
  }

  function afficherResultats(liste, q) {
    var el = $("#x-resultats");
    if (!q) { el.innerHTML = ""; el.hidden = true; return; }
    el.hidden = false;
    if (!liste.length) {
      var sug = proches(q);
      el.innerHTML = '<p class="x-vide">Aucun territoire ne correspond à « ' + esc(q) + " ».</p>" +
        (sug.length ? '<p class="x-vide" style="padding-top:0">Vouliez-vous dire :</p>' +
          sug.map(function (r) { return carteResultat(r); }).join("") :
          '<p class="x-vide" style="padding-top:0">Essayez un nom de commune, un p-code (HT0121) ' +
          "ou un identifiant Atmart.</p>");
      annoncer(sug.length ? "Aucun résultat exact, " + sug.length + " suggestions" : "Aucun résultat");
      return;
    }
    el.innerHTML = liste.map(carteResultat).join("");
    annoncer(liste.length + " territoire" + (liste.length > 1 ? "s" : "") + " trouvé" + (liste.length > 1 ? "s" : ""));
  }
  function carteResultat(r) {
    return '<button class="x-res" role="option" data-id="' + esc(r.atmart_geo_id) + '"><b>' +
      esc(r.nom_fr) + "</b>" + (r.nom_ht && r.nom_ht !== r.nom_fr ? " <i>" + esc(r.nom_ht) + "</i>" : "") +
      "<small>" + (NIVEAU[r.niveau_admin] || esc(r.type_entite)) + " · " +
      esc(r.pcode || r.source_geo_id) + "</small></button>";
  }
  function annoncer(t) { var a = $("#x-annonce"); if (a) a.textContent = t; }

  /* ------------------------------------------------------- rang et contexte */
  function rang(indId, pcode) {
    var l = parIndicateur[indId];
    if (!l) return null;
    var idx = l.findIndex(function (v) { return v.pcode_commune === pcode; });
    if (idx < 0) return null;
    return { rang: idx + 1, total: l.length,
             pct: Math.round((1 - idx / (l.length - 1 || 1)) * 100) };
  }

  /* ----------------------------------------------------------------- blocs */
  function fil(r) {
    var ch = [], cur = parId[r.parent_atmart_geo_id], g = 0;
    while (cur && g++ < 6) { ch.unshift(cur); cur = parId[cur.parent_atmart_geo_id]; }
    return ch.map(function (p) {
      return '<button class="x-lien" data-id="' + esc(p.atmart_geo_id) + '">' + esc(p.nom_fr) + "</button>";
    }).join(" › ") + (ch.length ? " › " : "") + "<span>" + esc(r.nom_fr) + "</span>";
  }

  function situe(r) {
    var ch = [], cur = parId[r.parent_atmart_geo_id], g = 0;
    while (cur && g++ < 6) { ch.unshift(cur); cur = parId[cur.parent_atmart_geo_id]; }
    var dep = ch.filter(function (x) { return x.niveau_admin === "1"; })[0];
    var arr = ch.filter(function (x) { return x.niveau_admin === "2"; })[0];
    /* « du département de Ouest » se dit « de l'Ouest » : élision devant voyelle. */
    function de(n) { return /^[aeiouyéèêàâîôûAEIOUYÉÈÊÀÂÎÔÛ]/.test(n) ? "de l'" + n : "de " + n; }
    var t = NIVEAU[r.niveau_admin] || r.type_entite;
    if (dep) t += " du département " + de(dep.nom_fr);
    if (arr && r.niveau_admin === "3") t += ", arrondissement " + de(arr.nom_fr);
    return t;
  }

  function synthese(r) {
    var m = vals.filter(function (v) { return v.pcode_commune === r.pcode; });
    var connus = m.filter(function (v) { return v.statut_valeur !== "N"; });
    var absents = m.filter(function (v) { return v.statut_valeur === "N"; });
    var themes = {}, sources = {}, annees = [];
    connus.forEach(function (v) {
      var d = dico[v.indicateur_id] || {};
      if (d.categorie && d.categorie !== "Qualité") themes[d.categorie] = 1;
      if (v.source) sources[v.source] = 1;
      if (v.annee_reference) annees.push(v.annee_reference);
    });
    var sec = (m.filter(function (v) { return v.indicateur_id === "IND-GEO-002"; })[0] || {}).valeur;
    var loc = (m.filter(function (v) { return v.indicateur_id === "IND-GEO-003"; })[0] || {}).valeur;
    var comp = (m.filter(function (v) { return v.indicateur_id === "IND-QUA-001"; })[0] || {}).valeur;
    return {
      nConnus: connus.length, nAbsents: absents.length, absents: absents.length,
      nSources: Object.keys(sources).length,
      completude: comp,
      annees: annees.length ? [Math.min.apply(null, annees), Math.max.apply(null, annees)] : null,
      themes: Object.keys(themes).map(function (t) { return t.toLowerCase(); }).join(", ") || "aucun thème",
      phrase: (sec ? "Elle compte " + sec + " section" + (sec > 1 ? "s" : "") + " communale" +
               (sec > 1 ? "s" : "") : "") + (loc ? " et " + loc + " localités référencées." : ".")
    };
  }

  function blocResume(r) {
    var s = synthese(r);
    var maj = vals[0] || {};
    var h = ['<div class="x-tete"><p class="x-fil">' + fil(r) + "</p>",
      "<h2>" + esc(r.nom_fr) + (r.nom_ht && r.nom_ht !== r.nom_fr ?
        " <em>" + esc(r.nom_ht) + "</em>" : "") + "</h2>",
      '<p class="x-situe">' + esc(situe(r)) + "</p>"];

    if (r.niveau_admin === "3") {
      h.push('<div class="x-actions">');
      h.push('<button class="btn btn-primary x-btn-export" data-export="' + esc(r.pcode) + '">' +
             "Télécharger les " + s.nConnus + " indicateurs de " + esc(r.nom_fr) + " (CSV)</button>");
      h.push('<button class="btn btn-outline x-btn-lien">Copier le lien de cette fiche</button>');
      h.push('<a class="btn btn-outline" href="#lacunes">Ce qui reste à documenter (' + s.nAbsents + ")</a>");
      h.push("</div>");
      h.push('<p class="x-confiance">Fiche ' + esc(r.version) + " · " + s.nSources + " source" +
             (s.nSources > 1 ? "s" : "") +
             (s.completude ? " · complétude " + s.completude + " %" : "") +
             (s.annees ? " · données de " + s.annees[0] + " à " + s.annees[1] : "") +
             " · mise à jour Atmart le " + jour(maj.date_extraction) +
             ' · <a href="donnees-backbone.html#statuts">méthodologie</a></p>');
    }
    h.push("</div>");
    return h.join("");
  }

  function blocObjectif(r) {
    if (ADMIN || r.niveau_admin !== "3") return "";
    var o = OBJECTIFS[objectif];
    if (!o || !o.resume) return "";
    var s = synthese(r);
    return '<div class="x-objectif"><p class="x-theme">' + esc(o.nom) + "</p><p>" + o.resume(r, s) + "</p>" +
      '<div class="x-actions x-actions-sec">' + (o.actions || []).map(function (a) {
        return a[1].charAt(0) === "#"
          ? '<a class="btn btn-outline" href="' + a[1] + '">' + esc(a[0]) + "</a>"
          : '<a class="btn btn-outline" href="' + a[1] + '">' + esc(a[0]) + " →</a>";
      }).join("") + "</div></div>";
  }

  function blocIndicateurs(r) {
    var m = vals.filter(function (v) { return v.pcode_commune === r.pcode; });
    if (!m.length) return "";
    var connus = m.filter(function (v) { return v.statut_valeur !== "N"; });
    var groupes = {};
    connus.forEach(function (v) {
      var d = dico[v.indicateur_id] || {};
      (groupes[d.categorie || "Autres"] = groupes[d.categorie || "Autres"] || []).push([v, d]);
    });
    var ordre = (OBJECTIFS[objectif] || {}).ordre ||
                ["Territoire", "Santé", "Éducation", "Marchés", "Qualité"];
    var cles = ordre.filter(function (c) { return groupes[c]; })
                    .concat(Object.keys(groupes).filter(function (c) { return ordre.indexOf(c) < 0; }));
    var h = ['<h3 class="x-h3" id="indicateurs">Indicateurs documentés</h3>',
             '<p class="x-note" style="margin-top:0">Chaque chiffre porte son année de référence, ' +
             "sa source et son statut. Dépliez une carte pour la définition et la méthode.</p>"];
    cles.forEach(function (cat) {
      h.push('<p class="x-theme">' + (THEME[cat] || esc(cat)) + "</p>");
      h.push('<div class="x-mesures">' + groupes[cat].map(function (p) {
        var v = p[0], d = p[1], rg = rang(v.indicateur_id, r.pcode);
        return '<details class="x-mesure"><summary>' +
          "<b>" + fmt(v.valeur, v.unite) + "</b>" +
          "<span>" + esc(d.nom || v.indicateur_id) + "</span>" +
          '<small class="x-mill">' + (v.annee_reference ? "Millésime " + esc(v.annee_reference) + " · " : "") +
          esc((d.source_primaire || v.source).split(" — ")[0]) + "</small>" +
          (rg ? '<small class="x-rang">' + rg.rang + "<sup>e</sup> sur " + rg.total +
                " communes documentées</small>" : "") + "</summary>" +
          '<div class="x-detail">' +
          (d.definition ? "<p><b>Définition.</b> " + esc(d.definition) + "</p>" : "") +
          (d.methode_calcul ? "<p><b>Méthode.</b> " + esc(d.methode_calcul) + "</p>" : "") +
          "<p><b>Statut.</b> " + esc(STATUT[v.statut_valeur] || v.statut_valeur) + " · " +
          esc(QUALITE[v.niveau_qualite] || v.niveau_qualite) + "</p>" +
          "<p><b>Source.</b> " + esc(v.source) +
          (v.date_source ? ", publiée le " + jour(v.date_source) : "") +
          " · relevée par Atmart le " + jour(v.date_extraction) + "</p>" +
          (d.limites_connues ? '<p class="x-limite"><b>Limites.</b> ' + esc(d.limites_connues) + "</p>" : "") +
          (d.sens_interpretation ? "<p><b>Lecture.</b> " + esc(d.sens_interpretation) + "</p>" : "") +
          "</div></details>";
      }).join("") + "</div>");
    });
    return h.join("");
  }

  function blocLacunes(r) {
    var m = vals.filter(function (v) { return v.pcode_commune === r.pcode; });
    var absents = m.filter(function (v) { return v.statut_valeur === "N"; });
    var bloques = Object.keys(dico).filter(function (k) { return dico[k].statut !== "Disponible"; });
    var h = ['<h3 class="x-h3" id="lacunes">Ce qui reste à documenter</h3>'];
    h.push('<p class="x-note" style="margin-top:0">Une case vide n\'est pas un zéro. ' +
           "Chaque ligne indique pourquoi la donnée manque et ce qui la débloquerait.</p>");
    h.push('<div class="x-tabwrap"><table class="x-tab x-lacunes"><thead><tr>' +
           "<th>Indicateur</th><th>À quoi il sert</th><th>Pourquoi il manque</th>" +
           "<th>Ce qui le débloquerait</th></tr></thead><tbody>");
    absents.forEach(function (v) {
      var d = dico[v.indicateur_id] || {};
      h.push("<tr><td><b>" + esc(d.nom || v.indicateur_id) + "</b></td><td>" +
        esc(d.sens_interpretation || d.definition || "—") + "</td><td>" + esc(v.methode) +
        '</td><td>Compléter le registre national — <a href="donnees-parrainage.html#catalogue">parrainable</a></td></tr>');
    });
    bloques.forEach(function (k) {
      var d = dico[k];
      h.push("<tr><td><b>" + esc(d.nom) + "</b></td><td>" + esc(d.sens_interpretation || d.definition) +
        "</td><td>" + esc(d.statut) + " — " + esc(d.dependance) +
        '</td><td><a href="donnees-parrainage.html#catalogue">Financer la source manquante</a></td></tr>');
    });
    if (!absents.length && !bloques.length) h.push("<tr><td colspan=4>Aucune lacune connue.</td></tr>");
    h.push("</tbody></table></div>");
    h.push('<p class="x-note">Vous disposez d\'une source pour l\'une de ces lignes ? ' +
           '<a href="mailto:sales@atmart.ltd?subject=Source%20pour%20un%20indicateur%20manquant">' +
           "Signalez-la</a> — elle sera créditée au registre des sources.</p>");
    return h.join("");
  }

  function blocComparer(r) {
    if (r.niveau_admin !== "3") return "";
    var voisins = [];
    var parent = parId[r.parent_atmart_geo_id];
    if (parent) voisins = (enfantsDe[parent.atmart_geo_id] || []).filter(function (x) {
      return x.atmart_geo_id !== r.atmart_geo_id; });
    var h = ['<h3 class="x-h3" id="comparer">Comparer</h3>'];
    if (voisins.length) {
      h.push('<p class="x-note" style="margin-top:0">Les autres communes de l\'arrondissement de ' +
             esc(parent.nom_fr) + " :</p>");
      h.push('<div class="x-puces">' + voisins.map(function (v) {
        return '<button class="x-puce" data-id="' + esc(v.atmart_geo_id) + '">' + esc(v.nom_fr) + "</button>";
      }).join("") + "</div>");
    }
    h.push('<p class="x-note">Le <button class="x-lien x-vers-classement">classement des ' +
           terr.filter(function (x) { return x.niveau_admin === "3"; }).length +
           " communes</button> permet de situer n'importe quel territoire sur un indicateur, " +
           "et d'exporter le tableau.</p>");
    return h.join("");
  }

  function blocTechnique(r) {
    var l = [["Code officiel (p-code OCHA)", r.pcode || "—"],
             ["Identifiant Atmart", r.atmart_geo_id],
             ["Version du référentiel", r.version],
             ["Découpage en vigueur depuis", jour(r.date_validite_debut)],
             ["Statut de la valeur", (STATUT[r.statut_valeur] || r.statut_valeur) + " (" + r.statut_valeur + ")"],
             ["Niveau de qualité", (QUALITE[r.niveau_qualite] || r.niveau_qualite) + " (" + r.niveau_qualite + ")"],
             ["Source", r.source + (r.date_source ? ", publiée le " + jour(r.date_source) : "")],
             ["Géométrie", ADMIN ? "disponible dans le Pack Géo" : "non incluse dans l'édition publique"]];
    if (r.latitude) l.push(["Centre (WGS84)", (+r.latitude).toFixed(5) + ", " + (+r.longitude).toFixed(5)]);
    if (r.methode) l.push(["Méthode", r.methode]);
    return '<details class="x-tech"><summary>Informations techniques</summary>' +
      '<p class="x-note">Deux identifiants coexistent : le <b>p-code</b> est le code officiel ' +
      "OCHA/CNIGS, utilisé par les acteurs humanitaires ; l'<b>identifiant Atmart</b> ne change " +
      "jamais, même si la source renumérote, ce qui permet de suivre une entité dans le temps.</p>" +
      '<table class="x-tab">' + l.map(function (x) {
        return "<tr><th>" + esc(x[0]) + "</th><td>" + esc(x[1]) + "</td></tr>"; }).join("") +
      "</table></details>";
  }

  function blocOrganisations(r) {
    if (!ADMIN) return "";
    var liste = (r.niveau_admin === "3" ? orgsCom[r.pcode] : orgsSec[r.pcode]) || [];
    if (!liste.length) return '<h3 class="x-h3">Organisations recensées</h3><p class="x-note">Aucune.</p>';
    var parCat = {};
    liste.forEach(function (o) { (parCat[o.categorie] = parCat[o.categorie] || []).push(o); });
    var h = ['<h3 class="x-h3">Organisations recensées — ' + liste.length + "</h3>"];
    Object.keys(parCat).forEach(function (cat) {
      var g = parCat[cat];
      h.push('<p class="x-theme">' + (THEME[cat] || esc(cat)) + " — " + g.length + "</p>");
      h.push('<div class="x-tabwrap"><table class="x-tab x-orgs"><thead><tr><th>Nom</th><th>Type</th>' +
             "<th>Statut</th><th>Géo</th><th>Identifiant</th></tr></thead><tbody>");
      g.slice(0, 60).forEach(function (o) {
        h.push("<tr><td>" + esc(o.nom) + "</td><td>" + esc(o.sous_categorie) + "</td><td>" +
          (esc(o.statut) || "—") + "</td><td>" + (o.geocode === "Oui" ? "✓" : "—") +
          "</td><td><code>" + esc(o.atmart_org_id) + "</code></td></tr>");
      });
      h.push("</tbody></table></div>");
      if (g.length > 60) h.push('<p class="x-note">' + (g.length - 60) + " autres non affichées.</p>");
    });
    return h.join("");
  }

  function blocEnfants(r) {
    var enf = enfantsDe[r.atmart_geo_id] || [];
    if (!enf.length) return "";
    var lbl = { "1": "arrondissements", "2": "communes", "3": "sections communales", "4": "localités" };
    var h = ['<h3 class="x-h3">' + enf.length + " " + (lbl[r.niveau_admin] || "entités") + "</h3>",
             '<div class="x-puces">' + enf.slice(0, 120).map(function (e) {
               return '<button class="x-puce" data-id="' + esc(e.atmart_geo_id) + '">' + esc(e.nom_fr) + "</button>";
             }).join("") + "</div>"];
    if (enf.length > 120) h.push('<p class="x-note">' + (enf.length - 120) + " autres — affinez par la recherche.</p>");
    return h.join("");
  }

  function blocVerrou(r) {
    if (ADMIN || r.niveau_admin !== "3") return "";
    return '<h3 class="x-h3">Aller plus bas que la commune</h3><div class="x-verrou"><div>' +
      "<p>Les <b>sections communales</b>, les <b>localités et quartiers</b> et les <b>polygones</b> " +
      "existent dans le référentiel, mais l'édition publique s'arrête à la commune. Ils sont livrés " +
      "avec le Pack Géo Haïti.</p><p>Les <b>écoles, centres de santé et marchés nommés</b> sont " +
      "identifiés et rattachés à leur territoire ; leur couverture reste partielle, ils seront " +
      "ouverts quand les registres nationaux seront complets.</p>" +
      '</div><a class="btn btn-primary" href="donnees-pack-geo-haiti.html">Voir le Pack Géo</a></div>';
  }

  function agregat(r) {
    var pcodes = {}, n = 0;
    terr.forEach(function (x) {
      if (x.niveau_admin !== "3") return;
      var cur = x, g = 0;
      while (cur && g++ < 5) {
        if (cur.atmart_geo_id === r.atmart_geo_id) { pcodes[x.pcode] = 1; n++; return; }
        cur = parId[cur.parent_atmart_geo_id];
      }
    });
    var agg = {};
    vals.forEach(function (v) {
      if (!pcodes[v.pcode_commune] || v.statut_valeur === "N") return;
      var x = nb(v.valeur);
      if (x === null) return;
      if (!agg[v.indicateur_id]) agg[v.indicateur_id] = { s: 0, n: 0, u: v.unite, an: v.annee_reference };
      agg[v.indicateur_id].s += x; agg[v.indicateur_id].n++;
    });
    var SOMME = { "IND-GEO-001": 1, "IND-GEO-002": 1, "IND-GEO-003": 1, "IND-SAN-001": 1,
                  "IND-EDU-001": 1, "IND-MAR-001": 1 };
    if (r.superficie_km2 && agg["IND-GEO-001"]) agg["IND-GEO-001"].s = nb(r.superficie_km2);
    if (agg["IND-GEO-004"] && agg["IND-GEO-001"] && agg["IND-GEO-003"])
      agg["IND-GEO-004"].calc = agg["IND-GEO-003"].s / agg["IND-GEO-001"].s * 100;
    var h = ['<h3 class="x-h3">Agrégat sur ' + n + " communes</h3>",
             '<div class="x-mesures">' + Object.keys(agg).map(function (k) {
               var d = dico[k] || {}, a = agg[k];
               var moy = !SOMME[k] && a.calc === undefined;
               var v = a.calc !== undefined ? a.calc : (SOMME[k] ? a.s : a.s / a.n);
               return '<div class="x-mesure x-statique"><b>' + fmt(v, a.u) + "</b><span>" + esc(d.nom || k) +
                 (moy ? " (moyenne)" : "") + '</span><small class="x-mill">Millésime ' +
                 esc(a.an) + "</small></div>";
             }).join("") + "</div>",
             '<p class="x-note">Les totaux ne portent que sur les communes où la donnée existe : ' +
             "additionner des absences reviendrait à les compter pour zéro. Les pourcentages sont des " +
             "moyennes non pondérées.</p>"];
    return h.join("");
  }

  function fiche(id) {
    var r = parId[id];
    if (!r) return;
    courant = r;
    var h = [blocResume(r)];
    if (r.niveau_admin === "3") {
      h.push(blocObjectif(r), blocIndicateurs(r), blocComparer(r), blocLacunes(r));
    } else h.push(agregat(r));
    h.push(blocOrganisations(r), blocEnfants(r), blocVerrou(r), blocTechnique(r));
    $("#x-fiche").innerHTML = h.join("");
    $("#x-fiche").hidden = false;
    var t = $("#x-titre-fiche");
    if (t) t.textContent = r.nom_fr;
    majURL();
    annoncer("Fiche de " + r.nom_fr + " affichée");
  }

  function majURL() {
    if (!courant) return;
    var q = "?id=" + courant.atmart_geo_id + (objectif !== "tout" ? "&objectif=" + objectif : "");
    try { history.replaceState(null, "", q); } catch (e) {}
  }

  /* ------------------------------------------------------------ classement */
  function classement(indId) {
    var d = dico[indId] || {};
    var connus = (parIndicateur[indId] || []);
    var absents = vals.filter(function (v) { return v.indicateur_id === indId && v.statut_valeur === "N"; });
    var an = (connus[0] || {}).annee_reference;
    var h = ['<p class="x-note">' + esc(d.definition) +
             (an ? " <b>Millésime " + esc(an) + ".</b>" : "") +
             (d.limites_connues ? " <b>Limite :</b> " + esc(d.limites_connues) : "") + "</p>"];
    h.push('<div class="x-tabwrap"><table class="x-tab x-classement"><thead><tr><th>#</th><th>Commune</th><th>' +
           esc(d.nom || indId) + "</th><th>Département</th></tr></thead><tbody>");
    connus.forEach(function (v, i) {
      var c = parPcode[v.pcode_commune] || {}, cur = parId[c.parent_atmart_geo_id], dep = null, g = 0;
      while (cur && g++ < 5) { if (cur.niveau_admin === "1") { dep = cur; break; } cur = parId[cur.parent_atmart_geo_id]; }
      h.push("<tr><td>" + (i + 1) + '</td><td><button class="x-lien" data-id="' + esc(c.atmart_geo_id) +
        '">' + esc(v.nom_commune) + "</button></td><td>" + fmt(v.valeur, v.unite) + "</td><td>" +
        esc((dep || {}).nom_fr || "—") + "</td></tr>");
    });
    h.push("</tbody></table></div>");
    if (absents.length) h.push('<p class="x-note"><b>' + absents.length +
      " communes sans donnée</b> — non couvertes par la source, donc absentes du classement plutôt " +
      "que placées en bas : " + absents.map(function (v) { return esc(v.nom_commune); }).sort().join(", ") + ".</p>");
    $("#x-classement-corps").innerHTML = h.join("");
    var b = $("#x-export");
    b.textContent = "Exporter les " + connus.length + " communes classées (CSV)";
  }

  function telecharger(nom, entetes, lignes) {
    var csv = [entetes.join(",")].concat(lignes.map(function (l) {
      return l.map(function (c) { return /[",\n]/.test(String(c)) ? '"' + String(c).replace(/"/g, '""') + '"' : c; }).join(",");
    })).join("\n");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
    a.download = nom; a.click();
  }

  /* ------------------------------------------------------------- démarrage */
  function pret() {
    terr.forEach(function (r) {
      parId[r.atmart_geo_id] = r;
      if (r.pcode) parPcode[r.pcode] = r;
      (enfantsDe[r.parent_atmart_geo_id] = enfantsDe[r.parent_atmart_geo_id] || []).push(r);
    });
    orgs.forEach(function (o) {
      if (o.pcode_commune) (orgsCom[o.pcode_commune] = orgsCom[o.pcode_commune] || []).push(o);
      if (o.pcode_section) (orgsSec[o.pcode_section] = orgsSec[o.pcode_section] || []).push(o);
    });
    vals.forEach(function (v) {
      if (v.statut_valeur === "N" || nb(v.valeur) === null) return;
      (parIndicateur[v.indicateur_id] = parIndicateur[v.indicateur_id] || []).push(v);
    });
    Object.keys(parIndicateur).forEach(function (k) {
      parIndicateur[k].sort(function (a, b) { return nb(b.valeur) - nb(a.valeur); });
    });

    /* compteurs : comptés, jamais écrits en dur */
    var nDep = terr.filter(function (r) { return r.niveau_admin === "1"; }).length;
    var nArr = terr.filter(function (r) { return r.niveau_admin === "2"; }).length;
    var nCom = terr.filter(function (r) { return r.niveau_admin === "3"; }).length;
    var nObs = vals.filter(function (v) { return v.statut_valeur !== "N"; }).length;
    var el = $("#x-compte");
    if (el) el.innerHTML = terr.length.toLocaleString("fr-FR") + " territoires référencés · " +
      nCom + " communes documentées · " + nObs.toLocaleString("fr-FR") + " observations sourcées" +
      (ADMIN ? " · " + orgs.length.toLocaleString("fr-FR") + " organisations" : "");
    var cv = $("#x-couverture");
    if (cv) cv.innerHTML = "Le référentiel administratif en vigueur — CNIGS, publié par OCHA — compte " +
      "<b>" + nDep + " départements, " + nArr + " arrondissements et " + nCom + " communes</b>. " +
      "D'autres référentiels haïtiens, dont les estimations démographiques récentes de l'IHSI, " +
      "en dénombrent davantage. " +
      '<button class="x-lien" id="x-pourquoi">Pourquoi ce nombre varie-t-il ?</button>';

    var sel = $("#x-indicateur"), dispo = {};
    vals.forEach(function (v) { dispo[v.indicateur_id] = 1; });
    Object.keys(dispo).sort().forEach(function (k) {
      var o = document.createElement("option");
      o.value = k; o.textContent = (dico[k] || {}).nom || k;
      sel.appendChild(o);
    });
    sel.value = "IND-QUA-001";
    classement("IND-QUA-001");

    $("#x-chargement").hidden = true;
    $("#x-app").hidden = false;

    var champ = $("#x-recherche");
    champ.addEventListener("input", function () { afficherResultats(chercher(champ.value), champ.value); });
    champ.addEventListener("keydown", function (e) {
      var res = [].slice.call(document.querySelectorAll(".x-res"));
      if (e.key === "ArrowDown" && res.length) { e.preventDefault(); res[0].focus(); }
      if (e.key === "Escape") { $("#x-resultats").hidden = true; }
    });
    $("#x-resultats").addEventListener("keydown", function (e) {
      var res = [].slice.call(document.querySelectorAll(".x-res")), i = res.indexOf(document.activeElement);
      if (e.key === "ArrowDown") { e.preventDefault(); (res[i + 1] || res[0]).focus(); }
      if (e.key === "ArrowUp") { e.preventDefault(); i <= 0 ? champ.focus() : res[i - 1].focus(); }
      if (e.key === "Escape") { $("#x-resultats").hidden = true; champ.focus(); }
    });

    document.addEventListener("click", function (e) {
      var b = e.target.closest("[data-id]");
      if (b) {
        fiche(b.dataset.id);
        $("#x-resultats").hidden = true; champ.value = "";
        var of = document.querySelector('[data-onglet="fiche"]');
        if (of) of.click();
        $("#x-fiche").scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (e.target.closest(".x-btn-export") && courant) {
        var m = vals.filter(function (v) { return v.pcode_commune === courant.pcode; });
        telecharger("atmart_" + courant.pcode + "_indicateurs.csv",
          ["indicateur_id", "indicateur", "valeur", "unite", "annee_reference", "statut_valeur",
           "niveau_qualite", "source", "date_source", "methode"],
          m.map(function (v) {
            var d = dico[v.indicateur_id] || {};
            return [v.indicateur_id, d.nom || "", v.valeur, v.unite, v.annee_reference,
                    v.statut_valeur, v.niveau_qualite, v.source, v.date_source, v.methode];
          }));
        return;
      }
      if (e.target.closest(".x-btn-lien")) {
        var u = location.href;
        if (navigator.clipboard) navigator.clipboard.writeText(u);
        e.target.textContent = "Lien copié ✓";
        setTimeout(function () { e.target.textContent = "Copier le lien de cette fiche"; }, 2200);
        return;
      }
      if (e.target.closest(".x-vers-classement")) {
        document.querySelector('[data-onglet="classement"]').click();
        $("#x-vue-classement").scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (e.target.closest("#x-pourquoi")) {
        var d = $("#x-millesimes"); if (d) { d.open = true; d.scrollIntoView({ behavior: "smooth" }); }
      }
    });

    var selObj = $("#x-objectif");
    if (selObj) selObj.addEventListener("change", function () {
      objectif = selObj.value;
      if (courant) fiche(courant.atmart_geo_id);
    });

    sel.addEventListener("change", function () { classement(sel.value); });
    $("#x-export").addEventListener("click", function () {
      var l = parIndicateur[sel.value] || [];
      telecharger("atmart_" + sel.value + "_classement.csv",
        ["rang", "pcode_commune", "commune", "valeur", "unite", "annee_reference", "source"],
        l.map(function (v, i) {
          return [i + 1, v.pcode_commune, v.nom_commune, v.valeur, v.unite, v.annee_reference, v.source]; }));
    });

    [].forEach.call(document.querySelectorAll("[data-onglet]"), function (b) {
      b.addEventListener("click", function () {
        [].forEach.call(document.querySelectorAll("[data-onglet]"), function (x) {
          x.classList.toggle("active", x === b);
          x.setAttribute("aria-selected", x === b ? "true" : "false");
        });
        $("#x-vue-fiche").hidden = b.dataset.onglet !== "fiche";
        $("#x-vue-classement").hidden = b.dataset.onglet !== "classement";
      });
    });

    var ob = (location.search.match(/objectif=([a-z]+)/) || [])[1];
    if (OBJECTIFS[ob]) { objectif = ob; if (selObj) selObj.value = ob; }
    var id = (location.search.match(/id=([A-Z0-9-]+)/) || [])[1];
    fiche(parId[id] ? id : "HTC-0111");
  }

  var liste = [F.terr, F.vals, F.dico].concat(F.orgs ? [F.orgs] : []);
  Promise.all(liste.map(function (u) {
    return fetch(u).then(function (r) { if (!r.ok) throw new Error(u + " : " + r.status); return r.text(); });
  })).then(function (t) {
    terr = parseCSV(t[0]); vals = parseCSV(t[1]);
    parseCSV(t[2]).forEach(function (d) { dico[d.indicateur_id] = d; });
    if (t[3]) orgs = parseCSV(t[3]);
    pret();
  }).catch(function (e) {
    $("#x-chargement").innerHTML = '<p class="x-vide">Les données n\'ont pas pu être chargées (' +
      esc(e.message) + '). Les fichiers restent téléchargeables depuis le <a href="datasets.html">catalogue</a>.</p>';
  });
})();
