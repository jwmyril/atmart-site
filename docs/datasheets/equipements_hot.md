# Équipements santé et écoles cartographiés (OpenStreetMap)

*Fiche de documentation — modèle « Datasheets for Datasets » (Gebru et al.), version Aether Transparency Working Group, adaptée par Atmart Data aux agrégats territoriaux.*

> **Cette fiche est GÉNÉRÉE depuis le fichier publié.** Les chiffres de complétude sont recomptés à chaque exécution, jamais recopiés d'une note. Une fiche qui vieillit mal est pire qu'une absence de fiche.

---

## 1. Bases : contact, diffusion, accès

| | |
|---|---|
| Nom du jeu | Équipements santé et écoles cartographiés (OpenStreetMap) |
| Fichier | `atmart_equipements_hot.json` |
| Millésime | voir « source » |
| Responsable | Atmart Data — jeanmyril@atmart.ltd |
| Qui peut y accéder | tout le monde, sans compte |
| Comment | https://explorateur.atmart.ltd/data/atmart_equipements_hot.json |

## 2. Contenu

- **Ce que représente chaque entrée** : une commune.
- **Nombre d'entrées** : 140.
- **Source d'origine** : OpenStreetMap, extrait Humanitarian OpenStreetMap Team du 6 août 2026

## 3. Complétude — MESURÉE, pas déclarée

| | |
|---|---|
| Entrées portant une mesure | **139 sur 140** (99 %) |
| Critère de comptage | champ « s » non vide |

**1 entrée(s) sans mesure.** Ce ne sont pas des zéros : la source ne les couvre pas. Toute lecture qui les traiterait comme des zéros serait fausse — et c'est l'erreur la plus fréquente sur ce genre de jeu.

## 4. Concordance avec d'autres sources

Ce jeu est **confrontable** : une autre source mesure le même objet par une méthode différente. Résultat de la confrontation, sur les 140 communes :

| État | Communes |
|---|---|
| concordant | 67 |
| ecart_modere | 51 |
| desaccord | 20 |
| invérifiable | 2 |


## 5. Usages prévus, et usages inappropriés

**Prévu** : situer un territoire, comparer des communes, préparer un diagnostic, alimenter un rapport en citant la source et le millésime.

**Inapproprié** :
- traiter une absence comme un zéro ;
- comparer deux communes documentées par des millésimes différents sans le dire ;
- en tirer une conclusion sur des personnes : ce jeu est un agrégat territorial et ne descend jamais à l'individu.

## 6. Qualité des données — ce que le producteur signale

- OpenStreetMap est une base contributive : sa couverture suit les cartographes, pas le terrain. Une commune peu cartographiée paraît sous-équipée — c'est un défaut de la carte, pas du territoire.

## 7. Ce que ce jeu NE PERMET PAS de conclure

Section ajoutée par Atmart : elle n'existe pas dans le modèle d'origine, et c'est celle qu'aucun producteur ne remplit spontanément.

- Le nombre d'établissements ne dit rien de leur **capacité**, de leur personnel, ni de leurs heures d'ouverture.
- Un établissement **déclaré** peut être fermé ; un établissement **cartographié** peut être un cabinet privé fermé depuis des années.
- Aucune conclusion sur l'accès : deux communes à cinq établissements n'ont pas le même accès si l'une est montagneuse.

## 8. Vie privée

**Aucune donnée personnelle.** Ce jeu est un agrégat par commune ; aucune personne n'y est identifiable, directement ou indirectement, et aucun seuil de diffusion n'est requis. Les questions 24 à 27 du modèle Aether (consentement, données sensibles, analyse d'impact) sont donc **sans objet** — et non « non renseignées ».

## 9. Passeport juridique

| | |
|---|---|
| Passeport | PSP-024 |
| Producteur | OpenStreetMap Contributors |
| Licence | ODbL 1.0 |
| Statut juridique | OUVERTE_AVEC_PARTAGE_IDENTIQUE |
| Redistribution | Oui |
| Usage commercial | Oui |
| Publiable librement | OUI |
| Utilisable en prestation payante | OUI — sous ODbL |
| Vérifié par / le | WebFetch page Geofabrik 17/08/2026 — 2026-08-17 |

## 10. Sections du modèle Aether sans objet ici, et pourquoi

| Question du modèle | Pourquoi elle ne s'applique pas |
|---|---|
| Découpages entraînement / validation / test | ce jeu n'entraîne aucun modèle ; il décrit un territoire |
| Groupes démographiques et leur répartition | agrégat territorial, aucune personne, aucune variable démographique individuelle |
| Consentement des personnes concernées | aucune personne concernée |

---

*Fiche générée le 18/08/2026 par `build_datasheets.py`. Pour la mettre à jour : relancer le script — elle se recalcule sur le fichier publié.*
