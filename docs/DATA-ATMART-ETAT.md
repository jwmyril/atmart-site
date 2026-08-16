# Data Atmart — état des lieux et reprise de travail

**Document de reprise.** Il vit dans le dépôt `jwmyril/atmart-site`, donc il
suit le code partout : autre compte Claude, autre machine, autre session.
À lire en premier pour reprendre le chantier.

Dernière mise à jour : **2026-08-14 soir** (journée : budget national, fiche Pays, annuaire des services, infrastructures, page Couches, mesure d'usage voie C, modèles Power BI/QGIS validés, chrome factorisé)

---

## 1. Où en est l'Explorateur Haïti

**En ligne** : https://explorateur.atmart.ltd/ (site autonome — l'ancienne URL atmart.ltd renvoie ici)

| | état |
|---|---|
| Langue | **français seul** — multilingue en pause assumée (voir §4) |
| Moteur | `assets/explorateur.js` v41+ (?v=11 sur le site autonome) — un seul fichier, deux éditions ; fiche Pays, bloc services, repères nationaux |
| Données | 4 CSV publics + 1 GeoJSON, chargés dans le navigateur — aucun serveur, aucun compte, aucun traceur |
| Territoires | 192 entités CNIGS 2018 + l'entité synthétique « Haïti » cherchable (pays/peyi) — polygones départements et communes tracés |
| Observations | **4 200 lignes** — 2 949 valeurs sourcées et **1 251 absences documentées** |
| Série de prix | `atmart_prix_marches_HT.csv` — **14 140 relevés, 240 mois (2005-2025), 12 marchés, 9 communes**. Première série temporelle et première donnée en statut `O` |
| Couverture | de **10 %** (santé, 14 communes) à **100 %** (territoire, démographie) — affichée indicateur par indicateur depuis le 12/08 |
| Pyramide des âges | `atmart_pyramide_ages_HT.csv`, 7 140 lignes — **dessinée sur chaque fiche**, aux 3 niveaux, chargée quand la section approche de l'écran (72 Ko transférés, 1,1 Mo bruts) |
| Multilingue | dictionnaires ht/en/es **complets** (214 entrées, 0 chaîne sans traduction) — publication toujours en pause (voir §4) |
| Tests | suite générale 87 assertions + suite services 15 (`Explorateur_site/tests/`) ; banc local perturbé par une inspection HTTP du poste — la validation finale se fait en production |
| Backbone | 4 référentiels + organisations (5 029) — registre : **35 sources**, dont MEF/DGB, MPCE, OCHA 3W, HOT/OSM, WPdx, OpenCelliD, CNIGS/HaitiData |
| Audit | [AUDIT-EXPLORATEUR-2026-08-12.md](AUDIT-EXPLORATEUR-2026-08-12.md) — état des lieux, matrice stratégique, backlog P0/P1/P2/P3 |

### Ce que l'Explorateur sait faire

**Écran d'accueil** présentant la fiche d'exemple comme telle · **résumé
décisionnel calculé** (trois constats classés, trois manques motivés, état de la
documentation, avertissements) · **fiche réduite aux indicateurs de l'usage
choisi**, dépliable et mémorisée dans l'URL · **six vues métier** — vue
d'ensemble, services publics, projet, recherche, implantation économique, ma
commune — chacune avec ses indicateurs, son ordre et ses actions ·
fiche territoriale par commune / arrondissement / département · comparaison de
2 à 4 territoires avec **alerte quand les millésimes diffèrent** · classement
aux 3 niveaux avec 4 lectures (brute, pour 100 km², part du total national,
**pour 10 000 habitants**) · carte de situation SVG sans dépendance externe ·
**pyramide des âges SVG** (17 tranches × F/M, effectifs exacts dépliables,
export CSV par territoire) · **matrice de couverture des sources** (source ×
département, les angles morts visibles) · **situation** de chaque valeur face à
son département et au pays, avec qualification des totaux partiels · **appels à
l'action contextuels** qui préremplissent la demande de parrainage · exports CSV traçés (source, millésime, méthode,
langue des libellés) · bloc « Ce qui reste à documenter » · liens partageables
restaurant l'état complet.

### Les règles qui gouvernent le produit

1. **Jamais de donnée fictive.** Aucune valeur inventée, nulle part.
2. **Une valeur manquante n'est jamais un zéro.** Statut `N` → « non documenté ».
3. **Aucune divergence de référentiel masquée.** Les écarts sont documentés et affichés.
4. **Les pourcentages se recalculent sur les totaux**, jamais en moyennant les taux communaux.
5. **La couverture réelle est affichée** — santé : 14 communes sur 140 ; écoles : 49 sur 140. Jamais laissé entendre national.

---

## 2. Où vivent les choses

| Quoi | Où | Versionné ? |
|---|---|---|
| Site public + Explorateur | `Power_BI_Claude/Atmart_website/` | **oui** — `jwmyril/atmart-site`, branche `main` |
| Données publiées | `Atmart_website/data/*.csv` | oui |
| Tests + préproduction + générateurs | `Atmart_website/tests/` | **non** — exclu par `.gitignore` (fixtures synthétiques marquées « ne pas publier ») |
| Scripts de construction, backbone, Pack Potentialités | `Power_BI_Claude/Atmart_premium_datasets/` | **oui** — `jwmyril/atmart-datasets`, **privé**, branche `main` (11 Mo versionnés sur 82) |
| Mémoire de travail | `~/.claude/projects/C--Users-USUARIO-.../memory/` | non — locale (60 fiches) |
| Transcrits des sessions | même dossier, `*.jsonl` | non — locaux (27 sessions, 364 Mo) |

> **Risque traité le 10/08/2026.** La chaîne de production est désormais dans
> `jwmyril/atmart-datasets` (privé) : 78 fichiers, 11 Mo — les 14 scripts, les
> 7 référentiels du backbone, les registres et la documentation. Ce qui n'y est
> pas (sources brutes 31 Mo, livrables régénérables, PDF) est documenté dans
> `SOURCES-EXTERNES.md` du même dépôt, avec URLs et ordre de reconstruction.
>
> **Reste non sauvegardé** : `_codes/` — les codes d'accès **vendus** aux
> clients (Chofè360, Entèvyou360, Karye360). Volontairement hors dépôt : un
> dépôt se clone et se restaure, un code vendu ne doit exister qu'une fois. Ils
> attendent une sauvegarde chiffrée séparée.

---

## 3. Scripts à connaître

```bash
# Reconstruire la population communale depuis la zone source (empreintes vérifiées)
python Atmart_premium_datasets/build_population.py

# Densité communale (IND-POP-002) — dérivée, aucune source nouvelle
python Atmart_premium_datasets/build_densite.py

# Pyramide des âges : satellite 7 140 lignes + 11 indicateurs dérivés (IND-POP-003..013)
python Atmart_premium_datasets/build_pyramide.py

# Absences documentées : aucune case vide silencieuse sur un indicateur Disponible
python Atmart_premium_datasets/build_absences.py

# Ratios d'offre de service : IND-EDU-010 et IND-SAN-010
python Atmart_premium_datasets/build_ratios_service.py

# Prix des marchés : série 2005-2025 + IND-PRX-001 (empreintes vérifiées)
python Atmart_premium_datasets/build_prix_marches.py

# Régénérer sitemap.xml + robots.txt depuis le contenu réel du dossier
python Atmart_website/tests/generer-sitemap.py

# Vérifier qu'un asset modifié a bien vu son ?v= monter (piège de cache)
python Atmart_website/tests/verif-versions.py

# Régénérer les pages localisées — à relancer le jour de la réouverture du multilingue
python Atmart_website/tests/generer-pages-localisees.py

# Chrome unique des 12 pages du site des donnees — a relancer apres tout ajout
# de page ou d'entree de menu. Deplace dans l'atelier le 15/08/2026 : il vit
# desormais dans un depot versionne, et il trouve le site quel que soit le
# dossier d'ou on l'appelle (l'ancien travaillait sur le dossier courant et
# pouvait ne rien faire en le disant bien).
python Atmart_premium_datasets/build_chrome.py
python Atmart_premium_datasets/build_csp.py        # APRES tout script qui reecrit du HTML

# FRAICHEUR — une fois par mois, sans lien avec une publication. Interroge
# l'API HDX pour les 12 sources qui y vivent, compare a nos dates de
# verification, et ecrit rapports/fraicheur_sources.csv. Les 24 autres sources
# y figurent aussi, avec l'age de notre verification : un rapport qui n'en
# couvrirait que 12 aurait l'air complet en ne disant qu'un tiers.
#   --bloquant : sort en erreur s'il y a au moins une source a rafraichir,
#   pour qu'une tache planifiee le signale au lieu de reussir en silence.
python Atmart_premium_datasets/build_fraicheur.py --bloquant

# ARCHIVES — a relancer avant chaque publication de donnees. Materialise
# chaque version distincte des fichiers publies sous archives/, avec son
# empreinte, et engendre archives.html. Une archive publiee n'est JAMAIS
# reecrite : le script s'arrete s'il trouve une empreinte qui a bouge.
#   --verifier : controle sans rien produire.
python Atmart_premium_datasets/build_archives.py

# Porter la vitrine vers le site des donnees — DERNIER maillon de la chaine.
# Deplace dans l'atelier le 15/08/2026 : il porte la LISTE des fichiers a
# publier, un etat qui n'avait aucun historique tant qu'il vivait hors depot.
python Atmart_premium_datasets/sync_donnees.py

# Site autonome (Explorateur_site/tests/, hors depot)
python Explorateur_site/tests/verifier-liens.py    # garde-fou 404 interne avant publication
```

**Routine avant toute publication** : `node --check assets/explorateur.js` →
ouvrir `tests/explorateur-tests.html` → 82/82 → `python tests/verif-versions.py`
→ commit + push. Le service worker sert des copies figées : **toujours** monter
le `?v=` d'un asset modifié *et* le nom du cache dans `sw.js`.

---

## 4. Décisions prises, et pourquoi

- **Multilingue en pause (10/08/2026).** L'Explorateur se finalise en français ;
  kreyòl / anglais / espagnol rouvriront d'un bloc. Motif : maintenir quatre
  langues pendant les itérations ferait diverger les pages en silence. Les URLs
  `/ht/ /en/ /es/` déjà partagées ne cassent pas — elles renvoient vers le
  français, en `noindex`, avec un mot dans leur langue. Tout le travail i18n est
  conservé et testé via `tests/preprod-explorateur.html`.
- **Population = statut E.** Projection 2024 (UNFPA COD-PS, CC BY-IGO,
  11 899 555 habitants, jointure p-code 140/140). Une estimation, jamais un
  dénombrement : le dernier recensement date de 2003.
- **Âge scolaire = 5-19 ans, pas 5-18 (11/08/2026).** Le COD-PS est quinquennal :
  découper la tranche 15-19 exigerait d'inventer une répartition à l'intérieur
  d'une tranche. Même motif pour l'âge médian, non publié. `IND-EDU-010` sera
  donc « écoles pour 10 000 jeunes de 5 à 19 ans ».
- **La pyramide se charge à l'approche de l'écran (12/08/2026)**, pas à
  l'ouverture de la fiche : l'Explorateur ouvre toujours une fiche d'accueil
  (Port-au-Prince), et le fichier fait 7 140 lignes à analyser — un coût réel
  sur téléphone bas de gamme, pour une section que peu de visites atteignent.
  Le bouton « Imprimer / PDF » l'attend avant d'ouvrir la boîte d'impression,
  sinon le PDF sortirait amputé.
  > **Correction du 12/08 (audit).** Cette décision et l'exclusion du précache
  > avaient été argumentées sur « 1,1 Mo imposés à chaque visiteur ». Le serveur
  > sert en gzip : le coût réseau réel est de **72 Ko**. Le chargement différé
  > reste justifié par l'analyse des 7 140 lignes ; l'exclusion du précache du
  > service worker, non — elle est rouverte en P1-6 du backlog.
- **La pyramide vit dans un satellite**, `atmart_pyramide_ages_HT.csv`
  (140 communes × 17 tranches × F/M/T). Une distribution ne rentre pas dans une
  table d'indicateurs à une valeur par ligne ; les onze lectures agrégées
  (IND-POP-003..013), elles, sont dans la table d'indicateurs, seule source du
  classement, de la comparaison et des exports.
- **ODbL écartée** des produits propriétaires (OpenStreetMap, réseau routier) —
  le partage à l'identique est incompatible avec une licence Atmart.
- **Pack Potentialités abandonné** (IRPCH + PCD). Motif : péremption
  (édition 2005), qualité de saisie, comparabilité inter-documents. Le squelette
  — registre, matrice juridique, schéma 26 variables, pipeline, 17 tests — est
  conservé et **agnostique à la source** : il resservira tel quel.

---

## 4 bis. Décision du 15/08/2026 — assistant IA : reporté, pas refusé

Question posée : un assistant IA sur l'Explorateur, y compris sur les
données en attente de droits, avec abonnement après 2-3 questions.
Décision (propriétaire, 15/08) :

- **Pas maintenant.** La mesure d'audience anonyme vient d'être branchée
  (14/08) : on ne sait pas encore ce que les visiteurs font. Laisser tourner
  2-3 semaines, puis lire les compteurs `xpl_*` (recherches, comparaisons,
  exports, indicateurs dépliés). Si les visiteurs creusent et croisent →
  l'assistant a un public ; si visites courtes d'une fiche → l'argent va
  aux couches manquantes (bassins, aléas probabilistes).
- **Jamais sur les données en attente de droits** (SRC-023 FNE, classe C) :
  faire répondre un assistant payant à partir de fichiers non redistribuables
  EST une redistribution commerciale — le cas exact que le registre interdit.
  Le jour où le FNE répond oui, ils entrent en dix minutes ; avant, non.
- **Le jour où il se construit** : réponses ancrées dans la fiche ouverte
  (valeurs, sources, statuts N cités), jamais depuis la mémoire du modèle ;
  la vraie valeur = croisements que l'interface ne fait pas + médiation
  (« ma commune est-elle bien équipée ? ») + kreyòl ; 3 questions/jour
  gratuites en local puis forfait Payhip par code (pas d'abonnement : site
  statique sans compte) ; une ligne à la politique de confiance (première
  fois qu'un texte tapé quitterait le navigateur). Briques prêtes : Worker
  atmart-chat (Haiku, KREYOL_RULES, KV, codes Payhip). ~1 journée.

## 4 ter. Journée du 15/08/2026 — quatre chantiers de fond

Demandés après la question « si vous refaisiez l'Explorateur, que
changeriez-vous ? ». Trois des quatre réponses ont été mises en œuvre le
jour même ; la session voisine a traité les deux autres (découpage du
moteur en modules, journal d'archives).

1. **Édition légère — `fiche.html`.** L'Explorateur charge ~1,55 Mo pour
   afficher trente valeurs ; sur un mobile bas de gamme en 3G, c'est une
   minute et souvent un échec. Les fiches sont désormais PRÉ-CALCULÉES
   (`build_fiches_legeres.py` → `data/leger/`) : page 9 Ko + index 10 Ko +
   fiche 5 Ko = **24 Ko, soixante-quatre fois moins**. Aucune police, aucune
   feuille externe, deux reprises par requête. Même doctrine : sources,
   millésimes, couverture, absence ≠ zéro.

2. **La vitrine se génère — `build_vitrine.py`.** Les cartes de
   `datasets.html` viennent de l'inventaire CSV (présence, rayon, prix,
   lien) ; la prose vit dans `vitrine_textes.json`. Effet immédiat :
   **15 produits publiés n'avaient AUCUNE carte** — dont les dix jeux du
   14/08 — ils sont visibles. Un prix se change à un seul endroit.
   Piège retenu : les bornes de grille se trouvent en comptant la
   profondeur des balises, jamais par un `rfind()` — le premier essai a
   mangé la moitié de la page (restaurée depuis une copie prise avant).

3. **Une seule suite, en ligne de commande — `verif_site_public.js`.**
   `node verif_site_public.js` : **42 assertions** contre la PRODUCTION
   (pages, chrome, CSP, 13 jeux et leurs sources, couverture 140 communes,
   budget de l'édition légère, prix du catalogue, promesse de mesure,
   déploiement des trois longueurs). Les bancs HTML restent pour le rendu
   JS, qui demande un navigateur — c'est écrit dans son en-tête.

4. **Fiche à trois longueurs.** Court / Moyen (défaut) / Complet, mémorisé,
   partageable par lien, et la longueur active DIT ce qu'elle montre.

**Incident à retenir (15/08)** : la première pose des trois longueurs a été
**écrasée** par une régénération de la session voisine entre l'édition et le
`git add` — le commit a capturé les bumps sans le code. Leçon appliquée :
une modification de fichier chaud vit dans un patch rejouable
(`patch_vues_fiche.py`), et se commite dans la foulée immédiate.

## 4 quater. ALERTE DE COORDINATION — deux sessions sur un même fichier

**15/08/2026, constat répété trois fois.** `assets/modules/explorateur.js`
est régénéré par la session voisine. Trois modifications y ont été perdues
entre l'édition et le `git add` — dont une dont le **message de commit
décrivait un changement absent du commit** (77e95b3). Un historique qui
ment est pire qu'un oubli : il fait croire le travail fait.

**Règle adoptée** : toute modification de ce fichier passe par un patch
rejouable dans l'atelier, jamais par une édition directe —
`patch_vues_fiche.py`, `patch_chargement_parallele.py`. Un patch se relance
en une commande, refuse de s'appliquer si la zone a changé, et se vérifie.

**Décision à prendre par Atmart** : soit les deux sessions se répartissent
les fichiers explicitement (l'une le moteur, l'autre les pages), soit le
moteur cesse d'être régénéré et devient une source éditée. Tant que les
deux écrivent, il faut passer par des patchs — c'est un coût réel.

## 5. Ce qui reste à faire

**Court terme, par ordre de rapport qualité/effort**

0oct. ~~**Fiche Pays**~~ — fait le 14/08 (moteur v37) : « Haïti », « pays »,
   « peyi », « national » ouvrent une fiche nationale — agrégat des 140
   communes (mêmes règles que les départements), 10 départements cliquables,
   pyramide, repères budgétaires SRC-024 chargés à l'approche. Entité
   synthétique injectée dans pret(), exclue du compte du socle (192). Le fil
   d'Ariane de toutes les fiches remonte désormais à « Haïti ». 25 assertions
   au banc du site autonome (tests/ hors dépôt, sur disque seulement).
0sep. ~~**Repère budgétaire national**~~ — fait le 14/08 : SRC-024 (MEF/DGB,
   budget.gouv.ht) exploité par `Atmart_premium_datasets/build_budget_national.py`
   (PDF scellés SHA-256, assertions internes). Publie
   `data/atmart_indicateurs_national_HT.csv` chez les DEUX sites : dépenses
   autorisées 186,4 Mds HTG au 30/06/2026 (9 mois, 51,75 %), ≈ 15 670 HTG/hab,
   TOFE base caisse 176,0 Mds en divergence documentée. Bloc « Repère national »
   sur `Explorateur_site/donnees.html` (SW bumpé v13). L'indicateur COMMUNAL
   IND-BUD-001 reste à construire : aucune ventilation territoriale publiée.
0sex. ~~**Prix des marchés**~~ — fait le 13/08 : série historique téléchargée,
   horodatée et intégrée ; `IND-PRX-001` calculé sur 9 communes. Première couche
   sectorielle du P3. Reste à lui donner un graphique.
0qui. ~~**Lot P2**~~ — fait le 13/08 : matrice de couverture, situation
   départementale et nationale, appels à l'action contextuels. **P2-2 (mesure
   d'usage) spécifié mais non implémenté** — il contredirait la promesse
   « aucun traceur » affichée sur la page : décision requise.
0qua. ~~**Lot P1 rendement**~~ — fait le 13/08 : IND-EDU-010 et IND-SAN-010
   calculés, langue dans l'URL, pyramide au précache, en-têtes de tableau
   associés, boutons-liens à 24 px.
0ter. ~~**Lot P1 backbone**~~ — fait le 13/08 : nature de la période et échéance
   de révision, 8 champs au dictionnaire, millésime et validité des organisations,
   9 enquêtes au registre (LAPOP, Banque mondiale, DHS/SPA, IHSI, RGA).
0bis. ~~**Lot P1 expérience**~~ — fait le 12/08 : accueil, résumé décisionnel,
   fiche réduite, six vues métier. Suite du backlog : P1-5 à P1-15, P2, P3.
0. ~~**Audit et lot P0**~~ — fait le 12/08 : couverture affichée par indicateur,
   686 absences rendues visibles, formulations du référentiel et du score de
   complétude corrigées. Suite du backlog dans
   [AUDIT-EXPLORATEUR-2026-08-12.md](AUDIT-EXPLORATEUR-2026-08-12.md) — **P1-1 à
   P1-15 en attente d'arbitrage**.
1. ~~**Densité de population**~~ — fait le 11/08 (`IND-POP-002`, `build_densite.py`).
2. ~~**Population par âge**~~ — fait le 11/08 (`build_pyramide.py`) : satellite + `IND-POP-003..013`.
3. ~~**Afficher la pyramide dans l'Explorateur**~~ — fait le 12/08 (`explorateur.js?v=22`) :
   SVG aux 3 niveaux, effectifs dépliables, export par territoire, 9 assertions.
4. **Remplir `IND-EDU-010`** — écoles ÷ population 5-19 ans × 10 000, calculable
   depuis `IND-POP-007` ; ne couvrira que les 49 communes du registre scolaire.
5. **Établissements de santé HDX 2021** — à confronter aux données 2023 pour élargir au-delà des 14 communes, ou documenter pourquoi on garde l'existant.
6. **Audit final** — mobile, accessibilité, parcours complet.

**Puis, avant réouverture du multilingue**

7. Relecture humaine du kreyòl (préproduction prête).
8. ~~Traduire les chaînes ajoutées pendant la pause~~ — fait le 12/08 : les 27
   chaînes manquantes (18 de la pyramide, 9 du lot P0) sont traduites, il n'en
   reste aucune. Restent 34 entrées orphelines à nettoyer, `hreflang` et le
   sitemap multilingue.
9. `generer-pages-localisees.py` + réactiver les alternates dans `generer-sitemap.py` (blocs marqués « EN PAUSE »).

**Sources identifiées, non ouvertes** : ISPAN (patrimoine, mandat officiel),
RGA 2008-2009 MARNDR/FAO (agriculture, recensement), DINEPA (eau), BME (mines).

**Infrastructures par commune (14/08 soir, moteur v39)** — section
« Infrastructures » du bloc services, depuis
`data/atmart_infrastructures_communes_HT.csv` (140/140 communes) :
points d'eau WPdx avec statut fonctionnel (SRC-029, CC BY-SA, couverture
Nord/Centre dite), eau potable + stations-service + banques/transferts +
lieux habités OSM (SRC-028, ODbL, extraits HOT 06/08/2026), routes en km
par type (45 029 km — tronçon affecté à la commune de son sommet médian,
~100 m de tolérance), électricité OSM (SRC-030 : 74 objets dans tout le
pays — le comptage dit ce qui n'est pas cartographié). **Couverture mobile (débloquée le 14/08 midi, moteur v40)** : le
propriétaire a créé le compte OpenCelliD et fourni son jeton (jamais
stocké) — l'extrait MCC 372 ne contient que **7 antennes** dans tout le
pays : la base participative est quasi vide pour Haïti. Publié avec la
limite en clair (« mesure la participation, pas le réseau »). Pour une
vraie couverture : tuiles ouvertes Ookla (piste suivante) ou cartes
opérateurs (fermées).
Suite dédiée `Explorateur_site/tests/services-tests.html` (13 assertions,
sur disque — tests/ hors dépôt) ; la suite générale a été refondue par la
session carte (87 assertions), les assertions fiche Pays/services vivent
désormais dans la suite dédiée.

**Avancement du 14/08/2026 (soir) — trois familles publiées :**
1. **Notaires et arpenteurs** (SRC-025, classe C) : 712 fiches contemporaines
   du classeur Perplexity remis par le propriétaire, scellé dans
   `atmart-datasets/source_annuaire/`. **RÉVISÉ le 14/08 après-midi —
   dénombrement, pas annuaire** : les noms, adresses et téléphones de
   personnes physiques ne se publient pas ; `build_professions_communes.py`
   → `data/atmart_professions_communes_HT.csv` (effectifs sur 55 communes,
   un zéro = « aucun dans nos sources »). L'ancien
   `build_annuaire_professionnels.py` est VERROUILLÉ (le relancer
   republierait les noms). Le classeur nominatif complet reste scellé en
   zone source privée pour le recoupement MJSP à venir.
2. **ONG, agences ONU, bailleurs — présence par commune** (SRC-026, classe A,
   CC BY) : 3W OCHA juin 2026, 1 457 déclarations, 126 organisations, les
   140 communes couvertes ; `build_presence_3w.py` →
   `data/atmart_presence_organisations_HT.csv`.
3. **ONG au registre légal** (SRC-027, classe B) : registre MPCE/UCAONG
   capturé le 14/08 (site sans export), 680 ONG, 470 territorialisées par
   extraction des zones déclarées ; `build_registre_ong.py` →
   `data/atmart_registre_ong_HT.csv`.

**Câblé à l'interface le 14/08 (moteur v38)** : bloc « Services et
organisations » sur chaque fiche communale — professionnels (fiabilité par
fiche + note MJSP), présence 3W (org × secteurs), ONG du registre (jetons),
chargé à l'approche, sections vides honnêtes, liens de téléchargement.
29 assertions au banc du site autonome. Note de banc : sur localhost:8362,
une inspection HTTP du poste tronque atmart_presence_organisations_HT.csv
à 456 960 octets (déterministe, contenu banal — artefact antivirus local) ;
Chromium rejette le corps tronqué, le moteur montre alors son repli. La
production HTTPS sert le fichier complet, vérifié ligne à ligne.

Recherche du 14/08 sur le reste : BRH publie la liste des 9 banques (sièges
seulement) + une « Cartographie des points de services financiers » à
explorer ; CONATEL liste les opérateurs nationaux (Digicel, Natcom, Access
Haïti, ACN, Haïnet, HDN) sans territorialisation ; MENFP/DESRS publie la
liste des 199 IES reconnues (PDF de presse, à structurer). Prochaine
intégration recommandée : les IES (adresses communales) puis la cartographie
BRH. L'affichage de ces familles dans l'Explorateur (fiche par territoire)
reste à câbler — décision d'interface à prendre avec le bloc organisations.

**Chantier « couches géographiques d'utilité publique » (demande du 14/08
soir) — phase 1 : faire exister les données ; phase 2 : les visualiser.**
État des six groupes demandés :

| Groupe | Phase 1 (données) | Sources |
|---|---|---|
| Population et territoire | ✅ EXISTE (COD-PS par commune, densité, pyramide) | SRC intégrées |
| Services et infrastructures | ✅ EXISTE (bloc v38-v40 : eau, essence, routes, banques, électricité, mobile, écoles/santé/marchés au référentiel organisations) | SRC-028…031 |
| Professions (notaires/arpenteurs) | ✅ dénombrement par commune (les noms attendent le recoupement MJSP — décision du 14/08) | SRC-025 |
| Conjoncturel | ✅ INTÉGRÉ le 14/08 soir : déplacés OIM (dernière ronde par commune), phases IPC (mars 2026 + projections), conflits ACLED (commune × mois, 2018→08/2026, 7 929 événements) ; prix PAM déjà en place | SRC-032/033/034 |
| Eau et bassins versants | ✅ INTÉGRÉ le 14/08 nuit (SRC-035 : le WFS de haitidata.org est VIVANT) — 31 bassins SRTM 2014 en couche nommée ; sous-bassins et réseau hydro scellés, pas encore affichés | SRC-035 |
| Aléas et risques | ✅ partiel le 14/08 nuit : % de commune en zone inondable (CNIGS, échantillonnage ~330 m — Torbeck 62 %, Cité Soleil ~99 %) + polygones. PAS un aléa probabiliste : les rasters WB 5/25/100 ans et l'USGS restent l'amélioration attendue | SRC-035 |
| Économie et foncier | ✅ partiel le 14/08 nuit : occupation du sol 1998 (% par classe et par commune, millésime dit partout) ; aires protégées et périmètres irrigués à sonder sur le même WFS | SRC-035 |

**Phase 2 — FAITE le 14/08 soir : couches.html est en ligne.**
Page autonome (`assets/couches.js` — aucun contact avec explorateur.js,
les deux chantiers carte ne peuvent pas se marcher dessus). 7 couches :
conflits ACLED 12 mois et déplacés OIM en choroplèthe communale, phases
IPC en aplat départemental (phase majoritaire en population, dit en
légende), points d'eau WPdx (vert/rouge par statut), stations-service,
banques/transferts (5 types), km de routes. Fond : polygones simplifiés
de la session carte. Clic commune → fiche. Entrée « Couches » au menu de
toutes les pages, sitemap, SW v21, ?couche= dans l'URL. Les couches de
points sont republiées en GeoJSON citables seuls (licence/millésime/
limite en membres racine) par build_couches_points.py.
Restent à visualiser quand leurs données existeront : bassins versants,
aléas, usage du sol (voir tableau ci-dessus).

**Plan initial (avant réalisation)** : une page dédiée (« Couches » / kat jeyografik)
plutôt que d'alourdir l'accueil, comme demandé. La brique carte existe déjà :
le moteur trace depuis le 14/08 les polygones des départements et des
communes (chantier de la session carte). Architecture proposée : la page
Couches réutilise ces polygones + les points des zones sources (eau,
essence, banques, sites de déplacés), une couche à la fois, avec la légende
qui porte source/licence/millésime comme partout. À concevoir AVEC la
session carte — ne pas ouvrir ce chantier à deux en parallèle.

**14/08 (nuit) — P2 fermé et produits d'assemblage écrits :**
- **P2-2 mesure d'usage : VOIE C choisie par le propriétaire et implémentée.**
  13 compteurs agrégés (`xpl_*`) sur la route `/ev` du Worker (celle du
  tableau de bord Suite360 — uniques du jour par empreinte salée, jamais
  d'IP conservée). `assets/mesure.js` découplé du moteur (délégation DOM,
  supprimable sans rien casser, le texte tapé ne part jamais). La promesse
  est RÉÉCRITE (index + pieds de page) et la politique complète publiée sur
  donnees-confiance.html#mesure. Les compteurs arrivent dans le bilan
  quotidien existant.
- **hreflang** : fr + x-default sur les 12 pages du site autonome ;
  ht/en/es s'ajouteront à la réouverture du multilingue.
- **Extraction sur mesure — 150 $ fixe** : offre d'entrée en tête de la
  grille Solutions EXISTANTE (la règle « jamais deux grilles » du tri
  commercial est respectée).
- **Modèles Power BI (PBIP/TMDL) et QGIS (.qgs)** : écrits dans
  `atmart-datasets/modeles/` — 7 tables reliées par p-codes / 7 couches
  distantes. **VALIDÉS le 14/08 après-midi** : Power BI construit en direct
  dans Desktop (7 tables actualisées, chiffres vérifiés par requête,
  PBIP enregistré par le propriétaire) ; QGIS chargé par script dans
  QGIS 4.2.1 et enregistré en .qgz. Reste la fiche catalogue (prix). La session catalogue
  a publié en parallèle le Classeur des 140 profils communaux (25 $).

**Chantier spécifié le 14/08/2026 — annuaire des services par territoire.**
Demande du propriétaire : pouvoir chercher, territoire par territoire, les
services suivants. Le socle existe déjà : le référentiel des organisations
(5 029 entités rattachées aux p-codes — santé 730, éducation 4 117,
marchés 182, publié le 14/08). Les familles restantes, avec leur source
candidate — règle absolue : **jamais d'annuaire inventé**, une famille
n'ouvre que lorsqu'un registre réel est intégré, sinon elle s'affiche
« à construire » avec sa source nommée :

| Famille demandée | Source candidate | Ventilation territoriale |
|---|---|---|
| Professionnels de santé (médecins, infirmières…) | MSPP (comptes nationaux RH santé) ; ordres professionnels | incertaine — souvent national seulement |
| Notaires, avocats | barreaux (Fédération des Barreaux d'Haïti), min. Justice | par juridiction, à vérifier |
| Banques, assurances | BRH — liste des banques agréées et succursales | par commune (succursales), à extraire |
| Télécoms | CONATEL — opérateurs licenciés | nationale ; couverture réseau éventuelle |
| Entreprises locales/régionales, distribution, immobilier, logistique, énergie | registre du commerce (MCI) | non publié en accès ouvert à ce jour |
| Cabinets de conseil et analystes | aucune source publique connue | — |
| ONG nationales et internationales | MPCE/UCAONG — registre officiel des ONG | siège et zones d'intervention déclarées |
| Bailleurs et agences de développement | OCHA 3W (« who-what-where ») Haïti | **par commune — meilleur candidat, format HDX** |
| Administrations et organismes parapublics | OMRH / annuaire de l'État | par ministère ; délégations départementales |
| Universités et centres de recherche | MENFP/DESRS — institutions reconnues | par commune (adresses), à structurer |

L'OCHA 3W est le prochain candidat concret : déjà territorialisé, déjà sur
HDX, même famille de licence que les sources intégrées. Chaque famille
intégrée rejoint le référentiel des organisations (mêmes colonnes, mêmes
degrés de vérification) — pas un fichier à part par famille.

---

## 6. Reprendre dans un autre compte Claude

Les sessions et la mémoire sont des **fichiers locaux**, pas des données de
compte. Conséquences :

- **Même machine, autre compte** → rien à faire. Transcrits, mémoire, fichiers
  et dépôt sont au même endroit ; le compte ne change que la facturation et
  l'accès aux modèles.
- **Autre machine** → deux `git clone` suffisent pour l'essentiel :
  `jwmyril/atmart-site` (le site) et `jwmyril/atmart-datasets` (la chaîne de
  production, privé). Restent à copier à la main : le dossier `memory/`,
  `Atmart_website/tests/` (exclu du dépôt) et `_codes/` (jamais versionné).

Dans tous les cas, ce document est le point d'entrée : il est dans le dépôt.

---

## 7. Site autonome — explorateur.atmart.ltd (EN LIGNE depuis le 13/08/2026)

Décision du propriétaire : l'Explorateur devient indépendant, modèle
Suite360/Arpentaj. Dossier `Power_BI_Claude/Explorateur_site/` (dépôt local
prêt, 25 fichiers) → futur dépôt `jwmyril/explorateur-site` (public, GitHub
Pages, CNAME `explorateur.atmart.ltd`).

- **Un seul moteur, deux sites** : `CFG.site` fait traverser les liens
  éditoriaux vers atmart.ltd ; vide = comportement intégré identique.
- **Synchronisation** : `Explorateur_site/tests/sync-donnees.py` tire données
  + moteur depuis `Atmart_website` (source de vérité) et aligne le DV du SW.
- **Bascule FAITE (13/08 soir)** : l'ancienne URL renvoie vers le sous-domaine
  en conservant `?id`/`onglet`/etc. Renvoi **conditionnel au domaine** : sur
  localhost la page reste entière — c'est l'hôte de la suite de tests (82
  assertions). Les visiteurs partent, le banc de développement reste.
  21 pages re-liées, sitemap purgé (noindex + canonical vers le sous-domaine).
- **Vérifié en production** : ancien lien avec paramètres → même fiche au
  nouvel endroit ; 140 communes sur carte ; zéro erreur console ; SW actif.
- Tests du site autonome : 15 assertions, `Explorateur_site/tests/`.
