# Ce qu'Atmart Data peut vendre — proposition

**14 août 2026.** Proposition, pas décision : rien de ce document n'est publié.
Les prix sont des propositions argumentées, à trancher par Atmart.

---

## Le fait dont tout découle

**Les données sont sous CC BY 4.0.** Elles sont gratuites, et qui les télécharge
a le droit de les rediffuser. Vendre la donnée elle-même est donc structurellement
impossible : le premier acheteur peut légalement la republier.

Ce n'est pas une faiblesse, c'est le modèle. Les 10,3 Mo publiés font le travail
d'un commercial : ils prouvent la qualité avant qu'on demande un euro. Mais il
faut alors vendre autre chose que la donnée.

**Quatre choses se vendent, et elles sont réelles :**

| Ce qu'on vend | Pourquoi quelqu'un paie |
|---|---|
| Le **format** | Sa donnée est prête à ouvrir dans son outil, pas à préparer |
| La **fraîcheur** | Il reçoit la mise à jour au lieu de la surveiller |
| Le **temps** | Le travail est fait pour lui |
| La **garantie** | Un engagement écrit, citable, avec quelqu'un au bout |

Le Pack Géo à 29 $ vend déjà le premier. Tout le reste est à construire — et
tout est constructible sur ce qui existe.

---

## A. Produits d'assemblage — 9 à 49 $

Ils ne remettent aucune donnée derrière un péage : les CSV restent gratuits.
On vend le montage, qui prend deux jours à quelqu'un qui sait, et deux semaines
à quelqu'un qui apprend.

### Modèle Power BI Haïti — 39 $

Un `.pbit` branché sur les CSV publics : référentiel territoire en hiérarchie
département › arrondissement › commune, table de dates du référentiel temps
avec l'exercice fiscal haïtien, et les mesures qui **recalculent les ratios sur
les totaux** au lieu de moyenner des taux communaux — l'erreur que fait tout le
monde et que le dictionnaire d'Atmart interdit.

*Argument de vente honnête* : « Vous pouvez le construire vous-même en une
semaine. Ceci vous le donne en dix minutes, et sans l'erreur de moyenne. »

### Projet QGIS Haïti — 29 $

Un `.qgz` avec les trois GeoJSON stylés, les jointures p-code déjà écrites vers
les indicateurs, et les 182 marchés géolocalisés en couche prête.

### Classeur « 140 profils communaux » — 25 $

Un Excel, un onglet par commune : indicateurs, pyramide des âges, sources et
années de référence. Ce que les ONG refont à la main, commune par commune.

### Pack Géo par département — 9 $ l'unité

Cohérent avec les 29 $ du pack complet : 9 $ × 10 départements = 90 $, donc le
pack entier reste nettement l'affaire. Un acheteur qui ne travaille que sur le
Nord n'a pas à payer le pays.

**Ce qu'il faut pour lancer** : construire les trois modèles, créer trois liens
Stripe. Rien d'autre.

---

## B. Combler le trou entre 79 et 250 $

La gamme Solutions commence à 250 $. En dessous, il n'y a rien — et c'est là
que se trouve le client qui découvre Atmart.

### Extraction documentée — 150 $

« Dites-moi les communes et les indicateurs, je vous renvoie le fichier sous
48 h, avec ses sources, ses années et ses limites. » Une demi-journée de
travail, un livrable propre, et surtout **un premier achat** qui amène les
suivants.

---

## C. Abonnements — réalisables dès maintenant

C'est le point où je me suis trompé la dernière fois : j'avais écrit qu'un
abonnement demandait un système de comptes. C'est faux **si le livrable est un
envoi et non un accès protégé**. Stripe est déjà en place et gère les paiements
récurrents ; il n'y a ni compte à créer, ni session, ni mot de passe.

### Veille données Haïti — 19 $/mois

Un envoi mensuel : les jeux mis à jour en pièce jointe, le journal des
changements, les nouvelles sources entrées au registre, et les modèles Power BI
et QGIS remis à jour. L'abonné ne surveille plus rien.

### Pro — 49 $/mois

Tout le précédent, plus une extraction sur mesure par trimestre et une réponse
méthodologique sous trois jours ouvrés. C'est l'offre pour la personne qui
produit des rapports à répétition.

**Ce qu'il faut pour lancer** : deux liens d'abonnement Stripe, une liste
d'envoi, et la discipline de l'envoi mensuel. **Ne pas lancer sans cette
discipline** : un abonnement non tenu est pire que pas d'abonnement.

---

## D. Licence institutionnelle — 900 à 2 500 $/an

Sans API, et sans en promettre une. Ce qui est vendable aujourd'hui :

- une **convention écrite** de réutilisation et de citation ;
- un **engagement de correction** : toute erreur signalée est corrigée ou
  documentée sous quinze jours ;
- le **journal des corrections**, nominatif et daté ;
- un **interlocuteur nommé** ;
- une **formation de deux heures** à l'équipe ;
- un **engagement de mise à jour** sur les jeux existants — pas sur des jeux
  à venir.

Une université ou une ONG bailleuse n'achète pas un accès qu'elle a déjà
gratuitement : elle achète le droit de citer sans risque et quelqu'un à
appeler. L'API viendra si la demande la finance.

---

## E. Ce qui existe déjà et rapporte plus que tout le reste

**Le parrainage.** 500 à 10 000 $, cinq formules, contreparties écrites, et
maintenant un périmètre réduit garanti si le montant n'est pas atteint. C'est
le produit B2B le plus abouti du site, et le seul dont le prix soit à la
hauteur du travail.

Aucune offre ci-dessus ne doit lui faire concurrence. En particulier : **ne pas
vendre les packs écoles et santé** tant qu'on en demande le financement.

---

## Ordre de lancement proposé

| # | Quoi | Effort | Encaisse |
|---|---|---|---|
| 1 | Modèle Power BI, projet QGIS, classeur Excel | 3 à 4 jours | 25–39 $ l'unité |
| 2 | Extraction documentée à 150 $ | une page | 150 $ |
| 3 | Pack Géo par département | une demi-journée | 9 $ |
| 4 | Abonnement Veille à 19 $/mois | 1 jour + discipline | récurrent |
| 5 | Licence institutionnelle | rédaction de la convention | 900–2 500 $/an |

Les trois premiers financent le quatrième. Le cinquième se vend en parlant à
des gens, pas en publiant une page.

---

## Ce que je déconseille encore

**L'API** avant d'avoir un client qui la paie. **Le pack FNE** tant que la
lettre n'est pas envoyée et répondue. **Faire payer ce qui est sous CC BY 4.0** :
juridiquement inefficace, et destructeur pour la confiance qui fait vendre le
reste.

---

*Aucun de ces produits n'est au catalogue. Ce qui y entre doit avoir un
livrable, et `verif_catalogue.py` refuse le contraire.*
