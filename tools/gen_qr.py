# -*- coding: utf-8 -*-
"""QR codes des URL courtes permanentes ATM.

L'URL imprimee ne doit jamais changer : on encode l'adresse courte
(https://atmart.ltd/o/<slug>), pas la fiche. La destination pourra evoluer,
le support imprime restera valable.

Correction d'erreur H (30 %) : un QR imprime sur du papier mat, plie ou
legerement sali doit rester lisible. Sortie en PNG (impression) et SVG
(vectoriel, pour les grands formats).
"""
import json
from pathlib import Path

import qrcode
from qrcode.image.svg import SvgPathImage

SITE = Path(__file__).resolve().parent.parent
OUT = SITE / "assets" / "atelier" / "qr"
OUT.mkdir(parents=True, exist_ok=True)

for jf in sorted((SITE / "assets" / "atelier" / "fiches").glob("*.json")):
    slug = jf.stem
    f = json.loads(jf.read_text(encoding="utf-8"))
    url = f.get("url_courte", f"https://atmart.ltd/o/{slug}")

    q = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H, box_size=20, border=4)
    q.add_data(url)
    q.make(fit=True)
    q.make_image(fill_color="#060c15", back_color="white").save(OUT / f"{slug}.png")

    q2 = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H, box_size=20, border=4)
    q2.add_data(url)
    q2.make(fit=True)
    q2.make_image(image_factory=SvgPathImage).save(OUT / f"{slug}.svg")

    png = (OUT / f"{slug}.png").stat().st_size
    print(f"{slug}: {url}  ->  {slug}.png ({round(png/1024)} Ko) + {slug}.svg  | version {q.version}, correction H")
