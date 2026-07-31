/* ===== Atelier ATM — libellés partagés par les pages qui vendent =====
   Chargé par atelier-business.html et atelier-institutions.html.
   Appeler ATM.offres() avant ATM.paint(). */
(function () {
  "use strict";
  ATM.offres = function () {
    Object.assign(ATM.S, {
      "in.b1": { fr: "Voir les formules", ht: "Gade fòmil yo", en: "See the plans", es: "Ver los planes" },

      "of.k": { fr: "Formules", ht: "Fòmil", en: "Plans", es: "Fórmulas" },
      "of.cta": { fr: "Demander un devis", ht: "Mande yon devi", en: "Request a quote", es: "Solicitar presupuesto" },
      "of.n": { fr: "Prix indicatifs, hors taxes. Le devis final dépend du nombre d'écrans, de sites et de bénéficiaires, et de la création demandée.", ht: "Se pri endikatif, san taks. Devi final la depann de konbyen ekran, konbyen lokal, konbyen moun k ap benefisye, ak travay kreyasyon nou mande a.", en: "Indicative prices, before tax. The final quote depends on the number of screens, sites and beneficiaries, and on the creative work required.", es: "Precios indicativos, sin impuestos. El presupuesto final depende del número de pantallas, sedes y beneficiarios, y del trabajo creativo solicitado." },

      "of1.t": { fr: "Écran artistique", ht: "Ekran atizana", en: "Art screen", es: "Pantalla artística" },
      "of1.u": { fr: "par mois et par établissement", ht: "chak mwa pou chak lokal", en: "per month, per site", es: "por mes y por sede" },
      "of1.a": { fr: "12 œuvres numériques", ht: "12 zèv nimerik", en: "12 digital works", es: "12 obras digitales" },
      "of1.b": { fr: "Renouvellement mensuel", ht: "Yo chanje chak mwa", en: "Refreshed monthly", es: "Renovación mensual" },
      "of1.c": { fr: "Messages courts d'inspiration", ht: "Ti mesaj enspirasyon", en: "Short inspiration messages", es: "Mensajes breves de inspiración" },
      "of1.d": { fr: "Licence 1 écran · nom de l'artiste et QR code", ht: "Lisans pou 1 ekran · non atis la ak kòd QR", en: "1-screen licence · artist's name and QR code", es: "Licencia 1 pantalla · nombre de la artista y código QR" },

      "of2.t": { fr: "Collection multi-sites", ht: "Koleksyon pou plizyè lokal", en: "Multi-site collection", es: "Colección multisede" },
      "of2.u": { fr: "par an", ht: "chak ane", en: "per year", es: "por año" },
      "of2.a": { fr: "Bibliothèque de 25 à 50 œuvres", ht: "Yon bibliyotèk 25 rive 50 zèv", en: "Library of 25 to 50 works", es: "Biblioteca de 25 a 50 obras" },
      "of2.b": { fr: "Écrans multiples, plusieurs sites", ht: "Plizyè ekran, plizyè lokal", en: "Multiple screens, several sites", es: "Varias pantallas y sedes" },
      "of2.c": { fr: "Clips et voix inclus", ht: "Ti videyo ak vwa yo ladan l", en: "Clips and voices included", es: "Clips y voces incluidos" },
      "of2.d": { fr: "Tableau de bord d'utilisation", ht: "Yon tablodbò ki montre kijan yo sèvi avè l", en: "Usage dashboard", es: "Panel de uso" },

      "of5.t": { fr: "Médiathèque sous licence", ht: "Medyatèk anba lisans", en: "Licensed media library", es: "Mediateca con licencia" },
      "of5.p": { fr: "Sur devis", ht: "Sou devi", en: "On quote", es: "Presupuesto a medida" },
      "of5.a": { fr: "Accès au catalogue ATM, sélection libre des œuvres", ht: "Aksè nan katalòg ATM la, nou chwazi zèv yo jan nou vle", en: "Access to the ATM catalogue, free selection of works", es: "Acceso al catálogo ATM, selección libre de obras" },
      "of5.b": { fr: "Facturation par site, par écran, par utilisateur ou par durée", ht: "Faktirasyon pou chak lokal, chak ekran, chak itilizatè oswa pou yon dire", en: "Billing per site, screen, user or duration", es: "Facturación por sede, pantalla, usuario o duración" },
      "of5.c": { fr: "Étape avancée du programme — nous en parlons ensemble", ht: "Se yon etap pi devan nan pwogram nan — n ap pale sou li ansanm", en: "A later stage of the programme — let's talk it through", es: "Etapa avanzada del programa: lo hablamos juntos" },

      "ct.k": { fr: "Parlons-en", ht: "Ann pale sou li", en: "Let's talk", es: "Hablemos" },
      "ct.p": { fr: "Réponse sous deux jours ouvrables. Une présentation dure 20 minutes et se fait en ligne.", ht: "N ap reponn nan de jou travay. Yon prezantasyon pran 20 minit epi li fèt sou entènèt.", en: "Reply within two business days. A presentation takes 20 minutes and happens online.", es: "Respuesta en dos días hábiles. La presentación dura 20 minutos y es en línea." },
      "ct.f1": { fr: "Organisation", ht: "Òganizasyon", en: "Organisation", es: "Organización" },
      "ct.f2": { fr: "Votre nom", ht: "Non ou", en: "Your name", es: "Su nombre" },
      "ct.f3": { fr: "Courriel", ht: "Imèl", en: "Email", es: "Correo" },
      "ct.f4": { fr: "Formule qui vous intéresse", ht: "Ki fòmil ki enterese nou", en: "Plan you are interested in", es: "Fórmula que le interesa" },
      "ct.f5": { fr: "Nombre d'écrans ou de sites", ht: "Konbyen ekran oswa konbyen lokal", en: "Number of screens or sites", es: "Número de pantallas o sedes" },
      "ct.f6": { fr: "Nombre de bénéficiaires visés", ht: "Konbyen moun nou vle rive jwenn", en: "Number of beneficiaries", es: "Número de beneficiarios" },
      "ct.f7": { fr: "La communauté ou l'occasion que vous avez en tête", ht: "Ki kominote oswa ki okazyon nou gen nan tèt nou", en: "The community or occasion you have in mind", es: "La comunidad o la ocasión que tienen en mente" },
      "ct.send": { fr: "Envoyer la demande", ht: "Voye demann nan", en: "Send the request", es: "Enviar la solicitud" },
      "ct.n": { fr: "Le bouton ouvre votre messagerie avec la demande déjà rédigée, adressée à sales@atmart.ltd.", ht: "Bouton an louvri bwat imèl ou a ak demann nan deja ekri, pou sales@atmart.ltd.", en: "The button opens your mail app with the request already written, addressed to sales@atmart.ltd.", es: "El botón abre su correo con la solicitud ya redactada, dirigida a sales@atmart.ltd." }
    });
  };
})();
