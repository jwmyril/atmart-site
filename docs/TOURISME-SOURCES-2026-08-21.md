# Le tourisme dans l'Explorateur Haïti — ce que nous avons intégré, et ce qui n'existe pas

*21 août 2026 — Atmart Data*

Ce document accompagne l'arrivée du tourisme dans l'Explorateur. Il dit ce que
nous publions, d'où cela vient, et — c'est la partie qui vaut le plus — ce
qu'aucune source ouverte ne permet de dire aujourd'hui sur le tourisme haïtien.

---

## 1. Ce qui est publié

### 1.1 L'offre cartographiée (OpenStreetMap via HOT, ODbL, passeport PSP-024)

2 695 objets, **107 communes sur 140**, en sept familles :

| Famille | Objets | Communes |
|---|---|---|
| Hébergement | 643 | 81 |
| Restauration et sorties | 1 430 | 85 |
| Patrimoine bâti | 230 | 52 |
| Sites et attractions | 146 | 46 |
| Lieux de culture | 121 | 30 |
| Information touristique | 70 | 25 |
| Plein air | 55 | 18 |

Deux extraits HOT sont lus : les points d'intérêt et les lieux culturels. Ils
se recouvrent — 3 921 objets figurent dans les deux — et le dédoublonnage se
fait sur l'identifiant OSM, jamais sur le nom.

**Trois pièges du tag `historic`, mesurés et écartés.** `historic=no` compte
707 objets : c'est un import humanitaire d'abris, où le tag dit précisément
que l'objet n'est PAS historique. `historic=yes` en compte 219, dont neuf
portent un nom. `historic=tomb` en compte 185 : ce sont des cimetières. Les
compter aurait quintuplé la famille « patrimoine » avec du bruit.

### 1.2 La classification Hibiscus (MTIC, passeport PSP-062)

190 établissements classés de 1 à 5 hibiscus par le ministère du Tourisme
entre 2013 et 2015, agrégés sur **39 communes**. C'est le seul inventaire
touristique officiel d'Haïti descendu au territoire.

Le ministère ne place aucune licence sur ce document et son pied de page dit
« tous droits réservés ». Nous publions l'**agrégat communal recalculé** — un
fait, et un fait n'a pas d'auteur (décret du 12 octobre 2005, art. 5) — et
**jamais le PDF, jamais la liste nominative des établissements**, qui serait
la reprise de l'expression du document.

**Dix-huit établissements restent non rattachés.** Treize « localités » du
document sont infra-communales : Labadee, Cormier, Furcy, Cyvadier, Kabic,
Ti mouillage… Le rattachement paraît évident jusqu'à ce qu'on regarde — Kabic
et Ti Mouillage relèvent de Cayes-Jacmel et non de Jacmel. Ils sont publiés
dans un fichier séparé qui les nomme et les compte. Aucun n'est perdu, aucun
n'est deviné.

### 1.3 Les séries nationales (Banque mondiale, CC BY 4.0)

Dix séries : arrivées, recettes, dépenses, part des exportations, transport
aérien. Elles ne descendent pas à la commune et ne doivent pas y descendre.

---

## 2. Le point juridique qui commande tout : ONU Tourisme

Les chiffres d'arrivées viennent d'ONU Tourisme — l'API de la Banque mondiale
le déclare elle-même. Mais les conditions ne se ressemblent pas :

> « […] grants permission to Users to download and copy the information […]
> for the User's personal, non-commercial use, **without any right to resell
> or redistribute them or to compile or create derivative works there from** »
> — untourism.int/copyright

Un atlas publié est exactement une œuvre dérivée redistribuée. Nous passons
donc par la **republication Banque mondiale sous CC BY 4.0**, qui porte les
mêmes séries.

**Ce que ce choix coûte, et il faut le dire.** La ventilation des
croisiéristes n'existe que dans le fichier d'ONU Tourisme : 885 000 visiteurs
d'un jour en 2018, 652 000 en 2019, 119 000 en 2020, **zéro en 2021**. En
Haïti, ces visiteurs d'un jour sont tous des passagers de croisière — c'est
Labadie, et l'escale a été entièrement suspendue. Ce chiffre ne peut pas être
republié. Nous publions l'absence à sa place.

---

## 3. Ce qui n'existe pas — et c'est un résultat

1. **Aucune statistique d'arrivées produite par l'État haïtien.** Le site du
   ministère du Tourisme n'a pas de rubrique statistiques. Les bulletins
   évoqués dans la presse ne sont en ligne nulle part.

2. **Aucune donnée ouverte sur les escales de croisière par port.** Le seul
   chiffre est national, s'arrête en 2020, et n'est pas redistribuable.
   Labadie n'existe comme entité statistique dans aucune source.

3. **Haïti est absente de l'étude de référence sur la croisière aux
   Caraïbes.** L'analyse FCCA 2024 couvre 33 destinations ; recherche plein
   texte sur ses 95 pages : « Haiti » = 0 occurrence, « Labadee » = 0. Chaque
   destination y participe en la finançant ; Haïti ne l'a jamais fait. Pour un
   pays qui accueillait 652 000 croisiéristes en 2019, c'est un fait en soi.

4. **Aucune série de passagers par aéroport haïtien en accès libre.** L'OACI
   vend le module 2 750 dollars et son accès gratuit « État membre » interdit
   l'export. L'Autorité aéroportuaire nationale n'a plus de site en ligne. La
   seule série ouverte mesure les compagnies *immatriculées* en Haïti — 74 542
   passagers en 2023 — et n'a rien à voir avec le trafic de Port-au-Prince.

5. **Aucune donnée AIS ouverte ne couvre les eaux haïtiennes.**

6. **Toutes les séries touristiques nationales s'arrêtent en 2018 ou 2019.**
   Pour un atlas publié en 2026, la donnée la plus récente a sept ans.

7. **L'inventaire communal de l'IHSI (IRPCH) est annoncé en pied de page de
   tout son site avec un lien vide.** Ç'aurait été la source idéale.

---

## 4. Deux pièges de sécurité rencontrés, consignés

- La navigation du site ministériel `tourisme.gouv.ht` pointe vers
  **`mdthaiti.com`, un domaine parqué** chez un hébergeur commercial. Les
  mêmes chemins répondent sur le domaine officiel. Un site d'État actif qui
  renvoie vers un domaine parqué est un risque de détournement.
- **`pap.aan-haiti.com`, site de l'aéroport de Port-au-Prince, porte des
  injections de spam** (liens de paris). Ne rien y récupérer, ne pas le citer.
- Le barème Hibiscus lui-même (`guidedeclassification.pdf`) **n'appartient pas
  à Haïti** : © Corporation de l'industrie touristique du Québec, avec
  interdiction explicite de reproduction. Nous ne le reprenons ni ne le citons
  au-delà de son existence — ce qui explique pourquoi l'Explorateur ne peut pas
  dire ce que chaque rang de hibiscus exige.

---

## 5. Ce qui reste à faire

- **Le trait de côte.** 166 plages sont cartographiées dans OpenStreetMap ;
  78 tombent hors des polygones communaux simplifiés que sert l'Explorateur.
  Les récupérer ouvrirait six communes côtières supplémentaires. C'est
  probablement le plus gros gain caché du chantier.
- **GeoNames** (CC BY 4.0) porte 36 forts que la cartographie OSM haïtienne
  n'a pas, et ouvrirait quatre communes de plus.
- **Les aérodromes** (OurAirports, domaine public) : six aéroports desservis,
  avec un fait que le lectorat communal remarquera — l'aéroport de
  Port-au-Prince est situé à Tabarre.
- **La position de la Citadelle.** La coordonnée publiée par l'UNESCO est
  décalée d'environ 900 mètres et tombe dans la commune de Dondon. Le bien
  s'étend sur plusieurs communes ; il ne sera jamais attribué par
  point-dans-polygone automatique.
