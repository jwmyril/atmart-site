# Écoles déclarées au MENFP, confrontées à OpenStreetMap

*Fiche de documentation — modèle « Datasheets for Datasets » (Gebru et al.), version Aether Transparency Working Group, adaptée par Atmart Data aux agrégats territoriaux.*

> **Cette fiche est GÉNÉRÉE depuis le fichier publié.** Les chiffres de complétude sont recomptés à chaque exécution, jamais recopiés d'une note. Une fiche qui vieillit mal est pire qu'une absence de fiche.

---

## 1. Bases : contact, diffusion, accès

| | |
|---|---|
| Nom du jeu | Écoles déclarées au ministère, confrontées aux écoles cartographiées |
| Fichier | `atmart_ecoles_declarees.json` |
| Millésime | 2024-2025 |
| Responsable | Atmart Data — myriljeanwisner@gmail.com |
| Qui peut y accéder | tout le monde, sans compte |
| Comment | https://explorateur.atmart.ltd/data/atmart_ecoles_declarees.json |

## 2. Contenu

- **Ce que représente chaque entrée** : une commune.
- **Nombre d'entrées** : 140.
- **Source d'origine** : MENFP — Direction de la planification et de la coopération externe (DPCE) (registres déclarés) ; OpenStreetMap — extrait HOT du 6 août 2026 (écoles vues)

## 3. Complétude — MESURÉE, pas déclarée

| | |
|---|---|
| Entrées portant une mesure | **140 sur 140** (100 %) |
| Critère de comptage | champ « t » non vide |

Toutes les entrées portent une mesure. **Cela ne veut pas dire que les valeurs sont justes** : la complétude mesure la présence d'un chiffre, jamais sa justesse. Voir la section 4.

## 4. Concordance avec d'autres sources

Ce jeu est **confrontable** : une autre source mesure le même objet par une méthode différente. Résultat de la confrontation, sur les 140 communes :

| État | Communes |
|---|---|
| concordant | 19 |
| ecart_modere | 33 |
| desaccord | 80 |
| invérifiable | 8 |

**Plus de trois entrées sur dix sont en fort désaccord avec l'autre source.** Ce jeu ne doit pas être employé seul pour une décision : la confrontation fait partie de la lecture.

## 5. Usages prévus, et usages inappropriés

**Prévu** : situer un territoire, comparer des communes, préparer un diagnostic, alimenter un rapport en citant la source et le millésime.

**Inapproprié** :
- traiter une absence comme un zéro ;
- comparer deux communes documentées par des millésimes différents sans le dire ;
- en tirer une conclusion sur des personnes : ce jeu est un agrégat territorial et ne descend jamais à l'individu.

## 6. Qualité des données — ce que le producteur signale

- Registre = ce qui est DÉCLARÉ au ministère, pas ce qui est vu sur le terrain. Une école fermée mais non radiée y figure ; une école jamais recensée n'y figure pas.
- Comptage = codes CIE DISTINCTS. Des blocs de pages entières sont matériellement répétés dans certains registres ; 643 lignes d'établissement en double ont été écartées. Les deux cas les plus lourds : Artibonite pages 52 à 70 du PDF (257 lignes reprises des pages 47 à 52) et Nord pages 106 à 110 (66 lignes de Cap-Haïtien et de Limonade réimprimées au milieu de Ranquitte). La colonne controle porte le décompte commune par commune.
- Conséquence du point précédent : le nombre publié pour Ranquitte (Nord) ne repose que sur les lignes qui portent réellement son code. Si sa liste a été partiellement écrasée à l'impression, le registre ne permet pas de le savoir — on ne comble pas ce trou.
- Le secteur vient du 7e chiffre du CIE, porté par chaque ligne, et non de l'en-tête « SECTEUR PUBLIC / NON PUBLIC », absent ou erroné par endroits (132 lignes en divergence).
- page_pdf_debut est le numéro de page du PDF, qui ne coïncide pas avec le numéro imprimé en pied de page.
- Aucune donnée personnelle (téléphone, fondateur) n'est publiée.
- Aucune valeur départementale n'a été redescendue à la commune ; une commune absente du registre a un champ vide, jamais zéro.
- 6 entités du registre n'ont pas de correspondant dans le référentiel territorial (communes récentes ou non reprises par la couche CNIGS) : elles sont publiées sans atmart_geo_id plutôt qu'écartées.
- Déclaré et vu ne mesurent pas la même chose : le registre compte ce qui est inscrit au ministère, la carte compte ce qui a été relevé par un contributeur. Leur écart décrit l'état de l'information, pas le nombre réel d'écoles.
- Le comptage cartographié additionne école, collège et préscolaire ; il écarte l'université, absente du registre.
- Une commune sans chiffre déclaré n'est pas une commune sans école : elle est absente du registre extrait.

## 7. Ce que ce jeu NE PERMET PAS de conclure

Section ajoutée par Atmart : elle n'existe pas dans le modèle d'origine, et c'est celle qu'aucun producteur ne remplit spontanément.

- Le nombre d'écoles ne dit rien du **nombre d'élèves**, de la qualité, ni du niveau enseigné.
- L'écart entre déclaré et cartographié mesure l'état de la **cartographie**, pas le nombre réel d'écoles.

## 8. Vie privée

**Aucune donnée personnelle.** Ce jeu est un agrégat par commune ; aucune personne n'y est identifiable, directement ou indirectement, et aucun seuil de diffusion n'est requis. Les questions 24 à 27 du modèle Aether (consentement, données sensibles, analyse d'impact) sont donc **sans objet** — et non « non renseignées ».

## 9. Passeport juridique

| | |
|---|---|
| Passeport | PSP-043 |
| Producteur | MENFP / SIGEEE — Ministère de l'Éducation nationale |
| Licence | Décret du 12 octobre 2005 sur le droit d'auteur, art. 5 : les textes officiels administratifs et les « simples données » sont exclus de la protection |
| Statut juridique | OUVERTE_AVEC_ATTRIBUTION |
| Redistribution | Oui pour les données ; NON pour la mise en forme des rapports |
| Usage commercial | Oui — les faits ne sont pas appropriables |
| Publiable librement | OUI |
| Utilisable en prestation payante | OUI — les données ; pas la mise en forme |
| Vérifié par / le | Décret haïtien du 12/10/2005 (WIPO Lex), art. 5 — analysé le 17/08/2026 — 2026-08-17 |

## 10. Sections du modèle Aether sans objet ici, et pourquoi

| Question du modèle | Pourquoi elle ne s'applique pas |
|---|---|
| Découpages entraînement / validation / test | ce jeu n'entraîne aucun modèle ; il décrit un territoire |
| Groupes démographiques et leur répartition | agrégat territorial, aucune personne, aucune variable démographique individuelle |
| Consentement des personnes concernées | aucune personne concernée |

---

*Fiche générée le 18/08/2026 par `build_datasheets.py`. Pour la mettre à jour : relancer le script — elle se recalcule sur le fichier publié.*
