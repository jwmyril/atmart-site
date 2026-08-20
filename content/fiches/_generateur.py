# -*- coding: utf-8 -*-
"""Generateur des fiches PDF Boussole IA (Pilote, Accompagnement) — FR + EN.
Reutilise EXACTEMENT le CSS de la fiche Diagnostic (source unique de verite).
Sortie : content/fiches/*.html  ->  a convertir avec Chrome --print-to-pdf.
"""
import io, os, re, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
FICHES = r"C:\Users\USUARIO\Power_BI_Claude\Atmart_website\content\fiches"

src = io.open(os.path.join(FICHES, "boussole-ia-diagnostic-fr.html"), encoding="utf-8").read()
CSS = re.search(r"<style>.*?</style>", src, re.S).group(0)

TPL = """<!DOCTYPE html>
<html lang="{lang}">
<head>
<meta charset="UTF-8" />
<title>{doctitle}</title>
{css}
<style>
  /* densite : ces fiches ont une etape de plus et des textes plus longs */
  body {{ font-size: 8.4pt; line-height: 1.35; }}
  h1 {{ font-size: 17.2pt; }}
  .sub {{ font-size: 8.8pt; }}
  .promise {{ font-size: 9.2pt; line-height: 1.44; padding: 2.5mm 3.3mm; }}
  h2 {{ margin: 2.9mm 0 1.3mm; }}
  ol.steps li {{ margin-bottom: 1.25mm; }}
  .deliv li {{ padding: 0.95mm 0 0.95mm 3mm; margin-bottom: 1mm; }}
  .deliv span {{ font-size: 8pt; }}
  .price {{ padding: 2.6mm 3.6mm; margin-top: 3.1mm; }}
  .price .amt {{ font-size: 14.8pt; }}
  .price .txt {{ font-size: 8.1pt; line-height: 1.42; }}
  .why div {{ padding: 1.9mm 2.5mm; font-size: 7.9pt; }}
  .next {{ margin-top: 3mm; padding-top: 2.1mm; }}
  .next h3 {{ font-size: 9.9pt; }}
  .next p {{ font-size: 8.1pt; }}
  .legal {{ font-size: 6.5pt; margin-top: 2.1mm; }}
</style>
</head>
<body>

<header>
  <img src="../../assets/brand/atmart-logo-transparent.png" alt="Atmart" />
  <div class="t">
    <h1>{h1a} <span>{h1b}</span> — {h1c}</h1>
    <p class="sub">{sub}</p>
  </div>
  <div class="meta"><b>Atmart LLC</b>{meta}</div>
</header>

<p class="promise">{promise}</p>

<h2>{forwho_t}</h2>
<p style="margin:0;color:#45555f">{forwho}</p>

<div class="cols">
  <div class="c">
    <h2>{steps_t}</h2>
    <ol class="steps">
{steps}
    </ol>
    <h2>{excl_t}</h2>
    <p style="margin:0;color:#45555f">{excl}</p>
  </div>

  <div class="c">
    <h2>{deliv_t}</h2>
    <ul class="deliv">
{deliv}
    </ul>
  </div>
</div>

<div class="price">
  <div class="amt">{amt}<small>{amt_s}</small></div>
  <div class="txt">{price_txt}</div>
</div>

<h2>{why_t}</h2>
<div class="why">
{why}
</div>

<div class="next">
  <div class="l">
    <h3>{next_h3}</h3>
    <p>{next_p}</p>
  </div>
  <div class="r"><b>sales@atmart.ltd</b><br />atmart.ltd/conseil-ia.html</div>
</div>

<p class="legal">{legal}</p>

</body>
</html>
"""

def render(fn, d):
    steps = "\n".join('      <li><b>%s</b><span>%s</span></li>' % s for s in d["steps"])
    deliv = "\n".join('      <li><b>%s</b><span>%s</span></li>' % s for s in d["deliv"])
    why = "\n".join('  <div><b>%s</b>%s</div>' % w for w in d["why"])
    ctx = dict(d)
    ctx.update(css=CSS, steps=steps, deliv=deliv, why=why)
    html = TPL.format(**ctx)
    io.open(os.path.join(FICHES, fn), "w", encoding="utf-8", newline="\n").write(html)
    print("  ecrit :", fn)

# ============================== PILOTE — FR ==============================
PILOTE_FR = dict(
 lang="fr", doctitle="Boussole IA — Pilote encadré | Atmart",
 h1a="Boussole", h1b="IA", h1c="Pilote encadré",
 sub="Une seule tâche automatisée, menée jusqu'à la mise en service — avec la preuve que ça marche.",
 meta="Conseil aux entreprises<br />et institutions<br />atmart.ltd",
 promise="À la fin, l'automatisation <b>tourne réellement</b> chez vous et votre équipe la fait fonctionner <b>sans nous</b>. Vous détenez le jeu de tests qui prouve sa qualité, la piste d'audit qui montre ce qu'elle a fait, et son coût exact par tâche.",
 forwho_t="Pour qui",
 forwho='Les organisations qui ont fait un <b class="navy">Diagnostic</b> et veulent commencer par la tâche la plus rentable · celles qui savent déjà quelle tâche les épuise et veulent une solution qui tienne · celles qui ont essayé un outil d\'IA et l\'ont abandonné faute de contrôle et de méthode.',
 steps_t="Comment ça se passe",
 steps=[("Semaine 0 — Choix et critères", "Nous choisissons la tâche et écrivons ensemble les critères de réussite AVANT de construire : qualité attendue, temps visé, coût plafond."),
        ("Semaine 1 — Contrôle et tests", "Nous concevons le contrôle humain (qui valide quoi, quand) et bâtissons le jeu de tests à partir de vos vrais cas, y compris ceux qui fâchent."),
        ("Semaines 2 à 4 — Construction", "Mise en service progressive : d'abord en parallèle de votre méthode actuelle, puis en remplacement quand les tests passent."),
        ("Semaine 5 — Mesure", "Qualité mesurée par les tests, temps réellement gagné, coût par tâche constaté. Les chiffres, pas les impressions."),
        ("Semaine 6 — Passage de relais", "Formation de votre équipe, guide de dépannage, et une revue à 30 jours pour vérifier que ça tient sans nous.")],
 excl_t="Ce qui n'est pas inclus",
 excl="La refonte de vos logiciels existants, l'achat de licences, la migration de vos données, et toute garantie de gain chiffré avant la mesure de la semaine 5. Un second cas d'usage fait l'objet d'un nouveau pilote ou d'un <b>Accompagnement</b>.",
 deliv_t="Ce que vous recevez",
 deliv=[("L'automatisation en service", "Elle tourne sur votre périmètre réel, pas sur une démonstration."),
        ("Le jeu de tests", "Vos cas réels avec la réponse attendue : vous mesurez la qualité aujourd'hui et dans six mois."),
        ("La piste d'audit", "Un journal lisible : ce que l'outil a fait, avec quelles données, qui a validé."),
        ("Le modèle de coût", "Coût par tâche et par mois, plafond de dépense, seuil de rentabilité."),
        ("Le guide de dépannage", "Que faire quand l'outil se trompe, tombe en panne ou coûte trop cher — écrit pour votre équipe."),
        ("La formation et la revue à 30 jours", "Votre équipe autonome, puis un contrôle un mois plus tard.")],
 amt="Tarif sur demande", amt_s="devis ferme après le cadrage",
 price_txt="<b>4 à 6 semaines.</b> Le tarif dépend de la complexité de la tâche, de la taille de l'organisation et du nombre de personnes concernées — il est arrêté par écrit avant de commencer.<br /><b>Deux conditions de réussite :</b> un référent disponible chez vous (2 à 3 heures par semaine) et l'accès aux données nécessaires. Nous menons au maximum 2 pilotes en parallèle.",
 why_t="Pourquoi Atmart",
 why=[("20 ans de terrain, pas de théorie", "Suivi-évaluation, analyse et ingénierie de données — et développeur des outils que nous livrons."),
      ("La preuve avant la promesse", "Tests, piste d'audit et coût connu — et le contrôle humain conçu avant la première ligne."),
      ("Éthique et vie privée", "Données minimisées, biais nommés, limites documentées — dans la langue de vos équipes.")],
 next_h3="Prochaine étape : choisir la tâche",
 next_p="Si vous avez déjà un Diagnostic, nous partons de votre feuille de route. Sinon, une conversation de 30 minutes suffit pour savoir si une tâche est un bon candidat — et pour vous le dire franchement si elle ne l'est pas.",
 legal="Atmart LLC — conseil en usage de l'intelligence artificielle. Le pilote est une prestation de conception et de mise en service : les gains sont mesurés, jamais garantis à l'avance. L'automatisation repose sur des services d'IA tiers dont les prix et les règles peuvent changer ; un mode de repli manuel est systématiquement documenté. Un accord de confidentialité est signé avant tout accès aux données. Document non contractuel — la proposition finale est établie après le cadrage.",
)

# ============================== PILOTE — EN ==============================
PILOTE_EN = dict(
 lang="en", doctitle="AI Compass — Guided pilot | Atmart",
 h1a="AI", h1b="Compass", h1c="Guided pilot",
 sub="One automated task, taken all the way into service — with the proof that it works.",
 meta="Advisory for companies<br />and institutions<br />atmart.ltd",
 promise="By the end, the automation <b>actually runs</b> in your organisation and your team operates it <b>without us</b>. You own the test set that proves its quality, the audit trail that shows what it did, and its exact cost per task.",
 forwho_t="Who it is for",
 forwho='Organisations that completed a <b class="navy">Diagnostic</b> and want to start with the highest-value task · those who already know which task is draining them and want a solution that holds · those who tried an AI tool and dropped it for lack of control and method.',
 steps_t="How it works",
 steps=[("Week 0 — Choice and criteria", "We pick the task and write the success criteria together BEFORE building: expected quality, target time, cost ceiling."),
        ("Week 1 — Control and tests", "We design the human control (who validates what, and when) and build the test set from your real cases, including the awkward ones."),
        ("Weeks 2 to 4 — Build", "Gradual roll-out: first alongside your current method, then replacing it once the tests pass."),
        ("Week 5 — Measurement", "Quality measured by the tests, time actually saved, observed cost per task. Numbers, not impressions."),
        ("Week 6 — Handover", "Training for your team, a troubleshooting guide, and a 30-day review to confirm it holds without us.")],
 excl_t="What is not included",
 excl="Rebuilding your existing software, licence purchases, data migration, and any guarantee of quantified gains before the week-5 measurement. A second use case means another pilot or an <b>Ongoing support</b> agreement.",
 deliv_t="What you receive",
 deliv=[("The automation in service", "Running on your real scope, not on a demo."),
        ("The test set", "Your real cases with the expected answer: measure quality today and again in six months."),
        ("The audit trail", "A readable log: what the tool did, with which data, and who approved it."),
        ("The cost model", "Cost per task and per month, spending cap, break-even threshold."),
        ("The troubleshooting guide", "What to do when the tool is wrong, breaks down or costs too much — written for your team."),
        ("Training and a 30-day review", "Your team self-sufficient, then a check one month later.")],
 amt="Price on request", amt_s="firm quote after scoping",
 price_txt="<b>4 to 6 weeks.</b> The price depends on the complexity of the task, the size of the organisation and the number of people involved — it is agreed in writing before we start.<br /><b>Two conditions for success:</b> an available point of contact on your side (2 to 3 hours a week) and access to the necessary data. We run at most 2 pilots in parallel.",
 why_t="Why Atmart",
 why=[("20 years in the field, not theory", "Monitoring &amp; evaluation, data analysis and data engineering — and the developer of the tools we ship."),
      ("Proof before promises", "Tests, audit trail and known cost — with human control designed before the first line."),
      ("Ethics and privacy", "Data minimised, biases named, limits documented — in your teams' language.")],
 next_h3="Next step: choosing the task",
 next_p="If you already have a Diagnostic, we start from your roadmap. If not, a 30-minute conversation is enough to tell whether a task is a good candidate — and to say plainly if it is not.",
 legal="Atmart LLC — advisory on the use of artificial intelligence. The pilot is a design and deployment service: gains are measured, never guaranteed in advance. The automation relies on third-party AI services whose prices and rules may change; a manual fallback is always documented. A confidentiality agreement is signed before any access to data. Non-contractual document — the final proposal is issued after scoping.",
)

# ========================= ACCOMPAGNEMENT — FR =========================
ACC_FR = dict(
 lang="fr", doctitle="Boussole IA — Accompagnement | Atmart",
 h1a="Boussole", h1b="IA", h1c="Accompagnement",
 sub="Chaque mois : un nouveau cas d'usage, la qualité vérifiée, et une équipe qui monte en compétence.",
 meta="Conseil aux entreprises<br />et institutions<br />atmart.ltd",
 promise="Une automatisation qui tourne se dégrade si personne ne la surveille : les données changent, les modèles évoluent, les équipes tournent. L'accompagnement <b>maintient la qualité prouvée</b> et ajoute <b>un cas d'usage par mois</b> — sans engagement de durée.",
 forwho_t="Pour qui",
 forwho='Les organisations qui sortent d\'un <b class="navy">Pilote</b> et veulent continuer à avancer · celles qui utilisent déjà des outils d\'IA <b class="navy">sans contrôle ni règles écrites</b> · celles dont les équipes changent souvent et qui doivent former en continu.',
 steps_t="Ce qui se passe chaque mois",
 steps=[("Un nouveau cas d'usage", "Une tâche de plus, conçue et mise en service avec la même méthode : critères écrits, contrôle humain, tests."),
        ("La revue de qualité", "Nous rejouons vos jeux de tests sur les automatisations existantes et vous signalons toute dérive avant qu'elle ne fasse mal."),
        ("Le tableau de coût", "Ce que vous avez réellement dépensé, par tâche et par mois, avec les plafonds tenus ou dépassés."),
        ("Une session avec l'équipe", "Une heure : ce qui marche, ce qui bloque, comment mieux superviser. Les licences Career360 Ekip sont incluses pour la pratique entre les sessions."),
        ("La veille de gouvernance", "Vos règles internes tenues à jour quand les outils, les prix ou les obligations changent.")],
 excl_t="Ce qui n'est pas inclus",
 excl="Le développement d'une automatisation lourde (c'est un <b>Pilote</b>), l'assistance 24 h/24, la maintenance de vos logiciels métier, et l'achat de licences tierces. Le mois n'est pas cumulable : un cas d'usage non demandé n'est pas reporté.",
 deliv_t="Ce que vous recevez",
 deliv=[("Un cas d'usage par mois", "Choisi par vous dans votre feuille de route, livré avec ses tests."),
        ("Le rapport mensuel", "Qualité mesurée, coûts réels, dérives détectées, décisions à prendre."),
        ("Les licences Career360 Ekip", "Jusqu'à 5 membres : le coach de montée en compétences de votre équipe, en 4 langues."),
        ("Les règles internes à jour", "Ce qui ne doit jamais entrer dans un outil d'IA, révisé à chaque changement."),
        ("La priorité sur nos disponibilités", "Vos demandes passent avant les nouvelles missions."),
        ("Le droit de partir", "Résiliable à tout moment avec 30 jours de préavis. Tout ce qui a été livré vous appartient.")],
 amt="Tarif sur demande", amt_s="mensuel, résiliable à tout moment",
 price_txt="<b>Le tarif dépend du nombre d'automatisations à surveiller et de la taille de l'équipe accompagnée.</b><br />Aucun engagement de durée : si l'accompagnement n'apporte plus rien, vous arrêtez — et vous gardez les tests, la piste d'audit et la documentation. C'est la meilleure garantie que nous devons rester utiles chaque mois.",
 why_t="Pourquoi Atmart",
 why=[("20 ans de terrain, pas de théorie", "Suivi-évaluation, analyse et ingénierie de données — et développeur des outils que nous livrons."),
      ("Le logiciel avec le service", "Les licences Career360 Ekip sont comprises — l'équipe pratique entre deux sessions."),
      ("Vous restez libre", "Résiliation à 30 jours, livrables à vous, données minimisées, aucun verrouillage technique.")],
 next_h3="Prochaine étape : une conversation de 30 minutes",
 next_p="Dites-nous ce qui tourne déjà chez vous et ce que vous voulez ajouter. Si un simple pilote suffit et qu'un accompagnement serait superflu, nous le dirons — nous préférons une mission utile à un abonnement de confort.",
 legal="Atmart LLC — conseil en usage de l'intelligence artificielle. L'accompagnement est une prestation de suivi et d'amélioration : la qualité est mesurée, jamais garantie de façon absolue. Les services d'IA tiers peuvent modifier leurs prix et leurs règles ; les plafonds de dépense et les replis manuels sont revus à chaque rapport mensuel. Un accord de confidentialité couvre l'ensemble de la relation. Document non contractuel — la proposition finale est établie après échange.",
)

# ========================= ACCOMPAGNEMENT — EN =========================
ACC_EN = dict(
 lang="en", doctitle="AI Compass — Ongoing support | Atmart",
 h1a="AI", h1b="Compass", h1c="Ongoing support",
 sub="Every month: one new use case, quality verified, and a team that keeps getting better.",
 meta="Advisory for companies<br />and institutions<br />atmart.ltd",
 promise="An automation that runs will decay if nobody watches it: data changes, models evolve, teams turn over. Ongoing support <b>keeps quality provable</b> and adds <b>one use case per month</b> — with no minimum term.",
 forwho_t="Who it is for",
 forwho='Organisations coming out of a <b class="navy">Pilot</b> that want to keep moving · those already using AI tools <b class="navy">with no control and no written rules</b> · those whose teams change often and who must train continuously.',
 steps_t="What happens every month",
 steps=[("One new use case", "One more task, designed and put into service with the same method: written criteria, human control, tests."),
        ("The quality review", "We replay your test sets against the existing automations and flag any drift before it hurts."),
        ("The cost table", "What you actually spent, per task and per month, with caps respected or exceeded."),
        ("A session with the team", "One hour: what works, what is stuck, how to supervise better. Career360 Team licences are included for practice between sessions."),
        ("Governance watch", "Your internal rules kept current as tools, prices or obligations change.")],
 excl_t="What is not included",
 excl="Building a heavy automation (that is a <b>Pilot</b>), 24/7 support, maintenance of your business software, and third-party licence purchases. Months do not roll over: an unused use case is not carried forward.",
 deliv_t="What you receive",
 deliv=[("One use case per month", "Chosen by you from your roadmap, delivered with its tests."),
        ("The monthly report", "Measured quality, real costs, drift detected, decisions to make."),
        ("Career360 Team licences", "Up to 5 members: your team's skills coach, in 4 languages."),
        ("Up-to-date internal rules", "What must never enter an AI tool, revised at every change."),
        ("Priority on our availability", "Your requests come before new engagements."),
        ("The right to leave", "Cancel any time with 30 days' notice. Everything delivered is yours.")],
 amt="Price on request", amt_s="monthly, cancel any time",
 price_txt="<b>The rate depends on the number of automations to watch and the size of the team supported.</b><br />No minimum term: if the support stops adding value, you stop — and you keep the tests, the audit trail and the documentation. That is the best guarantee that we have to stay useful every month.",
 why_t="Why Atmart",
 why=[("Quality stays provable", "Tests replayed every month: you know whether the tool is drifting, you don't guess."),
      ("Software with the service", "Career360 Team licences are included — the team practises between sessions."),
      ("You stay free", "30-day cancellation, deliverables are yours, data minimised, no technical lock-in.")],
 next_h3="Next step: a 30-minute conversation",
 next_p="Tell us what already runs in your organisation and what you want to add. If a single pilot is enough and ongoing support would be overkill, we will say so — we would rather run a useful engagement than sell a comfortable subscription.",
 legal="Atmart LLC — advisory on the use of artificial intelligence. Ongoing support is a monitoring and improvement service: quality is measured, never absolutely guaranteed. Third-party AI services may change their prices and rules; spending caps and manual fallbacks are reviewed in every monthly report. A confidentiality agreement covers the whole relationship. Non-contractual document — the final proposal is issued after discussion.",
)

print("generation des fiches :")
render("boussole-ia-pilote-fr.html", PILOTE_FR)
render("ai-compass-pilot-en.html", PILOTE_EN)
render("boussole-ia-accompagnement-fr.html", ACC_FR)
render("ai-compass-support-en.html", ACC_EN)
print("CSS partage :", len(CSS), "caracteres (repris de la fiche Diagnostic)")
