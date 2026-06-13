# CLAUDE.md — Instructions développeur pour atmart.ltd

Tu es le développeur du site **atmart.ltd** (Atmart LLC). Ce fichier est ta source de vérité.

## Le projet

- **Atmart** (« Mache Teknoloji ak Done ») : écosystème d'éducation aux données pour Haïti, la Caraïbe francophone et l'Afrique francophone. Site statique HTML/CSS/JS, sans framework — garder ça simple.
- **Lojik360** : le podcast, marque d'Atmart LLC. Ne jamais brander le site « Lojik360 » (pas d'entité légale à ce nom).
- Propriétaire : Myril Jean Wisner (myriljeanwisner@gmail.com), analyste Power BI, parle créole haïtien + français.
- Modèle : contenu gratuit (tutoriels, podcast, datasets d'appel) → produits payants (datasets premium via Payhip, formations 49$/99$).

## Déploiement

- Hébergement : **GitHub Pages**, repo `jwmyril/atmart-site`, branche `main`, racine. Domaine : atmart.ltd (CNAME file), DNS chez Porkbun.
- **Publier = commit + push sur main.** En ligne en ~1 minute. Pas de build, pas de CI.
- Après toute modification de `assets/style.css`, incrémenter le numéro de version `?v=N` dans les `<link rel="stylesheet">` de TOUTES les pages (cache-busting).

## Règles absolues

1. **JAMAIS de fichiers premium dans ce repo** (il est public). Les datasets payants vivent dans `C:\Users\USUARIO\Power_BI_Claude\Atmart_premium_datasets\` (hors repo). Seuls les échantillons gratuits (≤ 10 lignes) vont dans `data/`.
2. **Licence** : code/contenu © Atmart LLC tous droits réservés ; datasets gratuits CC BY 4.0 (voir LICENSE.md). Ne jamais ajouter de licence open-source globale.
3. **Langues** : français = langue principale du contenu ; accroches en créole haïtien (`class="kreyol"`) = voix de marque, ne pas traduire. Le sélecteur FR/HT/EN est dans `assets/i18n.js` — toute nouvelle chaîne d'interface doit avoir ses 3 traductions et un attribut `data-i18n`/`data-i18n-html`/`data-i18n-ph`.
4. **Données réelles uniquement** : chaque chiffre publié doit être vérifiable. Sources approuvées : Banque mondiale (API), FMI, LAPOP AmericasBarometer, HDX/OCHA, GeoNames, haitidata.org. Toujours citer la source.
5. Tous les liens d'outils pointent vers les **sites officiels** (pas de miroirs).

## Structure

- `index.html` — accueil « tutorial-first » (format W3Schools : sections matières colorées + cartes d'exemple « Eseye li »)
- `tutoriels.html` + `tutoriels/*.html` — bibliothèque et articles (filtres par data-cat, recherche via ?q=)
- `podcast.html` — épisodes Lojik360 ; `datasets.html` — boutique ; `formations.html` — 3 parcours ; `outils.html` — outils + sources de données
- `assets/` — style.css (design system, variables CSS), script.js (nav, filtres, recherche), i18n.js (FR/HT/EN), logo.svg
- `data/` — datasets GRATUITS + documentation LISEZMOI
- `content/` — scripts d'épisodes (non liés dans la nav)

## Cadence hebdomadaire (objectif)

Chaque semaine : 1 tutoriel + 1 épisode de podcast + 1 dataset, tous liés entre eux (l'épisode explique → le tutoriel enseigne → le dataset fait pratiquer → la formation convertit).

## Format des tutoriels (OBLIGATOIRE)

Tout nouveau tutoriel utilise le **lecteur à sidebar** (format manuel type TutorialsPoint). Template de référence : `tutoriels/pensee-critique.html`. Structure : `.tuto-shell` > `.tuto-sidebar` (carte d'en-tête + `.tuto-toc` avec groupes `.toc-group` et liens d'ancrage vers chaque `<section id>`) + `.tuto-main` (chaque chapitre = `<section id="...">`). Le scrollspy et le toggle mobile sont déjà dans `assets/script.js`. Ne jamais publier de lien « Lire le tutoriel » vers une page vide : sur `tutoriels.html`, un tutoriel pas encore écrit reste une carte `.soon` non cliquable (`.soon-btn`), jamais un `href="#"`.

**Curriculum soft skills à construire (dans l'ordre) :** 1.Pensée critique ✅ · 2.Résolution créative de problèmes · 3.Communication efficace · 4.Rédaction professionnelle · 5.Planification de carrière · 6.Réussir ses entretiens · 7.Compétences entrepreneuriales · 8.Productivité personnelle · 9.Confiance en soi · 10.Négociation.

## Design

Thème sombre. Couleurs : navy #0a1a2f, teal #2ec4b6, ambre #f4a261, rouge #e63946. Polices : Space Grotesk (titres) + Inter (texte). Le logo (cercle soleil + livre, rouge/bleu/or) est `assets/logo.svg`.

## Vérification avant push

1. Servir localement (`python -m http.server 8360 --directory .`) et vérifier la page modifiée.
2. Zéro erreur console ; liens internes valides ; le sélecteur de langue fonctionne sur les nouvelles pages (inclure script.js + i18n.js).
3. `git add` ciblé, message de commit en français, push sur main.
