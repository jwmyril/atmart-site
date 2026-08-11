# Data Atmart — état des lieux et reprise de travail

**Document de reprise.** Il vit dans le dépôt `jwmyril/atmart-site`, donc il
suit le code partout : autre compte Claude, autre machine, autre session.
À lire en premier pour reprendre le chantier.

Dernière mise à jour : **2026-08-10**

---

## 1. Où en est l'Explorateur Haïti

**En ligne** : https://atmart.ltd/donnees-explorateur.html

| | état |
|---|---|
| Langue | **français seul** — multilingue en pause assumée (voir §4) |
| Moteur | `assets/explorateur.js?v=20` — un seul fichier, deux éditions (publique / admin) |
| Données | 3 CSV publics + 1 GeoJSON, chargés dans le navigateur — aucun serveur, aucun compte, aucun traceur |
| Territoires | 192 entités (10 départements, 42 arrondissements, 140 communes), CNIGS/OCHA COD-AB 2018 |
| Observations | 1 414 valeurs sourcées, dont **140 populations 2024** (ajout du 10/08) |
| Tests | `tests/explorateur-tests.html` — **32 assertions, toutes vertes** |

### Ce que l'Explorateur sait faire

Fiche territoriale par commune / arrondissement / département · comparaison de
2 à 4 territoires avec **alerte quand les millésimes diffèrent** · classement
aux 3 niveaux avec 4 lectures (brute, pour 100 km², part du total national,
**pour 10 000 habitants**) · carte de situation SVG sans dépendance externe ·
exports CSV traçés (source, millésime, méthode, langue des libellés) · bloc
« Ce qui reste à documenter » · liens partageables restaurant l'état complet.

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
- **ODbL écartée** des produits propriétaires (OpenStreetMap, réseau routier) —
  le partage à l'identique est incompatible avec une licence Atmart.
- **Pack Potentialités abandonné** (IRPCH + PCD). Motif : péremption
  (édition 2005), qualité de saisie, comparabilité inter-documents. Le squelette
  — registre, matrice juridique, schéma 26 variables, pipeline, 17 tests — est
  conservé et **agnostique à la source** : il resservira tel quel.

---

## 5. Ce qui reste à faire

**Court terme, par ordre de rapport qualité/effort**

1. **Densité de population** — population ÷ superficie, les deux valeurs sont déjà en base. ~1 h.
2. **Population 5-18 ans** — les tranches d'âge sont dans le fichier COD-PS déjà téléchargé ; débloquerait `IND-EDU-010` (écoles pour 10 000 enfants), aujourd'hui vide.
3. **Établissements de santé HDX 2021** — à confronter aux données 2023 pour élargir au-delà des 14 communes, ou documenter pourquoi on garde l'existant.
4. **Audit final** — mobile, accessibilité, parcours complet.

**Puis, avant réouverture du multilingue**

5. Relecture humaine du kreyòl (préproduction prête).
6. Traduire les chaînes ajoutées pendant la pause (comparaison des dictionnaires).
7. `generer-pages-localisees.py` + réactiver les alternates dans `generer-sitemap.py` (blocs marqués « EN PAUSE »).

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
