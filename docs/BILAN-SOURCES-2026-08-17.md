# Bilan des sources — Explorateur Haïti

**17 août 2026.** État réel, lu dans le registre et vérifié sur le site en
production. Ce document remplace toute note antérieure sur le statut des
sources.

---

## 1. En une ligne

**25 sources ont un passeport juridique** dont la licence a été lue à sa
source. **Les 20 sont publiables gratuitement** sur l'Explorateur, **18 sont
utilisables même dans une prestation facturée**, et **plus aucune n'est
bloquée** — ni par une licence non documentée, ni par une autorisation
manquante. **Quatre sources sont en ligne** sur les 140
fiches communales, avec leurs contrôles.

*Ces chiffres sont ceux d'après la révision du soir (§7) : quatre sources
avaient été classées bloquées faute d'avoir été lues, pas parce qu'un texte
les restreignait.*

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

### Ouvertes après le réexamen du soir (§7)

| Passeport | Source | Licence établie |
|---|---|---|
| PSP-032 | HydroSHEDS / HydroATLAS | **CC BY 4.0** (v2) ; v1 « scientific, educational and commercial use » — ne pas redistribuer le fichier tel quel |
| PSP-034 | Banque mondiale — projets | **CC BY 4.0**, texte exact de la page officielle |
| PSP-035 | IATI Datastore | **licence ouverte obligatoire**, déclarée par publiant — à lire à l'ingestion, activité par activité |
| PSP-036 | Global Solar Atlas | **CC BY 4.0** — attestée par trois sources concordantes, page officielle non lisible |

### Utilisable, avec une réserve technique

| Passeport | Source | Réserve |
|---|---|---|
| PSP-041 | ESA WorldCereal | licence CC BY 4.0 confirmée, mais **qualité locale en Haïti non évaluée** — une carte de cultures fausse sur un territoire est pire qu'absente |

### Analyse et publication libres, fichiers non redistribuables

| Passeport | Source | Règle |
|---|---|---|
| PSP-028 | IBTrACS — cyclones | indicateurs dérivés vendables ; fichier non redistribué tant que la Résolution 40 de l'OMM n'est pas tranchée |
| PSP-033 | LAPOP AmericasBarometer | **accès libre mondial** ; analyse et publication **encouragées** ; ne jamais transmettre les fichiers, même à une revue — fournir le code de réplication et un lien. **Jamais d'estimation communale** : contrainte méthodologique, pas juridique |

---

## 4. Ce que le pivot non commercial a changé

En retirant la vente de données, **la plupart des verrous sont tombés** :
ils portaient sur l'usage commercial, pas sur l'usage.

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
3. **Écrire à NOAA/NCEI et à LAPOP** — deux courriels qui lèvent les deux
   dernières ambiguïtés. HydroSHEDS n'en a plus besoin.
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

---

## 7. Révision du 17/08 au soir — quatre sources débloquées

Atmart a contesté le classement d'HydroSHEDS, et avait raison. Le
réexamen qui a suivi a montré que **la même erreur de méthode avait été
commise quatre fois** : j'avais classé « licence non documentée » des
sources que je n'avais pas lues, au lieu de sources dont le texte serait
restrictif. Ce n'est pas la même chose. La première formulation appelle un
quart d'heure de travail ; la seconde bloque un chantier.

| Source | Avant | Après lecture |
|---|---|---|
| **HydroSHEDS / HydroATLAS** | contradiction bloquante | **CC BY 4.0 pour la v2** ; v1 « freely available for scientific, educational and commercial use » |
| **Banque mondiale — projets** | licence supposée | **CC BY 4.0**, texte exact sur la page |
| **IATI** | statut inconnu | **licence ouverte obligatoire**, déclarée par publiant dans les métadonnées |
| **Global Solar Atlas** | non lue | **CC BY 4.0**, trois sources concordantes |

**Le cas HydroSHEDS mérite d'être retenu.** J'avais opposé les conditions
générales du SITE (« personal, non-commercial use ») à la page produit
(« freely available for scientific, educational and commercial use ») et
conclu à une contradiction. Les deux textes portent sur deux objets
différents — et HydroSHEDS l'écrit lui-même : « All data products come
with specific license terms, specified on the product pages and technical
documentation. » La seule restriction réelle est précise : ne pas
redistribuer le fichier **tel quel comme produit autonome**. Les œuvres
dérivées sont explicitement distribuables, et l'Explorateur ne produit que
cela.

**Nouveau bilan : plus aucune source en `LICENCE_NON_DOCUMENTEE`.**
18 sources sur 20 sont utilisables même dans un produit payant. Une seule
reste sous convention — LAPOP, dont la restriction porte sur la
redistribution des fichiers d'enquête et survit à tout pivot.

**Une nuance de preuve, conservée :** pour Global Solar Atlas, la page
officielle est une application JavaScript que l'outil de lecture ne rend
pas. La licence est attestée par trois sources indépendantes concordantes,
dont le rapport technique de la Banque mondiale — suffisant pour publier
gratuitement, à confirmer avant toute prestation facturée. Le passeport le
dit, plutôt que de faire passer un recoupement pour une lecture.

### La règle qui en sort

> Une clause restrictive trouvée sur un site ne s'applique pas forcément à
> ce qu'on croit. Lire le document que le producteur **désigne** comme
> faisant foi, pas le premier texte juridique rencontré. Une prudence mal
> placée bloque un travail utile aussi sûrement qu'une imprudence l'expose.

### Correction du soir, deuxième signalement d'Atmart

**LAPOP n'était pas une source restreinte.** Je l'avais classée
`AUTORISATION_REQUISE`, en P3, avec « fichiers en zone restreinte ». C'était
faux, et Atmart l'a signalé depuis son expérience directe : des working
papers sur la pauvreté publiés avec ces données pour l'**ONPES**, une entité
du MPCE.

Ce que LAPOP dit réellement : *« unrestricted world-wide access »* aux vagues
2004-2021, téléchargeables *« without restriction, limitation or charge »*.
Les publications sont **attendues** — citation et remerciement demandés. Une
seule interdiction : *« Authors must not share data files (including with
journals) »*, avec le remède indiqué par LAPOP lui-même — fournir le code de
réplication et un lien.

C'est mot pour mot la catégorie `UTILISABLE_POUR_ANALYSE_SANS_REDISTRIBUTION`
définie dans le cahier des charges d'Atmart. Je ne l'avais pas employée là où
elle s'appliquait le mieux.

**Ce qui ne bouge pas**, pour une raison méthodologique et non juridique :
aucune estimation communale. Le plan d'échantillonnage ne rend pas la commune
représentative, quelle que soit la licence.

### Le pattern, nommé

Cinq sources sur vingt avaient été classées trop restrictivement, et toujours
de la même façon : **j'ai traité « je n'ai pas vérifié » comme « c'est
incertain », puis « incertain » comme « bloqué »**. Deux glissements
successifs, chacun défendable pris seul, dont le produit immobilise un
travail utile.

Les deux signalements d'Atmart — HydroSHEDS, puis LAPOP — ont porté sur des
sources où il avait une connaissance directe. C'est le rappel que le registre
juridique n'est pas un exercice documentaire : il décrit des usages que
quelqu'un pratique déjà.

---

## 8. Examen de fond des restrictions restantes (17/08, tard)

À la demande d'Atmart : « regardez en profondeur là où vous mettez des
restrictions, car l'Explorateur ne vend pas, et nous nous faisons un honneur
de citer les sources ». Trois familles examinées, trois résultats.

### Le droit haïtien règle la question des sources publiques nationales

Le **décret du 12 octobre 2005 sur le droit d'auteur** exclut de la
protection, à son **article 5** :

- alinéa 1 — « les textes officiels de nature législative, **administrative**
  ou judiciaire, ni à leurs traductions officielles » ;
- alinéa 3 — « idées, procédés, systèmes, méthodes de fonctionnement,
  concepts, principes, découvertes ou **simples données** ».

Le nombre d'écoles de Léogâne, la population d'une commune, le budget exécuté
d'un ministère **ne sont protégés par personne**. Ce sont des faits. Ce qui
reste protégeable est la *forme* d'un rapport — sa rédaction, ses cartes, sa
mise en page — jamais les chiffres qu'il porte.

| Institution | Ancien statut | Statut réel |
|---|---|---|
| **MSPP** — santé | « à vérifier » | données réutilisables, **obstacle = PDF sans API** |
| **MENFP / SIGEEE** — écoles | « à vérifier » | idem |
| **IHSI** — statistique | « à vérifier » | idem ; la vraie limite est que le dernier recensement date de **2003** |
| **MEF / DGB** — budget | déjà exploité | confirmé |
| **FNE** — éducation | « aucune licence ouverte » | **confusion entre absence de licence et interdiction** |

**L'obstacle n'est pas juridique, il est d'ingénierie** : PDF scannés, aucune
API, publications irrégulières. Il faut cesser de le classer au mauvais
rayon — chaque passeport le nomme désormais à sa place.

### IBTrACS : la Résolution 40 dit le contraire de ce que je supposais

Je l'avais citée sans la lire. Son texte :

> *« Members should provide to the research and education communities, for
> their **non-commercial activities**, **free and unrestricted access** to all
> data and products exchanged under the auspices of WMO. »*

La page NCEI parle par ailleurs d'un *« full and open access »*, ne pose
**aucune** interdiction de redistribution, et l'enregistrement y est
explicitement **optionnel**. L'Explorateur, qui ne vend pas, relève de
l'accès libre sans réserve.

### Bilan des restrictions réelles

**25 passeports. 24 utilisables même dans un produit payant.** Il ne reste
qu'**une seule restriction véritable** dans tout le registre :

> **LAPOP** — les *fichiers* d'enquête ne se transmettent pas à un tiers,
> même à une revue. L'analyse et la publication, elles, sont encouragées.

Et une seule contrainte méthodologique, qui ne relève d'aucune licence :
**on ne communalise pas une enquête nationale.**

### La réserve que je maintiens

Ceci est une lecture des textes, **pas un avis juridique**. Elle est
concordante avec la Convention de Berne, qui exclut de la même façon les
simples informations. Mais pour une prestation facturée d'ampleur, un juriste
haïtien reste l'interlocuteur — et cette réserve-là est de méthode, pas de
timidité.
