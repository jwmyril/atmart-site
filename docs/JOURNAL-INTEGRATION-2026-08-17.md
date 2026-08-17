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

---

# Deuxième vague — clôture du 17/08

Cinq pipelines de plus, et les deux dettes réglées.

## Onze couches en ligne

| Couche | Source | Ce qu'elle apporte |
|---|---|---|
| **Croissance du bâti** | GHSL R2023A | 1990 → 2020, quatre millésimes du même instrument |
| **Projets** | Banque mondiale | 189 projets, 15 communes nommées, **aucun montant réparti** |

Total : **11 couches** sur les 140 fiches. Vérifié sur Port-au-Prince —
11 blocs sur 11 remplis.

## Contrôles : 341 assertions vertes, zéro en échec

67 site · 41 cyclones · 37 urbanisation · 36 projets · 35 bâtiments ·
31 solaire · 29 eau · 28 sols · 13 séismes · 12 pluie · 12 occupation du sol,
plus le registre juridique et la matrice.

**Trois pipelines ont prouvé que leurs contrôles savent échouer**, en
sabotant volontairement leurs propres données : millésimes échangés, facteur
d'échelle faussé, masque décalé, montant réparti entre communes. Chaque
sabotage a fait virer les tests au rouge, puis les fichiers ont été
restaurés. Un test qui n'a jamais échoué n'est pas un test.

## Ce que la deuxième vague a révélé

**GHSL** — la surface bâtie d'Haïti est passée de **135,6 à 290,8 km²** entre
1990 et 2020, soit +114 % et 5,2 km²/an. L'agglomération de Port-au-Prince —
7 communes sur 140 — concentre **22,7 %** de cette croissance.
Croix-des-Bouquets seule gagne 15,17 km².

*Delmas n'est que 41e*, et c'est une saturation, pas une anomalie : déjà bâtie
à 34,8 % en 1990, elle reste la commune la plus bâtie du pays. Le contrôle la
traite comme contre-test — si Delmas bondissait, c'est le masque qu'il
faudrait suspecter.

**Projets** — 189 opérations, dont **29 seulement nomment un territoire**. Les
160 autres sont nationales. Le bloc n'affiche **aucun montant par commune** :
la Banque mondiale ne publie pas de ventilation géographique, et répartir
1,47 milliard d'engagements actifs entre les communes citées produirait un
chiffre inventé — le genre d'invention qui finit citée comme un fait dans une
note de politique publique.

Trois constats de source qui ont changé le produit : `totalcommamt` n'existe
pas dans l'API et y est silencieusement ignoré ; le cofinancement n'est **pas
calculable** (la soustraction est négative sur 13 projets) ; 64 projets
portent un coût à zéro qui est une absence de saisie.

**IATI n'a pas pu être ingéré** : l'API exige une clé d'abonnement que le
projet n'a pas. La fonction est écrite avec sa règle d'entrée, et l'état
« tenté, refusé, raison » est publié dans le produit plutôt que passé sous
silence.

## Les deux dettes, réglées

**L'addendum d'arbitrage du Global Solar Atlas** — le texte de licence ne
figure sur aucune page web. Il est dans les métadonnées ISO du GeoTIFF livré :
CC BY 4.0 *« with the following mandatory and binding addition »* — médiation
OMPI puis arbitrage CNUDCI, arbitre unique, en anglais, au siège du concédant
ou de la Banque mondiale à Washington. Cette clause désigne la juridiction et
elle engage Atmart. **Troisième fois de la journée que la preuve n'était pas
là où je la cherchais** : une licence ne se lit pas seulement sur la page d'un
site, elle se lit aussi dans le fichier livré.

**Le masque des sols** est passé à la fraction de recouvrement, en préservant
la combinaison avec le masque de terre du modèle. La pédologie ne bouge pas —
la correction porte sur les bordures, pas sur le fond.

## État final

| | |
|---|---|
| Couches en ligne | **11** |
| Assertions vertes | **341**, zéro en échec |
| Passeports juridiques | **25**, tous publiables gratuitement |
| Scripts de production | 58 construction, 24 contrôle |
| Sources brutes scellées | **39 manifestes**, 1,7 Go |
| Commits poussés ce jour | **39** — 15 site, 15 atelier, 9 documentation |

## Ce qui reste hors de portée

| Source | Obstacle réel |
|---|---|
| **HydroSHEDS** | format shapefile, illisible sans GDAL |
| **Dynamic World** | accessible seulement via Google Earth Engine |
| **IATI** | clé d'abonnement requise |
| **MSPP, MENFP, IHSI, MEF, FNE** | PDF sans API — **extraction, pas autorisation** |
| **OSRM auto-hébergé** | le seul chantier lourd — sans lui, aucun temps de trajet |

Et le **rapport PDF** décidé le 16/08 n'est toujours pas construit.

---

# Troisième vague — les sources « impossibles »

Trois chantiers réputés bloqués. Deux se sont ouverts, un reste fermé.

## HydroSHEDS : deux croyances, aucun obstacle réel

**« Le fichier n'est plus accessible »** — il l'était. Le CDN répond **403 à
l'agent par défaut de curl et 200 au MÊME octet** demandé avec un agent de
navigateur. Le code de statut ne parlait pas du fichier, il parlait du client.

**« Le shapefile est illisible sans GDAL »** — il ne l'est pas. Le format est
publié depuis 1998 : un en-tête de 100 octets, des enregistrements préfixés
de leur longueur, une table dBase III à côté. `lire_shapefile.py` le lit en
Python nu et a chargé **22 533 bassins en 4,3 secondes**.

Les deux croyances menaient au même endroit : conclure à l'indisponibilité et
aller chercher ailleurs une source moins bonne. **C'est ainsi qu'on fabrique
une donnée fausse sans jamais mentir.**

*Test de vérité* : les cinq communes au plus grand bassin amont — Mirebalais,
Saut d'Eau, La Chapelle, Petite Rivière de l'Artibonite, Grande Saline —
portent toutes exactement **8 886,8 km²**, le maximum national. Ce sont les
communes de l'Artibonite. Rien ne guidait ce résultat : il valide d'un coup
le lecteur écrit à la main, le décalage des enregistrements et l'attribution
point-dans-polygone.

## Le plus gros trou de l'Explorateur, comblé

| Couche | Avant | Après |
|---|---|---|
| **Santé** | 14 communes sur 140 | **139** — 2 234 établissements |
| **Écoles** | 49 communes sur 140 | **132** — 7 362 établissements |

Extrait HOT/OSM du 6 août 2026, ODbL. Croix-des-Bouquets en tête des deux :
185 établissements de santé, 989 écoles.

**Ce que cela ne comble pas**, et qui s'affiche avant les chiffres : OSM est
une base **contributive**. Sa couverture suit les cartographes, pas le
terrain. Une commune peu cartographiée paraît sous-équipée — défaut de la
carte, pas du territoire. C'est l'inverse exact du défaut d'un registre
administratif, qui liste ce qui est **déclaré** même quand la porte est
fermée depuis trois ans. Les deux se contredisent parfois, et cette
contradiction est une information.

## Dynamic World : licence ouverte, accès fermé

CC BY 4.0 confirmée, mais le jeu **ne vit que dans Google Earth Engine** —
aucun miroir (testé : 403 sur storage.googleapis.com, 404 sur Source
Cooperative). L'employer supposerait un compte, une authentification et un
export vers un stockage tiers : trois dépendances qui contredisent
l'architecture statique de l'Explorateur.

**Ce que cela coûte, en pratique : peu.** WorldCover donne déjà l'occupation
du sol à 10 m et GHSL la dynamique du bâti sur quatre millésimes. Dynamic
World apporterait le quasi-temps-réel — utile pour suivre un lendemain de
cyclone, pas pour décrire un territoire. **À rouvrir si Atmart ouvre un
compte Earth Engine** : il est gratuit pour l'usage non commercial, soit
exactement le cadre retenu depuis le pivot.

## Les institutions haïtiennes : un obstacle d'accès, pas de droit

| Site | État au 17/08 |
|---|---|
| MENFP, IHSI, MEF, FNE | **répondent** |
| MSPP, eduhaiti | injoignables |

Le droit est réglé — décret du 12/10/2005, article 5. Reste un travail
d'extraction PDF, que les agents lancés dessus n'ont pas pu mener à terme
(coupures réseau). **Les données HOT/OSM comblent l'urgence** ; les registres
ministériels restent le complément à obtenir, pour la raison dite plus haut :
ils listent autre chose.

## État final de la journée

| | |
|---|---|
| Couches en ligne | **13** |
| Suites de contrôle | **25** |
| Passeports juridiques | **25** |
| Sources brutes scellées | **1,9 Go** |
| Commits poussés | **45** — 18 site, 17 atelier, 10 documentation |

Deux corrections de finition, faites parce qu'on a **regardé les pages** :
« 381,1 km² d'eau » pour une commune de 380,5 km² (mauvais champ), et
« 26 hôpitals » (pluriel naïf). Aucun contrôle automatique ne les aurait
attrapées — le premier chiffre était exact mais mal nommé, le second était
une faute de français dans une phrase juste.

---

# Troisième vague — les deux couches calculées sans être visibles

Deux chantiers lourds étaient terminés côté données et n'atteignaient aucun
lecteur. Un fichier produit que personne ne lit ne vaut pas mieux qu'un
fichier absent : ils sont branchés.

## Temps d'accès par la route

Dijkstra sur le graphe OpenStreetMap, **1,33 million de nœuds**, calculé chez
Atmart — aucune API de routage commerciale interrogée. Le barème de vitesses
est publié dans le produit, parce que c'est lui qui commande tous les
résultats : qui le juge mauvais peut refaire le calcul.

**Le bloc affiche DEUX mesures, et leur écart est l'information.** Depuis le
bourg, tout est proche : c'est mécanique, le bourg est l'endroit même où les
établissements sont installés. Depuis les sections, en pesant chaque habitant
là où le satellite le voit vivre, la distance réelle apparaît.

| Léogâne | un point de santé |
|---|---|
| depuis le bourg | **0,1 min** |
| pour la moitié des habitants | 1,3 min |
| 7e Section Parques | **46,4 min** |

La médiane retenue est la médiane **pondérée par la population**, jamais la
médiane par section : celle-ci compte pour un une section de 300 habitants et
une de 30 000, ce qui décrit la géographie et non les gens.

**38 sections et 97 659 habitants (0,9 %) ne sont atteints par aucune route
cartographiée à moins de deux kilomètres.** Le bloc dit que leur accès est
INCONNU, pas mauvais, et ne les range dans aucun seuil : les compter au-delà
de deux heures serait inventer une mesure qu'on n'a pas faite.

Les temps valent en **conditions normales**. L'état de la chaussée, la saison
des pluies, les barrages et l'insécurité n'entrent pas dans le calcul : c'est
un plancher optimiste, jamais une prévision de trajet.

## Écoles déclarées contre écoles vues

**17 827 codes CIE distincts** dépouillés des dix registres MENFP 2024-2025.
643 lignes d'établissement étaient matériellement répétées dans les PDF du
ministère — des blocs de pages entières réimprimés — et ont été écartées ; le
comptage porte sur des codes distincts, pas sur des lignes.

Face à eux, **7 251 écoles visibles sur OpenStreetMap**.

Les deux chiffres sont publiés parce qu'**aucun n'est la vérité** : le
registre garde une école fermée mais non radiée, la carte ignore ce
qu'aucun contributeur n'a relevé. À l'échelle du pays, **41 %** — la moitié
des écoles d'Haïti n'apparaît sur aucune carte. Ce n'est pas un fait sur les
écoles, c'est un fait sur l'information disponible, et c'est cela que le bloc
donne à lire.

Huit communes ont un registre et **pas une seule** école cartographiée : la
fiche y écrit « non documenté », jamais « aucune école ».

## Trois dérives silencieuses, corrigées au passage

- **Les pages traduites servaient un moteur de l'avant-veille.** `ht/`, `en/`
  et `es/` demandaient `explorateur.js?v=23` quand le français était à v=25.
  L'URL ne changeant plus, le cache d'un lecteur kreyòl ne se serait jamais
  rafraîchi. `data.css` existait de son côté en trois versions pour un seul
  fichier. Tout est réaligné, et le service worker précharge désormais ce que
  les pages demandent réellement.
- **Les pages `ht/` et `es/` étaient inertes en production** : leurs scripts
  en ligne n'avaient pas d'empreinte dans la politique de sécurité, donc le
  navigateur les bloquait. `build_csp.py` rejoué, 39 pages protégées.
- **`verif_copies.py` accusait à tort.** Il ne connaissait qu'un producteur et
  déclarait orphelins seize fichiers parfaitement tenus. Une alerte qui crie à
  tort finit par ne plus être lue du tout.

## Le banc de tests ne ment plus sur lui-même

La série s'arrêtait sur « délai dépassé », à un endroit différent à chaque
passage. Cela ressemblait vingt minutes durant à un bogue de l'Explorateur.
Ce n'en était pas un : les sections différées reposent sur
`IntersectionObserver`, que le navigateur ne déclenche **qu'en dessinant une
image**. Fenêtre masquée, le cadre ne dessine pas, l'observateur reste muet.

Le banc mesure maintenant l'état du cadre et écrit « **NON JOUÉ ICI** » avec
la raison et le remède, au lieu d'accuser le produit. Un test qu'on n'a pas
pu jouer ne doit ni passer en silence, ni compter comme un échec du site.

## Et un blanc que rien n'expliquait

Le bloc « projets » laissait sur **125 fiches** un paragraphe vide — invisible
mais porteur de sa marge — produit par un `T("")`, une clé de traduction vide.
Repéré en production sur Léogâne, en comptant les blocs remplis un par un
plutôt qu'en regardant la page.

## État après la troisième vague

| | |
|---|---|
| Couches sur les 140 fiches | **16** |
| Vérifié en production | Léogâne : **15 blocs remplis, 1 masqué à bon droit** |
| Moteur | `explorateur.js?v=26`, cache `explorateur-v72` |
| Quatre langues | même moteur, même version, mêmes données |

---

# Quatrième vague — les deux « impossibles », et un rapport qui sortait anonyme

## Le MEF : un constat exact, une conclusion fausse

« Ventilation départementale irrécupérable par OCR » décrivait bien la page 73
des annexes du budget : la couche de texte du PDF officiel y est détruite —
« ARTIBONI~T---=---- », « 34s,s10,ooo,001 ». Lue mot à mot, elle est
inexploitable.

Mais un tableau budgétaire porte ses propres preuves.

- **Sa géométrie survit à l'OCR**, qui déplace des caractères et jamais des
  colonnes. On lit donc par position — ce qui évite l'erreur silencieuse
  parfaite : les deux dernières colonnes de la page portent une population et
  une densité, et les prendre pour de l'argent aurait donné un résultat
  plausible et faux.
- **Son arithmétique est redondante** : fonctionnement + investissement =
  total, sur chacune des onze lignes.
- **Ce que l'OCR laisse d'un montant détruit reste une contrainte.** Le
  fragment « 3796626 » ne vaut rien comme valeur — le prendre pour un montant
  diviserait un budget par mille — mais il dit que le vrai nombre finit par
  ces sept chiffres.

Deux valeurs sont reconstruites plutôt que lues, et le produit le dit ligne par
ligne. L'Artibonite par soustraction, confirmée par son fragment. Le Centre par
recherche sous contrainte : **un seul couple** satisfait à la fois le total de
sa ligne, le suffixe survivant du premier terme, le fragment du second et le
solde des colonnes — à **8 gourdes**, quand le candidat suivant est à **dix
millions**. Les colonnes retombent sur les enveloppes votées à **9 gourdes sur
345 milliards** : c'est l'arrondi du Moniteur lui-même, publié et non corrigé.

| | crédits votés 2025-2026 |
|---|---|
| Ouest | **64,8 %** |
| non ventilé sur aucun territoire | **25,3 %** |
| les neuf autres départements | **9,9 %**, pour 10,7 millions d'habitants |

Le bloc paraît sur la fiche du département — l'échelon auquel le budget est
réellement voté — et sur celles de ses communes en disant que le chiffre est
celui du département. Le descendre au prorata de la population fabriquerait une
donnée que le Moniteur ne publie pas. Et ce sont des **crédits votés**, jamais
de la dépense exécutée.

## Le MSPP : un site injoignable n'est pas une donnée absente

mspp.gouv.ht accepte la connexion puis la coupe en **70 millisecondes** — port
ouvert, réponse remise à zéro. Le constat « MSPP injoignable » était exact au
pied de la lettre.

Le ministère publie sa **Carte sanitaire** sur un autre domaine, qui répond
normalement et sert la liste complète par son propre point d'entrée public :
**1 033 établissements géolocalisés**, avec catégorie, statut et commune. Sans
inscription, sans clé, sans contourner quoi que ce soit.

Le registre porte ses accents **déjà perdus dans la base du producteur** :
« Limb! » pour « Limbé ». On ne répare pas la source, on la lit sans deviner —
le « ! » devient un joker accepté seulement s'il désigne UNE commune, complété
d'une table d'alias de quatorze entrées, explicite parce qu'elle est
contestable. Un rapprochement « au plus ressemblant » aurait rangé les cinq
établissements de « Cayes » à Cayes-Jacmel plutôt qu'aux Cayes, à soixante
kilomètres — et personne ne l'aurait vu. **1 033 rattachés, 139 communes sur
140** ; Plaisance du Sud est la seule absente du registre.

Même geste que pour les écoles, **résultat inverse** : la carte montrait 41 %
des écoles déclarées, elle montre **144 %** des établissements de santé. Elle
voit des cabinets que le registre n'enregistre pas ; le registre garde des
établissements que personne n'a relevés. Aucun des deux n'est la vérité.

## Le rapport imprimé sortait sans en-tête

Il était construit depuis le 16/08 et n'avait jamais été éprouvé sur papier.
La feuille d'impression du site masque son chrome par
`header, footer { display: none !important }` — et le rapport construit SON
PROPRE en-tête, qui est un `<header>`. Le document sortait donc **sans nom de
commune, sans p-code, sans superficie, sans date d'édition et sans
l'avertissement qui dit ce qu'il est** : exactement le document anonyme que ce
rapport a été écrit pour ne pas être. La règle vise désormais `body > header`.

Trouvé en basculant les règles `@media print` en « screen » par le CSSOM, pour
VOIR la mise en page au lieu de la déduire de la feuille de style. La même
mesure donne le reste : **sept pages A4**, dont près de trois pour la page des
sources, et **aucun bloc plus haut qu'une page** — rien ne sera coupé de force.
L'infobulle annonçait « 4 à 5 pages » ; elle annonce maintenant ce qui sort de
l'imprimante.

Le rapport a aussi révélé une contradiction : la section 1 imprimait
« Population officielle » pour la projection UNFPA/OCHA, statut E, pendant que
le bloc des trois sources appelle « statistique officielle » le chiffre de
l'IHSI. Sur Gressier, la même feuille aurait annoncé 3 987 et 36 541 habitants
sous le même adjectif. C'est « **Population projetée** » désormais.

## Sept cartes de plus sur la page Couches

Servies par un seul fichier de **12 Ko** extrait des quatre produits détaillés
plutôt que par leurs 377 Ko : accès à un point de santé, accès à un hôpital,
part des écoles déclarées que la carte montre, désaccord entre les trois
sources de population, couvert arboré 2021, croissance du bâti 1990-2020,
potentiel solaire. « Occupation du sol récente » quitte les couches annoncées :
elle existe.

Chaque couche déclare sa rampe de couleur. Le rouge n'est pas neutre sur une
carte — il se lit « attention » — et l'employer pour une forêt dense ou un bon
ensoleillement ferait dire à la teinte le contraire de la donnée. La légende
compte aussi les communes en gris : sans ce comptage, une carte incomplète se
lit comme une carte complète où tout va bien.

Les sept étaient d'ailleurs **déclarées et absentes du sélecteur**, qui est une
liste explicite — chargeables et invisibles, la panne la plus silencieuse
possible. Un garde-fou signale désormais toute couche qu'aucun groupe ne montre.

## Les contrôles savent échouer

`verif_mef_departements.py` refait les deux reconstructions **sans réemployer
une ligne** du script de construction : deux codes qui se trompent de la même
façon en partant de contraintes différentes, cela n'arrive pas. Dix-neuf tests,
dont quatre tests de vérité indépendants de notre chaîne. Trois sabotages
délibérés — **un chiffre changé d'une seule gourde**, l'Ouest ramené au rang
des autres, le non-ventilé mis à zéro — font tous virer les contrôles au rouge.

## Et un faux bogue qui a coûté une demi-heure

La fiche restait vide, la console annonçait « Failed to fetch dynamically
imported module ». Le module était intact : `python -m http.server` livrait
**130 560 des 140 840 octets** une fois sur deux, sans erreur côté serveur. Il a
fallu comparer l'octet reçu à l'octet attendu, trois fois de suite, pour voir
que le transport était fautif et non le code. Le banc a désormais son serveur,
qui écrit le corps par blocs au lieu de déléguer à `sendfile`.

## État après la quatrième vague

| | |
|---|---|
| Couches sur les fiches | **18** |
| Cartes sur la page Couches | **19** |
| Passeports juridiques | **27** — PSP-047 (MEF) et PSP-048 (MSPP) |
| Moteur | `explorateur.js?v=29`, cache `explorateur-v75` |
| Sources institutionnelles restantes | aucune : IHSI, MENFP, MEF, FNE et MSPP sont intégrés |
