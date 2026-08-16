# Audit de plateforme — Explorateur Haïti

**15 août 2026.** Audit UX, fonctionnel, technique, éditorial, juridique et
commercial, conduit sur le site en production et sur les trois dépôts. Chaque
constat a été **vérifié**, jamais supposé : les vérifications sont
reproductibles par `node verif_site_public.js` (49 assertions) et par les
commandes citées.

---

## 1. Ce qui existe réellement (constat vérifié)

| Domaine | État | Preuve |
|---|---|---|
| Recherche territoriale | ✅ nom fr/ht, p-code, identifiant Atmart, alias pays | suite §1 |
| Profils territoriaux | ✅ 4 niveaux : pays, département, arrondissement, commune | fiche Pays 14/08 |
| Agrégation | ✅ règles au dictionnaire, ratios recalculés sur totaux | `regle_agregation` |
| Comparaison | ✅ 2 à 4 territoires, alerte millésimes, export CSV traçé | module comparaison |
| Cartographie | ✅ carte de situation + page Couches (17 couches, 4 groupes) | `couches.html` |
| Catalogue de couches | ⚠️ liste déroulante, pas de catalogue filtrable | §7 du brief |
| Traçabilité | ✅ 35 sources, empreintes SHA-256, passeport par source | registre |
| Millésimes | ✅ affichés partout, alerte si divergents | suite §2 |
| Qualité | ✅ statut O/E/A/N, couverture réelle par indicateur | fiches |
| Export | ✅ CSV avec sources, méthode, langue ; PDF via impression | `enTeteMeta()` |
| API | ❌ absente (fichiers publics = API de fait) | `/api/` → 404 |
| Multilinguisme | ✅ **4 langues sur URLs indexables depuis ce jour** | suite §7 |
| Accessibilité | ✅ lien d'évitement, ARIA, contrastes, 44 px, clavier | audit 14/08 |
| Personnalisation | ⚠️ longueur de fiche + langue mémorisées ; pas de compte | — |
| Modèle commercial | ✅ 5 produits, 2 caisses Payhip, offre 150 $ | `verif_prix_paiement` |
| Édition 3G | ✅ **24 Ko par commune** (64× moins) | `fiche.html` |
| Archives | ✅ versions datées et citables | `archives.html` |

**Sécurité des livrables payants : vérifiée.** Les cinq fichiers vendus
(classeur, registres, modèles, packs départementaux) répondent **404** sur le
site public. Rien de premium n'est servi en clair.

---

## 2. Matrice concurrentielle

Note : ✅ fait · ⚠️ partiel · ❌ absent. La colonne « Explorateur » reflète
l'état **après** les corrections du 15/08.

| Critère | Explorateur | AyitiStats | HaitiData/CNIGS | HDX Haïti | Census Reporter | PolicyMap | Data Commons |
|---|---|---|---|---|---|---|---|
| Recherche territoriale | ✅ 4 niveaux + p-code | ⚠️ | ⚠️ | ❌ (jeux, pas lieux) | ✅ | ✅ | ✅ |
| Profil territorial | ✅ thématique | ⚠️ | ❌ | ❌ | ✅ | ✅ | ✅ |
| Comparaison | ✅ 2-4, alerte millésimes | ⚠️ | ❌ | ❌ | ✅ | ✅ | ✅ |
| Cartographie | ⚠️ SVG maison | ⚠️ | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ |
| Catalogue de couches | ⚠️ | ❌ | ✅ | ✅ | ❌ | ✅ | ❌ |
| Traçabilité par valeur | ✅ **différenciant** | ⚠️ | ⚠️ | ✅ jeu | ✅ | ⚠️ | ✅ |
| Absence ≠ zéro | ✅ **rare** | ❌ | — | — | ⚠️ | ⚠️ | ⚠️ |
| Millésimes affichés | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Export | ✅ avec sources | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |
| API | ❌ | ❌ | ⚠️ WFS | ✅ CKAN | ⚠️ | ✅ | ✅ |
| Multilingue | ✅ 4 langues indexables | ⚠️ | ⚠️ | ⚠️ | ❌ | ❌ | ❌ |
| Kreyòl | ✅ **unique** | ⚠️ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Accessibilité | ✅ AA visé | ? | ? | ⚠️ | ✅ | ⚠️ | ⚠️ |
| Édition basse bande passante | ✅ **unique** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Modèle commercial | ✅ produits + services | ❌ | ❌ | ❌ | ❌ | ✅ abonnement | ❌ |

**Où se différencier — trois avantages défendables :**

1. **La traçabilité par VALEUR, pas par jeu.** HDX documente un fichier ;
   l'Explorateur documente chaque chiffre (source, millésime, méthode,
   couverture, limite, statut). Aucun concurrent haïtien ne le fait.
2. **Le kreyòl et la basse bande passante.** Personne d'autre ne sert le
   public haïtien réel — 4 langues indexées, 24 Ko par commune.
3. **L'honnêteté opérationnelle** : « 140 vs 146 communes » expliqué,
   absence ≠ zéro, couverture affichée. C'est vendable auprès des bailleurs,
   qui doivent défendre leurs chiffres devant un comité.

**Où ne PAS aller** : concurrencer HDX en volume de jeux, ou CNIGS en
géomatique lourde. Le terrain est l'information territoriale **expliquée**.

---

## 3. Problèmes classés (constat du 15/08)

### P0 — confiance et exactitude
| # | Problème | Utilisateur | Conséquence | État |
|---|---|---|---|---|
| P0-1 | Livrables payants exposés ? | Atmart | perte de revenu | ✅ **vérifié sain** (404) |
| P0-2 | Absence traitée en zéro ? | tous | décision fausse | ✅ vérifié sain |
| P0-3 | Liens morts dans les pages traduites | lecteur ht/en/es | cul-de-sac | ✅ **corrigé ce jour** |
| P0-4 | Prix affiché ≠ prix facturé | acheteur | litige | ✅ vérifié (Payhip aligné) |

### P1 — compréhension et utilisation
| # | Problème | Conséquence | État | Effort |
|---|---|---|---|---|
| P1-1 | 4 langues non indexables | traduction invisible des moteurs | ✅ **corrigé ce jour** | fait |
| P1-2 | 1,55 Mo pour une fiche | public 3G exclu | ✅ **corrigé** (24 Ko) | fait |
| P1-3 | Fiche trop longue | lecteur perdu | ✅ **corrigé** (3 longueurs) | fait |
| P1-4 | Catalogue à la main | prix divergents | ✅ **corrigé** (généré) | fait |
| P1-5 | 11 pages non traduites (bandeau) | expérience inégale | ⬜ ouvert | 2 j |
| P1-6 | Rapport PDF = impression navigateur | livrable peu pro | ⬜ ouvert | 3 j |
| P1-7 | Couches : pas de superposition ni filtre | analyse limitée | ⬜ ouvert | 5 j |

### P2 — différenciation commerciale
| # | Chantier | Valeur | Effort | Dépendances |
|---|---|---|---|---|
| P2-1 | Rapport PDF professionnel par territoire | vend le 150 $ | 3 j | modèle éditorial |
| P2-2 | Favoris et territoires suivis (local, sans compte) | rétention | 2 j | — |
| P2-3 | Cartes et fiches intégrables (iframe) | acquisition | 3 j | CSP |
| P2-4 | API documentée (lecture seule) | institutions | 5 j | décision : quota |
| P2-5 | Alertes de mise à jour (courriel) | rétention | 4 j | Worker + liste |

### P3 — innovation
| # | Chantier | Effort | Préalable |
|---|---|---|---|
| P3-1 | Assistant IA ancré sur les données | 1 j | **décision reportée** (§4bis) |
| P3-2 | Analyse dans un rayon / zone dessinée | 8 j | géométries fines = Pack Géo |
| P3-3 | Temps de trajet | 10 j | réseau routier OSM + moteur |
| P3-4 | Indices composites transparents | 5 j | validation méthodologique |
| P3-5 | Espaces institutionnels (comptes) | 15 j | **change l'architecture** |

---

## 4. Décisions attendues d'Atmart

Ces choix ne se tranchent pas en écrivant du code. Chacun est présenté avec
sa conséquence et une recommandation.

| Décision | Options | Recommandation |
|---|---|---|
| **Comptes utilisateurs** | (a) rester sans compte, tout en local ; (b) comptes = abonnements, alertes, espaces | (a) tant que le trafic n'est pas mesuré : un compte impose serveur, RGPD, support |
| **API** | (a) fichiers publics = API de fait ; (b) API avec clés et quotas | (a) puis (b) si une institution la demande et la finance |
| **11 pages non traduites** | (a) traduire tout ; (b) traduire les 4 pages commerciales ; (c) laisser | (b) : Solutions, Campus, Parrainage, Pack Géo — celles qui vendent |
| **Rapport PDF** | (a) impression navigateur ; (b) PDF généré côté client | (b) pour les produits payants ; l'impression reste pour le gratuit |
| **Prix API/institutionnel** | à fixer | attendre une demande réelle avant d'afficher une grille |

---

## 5. Ce qui a été corrigé le 15/08 (implémenté et vérifié)

1. **Quatre langues indexables** — `/ht/`, `/en/`, `/es/` : 12 pages
   statiques, hreflang croisé, canonical par langue, sitemap à 26 entrées,
   bascule d'adresse par le sélecteur. Généré par `build_langues.py`.
   *Validation* : suite §7, 7 assertions.
2. **Zéro lien mort dans les pages traduites** — les pages non localisées
   sont pointées en absolu vers le français, ancres comprises.
3. **Édition légère** — `fiche.html`, 24 Ko par commune contre 1,55 Mo.
4. **Vitrine générée** — `build_vitrine.py` ; 15 produits publiés qui
   n'avaient aucune carte sont devenus visibles.
5. **Suite unique en ligne de commande** — `verif_site_public.js`,
   **49 assertions** contre la production, exécutable en une commande.
6. **Fiche à trois longueurs** — court / moyen / complet, mémorisé,
   partageable.

---

## 6. Critères d'acceptation du brief — état

| Critère | État |
|---|---|
| Trouver une commune en moins de 3 actions | ✅ 2 (taper, cliquer) |
| Source et période immédiatement visibles | ✅ sous chaque valeur |
| Aucune absence affichée comme zéro | ✅ vérifié |
| Agrégations reproductibles | ✅ règles publiées |
| Comparaisons signalant les millésimes | ✅ |
| Exports avec sources | ✅ |
| Cartes utilisables mobile et clavier | ✅ tap + tableau alternatif |
| 4 langues sur URLs indexables | ✅ **ce jour** |
| Données premium non exposées | ✅ 404 vérifiés |
| Aucun bouton inerte | ✅ suite liens |
| Tests existants fonctionnels | ✅ 49/49 |
| Nouvelles fonctions testées | ✅ |

**Non atteint à ce jour** : LCP < 2,5 s à froid (mesuré 3,5 s sur l'accueil
complet — l'édition légère répond en 0,1 s), et parcours institutionnel
(dépend de la décision « comptes »).

---

## 7. Version recommandée

**v2.0 « intelligence territoriale »** — ce qui est en ligne aujourd'hui.
**v2.1** (2 semaines) : traduction des 4 pages commerciales, rapport PDF,
catalogue de couches filtrable.
**v3.0** (à décider) : comptes, API, alertes — seulement si les compteurs
d'usage montrent une demande, et si Atmart accepte le coût d'exploitation
d'un service avec état.
