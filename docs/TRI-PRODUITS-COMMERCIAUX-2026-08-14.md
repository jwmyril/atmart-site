# Les produits commerciaux proposés — ce qui existe, ce qui manque

**14 août 2026.** Tri de la liste des produits à ajouter au catalogue, fait sur
les fichiers et non sur les intentions. Chaque verdict est vérifiable en
relançant les comptes cités.

---

## D'abord, la réponse à la question

Ces produits ne sont pas dans le catalogue parce qu'**ils n'ont jamais existé
nulle part**. La migration du catalogue en données n'a rien perdu : elle a
repris exactement les 14 produits que `datasets.html` portait. J'ai cherché une
liste antérieure dans les trois dépôts — aucune.

La liste ci-dessous est donc nouvelle, et c'est un plan commercial, pas un
inventaire oublié.

---

## Ce qui est livrable aujourd'hui, sur des fichiers qui existent

### Le registre des marchés — le meilleur candidat

Le référentiel des organisations, **jamais publié**, contient 182 marchés :
tous rattachés à leur section communale, **tous géolocalisés**, répartis sur
136 des 140 communes. C'est la seule des trois familles dont la couverture
tienne devant un acheteur.

Il ne recoupe pas la série de prix déjà publiée gratuitement : celle-ci porte
sur 9 marchés sentinelles et donne des prix ; celui-là donne l'emplacement et
l'identité de 182 marchés. Deux objets différents.

### Les modèles Power BI et QGIS

Rien à extraire : tout est déjà publié. Ce sont des livrables d'assemblage —
un `.pbit` branché sur les CSV publics, un projet QGIS avec ses styles sur les
GeoJSON. Le travail est réel, la matière est là, et aucun conflit de prix.

### Les profils communaux en Excel

Dérivables des indicateurs (2 949 valeurs) et de la pyramide des âges (7 140
lignes). Un classeur par commune, ou un classeur à 140 onglets.

---

## Ce qui est livrable, mais avec une limite qu'il faut écrire

### Pack écoles — 4 117 établissements, **49 communes, aucune coordonnée**

Les 4 117 écoles sont rattachées à un département et à une commune, jamais à
une section, et **aucune n'a de coordonnées**. Le degré de vérification est C
sur la totalité.

Vendable seulement si la fiche dit ces trois choses avant le prix. Un acheteur
qui comprend « les écoles d'Haïti » et reçoit 49 communes sur 140, sans points
sur une carte, demandera un remboursement — et il aura raison.

**C'est aussi exactement le produit parrainable** « registre scolaire géocodé ».
Le vendre à 15–79 $ pendant qu'on en demande le financement rend l'appel au
parrainage incompréhensible. Décision à prendre : l'un ou l'autre.

### Pack établissements sanitaires — 730 fiches, **14 communes**

730 établissements, tous rattachés à une section, 480 géolocalisés. Mais
**14 communes sur 140** : 10 % du pays. Même remarque que ci-dessus, en plus
serré, et même conflit avec le parrainage « registre sanitaire versionné ».

### Pack Géo par département, et référentiel complet des territoires

Techniquement immédiats : le pack complet existe, le référentiel des 11 707
entités aussi. Mais le Pack Géo se vend déjà **29 $ pour tout le pays**.
Découper par département à 15–79 $ produirait un prix par département
supérieur au prix du tout — et deux prix pour la même donnée, ce que la règle
d'Atmart interdit. Il faut une grille cohérente avant, pas après.

---

## Ce qui met une donnée gratuite derrière un paiement

Trois produits de la liste sont **déjà publiés gratuitement** :

| Produit proposé | Statut réel |
|---|---|
| Pyramides des âges | PRD-007, gratuit, 7 140 lignes, CC BY 4.0 |
| Pack marchés *(si l'on entend les prix)* | PRD-008, gratuit, 14 140 relevés |
| Dictionnaires et tables de millésimes | Inclus dans PRD-005, gratuit |

Les faire payer demande une **décision explicite d'Atmart**, et suppose de
retirer ce qui est déjà sous CC BY 4.0 — une licence qu'on ne reprend pas :
qui a téléchargé garde ses droits. En pratique, ce serait un produit payant
que ses acheteurs pourraient légalement rediffuser.

---

## Ce qui est bloqué

### Pack interventions du FNE — à ne pas construire

SRC-023 est en **classe C** : « accès public, redistribution non présumée,
usage commercial à confirmer ». La lettre au FNE est **rédigée mais non
envoyée**. Vendre un pack tiré de ces publications serait exactement ce que le
cadre pose comme interdit, et le ferait avant même d'avoir posé la question.

### Séries démographiques historiques

La pyramide publiée porte **une seule année : 2024**, et ce sont des
projections. Il n'y a pas de série historique à vendre — il y a une série à
construire, ce qui est un travail de source, pas de mise en forme.

---

## Ce qui n'est pas un produit mais une plateforme

### Abonnements 39–299 $/mois

Demandent un paiement récurrent, des comptes, des alertes, un historique de
versions, un nombre de sièges, une assistance. Le site est **statique**, les
paiements sont uniques via Payhip et Stripe, il n'existe ni compte ni session.

Ce n'est pas une carte à ajouter au catalogue : c'est un système à bâtir. Une
fiche « abonnement » publiée avant lui vendrait un service inexistant.

### Licences institutionnelles

Même constat, aggravé : **API**, espace organisation, SLA de mise à jour,
formation, support. Aucun de ces éléments n'existe. Un SLA est un engagement
contractuel de délai — on ne l'annonce pas avant de pouvoir le tenir.

### Produits professionnels 150–900 $

Ceux-ci existent déjà, sous un autre nom. La page Solutions propose six offres
— implantation, ciblage territorial, diagnostic, étude de marché, suivi de
programme, comparaison entre territoires — à 250–900, 400–1 200 et
600–1 500 $. La liste proposée les redit presque une à une.

Publier une seconde grille à 150–900 $ donnerait **deux prix pour la même
prestation**. Il faut fusionner, pas empiler.

---

## Ce que je propose de faire dans l'ordre

1. **Publier le registre des marchés** — livrable aujourd'hui, sans conflit.
2. **Construire les modèles Power BI et QGIS** — assemblage sur données déjà
   publiques.
3. **Trancher trois questions** avant toute autre fiche :
   - écoles et santé : produit payant limité, ou cible de parrainage ?
   - grille de prix géographique cohérente avec les 29 $ du pack complet ;
   - faut-il faire payer ce qui est aujourd'hui sous CC BY 4.0 ?
4. **Ne rien annoncer** des abonnements et des licences institutionnelles tant
   que le système n'existe pas.

---

*Aucun produit de ce document n'a été ajouté au catalogue. Ce qui y entre doit
avoir un livrable, et `verif_catalogue.py` refuse le contraire.*
