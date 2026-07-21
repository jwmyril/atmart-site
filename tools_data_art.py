# -*- coding: utf-8 -*-
"""Data art : « Liy Lavi » — chaque courbe est un pays, sa hauteur = la part du PIB
que sa diaspora renvoie. Genere a partir des vraies valeurs Banque mondiale."""
import csv, io, os, collections

os.chdir(r"C:\Users\USUARIO\Power_BI_Claude\Atmart_website")
rows = list(csv.DictReader(io.open("data/transferts_diaspora_2000_2025.csv", encoding="utf-8-sig")))

data = collections.OrderedDict()
for x in rows:
    v = x["part_pib_pct"].strip()
    if not v:
        continue
    data.setdefault(x["pays"], []).append((int(x["annee"]), float(v)))
for k in data:
    data[k].sort()

NOMS = {"Haiti": "Ayiti", "Jamaica": "Jamayik", "Dominican Republic": "Repiblik Dominiken",
        "Senegal": "Senegal", "Togo": "Togo", "Mali": "Mali",
        "Cote d'Ivoire": "Kot Divwa", "Cameroon": "Kamewoun"}
# ordre : du plus fort au plus faible (dernier point)
ordre = sorted(data, key=lambda k: -data[k][-1][1])

W, H = 1000, 1500
M = {"t": 285, "b": 155, "l": 70, "r": 88}
PW = W - M["l"] - M["r"]
BAND = (H - M["t"] - M["b"]) / len(ordre)
Y0, Y1 = 2000, 2024
VMAX = 24.0
AMP = BAND * 1.25          # chevauchement leger : tissage sans confusion

def x_of(a):
    return M["l"] + (a - Y0) / (Y1 - Y0) * PW

def smooth(pts):
    """Catmull-Rom -> Bezier cubique."""
    if len(pts) < 2:
        return ""
    d = "M %.1f %.1f" % pts[0]
    for i in range(len(pts) - 1):
        p0 = pts[i - 1] if i else pts[0]
        p1, p2 = pts[i], pts[i + 1]
        p3 = pts[i + 2] if i + 2 < len(pts) else p2
        c1 = (p1[0] + (p2[0] - p0[0]) / 6.0, p1[1] + (p2[1] - p0[1]) / 6.0)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6.0, p2[1] - (p3[1] - p1[1]) / 6.0)
        d += " C %.1f %.1f, %.1f %.1f, %.1f %.1f" % (c1[0], c1[1], c2[0], c2[1], p2[0], p2[1])
    return d

svg = []
A = svg.append
A('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" width="%d" height="%d" '
  'font-family="Georgia, serif" role="img" aria-label="Liy Lavi — data art Atmart">' % (W, H, W, H))
A('<defs>')
A('<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">'
  '<stop offset="0" stop-color="#081426"/><stop offset="0.55" stop-color="#0b1c33"/>'
  '<stop offset="1" stop-color="#0a1626"/></linearGradient>')
for i, k in enumerate(ordre):
    t = i / max(1, len(ordre) - 1)
    if k == "Haiti":
        c1, c2 = "#f4a261", "#e76f51"
    else:
        r = int(46 + t * 40); g = int(196 - t * 70); b = int(182 - t * 30)
        c1 = "#%02x%02x%02x" % (r, g, b)
        c2 = "#%02x%02x%02x" % (max(0, r - 24), max(0, g - 60), max(0, b - 40))
    A('<linearGradient id="g%d" x1="0" y1="0" x2="1" y2="0">'
      '<stop offset="0" stop-color="%s" stop-opacity="0.15"/>'
      '<stop offset="0.5" stop-color="%s" stop-opacity="0.85"/>'
      '<stop offset="1" stop-color="%s" stop-opacity="0.95"/></linearGradient>' % (i, c2, c1, c1))
    A('<linearGradient id="f%d" x1="0" y1="0" x2="0" y2="1">'
      '<stop offset="0" stop-color="%s" stop-opacity="0.30"/>'
      '<stop offset="1" stop-color="%s" stop-opacity="0"/></linearGradient>' % (i, c1, c1))
A('</defs>')
A('<rect width="%d" height="%d" fill="url(#bg)"/>' % (W, H))

# poussiere de donnees : un point par observation reelle, tres discret
A('<g fill="#2ec4b6" opacity="0.10">')
for i, k in enumerate(ordre):
    base = M["t"] + BAND * (i + 1)
    for a, v in data[k]:
        A('<circle cx="%.1f" cy="%.1f" r="1.4"/>' % (x_of(a), base - v / VMAX * AMP))
A('</g>')

# les courbes, du fond vers l'avant
for i, k in enumerate(ordre):
    base = M["t"] + BAND * (i + 1)
    pts = [(x_of(a), base - v / VMAX * AMP) for a, v in data[k]]
    d = smooth(pts)
    A('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="#1e3a5f" stroke-width="1" opacity="0.55"/>'
      % (M["l"], base, W - M["r"], base))
    A('<path d="%s L %.1f %.1f L %.1f %.1f Z" fill="url(#f%d)"/>'
      % (d, pts[-1][0], base, pts[0][0], base, i))
    A('<path d="%s" fill="none" stroke="url(#g%d)" stroke-width="%.1f" '
      'stroke-linecap="round" stroke-linejoin="round"/>'
      % (d, i, 3.4 if k == "Haiti" else 2.0))
    last = pts[-1]
    A('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s"/>'
      % (last[0], last[1], 4.5 if k == "Haiti" else 3.0,
         "#f4a261" if k == "Haiti" else "#2ec4b6"))
    col = "#f4a261" if k == "Haiti" else "#2ec4b6"
    A('<circle cx="%.1f" cy="%.1f" r="3.2" fill="%s" opacity="0.9"/>' % (M["l"] + 4, base + 15, col))
    A('<text x="%.1f" y="%.1f" font-size="15" fill="%s" opacity="%.2f" '
      'letter-spacing="1.5">%s</text>'
      % (M["l"] + 16, base + 20, "#f4a261" if k == "Haiti" else "#7f97ad",
         1 if k == "Haiti" else 0.72, NOMS[k].upper()))
    # serie qui s'arrete avant 2024 : on le dit au lieu de laisser croire a une chute
    if data[k][-1][0] < Y1:
        A('<text x="%.1f" y="%.1f" font-size="11" fill="#6f8296" opacity="0.9" font-style="italic">'
          'done rive %d</text>' % (last[0] + 8, base + 20, data[k][-1][0]))
    A('<text x="%.1f" y="%.1f" font-size="13" text-anchor="end" fill="%s" opacity="0.85">%.1f%%</text>'
      % (W - 14, last[1] + 4, "#f4a261" if k == "Haiti" else "#8fb9c9", data[k][-1][1]))

# titre
A('<text x="%d" y="112" font-size="62" fill="#ffffff" letter-spacing="3">Liy Lavi</text>' % M["l"])
A('<text x="%d" y="152" font-size="19" fill="#f4a261" font-style="italic">'
  'Chak koub se yon dyaspora k ap kenbe yon peyi.</text>' % M["l"])
A('<text x="%d" y="188" font-size="14" fill="#8fa6bd">'
  'Transfè dyaspora yo an pousantaj PIB · 8 peyi · 2000–2024</text>' % M["l"])
A('<line x1="%d" y1="212" x2="%d" y2="212" stroke="#2ec4b6" stroke-width="1" opacity="0.4"/>'
  % (M["l"], W - M["r"]))

# axe des annees
yb = H - M["b"] + 26
for a in (2000, 2005, 2010, 2015, 2020, 2024):
    A('<text x="%.1f" y="%d" font-size="13" fill="#6f8296" text-anchor="middle">%d</text>'
      % (x_of(a), yb, a))
A('<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="#1e3a5f" stroke-width="1"/>'
  % (M["l"], yb - 20, W - M["r"], yb - 20))

# pied
A('<text x="%d" y="%d" font-size="12.5" fill="#6f8296">'
  'Done : Bank Mondyal (WDI) · Zèv done Atmart LLC · atmart.ltd</text>' % (M["l"], H - 52))
A('<text x="%d" y="%d" font-size="12.5" fill="#6f8296" text-anchor="end">'
  'Ayiti : 22,4%% an 2020 — pi wo a</text>' % (W - M["r"], H - 52))
A('</svg>')

out = "assets/art/liy-lavi.svg"
os.makedirs("assets/art", exist_ok=True)
io.open(out, "w", encoding="utf-8").write("\n".join(svg))
print("genere :", out, "-", os.path.getsize(out), "octets")
print("pays traces :", len(ordre), "|", ", ".join(NOMS[k] for k in ordre))
