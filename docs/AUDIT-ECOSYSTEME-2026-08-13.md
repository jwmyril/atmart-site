# Audit de l'écosystème Atmart Data — 13 août 2026

**Étape 0 du chantier « utilisabilité et conversion ».** Cet audit est établi
avant toute implémentation, conformément à la commande. Il porte sur les six
pages de l'écosystème mesurées **en production** sur `https://atmart.ltd`.

Tout ce qui suit est mesuré, pas estimé. La méthode est en fin de document, et
le script de mesure est reproductible. Là où je n'ai pas pu mesurer, je l'écris.

---

## 1. Ce que l'audit établit en une page

L'écosystème est **techniquement sain et commercialement muet**.

Sain : aucun débordement horizontal sur sept largeurs d'écran, aucune erreur de
console, aucune requête en échec, aucune image sans alternative textuelle, un
seul `h1` par page, des descriptions présentes partout. Le socle n'est pas à
refaire.

Muet : sur six pages, **aucune ne demande une action mesurable**. Les trois
formulaires existants n'envoient rien — ils ouvrent le logiciel de messagerie du
visiteur. Un visiteur sur téléphone sans messagerie configurée n'a **aucun
moyen** de contacter Atmart. C'est le point de perte le plus coûteux du site, et
c'est aussi le moins cher à corriger.

Et trois défauts de fond, qui ne se voient pas mais qui se paient :

1. **Dix-sept comptes écrits à la main contredisent les fichiers publiés.** Le
   catalogue annonce « 1 554 valeurs » et « 21 indicateurs » ; les fichiers en
   portent 2 949 et 32. Un client qui télécharge et compte constate un écart
   du simple au double. Sur un produit dont l'argument est la rigueur, c'est le
   défaut le plus grave de la liste.
2. **L'Explorateur est verrouillé en français** alors que neuf autres pages
   suivent la langue du navigateur. Un visiteur anglophone traverse un site en
   anglais et arrive sur un outil en français.
3. **Aucune donnée structurée, aucun canonique sur cinq pages sur six.** Le site
   est invisible pour les moteurs sur les requêtes qui comptent.

---

## 2. Mesures brutes

Relevé du 13 août 2026, production, Chrome, sept largeurs (320 → 1440 px).

| Page | Mots | Cibles < 24 px | `th` sans `scope` | Formul. | `mailto:` | Canonique | JSON-LD | Requêtes |
|---|---|---|---|---|---|---|---|---|
| `donnees.html` | 1 593 | 15 / 85 | 4 / 4 | 0 | 2 | **non** | 0 | 13 |
| `datasets.html` | 1 222 | 17 / 92 | 3 / 3 | 0 | 4 | **non** | 0 | 12 |
| `donnees-solutions.html` | 1 456 | 14 / 76 | 8 / 8 | 1 | 3 | **non** | 0 | 14 |
| `donnees-campus.html` | 1 041 | 11 / 72 | 6 / 6 | 1 | 2 | **non** | 0 | 14 |
| `donnees-parrainage.html` | 1 074 | 10 / 70 | 8 / 8 | 1 | 3 | **non** | 0 | 14 |
| `donnees-explorateur.html` | 1 155 | 17 / 381 | 0 / 42 | 0 | 3 | oui | 0 | 18 |

**Uniformément conformes** sur les six pages : débordement horizontal nul aux
sept largeurs · 0 erreur de console · 0 requête en échec · 0 image sans `alt` ·
0 champ de formulaire sans étiquette · 1 `h1` · description entre 183 et
218 caractères · 7 liens externes.

**Uniformément absents** : `hreflang` (0 partout), JSON-LD (0 partout).

L'Explorateur est le seul à traiter ses tableaux correctement (42 `th`, tous avec
`scope`). Les cinq autres pages cumulent **29 `th` sans `scope`** : au lecteur
d'écran, ces tableaux sont des grilles de mots sans en-tête.

### Vérification commerciale

| Point | Constat |
|---|---|
| Lien de paiement Payhip | `https://payhip.com/b/Ufn2x` répond **200** |
| Cohérence du prix | **29 $ des deux côtés** — catalogue et fiche produit. Conforme |
| Formulation | La fiche annonce « paiement unique · téléchargement immédiat » **et** propose MonCash, qui est manuel. Les deux promesses ne tiennent pas ensemble |
| Produits « disponibles » | À vérifier livrable par livrable — non fait à ce stade, inscrit en P0-4 |

### Vérification linguistique

Seul `donnees-explorateur.html` déclare `ATM_LANGUES = ["fr"]`. Les neuf autres
pages de données suivent la langue du navigateur. Les dictionnaires couvrent
**les 143 clés du catalogue en `en`, `ht`, `es`**.

Un seul bloc français subsiste dans le rendu anglais de `datasets.html`, sur 76
blocs traduits : « Année 1 : Haïti exclusivement… », qui n'a pas d'attribut
`data-i18n`. Défaut réel mais circonscrit.

---

## 3. Matrice par page

Les onze champs demandés, page par page.

### 3.1 `donnees.html` — la porte d'entrée

| | |
|---|---|
| **Objectif principal** | Faire comprendre en trente secondes ce qu'est Atmart Data et ouvrir l'Explorateur |
| **Public cible** | Visiteur non qualifié : journaliste, ONG, étudiant, bailleur |
| **Action attendue** | Ouvrir l'Explorateur, ou identifier le produit qui le concerne |
| **Contenu existant** | 1 593 mots, 9 `h2`, page la plus longue de l'écosystème |
| **Friction constatée** | Page la plus lourde en texte et la plus pauvre en décision : aucun parcours par besoin, aucune démonstration visible avant le clic. 4 `th` sans `scope`. 15 cibles sous 24 px |
| **Recommandation** | Trois entrées par besoin (« je cherche un chiffre », « j'ai besoin d'un jeu de données », « je veux une étude ») + un aperçu réel de l'Explorateur au-dessus de la ligne de flottaison |
| **Priorité** | P1 |
| **Effort** | Moyen — une demi-journée |
| **Dépendance** | Aucune |
| **Critère d'acceptation** | Chaque entrée mène à une page distincte ; le taux d'ouverture de l'Explorateur depuis l'accueil est mesuré |

### 3.2 `datasets.html` — le catalogue

| | |
|---|---|
| **Objectif principal** | Convertir en téléchargement gratuit ou en achat |
| **Public cible** | Utilisateur qualifié, cherchant un fichier précis |
| **Action attendue** | Télécharger, ou acheter à 29 $ |
| **Contenu existant** | 3 rayons (gratuit / payant / parrainable), 4 `mailto:` |
| **Friction constatée** | **Cinq comptes faux** : « 1 554 valeurs » (2 949), « 21 indicateurs » (32), « 217 valeurs » (2 949), et deux autres. Aucun exemple de livrable avant l'achat. Le rayon parrainable ne dit pas ce qu'on obtient ni quand. 17 cibles sous 24 px, le maximum de l'écosystème |
| **Recommandation** | Brancher les comptes sur le manifeste ; publier un extrait de chaque produit payant ; expliciter la contrepartie du parrainage |
| **Priorité** | **P0** pour les comptes, P1 pour les extraits |
| **Effort** | Faible pour les comptes (mécanisme déjà écrit), moyen pour les extraits |
| **Dépendance** | `data/catalogue_manifest.json` — **livré ce jour** |
| **Critère d'acceptation** | `python build_manifest.py --verifier` sort en 0 |

### 3.3 `donnees-solutions.html` — l'offre sur mesure

| | |
|---|---|
| **Objectif principal** | Obtenir une demande qualifiée |
| **Public cible** | ONG, institution, bailleur — décideur avec budget |
| **Action attendue** | Envoyer une demande |
| **Contenu existant** | 1 456 mots, 10 `h2`, **1 formulaire `mailto:`**, 3 liens `mailto:` |
| **Friction constatée** | **Le formulaire n'envoie rien.** Il ouvre le client de messagerie ; sans messagerie configurée — cas courant sur mobile — la demande est perdue sans que le visiteur ni Atmart le sachent. Aucun prix, aucun délai, aucun exemple de rendu. 8 `th` sans `scope`, le maximum |
| **Recommandation** | Formulaire réel avec accusé de réception ; fourchettes de prix et délais ; un livrable d'exemple téléchargeable |
| **Priorité** | **P0** pour le formulaire, P1 pour les prix |
| **Effort** | Moyen — dépend du choix du service |
| **Dépendance** | **Décision Atmart** : service de formulaire, et fourchettes de prix communicables |
| **Critère d'acceptation** | Un envoi de test arrive dans la boîte Atmart et déclenche un accusé au visiteur |

### 3.4 `donnees-campus.html` — l'offre académique

| | |
|---|---|
| **Objectif principal** | Faire adopter Atmart Data par une université |
| **Public cible** | Enseignant, responsable de département, étudiant |
| **Action attendue** | Demander un accès de classe |
| **Contenu existant** | 1 041 mots — la page la plus courte, 1 formulaire `mailto:` |
| **Friction constatée** | Même défaut de formulaire. Aucun matériel pédagogique concret : ni exercice, ni jeu de données d'exemple, ni support. Un enseignant ne peut rien tester avant de demander |
| **Recommandation** | Formulaire réel ; un exercice complet téléchargeable immédiatement, sans demande préalable |
| **Priorité** | **P0** formulaire, P2 matériel |
| **Effort** | Faible pour le formulaire, moyen pour l'exercice |
| **Dépendance** | Même décision de service |
| **Critère d'acceptation** | Idem 3.3 ; l'exercice est téléchargeable sans formulaire |

### 3.5 `donnees-parrainage.html` — le financement

| | |
|---|---|
| **Objectif principal** | Faire financer la production d'un jeu de données |
| **Public cible** | Bailleur, entreprise, institution |
| **Action attendue** | Manifester un intérêt de parrainage |
| **Contenu existant** | 1 074 mots, 1 formulaire `mailto:`, 8 `th` sans `scope` |
| **Friction constatée** | Même défaut de formulaire. Le mécanisme est expliqué, **la contrepartie ne l'est pas** : ni montant, ni délai, ni visibilité obtenue, ni ce qui advient si le financement n'est pas atteint |
| **Recommandation** | Formulaire réel ; grille de contreparties explicite ; règle claire en cas de non-financement |
| **Priorité** | **P0** formulaire, P1 contreparties |
| **Effort** | Faible / moyen |
| **Dépendance** | **Décision Atmart sur les montants** — je ne peux pas les inventer |
| **Critère d'acceptation** | Idem ; chaque parrainage affiche montant, délai et contrepartie |

### 3.6 `donnees-explorateur.html` — le produit

> **Correction du 13 août.** Le constat ci-dessous parle d'un verrouillage
> « alors que le reste du site suit le navigateur ». C'était une lecture fautive
> de ma part : j'avais lu `ATM_LANGUES = ["fr"]` sans lire le commentaire qui le
> précède de trois lignes. Il s'agit d'une **décision datée du 10/08/2026** —
> *« le français seul pendant la finalisation de l'Explorateur ; les traductions
> reviendront d'un bloc, jamais de page à moitié traduite »*. Le parcours
> anglophone est d'ailleurs cohérent : depuis une page en anglais, le lien mène
> à `/en/donnees-explorateur.html`, qui explique la situation en anglais.
> Mesure faite depuis : les 95 clés de la page et les clés du moteur sont
> couvertes à 100 % en `en`, `es` et `ht`. La condition technique de levée est
> donc atteinte ; la décision reste à Atmart, et le kreyòl est marqué provisoire
> tant qu'il n'a pas été relu.

| | |
|---|---|
| **Objectif principal** | Démontrer la valeur en donnant un chiffre utile immédiatement |
| **Public cible** | Tous |
| **Action attendue** | Consulter, exporter, puis passer à une offre |
| **Contenu existant** | 381 cibles interactives, 42 `th` tous avec `scope`, seul canonique du site |
| **Friction constatée** | **Verrouillé en `fr`** alors que le reste du site suit le navigateur. 17 cibles sous 24 px sur 381 — proportion la meilleure du site, mais concentrées sur les filtres. Aucun JSON-LD sur l'outil qui est pourtant l'actif référençable |
| **Recommandation** | Ouvrir les langues quand la couverture des clés de l'Explorateur est complète — **et pas avant** : une traduction partielle est pire que le français assumé. `Dataset` JSON-LD |
| **Priorité** | P1 langues, P2 JSON-LD |
| **Effort** | Élevé pour les langues (volume de clés à vérifier) |
| **Dépendance** | Audit de couverture des clés de l'Explorateur — **non fait**, à mener avant tout déverrouillage |
| **Critère d'acceptation** | Un test échoue si une clé de l'Explorateur manque dans une langue activée |

---

## 4. Parcours

**Aujourd'hui.** Accueil → catalogue → *impasse*. Le visiteur qui veut acheter
clique sur Payhip et sort du site. Le visiteur qui veut parler à quelqu'un
tombe sur un formulaire qui ouvre sa messagerie — s'il en a une. Il n'existe
aucun point où Atmart apprend qu'une demande a existé.

**Cible.** Accueil → entrée par besoin → démonstration réelle (l'Explorateur) →
demande captée par un formulaire qui répond → relance possible parce que la
demande a laissé une trace.

La différence entre les deux n'est pas graphique. Elle tient à un point unique :
**une demande doit laisser une trace côté Atmart.** Tout le reste en découle.

---

## 5. Sauvegarde et livraison

| Point de la commande | État |
|---|---|
| Sauvegarde de la version précédente | Assurée par git — chaque page est versionnée, retour possible par `git revert` |
| Validation des données | `build_manifest.py --verifier` — **écrit ce jour** |
| Tests fonctionnels | 87 assertions, `tests/explorateur-tests.html` |
| Tests mobiles | 7 largeurs mesurées — 0 débordement |
| Contrôle des liens | 7 liens externes par page ; Payhip vérifié à 200 |
| Contrôle des formulaires | **Fait — et c'est le défaut principal**, cf. P0-2 |
| Vérification des traductions | 143/143 clés du catalogue en `en`/`ht`/`es` ; 1 bloc sans clé |
| Validation humaine finale | **Non obtenue — aucun déploiement n'a eu lieu** |

---

## 6. Backlog

### P0 — bloquant

| Réf. | Action | État | Dépendance |
|---|---|---|---|
| **P0-1** | Comptes calculés : `catalogue_manifest.json`, écriture `--ecrire`, contrôle bloquant `--verifier` | **Fait** — 45 repères `data-mf` dans 4 pages et 3 langues ; `--verifier` sort en 0 | aucune |
| **P0-2** | Remplacer les 3 formulaires `mailto:` par un envoi réel | **Fait** — composant `assets/formulaire.js`, panneau de retour à 3 états, message copiable sans messagerie. L'envoi automatique s'active en renseignant `ENDPOINT` | **il reste à choisir le service de réception** |
| **P0-3** | Lever la contradiction « téléchargement immédiat » / MonCash manuel | **Fait** — le téléchargement immédiat est rattaché à la carte et à PayPal ; MonCash annonce 24 h, l'engagement qu'Atmart tient déjà sur Entèvyou360 | aucune |
| **P0-4** | Vérifier que chaque produit annoncé disponible a un livrable réel | **Fait** — 16 fichiers servis, 7 produits, 6 composants du pack payant : tout conforme. Figé par `verif_livrables.py` | aucune |
| **P0-5** | Décider de la langue de l'Explorateur | **Mesuré ; la décision reste à Atmart.** Ce n'était pas un défaut : une décision datée du 10/08/2026 met le multilingue en pause. Couverture portée à 100 % dans les 3 langues | relecture du kreyòl |

> **Addendum du 13 août, après implémentation de P0-1.** Le branchement a fait
> apparaître deux défauts que l'audit initial n'avait pas vus, parce qu'ils
> n'étaient pas visibles en français :
>
> 1. **Les mêmes chiffres faux vivaient aussi dans `en/es/ht.json`.** Corriger
>    le HTML seul aurait laissé « 1,554 » en anglais. Les repères sont donc
>    posés dans les quatre langues, et le contrôle compare chaque traduction au
>    **français, clef par clef** — comparer les traductions entre elles ne sert
>    à rien quand elles sont toutes fausses au même endroit, ce qui était le cas
>    pour `ds.c16_p`.
> 2. **La matrice juridique annonçait « 7 + 6 + 8 + 1 » — soit 22 sources pour
>    un registre qui en compte 23.** L'entrée de SRC-023 en classe C n'avait pas
>    été répercutée. La classe C est à 9, pas à 8. Ce compte était hors du
>    balayage initial : il ne contient pas le mot « sources ».
>
> Ces deux défauts confirment le diagnostic plutôt qu'ils ne le contredisent :
> un compte écrit à la main se périme sans bruit, et il se périme d'abord là
> où personne ne regarde.

> **Correction du 14 août — deux constats de cet audit étaient faux.**
>
> J'avais écrit que Solutions n'affichait « aucun prix, aucun délai » et que la
> contrepartie du Parrainage n'était pas explicitée. Les deux sont inexacts, et
> je les avais déduits des résumés de cartes au lieu de lire les pages.
>
> **Solutions** porte un tableau de six offres avec leurs fourchettes —
> 250–900 $, 400–1 200 $, 600–1 500 $ — la question à laquelle chacune répond
> et ce qui est livré. Les délais de 15 et 30 jours y figurent aussi.
>
> **Parrainage** porte une grille de cinq formules avec leur ordre de
> contribution (de « à partir de 500 $ » à « à partir de 10 000 $ »), une
> section « ce que le parrain reçoit » — mention permanente, rapport annuel
> d'usage, liste des travaux — et surtout une section « ce qu'il n'achète
> pas » : ni le contenu des conclusions, ni un droit de veto, ni l'exclusivité
> sur une donnée ouverte. C'est mieux traité que ce que je recommandais.
>
> **Un seul manque subsiste, et c'est une décision** : rien ne dit ce qu'il
> advient si un parrainage n'atteint pas son montant. Ni remboursement, ni
> report, ni ouverture partielle. Zéro mention sur la page.

### P1

`th scope` sur les 29 en-têtes des cinq pages · cibles portées à 24 px · trois
entrées par besoin sur l'accueil · extraits de livrables · fourchettes de prix
et de délais · grille de contreparties du parrainage · migration du catalogue
produits en données (**P1-CAT** — supprime la dernière lecture de HTML du
manifeste).

### P2

Canoniques sur les cinq pages · JSON-LD `Dataset` et `Organization` ·
`hreflang` · mesure d'usage · matériel pédagogique Campus · appels à l'action
contextuels dans l'Explorateur.

### P3

Produits intermédiaires · abonnements · SEO par besoin · études de cas — aucune
avant d'avoir un client réel à citer, **et son accord écrit**.

---

## 7. Ce que cet audit n'établit pas

Par honnêteté sur la portée :

- **Aucune mesure de trafic réel.** Pas d'outil de mesure installé ; tout ce qui
  concerne les taux de conversion est une hypothèse, pas un constat.
- **Les livrables des produits payants n'ont pas été ouverts un par un** (P0-4).
- **La couverture des clés de traduction de l'Explorateur n'a pas été auditée** —
  seul le catalogue l'a été. C'est pourquoi je ne recommande pas d'ouvrir les
  langues de l'Explorateur aujourd'hui.
- **Aucun test utilisateur.** Les frictions listées sont déduites de la structure
  des pages, pas observées sur des visiteurs.

---

## 8. Méthode

Mesure automatisée sur `https://atmart.ltd` via Chrome DevTools Protocol :
sept largeurs par page, relevé du débordement, de la console, des requêtes en
échec, des cibles interactives, des en-têtes de tableau, des métadonnées et des
formulaires. Comptes de données recalculés depuis les CSV publiés par
`build_manifest.py`. Lien de paiement vérifié par requête HTTP.

Le script de mesure et le script de manifeste sont conservés : l'audit est
reproductible, et ses chiffres seront réfutables par quiconque le relance.

---

*Audit établi le 13 août 2026. Aucune modification de production n'a été
effectuée. Le déploiement attend la validation humaine finale.*
