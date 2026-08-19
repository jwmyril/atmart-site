# Population — trois sources confrontées

*Fiche de documentation — modèle « Datasheets for Datasets » (Gebru et al.), version Aether Transparency Working Group, adaptée par Atmart Data aux agrégats territoriaux.*

> **Cette fiche est GÉNÉRÉE depuis le fichier publié.** Les chiffres de complétude sont recomptés à chaque exécution, jamais recopiés d'une note. Une fiche qui vieillit mal est pire qu'une absence de fiche.

---

## 1. Bases : contact, diffusion, accès

| | |
|---|---|
| Nom du jeu | Population — trois sources confrontées |
| Fichier | `atmart_population_trois_sources.json` |
| Millésime | voir « source » |
| Responsable | Atmart Data — myriljeanwisner@gmail.com |
| Qui peut y accéder | tout le monde, sans compte |
| Comment | https://explorateur.atmart.ltd/data/atmart_population_trois_sources.json |

## 2. Contenu

- **Ce que représente chaque entrée** : une commune.
- **Nombre d'entrées** : 140.
- **Source d'origine** : IHSI 2024 · UNFPA/OCHA COD-PS 2024 · WorldPop 2020

## 3. Complétude — MESURÉE, pas déclarée

| | |
|---|---|
| Entrées portant une mesure | **139 sur 140** (99 %) |
| Critère de comptage | champ « i » non vide |

**1 entrée(s) sans mesure.** Ce ne sont pas des zéros : la source ne les couvre pas. Toute lecture qui les traiterait comme des zéros serait fausse — et c'est l'erreur la plus fréquente sur ce genre de jeu.

## 4. Concordance avec d'autres sources

Ce jeu est **confrontable** : une autre source mesure le même objet par une méthode différente. Résultat de la confrontation, sur les 140 communes :

| État | Communes |
|---|---|
| concordant | 99 |
| ecart_modere | 37 |
| desaccord | 4 |


## 5. Usages prévus, et usages inappropriés

**Prévu** : situer un territoire, comparer des communes, préparer un diagnostic, alimenter un rapport en citant la source et le millésime.

**Inapproprié** :
- traiter une absence comme un zéro ;
- comparer deux communes documentées par des millésimes différents sans le dire ;
- en tirer une conclusion sur des personnes : ce jeu est un agrégat territorial et ne descend jamais à l'individu.

## 6. Qualité des données — ce que le producteur signale

- Trois méthodes, trois chiffres. On ne les moyenne pas et on n'en supprime aucun : un écart important signale un endroit où les méthodes ne s'accordent pas, ce qui mérite d'être su.

## 7. Ce que ce jeu NE PERMET PAS de conclure

Section ajoutée par Atmart : elle n'existe pas dans le modèle d'origine, et c'est celle qu'aucun producteur ne remplit spontanément.

- Trois estimations ne font pas un recensement. Haïti n'en a pas conduit depuis 2003 ; toute valeur récente est une estimation.
- Un désaccord entre sources ne désigne pas la source fautive.

## 8. Vie privée

**Aucune donnée personnelle.** Ce jeu est un agrégat par commune ; aucune personne n'y est identifiable, directement ou indirectement, et aucun seuil de diffusion n'est requis. Les questions 24 à 27 du modèle Aether (consentement, données sensibles, analyse d'impact) sont donc **sans objet** — et non « non renseignées ».

## 9. Passeport juridique

| | |
|---|---|
| Passeport | PSP-044 |
| Producteur | IHSI — Institut haïtien de statistique et d'informatique |
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
