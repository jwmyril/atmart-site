# -*- coding: utf-8 -*-
"""
Le contenu des six pages de secteur.

REGLE D ECRITURE : chaque page parle a UNE personne, dans SON vocabulaire, et
s ouvre sur un moment qu elle a deja vecu. Pas d architecture, pas de « trois
couches » — ces mots sont a nous, pas a elle.

REGLE D HONNETETE : chaque page dit ce que Rezilta NE fait PAS dans ce secteur.
Une promesse de trop devant une banque ou un laboratoire ferme la porte pour de
bon, et se rattrape moins bien qu un silence.
"""

ENTREPRISES = dict(
    prefixe="se",
    titre_onglet="Rezilta pour les entreprises — décider sur des chiffres qui tiennent | Atmart",
    meta="Rezilta pour les entreprises : consolider des sources qui ne se parlent pas, mesurer l'effet réel d'une campagne ou d'un déploiement, et présenter au comité de direction un chiffre dont on connaît la provenance. Vos données restent les vôtres.",
    sujet="Rezilta%20-%20entreprise",
    fil="La question qui tue en comité : « et ça vient d'où, ce chiffre ? »",
    h1="Rezilta pour les entreprises",
    aka="ventes, opérations, qualité, ressources humaines",
    lead="Vous avez déjà les données — dans le logiciel de gestion, dans trois tableurs et dans la tête de deux personnes. Ce qui manque, c'est de pouvoir <strong>défendre</strong> le chiffre que vous mettez devant la direction.",
    badges=["📊 Sources consolidées", "📈 Effet réel, pas impression", "🔗 Provenance de chaque chiffre"],
    scene_titre="Le mardi du comité de direction",
    scene_1="La campagne s'est terminée en mars. Les ventes ont monté de 12 %. Quelqu'un demande si c'est la campagne ou la saison — et personne ne sait, parce que le tableau qui montre les 12 % a été assemblé à la main la veille, à partir d'un export du logiciel de gestion et d'un fichier que le commercial tient de son côté.",
    scene_2="<span class=\"bascule\">Avec Rezilta</span>, les deux sources sont reliées une fois pour toutes. La comparaison se fait sur la même période l'an dernier, l'outil dit si l'écart tient ou s'il est dans le bruit habituel — et il refuse d'écrire « la campagne a fait monter les ventes » tant que personne n'a nommé le protocole qui le prouverait. Il écrit « les ventes ont été supérieures de… », ce qui est vrai.",
    apporte=[
        "Vos exports de logiciel de gestion, en Excel ou CSV",
        "Vos tableurs de suivi, même en désordre",
        "Vos bases internes, en lecture seule",
        "Une question qui compte pour la direction",
    ],
    repart=[
        "Une chaîne où chaque chiffre remonte à sa ligne d'origine",
        "Un écart testé et chiffré, avec son intervalle",
        "La distinction claire entre un effet et une coïncidence",
        "Un export signé : date, source, méthode, validateur",
    ],
    questions_titre="Ce que vous pourrez enfin trancher",
    questions=[
        dict(titre="La hausse vient-elle de la campagne ou de la saison ?",
             texte="L'outil compare à la même période de l'an dernier et sépare les deux. Sans protocole déclaré, il parle d'écart observé — pas d'effet."),
        dict(titre="Quelle agence décroche vraiment, et depuis quand ?",
             texte="Le découpage par agence, mois et produit montre où l'écart apparaît. Un total cache toujours une dispersion."),
        dict(titre="Ce nouveau processus a-t-il changé quelque chose ?",
             texte="Avant/après sur les mêmes équipes, avec les valeurs extrêmes signalées : quelques dossiers hors norme suffisent à inventer une amélioration."),
    ],
    limite="Rezilta n'est ni un logiciel de gestion, ni un CRM, ni un outil de comptabilité. Il ne remplace pas votre système : il se branche dessus, en lecture. Il ne prévoit pas non plus votre chiffre d'affaires sur cinq ans — une prévision honnête s'arrête là où l'historique s'arrête, et il vous le dira plutôt que de produire une courbe rassurante.",
)

BANQUES = dict(
    prefixe="sb",
    titre_onglet="Rezilta pour les banques et la microfinance — méthode documentée, piste d'audit | Atmart",
    meta="Rezilta pour les banques et institutions de microfinance : analyse de cohortes, portefeuille à risque, modèles de défaut, avec la documentation de méthode et la piste d'audit que réclame tout examen. Installation possible sur vos serveurs.",
    sujet="Rezilta%20-%20banque",
    fil="Un chiffre de portefeuille sans sa méthode écrite ne survit pas au premier examen.",
    h1="Rezilta pour les banques et la microfinance",
    aka="portefeuille, risque, provisionnement",
    lead="Vos chiffres existent. Ce qui manque au moment de l'examen, c'est <strong>la trace</strong> : quelle définition, quelle extraction, quelle date, qui a validé. Rezilta produit cette trace en même temps que le chiffre, pas après.",
    badges=["🔒 Installation sur vos serveurs", "📋 Méthode documentée", "🧾 Piste d'audit complète"],
    scene_titre="La semaine de l'examen",
    scene_1="On demande comment le portefeuille à risque a été calculé au trimestre dernier. Le chiffre est dans un rapport ; le fichier qui l'a produit a été modifié depuis. L'analyste qui l'avait monté a changé de poste. Il faut une semaine pour reconstituer — et la reconstitution ne donne pas exactement le même nombre.",
    scene_2="<span class=\"bascule\">Avec Rezilta</span>, l'extraction du trimestre est scellée et datée, avec son empreinte. La règle de calcul est écrite avec l'indicateur, pas devinée au moment du rapport. On rejoue le calcul et on retrouve le chiffre — au centime. Ce qui prenait une semaine prend un clic.",
    apporte=[
        "Vos extractions du système de gestion, période par période",
        "Vos définitions internes de segments et de statuts",
        "Vos règles de provisionnement, telles qu'elles sont appliquées",
        "Rien d'autre : les données ne quittent pas vos serveurs si vous ne le voulez pas",
    ],
    repart=[
        "Une extraction scellée par période, rejouable à l'identique",
        "La méthode de calcul écrite à côté de chaque indicateur",
        "Un journal d'audit que rien n'efface, pas même la suppression d'un compte",
        "Des analyses de cohortes avec leurs diagnostics attachés",
    ],
    questions_titre="Ce que vous pourrez documenter",
    questions=[
        dict(titre="Quel segment porte réellement le risque ?",
             texte="Une fois l'effet de conjoncture retiré, et avec la précision de l'estimation affichée à côté — pas seulement un classement."),
        dict(titre="Cette cohorte se comporte-t-elle vraiment différemment ?",
             texte="Comparaison par génération de décaissement. Sur des montants très dispersés, l'outil impose la médiane plutôt que la moyenne."),
        dict(titre="D'où vient exactement ce chiffre du trimestre dernier ?",
             texte="De l'indicateur publié à la ligne brute, en passant par l'extraction datée et la transformation appliquée."),
    ],
    limite="Rezilta ne remplace pas la validation réglementaire de vos modèles de risque, ni votre core banking, ni votre contrôle interne. Il ne décide d'aucun octroi de crédit et ne produit aucun score que vous pourriez appliquer sans validation. Il fournit ce que ces procédures réclament et qui manque presque toujours : la méthode écrite, la piste d'audit, les diagnostics et la reproductibilité.",
)

LABORATOIRES = dict(
    prefixe="sl",
    titre_onglet="Rezilta pour les laboratoires et la recherche — reproductibilité et tests multiples | Atmart",
    meta="Rezilta pour les laboratoires et la recherche : comparaison de groupes avec correction pour tests multiples, cartes de contrôle, et reproductibilité complète — les données, le script et la version voyagent ensemble.",
    sujet="Rezilta%20-%20laboratoire",
    fil="Testez vingt variables sans correction, et vous « trouverez » une découverte qui n'existe pas.",
    h1="Rezilta pour les laboratoires et la recherche",
    aka="plans d'expérience, contrôle qualité, publication",
    lead="Le calcul, vous savez le faire. Ce qui coûte du temps, c'est de prouver six mois plus tard <strong>quelle version des données</strong> a produit quelle figure — et de le prouver à un relecteur qui a raison d'être méfiant.",
    badges=["🔁 Reproductible d'un bout à l'autre", "🎯 Correction pour tests multiples", "📦 Données, script et version ensemble"],
    scene_titre="La révision du relecteur",
    scene_1="La revue demande de refaire la figure 3 en excluant deux lots. Le fichier a évolué depuis la soumission, le script a été retouché, et la personne qui l'a écrit est partie. On refait le calcul : la valeur p n'est plus la même, et personne ne sait dire pourquoi.",
    scene_2="<span class=\"bascule\">Avec Rezilta</span>, chaque résultat est un objet rejouable : les données telles qu'elles étaient au moment du calcul, la méthode, la version, et la personne qui a validé. On retire les deux lots, on relance, on obtient le nouveau chiffre — et l'ancien reste consultable, avec sa propre trace.",
    apporte=[
        "Vos relevés d'expérience, en Excel ou CSV",
        "Vos définitions de conditions, de lots et de témoins",
        "Vos exclusions et leurs raisons",
        "La question expérimentale, telle que vous l'avez posée",
    ],
    repart=[
        "Un résultat rejouable, avec les données figées au moment du calcul",
        "La correction pour tests multiples appliquée et annoncée",
        "Taille d'effet et intervalle avant la valeur p, jamais l'inverse",
        "Le jeu de données propre et le script qui reproduit la figure",
    ],
    questions_titre="Ce que l'outil refuse de vous laisser faire",
    questions=[
        dict(titre="Tester vingt variables et garder la plus jolie",
             texte="Dès qu'une session teste plusieurs hypothèses sur le même jeu, la correction s'applique et le résultat le dit. Sans elle, une « découverte » sur vingt est du pur hasard."),
        dict(titre="Comparer des moyennes sur des données très dispersées",
             texte="Quand la distribution est asymétrique, l'outil conseille le test de rangs et affiche l'asymétrie mesurée. Vous restez libre — mais informé."),
        dict(titre="Publier un résultat dont les contrôles n'ont pas passé",
             texte="Un résultat marqué suspect ne s'exporte pas sans une dérogation motivée et tracée à votre nom."),
    ],
    limite="Rezilta n'est pas un système de gestion de laboratoire accrédité, ne porte aucune certification réglementaire, et ne remplace ni votre cahier de laboratoire ni l'avis d'un comité d'éthique. Il ne se substitue pas non plus à un logiciel spécialisé pour les plans d'expérience complexes : il couvre la comparaison de groupes et son honnêteté, pas toute la statistique expérimentale.",
)

PROGRAMMES = dict(
    prefixe="sp",
    titre_onglet="Rezilta pour les ONG, programmes et bailleurs — du cadre logique au rapport | Atmart",
    meta="Rezilta pour les ONG, programmes et bailleurs : cadre logique, indicateurs, collecte terrain hors ligne, absences documentées, agrégation de portefeuille et rapports au format du bailleur. Consolider sans décloisonner.",
    sujet="Rezilta%20-%20programme",
    fil="« Pourquoi 62 % de la cible ? » — et la réponse se reconstruit de mémoire.",
    h1="Rezilta pour les ONG, programmes et bailleurs",
    aka="suivi, évaluation et apprentissage",
    lead="Le cadre logique dort dans un document, les activités dans un tableur, la collecte dans un troisième outil. Rezilta les relie — et fait en sorte qu'un chiffre de rapport <strong>sache d'où il vient</strong> quand l'audit le demande.",
    badges=["📐 Cadre logique et indicateurs", "📱 Collecte hors ligne", "🔀 Vue de portefeuille cloisonnée"],
    scene_titre="Le vendredi avant le rapport",
    scene_1="Le rapport part lundi. Le fichier du terrain est là : le sexe écrit de dix façons, des cellules vides dont personne ne sait si c'est « pas collecté » ou « refus de répondre », et une superficie qui porte la lettre O au lieu d'un zéro. On fait la moyenne dans Excel, elle passe dans le rapport. Et si quelqu'un demande d'où vient le chiffre, il n'y aura pas de réponse — le fichier a été retouché trois fois depuis.",
    scene_2="<span class=\"bascule\">Avec Rezilta</span>, le fichier est scellé et daté à l'import. Les vides deviennent des absences qualifiées, une par une. L'outil dit que la moyenne est le mauvais choix ici et pourquoi. Le résultat sort avec ses diagnostics, et l'export porte sa signature. Six mois plus tard, l'auditeur demande — vous cliquez.",
    apporte=[
        "Votre cadre logique, tel que le bailleur l'a validé",
        "Vos fichiers de terrain, Kobo, ODK ou Excel",
        "Vos définitions d'indicateurs, même incomplètes",
        "Vos périodes de rapportage et vos cibles",
    ],
    repart=[
        "Chaque valeur manquante documentée avec sa raison",
        "Un tableau de suivi des indicateurs qui se génère au lieu de se recopier",
        "Un narratif d'écart appuyé sur les relevés, pas sur la mémoire",
        "Une vue de portefeuille où chaque partenaire ne voit que le sien",
    ],
    questions_titre="Ce que vous pourrez répondre sans hésiter",
    questions=[
        dict(titre="Pourquoi 62 % de la cible ?",
             texte="L'écart s'explique à partir des relevés et des difficultés déjà notées au fil de l'eau, pas d'une reconstitution la veille du rapport."),
        dict(titre="Les femmes reçoivent-elles autant que les hommes ?",
             texte="La désagrégation le montre — et l'outil distingue l'écart de participation, souvent bien plus grand, de l'écart de montant."),
        dict(titre="Ce total couvre-t-il tous les projets ?",
             texte="Un chiffre consolidé sait de quels relevés il vient et lesquels manquaient. Huit projets sur douze, ce n'est pas douze sur douze."),
    ],
    limite="Rezilta ne remplace pas votre outil de collecte : il génère vos formulaires vers Kobo et ODK, et récupère leurs exports. Il ne fait pas non plus votre audit financier, ne rédige pas votre rapport à votre place, et ne transforme pas une association en effet causal — même quand le bailleur aimerait lire le mot « impact ».",
)

INSTITUTIONS = dict(
    prefixe="si",
    titre_onglet="Rezilta pour les institutions et collectivités — rendre compte avec des chiffres qui tiennent | Atmart",
    meta="Rezilta pour les institutions publiques et collectivités : suivi d'un plan d'action, couverture territoriale, comparaison entre communes, et redevabilité avec des chiffres qui portent leur source.",
    sujet="Rezilta%20-%20institution",
    fil="Rendre compte avec un chiffre qu'on ne peut pas justifier, c'est fragiliser la parole publique.",
    h1="Rezilta pour les institutions et les collectivités",
    aka="plan d'action, couverture territoriale, redevabilité",
    lead="Un plan d'action public se juge sur sa couverture réelle : quelles zones sont servies, lesquelles ne le sont pas, et depuis combien de temps. Rezilta rattache vos chiffres aux <strong>territoires réels</strong> et garde la trace de ce qui manque.",
    badges=["🗺 Rattaché aux territoires réels", "📉 Absences visibles, pas masquées", "🗣 Restitution en 4 langues"],
    scene_titre="La séance de restitution",
    scene_1="On présente la couverture du programme : « 78 % des communes servies ». Un élu demande lesquelles manquent. Le tableau ne le dit pas — il ne contient que les communes où l'on est passé. Les absentes ne sont nulle part, et personne ne peut affirmer si elles sont oubliées ou simplement non renseignées.",
    scene_2="<span class=\"bascule\">Avec Rezilta</span>, une commune sans donnée n'est pas une commune absente du tableau : c'est une ligne, avec la raison. Jamais visitée, données perdues, hors périmètre. La carte montre les trous, et la restitution devient une conversation honnête au lieu d'un chiffre qu'on défend mal.",
    apporte=[
        "Votre plan d'action et ses cibles par territoire",
        "Vos relevés de terrain, service par service",
        "Vos référentiels de communes et de sections",
        "Les périodes sur lesquelles vous devez rendre compte",
    ],
    repart=[
        "Une couverture territoriale où les manques sont visibles",
        "Des comparaisons entre communes appuyées sur les mêmes définitions",
        "Des chiffres qui portent leur source dans la restitution publique",
        "Des exports lisibles par les administrés, dans leur langue",
    ],
    questions_titre="Ce que vous pourrez montrer",
    questions=[
        dict(titre="Quelles zones restent hors d'atteinte, et depuis quand ?",
             texte="Les absences sont des lignes qualifiées, pas des trous dans un tableau. On voit ce qui manque autant que ce qui est fait."),
        dict(titre="L'écart entre communes est-il réel ?",
             texte="Comparaison avec son intervalle. Deux communes qui diffèrent de trois points sur cent dossiers ne diffèrent probablement pas."),
        dict(titre="Le plan avance-t-il au rythme prévu ?",
             texte="Avancement contre la cible ET contre le temps écoulé — la seule vue qui dit si l'on est en retard."),
    ],
    limite="Rezilta n'est pas un système d'information administratif et ne gère aucune procédure : il n'instruit pas de dossiers, ne délivre rien, et ne remplace pas votre outil métier. Il ne produit pas non plus de statistique officielle — ce rôle appartient aux institutions statistiques nationales, et un chiffre de suivi de programme n'en est pas une.",
)

ECOLES = dict(
    prefixe="sx",
    titre_onglet="Rezilta pour les écoles et universités — cohortes, réussite, abandon | Atmart",
    meta="Rezilta pour les écoles et universités : suivi de cohortes, réussite et abandon, comparaison de groupes avec les précautions qu'exige la sélection — et la méthode enseignée en même temps qu'elle est appliquée.",
    sujet="Rezilta%20-%20ecole",
    fil="Le tutorat améliore-t-il la réussite, ou attire-t-il déjà les meilleurs ?",
    h1="Rezilta pour les écoles et les universités",
    aka="cohortes, réussite, abandon",
    lead="Vous suivez des promotions depuis des années. La question n'est pas de compter — c'est de savoir si l'écart entre deux groupes vient du <strong>dispositif</strong> ou de <strong>qui s'y inscrit</strong>. Rezilta refuse de confondre les deux.",
    badges=["👥 Suivi de cohortes", "⚖️ Sélection signalée, pas ignorée", "📚 La méthode s'apprend en s'appliquant"],
    scene_titre="Le conseil pédagogique",
    scene_1="Les étudiants qui ont suivi le tutorat réussissent à 78 %, les autres à 61 %. La conclusion tombe : le tutorat marche, il faut l'étendre. Personne ne remarque que le tutorat est facultatif — et que ceux qui s'y inscrivent sont précisément ceux qui travaillent déjà le plus.",
    scene_2="<span class=\"bascule\">Avec Rezilta</span>, l'écart est bien mesuré, avec son intervalle. Mais tant que personne n'a nommé un protocole et écrit pourquoi il tient, le résultat s'enregistre comme une <strong>association</strong> : « les étudiants tutorés réussissent davantage » — ce qui est vrai — et non « le tutorat améliore la réussite », qui ne l'est pas encore.",
    apporte=[
        "Vos listes de promotions, année par année",
        "Vos résultats et vos taux de passage",
        "Vos dispositifs d'accompagnement et qui y participe",
        "Les questions que se pose l'équipe pédagogique",
    ],
    repart=[
        "Des cohortes suivies avec les mêmes définitions d'une année à l'autre",
        "Des écarts mesurés, avec la sélection signalée quand elle existe",
        "La distinction explicite entre un lien observé et un effet",
        "Un résultat que vos étudiants peuvent reproduire — le script part avec",
    ],
    questions_titre="Ce que vous pourrez trancher honnêtement",
    questions=[
        dict(titre="Le dispositif marche-t-il, ou sélectionne-t-il ?",
             texte="L'outil ne tranche pas à votre place : il exige que vous nommiez le protocole qui le prouverait, et écrit « association » tant que vous ne l'avez pas fait."),
        dict(titre="L'abandon touche-t-il également tout le monde ?",
             texte="Découpage par sexe, âge, origine géographique, filière. C'est là que se voit ce qu'un taux global masque."),
        dict(titre="Cette promotion est-elle vraiment différente ?",
             texte="Comparaison entre années sur les mêmes définitions. Sans définitions stables, une différence de taux ne veut rien dire."),
    ],
    limite="Rezilta n'est pas un logiciel de scolarité : il ne gère ni inscriptions, ni notes, ni emplois du temps. Il ne juge aucun enseignant et ne produit aucun classement d'établissement. Sur des données d'étudiants, il applique la même minimisation qu'ailleurs : on ne collecte que ce qui sert une question, et l'identité reste séparée de l'analyse.",
)

PAGES = {
    "rezilta-entreprises.html": ENTREPRISES,
    "rezilta-banques.html": BANQUES,
    "rezilta-laboratoires.html": LABORATOIRES,
    "rezilta-programmes.html": PROGRAMMES,
    "rezilta-institutions.html": INSTITUTIONS,
    "rezilta-ecoles.html": ECOLES,
}
