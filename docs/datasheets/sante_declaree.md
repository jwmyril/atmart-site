# Établissements de santé déclarés au MSPP

*Fiche de documentation — modèle « Datasheets for Datasets » (Gebru et al.), version Aether Transparency Working Group, adaptée par Atmart Data aux agrégats territoriaux.*

> **Cette fiche est GÉNÉRÉE depuis le fichier publié.** Les chiffres de complétude sont recomptés à chaque exécution, jamais recopiés d'une note. Une fiche qui vieillit mal est pire qu'une absence de fiche.

---

## 1. Bases : contact, diffusion, accès

| | |
|---|---|
| Nom du jeu | Établissements de santé déclarés au ministère, confrontés à ceux que la carte montre |
| Fichier | `atmart_sante_declaree.json` |
| Millésime | relevé du 17/08/2026 |
| Responsable | Atmart Data — jeanmyril@atmart.ltd |
| Qui peut y accéder | tout le monde, sans compte |
| Comment | https://explorateur.atmart.ltd/data/atmart_sante_declaree.json |

## 2. Contenu

- **Ce que représente chaque entrée** : une commune.
- **Nombre d'entrées** : 139.
- **Source d'origine** : MSPP — Carte sanitaire (cartesanitaire.sisnu.net, point d'entrée public de l'outil officiel) ; OpenStreetMap — extrait Humanitarian OpenStreetMap Team du 6 août 2026

## 3. Complétude — MESURÉE, pas déclarée

| | |
|---|---|
| Entrées portant une mesure | **139 sur 139** (100 %) |
| Critère de comptage | champ « t » non vide |

Toutes les entrées portent une mesure. **Cela ne veut pas dire que les valeurs sont justes** : la complétude mesure la présence d'un chiffre, jamais sa justesse. Voir la section 4.

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

- Registre = ce qui est DÉCLARÉ et enregistré au ministère, pas ce qui fonctionne. Un établissement fermé mais non radié y figure ; un dispensaire jamais enregistré n'y figure pas.
- La Carte sanitaire s'appuie sur l'évaluation de la prestation des services (EPSSS), conduite tous les cinq ans : entre deux campagnes, ouvertures et fermetures n'y entrent pas.
- Déclaré et vu ne mesurent pas la même chose. Leur écart décrit l'état de l'information sur un territoire, jamais le nombre réel d'établissements qui s'y trouvent.
- Le comptage cartographié additionne hôpital, clinique, centre de santé et dispensaire ; il écarte la pharmacie et le cabinet dentaire, que le registre ne recense pas de la même façon.
- Une commune absente du registre n'est pas une commune sans établissement : elle est absente du registre extrait.
- Aucun nom d'établissement n'est publié ici : le comptage suffit à la fiche, la liste nominative reste chez son producteur.

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
| Passeport | PSP-048 |
| Producteur | Ministère de la Santé publique et de la Population (MSPP) |
| Licence | Données publiques haïtiennes — décret du 12/10/2005, art. 5 (textes administratifs et simples données hors protection) |
| Statut juridique | OUVERTE_VALIDEE |
| Redistribution | Oui — hors protection |
| Usage commercial | Oui — hors protection |
| Publiable librement | OUI — registre public d'établissements de santé, publié par le ministère pour consultation |
| Utilisable en prestation payante | OUI — aucune restriction commerciale sur un registre administratif |
| Vérifié par / le | Atmart Data — 17/08/2026, décret du 12/10/2005 art. 5 — 2026-08-17 |

## 10. Sections du modèle Aether sans objet ici, et pourquoi

| Question du modèle | Pourquoi elle ne s'applique pas |
|---|---|
| Découpages entraînement / validation / test | ce jeu n'entraîne aucun modèle ; il décrit un territoire |
| Groupes démographiques et leur répartition | agrégat territorial, aucune personne, aucune variable démographique individuelle |
| Consentement des personnes concernées | aucune personne concernée |

---

*Fiche générée le 18/08/2026 par `build_datasheets.py`. Pour la mettre à jour : relancer le script — elle se recalcule sur le fichier publié.*
