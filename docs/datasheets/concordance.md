# Concordance des sources par commune

*Fiche de documentation — modèle « Datasheets for Datasets » (Gebru et al.), version Aether Transparency Working Group, adaptée par Atmart Data aux agrégats territoriaux.*

> **Cette fiche est GÉNÉRÉE depuis le fichier publié.** Les chiffres de complétude sont recomptés à chaque exécution, jamais recopiés d'une note. Une fiche qui vieillit mal est pire qu'une absence de fiche.

---

## 1. Bases : contact, diffusion, accès

| | |
|---|---|
| Nom du jeu | Concordance des sources, commune par commune |
| Fichier | `atmart_concordance.json` |
| Millésime | voir « source » |
| Responsable | Atmart Data — jeanmyril@atmart.ltd |
| Qui peut y accéder | tout le monde, sans compte |
| Comment | https://explorateur.atmart.ltd/data/atmart_concordance.json |

## 2. Contenu

- **Ce que représente chaque entrée** : une commune.
- **Nombre d'entrées** : 140.
- **Source d'origine** : MSPP et OpenStreetMap (santé) ; MENFP et OpenStreetMap (écoles) ; IHSI, UNFPA/OCHA et WorldPop (population)

## 3. Complétude — MESURÉE, pas déclarée

| | |
|---|---|
| Entrées portant une mesure | **140 sur 140** (100 %) |
| Critère de comptage | champ « n » non vide |

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

- CET INDICE NE NOTE PAS LES TERRITOIRES. Une commune en « fort désaccord » n'est pas une commune mal équipée : c'est une commune sur laquelle nos sources se contredisent. Il mesure l'état de l'information, jamais celui du terrain.
- Un désaccord ne dit pas QUELLE source se trompe. Sur Gressier, c'est la projection officielle qui est aberrante et le satellite qui s'accorde avec l'IHSI — l'inverse de ce qu'on supposerait.
- « Invérifiable » n'est pas « fiable » : c'est une famille où une seule source existe, donc où rien ne peut être confronté. C'est souvent plus inquiétant qu'un désaccord visible.
- Les seuils 1,5 et 3 sont un choix d'Atmart, publié pour être discuté : le produit détaillé permet de recalculer autrement.
- Aucune source n'est corrigée, aucune moyenne n'est faite : la moyenne d'un chiffre vrai et d'un chiffre faux est un troisième chiffre faux, avec l'autorité d'un calcul.

## 7. Ce que ce jeu NE PERMET PAS de conclure

Section ajoutée par Atmart : elle n'existe pas dans le modèle d'origine, et c'est celle qu'aucun producteur ne remplit spontanément.

- Les valeurs décrivent un **état mesuré**, jamais une prévision.
- Aucune causalité ne se lit ici : deux grandeurs corrélées sur 140 communes ne se commandent pas l'une l'autre.

## 8. Vie privée

**Aucune donnée personnelle.** Ce jeu est un agrégat par commune ; aucune personne n'y est identifiable, directement ou indirectement, et aucun seuil de diffusion n'est requis. Les questions 24 à 27 du modèle Aether (consentement, données sensibles, analyse d'impact) sont donc **sans objet** — et non « non renseignées ».

## 9. Passeport juridique

| | |
|---|---|
| Passeport | PSP-049 |
| Producteur | Atmart Data |
| Licence | CC BY 4.0 — attribution « Atmart Data, Explorateur Haïti » ; les sources confrontées gardent chacune leur propre licence |
| Statut juridique | OUVERTE_AVEC_ATTRIBUTION |
| Redistribution | Oui |
| Usage commercial | Oui |
| Publiable librement | OUI — production Atmart sur des sources ouvertes, aucune restriction héritée |
| Utilisable en prestation payante | OUI — c'est le socle de la prestation « Atmart Vérifié » |
| Vérifié par / le | Atmart Data — 18/08/2026, production propre sur sources ouvertes (MSPP décret 12/10/2005 art. 5, MENFP idem, OSM ODbL, IHSI, UNFPA CC BY-IGO, WorldPop CC BY 4.0) — 2026-08-18 |

## 10. Sections du modèle Aether sans objet ici, et pourquoi

| Question du modèle | Pourquoi elle ne s'applique pas |
|---|---|
| Découpages entraînement / validation / test | ce jeu n'entraîne aucun modèle ; il décrit un territoire |
| Groupes démographiques et leur répartition | agrégat territorial, aucune personne, aucune variable démographique individuelle |
| Consentement des personnes concernées | aucune personne concernée |

---

*Fiche générée le 18/08/2026 par `build_datasheets.py`. Pour la mettre à jour : relancer le script — elle se recalcule sur le fichier publié.*
