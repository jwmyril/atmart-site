# Data Atmart — état des lieux et reprise de travail

**Document de reprise.** Il vit dans le dépôt `jwmyril/atmart-site`, donc il
suit le code partout : autre compte Claude, autre machine, autre session.
À lire en premier pour reprendre le chantier.

Dernière mise à jour : **2026-08-12**

---

## 1. Où en est l'Explorateur Haïti

**En ligne** : https://atmart.ltd/donnees-explorateur.html

| | état |
|---|---|
| Langue | **français seul** — multilingue en pause assumée (voir §4) |
| Moteur | `assets/explorateur.js?v=22` — un seul fichier, deux éditions (publique / admin) |
| Données | 4 CSV publics + 1 GeoJSON, chargés dans le navigateur — aucun serveur, aucun compte, aucun traceur |
| Territoires | 192 entités (10 départements, 42 arrondissements, 140 communes), CNIGS/OCHA COD-AB 2018 |
| Observations | **3 094 valeurs sourcées** — 1 414 + 140 densités (11/08) + 1 540 âge et sexe (11/08) |
| Pyramide des âges | `atmart_pyramide_ages_HT.csv`, 7 140 lignes — **dessinée sur chaque fiche**, aux 3 niveaux, chargée seulement quand la section approche de l'écran (1,1 Mo) |
| Tests | `tests/explorateur-tests.html` — **44 assertions, toutes vertes** |

### Ce que l'Explorateur sait faire

Fiche territoriale par commune / arrondissement / département · comparaison de
2 à 4 territoires avec **alerte quand les millésimes diffèrent** · classement
aux 3 niveaux avec 4 lectures (brute, pour 100 km², part du total national,
**pour 10 000 habitants**) · carte de situation SVG sans dépendance externe ·
**pyramide des âges SVG** (17 tranches × F/M, effectifs exacts dépliables,
export CSV par territoire) · exports CSV traçés (source, millésime, méthode,
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

# Régénérer sitemap.xml + robots.txt depuis le contenu réel du dossier
python Atmart_website/tests/generer-sitemap.py

# Vérifier qu'un asset modifié a bien vu son ?v= monter (piège de cache)
python Atmart_website/tests/verif-versions.py

# Régénérer les pages localisées — à relancer le jour de la réouverture du multilingue
python Atmart_website/tests/generer-pages-localisees.py
```

**Routine avant toute publication** : `node --check assets/explorateur.js` →
ouvrir `tests/explorateur-tests.html` → 32/32 → `python tests/verif-versions.py`
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
  (Port-au-Prince), et 1,1 Mo imposés à chaque visite seraient payés d'abord par
  les connexions les plus faibles. Même motif pour son absence de la liste de
  précache du service worker — qui s'installe sur **toute** page du site,
  atelier compris. Le fichier est mis en cache dès la première consultation, et
  reste alors disponible hors connexion. Le bouton « Imprimer / PDF » l'attend
  avant d'ouvrir la boîte d'impression, sinon le PDF sortirait amputé.
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

## 5. Ce qui reste à faire

**Court terme, par ordre de rapport qualité/effort**

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
8. Traduire les chaînes ajoutées pendant la pause (comparaison des dictionnaires)
   — **dont les ~20 chaînes de la pyramide**, aujourd'hui en français seul dans
   `explorateur.*.json` ; les sept champs traduits des 11 indicateurs, eux, sont
   déjà dans `atmart_referentiel_indicateurs_i18n.csv`.
9. `generer-pages-localisees.py` + réactiver les alternates dans `generer-sitemap.py` (blocs marqués « EN PAUSE »).

**Sources identifiées, non ouvertes** : ISPAN (patrimoine, mandat officiel),
RGA 2008-2009 MARNDR/FAO (agriculture, recensement), DINEPA (eau), BME (mines).

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
