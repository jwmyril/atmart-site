# Explorateur Haïti — de la vente de données au bien public

**17 août 2026.** Décision d'Atmart : l'Explorateur n'a pas pour but premier
de vendre des données, mais de rendre l'information utile accessible en
Haïti. La rentabilisation se cherchera autrement.

Ce document dit d'abord ce que cette décision **débloque juridiquement** —
c'est la conséquence la plus immédiate, et elle est large — puis propose un
modèle de financement, et enfin ce qu'il faut changer sur le site.

---

## 1. Ce que la décision débloque, dès aujourd'hui

La plupart des verrous rencontrés hier portaient sur **l'usage commercial**,
pas sur l'usage tout court. En retirant la vente de données, ils tombent.

| Source | Hier | Aujourd'hui |
|---|---|---|
| **HydroSHEDS / HydroATLAS** | bloquée — contradiction sur l'usage commercial | **utilisable** : les conditions du site autorisent explicitement l'usage « personal, non-commercial » avec attribution. La contradiction ne portait que sur le commercial. |
| **IBTrACS** (cyclones) | analyse seulement, redistribution incertaine | **utilisable** : la Résolution 40 de l'OMM que la page invoque vise les usages commerciaux. L'accès « complet et ouvert » de la politique WDC s'applique. |
| **OSM / ODbL** | partage à l'identique = risque de contamination des produits | **avantage** : si les produits dérivés d'Atmart sont eux-mêmes ouverts, l'obligation ODbL n'est plus une contrainte, c'est la même direction. |
| **Open Buildings** | fallait choisir CC BY pour éviter ODbL | **le choix n'a plus d'enjeu** — les deux conviennent. |
| **LAPOP** | offre payante = clarification écrite obligatoire | **plus simple** : l'analyse publiée gratuitement est l'usage même que LAPOP encourage. L'interdiction restante est nette et facile à tenir : ne jamais redistribuer les fichiers. |

### La frontière à tenir, et elle est simple

Le pivot ne supprime pas la question juridique, il la **déplace** — et la
rend beaucoup plus facile à tenir, parce qu'elle devient binaire :

> **Ce qui est publié gratuitement sur l'Explorateur** relève de l'usage non
> commercial : presque toutes les sources ouvertes conviennent.
>
> **Ce qui entre dans une prestation facturée** (rapport d'implantation,
> diagnostic sur mesure, tableau de bord d'un client) relève de l'usage
> commercial : seules les sources dont la licence l'autorise explicitement
> peuvent y figurer.

Un seul champ suffit à faire respecter cette frontière dans les fichiers, et
il existe déjà : `droit_usage_commercial` dans les passeports. Le contrôle
automatique découlera de lui.

**Point de vigilance honnête** : une prestation d'analyse facturée qui
s'appuie sur des données « non commerciales » reste une zone grise dans
plusieurs licences. La règle prudente est celle ci-dessus — et pour les trois
ou quatre sources qui comptent vraiment, un courriel de clarification vaut
mieux qu'une interprétation.

---

## 2. Comment financer un bien public

L'investissement est réel : référentiels, sources négociées, pipeline,
contrôles, quatre langues. Voici ce que je recommande, du plus solide au
plus incertain.

### A. Le parrainage de jeux de données — le modèle qui colle déjà

Vous l'avez **déjà construit** (`donnees-parrainage.html`, désormais en
quatre langues). Il devient le modèle principal et non plus un complément :

> Un bailleur, une entreprise ou une institution finance **l'ouverture** d'un
> jeu de données. Le jeu devient public et gratuit pour tous. Le parrain est
> cité en permanence, reçoit un rapport d'usage, et finance une capacité —
> pas une conclusion.

C'est exactement le modèle qui se défend auprès d'un bailleur : son argent ne
paie pas une licence pour lui, il **ouvre une ressource pour le pays**. Et la
règle d'indépendance déjà écrite dans vos conventions est ce qui rend la
chose crédible.

*Action : remonter cette page en tête du parcours, devant le catalogue.*

### B. Les services — vendre le travail, jamais la donnée

Ce que vous vendez devient explicite et défendable :

- **diagnostic territorial et rapport d'implantation** — l'analyse, pas les
  fichiers ;
- **appui méthodologique et contrôle qualité des données** — vous l'avez déjà
  fait pour HAGN (contrôle qualité sur formulaires Kobo) : c'est un savoir-faire
  rare en Haïti et il se facture ;
- **tableaux de bord pour institutions** — Power BI / QGIS montés sur leurs
  données ;
- **formation** — Formation360 et Lojik360 existent ; une donnée ouverte crée
  la demande de gens capables de la lire.

La donnée gratuite devient alors un **canal d'acquisition** au lieu d'un
produit : celui qui explore sa commune découvre qui sait faire l'analyse.

### C. Le statut de bien public numérique — l'accélérateur

La **Digital Public Goods Alliance** tient un registre des biens publics
numériques. Les critères sont : licence ouverte, standards ouverts,
documentation, indépendance des plateformes, et « ne pas nuire ».

L'Explorateur en coche déjà l'essentiel — sources documentées, méthode
publiée, aucune donnée personnelle, aucun traceur, quatre langues, code de
production versionné. Ce qui manque est une **déclaration de licence des
produits Atmart eux-mêmes** (voir §3).

L'intérêt n'est pas le label : c'est que ce registre est **regardé par les
bailleurs** (agences de coopération, fondations, organisations onusiennes)
quand ils cherchent où mettre de l'argent.

*À vérifier avant de s'engager : les critères exacts et la procédure, sur le
site de la DPGA. Je ne les ai pas lus aujourd'hui.*

### D. Réduire le coût plutôt qu'augmenter le revenu

Deux pistes concrètes, à vérifier :

- **hébergement sponsorisé pour données ouvertes** — plusieurs fournisseurs
  d'infrastructure ont des programmes de parrainage pour jeux de données
  publics ; cela concerne directement les couches lourdes (rasters, grilles)
  que GitHub Pages ne peut pas servir ;
- **calcul offert pour la recherche et l'humanitaire** — pour le traitement
  des rasters (WorldCover, CHIRPS, Open Buildings), qui est le seul poste
  vraiment coûteux du pipeline.

### E. Financements dédiés aux données ouvertes

Familles d'organisations qui financent ce type de travail — **à vérifier une
par une, je ne les ai pas contactées** : agences de coopération bilatérale
(francophones notamment, pour un produit en français et en kreyòl), fondations
travaillant sur la transparence et la gouvernance, programmes de données pour
le développement des banques multilatérales, organisations onusiennes
présentes en Haïti dont les besoins territoriaux recoupent vos couches.

L'argument est fort et rare : **une plateforme territoriale déjà en ligne,
déjà documentée, déjà multilingue, tenue par une équipe haïtienne.** Ce n'est
pas un projet à financer, c'est un actif à étendre.

### F. Ce que je ne recommande pas maintenant

- **Le mur payant partiel** (« les 3 premières communes gratuites ») : il
  détruirait la raison d'être sans rapporter beaucoup.
- **L'API à quotas payants** : elle impose un serveur, donc des comptes, de
  l'exploitation et de la maintenance — l'inverse de l'architecture statique
  qui rend l'Explorateur robuste et presque gratuit à faire tourner.
- **La publicité** : elle contredirait la promesse « aucun traceur
  publicitaire » qui est aujourd'hui un argument de confiance.

---

## 3. Ce qu'il faut changer sur le site

Par ordre d'importance, et aucun n'est lourd :

1. **Déclarer la licence des produits Atmart.** C'est le préalable à tout le
   reste — et notamment au statut de bien public. Recommandation :
   **CC BY 4.0** pour les indicateurs et agrégats produits par Atmart, avec
   mention des licences amont (ODbL pour ce qui dérive d'OSM). À afficher sur
   la page Confiance et dans chaque export.
2. **Retirer du catalogue les cinq produits payants de données**, et garder
   les services. Le Pack Géo, le classeur des 140 profils, les modèles Power
   BI et QGIS : à basculer en téléchargement libre, ou en « contribution
   libre » si vous voulez garder une porte.
3. **Remonter le parrainage** en tête du parcours.
4. **Réécrire la page Solutions** autour du service et non de la licence de
   données — six licences de réutilisation n'ont plus d'objet si tout est
   ouvert.
5. **Ajouter une page « Soutenir »** : parrainer un jeu, financer une couche,
   contribuer au signalement d'erreurs.

---

## 4. Ce que cela change pour la mission technique

Le tri P1/P2/P3 se refait, et il est plus favorable :

- passent en **P1** : HydroATLAS, IBTrACS, et toutes les sources dont la
  seule réserve portait sur le commerce ;
- restent en **P2** : celles dont la licence n'a pas encore été **lue**
  (Global Solar Atlas, IATI, Banque mondiale projets) — l'incertitude porte
  sur le fait, pas sur le droit ;
- restent en **P3** : LAPOP et les enquêtes sous convention, dont la
  restriction porte sur la **redistribution des fichiers** et non sur l'usage
  commercial. Elle survit au pivot.

La règle des niveaux géographiques, elle, ne change pas d'un iota : gratuit ou
payant, on ne communalise pas une enquête nationale.
