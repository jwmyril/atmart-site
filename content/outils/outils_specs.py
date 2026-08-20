# -*- coding: utf-8 -*-
"""
Le contenu des pages d outil. Le squelette vit dans _generateur.py ; ici, rien
que les mots.

Regle de longueur : ~550 mots visibles par page. Une page d outil ne redit pas
la plateforme — elle montre UN geste, et laisse la page mere porter la doctrine.
"""

# Les visuels des sections alternees : dessines pour l idee precise dont on
# parle. Un pictogramme generique ne montrerait rien.

VIS_ABSENCE = """<svg viewBox="0 0 260 130" fill="none" stroke="currentColor" stroke-width="2"
  stroke-linecap="round" aria-hidden="true">
  <rect x="10" y="16" width="110" height="98" rx="4" opacity=".5"/>
  <path d="M10 40h110M10 64h110M10 88h110M46 16v98" opacity=".35"/>
  <rect x="12" y="42" width="32" height="20" fill="currentColor" opacity=".08"/>
  <path d="M20 46l16 12M36 46l-16 12" opacity=".7"/>
  <path d="M130 65h26M150 59l6 6-6 6" opacity=".8"/>
  <rect x="166" y="30" width="84" height="70" rx="4"/>
  <path d="M178 50h60M178 66h60M178 82h38" opacity=".55"/>
  <circle cx="178" cy="50" r="3" fill="currentColor"/>
  <circle cx="178" cy="66" r="3" fill="currentColor"/>
  <circle cx="178" cy="82" r="3" fill="currentColor"/>
</svg>"""

VIS_PROVENANCE = """<svg viewBox="0 0 260 130" fill="none" stroke="currentColor" stroke-width="2"
  stroke-linecap="round" aria-hidden="true">
  <rect x="8" y="46" width="46" height="38" rx="4"/>
  <rect x="80" y="46" width="46" height="38" rx="4"/>
  <rect x="152" y="46" width="46" height="38" rx="4"/>
  <circle cx="234" cy="65" r="18"/>
  <path d="M54 65h26M126 65h26M198 65h18" opacity=".8"/>
  <path d="M74 59l6 6-6 6M146 59l6 6-6 6M210 59l6 6-6 6" opacity=".8"/>
  <path d="M228 65l4 5 8-10"/>
  <path d="M18 58h26M18 68h16M90 58h26M90 68h16M162 58h26M162 68h16" opacity=".45"/>
</svg>"""

VIS_DICTIONNAIRE = """<svg viewBox="0 0 260 130" fill="none" stroke="currentColor" stroke-width="2"
  stroke-linecap="round" aria-hidden="true">
  <rect x="26" y="14" width="150" height="102" rx="5"/>
  <path d="M26 40h150" opacity=".5"/>
  <path d="M44 58h44M44 76h44M44 94h44" opacity=".8"/>
  <path d="M104 58h54M104 76h54" opacity=".4"/>
  <path d="M104 94h20" opacity=".4"/>
  <path d="M132 92l6 6 10-12"/>
  <path d="M188 44h48M188 62h48M188 80h30" opacity=".3"/>
  <circle cx="176" cy="26" r="10" opacity=".6"/>
  <path d="M176 21v6M176 31v1" opacity=".9"/>
</svg>"""

VIS_POURCENT = """<svg viewBox="0 0 260 130" fill="none" stroke="currentColor" stroke-width="2"
  stroke-linecap="round" aria-hidden="true">
  <rect x="10" y="34" width="66" height="30" rx="3"/>
  <rect x="10" y="76" width="66" height="30" rx="3"/>
  <path d="M22 49h18M22 91h18" opacity=".5"/>
  <path d="M56 43v12M50 49h12M50 91h12" opacity=".8"/>
  <path d="M86 70h22" opacity=".7"/>
  <path d="M100 64l6 6-6 6" opacity=".7"/>
  <rect x="118" y="34" width="60" height="72" rx="3" opacity=".35"/>
  <path d="M132 62l32 0M148 46v32" opacity=".5"/>
  <path d="M126 96l44-44" stroke-width="3"/>
  <circle cx="132" cy="58" r="5" opacity=".6"/><circle cx="164" cy="90" r="5" opacity=".6"/>
  <path d="M190 70h20M204 64l6 6-6 6"/>
  <rect x="216" y="52" width="36" height="36" rx="4"/>
  <path d="M226 70h16M234 62v16"/>
</svg>"""

VIS_CLOISON = """<svg viewBox="0 0 260 130" fill="none" stroke="currentColor" stroke-width="2"
  stroke-linecap="round" aria-hidden="true">
  <circle cx="130" cy="26" r="16"/><path d="M124 26l4 4 8-9"/>
  <path d="M130 42v14M52 70V56h156v14" opacity=".7"/>
  <rect x="14" y="70" width="76" height="46" rx="4"/>
  <rect x="170" y="70" width="76" height="46" rx="4"/>
  <path d="M28 86h34M28 100h22M184 86h34M184 100h22" opacity=".5"/>
  <path d="M108 70v46M152 70v46" stroke-dasharray="5 6" opacity=".55"/>
  <path d="M116 93h28" opacity=".25"/>
  <path d="M124 87l-8 6 8 6M136 87l8 6-8 6" opacity=".45"/>
</svg>"""

VIS_COUVERTURE = """<svg viewBox="0 0 260 130" fill="none" stroke="currentColor" stroke-width="2"
  stroke-linecap="round" aria-hidden="true">
  <circle cx="62" cy="65" r="42"/>
  <path d="M62 23a42 42 0 0 1 34 66" stroke-width="7"/>
  <path d="M62 55v20M62 45v3" opacity=".7"/>
  <path d="M118 55h28M118 75h28" opacity=".7"/>
  <path d="M138 49l8 6-8 6M138 69l8 6-8 6" opacity=".7"/>
  <rect x="158" y="30" width="92" height="70" rx="4"/>
  <path d="M170 50h68M170 66h68M170 82h44" opacity=".5"/>
  <path d="M226 78l6 6 12-14"/>
</svg>"""


COLLECTE = dict(
    prefixe="oc",
    titre_onglet="Collecter les données de terrain — Rezilta | Atmart",
    meta="Rezilta, outil de collecte pour le suivi-évaluation : la fiche d'indicateur d'abord, le formulaire ensuite. Distribution par lien, code ou XLSForm vers Kobo/ODK, saisie hors ligne sur téléphone, contrôle qualité à l'arrivée. Chaque valeur manquante devient une absence documentée avec sa raison, chaque chiffre remonte à sa source.",
    sujet_courriel="Rezilta%20-%20collecte%20de%20donnees",
    fil="Une donnée qu'il faut retravailler n'a pas été collectée, elle a été ramassée.",
    h1="Collecter les données de terrain",
    aka="suivi, évaluation et apprentissage",
    lead="Un formulaire ne se dessine pas en premier : il se déduit des indicateurs qu'on a décidé de suivre. Rezilta part de la fiche d'indicateur, en tire la collecte, et vérifie ce qui rentre — pour que la donnée arrive <strong>utilisable</strong>, pas à reprendre.",
    badges=["📐 Fiche d'indicateur d'abord", "📱 Saisie hors ligne", "🔁 Export vers Kobo/ODK",
            "🔍 Contrôle à l'arrivée", "🗣 Dans la langue de l'équipe"],
    cta1="Rejoindre le programme pilote",
    gestes_titre="Quatre gestes, dans cet ordre",
    gestes_sous="L'ordre n'est pas un détail de présentation : c'est lui qui évite de collecter des questions qui ne serviront à rien.",
    gestes=[
        dict(picto="concevoir", titre="Concevoir",
             texte="L'indicateur d'abord : définition, unité, désagrégation attendue, périodicité. Le formulaire se déduit de cette fiche. Une question qui ne sert aucun indicateur ne rentre pas."),
        dict(picto="distribuer", titre="Distribuer",
             texte="Un lien, un code à dicter au téléphone, ou un export XLSForm vers Kobo et ODK. L'équipe de terrain reçoit ce qu'elle sait déjà utiliser."),
        dict(picto="remplir", titre="Remplir",
             texte="Hors ligne, sur téléphone, dans la langue de l'équipe. La synchronisation attend le réseau ; le terrain, lui, n'attend pas."),
        dict(picto="controler", titre="Contrôler",
             texte="Les anomalies sont signalées à l'arrivée, avec le remède. Corriger une saisie le jour même coûte une minute ; six mois plus tard, c'est une enquête."),
    ],
    alt_titre="Ce qui distingue cette collecte",
    alternees=[
        dict(titre="Une case vide n'est pas un vide",
             texte="Chaque valeur manquante devient une <strong>ligne</strong> avec sa raison : jamais collectée, refus de répondre, sans objet, hors période. « Jamais collecté » et « refus de répondre » n'appellent pas la même analyse — et un <em>NULL</em> ne dit ni l'un ni l'autre.",
             visuel=VIS_ABSENCE),
        dict(titre="Chaque valeur porte sa source",
             texte="Source, extraction datée, empreinte, transformation : la chaîne ne se rompt pas. Du chiffre publié on remonte à la ligne brute en un clic. C'est ce que réclame un audit, et ce qu'aucun tableur ne tient dans la durée.",
             visuel=VIS_PROVENANCE),
        dict(titre="Ce qui est écrit survit à qui l'a écrit",
             texte="Définition, unité, méthode de calcul : tant qu'elles manquent, la variable reste utilisable mais <strong>signalée dans les rapports</strong>. Une convention orale disparaît avec la personne qui la connaissait ; une définition écrite, non.",
             visuel=VIS_DICTIONNAIRE),
    ],
    brancher_titre="Se brancher sur ce qui existe déjà",
    brancher_sous="L'objectif n'est pas de remplacer vos outils, c'est de les relier. Personne ne change de système de collecte pour faire plaisir à un logiciel.",
    brancher=[
        dict(titre="Connexion directe",
             items=["MySQL et MariaDB", "PostgreSQL", "SQL Server", "API REST"]),
        dict(titre="Par fichier",
             items=["Excel et CSV, séparateur et virgule décimale reconnus",
                    "XLSForm — aller et retour avec Kobo et ODK",
                    "Exports de vos outils actuels, sans reformatage manuel"]),
    ],
    impact_titre="Ce que ça change dans une équipe",
    impact_1="Chaque outil de Rezilta simplifie un geste, et rend <strong>une personne de plus</strong> capable de le faire seule. Quand la collecte cesse d'être l'affaire d'un seul expert, l'agent de terrain corrige sa propre saisie le jour même, le responsable voit l'écart quand il apparaît au lieu de le découvrir au rapport, et le chargé de suivi passe son temps à comprendre plutôt qu'à recopier.",
    impact_2="C'est là que se joue l'impact réel : non pas dans un tableau de bord de plus, mais dans le nombre de personnes qui, dans une entreprise, une institution ou un projet, tiennent enfin <strong>l'outil de leur métier</strong>.",
    autres_outils=[("rezilta-indicateurs.html", "→ Agréger les indicateurs", "oc.suite1"),
                   ("rezilta.html", "→ Toute la plateforme", "oc.suite2")],
)


INDICATEURS = dict(
    prefixe="oi",
    titre_onglet="Agréger les indicateurs — Rezilta | Atmart",
    meta="Rezilta, agrégation d'indicateurs pour portefeuilles de projets : une fiche d'indicateur commune, des relevés rattachés, une règle d'agrégation écrite à l'avance (somme, moyenne pondérée, dernier relevé, taux recalculé), et la désagrégation par sexe, âge et zone. Consolidation sans décloisonnement : le bailleur voit le portefeuille, chaque partenaire ne voit que le sien.",
    sujet_courriel="Rezilta%20-%20agregation%20d%27indicateurs",
    fil="Additionner suppose qu'on soit d'accord sur ce qu'on additionne.",
    h1="Agréger les indicateurs",
    aka="portefeuille de projets",
    lead="Trois projets mesurent « personnes formées ». Trois définitions, trois périodicités, trois façons de compter une personne vue deux fois. L'agrégation n'est pas une somme : c'est d'abord <strong>un accord</strong>, et Rezilta le rend explicite avant qu'il soit trop tard.",
    badges=["📏 Une définition partagée", "⚖️ Règle d'agrégation écrite",
            "🔀 Désagrégation sexe · âge · zone", "🔒 Accès cloisonné", "📊 Vers Power BI"],
    cta1="Rejoindre le programme pilote",
    gestes_titre="Quatre gestes, dans cet ordre",
    gestes_sous="Les trois quarts des erreurs d'agrégation viennent d'un désaccord de définition qu'on découvre au moment de faire le total.",
    gestes=[
        dict(picto="definir", titre="Définir",
             texte="Un indicateur, une fiche : définition, unité, méthode de calcul, désagrégations attendues. Elle vaut pour tout le portefeuille, pas pour un projet."),
        dict(picto="rattacher", titre="Rattacher",
             texte="Chaque projet rattache ses relevés à l'indicateur commun. Ce qui ne s'y rattache pas reste local — et c'est très bien : tout n'a pas vocation à être consolidé."),
        dict(picto="agreger", titre="Agréger",
             texte="La règle est écrite avec l'indicateur : somme, moyenne pondérée, dernier relevé, taux recalculé. Jamais devinée au moment de produire le rapport."),
        dict(picto="desagreger", titre="Désagréger",
             texte="Sexe, âge, zone, statut. Un total cache une inégalité ; le découpage la montre. C'est souvent là qu'est l'information utile."),
    ],
    alt_titre="Trois pièges que l'outil refuse de vous laisser faire",
    alternees=[
        dict(titre="On n'additionne pas des pourcentages",
             texte="Deux projets à 80 % et 40 % ne font pas 60 % : tout dépend de leurs effectifs. Rezilta recalcule le taux depuis les <strong>numérateurs et dénominateurs</strong>, et refuse la moyenne de taux là où elle n'a pas de sens. C'est l'erreur la plus fréquente des rapports consolidés, et la plus invisible.",
             visuel=VIS_POURCENT),
        dict(titre="Consolider n'est pas décloisonner",
             texte="Le bailleur voit le portefeuille ; chaque partenaire ne voit que le sien. Une même règle de calcul, des accès séparés. Un réseau qui ne peut pas garantir ce cloisonnement ne peut pas demander à ses membres de tout remonter.",
             visuel=VIS_CLOISON),
        dict(titre="Un total sans sa couverture n'est pas un total",
             texte="Un chiffre consolidé sait de quels relevés il vient, à quelle date, et surtout <strong>lesquels manquaient</strong>. « 12 400 personnes » sur huit projets sur douze ne veut pas dire la même chose que sur douze sur douze — et la différence doit se lire à côté du chiffre.",
             visuel=VIS_COUVERTURE),
    ],
    brancher_titre="Ce que ça produit",
    brancher_sous="Le résultat sort dans le format attendu par celui qui le lit, avec la provenance et la couverture attachées.",
    brancher=[
        dict(titre="Pour rendre compte",
             items=["Tableau de suivi des indicateurs : réalisé, % atteint, écart",
                    "Rapport au format du destinataire, structure fixe",
                    "Narratif d'écart assisté, corrigé par vous"]),
        dict(titre="Pour analyser plus loin",
             items=["Modèle Power BI avec sécurité au niveau des lignes",
                    "Excel portant les données et la méthode",
                    "Jeu de données propre et script R ou Python reproductible"]),
    ],
    impact_titre="Ce que ça change dans un réseau",
    impact_1="Chaque outil de Rezilta simplifie un geste, et rend <strong>une personne de plus</strong> capable de le faire seule. Quand la définition d'un indicateur cesse d'être un débat de fin de trimestre, le chargé de projet remplit sans hésiter, le coordonnateur consolide sans rappeler personne, et le bailleur lit un total dont il connaît la couverture.",
    impact_2="Imaginez ce que devient une organisation où chacun tient enfin <strong>l'outil de son métier</strong> : le temps qu'on passait à harmoniser des tableaux revient au travail lui-même.",
    autres_outils=[("rezilta-collecte.html", "→ Collecter les données de terrain", "oi.suite1"),
                   ("rezilta.html", "→ Toute la plateforme", "oi.suite2")],
)


PAGES = {
    "rezilta-collecte.html": COLLECTE,
    "rezilta-indicateurs.html": INDICATEURS,
}
