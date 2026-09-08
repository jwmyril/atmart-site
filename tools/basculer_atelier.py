# -*- coding: utf-8 -*-
"""Bascule l'Atelier d'atmart.ltd vers le sous-domaine art.atmart.ltd.

L'Atelier devient un site autonome (depot atmart-art). Ici on ne supprime rien :
chaque ancienne page devient une redirection vers son equivalent, pour qu'aucun
lien deja partage, aucun favori et surtout aucun QR imprime ne meure.

  atelier.html                 -> https://art.atmart.ltd/
  atelier-*.html, faq...       -> https://art.atmart.ltd/<meme nom sans .html>
  oeuvre.html, fiche.html      -> idem, en conservant la chaine ?o=...
  oeuvres/<slug>.html          -> https://art.atmart.ltd/oeuvres/<slug>
  o/<slug>.html                -> l'URL COURTE IMPRIMEE : elle reste sur
                                  atmart.ltd et pointe vers la fiche du sous-domaine.

L'entree de nav "Atelier" devient un simple lien vers le sous-domaine.
"""
import re
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
ART = "https://art.atmart.ltd"

PAGES = {
    "atelier.html": "/",
    "atelier-collection.html": "/atelier-collection",
    "atelier-maison.html": "/atelier-maison",
    "atelier-business.html": "/atelier-business",
    "atelier-institutions.html": "/atelier-institutions",
    "atelier-diaspora.html": "/atelier-diaspora",
    "atelier-artistes.html": "/atelier-artistes",
    "impact.html": "/impact",
    "faq.html": "/faq",
    "conditions-vente.html": "/conditions-vente",
    "processus-creation.html": "/processus-creation",
}
# Ces deux-la portent un parametre ?o=<slug> : on le transmet.
AVEC_QUERY = {"oeuvre.html": "/oeuvre.html", "fiche.html": "/fiche.html"}


def stub(titre: str, cible: str, garde_query: bool = False) -> str:
    js = (f'location.replace("{ART}{cible}" + location.search + location.hash);'
          if garde_query else f'location.replace("{ART}{cible}");')
    return f'''<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<title>{titre} — ATM+ Art</title>
<link rel="canonical" href="{ART}{cible}" />
<meta name="robots" content="noindex, follow" />
<meta http-equiv="refresh" content="0; url={ART}{cible}" />
<script>{js}</script>
<link rel="icon" href="/assets/brand/favicon.ico" sizes="any" />
</head>
<body style="background:#060c15;color:#eaf2fb;font-family:system-ui,sans-serif;padding:2rem;text-align:center">
<p>ATM+ Art a désormais son propre site.</p>
<p><a href="{ART}{cible}" style="color:#2ec4b6">{ART.replace("https://", "")}{cible}</a></p>
</body>
</html>
'''


def main():
    n = 0
    for f, cible in PAGES.items():
        (SITE / f).write_text(stub("ATM+ Art", cible), encoding="utf-8")
        n += 1
    for f, cible in AVEC_QUERY.items():
        (SITE / f).write_text(stub("ATM+ Art", cible, garde_query=True), encoding="utf-8")
        n += 1
    for d in ("oeuvres", "o"):
        p = SITE / d
        if not p.exists():
            continue
        for f in p.glob("*.html"):
            slug = f.stem
            f.write_text(stub(slug, f"/oeuvres/{slug}"), encoding="utf-8")
            n += 1
    print(f"{n} pages transformees en redirections")

    # ---- nav : le groupe deroulant Atelier devient un lien vers le sous-domaine
    bloc = re.compile(
        r'      <li class="nav-grp"><span data-i18n="nav\.atelier">.*?</ul>\n      </li>\n',
        re.S)
    lien = ('      <li><a href="https://art.atmart.ltd" data-i18n="nav.atelier">'
            '\U0001F3A8 Atelier</a></li>\n')
    touche = 0
    for f in sorted(SITE.glob("*.html")):
        t = f.read_text(encoding="utf-8")
        t2 = bloc.sub(lien, t)
        # liens directs restants vers les pages parties
        t2 = re.sub(r'href="(atelier(?:-[a-z]+)?|impact|faq|conditions-vente|processus-creation)\.html"',
                    lambda m: 'href="https://art.atmart.ltd/'
                              + ("" if m.group(1) == "atelier" else m.group(1)) + '"', t2)
        if t2 != t:
            f.write_text(t2, encoding="utf-8")
            touche += 1
    print(f"nav et liens mis a jour dans {touche} pages")

    # ---- sitemap : les URL de l'Atelier ne vivent plus ici
    sm = SITE / "sitemap.xml"
    if sm.exists():
        t = sm.read_text(encoding="utf-8")
        avant = t.count("<url>")
        t = re.sub(r"\s*<url>(?:(?!</url>).)*?(?:atelier|/oeuvres/|/o/|impact|conditions-vente|processus-creation|/faq)"
                   r"(?:(?!</url>).)*?</url>", "", t, flags=re.S)
        sm.write_text(t, encoding="utf-8")
        print(f"sitemap : {avant} -> {t.count('<url>')} URL")


if __name__ == "__main__":
    main()
