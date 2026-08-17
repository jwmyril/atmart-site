# Inventaire juridique des sources et matrice source-indicateur

**17 août 2026** — premier livrable de la mission « intelligence territoriale ».
Deux fichiers l'accompagnent, et ce sont eux qui font foi :

| Fichier | Contenu |
|---|---|
| `backbone/atmart_passeports_sources.csv` | 15 passeports juridiques : producteur, diffuseur, URL, date d'accès, version, licence, statut, droits, restrictions |
| `backbone/atmart_matrice_source_indicateur.csv` | 20 indicateurs : source, catégorie, unité d'observation, **niveau publiable**, méthode d'affectation, incertitude, blocage |
| `verif_passeports.py` · `verif_matrice.py` | Les contrôles qui empêchent ces deux fichiers de mentir |

---

## 1. Ce qui existait déjà, et qui n'a pas été refait

Le projet portait **un registre de 23 sources** (`atmart_registre_sources.csv`)
avec licence et classe juridique. Il n'a pas été remplacé : les passeports
sont un **second niveau, plus exigeant**, qui ajoute ce que la mission
demande et que le registre n'avait pas — date d'accès, version, droit de
modification, restrictions sur les dérivés, restrictions sur les bruts,
nécessité d'une autorisation écrite, et un statut pris dans une liste fermée
de sept valeurs.

Constat utile avant d'aller plus loin : **les bassins versants de
l'Explorateur viennent du CNIGS/MARNDR (découpage SRTM 2014), pas
d'HydroSHEDS.** Aucune exposition juridique active de ce côté — je l'ai
vérifié dans le code avant de l'écrire.

---

## 2. Sources vérifiées le 17/08/2026 — page officielle lue, pas de mémoire

### P1 — intégrables maintenant

| Source | Licence | Statut | Ce qu'elle débloque |
|---|---|---|---|
| **OSM / Geofabrik** (extrait du 16/08/2026) | ODbL 1.0 | `OUVERTE_AVEC_PARTAGE_IDENTIQUE` | commerces, routes, écoles, santé, graphe de routage |
| **Google Open Buildings V3** | CC BY 4.0 **ou** ODbL 1.0, au choix | `OUVERTE_AVEC_ATTRIBUTION` | bâtiments, densité, rayons commerciaux |
| **ESA WorldCover** v200 (10 m) | CC BY 4.0 | `OUVERTE_AVEC_ATTRIBUTION` | occupation du sol, part cultivée, artificialisation |
| **SoilGrids 2.0** (250 m) | CC BY 4.0 | `OUVERTE_AVEC_ATTRIBUTION` | pH, carbone organique, texture |
| **CHIRPS 2.0** | **domaine public** | `OUVERTE_VALIDEE` | anomalies de pluie, mois secs, sécheresse agricole |
| **USGS ComCat** | **domaine public** (œuvre fédérale) | `OUVERTE_VALIDEE` | histoire sismique par commune |
| **WorldPop** | CC BY 4.0 | `OUVERTE_AVEC_ATTRIBUTION` | population modélisée, isochrones pondérés |

**Trois précautions écrites dans les passeports, pas seulement pensées :**

- **Open Buildings** : prendre **CC BY 4.0** et non ODbL, pour ne pas
  contaminer les produits Atmart par le partage à l'identique. Et la licence
  ouverte du *jeu* ne vaut pas autorisation d'usage commercial du *service*
  Google Earth Engine — on télécharge les fichiers, on traite chez Atmart.
- **OSM** : la séparation base OSM / données propriétaires Atmart doit être
  stricte, et le régime ODbL de chaque indicateur produit doit être arbitré
  et écrit — une base dérivée diffusée retombe sous ODbL, un résultat agrégé
  est en général une « œuvre produite ». La frontière se documente indicateur
  par indicateur, jamais en bloc.
- **WorldPop** : estimation **modélisée**. Elle s'affiche **à côté** du
  chiffre officiel UNFPA/IHSI déjà intégré, jamais à sa place.

### Cas particulier — IBTrACS (cyclones)

`UTILISABLE_POUR_ANALYSE_SANS_REDISTRIBUTION`. La page NOAA annonce un accès
« complet et ouvert » **et** renvoie explicitement, pour l'usage commercial,
à la Résolution 40 de l'OMM. Les deux phrases coexistent sur la page
officielle. Conséquence retenue : les **indicateurs dérivés** (distance,
intensité maximale à proximité) sont des œuvres Atmart et peuvent être
vendus ; **le fichier IBTrACS lui-même ne se redistribue pas** tant que le
point n'est pas tranché par écrit.

---

## 3. Ce qui est bloqué, et pourquoi

### HydroSHEDS — contradiction non résolue

Deux textes officiels du même site se contredisent, et je les cite parce
que l'arbitrage vous revient :

- page produit **HydroBASINS** : « freely available for scientific,
  educational and commercial use » ;
- **conditions générales** du site : la permission n'inclut pas « any
  commercial use or any resale or redistribution ».

Statut retenu : `LICENCE_NON_DOCUMENTEE`, priorité **P2**, aucune intégration
payante avant réponse écrite. Sans conséquence immédiate — vos bassins
versants viennent d'ailleurs.

### Global Solar Atlas — licence non confirmée

Des tiers annoncent CC BY 4.0 ; **la page officielle des conditions n'était
pas exploitable le 17/08/2026**. Je ne l'inscris donc pas comme vérifiée.
L'indicateur de potentiel solaire est marqué `BLOQUE` — pas parce que la
licence est mauvaise, mais parce que je ne l'ai pas lue.

### LAPOP — restreint par nature

`AUTORISATION_REQUISE`. Règles écrites dans le passeport : fichiers en zone
`restricted/`, jamais dans un téléchargement Atmart, jamais exposés par API,
publication de résultats agrégés seulement, code de reproduction fourni au
client mais données à récupérer chez LAPOP. **Et surtout** : rien au niveau
communal — le plan d'échantillonnage ne le permet pas.

---

## 4. Ce que la matrice interdit, et que les contrôles font respecter

`verif_matrice.py` refuse trois choses qu'un tableur ne verrait pas :

1. **un chantier ouvert sur une licence incertaine** — un indicateur
   `A_CONSTRUIRE` adossé à une source `LICENCE_NON_DOCUMENTEE` ;
2. **une enquête communalisée** — un résultat d'enquête publié à l'échelon
   communal ;
3. **une modélisation déguisée** — une donnée satellitaire ou modélisée
   déclarée « statistique officielle ».

Il exige aussi qu'aucun indicateur ne soit livré **sans incertitude
documentée**. État actuel : **20 indicateurs, 0 anomalie**, dont 13 adossés
à une source vendable en l'état.

*Les contrôles ont trouvé quatre erreurs dans mes propres fichiers pendant
leur écriture — des virgules non protégées qui décalaient des colonnes, et
trois catégories inventées hors du vocabulaire fermé. C'est exactement ce
pour quoi ils existent.*

---

## 5. Décisions qui vous reviennent

| # | Décision | Enjeu | Ma recommandation |
|---|---|---|---|
| **1** | **Open Buildings : CC BY 4.0 ou ODbL ?** | ODbL contaminerait les produits dérivés par le partage à l'identique | **CC BY 4.0** |
| **2** | **Régime ODbL des indicateurs OSM** | « base dérivée » (ODbL obligatoire) vs « œuvre produite » (libre) — la frontière décide de ce qui est vendable | Arbitrer **indicateur par indicateur**, écrire la décision dans la matrice, et faire relire par un juriste avant la première vente d'un produit contenant de l'OSM |
| **3** | **Écrire à NOAA/NCEI pour IBTrACS ?** | Sans réponse : indicateurs dérivés vendables, fichier non redistribuable | **Oui** — un courriel, et l'ambiguïté disparaît |
| **4** | **Écrire à HydroSHEDS ?** | Débloque bassins versants mondiaux et réseau hydrographique | **Oui**, mais sans urgence : le CNIGS couvre déjà le besoin |
| **5** | **Écrire à LAPOP avant toute offre payante ?** | Détermine si l'analyse LAPOP peut entrer dans un produit vendu | **Oui, avant** de vendre quoi que ce soit qui s'appuie dessus |
| **6** | **Moteur de routage auto-hébergé** | Sans lui, aucun temps de trajet vendable — Google et Mapbox sont exclus | **OSRM** sur graphe Geofabrik, chez Atmart |

---

## 6. Ce qui vient ensuite

Conformément à votre consigne — « n'intégrez ensuite que les sources P1
validées » — la suite est :

1. **Zones d'architecture** `raw/` `manifestes/` `staging/` `curation/`
   `produits/` `restricted/` — `raw/` existe déjà, les autres sont à créer,
   avec l'empreinte SHA-256 par fichier téléchargé.
2. **Historique des événements naturels** : USGS ComCat et CHIRPS d'abord
   (domaine public, aucun blocage), IBTrACS ensuite.
3. **Occupation du sol et sols** : ESA WorldCover et SoilGrids.
4. **Bâtiments** : Open Buildings V3, seuil de confiance publié.
5. **Accessibilité** : OSRM auto-hébergé, une fois la décision 6 prise.

Les sources P2 et P3 restent documentées et **hors de tout produit** jusqu'à
réponse écrite.

---

## 7. Une limite de ce livrable, dite franchement

Les **23 sources du registre existant** n'ont pas toutes été re-vérifiées
aujourd'hui : plusieurs portent encore « À vérifier » en licence depuis leur
inscription. Elles ne sont pas dans les passeports tant qu'elles n'ont pas
été lues à leur page officielle — inscrire un statut juridique sur la foi
d'une note ancienne serait précisément la faute que ce livrable existe pour
empêcher. Leur reprise est un travail à part entière, à programmer.
