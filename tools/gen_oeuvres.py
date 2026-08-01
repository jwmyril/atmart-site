# -*- coding: utf-8 -*-
"""Genere les URL canoniques des oeuvres a partir de fiche.html.

  assets/atelier/fiches/<slug>.json  ->  oeuvres/<slug>.html   (page canonique)
                                     ->  o/<slug>.html         (URL courte permanente)

GitHub Pages sert un fichier .html sans son extension : oeuvres/table-ancetres.html
repond donc sur https://atmart.ltd/oeuvres/table-ancetres, l'adresse canonique
arretee le 31/07/2026. Relancer ce script apres toute modification de fiche.html.
"""
import json
import re
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
DOMAIN = "https://atmart.ltd"
FICHES = SITE / "assets" / "atelier" / "fiches"

# Prefixe les liens relatifs : la page vit un cran plus bas que la racine.
REL = re.compile(r'(\b(?:href|src)=")(?!https?:|//|/|#|mailto:|data:)([^"]+)"')


def head_extras(slug, f):
    url = f.get("url", f"{DOMAIN}/oeuvres/{slug}")
    img = f"{DOMAIN}/{f['dir']}source.jpg"
    titre = f["t"]["fr"]
    desc = f["accroche"]["fr"].replace('"', "&quot;")
    ld = {
        "@context": "https://schema.org",
        "@type": "VisualArtwork",
        "name": titre,
        "url": url,
        "image": img,
        "description": f["resume"]["fr"],
        "creator": {"@type": "Person", "name": "Andrelita T. Myril (ATM)"},
        "artform": f["type"]["fr"],
        "publisher": {"@type": "Organization", "name": "Atmart LLC", "url": DOMAIN},
        # Le procede est declare : aucune revendication d'oeuvre entierement humaine.
        "creditText": f["procede_resume"]["fr"],
        "offers": {"@type": "Offer", "availability": "https://schema.org/PreOrder",
                   "url": url, "seller": {"@type": "Organization", "name": "Atmart LLC"}},
    }
    return (
        f'  <link rel="canonical" href="{url}" />\n'
        f'  <meta property="og:type" content="article" />\n'
        f'  <meta property="og:url" content="{url}" />\n'
        f'  <meta property="og:title" content="{titre} — Atelier ATM" />\n'
        f'  <meta property="og:description" content="{desc}" />\n'
        f'  <meta property="og:image" content="{img}" />\n'
        f'  <meta name="twitter:card" content="summary_large_image" />\n'
        f'  <script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>\n'
        f'  <script>window.ATM_FICHE_CANON=true;window.ATM_SLUG="{slug}";window.ATM_I18N_BASE="../";</script>\n'
    )


def build(slug, f, tpl):
    h = REL.sub(lambda m: m.group(1) + "../" + m.group(2) + '"', tpl)
    # fiche.html porte son propre canonical : la page canonique impose le sien.
    h = re.sub(r'\s*<link rel="canonical"[^>]*>', "", h, count=1)
    titre = f["t"]["fr"]
    h = h.replace("<title>Fiche d'œuvre — Atelier ATM | Atmart</title>",
                  f"<title>{titre} — Atelier ATM | Atmart</title>")
    h = h.replace('<meta name="description" content="',
                  f'<meta name="description" content="{f["accroche"]["fr"]} " data-orig="', 1)
    h = h.replace("</head>", head_extras(slug, f) + "</head>", 1)
    return h


SHORT = """<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<title>{titre} — Atmart</title>
<link rel="canonical" href="{url}" />
<meta name="robots" content="noindex, follow" />
<meta http-equiv="refresh" content="0; url={url}" />
<script>location.replace({path});</script>
</head>
<body style="background:#060c15;color:#eaf2fb;font-family:sans-serif;padding:2rem">
<p>Redirection vers <a href="{url}" style="color:#2ec4b6">{url}</a>…</p>
</body>
</html>
"""

tpl = (SITE / "fiche.html").read_text(encoding="utf-8")
(SITE / "oeuvres").mkdir(exist_ok=True)
(SITE / "o").mkdir(exist_ok=True)

for jf in sorted(FICHES.glob("*.json")):
    slug = jf.stem
    f = json.loads(jf.read_text(encoding="utf-8"))
    url = f.get("url", f"{DOMAIN}/oeuvres/{slug}")
    (SITE / "oeuvres" / f"{slug}.html").write_text(build(slug, f, tpl), encoding="utf-8")
    # L'URL courte est faite pour etre imprimee : sa destination peut changer,
    # elle non. En local le serveur de test exige l'extension.
    path = ('location.hostname==="localhost"||location.hostname==="127.0.0.1"'
            f' ? "../oeuvres/{slug}.html" : "/oeuvres/{slug}"')
    (SITE / "o" / f"{slug}.html").write_text(
        SHORT.format(titre=f["t"]["fr"], url=url, path=path), encoding="utf-8")
    print(f"oeuvres/{slug}.html  +  o/{slug}.html  ->  {url}")
