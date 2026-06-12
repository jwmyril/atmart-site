# Atmart — Mache Teknoloji ak Done (site web)

Site statique bilingue (français + créole haïtien) d'**Atmart LLC** : tutoriels gratuits, boutique de datasets, formations — et le podcast **Lojik360** (marque d'Atmart LLC).

## Structure

```
Atmart_website/
├── index.html        # Accueil — piliers, podcast Lojik360, newsletter
├── tutoriels.html    # Bibliothèque de tutoriels avec filtres par catégorie
├── podcast.html      # Épisodes Lojik360 + liens plateformes
├── datasets.html     # Boutique de datasets (économie, géo, social, finance, gratuits)
├── formations.html   # 3 parcours (gratuit / 49$ / 99$) + offre organisations
├── data/
│   ├── transferts_diaspora_2000_2025.csv   # DATASET RÉEL (Banque mondiale, 208 lignes)
│   └── LISEZMOI_transferts_diaspora.md     # Documentation du dataset
├── content/
│   └── episode-01-script.md                # Script complet de l'épisode 1
└── assets/
    ├── style.css     # Design system
    └── script.js     # Menu mobile, filtres, newsletter
```

## Déploiement gratuit — GitHub Pages (pas à pas)

1. Créez un compte sur github.com (gratuit).
2. Créez un nouveau repo public nommé `atmart-site`.
3. Dans ce dossier, exécutez :
   ```
   git init
   git add .
   git commit -m "Site Atmart v1"
   git branch -M main
   git remote add origin https://github.com/<VOTRE-USER>/atmart-site.git
   git push -u origin main
   ```
4. Sur GitHub : **Settings → Pages → Source : Deploy from a branch → Branch : main / (root) → Save**.
5. Après ~1 minute, le site est en ligne sur `https://<VOTRE-USER>.github.io/atmart-site/`.
6. (Optionnel) Domaine personnalisé : achetez `atmart.com`/`.co`/`.ht` (~12 $/an), ajoutez-le dans Settings → Pages → Custom domain, et créez le CNAME chez votre registrar.

Alternatives : Netlify ou Cloudflare Pages (glisser-déposer le dossier).

## Brancher les services (tous gratuits au départ)

| Fonction | Service | Quoi faire |
|---|---|---|
| Vente de datasets | **Gumroad** ou **Payhip** | Créer les produits, remplacer les liens `href="#"` des boutons « Acheter » |
| Podcast audio | **Spotify for Creators** | Remplacer les liens plateformes dans `podcast.html` |
| Vidéo | **YouTube** | Remplacer les liens « ▶ Regarder » |
| Newsletter + cours e-mail | **Substack** ou **MailerLite** | Remplacer le formulaire dans `index.html` par l'embed |
| Formations payantes | **Gumroad** puis **Teachable/Podia** | Brancher les boutons « S'inscrire » |
| Paiements Haïti/Afrique | Gumroad (cartes + PayPal) ; **MonCash**/Mobile Money manuellement au début | — |

## À personnaliser

- Liens `href="#"` (réseaux sociaux, épisodes, produits payants).
- `contact@atmartllc.com` → votre vraie adresse e-mail.
- Les épisodes 2–4 et les datasets premium affichés sont des exemples de lancement.

## Mettre à jour le dataset gratuit

Le CSV vient de l'API Banque mondiale (indicateurs `BX.TRF.PWKR.CD.DT` et `BX.TRF.PWKR.DT.GD.ZS`). Pour le rafraîchir, relancer le script PowerShell de compilation (demander à Claude « mets à jour le dataset transferts diaspora »).
