# Doctrine d'accès analytique — Explorateur Haïti

**Décision Atmart du 18 août 2026.** Ce document remplace toute lecture
antérieure des droits sur les sources. Il s'applique à l'Explorateur Haïti,
aux fichiers publiés par Atmart Data, et aux prestations facturées.

---

## 1. Les quatre phrases qui commandent tout

1. **Explorateur Haïti ne vend pas de données.**
2. **Il ne redistribue pas les fichiers bruts d'une source.**
3. **Il donne un accès *analytique*** : agrégats communaux, confrontations
   entre sources, indicateurs recalculés — chacun accompagné de sa provenance.
4. **Atmart vend un *service*** : audit, documentation, cartographie sur
   mesure, formation. Jamais la donnée elle-même.

La vente de données à des particuliers est mise de côté. Les deux piliers du
modèle restent le financement soutenable par les services, et les partenariats.

## 2. Le fondement juridique en Haïti

Décret du 12 octobre 2005 sur le droit d'auteur, **article 5** : les textes
officiels administratifs et les « simples données » sont exclus de la
protection.

Un fait — « telle commune compte tant d'écoles » — n'appartient à personne.
Ce qui est protégé, c'est la *mise en forme* : un rapport, une carte
originale, une rédaction. L'Explorateur publie des faits recalculés et sa
propre mise en forme. Il ne reproduit ni les rapports ni les cartes d'autrui.

**Conséquence pratique :** pour la très grande majorité des sources publiques,
aucune licence n'est nécessaire pour publier un agrégat communal avec sa
provenance. C'est la règle.

## 3. Les deux exceptions — et pourquoi la doctrine ne les couvre pas

La doctrine répond au **droit d'auteur**. Elle ne répond pas à ce qui n'en
relève pas. Deux choses lui échappent, et il faut les traiter à part :

### 3.1 Le partage à l'identique est contractuel

ODbL et CC BY-SA ne protègent pas des faits : ce sont des **contrats** que
l'on accepte en utilisant la base. Ils se déclenchent sur une *base dérivée
redistribuée* — et nos agrégats communaux publiés en CSV en sont une.

La contrainte se porte, elle ne se discute pas. Elle ne coûte rien : nous
publions déjà ouvert. Ce qu'elle interdit, c'est de **fondre** une telle base
dans un livrable client sous licence fermée sans le dire.

Sources concernées : OpenStreetMap/HOT (ODbL), OpenCelliD (CC BY-SA 4.0),
WPdx (CC BY-SA).

*Un rapport d'analyse n'est pas une base. Un CSV de points retraités en est
une. La frontière est là.*

### 3.2 Une condition d'accès négociée n'est pas une licence ouverte

Quand un producteur écrit noir sur blanc que ses données ne peuvent être ni
redistribuées ni servir de base à une œuvre dérivée, **aucune doctrine interne
ne le contredit**. On ne publie pas.

Reste à savoir ce qui **est** nommément interdit. Le cas de l'OIM/DTM montre
que ce n'est pas toujours évident, et qu'il ne faut pas trancher seul.

> « The Materials may be viewed, downloaded, and printed for non-commercial
> use only, without, inter alia, any right to sell, resell, redistribute or
> create derivative works therefrom. »

**Cette couche a été retirée le matin du 18/08, puis rétablie le soir même.**
Le retrait avait été décidé trop vite, et seul. L'examen a montré que la clause
est bien plus ambiguë qu'elle n'en a l'air :

- « **œuvre dérivée** » est un terme du droit d'auteur. Une œuvre dérivée
  reprend l'**expression** d'une œuvre — une traduction, une adaptation, un
  remontage. Un décompte de personnes déplacées dans une commune est un
  **fait**, et un fait n'a pas d'auteur (décret de 2005, art. 5). Il n'y a
  rien de protégé à dériver.
- L'OIM écrit **elle-même**, sur la page HDX de ce jeu, que son API existe
  pour que « the humanitarian community, academia, media, government, and
  non-governmental organizations » puissent **utiliser** ces données. La
  mention de droits qui l'accompagne date de 2018 et se retrouve à
  l'identique sur les huit jeux DTM d'Haïti : c'est un texte par défaut.
- **En sens inverse** : « *inter alia* » veut dire « entre autres ». La liste
  n'est pas limitative — elle s'élargit. Et nous avons accepté ces conditions
  en téléchargeant.

**Décision Atmart : publier sous réserve, et demander.** Nous publions un
agrégat communal recalculé, avec la ligne d'attribution exacte que l'OIM
exige, sans fichier brut et sans usage commercial — et nous avons écrit à
l'OIM pour faire trancher (`docs/LETTRE-OIM-DTM-2026-08-18.md`).

Le passeport PSP-056 porte le statut `CLARIFICATION_DEMANDEE`, créé pour
l'occasion : aucune des sept valeurs existantes ne pouvait dire « nous ne
savons pas encore, et nous l'avons demandé ». Une liste fermée qui n'offre
que des certitudes force à en inventer une.

**Si la réponse est négative**, le retrait tient en un champ : `rendreManqueJuridique()`
est déjà écrit dans `couches.js` et affiche l'explication en quatre langues.

**La leçon de méthode, qui vaut plus que le cas :** une clause juridique qui
paraît claire au premier regard mérite qu'on demande à son auteur ce qu'il a
voulu dire. Deviner — dans un sens comme dans l'autre — c'est se substituer à
lui. Et retirer une donnée publique sans en discuter avec Atmart d'abord était
une erreur de procédure autant que de fond.

## 4. Les deux verdicts, séparés

Chaque passeport porte **deux** verdicts distincts, et l'un ne se déduit pas
de l'autre :

| | Verdict A — publication gratuite | Verdict B — prestation facturée |
|---|---|---|
| Sur 38 passeports | **36 oui**, 1 sous réserve, 1 non | **33 utilisables**, 4 refus, 1 à clarifier |

Les quatre refus en prestation facturée :

- **LAPOP / AmericasBarometer** — l'usage commercial est exclu par la licence
  de clic acceptée au téléchargement ;
- **WorldCereal** — décision Atmart, pour cause de qualité insuffisante ;
- **ACLED** — publication libre avec attribution, mais l'usage commercial
  relève d'une licence ACLED séparée qui n'a pas été demandée ;
- **OIM / DTM** — l'usage non commercial est la seule chose que le texte dise
  sans ambiguïté ; la publication gratuite, elle, se poursuit sous réserve.

Deux valeurs ont dû être ajoutées à la liste fermée des statuts le 18/08 :
`OUVERTE_NON_COMMERCIALE` pour ACLED, et `CLARIFICATION_DEMANDEE` pour l'OIM.
Pour ACLED : Sans elle, il aurait fallu la ranger en
« ouverte avec attribution », donc dans le groupe vendable, donc autorisée
dans une prestation qu'elle interdit. *Une liste fermée trop courte ne protège
pas : elle force à mentir pour passer le contrôle.*

## 5. La règle qui ne se négocie pas

> **Aucun `inconnu` ne vaut autorisation.**

Un verdict absent, vide ou « à clarifier » vaut REFUS pour toute prestation
facturée. C'est `verif_droits_usage.py` qui le fait respecter, et il bloque.

## 6. Ce qui est contrôlé automatiquement

`python verif_droits_usage.py` — six contrôles, tous verts au 18/08/2026 :

1. aucune source en production sans passeport ;
2. aucun verdict payant « oui » sans droit commercial établi ;
3. les licences à partage à l'identique portent leur contrainte écrite ;
4. la matrice n'emploie que les onze états prévus ;
5. **chaque couche cartographique affiche sa source** ;
6. **aucune source à verdict « non » n'est encore publiée.**

Les contrôles 5 et 6 datent du 18/08. Le sixième manquait, et c'était le
défaut le plus grave : le registre pouvait dire NON pendant que le fichier
restait servi. *Un verdict qu'aucun test ne fait respecter est un avis, pas
une règle.*

**Le contrôle 6 a lui aussi dû être réécrit le soir même.** Sa première
version cherchait le mot « deplace » dans les noms de fichiers du répertoire
public : elle a fonctionné une demi-journée, puis a crié dès que la couche fut
rétablie, alors que son verdict n'était plus « non ». Il suit désormais les
verdicts, et la matrice dit quel fichier porte quelle source. *Un contrôle qui
code en dur le cas qui l'a fait naître ne survit pas au premier changement
d'avis.*

Le contrôle 5, lui, **a été corrigé parce qu'il avait tort** : il cherchait
`source:` dans la déclaration JavaScript et accusait six couches
parfaitement correctes. Elles lisent leur source dans le fichier de données,
ce qui vaut mieux — le producteur reste seule autorité. *Un contrôle qui
vérifie la forme du code au lieu de ce que le lecteur voit finit par exiger
une duplication, puis par la faire diverger.*

## 7. Ce que la doctrine n'autorise jamais

- Inventer une valeur communale, ou remplacer une absence par zéro.
- Masquer une couverture partielle.
- Inventer une licence, ou supprimer une attribution.
- Moyenner deux sources qui divergent.
- Republier les microdonnées d'une enquête quand l'accord l'interdit.
- Publier des données personnelles sans base légitime.
- Laisser une source juridiquement incertaine entrer silencieusement dans un
  export ou un livrable client.
- Copier automatiquement un fichier restreint dans le répertoire public.

## 8. Ce qui reste à demander

Deux autorisations écrites vaudraient la peine d'être demandées — elles
n'engagent Atmart à rien tant qu'elles ne sont pas signées :

- **OIM** — lettre rédigée le 18/08/2026, prête à partir
  (`docs/LETTRE-OIM-DTM-2026-08-18.md`). Elle décrit exactement ce que nous
  publions, pose une question fermée, et annonce que nous nous conformerons
  dans les deux cas. Elle dit aussi franchement que la couche est en ligne
  pendant l'attente : dissimuler cela puis être découvert coûterait plus cher
  qu'une phrase.
- **ACLED** — ouvrirait l'usage du conflit dans une prestation facturée.
  Non rédigée : rien ne presse tant qu'aucune prestation ne porte sur le
  conflit.

---

*Registre : `Atmart_premium_datasets/backbone/atmart_passeports_sources.csv`
(38 passeports) · Matrice : `backbone/source_gap_matrix.csv` (53 sources) ·
Contrôle : `verif_droits_usage.py`*
