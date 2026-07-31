/* ===== Explorateur Haïti — Atmart Data =====
   Tout tourne dans le navigateur : trois CSV publics, aucun serveur.
   Les données pèsent moins de 300 Ko — inutile d'une base pour cela. */
(function () {
  "use strict";

  var BASE = "data/";
  var F_TERR = BASE + "atmart_referentiel_territoire_base_HT.csv";
  var F_VAL = BASE + "atmart_indicateurs_communes_HT.csv";
  var F_DICO = BASE + "atmart_referentiel_indicateurs.csv";

  var terr = [], vals = [], dico = {};
  var communes = [], parId = {}, parPcode = {};
  var $ = function (s) { return document.querySelector(s); };

  /* --- CSV : les champs « methode » contiennent des virgules et des guillemets --- */
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

  function sansAccent(s) {
    return (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }
  function nb(v) { var n = parseFloat(String(v).replace(",", ".")); return isNaN(n) ? null : n; }
  function fmt(v, unite) {
    var n = nb(v);
    if (n === null) return v || "—";
    var s = (Math.round(n * 100) / 100).toLocaleString("fr-FR");
    return unite === "%" ? s + " %" : (unite && unite !== "nombre" ? s + " " + unite : s);
  }

  /* ------------------------------------------------------------- recherche */
  function chercher(q) {
    var k = sansAccent(q).trim();
    if (!k) return [];
    return terr.filter(function (r) {
      return sansAccent(r.nom_fr).indexOf(k) > -1 ||
             sansAccent(r.nom_ht).indexOf(k) > -1 ||
             sansAccent(r.pcode).indexOf(k) > -1 ||
             sansAccent(r.atmart_geo_id).indexOf(k) > -1;
    }).sort(function (a, b) {
      var na = sansAccent(a.nom_fr).indexOf(k), nbb = sansAccent(b.nom_fr).indexOf(k);
      if (na !== nbb) return na - nbb;
      return a.niveau_admin - b.niveau_admin;
    }).slice(0, 40);
  }

  var NIVEAU = { "1": "Département", "2": "Arrondissement", "3": "Commune" };

  function afficherResultats(liste, q) {
    var el = $("#x-resultats");
    if (!q) { el.innerHTML = ""; el.hidden = true; return; }
    el.hidden = false;
    if (!liste.length) {
      el.innerHTML = '<p class="x-vide">Aucune entité ne correspond à « ' + q.replace(/[<>&]/g, "") +
                     ' ». Essayez un nom de commune, un p-code (HT0121) ou un identifiant Atmart.</p>';
      return;
    }
    el.innerHTML = liste.map(function (r) {
      return '<button class="x-res" data-id="' + r.atmart_geo_id + '">' +
             '<b>' + r.nom_fr + '</b>' +
             (r.nom_ht && r.nom_ht !== r.nom_fr ? ' <i>' + r.nom_ht + '</i>' : "") +
             '<small>' + NIVEAU[r.niveau_admin] + ' · ' + (r.pcode || r.source_geo_id) + '</small></button>';
    }).join("");
  }

  /* ----------------------------------------------------------------- fiche */
  function fiche(id) {
    var r = parId[id];
    if (!r) return;
    var parent = parId[r.parent_atmart_geo_id];
    var grand = parent ? parId[parent.parent_atmart_geo_id] : null;
    var h = [];

    h.push('<div class="x-tete">');
    h.push('<p class="x-fil">' + [grand, parent].filter(Boolean).map(function (p) {
      return '<button class="x-lien" data-id="' + p.atmart_geo_id + '">' + p.nom_fr + '</button>';
    }).join(" › ") + (parent ? " › " : "") + '<span>' + r.nom_fr + '</span></p>');
    h.push('<h2>' + r.nom_fr + (r.nom_ht && r.nom_ht !== r.nom_fr ?
           ' <em>' + r.nom_ht + '</em>' : "") + '</h2>');
    h.push('<p class="x-meta">' + NIVEAU[r.niveau_admin] +
           (r.pcode ? ' · p-code <code>' + r.pcode + '</code>' : "") +
           ' · identifiant Atmart <code>' + r.atmart_geo_id + '</code></p>');
    h.push("</div>");

    /* identité */
    var ident = [];
    if (r.chef_lieu_fr) ident.push(["Chef-lieu", r.chef_lieu_fr + (r.chef_lieu_ht ? " · " + r.chef_lieu_ht : "")]);
    if (r.superficie_km2) ident.push(["Superficie", fmt(r.superficie_km2, "km²")]);
    if (r.latitude) ident.push(["Coordonnées", (+r.latitude).toFixed(4) + ", " + (+r.longitude).toFixed(4)]);
    ident.push(["Découpage en vigueur depuis", r.date_validite_debut || "—"]);
    ident.push(["Source", r.source]);
    h.push('<h3 class="x-h3">Identité</h3><table class="x-tab">' + ident.map(function (l) {
      return "<tr><th>" + l[0] + "</th><td>" + l[1] + "</td></tr>";
    }).join("") + "</table>");

    /* enfants */
    var enfants = terr.filter(function (x) { return x.parent_atmart_geo_id === id; });
    if (enfants.length) {
      h.push('<h3 class="x-h3">' + enfants.length + " " +
             (r.niveau_admin === "1" ? "arrondissements" : "communes") + "</h3>");
      h.push('<div class="x-puces">' + enfants.map(function (e) {
        return '<button class="x-puce" data-id="' + e.atmart_geo_id + '">' + e.nom_fr + "</button>";
      }).join("") + "</div>");
    }

    /* indicateurs : uniquement au niveau commune */
    if (r.niveau_admin === "3") {
      var mesures = vals.filter(function (v) { return v.pcode_commune === r.pcode; });
      var connus = mesures.filter(function (v) { return v.statut_valeur !== "N"; });
      var absents = mesures.filter(function (v) { return v.statut_valeur === "N"; });

      h.push('<h3 class="x-h3">Ce que l\'on sait</h3>');
      h.push('<div class="x-mesures">' + connus.map(function (v) {
        var d = dico[v.indicateur_id] || {};
        return '<div class="x-mesure" title="' + (d.methode_calcul || "").replace(/"/g, "") + '">' +
               '<b>' + fmt(v.valeur, v.unite) + "</b>" +
               "<span>" + (d.nom || v.indicateur_id) + "</span></div>";
      }).join("") + "</div>");

      h.push('<h3 class="x-h3">Ce que l\'on ne sait pas</h3>');
      if (absents.length) {
        h.push('<ul class="x-manque">' + absents.map(function (v) {
          var d = dico[v.indicateur_id] || {};
          return "<li><b>" + (d.nom || v.indicateur_id) + "</b> — " + v.methode + "</li>";
        }).join("") + "</ul>");
      } else {
        h.push('<p class="x-note">Les cinq dimensions du backbone sont documentées pour cette commune. ' +
               "C'est le cas d'une seule commune sur 140.</p>");
      }
      h.push('<p class="x-note">Une absence n\'est jamais écrite « 0 » : elle est déclarée. ' +
             '<a href="donnees-backbone.html#indicateurs">Comment ces indicateurs sont définis →</a></p>');

      h.push('<div class="x-cta"><p>Les <b>sections communales</b>, les <b>localités</b> et les ' +
             '<b>polygones</b> de cette commune sont dans le Pack Géo Haïti.</p>' +
             '<a class="btn btn-primary" href="donnees-pack-geo-haiti.html">Voir le Pack Géo</a></div>');
    } else {
      var pcodes = {}, n = 0;
      terr.forEach(function (x) {
        if (x.niveau_admin === "3" && (x.parent_atmart_geo_id === id ||
            (parId[x.parent_atmart_geo_id] || {}).parent_atmart_geo_id === id)) {
          pcodes[x.pcode] = 1; n++;
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
      /* La superficie de l'entité est donnée par le CNIGS : on la reprend telle
         quelle plutôt que de resommer des valeurs arrondies. Et la densité se
         calcule sur les totaux — moyenner des ratios donnerait un autre chiffre. */
      if (r.superficie_km2 && agg["IND-GEO-001"]) agg["IND-GEO-001"].s = nb(r.superficie_km2);
      if (agg["IND-GEO-004"] && agg["IND-GEO-001"] && agg["IND-GEO-003"]) {
        agg["IND-GEO-004"].calc = agg["IND-GEO-003"].s / agg["IND-GEO-001"].s * 100;
      }
      h.push('<h3 class="x-h3">Agrégat sur ' + n + " communes</h3>");
      h.push('<div class="x-mesures">' + Object.keys(agg).map(function (k) {
        var d = dico[k] || {}, a = agg[k];
        var moyenne = !SOMME[k] && a.calc === undefined;
        var v = a.calc !== undefined ? a.calc : (SOMME[k] ? a.s : a.s / a.n);
        return '<div class="x-mesure"><b>' + fmt(v, a.u) + "</b><span>" + (d.nom || k) +
               (moyenne ? " (moyenne des communes couvertes)" : "") + "</span></div>";
      }).join("") + "</div>");
      h.push('<p class="x-note">Les totaux ne portent que sur les communes où la donnée existe : ' +
             "additionner des absences reviendrait à les compter pour zéro. Les parts en pourcentage " +
             "sont des moyennes non pondérées entre communes, pas des parts recalculées sur l'ensemble.</p>");
    }

    $("#x-fiche").innerHTML = h.join("");
    $("#x-fiche").hidden = false;
    try { history.replaceState(null, "", "?id=" + id); } catch (e) {}
  }

  /* ------------------------------------------------------------ classement */
  function classement(indId) {
    var d = dico[indId] || {};
    var lignes = vals.filter(function (v) { return v.indicateur_id === indId; });
    var connus = lignes.filter(function (v) { return v.statut_valeur !== "N" && nb(v.valeur) !== null; })
                       .sort(function (a, b) { return nb(b.valeur) - nb(a.valeur); });
    var absents = lignes.filter(function (v) { return v.statut_valeur === "N"; });
    var h = [];
    h.push('<p class="x-note">' + (d.definition || "") + " " +
           (d.limites_connues ? "<b>Limite :</b> " + d.limites_connues : "") + "</p>");
    h.push('<table class="x-tab x-classement"><thead><tr><th>#</th><th>Commune</th>' +
           "<th>" + (d.nom || indId) + "</th><th>Département</th></tr></thead><tbody>");
    connus.forEach(function (v, i) {
      var c = parPcode[v.pcode_commune] || {};
      var arr = parId[c.parent_atmart_geo_id] || {};
      var dep = parId[arr.parent_atmart_geo_id] || {};
      h.push("<tr><td>" + (i + 1) + '</td><td><button class="x-lien" data-id="' + c.atmart_geo_id +
             '">' + v.nom_commune + "</button></td><td>" + fmt(v.valeur, v.unite) + "</td><td>" +
             (dep.nom_fr || "—") + "</td></tr>");
    });
    h.push("</tbody></table>");
    if (absents.length) {
      h.push('<p class="x-note"><b>' + absents.length + " communes sans donnée</b> — non couvertes par " +
             "la source, et donc absentes du classement plutôt que placées en bas : " +
             absents.map(function (v) { return v.nom_commune; }).sort().join(", ") + ".</p>");
    }
    $("#x-classement-corps").innerHTML = h.join("");
    $("#x-export").dataset.ind = indId;
  }

  function exporter(indId) {
    var d = dico[indId] || {};
    var lignes = vals.filter(function (v) { return v.indicateur_id === indId; });
    var csv = ["pcode_commune,commune,indicateur,valeur,unite,statut_valeur"].concat(
      lignes.map(function (v) {
        return [v.pcode_commune, '"' + v.nom_commune + '"', v.indicateur_id,
                v.valeur, '"' + v.unite + '"', v.statut_valeur].join(",");
      })).join("\n");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
    a.download = "atmart_" + indId + "_communes_HT.csv";
    a.click();
  }

  /* ------------------------------------------------------------ démarrage */
  function pret() {
    parId = {}; parPcode = {};
    terr.forEach(function (r) {
      parId[r.atmart_geo_id] = r;
      if (r.pcode) parPcode[r.pcode] = r;
    });
    communes = terr.filter(function (r) { return r.niveau_admin === "3"; });

    $("#x-chargement").hidden = true;
    $("#x-app").hidden = false;
    $("#x-compte").textContent = terr.length + " entités · " + communes.length +
      " communes · " + vals.length + " valeurs";

    var sel = $("#x-indicateur");
    var dispo = {};
    vals.forEach(function (v) { dispo[v.indicateur_id] = 1; });
    Object.keys(dispo).sort().forEach(function (k) {
      var o = document.createElement("option");
      o.value = k; o.textContent = (dico[k] || {}).nom || k;
      sel.appendChild(o);
    });
    sel.value = "IND-QUA-001";
    classement("IND-QUA-001");

    var champ = $("#x-recherche");
    champ.addEventListener("input", function () {
      afficherResultats(chercher(champ.value), champ.value);
    });
    document.addEventListener("click", function (e) {
      var b = e.target.closest("[data-id]");
      if (b) {
        fiche(b.dataset.id);
        $("#x-resultats").hidden = true;
        champ.value = "";
        $("#x-fiche").scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
    sel.addEventListener("change", function () { classement(sel.value); });
    $("#x-export").addEventListener("click", function () { exporter(sel.value); });
    [].forEach.call(document.querySelectorAll("[data-onglet]"), function (b) {
      b.addEventListener("click", function () {
        [].forEach.call(document.querySelectorAll("[data-onglet]"), function (x) {
          x.classList.toggle("active", x === b);
        });
        $("#x-vue-fiche").hidden = b.dataset.onglet !== "fiche";
        $("#x-vue-classement").hidden = b.dataset.onglet !== "classement";
      });
    });

    var id = (location.search.match(/id=([A-Z0-9-]+)/) || [])[1];
    fiche(parId[id] ? id : "HTC-0111");
  }

  Promise.all([F_TERR, F_VAL, F_DICO].map(function (u) {
    return fetch(u).then(function (r) {
      if (!r.ok) throw new Error(u + " : " + r.status);
      return r.text();
    });
  })).then(function (t) {
    terr = parseCSV(t[0]);
    vals = parseCSV(t[1]);
    parseCSV(t[2]).forEach(function (d) { dico[d.indicateur_id] = d; });
    pret();
  }).catch(function (e) {
    $("#x-chargement").innerHTML = '<p class="x-vide">Les données n\'ont pas pu être chargées (' +
      e.message + "). Les fichiers restent téléchargeables depuis le " +
      '<a href="datasets.html">catalogue</a>.</p>';
  });
})();
