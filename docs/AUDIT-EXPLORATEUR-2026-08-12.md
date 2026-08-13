# Audit de l'Explorateur Atmart Data — 12 août 2026

**Étape 0 du chantier d'évolution.** Aucun chiffre de ce document n'est repris
d'une note, d'un prompt ou d'une version antérieure : tout est recalculé depuis
les fichiers réellement publiés dans `data/`, ou mesuré sur
https://atmart.ltd/donnees-explorateur.html le 12/08/2026.

| | |
|---|---|
| Version auditée | `explorateur.js?v=22`, `data.css?v=12`, cache `atmart-v61`, données `?d=2026-08-11b` |
| Commits | `478d4ad` (données pyramide) et `aeb460c` (affichage), poussés le 12/08 |
| Méthode | scripts de comptage sur les CSV publiés · Chrome piloté par CDP sur la page en ligne · banc de tests `tests/explorateur-tests.html` |
| Sources de vérité lues | les deux documents stratégiques (`Orientation stratégique…`, `Document stratégique d'évolution… version enrichie`), le registre des sources, le dictionnaire des indicateurs, le référentiel des millésimes, `DATA-ATMART-ETAT.md` |

---

## 1. Volumes recalculés

| Objet | Compté | Détail |
|---|---:|---|
| Entités territoriales | **192** | 10 départements · 42 arrondissements · 140 communes |
| Indicateurs au dictionnaire | **32** | dont 27 avec au moins une observation |
| Observations | **3 094** | dont **217 en statut `N`** (absence documentée) |
| Libellés traduits (satellite i18n) | **672** | 32 indicateurs × 7 champs × 3 langues, sauf 5 indicateurs sans i18n |
| Sources au registre | **13** | SRC-001 à SRC-013 |
| Périodes au référentiel temps | **1 201** | 5 périodes seulement sont utilisées par les observations |
| Millésimes territoriaux | **192** | tous `CNIGS 2018`, validité ouverte au 29/11/2018 |

**Divergences relevées avec les documents de référence :**

1. Les deux documents stratégiques parlent des « **profils des 145 communes** ».
   Le référentiel publié en compte **140** — c'est le millésime CNIGS 2018
   (COD-AB, republié par OCHA le 26/01/2026). Les deux chiffres sont vrais dans
   leur propre référentiel : des communes créées après 2018 existent, mais ne
   sont pas dans ce millésime. `atmart_millesimes_territoriaux.csv` porte déjà
   la note qui le dit, sur les 192 lignes, et le bloc dépliable « Pourquoi le
   nombre de communes varie-t-il selon les sources ? » l'explique dans la page,
   avec une « formulation exacte » irréprochable. **Le défaut n'est donc pas
   l'absence d'explication, mais sa contradiction par deux phrases visibles sans
   déplier** : le compteur de couverture (« le référentiel administratif **en
   vigueur** ») et la puce CNIGS du même bloc (« le découpage administratif **en
   vigueur**, valide au 29 novembre 2018 ») — voir P0-1.
2. Le brief de mission mentionne « complétude 100 % » et « Ce qui reste à
   documenter : 0 ». Vérifié : ces deux affichages ne se produisent que sur
   **une commune sur 140 — Port-au-Prince**, qui se trouve être la **fiche
   ouverte par défaut à chaque visite** (`fiche(parId[id] ? id : "HTC-0111")`).
   Tout premier visiteur voit donc le seul cas contradictoire du jeu.

---

## 2. Couverture réelle, par indicateur

Le compteur affiche « 140 communes documentées ». La couverture par indicateur
va en réalité de **10 % à 100 %**.

| Indicateur | Communes avec valeur | Couverture | Représentation de l'absence |
|---|---:|---:|---|
| IND-GEO-001 · Superficie | 140 | 100 % | — |
| IND-GEO-002 · Sections communales | 140 | 100 % | — |
| IND-GEO-003 · Localités recensées | 140 | 100 % | — |
| IND-GEO-004 · Densité de localités | 140 | 100 % | — |
| IND-POP-001 · Population | 140 | 100 % | — |
| IND-POP-002 · Densité de population | 140 | 100 % | — |
| IND-POP-003 à 013 · structure par âge (11) | 140 | 100 % | — |
| IND-QUA-001 · Score de complétude | 140 | 100 % | — |
| IND-MAR-001 · Marchés suivis | 140 | 100 % | — |
| IND-EDU-001 · Écoles recensées | 49 | **35 %** | 91 lignes `N` — visible |
| IND-EDU-002 · Part d'écoles publiques | 49 | **35 %** | 91 communes **sans ligne** — invisible |
| IND-EDU-003 · Écoles publiques | 49 | **35 %** | 91 communes **sans ligne** — invisible |
| IND-SAN-001 · Établissements de santé | 14 | **10 %** | 126 lignes `N` — visible |
| IND-SAN-002 à 005 (4 indicateurs) | 14 | **10 %** | 126 communes **sans ligne** — invisible |

**Cinq indicateurs du dictionnaire n'ont aucune observation** : `IND-SAN-010`,
`IND-EDU-010`, `IND-BUD-001`, `IND-ACC-001`, `IND-PRX-001`. Ils apparaissent
dans « Ce qui reste à documenter » par la voie du statut du dictionnaire, pas
par une ligne de donnée.

### Le trou : 686 absences silencieuses

Six indicateurs marqués `Disponible` n'ont **aucune ligne** pour les communes
non couvertes : ni valeur, ni statut `N`. Total : **686 couples (commune,
indicateur) invisibles**. Pour ces couples, l'interface n'affiche rien du tout —
ce qui n'est pas un zéro, mais n'est pas non plus un « non documenté ». La règle
maison « une valeur manquante n'est jamais un zéro » est tenue ; sa moitié
manquante — « une valeur manquante doit être visible » — ne l'est pas.

| Indicateur | Communes sans aucune ligne |
|---|---:|
| IND-EDU-002, IND-EDU-003 | 91 chacun |
| IND-SAN-002, 003, 004, 005 | 126 chacun |

---

## 3. Le score de complétude : ce qu'il mesure vraiment

`IND-QUA-001` — « Score de complétude administrative ».

- **Méthode inscrite dans la donnée** : « Cinq dimensions testées : superficie,
  localités, santé, écoles, marchés ».
- **Dénominateur déclaré au dictionnaire** : *vide*. Les colonnes `numerateur`
  et `denominateur` ne sont pas remplies ; le facteur n'est pas explicite.
- **Distribution réelle** : 40 % → 4 communes · 60 % → 74 · 80 % → 61 ·
  **100 % → 1** (Port-au-Prince).

L'affichage « complétude 100 % » signifie donc : *cinq dimensions sur cinq du
socle de base sont renseignées*. Il ne signifie pas « toutes les données
existent », et il ne parle ni des 32 indicateurs, ni des 5 indicateurs
à construire, ni de la couverture sectorielle. Le libellé actuel — le mot
« complétude », seul, suivi d'un pourcentage — ne permet pas de le savoir.

---

## 4. Statuts, qualité, périodes

| Statut de valeur | Lignes | Signification |
|---|---:|---|
| `E` estimée | 1 820 | projections COD-PS 2024 (population et structure par âge) |
| `A` agrégée par Atmart | 1 057 | comptages sur le backbone |
| `N` non documentée | 217 | absence explicite |
| `O` observée | **0** | aucune observation directe publiée à ce jour |

| Niveau de qualité | Lignes |
|---|---:|
| A | 490 |
| B | 2 240 |
| C | 364 |

**Périodes** — les 5 périodes utilisées joignent toutes le référentiel temps :
`HT-A-2018` (280), `HT-A-2022` (238), `HT-A-2023` (196), `HT-A-2024` (1 820),
`HT-A-2026` (560). Aucune clé orpheline.

**Point de vigilance sur `HT-A-2026`** : les 560 lignes en année de référence
2026 sont `IND-GEO-003`, `IND-GEO-004` (GeoNames, `date_source` 2026-01-26),
`IND-MAR-001` (PAM, 2026-07-26) et `IND-QUA-001` (calcul Atmart, 2026-07-31).
Pour ces quatre indicateurs, l'année de référence est **l'année d'extraction**,
pas l'année d'observation du phénomène. C'est défendable pour un stock observé
au moment de l'extraction, mais la distinction demandée par le référentiel temps
(date d'observation ≠ date de publication ≠ date d'extraction) n'est pas portée
par la donnée.

**Règles d'agrégation au dictionnaire** : `somme` 16 · `ratio_recalcule` 9 ·
`non_agregeable` 5 · `officielle` 1 · `moyenne_simple` 1. La règle
`moyenne_simple` mérite un réexamen : moyenner un indicateur entre communes est
précisément ce que la règle n° 4 du produit interdit.

---

## 5. Matrice juridique des 13 sources

| Classe | Sources | Conséquence |
|---|---|---|
| **A** — redistribution autorisée | SRC-001 (CNIGS/OCHA), SRC-002 (GeoNames), SRC-009, SRC-010 (OCHA Haïti), SRC-011 (PAM), SRC-013 (UNFPA COD-PS) | publiables telles quelles avec attribution |
| **B** — agrégats et transformations | SRC-003 (IHSI), SRC-006 (CNSA/FEWS/WFP), SRC-007 (BRH), SRC-012 (HOT/Healthsites, ODbL) | SRC-012 est **écartée des produits payants** : le partage à l'identique ODbL est incompatible avec une licence Atmart |
| **C** — accès en ligne, redistribution à confirmer | SRC-004 (MENFP/SIGEEE), SRC-005 (MSPP), SRC-008 (DHS) | microdonnées DHS jamais redistribuables ; agrégats seulement |

**Trois licences portent la mention « À vérifier »** (SRC-003 IHSI, SRC-004
MENFP, SRC-005 MSPP) et alimentent pourtant des indicateurs publiés
(`IND-EDU-*`, `IND-SAN-*`). C'est le principal risque juridique ouvert.

Les sources d'enquêtes demandées par le brief — **LAPOP/Vanderbilt**, **Banque
mondiale (WDI, Microdata, Enterprise Surveys, ECVMAS, enquêtes à haute
fréquence)**, **EMMUS/DHS au-delà de SRC-008**, **SPA**, **recensements IHSI**,
**RGA**, **Findex** — ne sont **pas** au registre. Seul DHS y figure.

---

## 6. Interface : ce qui existe, ce qui est partiel, ce qui dort

**Acquis vérifiés en ligne** — fiche aux 3 niveaux · agrégation par règle du
dictionnaire (`somme`, `ratio_recalcule` avec `facteur_ratio`, `officielle`,
`non_agregeable`) · comparaison de 2 à 4 territoires avec alerte de millésimes ·
classement aux 3 niveaux × 4 normalisations · carte SVG · **pyramide des âges
SVG** (ajoutée le 12/08) · exports CSV avec ligne de traçabilité · impression ·
liens partageables restaurant territoire, onglet, objectif, comparaison,
indicateur, niveau et normalisation.

**Partiel ou dormant :**

| Élément | État |
|---|---|
| Sélecteur « Adapter cette fiche à mon usage » | présent, 5 objectifs définis ; n'agit que sur l'ordre des thèmes et un paragraphe de résumé — pas de vraie vue métier |
| Résumé décisionnel | absent : la fiche s'ouvre directement sur ~25 cartes d'indicateurs |
| Première visite | pas d'écran d'accueil : la fiche de Port-au-Prince s'affiche d'emblée, y compris sous l'onglet classement |
| Multilingue | moteur complet, dictionnaires ht/en/es présents (187 entrées), **désactivé** (`ATM_LANGUES = ["fr"]`), pages `/ht/ /en/ /es/` en `noindex` |
| Langue dans l'URL | **non mémorisée** — les 8 autres paramètres d'état le sont |
| Édition administrateur | `ADMIN` charge les organisations (5 029) ; non publiée |

---

## 7. Mesures runtime (page en ligne, 12/08/2026)

| Mesure | Résultat |
|---|---|
| Erreurs console | **0** |
| Requêtes en échec | **0** |
| Débordement horizontal à 320 / 375 / 390 / 430 / 768 / 1024 / 1440 px | **0 px partout** |
| DOMContentLoaded / load | 155 ms / 188 ms |
| Requêtes au premier rendu | 17 |
| `h1` / repères ARIA / `aria-live` | 1 / 3 / 1 |
| Onglets | `role=tablist` 1, `role=tab` 3, `role=tabpanel` 3 |
| SVG sans `role` | 0 / 2 |
| Images sans `alt` | 0 |
| Boutons ou liens sans nom accessible | 0 |

### Poids réels : une correction importante

Le serveur sert les données **en gzip**. Les tailles sur lesquelles les décisions
d'architecture ont été prises jusqu'ici étaient les tailles **brutes**, pas
celles transférées :

| Fichier | Brut | Transféré | Rapport |
|---|---:|---:|---:|
| `atmart_pyramide_ages_HT.csv` | 1 111 703 o | **72 310 o** | ÷ 15,4 |
| `atmart_indicateurs_communes_HT.csv` | 714 672 o | **38 648 o** | ÷ 18,5 |

**Conséquence sur une décision prise le 12/08 :** la pyramide a été exclue du
précache du service worker et chargée seulement à l'approche de l'écran, au
motif de « 1,1 Mo imposés à chaque visiteur ». Sur le réseau, le coût réel est
de **72 Ko**. L'argument de transfert ne tient pas ; restent le coût de
décompression et l'analyse de 7 140 lignes sur téléphone bas de gamme, qui
justifient encore le chargement différé mais **pas** l'exclusion du précache.
À rouvrir — voir P1-6.

`Cache-Control: max-age=600` sur les fichiers de données : 10 minutes. Court
pour des données dont le millésime change deux fois par an ; le paramètre `?d=`
gère déjà l'invalidation.

### Accessibilité : le détail des écarts

- **`scope` absent sur 42 `<th>` sur 42.** En-têtes de colonne (`thead`) comme
  en-têtes de ligne (`tbody`) : aucune association explicite. WCAG 1.3.1.
- **40 cibles tactiles sous 44 × 44 px à 1 440 px**, sur 381 cibles. Mesures :
  `.x-puce` 28 px de haut, `.filter-btn` 35 px, `.x-lien` 22 px, `.atm-share`
  37 px. Les 21 liens en ligne dans du texte relèvent de l'exception du critère
  WCAG 2.5.8. Le minimum **AA (24 × 24)** est tenu partout **sauf** les
  boutons-liens `.x-lien` à 22 px ; la règle interne 44 × 44 n'est tenue que
  sous 1 024 px, où le CSS l'impose déjà.

---

## 8. Internationalisation et SEO

| Point | État |
|---|---|
| Clés de traduction interrogées par le moteur | **174** |
| Entrées par dictionnaire (ht, en, es) | 187 |
| **Chaînes sans traduction** | **18 par langue** — toutes issues de la pyramide ajoutée le 12/08 |
| Entrées orphelines (traduites, plus utilisées) | 31 par langue |
| Champs traduits des indicateurs (satellite CSV) | complet : 7 champs × 3 langues × 32 indicateurs |
| `hreflang` | **absent** de la page publique |
| `canonical` | présent, autoréférentiel ✔ |
| Entrées `donnees-explorateur` au sitemap | **1** (français seul) |
| Pages `/ht/ /en/ /es/` | existent, en **`noindex`**, renvoient vers le français |

Le multilingue est donc **techniquement prêt à 90 %** : il manque 18 chaînes,
le nettoyage de 31 orphelines, la relecture humaine du kreyòl, `hreflang`, les
entrées de sitemap et la mémorisation de la langue dans l'URL.

---

## 9. Tests

`tests/explorateur-tests.html` — **44 assertions, toutes vertes**, vérifiées
deux fois de suite le 12/08 par Chrome piloté (mode `?auto=1` prévu pour cela).

Couvert : alerte de millésimes · ratios recalculés et non moyennés · règle
`officielle` · carte tracée · restauration d'état depuis l'URL · bascule de
langue sans perte d'état · ordinaux, dates et nombres localisés · pages
localisées en `noindex` · normalisation par habitant · densité et facteur de
ratio · pyramide (9 assertions).

**Non couvert par les tests** : couverture par indicateur, absences
silencieuses, cohérence du score de complétude, exports CSV (contenu et
encodage), impression, accessibilité, liens et ressources, SEO multilingue,
unicité des identifiants, validité des hiérarchies territoriales.

---

## 10. Backlog classé

Effort : **S** ≤ 2 h · **M** ½ à 1 j · **L** 2 à 4 j · **XL** > 1 semaine.

### P0 — corriger la sémantique et la confiance

| # | Action | Effort | Critère d'acceptation |
|---|---|---|---|
| P0-1 | Remplacer « référentiel administratif en vigueur » par « **référentiel territorial CNIGS 2018 retenu pour cette édition** » et remonter la note de divergence des millésimes à l'endroit où le nombre de communes est affiché | S | La phrase n'affirme plus un statut légal ; la note « des référentiels plus récents reconnaissent des communes créées après 2018 » est lisible depuis le compteur ; test d'assertion sur la formulation |
| P0-2 | Séparer les six notions de couverture (référentiel / profil de base / sectorielle / par indicateur / fraîcheur / indicateurs à construire) avec un libellé propre à chacune | M | Aucun pourcentage n'apparaît sans son dénominateur nommé ; infobulle sur chaque score |
| P0-3 | Lever la contradiction de la fiche Port-au-Prince : « complétude 100 % » + « reste à documenter (0) » + 5 indicateurs manquants listés | S | Le score s'affiche « **5 dimensions du socle sur 5** » ; le compteur du bouton additionne absences documentées **et** indicateurs à construire |
| P0-4 | Remplacer « 140 communes documentées » par la distinction socle / couverture par indicateur | S | Le compteur dit « 140 communes au socle territorial » ; la couverture réelle par indicateur est accessible en un clic |
| P0-5 | Afficher pour chaque indicateur les 12 métadonnées exigées, dont **couverture (n et %)**, aujourd'hui absente de la carte | M | Chaque carte dépliée montre les 12 champs ; couverture calculée, jamais écrite en dur |
| P0-6 | Rendre visibles les **686 absences silencieuses** et étendre la taxonomie des absences (zéro observé, non documenté, non applicable, non agrégeable, non publiable, estimation, calcul Atmart) | M | Aucun couple (commune, indicateur `Disponible`) sans affichage ; la légende des 7 statuts est accessible ; test d'assertion sur le compte |

### P1 — expérience, référentiels, couches de données

| # | Action | Effort | Dépendances |
|---|---|---|---|
| ~~P1-1~~ | ~~Écran d'accueil~~ — **fait le 12/08** : bloc d'accueil, niveaux comptés, fiche présentée comme exemple | M | — |
| ~~P1-2~~ | ~~Résumé décisionnel calculé~~ — **fait le 12/08** : 3 constats classés, 3 manques motivés, état, avertissements, actions | L | P0-2, P0-5 |
| ~~P1-3~~ | ~~Fiche réduite + « Voir tous »~~ — **fait le 12/08**, état mémorisé dans l'URL | M | P1-2 |
| ~~P1-4~~ | ~~Vraies vues métier~~ — **fait le 12/08** : 6 vues (une ajoutée, implantation économique), chacune avec ses indicateurs, son ordre, sa lecture et ses actions | L | P1-2 |
| ~~P1-5~~ | ~~Langue dans l'URL~~ — **fait le 13/08**, priorité page localisée > lien > préférence mémorisée | S | — |
| ~~P1-6~~ | ~~Précache rouvert~~ — **fait le 13/08** : la pyramide y entre, l'affichage reste différé | S | — |
| ~~P1-7~~ | ~~Nature de la période et fraîcheur~~ — **fait le 13/08** : `nature_periode` (observation / relevé / millésime) et `date_prochaine_revision`, retard calculé à l'affichage | M | — |
| ~~P1-8~~ | ~~Huit champs au dictionnaire~~ — **fait le 13/08** : type, dimensions, population de référence, confidentialité, diffusion, responsable, révision | M | — |
| ~~P1-9~~ | ~~Schéma maître des organisations~~ — **fait le 13/08** : millésime, dates de validité, 4 029 variantes de nom conservées ; schéma documenté | L | — |
| ~~P1-10~~ | ~~`IND-EDU-010` rempli~~ — **fait le 13/08** : 49 communes, 91 absences documentées, écart mesuré écrit dans les limites | S | — |
| ~~P1-11~~ | ~~`IND-SAN-010` rempli~~ — **fait le 13/08** : 14 communes, 126 absences documentées | S | — |
| ~~P1-12~~ | ~~Enquêtes au registre~~ — **fait le 13/08** : 22 sources, 6 intégrées et 16 identifiées ; 4 licences vérifiées, 11 marquées « À vérifier » sans date | M | matrice juridique |
| P1-13 | Lever les 3 licences « À vérifier » (IHSI, MENFP, MSPP) | M | démarche externe — **bloqué hors du dépôt** |
| ~~P1-14~~ | ~~`scope` et cibles tactiles~~ — **fait le 13/08** : 42/42 en-têtes associés, boutons-liens à 24 px. Reste hors périmètre : le bouton de fermeture du tiroir de partage (22 px, `style.css` l. 614, asset site-wide) | S | — |
| P1-15 | Multilingue : ~~chaînes sans traduction~~ (0 restante au 12/08), 36 orphelines à nettoyer, `hreflang`, sitemap, relecture kreyòl | L | relecture humaine — **décision requise** |

### P2 — produit et mesure

P2-1 appels à l'action contextuels préremplis (indicateur, territoire, source
nécessaire, résultat attendu) · P2-2 mesure d'usage respectueuse de la vie
privée · P2-3 évolution temporelle et comparaison à la moyenne
départementale/nationale · P2-4 matrice de couverture des sources · P2-5 rang
avec nombre de territoires couverts.

### P3 — extension

P3-1 couches sectorielles suivantes dans l'ordre des documents stratégiques
(registre scolaire géocodé → registre sanitaire versionné → marchés et prix) ·
P3-2 API · P3-3 réplication de méthode hors Haïti.

---

## 11. Matrice : recommandation stratégique → existant → écart → action

Lecture des deux documents stratégiques, confrontée à ce qui est déployé.

| Recommandation | Ce qui existe déjà | Écart | Action |
|---|---|---|---|
| **Backbone : 4 référentiels maîtres** | 4 référentiels existent — territoire (192), temps (1 201 périodes), indicateurs (32), organisations (5 029, admin) | Temps et indicateurs incomplets ; organisations non publiées et sans schéma maître | P1-7, P1-8, P1-9 |
| **PackGeo comme colonne vertébrale** | identifiants Atmart immuables, p-codes, noms fr/ht, centre et chef-lieu distincts, millésimes datés | Les polygones restent hors édition publique — **choix commercial assumé**, pas un écart | aucune |
| **Niveau 1 — reconstruction** | COD-PS, COD-AB, GeoNames, listes santé/écoles reconstruits et scriptés | Aucun PDF encore reconstruit (BRH, MENFP, MSPP) | P3-1 |
| **Niveau 2 — harmonisation historique** | millésimes tracés, alerte quand ils diffèrent | **Aucune série temporelle** : 5 périodes, jamais deux millésimes du même indicateur | P2-3 |
| **Niveau 3 — croisement** | densité (pop ÷ superficie), structure par âge, densité de localités | Croisements limités au territoire × démographie | P1-10, P1-11 puis P3-1 |
| **Niveau 4 — indicateurs dérivés** | 9 ratios recalculés, facteur d'échelle explicite | `IND-EDU-010`, `IND-SAN-010`, `IND-ACC-001`, `IND-PRX-001`, `IND-BUD-001` définis mais vides | P1-10, P1-11 |
| **Niveau 5 — produit décisionnel** | exports CSV tracés, impression, liens partageables | Ni Power BI, ni GeoJSON par territoire, ni fiche méthodologique téléchargeable, ni synthèse de décision | P1-2, P2-1 |
| **Modèle de qualité : statut par observation** | 7 statuts définis, `E`/`A`/`N` utilisés | `O`, `H`, `I`, `M` jamais employés ; **aucune observation directe publiée** | P0-6 |
| **Passeport de dataset** | registre des sources à 16 colonnes, dictionnaire à 19 | Pas de passeport par jeu publié (couverture, fraîcheur, cohérence, précision, prochaine révision) | P1-7, P1-8 |
| **Matrice juridique A→E** | classes A/B/C portées par les 13 sources | 3 licences « À vérifier » ; classes D et E jamais employées | P1-13 |
| **Gratuit → dataset → pack pro → licence institutionnelle** | couche gratuite en ligne, liens vers PackGeo et parrainage | Appels à l'action non contextuels ; aucune demande préremplie | P2-1 |
| **Accès académique contrôlé** | mention au site | Aucun circuit dans l'Explorateur | P2-1 |
| **Sponsor a Dataset** | lien « Financer la source manquante » dans le bloc lacunes | Ne transmet ni l'indicateur, ni le territoire, ni le coût estimé | P2-1 |
| **Haïti d'abord, méthode exportable** | toute la chaîne est paramétrée par pays dans les noms de fichiers | Aucun écart à ce stade | — |
| **Enquêtes (LAPOP, Banque mondiale, DHS, SPA, RGA, Findex)** | seul DHS est au registre (SRC-008) | 6 familles de sources absentes du registre | P1-12 |

## 12. P2-2 — mesure d'usage : spécification, et pourquoi elle n'est pas implémentée

**Décision requise avant toute ligne de code.** La page de l'Explorateur affirme,
dans son propre corps de texte :

> Tout tourne dans votre navigateur : quatre fichiers publics et un contour
> cartographique, **aucun serveur, aucun compte, aucun traceur**.

Toute mesure qui remonte jusqu'à Atmart contredit cette phrase telle qu'elle est
écrite. Poser un traceur sur une page qui promet de ne pas en poser n'est pas un
arbitrage technique : c'est revenir sur une promesse publiée. Quatre voies, avec
leur conséquence exacte :

| Voie | Ce qu'Atmart obtient | Conséquence sur la promesse |
|---|---|---|
| **A — ne rien mesurer** | rien | intacte |
| **B — mesure locale** : compteurs dans `localStorage`, affichés au visiteur, effaçables par lui, jamais transmis | rien — sauf si le visiteur envoie son relevé volontairement | intacte à la lettre |
| **C — mesure d'audience anonyme** : événements agrégés, sans cookie ni identifiant, sans adresse IP conservée | l'essentiel de ce que le brief demande | **la phrase doit être réécrite** — « aucun traceur publicitaire, une mesure d'audience anonyme » |
| **D — journaux serveur** | pages vues seulement | sans objet : GitHub Pages n'expose pas de journaux |

**Ce qui serait mesuré, si la voie C était retenue** — et rien d'autre :
recherches lancées · territoires consultés · changements d'usage · comparaisons
lancées · exports CSV · impressions · indicateurs dépliés · clics vers le Pack
Géo · demandes de financement ouvertes · demandes de licence.

**Ce qui ne serait jamais collecté** : adresse IP conservée, identifiant
persistant, empreinte de navigateur, contenu de recherche libre, aucune donnée
permettant de retrouver une personne.

**Conservation** : agrégats à 12 mois, événements bruts à 30 jours, purge
automatique, tableau de bord interne et politique publiée sur la page de
confiance.

Tant que cette décision n'est pas prise, **rien n'est instrumenté** : ni script,
ni requête, ni identifiant. L'Explorateur reste conforme à ce qu'il annonce.

---

## 13. P3 — les couches sectorielles, et ce qui les empêche

Les trois couches suivantes du portefeuille sont bloquées, pour deux raisons
distinctes qu'il vaut mieux ne pas confondre.

| Couche | Source | Empêchement | Levée |
|---|---|---|---|
| **Registre scolaire géocodé** | SRC-004 — MENFP / SIGEEE | licence **« À vérifier »**, redistribution non confirmée | P1-13, démarche externe |
| **Registre sanitaire versionné** | SRC-005 — MSPP | licence **« À vérifier »**, redistribution non confirmée | P1-13, démarche externe |
| **Marchés et prix** | SRC-011 — PAM, **classe A, CC BY-IGO** | juridiquement clair. Mais seul le **registre des 182 marchés** est en zone source ; la série de prix n'y est pas, et HDX refuse les requêtes automatisées (**403** le 13/08) | un téléchargement depuis un navigateur |

Autrement dit : **les deux couches prioritaires attendent une autorisation, la
troisième attend un fichier.** La couche des prix est celle qui peut démarrer le
plus vite — il manque une seule chose, le CSV des prix alimentaires d'Haïti
depuis HDX, à déposer dans une zone source horodatée avec son manifeste
SHA-256. La chaîne saura le traiter : le référentiel des marchés est déjà
géocodé et rattaché aux communes, le référentiel temps porte les 720 périodes
mensuelles nécessaires, et le dictionnaire attend déjà `IND-PRX-001`
(volatilité des prix par marché).

Ce qui a été fait pour préparer ces couches, et qui tient : les organisations
portent désormais un millésime et des dates de validité — sans quoi une seconde
photographie d'un registre écraserait la première au lieu de la versionner.

---

## 14. Suites données à cet audit

| Date | Lot | Contenu |
|---|---|---|
| 12/08 | **P0** (6/6) | sémantique du référentiel, couverture par indicateur, score de complétude, compteur, 686 absences documentées |
| 12/08 | **P1 expérience** (P1-1 à P1-4) | accueil, résumé décisionnel calculé, fiche réduite, six vues métier |
| 13/08 | **P1 backbone** (P1-7 à P1-9, P1-12) | nature de la période et échéance de révision, 8 champs au dictionnaire, millésime et validité des organisations, 9 enquêtes au registre, schéma des quatre référentiels |
| 13/08 | **P1 rendement** (P1-5, P1-6, P1-10, P1-11, P1-14) | deux ratios d'offre calculés, langue dans l'URL, précache rouvert, en-têtes associés et cibles à 24 px |
| 13/08 | **P2** (P2-1, P2-3, P2-4, P2-5) | appels à l'action contextuels, situation départementale et nationale, matrice de couverture des sources. **P2-2 spécifié, non implémenté** — voir §12 |

Restent ouverts : **P1-13** (bloqué hors du dépôt) et **P1-15** (multilingue : 39 orphelines, `hreflang`, sitemap, relecture kreyòl), puis P2 et P3. Les treize autres lignes du P1 sont fermées.

## 15. Ce que cet audit ne couvre pas

- **Contraste des couleurs** : non mesuré automatiquement, à vérifier à l'outil.
- **Navigation clavier réelle** et lecteurs d'écran : les attributs ARIA sont
  présents et corrects, le parcours n'a pas été testé au clavier.
- **Contenu des exports CSV** ouverts dans Excel avec accents et kreyòl.
- **Rendu d'impression** : vérifié en CSS, pas en PDF réel.
- **Édition administrateur** (5 029 organisations) : hors périmètre public.
- **Les recommandations stratégiques hors Explorateur** (packs, licences,
  sponsoring) : listées au backlog, non instruites ici.
