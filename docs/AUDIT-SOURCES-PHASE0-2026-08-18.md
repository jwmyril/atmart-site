# Audit des sources — Phase 0

**18 août 2026.** Livrables 1, 2 et 4 de la mission « intégrer les sources
manquantes ou incomplètes ». **Aucune intégration n'a été faite** : la mission
se termine par une instruction explicite — présenter la matrice et les verdicts
avant toute intégration, et ne publier qu'après validation des sources
juridiquement incertaines. Ce document prépare cette décision.

---

## 1. Les deux constats qui commandent tout le reste

### Huit sources alimentent le site sans passeport juridique

| Source | Ce qui est publié | Risque |
|---|---|---|
| **ACLED** | conflits, 12 derniers mois | **élevé** — usage commercial sous licence distincte |
| **OIM / DTM** | personnes déplacées | **élevé** — données sur des personnes déplacées |
| **UNFPA / OCHA COD-PS** | projections de population | **élevé** — c'est le dénominateur de la plupart des indicateurs |
| **OpenCelliD** | antennes mobiles | **élevé** — CC BY-SA, partage à l'identique non isolé |
| **IPC** | phases d'insécurité alimentaire | moyen — « CC0 » affirmé sans preuve archivée |
| **PAM (WFP)** | 14 140 relevés de prix | moyen — licence non archivée |
| **WPdx** | points d'eau | moyen — et la couche n'affiche aucune source |
| **MPCE / UCAONG** | 5 029 organisations | moyen — décret 12/10/2005 probable, non confirmé |

Une source sans passeport n'a **aucun verdict** : ni pour la publication
gratuite, ni pour une prestation. C'est le pire état possible parce qu'il est
invisible — la carte s'affiche, et rien ne dit qu'on ignore ce qu'on a le droit
d'en faire.

### Six couches n'affichent aucune source

`eau`, `carburant`, `finance`, `telecom`, `inondable`, `bassins`. Sur un
produit dont toute la valeur tient à ce que chaque chiffre porte sa
provenance, c'est une contradiction interne.

---

## 2. État de l'existant — mesuré, pas déclaré

51 sources inventoriées dans `source_gap_matrix.csv` :

| État | Nombre |
|---|---|
| `integree_complete` | 14 |
| `integree_partielle` | 5 |
| `bloquee_licence` (sans passeport) | 8 |
| `identifiee_non_integree` | 24 |

Deux couvertures faibles parmi les sources intégrées :

- **MEF/DGB** — 0 commune sur 140 : la donnée est **départementale**, et c'est
  correct. Elle ne doit jamais être redescendue à la commune.
- **Banque mondiale Projects** — 15 communes sur 140 : seules les communes
  **nommées** dans les documents. Aucun montant n'est réparti.

---

## 3. Les deux verdicts, sur les 28 passeports existants

| | Publication gratuite | Service payant |
|---|---|---|
| `oui` | 27 | 20 |
| `sous_conditions` | 0 | 5 |
| `non` | 1 | 2 |
| `inconnu` | 0 | 1 |

**25 sources sur 28** peuvent entrer dans une prestation facturée. Les trois
qui ne le peuvent pas :

- **LAPOP** — usage commercial explicitement interdit par la licence de clic ;
- **WorldCereal** — qualité insuffisante sur Haïti (décision Atmart, pas juridique) ;
- **NOAA IBTrACS** — Résolution 40 de l'OMM à lire pour le commercial.

---

## 4. Risques identifiés, par ordre de gravité

1. **UNFPA/COD-PS sans passeport.** C'est le dénominateur de presque tous les
   indicateurs par habitant. Si sa licence interdisait un usage, tout ce qui en
   dérive serait touché.
2. **OpenCelliD en CC BY-SA.** Le partage à l'identique contamine les produits
   dérivés : un livrable client en hériterait sans le savoir.
3. **OIM/DTM.** Données sur des personnes déplacées, publiées sans verdict.
4. **ACLED.** L'attribution est faite, mais l'usage commercial relève d'une
   licence distincte non demandée.
5. **IPC déclaré « CC0 » sans preuve.** Une licence affirmée sans preuve
   archivée vaut une licence inventée.

---

## 5. Priorité proposée

**P0 — avant toute nouvelle intégration.** Créer les huit passeports manquants,
archiver la preuve de licence de chacun, trancher les deux verdicts. Afficher
la source des six couches muettes. Isoler OpenCelliD si le partage à
l'identique est confirmé.

**P1 — consolidation.** Afficher la couverture réelle des cinq sources
partielles. Documenter que MEF/DGB est départemental par nature.

**P2 à P6 — les 24 sources identifiées non intégrées**, dans l'ordre des phases
de la mission. Aucune ne doit être téléchargée avant que son passeport existe.

---

## 6. Plan de traitement proposé

| Étape | Contenu | Bloquant |
|---|---|---|
| 0.1 | Huit passeports manquants + preuves archivées | oui |
| 0.2 | Source affichée sur les six couches muettes | oui |
| 0.3 | Enrichir le registre des 24 champs de la mission | non |
| 0.4 | Matrice source × usage, avec les 13 usages | non |
| 1.1 | Couverture réelle affichée sur les sources partielles | non |
| 2+ | Intégration par phases, un passeport avant chaque téléchargement | — |

`verif_droits_usage.py` bloque déjà : il refuse qu'un `inconnu` vaille
autorisation, et il échoue tant que les huit passeports manquent.

---

## 7. Ce que je n'ai pas fait, et pourquoi

- **Aucune source nouvelle n'a été téléchargée ni intégrée.** La mission
  l'interdit avant validation.
- **Le registre n'a pas encore les 24 champs** de la section 4. Les élargir
  avant de savoir ce que vous décidez des huit sources sans passeport
  produirait 28 lignes de champs vides — c'est-à-dire 28 fois `inconnu`, ce
  qui est exact mais inutile.
- **Je n'ai demandé aucune autorisation** à un producteur : cela engage Atmart
  et vous appartient.

---

## 8. La décision qui vous revient

Trois questions, dans cet ordre :

1. **Les huit sources sans passeport restent-elles publiées** pendant que leur
   licence est établie, ou faut-il en retirer certaines ? Mon avis : les
   maintenir en consultation, sauf OIM/DTM si vous jugez le sujet sensible.
2. **Faut-il demander une autorisation écrite** à ACLED, l'OIM et le MPCE, ou
   s'en tenir à la publication gratuite sans prestation payante ?
3. **Par quelle phase commencer** une fois la P0 close ? La phase 2 (économie,
   emploi) est la plus simple juridiquement — ILOSTAT, WDI, FAOSTAT et Comtrade
   sont tous sous licence ouverte documentée.
