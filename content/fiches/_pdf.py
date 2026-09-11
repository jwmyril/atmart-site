# -*- coding: utf-8 -*-
"""Convertit les fiches HTML en PDF A4 d'une page — et VÉRIFIE le résultat.

    python content/fiches/_pdf.py            régénère les six fiches
    python content/fiches/_pdf.py --verifier échoue si un PDF est mauvais

POURQUOI CE FICHIER EXISTE
--------------------------
Le 19/08/2026, la conversion a produit six PDF qui contenaient tous la même
chose : **la page d'erreur de Chrome**, « Your file couldn't be accessed ».
Chrome n'avait pas su ouvrir le chemin qu'on lui passait, il a affiché son
erreur, et `--print-to-pdf` a imprimé fidèlement cette erreur.

Ces six fichiers sont restés en ligne sur atmart.ltd pendant trois semaines.
La commande avait réussi — code de sortie 0, fichier écrit, taille plausible.
Rien, nulle part, ne disait que le contenu était faux.

**LA LEÇON : `--print-to-pdf` réussit toujours.** Il imprime ce que Chrome
affiche, et Chrome affiche toujours quelque chose. Un code de sortie nul ne
prouve donc rien du tout. La seule preuve est de ROUVRIR le PDF et d'y
chercher un mot qui ne peut venir que de la fiche.

Deux précautions en découlent :
  · l'URL est construite en `file:///C:/...` avec des barres obliques — c'est
    le chemin Windows brut qui avait échoué ;
  · chaque PDF est relu après écriture, et un fichier qui ne contient pas son
    texte attendu est SUPPRIMÉ plutôt que laissé en place. Un PDF absent se
    remarque ; un PDF faux ne se remarque pas.
"""
import io
import os
import shutil
import subprocess
import sys
import tempfile

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:                                            # noqa: BLE001
    pass

ICI = os.path.dirname(os.path.abspath(__file__))
RACINE = os.path.dirname(os.path.dirname(ICI))
SORTIE = os.path.join(RACINE, "assets", "fiches")

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

# source HTML -> PDF publié. Le diagnostic anglais change de nom au passage :
# la marque est « AI Compass » en anglais, « Boussole IA » en français.
FICHES = [
    ("boussole-ia-diagnostic-fr.html",     "boussole-ia-diagnostic-fr.pdf",     "Diagnostic"),
    ("boussole-ia-pilote-fr.html",         "boussole-ia-pilote-fr.pdf",         "Pilote"),
    ("boussole-ia-accompagnement-fr.html", "boussole-ia-accompagnement-fr.pdf", "Accompagnement"),
    ("boussole-ia-diagnostic-en.html",     "ai-compass-diagnostic-en.pdf",      "Diagnostic"),
    ("ai-compass-pilot-en.html",           "ai-compass-pilot-en.pdf",           "Pilot"),
    ("ai-compass-support-en.html",         "ai-compass-support-en.pdf",         "Support"),
]

# Ce que Chrome écrit quand il n'a pas pu ouvrir la page. Si ça se retrouve
# dans un PDF, c'est l'erreur de 2026-08-19 qui recommence.
ERREUR = "couldn't be accessed"


def url(chemin):
    """file:///C:/... — jamais le chemin Windows brut, c'est ce qui a échoué."""
    return "file:///" + os.path.abspath(chemin).replace("\\", "/")


def lire(pdf):
    from pypdf import PdfReader
    r = PdfReader(pdf)
    return len(r.pages), "\n".join((p.extract_text() or "") for p in r.pages)


def convertir(src, dst):
    profil = tempfile.mkdtemp(prefix="fiche-pdf-")
    try:
        subprocess.run(
            [CHROME, "--headless=new", "--disable-gpu", "--no-sandbox",
             "--no-pdf-header-footer", "--user-data-dir=" + profil,
             "--print-to-pdf=" + dst, "--virtual-time-budget=4000",
             url(src)],
            capture_output=True, text=True, timeout=120,
        )
    finally:
        shutil.rmtree(profil, ignore_errors=True)


def main():
    verifier = "--verifier" in sys.argv
    os.makedirs(SORTIE, exist_ok=True)
    mauvais = []

    for nom_src, nom_pdf, attendu in FICHES:
        src = os.path.join(ICI, nom_src)
        dst = os.path.join(SORTIE, nom_pdf)

        if not os.path.exists(src):
            print("  %-34s SOURCE ABSENTE" % nom_pdf)
            mauvais.append(nom_pdf)
            continue

        if not verifier:
            convertir(src, dst)

        if not os.path.exists(dst):
            print("  %-34s AUCUN FICHIER PRODUIT" % nom_pdf)
            mauvais.append(nom_pdf)
            continue

        try:
            pages, texte = lire(dst)
        except Exception as e:                               # noqa: BLE001
            print("  %-34s ILLISIBLE : %s" % (nom_pdf, e))
            mauvais.append(nom_pdf)
            continue

        # ⚠️ LA VÉRIFICATION QUI MANQUAIT. Chrome imprime toujours quelque
        # chose : la seule preuve est de retrouver dans le PDF un mot qui ne
        # peut venir que de la fiche.
        if ERREUR in texte:
            print("  %-34s PAGE D'ERREUR DE CHROME — supprimé" % nom_pdf)
            if not verifier:
                os.remove(dst)
            mauvais.append(nom_pdf)
            continue
        if attendu.lower() not in texte.lower():
            print("  %-34s « %s » introuvable dans le PDF — supprimé"
                  % (nom_pdf, attendu))
            if not verifier:
                os.remove(dst)
            mauvais.append(nom_pdf)
            continue

        ko = os.path.getsize(dst) / 1024.0
        print("  %-34s %d page(s) · %5.0f Ko · %4d car. · « %s » trouvé"
              % (nom_pdf, pages, ko, len(texte), attendu))

    print()
    if mauvais:
        print("  %d fiche(s) en échec : %s" % (len(mauvais), " ".join(mauvais)))
        return 1
    print("  Les %d fiches sont bonnes." % len(FICHES))
    return 0


if __name__ == "__main__":
    sys.exit(main())
