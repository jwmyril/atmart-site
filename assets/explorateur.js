/* ===== Explorateur Haïti — Atmart Data =====
   Un seul moteur, deux éditions :
     - publique : référentiel de base (192 entités) + indicateurs, chargé
       depuis data/ ; s'adapte au profil de l'utilisateur.
     - administrateur : référentiels complets (11 707 entités + 5 029
       organisations), chargés depuis un dossier local jamais publié.
   La configuration arrive par window.ATM_EXPLORATEUR avant ce script. */
(function () {
  "use strict";

  var CFG = window.ATM_EXPLORATEUR || {};
  var ADMIN = !!CFG.admin;
  var DIR = CFG.dir || "data/";
  var FICHIERS = {
    terr: DIR + (ADMIN ? "atmart_referentiel_territoire_HT.csv"
                       : "atmart_referentiel_territoire_base_HT.csv"),
    vals: DIR + "atmart_indicateurs_communes_HT.csv",
    dico: DIR + "atmart_referentiel_indicateurs.csv",
    orgs: ADMIN ? DIR + "atmart_referentiel_organisations_HT.csv" : null
  };

  var terr = [], vals = [], orgs = [], dico = {};
  var parId = {}, parPcode = {}, enfantsDe = {}, orgsDeCommune = {}, orgsDeSection = {};
  var profil = "tout";
  var $ = function (s) { return document.querySelector(s); };

  /* ---------------------------------------------------------------- outils */
  function parseCSV(txt) {
    txt = txt.replace(/^﻿/, "");
    var lignes = [], champ = "", ligne = [], q = false, i, c;
    for (i = 0; i < txt.length; i++) {
      c = txt[i];
      if (q) {
        if (c === '"') { if (txt[i + 1] === '"') { champ += '"'; i++; } else q = false; }
        else champ += c;
      } else if (c === '"') q = true;
      else if (c === ",") { ligne.push(champ); champ = ""; }
      else if (c === "\n") { ligne.push(champ); lignes.push(ligne); ligne = []; champ = ""; }
      else if (c !== "\r") champ += c;
    }
    if (champ !== "" || ligne.length) { ligne.push(champ); lignes.push(ligne); }
    var head = lignes.shift();
    return lignes.filter(function (l) { return l.length > 1; }).map(function (l) {
      var o = {}; head.forEach(function (h, j) { o[h] = (l[j] || "").trim(); }); return o;
    });
  }
  function sansAccent(s) { return (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); }
  function nb(v) { var n = parseFloat(String(v).replace(",", ".")); return isNaN(n) ? null : n; }
  function esc(s) { return String(s || "").replace(/[<>&"]/g, function (c) {
    return { "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]; }); }
  function fmt(v, unite) {
    var n = nb(v);
    if (n === null) return esc(v) || "—";
    var s = (Math.round(n * 100) / 100).toLocaleString("fr-FR");
    return unite === "%" ? s + " %" : (unite && unite !== "nombre" ? s + " " + esc(unite) : s);
  }

  var NIVEAU = { "1": "Département", "2": "Arrondissement", "3": "Commune",
                 "4": "Section communale", "5": "Localité" };
  var THEME = { Territoire: "🗺 Territoire", Santé: "🏥 Santé", Éducation: "🎓 Éducation",
                Marchés: "🛒 Marchés", Qualité: "📋 Qualité de la donnée",
                Démographie: "👥 Démographie", Accessibilité: "🚦 Accessibilité",
                "Finances publiques": "💰 Finances publiques" };

  /* -------------------------------------------------------------- profils */
  var PROFILS = {
    tout: { nom: "Tout afficher", intro: "" },
    entreprise: {
      nom: "🏢 Entreprise",
      intro: "Ce que cette commune vous dit avant d'y implanter quoi que ce soit : sa taille, " +
             "son maillage de localités, l'offre de services déjà en place et la fiabilité de " +
             "ce que l'on sait d'elle.",
      cta: ['Pack décisionnel « implantation » — nous croisons ces indicateurs avec votre question',
            'donnees-solutions.html#packs', "Voir les packs décisionnels"]
    },
    ong: {
      nom: "🌍 ONG & bailleur",
      intro: "Pour cibler, le score de complétude compte autant que les chiffres : il vous dit " +
             "où votre diagnostic reposera sur du solide et où il reposera sur du vide.",
      cta: ["Les p-codes de cette commune se joignent directement à vos bases de bénéficiaires",
            "donnees-pack-geo-haiti.html", "Le référentiel géographique complet"]
    },
    administration: {
      nom: "🏛 Administration",
      intro: "Le même découpage territorial pour tous vos services, avec les codes officiels " +
             "CNIGS et OCHA, et une trace de la source pour chaque valeur.",
      cta: ["Licence institutionnelle : accès multi-utilisateurs, mises à jour, support",
            "donnees-solutions.html#licences", "Voir les licences"]
    },
    recherche: {
      nom: "🎓 Chercheur & étudiant",
      intro: "Chaque valeur porte sa méthode de calcul, sa source et ses limites — de quoi " +
             "l'écrire dans une méthodologie sans avoir à la justifier vous-même.",
      cta: ["Atmart Campus ouvre les jeux complets pour un mémoire ou une thèse",
            "donnees-campus.html", "Demander un accès Campus"]
    },
    sponsor: {
      nom: "🤝 Sponsor",
      intro: "Regardez la section « Ce que l'on ne sait pas » : chaque ligne est un angle mort " +
             "qu'un parrainage ferait disparaître, ici et dans les 139 autres communes.",
      cta: ["Financer l'ouverture d'un registre national coûte entre 2 500 et 3 000 $",
            "donnees-parrainage.html#catalogue", "Parrainer un registre"]
    },
    grandpublic: {
      nom: "👥 Grand public",
      intro: "Ce que l'on sait publiquement de votre commune — et ce que personne ne sait " +
             "encore, ce qui est une information en soi.",
      cta: ["Tout ceci est libre, sous licence CC BY 4.0",
            "datasets.html#shelf-free", "Télécharger les données"]
    }
  };

  /* ------------------------------------------------------------- recherche */
  function chercher(q) {
    var k = sansAccent(q).trim();
    if (!k) return [];
    var res = [];
    for (var i = 0; i < terr.length && res.length < 400; i++) {
      var r = terr[i];
      if (sansAccent(r.nom_fr).indexOf(k) > -1 || sansAccent(r.nom_ht).indexOf(k) > -1 ||
          sansAccent(r.pcode).indexOf(k) > -1 || sansAccent(r.atmart_geo_id).indexOf(k) > -1) res.push(r);
    }
    return res.sort(function (a, b) {
      var pa = sansAccent(a.nom_fr).indexOf(k), pb = sansAccent(b.nom_fr).indexOf(k);
      if (pa !== pb) return pa - pb;
      return a.niveau_admin - b.niveau_admin;
    }).slice(0, 40);
  }

  function afficherResultats(liste, q) {
    var el = $("#x-resultats");
    if (!q) { el.innerHTML = ""; el.hidden = true; return; }
    el.hidden = false;
    if (!liste.length) {
      el.innerHTML = '<p class="x-vide">Aucune entité ne correspond à « ' + esc(q) +
                     ' ». Essayez un nom de commune, un p-code (HT0121) ou un identifiant Atmart.</p>';
      return;
    }
    el.innerHTML = liste.map(function (r) {
      return '<button class="x-res" data-id="' + esc(r.atmart_geo_id) + '"><b>' + esc(r.nom_fr) + "</b>" +
             (r.nom_ht && r.nom_ht !== r.nom_fr ? " <i>" + esc(r.nom_ht) + "</i>" : "") +
             "<small>" + (NIVEAU[r.niveau_admin] || r.type_entite) + " · " +
             esc(r.pcode || r.source_geo_id) + "</small></button>";
    }).join("");
  }

  /* ----------------------------------------------------------------- fiche */
  function fil(r) {
    var chaine = [], cur = parId[r.parent_atmart_geo_id], garde = 0;
    while (cur && garde++ < 6) { chaine.unshift(cur); cur = parId[cur.parent_atmart_geo_id]; }
    return chaine.map(function (p) {
      return '<button class="x-lien" data-id="' + esc(p.atmart_geo_id) + '">' + esc(p.nom_fr) + "</button>";
    }).join(" › ") + (chaine.length ? " › " : "") + "<span>" + esc(r.nom_fr) + "</span>";
  }

  function blocIdentite(r) {
    var l = [];
    if (r.chef_lieu_fr) l.push(["Chef-lieu", esc(r.chef_lieu_fr) + (r.chef_lieu_ht ? " · " + esc(r.chef_lieu_ht) : "")]);
    if (r.superficie_km2) l.push(["Superficie", fmt(r.superficie_km2, "km²")]);
    if (r.population) l.push(["Population", fmt(r.population, "habitants")]);
    if (r.latitude) l.push(["Coordonnées", (+r.latitude).toFixed(5) + ", " + (+r.longitude).toFixed(5)]);
    l.push(["Découpage en vigueur depuis", esc(r.date_validite_debut) || "—"]);
    l.push(["Statut de la valeur", esc(r.statut_valeur) + " · qualité " + esc(r.niveau_qualite)]);
    l.push(["Source", esc(r.source)]);
    if (ADMIN && r.methode) l.push(["Méthode", esc(r.methode)]);
    return '<h3 class="x-h3">Identité</h3><table class="x-tab">' + l.map(function (x) {
      return "<tr><th>" + x[0] + "</th><td>" + x[1] + "</td></tr>"; }).join("") + "</table>";
  }

  function blocIndicateurs(pcode) {
    var mesures = vals.filter(function (v) { return v.pcode_commune === pcode; });
    if (!mesures.length) return "";
    var connus = mesures.filter(function (v) { return v.statut_valeur !== "N"; });
    var absents = mesures.filter(function (v) { return v.statut_valeur === "N"; });
    var groupes = {};
    connus.forEach(function (v) {
      var d = dico[v.indicateur_id] || {}, cat = d.categorie || "Autres";
      (groupes[cat] = groupes[cat] || []).push([v, d]);
    });
    var h = ['<h3 class="x-h3">Indicateurs — ce que l\'on sait</h3>'];
    Object.keys(groupes).forEach(function (cat) {
      h.push('<p class="x-theme">' + (THEME[cat] || cat) + "</p>");
      h.push('<div class="x-mesures">' + groupes[cat].map(function (p) {
        var v = p[0], d = p[1];
        return '<div class="x-mesure"><b>' + fmt(v.valeur, v.unite) + "</b><span>" +
               esc(d.nom || v.indicateur_id) + "</span>" +
               (d.methode_calcul ? '<small class="x-meth">' + esc(d.methode_calcul) + "</small>" : "") +
               "</div>";
      }).join("") + "</div>");
    });
    h.push('<h3 class="x-h3">Ce que l\'on ne sait pas</h3>');
    if (absents.length) {
      h.push('<ul class="x-manque">' + absents.map(function (v) {
        var d = dico[v.indicateur_id] || {};
        return "<li><b>" + esc(d.nom || v.indicateur_id) + "</b> — " + esc(v.methode) + "</li>";
      }).join("") + "</ul>");
    } else {
      h.push('<p class="x-note">Les cinq dimensions du backbone sont documentées ici. ' +
             "C'est le cas d'une seule commune sur 140.</p>");
    }
    /* indicateurs définis mais non calculables : la vraie carte du manque */
    var bloques = Object.keys(dico).filter(function (k) { return dico[k].statut !== "Disponible"; });
    if (bloques.length) {
      h.push('<p class="x-note"><b>' + bloques.length + " indicateurs de plus sont définis mais " +
             "encore incalculables</b>, ici comme partout : " +
             bloques.map(function (k) { return esc(dico[k].nom); }).join(", ") +
             ". Il leur manque surtout la population communale. " +
             '<a href="donnees-backbone.html#indicateurs">Voir leurs définitions →</a></p>');
    }
    return h.join("");
  }

  function blocOrganisations(r) {
    if (!ADMIN) return "";
    var liste = (r.niveau_admin === "3" ? orgsDeCommune[r.pcode] : orgsDeSection[r.pcode]) || [];
    if (!liste.length) return '<h3 class="x-h3">Organisations recensées</h3>' +
      '<p class="x-note">Aucune organisation rattachée à cette entité dans les sources actuelles.</p>';
    var parCat = {};
    liste.forEach(function (o) { (parCat[o.categorie] = parCat[o.categorie] || []).push(o); });
    var h = ['<h3 class="x-h3">Organisations recensées — ' + liste.length + "</h3>"];
    Object.keys(parCat).forEach(function (cat) {
      var g = parCat[cat];
      h.push('<p class="x-theme">' + (THEME[cat] || cat) + " — " + g.length + "</p>");
      h.push('<div class="x-tabwrap"><table class="x-tab x-orgs"><thead><tr><th>Nom</th><th>Type</th>' +
             "<th>Statut</th><th>Géocodé</th><th>Identifiant Atmart</th></tr></thead><tbody>");
      g.slice(0, 60).forEach(function (o) {
        h.push("<tr><td>" + esc(o.nom) + "</td><td>" + esc(o.sous_categorie) + "</td><td>" +
               (esc(o.statut) || "—") + "</td><td>" + (o.geocode === "Oui" ? "✓" : "—") +
               '</td><td><code>' + esc(o.atmart_org_id) + "</code></td></tr>");
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
    var h = ['<h3 class="x-h3">' + enf.length + " " + (lbl[r.niveau_admin] || "entités") + "</h3>"];
    h.push('<div class="x-puces">' + enf.slice(0, 120).map(function (e) {
      return '<button class="x-puce" data-id="' + esc(e.atmart_geo_id) + '">' + esc(e.nom_fr) + "</button>";
    }).join("") + "</div>");
    if (enf.length > 120) h.push('<p class="x-note">' + (enf.length - 120) + " autres — affinez par la recherche.</p>");
    return h.join("");
  }

  function blocVerrou(r) {
    if (ADMIN || r.niveau_admin !== "3") return "";
    return '<h3 class="x-h3">Descendre plus bas</h3>' +
      '<div class="x-verrou"><div>' +
      "<p><b>Sections communales, localités et quartiers</b> — le découpage sous la commune, " +
      "les 10 945 lieux habités et leurs coordonnées, ainsi que les polygones, sont dans le " +
      "Pack Géo Haïti. L'explorateur public s'arrête à la commune.</p>" +
      "<p><b>Écoles, centres de santé et marchés nommés</b> — 5 029 organisations sont identifiées " +
      "et rattachées à leur territoire, mais leur couverture reste partielle (14 communes en santé, " +
      "49 en éducation). Elles seront ouvertes quand les registres nationaux seront complets.</p>" +
      '</div><a class="btn btn-primary" href="donnees-pack-geo-haiti.html">Voir le Pack Géo</a></div>';
  }

  function blocProfil() {
    if (ADMIN || profil === "tout") return "";
    var p = PROFILS[profil];
    if (!p || !p.cta) return "";
    return '<div class="x-profil"><p class="x-theme">' + p.nom + "</p><p>" + p.intro + "</p>" +
           '<p class="x-note" style="margin-top:0.7rem">' + p.cta[0] + " — " +
           '<a href="' + p.cta[1] + '">' + p.cta[2] + " →</a></p></div>";
  }

  function agregat(r) {
    var pcodes = {}, n = 0;
    terr.forEach(function (x) {
      if (x.niveau_admin !== "3") return;
      var cur = x, garde = 0;
      while (cur && garde++ < 5) {
        if (cur.atmart_geo_id === r.atmart_geo_id) { pcodes[x.pcode] = 1; n++; return; }
        cur = parId[cur.parent_atmart_geo_id];
      }
    });
    var agg = {};
    vals.forEach(function (v) {
      if (!pcodes[v.pcode_commune] || v.statut_valeur === "N") return;
      var x = nb(v.valeur);
      if (x === null) return;
      if (!agg[v.indicateur_id]) agg[v.indicateur_id] = { s: 0, n: 0, u: v.unite };
      agg[v.indicateur_id].s += x; agg[v.indicateur_id].n++;
    });
    var SOMME = { "IND-GEO-001": 1, "IND-GEO-002": 1, "IND-GEO-003": 1, "IND-SAN-001": 1,
                  "IND-EDU-001": 1, "IND-MAR-001": 1 };
    if (r.superficie_km2 && agg["IND-GEO-001"]) agg["IND-GEO-001"].s = nb(r.superficie_km2);
    if (agg["IND-GEO-004"] && agg["IND-GEO-001"] && agg["IND-GEO-003"])
      agg["IND-GEO-004"].calc = agg["IND-GEO-003"].s / agg["IND-GEO-001"].s * 100;
    var h = ['<h3 class="x-h3">Agrégat sur ' + n + " communes</h3>"];
    h.push('<div class="x-mesures">' + Object.keys(agg).map(function (k) {
      var d = dico[k] || {}, a = agg[k];
      var moy = !SOMME[k] && a.calc === undefined;
      var v = a.calc !== undefined ? a.calc : (SOMME[k] ? a.s : a.s / a.n);
      return '<div class="x-mesure"><b>' + fmt(v, a.u) + "</b><span>" + esc(d.nom || k) +
             (moy ? " (moyenne des communes couvertes)" : "") + "</span></div>";
    }).join("") + "</div>");
    h.push('<p class="x-note">Les totaux ne portent que sur les communes où la donnée existe : ' +
           "additionner des absences reviendrait à les compter pour zéro. Les parts en pourcentage " +
           "sont des moyennes non pondérées entre communes.</p>");
    return h.join("");
  }

  function fiche(id) {
    var r = parId[id];
    if (!r) return;
    var h = ['<div class="x-tete"><p class="x-fil">' + fil(r) + "</p>",
             "<h2>" + esc(r.nom_fr) + (r.nom_ht && r.nom_ht !== r.nom_fr ?
               " <em>" + esc(r.nom_ht) + "</em>" : "") + "</h2>",
             '<p class="x-meta">' + (NIVEAU[r.niveau_admin] || esc(r.type_entite)) +
             (r.pcode ? " · p-code <code>" + esc(r.pcode) + "</code>" : "") +
             " · identifiant Atmart <code>" + esc(r.atmart_geo_id) + "</code></p></div>"];
    h.push(blocProfil());
    h.push(blocIdentite(r));
    if (r.niveau_admin === "3") h.push(blocIndicateurs(r.pcode));
    else if (r.niveau_admin === "1" || r.niveau_admin === "2") h.push(agregat(r));
    h.push(blocOrganisations(r));
    h.push(blocEnfants(r));
    h.push(blocVerrou(r));
    $("#x-fiche").innerHTML = h.join("");
    $("#x-fiche").hidden = false;
    try { history.replaceState(null, "", "?id=" + id + (profil !== "tout" ? "&profil=" + profil : "")); } catch (e) {}
  }

  /* ------------------------------------------------------------ classement */
  function classement(indId) {
    var d = dico[indId] || {};
    var lignes = vals.filter(function (v) { return v.indicateur_id === indId; });
    var connus = lignes.filter(function (v) { return v.statut_valeur !== "N" && nb(v.valeur) !== null; })
                       .sort(function (a, b) { return nb(b.valeur) - nb(a.valeur); });
    var absents = lignes.filter(function (v) { return v.statut_valeur === "N"; });
    var h = ['<p class="x-note">' + esc(d.definition) + " " +
             (d.limites_connues ? "<b>Limite :</b> " + esc(d.limites_connues) : "") + "</p>"];
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
    if (absents.length) {
      h.push('<p class="x-note"><b>' + absents.length + " communes sans donnée</b> — non couvertes par " +
             "la source, donc absentes du classement plutôt que placées en bas : " +
             absents.map(function (v) { return esc(v.nom_commune); }).sort().join(", ") + ".</p>");
    }
    $("#x-classement-corps").innerHTML = h.join("");
  }

  function exporter(indId) {
    var lignes = vals.filter(function (v) { return v.indicateur_id === indId; });
    var csv = ["pcode_commune,commune,indicateur,valeur,unite,statut_valeur"].concat(
      lignes.map(function (v) {
        return [v.pcode_commune, '"' + v.nom_commune + '"', v.indicateur_id,
                v.valeur, '"' + v.unite + '"', v.statut_valeur].join(","); })).join("\n");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
    a.download = "atmart_" + indId + "_communes_HT.csv";
    a.click();
  }

  /* ------------------------------------------------------------- démarrage */
  function pret() {
    terr.forEach(function (r) {
      parId[r.atmart_geo_id] = r;
      if (r.pcode) parPcode[r.pcode] = r;
      (enfantsDe[r.parent_atmart_geo_id] = enfantsDe[r.parent_atmart_geo_id] || []).push(r);
    });
    orgs.forEach(function (o) {
      if (o.pcode_commune) (orgsDeCommune[o.pcode_commune] = orgsDeCommune[o.pcode_commune] || []).push(o);
      if (o.pcode_section) (orgsDeSection[o.pcode_section] = orgsDeSection[o.pcode_section] || []).push(o);
    });

    var nCom = terr.filter(function (r) { return r.niveau_admin === "3"; }).length;
    $("#x-chargement").hidden = true;
    $("#x-app").hidden = false;
    $("#x-compte").textContent = terr.length.toLocaleString("fr-FR") + " entités · " + nCom +
      " communes · " + vals.length.toLocaleString("fr-FR") + " valeurs" +
      (ADMIN ? " · " + orgs.length.toLocaleString("fr-FR") + " organisations" : "");

    var sel = $("#x-indicateur"), dispo = {};
    vals.forEach(function (v) { dispo[v.indicateur_id] = 1; });
    Object.keys(dispo).sort().forEach(function (k) {
      var o = document.createElement("option");
      o.value = k; o.textContent = (dico[k] || {}).nom || k;
      sel.appendChild(o);
    });
    sel.value = "IND-QUA-001";
    classement("IND-QUA-001");

    var champ = $("#x-recherche");
    champ.addEventListener("input", function () { afficherResultats(chercher(champ.value), champ.value); });
    document.addEventListener("click", function (e) {
      var b = e.target.closest("[data-id]");
      if (b) {
        fiche(b.dataset.id);
        $("#x-resultats").hidden = true; champ.value = "";
        document.querySelector('[data-onglet="fiche"]').click();
        $("#x-fiche").scrollIntoView({ behavior: "smooth", block: "start" });
      }
      var p = e.target.closest("[data-profil]");
      if (p) {
        profil = p.dataset.profil;
        [].forEach.call(document.querySelectorAll("[data-profil]"), function (x) {
          x.classList.toggle("active", x === p); });
        var cur = (location.search.match(/id=([A-Z0-9-]+)/) || [])[1];
        fiche(parId[cur] ? cur : "HTC-0111");
      }
    });
    sel.addEventListener("change", function () { classement(sel.value); });
    $("#x-export").addEventListener("click", function () { exporter(sel.value); });
    [].forEach.call(document.querySelectorAll("[data-onglet]"), function (b) {
      b.addEventListener("click", function () {
        [].forEach.call(document.querySelectorAll("[data-onglet]"), function (x) {
          x.classList.toggle("active", x === b); });
        $("#x-vue-fiche").hidden = b.dataset.onglet !== "fiche";
        $("#x-vue-classement").hidden = b.dataset.onglet !== "classement";
      });
    });

    var pr = (location.search.match(/profil=([a-z]+)/) || [])[1];
    if (PROFILS[pr]) {
      var bt = document.querySelector('[data-profil="' + pr + '"]');
      if (bt) bt.click();
    }
    var id = (location.search.match(/id=([A-Z0-9-]+)/) || [])[1];
    fiche(parId[id] ? id : "HTC-0111");
  }

  var aCharger = [FICHIERS.terr, FICHIERS.vals, FICHIERS.dico].concat(FICHIERS.orgs ? [FICHIERS.orgs] : []);
  Promise.all(aCharger.map(function (u) {
    return fetch(u).then(function (r) {
      if (!r.ok) throw new Error(u + " : " + r.status);
      return r.text(); });
  })).then(function (t) {
    terr = parseCSV(t[0]);
    vals = parseCSV(t[1]);
    parseCSV(t[2]).forEach(function (d) { dico[d.indicateur_id] = d; });
    if (t[3]) orgs = parseCSV(t[3]);
    pret();
  }).catch(function (e) {
    $("#x-chargement").innerHTML = '<p class="x-vide">Les données n\'ont pas pu être chargées (' +
      esc(e.message) + "). Les fichiers restent téléchargeables depuis le " +
      '<a href="datasets.html">catalogue</a>.</p>';
  });
})();
