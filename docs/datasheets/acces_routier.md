# Temps d'accès aux services par la route

*Fiche de documentation — modèle « Datasheets for Datasets » (Gebru et al.), version Aether Transparency Working Group, adaptée par Atmart Data aux agrégats territoriaux.*

> **Cette fiche est GÉNÉRÉE depuis le fichier publié.** Les chiffres de complétude sont recomptés à chaque exécution, jamais recopiés d'une note. Une fiche qui vieillit mal est pire qu'une absence de fiche.

---

## 1. Bases : contact, diffusion, accès

| | |
|---|---|
| Nom du jeu | Temps d'accès par la route, par commune |
| Fichier | `atmart_acces_routier.json` |
| Millésime | voir « source » |
| Responsable | Atmart Data — myriljeanwisner@gmail.com |
| Qui peut y accéder | tout le monde, sans compte |
| Comment | https://explorateur.atmart.ltd/data/atmart_acces_routier.json |

## 2. Contenu

- **Ce que représente chaque entrée** : une commune.
- **Nombre d'entrées** : 140.
- **Source d'origine** : OpenStreetMap — extrait Humanitarian OpenStreetMap Team du 6 août 2026 (routes, santé, écoles, points d'intérêt) ; marchés suivis : PAM via OCHA HDX, relevé du 13 août 2026

## 3. Complétude — MESURÉE, pas déclarée

| | |
|---|---|
| Entrées portant une mesure | **140 sur 140** (100 %) |
| Critère de comptage | toutes les entrées portent une mesure |

Toutes les entrées portent une mesure. **Cela ne veut pas dire que les valeurs sont justes** : la complétude mesure la présence d'un chiffre, jamais sa justesse. Voir la section 4.

## 4. Concordance avec d'autres sources

**Aucune autre source ne mesure le même objet** dans le périmètre d'Atmart. Ce jeu est donc INVÉRIFIABLE en l'état — ce qui n'est pas un défaut de qualité, mais une limite de ce qu'on peut affirmer. Une seconde source serait la première amélioration à chercher.

## 5. Usages prévus, et usages inappropriés

**Prévu** : situer un territoire, comparer des communes, préparer un diagnostic, alimenter un rapport en citant la source et le millésime.

**Inapproprié** :
- traiter une absence comme un zéro ;
- comparer deux communes documentées par des millésimes différents sans le dire ;
- en tirer une conclusion sur des personnes : ce jeu est un agrégat territorial et ne descend jamais à l'individu.

## 6. Qualité des données — ce que le producteur signale

- Temps en CONDITIONS NORMALES. L'état de la chaussée, la saison des pluies, les barrages routiers, les embouteillages et l'insécurité n'entrent PAS dans le calcul. Le chiffre est un plancher optimiste, jamais une prévision de trajet.
- Un établissement cartographié n'est pas un établissement fonctionnel : OSM enregistre un bâtiment vu, pas un service rendu. « L'hôpital est à 22 minutes » ne dit rien du personnel, des médicaments ni des horaires.
- OpenStreetMap est contributif : une commune peu cartographiée a peu de routes ET peu de destinations, ce qui allonge ses temps ou les rend incalculables. C'est un défaut de la carte, pas du territoire.
- Aucune liaison maritime n'entre dans le calcul. Les communes insulaires (La Tortue, Île à Vache, La Gonâve) n'ont pas de temps vers le continent — et ne doivent pas en avoir.
- Les sens uniques sont ignorés et le dernier tronçon jusqu'à la porte n'est pas compté : deux biais supplémentaires, tous deux dans le sens de l'optimisme.
- La famille « hôpital » suit l'étiquetage OSM, qui en Haïti range sous ce mot beaucoup de dispensaires et de centres de santé. Elle est plus large que le mot ne le suggère.
- Les coordonnées des marchés suivis par le PAM sont publiées au centième de degré, soit environ un kilomètre de précision.
- Le barème liste des classes rapides (autoroute, voie express) qui n'existent nulle part en Haïti : la vitesse la plus élevée réellement appliquée est celle des routes primaires.

## 7. Ce que ce jeu NE PERMET PAS de conclure

Section ajoutée par Atmart : elle n'existe pas dans le modèle d'origine, et c'est celle qu'aucun producteur ne remplit spontanément.

- Les valeurs décrivent un **état mesuré**, jamais une prévision.
- Aucune causalité ne se lit ici : deux grandeurs corrélées sur 140 communes ne se commandent pas l'une l'autre.

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
