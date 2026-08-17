# Journal d'intégration des sources — 17 août 2026

Ce que j'ai produit, ce qui est en ligne, ce qui est poussé, ce qui reste.
Chiffres relevés sur le disque et en production, pas de mémoire.

---

## 1. En ligne sur explorateur.atmart.ltd

**Neuf couches sur les 140 fiches communales**, contre quatre ce matin.

| Couche | Source | Licence | Ce qu'elle dit |
|---|---|---|---|
| Histoire sismique | USGS ComCat | domaine public | 445 séismes depuis 1911 |
| Pluie et sécheresse | CHIRPS 2.0 | domaine public | normale 1991-2020, mois très secs |
| Occupation du sol | ESA WorldCover | CC BY 4.0 | arbres, cultures, bâti, mangrove à 10 m |
| Second avis population | WorldPop 2020 | CC BY 4.0 | modélisée vs officielle, écart publié |
| **Ce que dit le sol** | SoilGrids 2.0 | CC BY 4.0 | pH, carbone, texture |
| **Cyclones** | NOAA IBTrACS | accès ouvert | 214 systèmes depuis 1851 |
| **Eau de surface** | JRC Copernicus | sans restriction | permanente et saisonnière, 38 ans |
| **Potentiel solaire** | Global Solar Atlas | CC BY 4.0 | kWh/kWp/an, min et max |
| **Bâtiments** | Open Buildings V3 | CC BY 4.0 | 2 276 004 empreintes |

Vérifié en production sur Léogâne : **9 blocs sur 9 remplis**.

---

## 2. Contrôles

**268 assertions vertes, zéro en échec.**

| Suite | Assertions |
|---|---|
| `verif_site_public.js` | 67 |
| `verif_cyclones.py` | 41 |
| `verif_batiments.py` | 35 |
| `verif_solaire.py` | 31 |
| `verif_eau_surface.py` | 29 |
| `verif_sols.py` | 28 |
| `verif_evenements.py` | 13 |
| `verif_pluie.py` | 12 |
| `verif_occupation_sol.py` | 12 |
| `verif_passeports.py` · `verif_matrice.py` | registre et matrice sans anomalie |

Chaque suite porte des **tests de vérité** — des faits qu'on connaît sans
notre chaîne. Le plus fort n'était pas dans ma consigne : **Ganthier et
Thomazeau totalisent 113,6 km² d'eau permanente, contre 113-115 km² publiés
pour l'étang Saumâtre.** Cela valide la *position* de la grille, pas
seulement son échelle.

---

## 3. Produit

| | |
|---|---|
| Fichiers dans `produits/` | **23** — CSV détaillés et JSON compacts |
| Scripts de construction | **56** |
| Scripts de contrôle | **22** |
| Sources brutes scellées | **22 manifestes**, 1,6 Go dans `raw/` |
| Passeports juridiques | **25** |

Toutes les sources brutes portent leur empreinte SHA-256 et restent hors du
dépôt : reconstructibles depuis leurs manifestes.

---

## 4. Poussé

| Dépôt | Commits aujourd'hui |
|---|---|
| `Explorateur_site` | **11** |
| `Atmart_premium_datasets` | **12** |
| `Atmart_website` (docs) | **8** |

---

## 5. Ce que l'intégration a révélé

### Un biais dans mon propre code, mesuré et corrigé

`ImageDraw.polygon` remplit le polygone **et trace son contour**. Le masque
déborde d'un demi-pixel, et la surface est sur-estimée — toujours dans le
même sens.

| Résolution | Léogâne (380 km²) | Delmas (22 km²) |
|---|---|---|
| 10 m | +0,20 % | +0,65 % |
| 100 m | +2,12 % | +9,48 % |
| 250 m | +6,58 % | **+32,4 %** |

Négligeable à 10 mètres — l'écart nul du pipeline WorldCover n'était donc
pas une chance. **Réel à 100 mètres** : le pipeline WorldPop sommait des
pixels de bordure entiers, donc des habitants qui n'étaient pas là. Corrigé,
le total national passe de 11 198 435 à **10 906 520** — près de 300 000
habitants de trop.

`masque_commune.py` met la méthode en commun : masque sur-échantillonné 16
fois puis replié, chaque pixel recevant sa fraction entre 0 et 1.

### Deux de mes tests de vérité étaient faux

Sur la géographie administrative, pas sur la donnée :

- **Fonds-Verrettes ne borde pas l'étang Saumâtre.** Son polygone plafonne
  4 km au sud de la rive ; c'est Ganthier qui la tient. Fonds-Verrettes est
  la commune de la Forêt des Pins, derrière la crête.
- **Le lac de Péligre est dans Thomonde, pas Mirebalais.** Mirebalais mesure
  0,00 km² d'eau permanente, alors que les sources publiques y rattachent
  souvent le barrage.

### Une absurdité qu'aucun contrôle ne pouvait attraper

Le bloc eau affichait « **381,1 km² d'eau** » pour Léogâne, dont le
territoire fait 380,5 km². J'avais pris le champ portant la surface de la
commune pour sa surface en eau. Le chiffre était exact, seulement mal nommé :
il a fallu le **lire sur la page**, à côté de la superficie, pour que
l'absurdité saute aux yeux. C'est l'argument pour continuer à regarder les
pages après les avoir déployées.

### Trois corrections venues des pipelines eux-mêmes

- la projection plane des cyclones mélangeait un rayon sphérique et une
  constante ellipsoïdale : **675 m de biais**, ramenés à 33 m ;
- la vérification des fractions de sol relisait une colonne calculée par le
  script lui-même — elle ne testait donc que la cohérence du script avec
  lui-même, et une argile fausse d'un facteur 10 passait au travers ;
- SoilGrids ne prédit rien sous l'eau ni sous le bâti dense. **À Delmas, la
  moyenne repose sur 1,5 % du territoire.** La fiche l'affiche AVANT les
  valeurs, parce que donner le chiffre puis le nuancer serait l'ordre
  inverse de celui qui protège le lecteur.

### Un seuil qui change tout, publié plutôt que caché

Open Buildings à 0,75 de confiance retient **57 %** des détections ; à 0,90
il n'en resterait que **1,6 %**. Le même pays, quinze fois moins bâti. La
sensibilité complète est publiée dans le produit : le lecteur peut refaire
le calcul avec un autre choix, ou juger le nôtre.

---

## 6. Ce qui reste

### Dette assumée

- **`build_sols.py` garde l'ancienne méthode de masque.** À 250 m le biais
  serait majeur, mais il porte sur la couverture déclarée et non sur les
  moyennes, et il gonfle le dénominateur — donc il **sous-estime** la
  couverture, ce qui rend le drapeau de fiabilité prudent plutôt que
  trompeur. À reprendre.
- **PSP-036 est incomplet.** Les métadonnées ISO du paquet officiel Global
  Solar Atlas révèlent un **addendum d'arbitrage OMPI/CNUDCI que Solargis
  qualifie d'obligatoire** — absent du passeport alors qu'il engage Atmart.
- L'API Global Solar Atlas sert une version plus récente que le paquet
  téléchargé (période étendue à 2025) : les deux ne sont pas interchangeables.

### Sources restantes

| Source | Obstacle |
|---|---|
| GHSL, Dynamic World, WorldCereal | aucun — méthode déjà écrite |
| HydroSHEDS / HydroATLAS | format shapefile, non lisible sans GDAL |
| Banque mondiale projets, IATI | API JSON, à construire |
| LAPOP | analyse nationale seulement, jamais communale |
| **MSPP, MENFP, IHSI, MEF, FNE** | **PDF sans API — travail d'extraction, pas d'autorisation** |
| **OSRM auto-hébergé** | **le seul chantier lourd** — sans lui, aucun temps de trajet |

### Toujours ouvert, hors sources

Le **rapport PDF** décidé le 16/08 n'est pas construit.
