# Bilan des sources — Explorateur Haïti

**17 août 2026.** État réel, lu dans le registre et vérifié sur le site en
production. Ce document remplace toute note antérieure sur le statut des
sources.

---

## 1. En une ligne

**20 sources ont un passeport juridique** dont la licence a été lue sur sa
page officielle. **17 sont publiables gratuitement** sur l'Explorateur,
**14 sont utilisables même dans une prestation facturée**. **Quatre sources
sont désormais en ligne** sur les 140 fiches communales, avec leurs
contrôles.

---

## 2. Ce qui est en ligne, aujourd'hui

| Couche | Source | Licence | Ce qu'elle donne |
|---|---|---|---|
| **Histoire sismique** | USGS ComCat | domaine public | 445 séismes depuis 1911, distance et magnitude par commune |
| **Pluie et sécheresse** | CHIRPS 2.0 | domaine public | normale 1991-2020, anomalie de l'année, mois très secs |
| **Occupation du sol** | ESA WorldCover 2021 | CC BY 4.0 | parts d'arbres, cultures, bâti, eau, mangrove à 10 m |
| **Second avis population** | WorldPop 2020 | CC BY 4.0 | population modélisée et son écart à l'officiel |
| *(déjà en place)* | CNIGS via OCHA | CC BY 3.0 IGO | le référentiel territorial, colonne vertébrale |

**Contrôles** : 67 assertions sur le site public, 13 sur les événements, 12
sur la pluie, 12 sur l'occupation du sol. **Zéro en échec.**

### Ce que ces couches ont révélé

Trois faits que personne ne cherchait, et que la confrontation des sources a
fait sortir :

1. **Une valeur officielle douteuse.** Gressier est créditée de
   **3 987 habitants** par la projection UNFPA COD-PS 2024, quand le
   satellite en voit **44 940**. Les p-codes ont été recroisés entre le
   référentiel CNIGS et le jeu d'indicateurs : aucun décalage, la valeur
   vient bien de la source. Elle reste publiée avec son écart — ce n'est pas
   à Atmart de corriger une source officielle, c'est à Atmart de rendre
   l'anomalie visible.
2. **Une erreur de facteur 123 dans mon propre calcul**, invisible sur les
   pourcentages affichés, révélée par la confrontation à la superficie
   CNIGS. Le pas d'ESA WorldCover est angulaire : « 10 m » ne vaut qu'à
   l'équateur, un pixel fait 81 m² à 19°N.
3. **Deux versions de WorldPop divergent de 30 %** — 14,50 millions
   d'habitants contre 11,15 pour le même pays, la même année, le même
   producteur. La version ajustée sur les projections des Nations unies est
   retenue, et l'existence de l'autre est écrite dans le script.

---

## 3. Le tableau complet des 20 sources

### Prêtes à l'emploi, sans réserve (P1)

| Passeport | Source | Licence | En ligne |
|---|---|---|---|
| PSP-001 | CNIGS / OCHA — limites administratives | CC BY 3.0 IGO | **oui** |
| PSP-002 | GeoNames — gazetteer | CC BY 4.0 | — |
| PSP-025 | Google Open Buildings V3 | CC BY 4.0 **ou** ODbL | — |
| PSP-026 | ESA WorldCover — occupation du sol 10 m | CC BY 4.0 | **oui** |
| PSP-027 | SoilGrids 250 m — propriétés des sols | CC BY 4.0 | — |
| PSP-029 | USGS ComCat — séismes | domaine public | **oui** |
| PSP-030 | CHIRPS — précipitations | domaine public | **oui** |
| PSP-031 | WorldPop — grilles de population | CC BY 4.0 | — |
| PSP-037 | Dynamic World — occupation quasi temps réel | CC BY 4.0 | — |
| PSP-038 | JRC Global Surface Water | Copernicus, sans restriction | — |
| PSP-039 | GHSL — surface bâtie et urbanisation | CC BY 4.0 | — |
| PSP-040 | WorldPop 2020 ajusté ONU | CC BY 4.0 | **oui** |

### Utilisable avec une réserve nommée

| Passeport | Source | Réserve |
|---|---|---|
| PSP-024 | OSM / Geofabrik | **ODbL** — partage à l'identique sur toute base dérivée publiée |
| PSP-028 | IBTrACS — cyclones | accès ouvert, mais l'usage **commercial** renvoie à la Résolution 40 de l'OMM |

### À vérifier avant emploi (P2)

| Passeport | Source | Ce qui manque |
|---|---|---|
| PSP-032 | HydroSHEDS / HydroATLAS | **contradiction non résolue** : la page produit annonce l'usage commercial libre, les conditions du site l'interdisent |
| PSP-034 | Banque mondiale — projets | licence annoncée CC BY 4.0, **non lue** |
| PSP-035 | IATI Datastore | chaque organisation publiante porte **sa propre** licence |
| PSP-036 | Global Solar Atlas | des tiers annoncent CC BY 4.0, **la page officielle n'était pas lisible** |
| PSP-041 | ESA WorldCereal | licence CC BY 4.0 confirmée, mais **qualité locale en Haïti non évaluée** |

### Sous convention (P3)

| Passeport | Source | Règle |
|---|---|---|
| PSP-033 | LAPOP AmericasBarometer | fichiers en zone restreinte, **jamais** redistribués ni exposés par API ; résultats agrégés seulement ; **jamais de valeur communale** |

---

## 4. Ce que le pivot non commercial a changé

En retirant la vente de données, **la plupart des verrous sont tombés** :
ils portaient sur l'usage commercial, pas sur l'usage.

- **HydroSHEDS** : ses conditions autorisent explicitement le non-commercial.
- **IBTrACS** : la Résolution 40 vise le commerce ; l'accès ouvert s'applique.
- **ODbL** : l'obligation de partage à l'identique cesse d'être une
  contrainte pour devenir un alignement, si les produits Atmart sont ouverts.

La question juridique est devenue **binaire**, donc tenable : ce qui est
publié gratuitement relève du non-commercial ; ce qui entre dans une
prestation facturée exige une licence qui l'autorise. Deux verdicts séparés
par source, et `verif_passeports.py` refuse qu'une source soit déclarée
facturable si son droit commercial n'est pas acquis.

---

## 5. Ce qui reste à faire

### Sans blocage, prêt à démarrer

| Source | Ce qu'elle débloquerait | Coût estimé |
|---|---|---|
| **Open Buildings V3** | nombre et densité de bâtiments, rayons commerciaux, exposition | la méthode du masque est déjà écrite |
| **JRC Global Surface Water** | eau permanente et saisonnière, zones humides | idem |
| **GHSL** | croissance de la surface bâtie, urbain/rural | idem |
| **SoilGrids** | pH, carbone organique, texture — potentiel agricole | idem |
| **OSRM auto-hébergé** | temps d'accès santé, marchés, écoles | **le seul chantier lourd** |

### En attente d'une décision d'Atmart

1. **Open Buildings : CC BY 4.0 ou ODbL ?** — recommandation : CC BY 4.0.
2. **Régime ODbL des indicateurs OSM** — à arbitrer indicateur par
   indicateur, et à faire relire avant toute prestation facturée.
3. **Écrire à NOAA/NCEI, à HydroSHEDS, à LAPOP** — trois courriels qui
   lèvent trois ambiguïtés.
4. **Moteur de routage auto-hébergé** — sans lui, aucun temps de trajet.
5. **Déclarer la licence des produits Atmart** — recommandation CC BY 4.0 ;
   c'est le préalable au statut de bien public numérique.

### Toujours ouvert, hors sources

Le **rapport PDF** (décision du 16/08) n'a pas été construit : la mission
sources est arrivée entre-temps.

---

## 6. Le socle, pour qui reprend

```bash
# Télécharger une source et la sceller (empreinte SHA-256, manifeste)
python telecharge_source.py <source> <fichier> <url> --licence "…" --version "…"

# Les quatre pipelines en production
python build_evenements_seismes.py      # USGS ComCat
python build_pluie_chirps.py            # CHIRPS (--telecharger d'abord)
python build_occupation_sol.py          # ESA WorldCover
python build_population_worldpop.py     # WorldPop

# Les contrôles — à lancer APRÈS déploiement
node verif_site_public.js               # 67 assertions
python verif_evenements.py              # 13
python verif_pluie.py                   # 12
python verif_occupation_sol.py          # 12
python verif_passeports.py              # registre juridique
python verif_matrice.py                 # matrice source-indicateur
```

**254 Mo de sources brutes** scellées dans `raw/`, exclues du dépôt et
reconstructibles depuis leurs manifestes.

### Trois règles apprises à leurs dépens

1. **Un fichier de référence ne s'écrit pas à la main.** Trois lignes du
   registre portaient une virgule non protégée qui décalait les colonnes en
   silence. `ajout_passeports.py` échappe, relit, puis remplace.
2. **Un patch rejouable porte un marqueur qui n'existe qu'une fois posé.**
   Deux fois le même piège : un bloc défini et jamais appelé.
3. **Un contrôle contre une source indépendante vaut dix contrôles
   internes.** La superficie CNIGS a révélé une erreur de facteur 123 que
   les pourcentages ne montraient pas.
