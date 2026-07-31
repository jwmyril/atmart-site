/* ===== Atelier ATM — moteur commun des pages galerie =====
   - charge assets/atelier/oeuvres.json (source unique des œuvres)
   - remplit tout élément [data-s="cle"] avec la chaîne de la langue courante
   - se redessine quand i18n.js change <html lang>
   Les titres des œuvres sont des noms propres : ils ne se traduisent pas. */
window.ATM = (function () {
  "use strict";

  var LANGS = { fr: 1, ht: 1, en: 1, es: 1 };
  var MAIL = "sales@atmart.ltd";

  var S = {
    /* --- actions communes --- */
    "a.free":   { fr: "Découvrir gratuitement", ht: "Dekouvri gratis", en: "Explore for free", es: "Descubrir gratis" },
    "a.print":  { fr: "Recevoir une impression", ht: "Jwenn yon kopi enprime", en: "Get a print", es: "Recibir una impresión" },
    "a.fund":   { fr: "Financer l'accès", ht: "Peye pou lòt moun jwenn li", en: "Fund access", es: "Financiar el acceso" },
    "a.soon":   { fr: "Bientôt", ht: "Ap vini", en: "Soon", es: "Pronto" },
    "a.back":   { fr: "← Toute la collection", ht: "← Tout koleksyon an", en: "← The whole collection", es: "← Toda la colección" },

    /* --- noms des pages de l'Atelier (nav, pieds de page, cartes) --- */
    "nv.gal": { fr: "Galerie", ht: "Galri", en: "Gallery", es: "Galería" },
    "nv.mez": { fr: "L'art pour la maison", ht: "Atizana pou lakay", en: "Art for the home", es: "Arte para la casa" },
    "nv.biz": { fr: "L'art pour le business", ht: "Atizana pou biznis", en: "Art for business", es: "Arte para empresas" },
    "nv.art": { fr: "Artistes : rejoindre", ht: "Atis : vin jwenn nou", en: "Artists: join", es: "Artistas: unirse" },

    /* --- hero --- */
    "hero.k":   { fr: "Art numérique · Haïti & Caraïbe", ht: "Atizana nimerik · Ayiti ak Karayib la", en: "Digital art · Haiti & the Caribbean", es: "Arte digital · Haití y el Caribe" },
    "hero.h1":  { fr: "L'art d'ATM,", ht: "Atizana ATM,", en: "ATM's art,", es: "El arte de ATM," },
    "hero.h2":  { fr: "partout.", ht: "toupatou.", en: "everywhere.", es: "en todas partes." },
    "hero.p":   {
      fr: "Chaque œuvre devient une expérience numérique : image, voix, mouvement, inspiration. Ce sont les institutions qui financent l'accès — pour que l'argent ne devienne jamais la barrière qui empêche le grand public d'accéder aux œuvres des artistes.",
      ht: "Chak zèv vin tounen yon eksperyans nimerik : imaj, vwa, mouvman, enspirasyon. Se enstitisyon yo ki finanse pou aksè a — konsa lajan pa tounen yon baryè ki anpeche gran piblik la genyen aksè ak zèv atis yo.",
      en: "Every work becomes a digital experience: image, voice, movement, inspiration. Institutions are the ones funding the access — so that money never becomes the barrier that keeps the general public from reaching artists' works.",
      es: "Cada obra se convierte en una experiencia digital: imagen, voz, movimiento, inspiración. Son las instituciones las que financian el acceso, para que el dinero nunca sea la barrera que impide al gran público acceder a las obras de los artistas."
    },
    "hero.cred": { fr: "Œuvres d'Andrelita T. Myril (ATM) · ENARTS, Haïti", ht: "Zèv Andrelita T. Myril (ATM) · ENARTS, Ayiti", en: "Works by Andrelita T. Myril (ATM) · ENARTS, Haiti", es: "Obras de Andrelita T. Myril (ATM) · ENARTS, Haití" },

    /* --- les trois entrées --- */
    "p.k":   { fr: "Par où commencer", ht: "Kote pou w kòmanse", en: "Where to start", es: "Por dónde empezar" },
    "p1.d":  { fr: "Voir, écouter, ressentir, partager. Sans compte et sans paiement.", ht: "Gade, koute, santi, pataje. Ou pa bezwen kont, ou pa bezwen peye.", en: "Look, listen, feel, share. No account, no payment.", es: "Ver, escuchar, sentir, compartir. Sin cuenta y sin pago." },
    "p1.go": { fr: "Voir la collection", ht: "Gade koleksyon an", en: "See the collection", es: "Ver la colección" },
    "p2.d":  { fr: "Si un partenaire soutient votre communauté, choisissez une œuvre et recevez l'affiche.", ht: "Si gen yon patnè k ap sipòte kominote w la, chwazi yon zèv epi resevwa afich la.", en: "If a partner supports your community, choose a work and receive the poster.", es: "Si un socio apoya a su comunidad, elija una obra y reciba el cartel." },
    "p2.go": { fr: "Vérifier mon accès", ht: "Tcheke aksè m", en: "Check my access", es: "Comprobar mi acceso" },
    "p3.d":  { fr: "Entreprises, écoles, hôpitaux, fondations : offrez l'art à une communauté que vous choisissez.", ht: "Antrepriz, lekòl, lopital, fondasyon : ofri atizana bay yon kominote nou chwazi.", en: "Companies, schools, hospitals, foundations: give art to a community of your choice.", es: "Empresas, escuelas, hospitales, fundaciones: ofrezcan arte a una comunidad de su elección." },
    "p3.go": { fr: "Voir les formules", ht: "Gade fòmil yo", en: "See the plans", es: "Ver los planes" },
    "p4.d":  { fr: "Une affiche, un original signé, une toile peinte pour vous ou un cadeau à offrir.", ht: "Yon afich, yon orijinal ak siyati atis la, yon tablo yo penn pou ou, oswa yon kado.", en: "A poster, a signed original, a canvas painted for you, or a gift.", es: "Un cartel, un original firmado, un lienzo pintado para usted o un regalo." },
    "p4.go": { fr: "Voir pour la maison", ht: "Gade sa ki pou lakay", en: "See home options", es: "Ver para la casa" },
    "p5.d":  { fr: "Hôtels, cabinets, bureaux, restaurants : vos écrans deviennent une galerie sous licence.", ht: "Otèl, kabinè, biwo, restoran : ekran nou yo tounen yon galri anba lisans.", en: "Hotels, clinics, offices, restaurants: your screens become a licensed gallery.", es: "Hoteles, consultorios, oficinas, restaurantes: sus pantallas se vuelven una galería con licencia." },
    "p5.go": { fr: "Voir pour le business", ht: "Gade sa ki pou biznis", en: "See business options", es: "Ver para empresas" },

    /* --- libellés de formulaire communs à toutes les pages --- */
    "ct.f2": { fr: "Votre nom", ht: "Non ou", en: "Your name", es: "Su nombre" },
    "ct.f3": { fr: "Courriel", ht: "Imèl", en: "Email", es: "Correo" },
    "im.f1": { fr: "Œuvre choisie", ht: "Zèv ou chwazi a", en: "Chosen work", es: "Obra elegida" },
    "im.fn": { fr: "Le bouton ouvre votre messagerie avec la demande déjà rédigée. Aucune donnée n'est stockée sur ce site.", ht: "Bouton an louvri bwat imèl ou a ak demann nan deja ekri. Sit sa a pa kenbe okenn done sou ou.", en: "The button opens your mail app with the request already written. This site stores no data.", es: "El botón abre su correo con la solicitud ya redactada. Este sitio no almacena datos." },

    /* --- appel aux artistes --- */
    "ab.h": { fr: "Vous êtes artiste ? Le programme s'ouvre.", ht: "Èske w se yon atis ? Pwogram nan ap louvri.", en: "Are you an artist? The programme is opening.", es: "¿Es usted artista? El programa se abre." },
    "ab.p": { fr: "L'Atelier a commencé avec une artiste. Nous cherchons maintenant d'autres peintres, photographes et plasticiens d'Haïti, de la Caraïbe et de la diaspora — vous gardez vos droits, nous faisons le travail numérique.", ht: "Atelye a te kòmanse ak yon sèl atis. Kounye a n ap chèche lòt pent, fotograf ak atis Ayiti, Karayib la ak dyaspora a — ou kenbe dwa w yo, se nou k ap fè travay nimerik la.", en: "The studio started with one artist. We are now looking for other painters, photographers and visual artists from Haiti, the Caribbean and the diaspora — you keep your rights, we do the digital work.", es: "El taller empezó con una artista. Ahora buscamos otros pintores, fotógrafos y artistas de Haití, el Caribe y la diáspora: usted conserva sus derechos, nosotros hacemos el trabajo digital." },
    "ab.b": { fr: "Rejoindre le programme", ht: "Vin jwenn pwogram nan", en: "Join the programme", es: "Unirse al programa" },

    /* --- ambiances --- */
    "mood.k": { fr: "Les cinq univers", ht: "Senk mond yo", en: "The five universes", es: "Los cinco universos" },
    "mood.h": { fr: "La collection est organisée en cinq univers", ht: "Koleksyon an separe an senk mond", en: "The collection is built in five universes", es: "La colección está organizada en cinco universos" },
    "mood.b": { fr: "Voir la structure complète de la collection →", ht: "Gade tout estrikti koleksyon an →", en: "See the full structure of the collection →", es: "Ver la estructura completa de la colección →" },

    /* --- collection --- */
    "gal.k": { fr: "La collection", ht: "Koleksyon an", en: "The collection", es: "La colección" },
    "gal.h": { fr: "Douze œuvres originales, une expérience numérique pour chacune", ht: "Douz zèv orijinal, chak gen pwòp eksperyans nimerik li", en: "Twelve original works, each with its own digital experience", es: "Doce obras originales, cada una con su experiencia digital" },
    "gal.all": { fr: "Toutes", ht: "Tout", en: "All", es: "Todas" },

    /* --- ce qu'une œuvre devient --- */
    "bec.k": { fr: "Créer une fois, diffuser partout", ht: "Kreye yon sèl fwa, gaye l toupatou", en: "Create once, show everywhere", es: "Crear una vez, difundir en todas partes" },
    "bec.h": { fr: "Ce qu'une seule toile devient", ht: "Sa yon sèl tablo ka tounen", en: "What a single canvas becomes", es: "En qué se convierte un solo lienzo" },
    "bec1":  { fr: "Galerie numérique", ht: "Galri nimerik", en: "Digital gallery", es: "Galería digital" },
    "bec2":  { fr: "Voix de l'artiste", ht: "Vwa atis la", en: "Artist's voice", es: "Voz de la artista" },
    "bec3":  { fr: "Clip vertical", ht: "Ti videyo vètikal", en: "Vertical clip", es: "Clip vertical" },
    "bec4":  { fr: "Écran artistique", ht: "Ekran atizana", en: "Art screen", es: "Pantalla artística" },
    "bec5":  { fr: "Affiche imprimable", ht: "Afich pou enprime", en: "Printable poster", es: "Cartel imprimible" },
    "bec6":  { fr: "Carte à envoyer", ht: "Kat pou voye bay yon moun", en: "Card to send", es: "Tarjeta para enviar" },
    "bec7":  { fr: "Kit éducatif", ht: "Kit pou lekòl", en: "Education kit", es: "Kit educativo" },
    "bec8":  { fr: "Exposition virtuelle", ht: "Ekspozisyon sou entènèt", en: "Virtual exhibition", es: "Exposición virtual" },
    "bec.n": { fr: "Une œuvre photographiée une fois donne entre 15 et 30 contenus — sans repeindre 30 tableaux.", ht: "Yon sèl zèv nou pran an foto yon fwa bay ant 15 ak 30 kontni — san nou pa bezwen penn 30 tablo.", en: "One work, photographed once, yields 15 to 30 pieces of content — without painting 30 canvases.", es: "Una obra fotografiada una vez da entre 15 y 30 contenidos, sin pintar 30 lienzos." },

    /* --- écrans --- */
    "scr.k": { fr: "Écrans artistiques", ht: "Ekran atizana", en: "Art on screens", es: "Pantallas artísticas" },
    "scr.h": { fr: "Vos écrans deviennent une galerie", ht: "Ekran nou yo tounen yon galri", en: "Your screens become a gallery", es: "Sus pantallas se convierten en una galería" },
    "scr.p": {
      fr: "Salles d'attente, bureaux, hôtels, écoles, bibliothèques, centres communautaires. Vous recevez une liste de lecture qui tourne sur un téléviseur ou un ordinateur : les œuvres changent, la narration est optionnelle. Aucune toile à transporter, aucune installation.",
      ht: "Sal datant, biwo, otèl, lekòl, bibliyotèk, sant kominotè. N ap voye yon lis ki ap jwe sou yon televizyon oswa yon òdinatè : zèv yo chanje, vwa a opsyonèl. Pa gen tablo pou transpòte, pa gen enstalasyon pou fè.",
      en: "Waiting rooms, offices, hotels, schools, libraries, community centres. You receive a playlist that runs on a TV or a computer: the works rotate, narration is optional. No canvas to ship, nothing to install.",
      es: "Salas de espera, oficinas, hoteles, escuelas, bibliotecas, centros comunitarios. Reciben una lista que se reproduce en un televisor o una computadora: las obras cambian, la narración es opcional. Sin lienzos que transportar ni instalación."
    },
    "scr.l1": { fr: "12 à 50 œuvres selon la formule", ht: "12 rive 50 zèv, sa depann de fòmil la", en: "12 to 50 works depending on the plan", es: "De 12 a 50 obras según el plan" },
    "scr.l2": { fr: "Renouvellement mensuel", ht: "Yo chanje chak mwa", en: "Refreshed every month", es: "Renovación mensual" },
    "scr.l3": { fr: "Nom de l'artiste et QR code à l'écran", ht: "Non atis la ak yon kòd QR sou ekran an", en: "Artist's name and QR code on screen", es: "Nombre de la artista y código QR en pantalla" },
    "scr.l4": { fr: "Licence par écran ou par établissement", ht: "Lisans pou chak ekran oswa chak lokal", en: "Licence per screen or per site", es: "Licencia por pantalla o por sede" },

    /* --- voix --- */
    "voi.k": { fr: "Voix d'inspiration", ht: "Vwa enspirasyon", en: "Voices of inspiration", es: "Voces de inspiración" },
    "voi.h": { fr: "Une minute avec ATM", ht: "Yon minit ak ATM", en: "One minute with ATM", es: "Un minuto con ATM" },
    "voi.p": {
      fr: "Chaque œuvre porte une voix : l'histoire du tableau, une réflexion courte, un message du matin — en créole, en français et en anglais. Des clips verticaux de 15 à 60 secondes prolongent l'œuvre sur le téléphone.",
      ht: "Chak zèv gen yon vwa : istwa tablo a, yon ti refleksyon, yon mesaj maten — an kreyòl, an fransè ak an anglè. Ti videyo vètikal 15 rive 60 segonn kontinye zèv la sou telefòn lan.",
      en: "Every work carries a voice: the story of the painting, a short reflection, a morning message — in Creole, French and English. Vertical clips of 15 to 60 seconds carry the work onto the phone.",
      es: "Cada obra lleva una voz: la historia del cuadro, una reflexión breve, un mensaje matinal, en creole, francés e inglés. Clips verticales de 15 a 60 segundos prolongan la obra en el teléfono."
    },
    "voi.s": { fr: "🎙 Enregistrements en préparation — la première série sort avec la collection pilote.", ht: "🎙 Anrejistreman yo ap prepare — premye seri a ap soti ansanm ak koleksyon pilòt la.", en: "🎙 Recordings in preparation — the first series ships with the pilot collection.", es: "🎙 Grabaciones en preparación: la primera serie sale con la colección piloto." },

    /* --- impressions --- */
    "pr.k": { fr: "Impression locale", ht: "Enprime toupre w", en: "Local printing", es: "Impresión local" },
    "pr.h": { fr: "Imprimée près de chez vous, payée par un partenaire", ht: "Yo enprime l toupre w, se yon patnè ki peye pou li", en: "Printed near you, paid for by a partner", es: "Impresa cerca de usted, pagada por un socio" },
    "pr.p": {
      fr: "Quand une institution finance des impressions, le bénéficiaire choisit une œuvre et la commande part chez un imprimeur proche de lui. Aucun stock central, aucun envoi depuis l'étranger.",
      ht: "Lè yon enstitisyon peye pou enprime, moun nan chwazi yon zèv epi kòmand lan al jwenn yon enprimè ki toupre l. Pa gen depo santral, pa gen anyen k ap soti lòt peyi.",
      en: "When an institution funds prints, the recipient picks a work and the order goes to a printer close to them. No central stock, nothing shipped from abroad.",
      es: "Cuando una institución financia impresiones, la persona elige una obra y el pedido va a una imprenta cercana. Sin stock central ni envíos desde el extranjero."
    },
    "pr.f":  { fr: "Formats standards", ht: "Fòma estanda", en: "Standard sizes", es: "Formatos estándar" },

    /* --- impact --- */
    "imp.k": { fr: "Impact", ht: "Enpak", en: "Impact", es: "Impacto" },
    "imp.h": { fr: "Ce que le programme a déjà offert", ht: "Sa pwogram nan deja bay", en: "What the programme has already given", es: "Lo que el programa ya ha ofrecido" },
    "imp.1": { fr: "expériences artistiques offertes", ht: "eksperyans atistik yo bay gratis", en: "art experiences given", es: "experiencias artísticas ofrecidas" },
    "imp.2": { fr: "impressions financées", ht: "enprime yon patnè peye", en: "prints funded", es: "impresiones financiadas" },
    "imp.3": { fr: "communautés participantes", ht: "kominote k ap patisipe", en: "participating communities", es: "comunidades participantes" },
    "imp.4": { fr: "partenaires", ht: "patnè", en: "partners", es: "socios" },
    "imp.0": { fr: "Le programme démarre. Les chiffres publiés ici seront ceux des campagnes réelles — rien d'autre.", ht: "Pwogram nan fèk kòmanse. Chif n ap pibliye la yo ap soti nan vrè kanpay yo sèlman.", en: "The programme is starting. The numbers published here will come from real campaigns — nothing else.", es: "El programa comienza. Las cifras publicadas aquí vendrán de campañas reales, nada más." },

    /* --- bandeau final --- */
    "cta.h": { fr: "Financez 1 000 expériences artistiques et 100 impressions pour une communauté de votre choix.", ht: "Peye pou 1 000 eksperyans atistik ak 100 enprime pou yon kominote nou chwazi.", en: "Fund 1,000 art experiences and 100 prints for a community of your choice.", es: "Financie 1 000 experiencias artísticas y 100 impresiones para una comunidad de su elección." },
    "cta.p": { fr: "Formule pilote : 7 500 $. Rémunération de l'artiste, production numérique, impressions, livraison, plateforme et rapport d'impact compris.", ht: "Fòmil pilòt la : 7 500 $. Sa gen ladan l lajan atis la, pwodiksyon nimerik, enprime, livrezon, platfòm nan ak rapò enpak la.", en: "Pilot package: $7,500. Artist's fee, digital production, prints, delivery, platform and impact report included.", es: "Fórmula piloto: 7 500 $. Incluye honorarios de la artista, producción digital, impresiones, entrega, plataforma e informe de impacto." },
    "cta.b": { fr: "Réserver une présentation", ht: "Pran yon randevou pou yon prezantasyon", en: "Book a presentation", es: "Reservar una presentación" },

    /* --- droits --- */
    "rig.k": { fr: "Droits & usages", ht: "Dwa ak itilizasyon", en: "Rights & usage", es: "Derechos y usos" },
    "rig.p": {
      fr: "Toutes les œuvres restent la propriété d'ATM. Les fichiers publiés ici sont en résolution limitée ; les fichiers d'impression ne circulent qu'entre Atmart et l'imprimeur autorisé. Une licence institutionnelle précise la durée, le nombre d'écrans, l'usage permis, l'interdiction de revente et l'interdiction d'entraîner une intelligence artificielle avec les œuvres.",
      ht: "Tout zèv yo rete pwopriyete ATM. Fichye ki pibliye la yo gen yon rezolisyon limite ; fichye pou enprime yo sikile sèlman ant Atmart ak enprimè ki gen otorizasyon an. Yon lisans pou enstitisyon di klè konbyen tan, konbyen ekran, ki itilizasyon yo gen dwa fè, entèdiksyon pou revann, ak entèdiksyon pou antrene yon entèlijans atifisyèl ak zèv yo.",
      en: "All works remain ATM's property. Files published here are limited in resolution; print files travel only between Atmart and the authorised printer. An institutional licence sets the duration, the number of screens, the permitted use, the ban on resale and the ban on training artificial intelligence with the works.",
      es: "Todas las obras siguen siendo propiedad de ATM. Los archivos publicados aquí tienen resolución limitada; los archivos de impresión solo circulan entre Atmart y la imprenta autorizada. Una licencia institucional fija la duración, el número de pantallas, el uso permitido, la prohibición de reventa y la prohibición de entrenar inteligencia artificial con las obras."
    },

    /* --- page d'une œuvre --- */
    "w.listen": { fr: "Écouter l'histoire", ht: "Koute istwa a", en: "Listen to the story", es: "Escuchar la historia" },
    "w.listen.s": { fr: "voix d'ATM · 60 s", ht: "vwa ATM · 60 segonn", en: "ATM's voice · 60 s", es: "voz de ATM · 60 s" },
    "w.clip": { fr: "Regarder le clip", ht: "Gade ti videyo a", en: "Watch the clip", es: "Ver el clip" },
    "w.clip.s": { fr: "format vertical · 15 à 60 s", ht: "fòma vètikal · 15 rive 60 segonn", en: "vertical format · 15 to 60 s", es: "formato vertical · 15 a 60 s" },
    "w.share": { fr: "Partager cette œuvre", ht: "Pataje zèv sa a", en: "Share this work", es: "Compartir esta obra" },
    "w.share.s": { fr: "envoyer le lien à quelqu'un", ht: "voye lyen an bay yon moun", en: "send the link to someone", es: "enviar el enlace a alguien" },
    "w.copied": { fr: "Lien copié ✓", ht: "Nou kopye lyen an ✓", en: "Link copied ✓", es: "Enlace copiado ✓" },
    "w.print": { fr: "Demander une impression", ht: "Mande yon kopi enprime", en: "Request a print", es: "Solicitar una impresión" },
    "w.buy": { fr: "Demander le prix de l'original", ht: "Mande pri orijinal la", en: "Ask the price of the original", es: "Preguntar el precio del original" },
    "w.pal": { fr: "Palette", ht: "Koulè yo", en: "Palette", es: "Paleta" },
    "w.more": { fr: "Autres œuvres", ht: "Lòt zèv", en: "More works", es: "Otras obras" },
    "w.free": { fr: "Gratuit à voir, à écouter et à partager", ht: "Gratis pou gade, pou koute ak pou pataje", en: "Free to view, listen to and share", es: "Gratis para ver, escuchar y compartir" },
    "w.404": { fr: "Œuvre introuvable.", ht: "Nou pa jwenn zèv sa a.", en: "Work not found.", es: "Obra no encontrada." }
  };

  function lang() {
    var l = document.documentElement.lang;
    if (!LANGS[l]) { try { l = localStorage.getItem("atmart_lang"); } catch (e) { l = null; } }
    return LANGS[l] ? l : "fr";
  }

  function T(key) {
    var e = S[key];
    if (!e) return "";
    return e[lang()] || e.fr;
  }

  /** Valeur multilingue venant du JSON ({fr,ht,en,es}) ou chaîne simple. */
  function V(v) {
    if (v == null) return "";
    if (typeof v === "string") return v;
    return v[lang()] || v.fr || "";
  }

  function paint(root) {
    (root || document).querySelectorAll("[data-s]").forEach(function (el) {
      el.textContent = T(el.dataset.s);
    });
  }

  var _data = null, _dir = "clean/";
  /** Charge les œuvres réelles (oeuvres.json) ET la structure de collection
      (collection.json : univers, gammes, supports, bundles, licences, concepts).
      Les univers deviennent d.collections — source unique, voir docs/atelier-atm/DOCTRINE.md. */
  function data() {
    if (!_data) {
      // une seule nouvelle tentative : sur un reseau mobile instable, un echec
      // silencieux laisserait la page entierement vide.
      var j = function (u) {
        var get = function () {
          return fetch(u, { cache: "no-cache" }).then(function (r) {
            if (!r.ok) throw new Error(r.status);
            return r.json();
          });
        };
        return get().catch(function () {
          return new Promise(function (ok) { setTimeout(ok, 700); }).then(get);
        });
      };
      _data = Promise.all([j("assets/atelier/oeuvres.json"), j("assets/atelier/collection.json")])
        .then(function (r) {
          var d = r[0], c = r[1];
          _dir = d._images === "fiches" ? "" : "clean/";
          d.collections = c.univers;
          d.C = c;
          return d;
        });
    }
    return _data;
  }

  /* clean/ = l'œuvre seule ; racine = les fiches de présentation d'origine.
     Le choix se fait dans oeuvres.json (_images). */
  function img(w) { return "assets/atelier/" + _dir + w.img; }

  function mailto(subject, body) {
    return "mailto:" + MAIL + "?subject=" + encodeURIComponent(subject) +
      (body ? "&body=" + encodeURIComponent(body) : "");
  }

  /** Redessine tout quand la langue change (i18n.js modifie <html lang>). */
  function onLang(fn) {
    var last = lang();
    new MutationObserver(function () {
      var l = lang();
      if (l === last) return;
      last = l;
      paint();
      if (fn) fn(l);
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }

  /** Visionneuse plein écran + dissuasion de copie sur les zones d'œuvres. */
  function lightbox(scopeSel) {
    var lb = document.getElementById("art-lb");
    if (!lb) return;
    var im = lb.querySelector("img");
    document.addEventListener("click", function (e) {
      var z = e.target.closest("[data-full]");
      if (z && z.closest(scopeSel)) {
        e.preventDefault();
        im.src = z.dataset.full;
        lb.style.display = "flex";
      }
    });
    lb.addEventListener("click", function () { lb.style.display = "none"; im.removeAttribute("src"); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { lb.style.display = "none"; im.removeAttribute("src"); }
    });
    ["contextmenu", "dragstart"].forEach(function (ev) {
      document.addEventListener(ev, function (e) {
        if (e.target.closest(scopeSel) || e.target.closest("#art-lb")) e.preventDefault();
      });
    });
  }

  return { S: S, T: T, V: V, lang: lang, paint: paint, data: data, img: img, mailto: mailto, onLang: onLang, lightbox: lightbox, MAIL: MAIL };
})();
