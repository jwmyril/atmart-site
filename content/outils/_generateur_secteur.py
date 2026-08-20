# -*- coding: utf-8 -*-
"""
Generateur des pages « Rezilta pour … », une par secteur.

POURQUOI CES PAGES EXISTENT (decision du user, 20/08/2026) : la page mere vise
six secteurs a la fois. Une page qui parle a tout le monde ne parle
precisement a personne — et le fondateur lui-meme s y est perdu. Le user a
choisi de GARDER les six secteurs ; la clarte vient donc d une porte par
secteur, pas d un resserrement.

STRUCTURE — differente des pages d outil, et c est voulu. Une page d outil
montre UN GESTE ; une page de secteur montre UNE PERSONNE ET SON PROBLEME.

  1. hero            — le metier, et la phrase qui fait mal
  2. LA SCENE        — un moment concret, date, avec un vrai vendredi soir.
                       C est le coeur : c est ce qui manquait a la page mere.
  3. avant / apres   — dans le vocabulaire du secteur, jamais le notre
  4. trois questions — celles que ce metier pose vraiment a ses donnees
  5. ce que nous ne promettons pas — propre au secteur. Indispensable pour
                       une banque ou un laboratoire, ou une promesse de trop
                       ferme la porte pour de bon.
  6. l appel + les autres secteurs

~420 mots. Une page de secteur est une PORTE, pas un traite.
"""
import io, os, re, sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
RACINE = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))

CSS = """    .sc-badges{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:1.1rem}
    .sc-badge{background:rgba(46,196,182,.12);border:1px solid rgba(46,196,182,.35);color:#d7e3f0;
      border-radius:99px;padding:.32rem .85rem;font-size:.8rem;font-weight:500}
    .sc-wip{background:rgba(244,162,97,.12);border:1px solid rgba(244,162,97,.5);border-radius:12px;
      padding:.8rem 1.05rem;margin-top:1.2rem;max-width:760px;font-size:.9rem;color:#e4dbcf;line-height:1.6}
    /* --- la scene : le coeur de la page --- */
    .sc-scene{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);
      border-left:3px solid #2ec4b6;border-radius:0 16px 16px 0;padding:1.8rem 2rem;margin-top:1.1rem}
    .sc-scene p{margin:0;font-size:1.04rem;line-height:1.78;color:#c9d8e6;max-width:62ch}
    .sc-scene p+p{margin-top:1rem}
    .sc-scene strong{color:#fff}
    .sc-scene .bascule{color:#2ec4b6;font-weight:600}
    /* --- avant / apres --- */
    .sc-av{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:1rem;margin-top:1.1rem}
    .sc-av>div{border-radius:14px;padding:1.25rem 1.4rem;border:1px solid rgba(255,255,255,.1)}
    .sc-av .avant{background:rgba(248,81,73,.06);border-color:rgba(248,81,73,.28)}
    .sc-av .apres{background:rgba(46,196,182,.07);border-color:rgba(46,196,182,.32)}
    .sc-av h4{margin:0 0 .65rem;font-family:"Space Grotesk",sans-serif;font-size:1rem;color:#fff}
    .sc-av ul{margin:0;padding-left:1.1rem}
    .sc-av li{font-size:.9rem;color:#c9d8e6;line-height:1.6;margin-bottom:.4rem}
    /* --- les trois questions --- */
    .sc-q{display:grid;grid-template-columns:repeat(auto-fit,minmax(255px,1fr));gap:1rem;margin-top:1.1rem}
    .sc-q>div{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.09);
      border-radius:14px;padding:1.3rem 1.4rem}
    .sc-q .num{font-size:.72rem;font-weight:700;letter-spacing:.12em;color:#5a6f83}
    .sc-q h4{margin:.35rem 0 .45rem;font-family:"Space Grotesk",sans-serif;color:#fff;font-size:1.02rem}
    .sc-q p{margin:0;font-size:.875rem;color:#9db2c7;line-height:1.6}
    /* --- la limite, dite avant qu on la decouvre --- */
    .sc-limite{background:rgba(244,162,97,.09);border:1px solid rgba(244,162,97,.4);border-radius:14px;
      padding:1.4rem 1.6rem;margin-top:1.1rem}
    .sc-limite p{margin:0;font-size:.95rem;line-height:1.7;color:#e4dbcf;max-width:64ch}
    /* --- appel + autres secteurs --- */
    .sc-portes{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1rem;margin-top:1.1rem}
    .sc-porte{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:14px;
      padding:1.4rem 1.5rem}
    .sc-porte h4{margin:0 0 .4rem;font-family:"Space Grotesk",sans-serif;color:#fff;font-size:1.02rem}
    .sc-porte p{margin:0 0 .9rem;font-size:.88rem;color:#9db2c7;line-height:1.6}
    .sc-autres{display:flex;gap:.55rem;flex-wrap:wrap;margin-top:1.4rem}
    .sc-autres a{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:99px;
      padding:.42rem .95rem;font-size:.84rem;color:#c9d8e6;text-decoration:none;transition:border-color .2s}
    .sc-autres a:hover{border-color:rgba(46,196,182,.5)}"""

# L ordre des secteurs, partage par toutes les pages : chacune montre les cinq
# autres. Une porte doit toujours en ouvrir d autres.
SECTEURS = [
    ("rezilta-entreprises.html", "🏢 Entreprises", "sc.n_ent"),
    ("rezilta-banques.html", "🏦 Banques et microfinance", "sc.n_ban"),
    ("rezilta-laboratoires.html", "🔬 Laboratoires et recherche", "sc.n_lab"),
    ("rezilta-programmes.html", "🤝 ONG, programmes et bailleurs", "sc.n_ong"),
    ("rezilta-institutions.html", "🏛 Institutions et collectivités", "sc.n_ins"),
    ("rezilta-ecoles.html", "🎓 Écoles et universités", "sc.n_eco"),
]


def construire(fichier, spec):
    src = io.open(os.path.join(RACINE, "rezilta.html"), encoding="utf-8").read()
    tete = src[:src.index("  <style>")]
    entete = re.search(r"<header>.*?</header>", src, re.S).group(0)
    pied = re.search(r"<footer>.*?</footer>", src, re.S).group(0)
    scripts = src[src.index('<script src="assets/script.js'):src.index("</body>")]

    tete = tete.replace(
        "<title>Rezilta — la plateforme de données, d'analyse et de preuve | Atmart</title>",
        f"<title>{spec['titre_onglet']}</title>")
    tete = re.sub(r'<meta name="description" content="[^"]*" />',
                  f'<meta name="description" content="{spec["meta"]}" />', tete, count=1)
    entete = entete.replace('<a href="rezilta.html" class="active">', '<a href="rezilta.html">')

    p = spec["prefixe"]
    o = [tete, "  <style>\n" + CSS + "\n  </style>\n</head>\n<body>\n", entete + "\n"]
    a = o.append

    a(f'''
<section class="hero" style="padding-bottom:1.1rem">
  <div class="container">
    <p class="kreyol" data-i18n="{p}.fil">{spec["fil"]}</p>
    <h1>{spec["h1"]}</h1>
    <div class="aka"><b data-i18n="{p}.aka">{spec["aka"]}</b><small data-i18n="sc.aka_s">Rezilta — la plateforme de données, d'analyse et de preuve</small></div>
    <p class="lead" data-i18n-html="{p}.lead">{spec["lead"]}</p>
    <div class="sc-badges">
''')
    for i, b in enumerate(spec["badges"], 1):
        a(f'      <span class="sc-badge" data-i18n="{p}.bg{i}">{b}</span>\n')
    a(f'''    </div>
    <div class="sc-wip" data-i18n-html="sc.wip">🚧 <strong>Rezilta est en construction.</strong> Ce que vous lisez est ce que nous nous engageons à livrer. Le <a href="rezilta.html#offre" style="color:#2ec4b6">programme pilote</a> est ouvert aux organisations qui veulent le construire avec nous, sur leurs vraies données.</div>
    <div style="margin-top:1.2rem">
      <a href="mailto:sales@atmart.ltd?subject={spec['sujet']}" class="btn btn-primary" data-i18n="sc.cta1">Parler de mon cas</a>
      <a href="rezilta.html" class="btn btn-outline" style="margin-left:.6rem" data-i18n="sc.cta2">Voir la plateforme</a>
    </div>
  </div>
</section>

<section style="padding-top:.4rem">
  <div class="container">
    <div class="section-head"><h2 data-i18n="{p}.sc_t">{spec["scene_titre"]}</h2></div>
    <div class="sc-scene">
      <p data-i18n-html="{p}.sc_1">{spec["scene_1"]}</p>
      <p data-i18n-html="{p}.sc_2">{spec["scene_2"]}</p>
    </div>
  </div>
</section>

<section style="padding-top:1.3rem">
  <div class="container">
    <div class="section-head"><h2 data-i18n="sc.av_t">Ce que vous apportez, ce que vous repartez avec</h2>
      <p data-i18n="sc.av_d">Vos données restent les vôtres : Rezilta ne les revend pas, ne les mélange pas avec celles d'un autre client, et vous les rend en formats ouverts à tout moment.</p></div>
    <div class="sc-av">
      <div class="avant">
        <h4 data-i18n="sc.av_a">Ce que vous apportez</h4>
        <ul>
''')
    for i, x in enumerate(spec["apporte"], 1):
        a(f'          <li data-i18n="{p}.ap{i}">{x}</li>\n')
    a(f'''        </ul>
      </div>
      <div class="apres">
        <h4 data-i18n="sc.av_r">Ce que vous repartez avec</h4>
        <ul>
''')
    for i, x in enumerate(spec["repart"], 1):
        a(f'          <li data-i18n="{p}.re{i}">{x}</li>\n')
    a(f'''        </ul>
      </div>
    </div>
  </div>
</section>

<section style="padding-top:1.3rem">
  <div class="container">
    <div class="section-head"><h2 data-i18n="{p}.q_t">{spec["questions_titre"]}</h2>
      <p data-i18n="sc.q_d">Trois questions que ce métier pose vraiment à ses données — et ce que l'outil en fait.</p></div>
    <div class="sc-q">
''')
    for i, q in enumerate(spec["questions"], 1):
        a(f'''      <div><span class="num">QUESTION {i}</span>
        <h4 data-i18n="{p}.q{i}_t">{q["titre"]}</h4>
        <p data-i18n="{p}.q{i}_d">{q["texte"]}</p>
      </div>
''')
    a(f'''    </div>
  </div>
</section>

<section style="padding-top:1.3rem">
  <div class="container">
    <div class="section-head"><h2 data-i18n="sc.li_t">Ce que nous ne promettons pas</h2></div>
    <div class="sc-limite">
      <p data-i18n-html="{p}.li">{spec["limite"]}</p>
    </div>
  </div>
</section>

<section style="padding-top:1.3rem;padding-bottom:2rem">
  <div class="container">
    <div class="section-head"><h2 data-i18n="sc.ap_t">Aller plus loin</h2></div>
    <div class="sc-portes">
      <div class="sc-porte">
        <h4 data-i18n="sc.ap1_t">Voir l'outil sur vos données</h4>
        <p data-i18n="sc.ap1_d">Vous apportez un fichier et une question qui compte ; nous montrons ce que l'outil en fait, sur vos chiffres et pas sur une démonstration.</p>
        <a href="mailto:sales@atmart.ltd?subject={spec['sujet']}" class="btn btn-primary" data-i18n="sc.ap1_c">Demander une démonstration</a>
      </div>
      <div class="sc-porte">
        <h4 data-i18n="sc.ap2_t">Comprendre la méthode</h4>
        <p data-i18n="sc.ap2_d">Ce que le moteur refuse de conclure, pourquoi une donnée manquante est une ligne, et comment un chiffre remonte à sa source.</p>
        <a href="rezilta.html" class="btn btn-outline" data-i18n="sc.ap2_c">Lire la plateforme</a>
      </div>
    </div>
    <div class="sc-autres">
''')
    for lien, libelle, cle in SECTEURS:
        if lien != fichier:
            a(f'      <a href="{lien}" data-i18n="{cle}">{libelle}</a>\n')
    a('      <a href="rezilta-collecte.html" data-i18n="sc.n_out">📡 Les outils</a>\n')
    a("    </div>\n  </div>\n</section>\n\n")
    a(pied + "\n\n" + scripts + "</body>\n</html>\n")
    return "".join(o)


if __name__ == "__main__":
    from secteurs_specs import PAGES
    for nom, spec in PAGES.items():
        html = construire(nom, spec)
        io.open(os.path.join(RACINE, nom), "w", encoding="utf-8", newline="\n").write(html)
        mots = len(re.sub(r"<[^>]+>", " ", html[html.index("<section"):]).split())
        print("%-30s %6d octets · ~%d mots" % (nom, len(html), mots))
