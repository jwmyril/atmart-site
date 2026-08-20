# -*- coding: utf-8 -*-
"""
Generateur des pages « un outil de Rezilta ».

Chaque outil de Rezilta simplifie un geste et rend une personne de plus capable
de le faire seule. Une page par outil, courte et focalisee : on ne redit pas la
plateforme, on montre le geste.

STRUCTURE (calquee sur les pages produit de reference, ~550 mots) :
  1. hero court        — le probleme en 50 mots, pas la liste des fonctions
  2. bandeau chantier  — le produit n est pas fini, et la page le dit
  3. quatre gestes     — cartes numerotees avec pictogramme, 30-40 mots chacune
  4. sections alternees— une idee, un visuel, cote alterne
  5. se brancher       — deux listes categorisees
  6. enonce d impact   — un paragraphe narratif, aucune puce
  7. appel             — deux portes

Le squelette (tete, nav, pied, scripts) est RELU depuis rezilta.html : une page
d outil ne doit jamais deriver du reste du site.
"""
import io, os, re, sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
RACINE = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))

# =========================================================================
#  Pictogrammes : trait unique, currentColor, donc justes dans les deux themes.
#  Dessines a la main plutot qu importes : une icone de banque d images ne
#  montre jamais le geste exact dont on parle.
# =========================================================================
PICTOS = {
    # une fiche d indicateur d ou descend un formulaire
    "concevoir": """<rect x="8" y="6" width="26" height="34" rx="2"/><path d="M14 15h14M14 22h14M14 29h8"/>
<path d="M40 24h10M46 20l4 4-4 4"/><rect x="52" y="14" width="4" height="36" rx="1" opacity=".35"/>""",
    # un point qui se distribue vers trois destinations
    "distribuer": """<circle cx="12" cy="32" r="6"/><path d="M18 32h10M28 32l0-16h12M28 32l0 16h12"/>
<rect x="42" y="10" width="14" height="12" rx="2"/><rect x="42" y="26" width="14" height="12" rx="2"/>
<rect x="42" y="42" width="14" height="12" rx="2"/>""",
    # un telephone qui coche, hors reseau
    "remplir": """<rect x="18" y="8" width="28" height="48" rx="4"/><path d="M27 24l5 5 10-10"/>
<path d="M24 40h16M24 47h10"/><path d="M6 14l10 10M16 14L6 24" opacity=".55"/>""",
    # une loupe qui trouve la ligne fautive
    "controler": """<path d="M8 14h30M8 24h30M8 34h18"/><circle cx="40" cy="38" r="12"/><path d="M49 47l7 7"/>
<path d="M36 38h8M40 34v8"/>""",
    # une regle graduee : definir la mesure
    "definir": """<rect x="6" y="20" width="52" height="20" rx="2"/><path d="M16 20v7M26 20v11M36 20v7M46 20v11"/>
<path d="M6 46h52" opacity=".4"/>""",
    # trois sources rattachees a un meme point
    "rattacher": """<rect x="6" y="8" width="14" height="10" rx="2"/><rect x="6" y="27" width="14" height="10" rx="2"/>
<rect x="6" y="46" width="14" height="10" rx="2"/><path d="M20 13h10v19h8M20 32h18M20 51h10V32"/>
<circle cx="48" cy="32" r="8"/>""",
    # un entonnoir : plusieurs relevees, un total
    "agreger": """<path d="M6 10h52L38 32v20l-12 6V32L6 10z"/><path d="M18 18h28" opacity=".45"/>""",
    # une barre qui se decoupe en segments
    "desagreger": """<rect x="6" y="12" width="52" height="12" rx="2"/><path d="M6 38h20v12H6zM30 38h14v12H30zM48 38h10v12H48"/>
<path d="M20 24v8M38 24v8M52 24v8" opacity=".5"/>""",
}


def picto(nom):
    return (f'<svg class="ot-picto" viewBox="0 0 64 64" aria-hidden="true" fill="none" '
            f'stroke="currentColor" stroke-width="2.2" stroke-linecap="round" '
            f'stroke-linejoin="round">{PICTOS[nom]}</svg>')


# =========================================================================
#  Feuille de style propre aux pages d outil
# =========================================================================
CSS = """    .ot-badges{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:1.1rem}
    .ot-badge{background:rgba(46,196,182,.12);border:1px solid rgba(46,196,182,.35);color:#d7e3f0;
      border-radius:99px;padding:.32rem .85rem;font-size:.8rem;font-weight:500}
    .ot-wip{background:rgba(244,162,97,.12);border:1px solid rgba(244,162,97,.5);border-radius:12px;
      padding:.8rem 1.05rem;margin-top:1.2rem;max-width:780px;font-size:.9rem;color:#e4dbcf;line-height:1.6}
    /* --- les quatre gestes --- */
    .ot-gestes{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:1rem;margin-top:1.3rem}
    .ot-geste{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:14px;
      padding:1.35rem 1.4rem;position:relative;transition:border-color .25s}
    .ot-geste:hover{border-color:rgba(46,196,182,.45)}
    .ot-picto{width:44px;height:44px;color:#2ec4b6;display:block;margin-bottom:.85rem}
    .ot-geste .ord{position:absolute;top:1.1rem;right:1.25rem;font-size:.72rem;font-weight:700;
      letter-spacing:.12em;color:#5a6f83}
    .ot-geste h4{margin:0 0 .4rem;font-family:"Space Grotesk",sans-serif;color:#fff;font-size:1.04rem}
    .ot-geste p{margin:0;font-size:.885rem;color:#9db2c7;line-height:1.6}
    /* --- sections alternees : une idee, un visuel --- */
    .ot-alt{display:grid;grid-template-columns:1fr;gap:1.6rem;align-items:center;
      padding:1.7rem 0;border-top:1px solid rgba(255,255,255,.08)}
    .ot-alt:first-of-type{border-top:none}
    @media(min-width:760px){
      .ot-alt{grid-template-columns:1.15fr .85fr;gap:2.6rem}
      .ot-alt.inv .ot-alt-vis{order:-1}
    }
    .ot-alt h3{margin:0 0 .55rem;font-family:"Space Grotesk",sans-serif;color:#fff;font-size:1.24rem}
    .ot-alt p{margin:0;font-size:.95rem;color:#9db2c7;line-height:1.68;max-width:56ch}
    .ot-alt-vis{display:flex;justify-content:center;align-items:center;min-height:120px;
      background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:1.4rem}
    .ot-alt-vis svg{width:100%;max-width:250px;height:auto;color:#2ec4b6}
    /* --- se brancher --- */
    .ot-brancher{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1rem;margin-top:1.1rem}
    .ot-brancher div{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);
      border-radius:12px;padding:1.05rem 1.2rem}
    .ot-brancher b{display:block;color:#fff;margin-bottom:.5rem;font-size:.95rem}
    .ot-brancher ul{margin:0;padding-left:1.05rem}
    .ot-brancher li{font-size:.875rem;color:#9db2c7;line-height:1.6;margin-bottom:.25rem}
    /* --- l enonce d impact : narratif, aucune puce --- */
    .ot-impact{background:rgba(46,196,182,.07);border:1px solid rgba(46,196,182,.3);border-radius:16px;
      padding:1.9rem 2rem;margin-top:1.2rem}
    .ot-impact p{margin:0;font-size:1.06rem;line-height:1.75;color:#d7e3f0;max-width:64ch}
    .ot-impact p+p{margin-top:.9rem}
    .ot-impact strong{color:#fff}
    /* --- appel --- */
    .ot-portes{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1rem;margin-top:1.1rem}
    .ot-porte{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:14px;
      padding:1.4rem 1.5rem}
    .ot-porte h4{margin:0 0 .4rem;font-family:"Space Grotesk",sans-serif;color:#fff;font-size:1.02rem}
    .ot-porte p{margin:0 0 .9rem;font-size:.88rem;color:#9db2c7;line-height:1.6}
    .ot-suite{display:flex;gap:.6rem;flex-wrap:wrap;margin-top:1rem}
    .ot-suite a{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:99px;
      padding:.45rem 1rem;font-size:.85rem;color:#c9d8e6;text-decoration:none;transition:border-color .2s}
    .ot-suite a:hover{border-color:rgba(46,196,182,.5)}"""


def bloc(nom, texte):
    return re.search(nom, texte, re.S).group(0)


def construire(spec):
    src = io.open(os.path.join(RACINE, "rezilta.html"), encoding="utf-8").read()
    tete = src[:src.index("  <style>")]
    entete = bloc(r"<header>.*?</header>", src)
    pied = bloc(r"<footer>.*?</footer>", src)
    scripts = src[src.index('<script src="assets/script.js'):src.index("</body>")]

    # la tete, adaptee a l outil
    tete = tete.replace(
        "<title>Rezilta — la plateforme de données, d'analyse et de preuve | Atmart</title>",
        f"<title>{spec['titre_onglet']}</title>")
    tete = re.sub(r'<meta name="description" content="[^"]*" />',
                  f'<meta name="description" content="{spec["meta"]}" />', tete, count=1)
    # l entree de nav active devient la page mere : un outil appartient a Rezilta
    entete = entete.replace('<a href="rezilta.html" class="active">', '<a href="rezilta.html">')

    p = spec["prefixe"]
    o = []
    a = o.append

    a(tete)
    a("  <style>\n" + CSS + "\n  </style>\n</head>\n<body>\n")
    a(entete + "\n")

    # --- 1. hero ---
    a(f'''
<section class="hero" style="padding-bottom:1.1rem">
  <div class="container">
    <p class="kreyol" data-i18n="{p}.fil">{spec["fil"]}</p>
    <h1>{spec["h1"]}</h1>
    <div class="aka"><b data-i18n="{p}.aka">{spec["aka"]}</b><small data-i18n="{p}.aka_s">un outil de Rezilta</small></div>
    <p class="lead" data-i18n-html="{p}.lead">{spec["lead"]}</p>
    <div class="ot-badges">
''')
    for i, b in enumerate(spec["badges"], 1):
        a(f'      <span class="ot-badge" data-i18n="{p}.bg{i}">{b}</span>\n')
    a(f'''    </div>
    <div class="ot-wip" data-i18n-html="{p}.wip">🚧 <strong>Cet outil est en construction.</strong> Ce que vous lisez est ce que nous nous engageons à livrer, pas ce qui tourne déjà. Le <a href="rezilta.html#offre" style="color:#2ec4b6">programme pilote</a> est ouvert aux organisations qui veulent le construire avec nous.</div>
    <div style="margin-top:1.2rem">
      <a href="mailto:sales@atmart.ltd?subject={spec['sujet_courriel']}" class="btn btn-primary" data-i18n="{p}.cta1">{spec["cta1"]}</a>
      <a href="rezilta.html" class="btn btn-outline" style="margin-left:.6rem" data-i18n="{p}.cta2">Voir la plateforme</a>
    </div>
  </div>
</section>
''')

    # --- 2. les quatre gestes ---
    a(f'''
<section style="padding-top:.4rem">
  <div class="container">
    <div class="section-head"><h2 data-i18n="{p}.ge_t">{spec["gestes_titre"]}</h2>
      <p data-i18n="{p}.ge_d">{spec["gestes_sous"]}</p></div>
    <div class="ot-gestes">
''')
    for i, g in enumerate(spec["gestes"], 1):
        a(f'''      <div class="ot-geste"><span class="ord">{i}</span>
        {picto(g["picto"])}
        <h4 data-i18n="{p}.g{i}_t">{g["titre"]}</h4>
        <p data-i18n="{p}.g{i}_d">{g["texte"]}</p>
      </div>
''')
    a("    </div>\n  </div>\n</section>\n")

    # --- 3. sections alternees ---
    a(f'''
<section style="padding-top:1.3rem">
  <div class="container">
    <div class="section-head"><h2 data-i18n="{p}.al_t">{spec["alt_titre"]}</h2></div>
''')
    for i, s in enumerate(spec["alternees"], 1):
        inv = " inv" if i % 2 == 0 else ""
        a(f'''    <div class="ot-alt{inv}">
      <div>
        <h3 data-i18n="{p}.a{i}_t">{s["titre"]}</h3>
        <p data-i18n-html="{p}.a{i}_d">{s["texte"]}</p>
      </div>
      <div class="ot-alt-vis">{s["visuel"]}</div>
    </div>
''')
    a("  </div>\n</section>\n")

    # --- 4. se brancher ---
    a(f'''
<section style="padding-top:1.3rem">
  <div class="container">
    <div class="section-head"><h2 data-i18n="{p}.br_t">{spec["brancher_titre"]}</h2>
      <p data-i18n="{p}.br_d">{spec["brancher_sous"]}</p></div>
    <div class="ot-brancher">
''')
    for i, c in enumerate(spec["brancher"], 1):
        a(f'      <div><b data-i18n="{p}.b{i}_t">{c["titre"]}</b><ul>\n')
        for j, it in enumerate(c["items"], 1):
            a(f'        <li data-i18n="{p}.b{i}_l{j}">{it}</li>\n')
        a("      </ul></div>\n")
    a("    </div>\n  </div>\n</section>\n")

    # --- 5. l impact ---
    a(f'''
<section style="padding-top:1.3rem">
  <div class="container">
    <div class="section-head"><h2 data-i18n="{p}.im_t">{spec["impact_titre"]}</h2></div>
    <div class="ot-impact">
      <p data-i18n-html="{p}.im_1">{spec["impact_1"]}</p>
      <p data-i18n-html="{p}.im_2">{spec["impact_2"]}</p>
    </div>
  </div>
</section>
''')

    # --- 6. l appel + les autres outils ---
    a(f'''
<section style="padding-top:1.3rem;padding-bottom:2rem">
  <div class="container">
    <div class="section-head"><h2 data-i18n="{p}.ap_t">Aller plus loin</h2></div>
    <div class="ot-portes">
      <div class="ot-porte">
        <h4 data-i18n="{p}.ap1_t">Voir l'outil sur vos données</h4>
        <p data-i18n="{p}.ap1_d">Vous apportez un fichier et une question qui compte ; nous montrons ce que l'outil en fait, sur vos chiffres et pas sur une démonstration.</p>
        <a href="mailto:sales@atmart.ltd?subject={spec['sujet_courriel']}" class="btn btn-primary" data-i18n="{p}.ap1_c">Demander une démonstration</a>
      </div>
      <div class="ot-porte">
        <h4 data-i18n="{p}.ap2_t">Comprendre la méthode</h4>
        <p data-i18n="{p}.ap2_d">La plateforme entière : d'où viennent les données, ce que le moteur refuse de conclure, et comment un chiffre remonte à sa source.</p>
        <a href="rezilta.html" class="btn btn-outline" data-i18n="{p}.ap2_c">Lire la plateforme</a>
      </div>
    </div>
    <div class="ot-suite">
''')
    for lien, libelle, cle in spec["autres_outils"]:
        a(f'      <a href="{lien}" data-i18n="{cle}">{libelle}</a>\n')
    a("    </div>\n  </div>\n</section>\n\n")

    a(pied + "\n\n" + scripts + "</body>\n</html>\n")
    return "".join(o)


if __name__ == "__main__":
    from outils_specs import PAGES
    for nom, spec in PAGES.items():
        html = construire(spec)
        chemin = os.path.join(RACINE, nom)
        io.open(chemin, "w", encoding="utf-8", newline="\n").write(html)
        mots = len(re.sub(r"<[^>]+>", " ", html[html.index("<section"):]).split())
        print("%-28s %6d octets · ~%d mots visibles" % (nom, len(html), mots))
