"use client";

import { useTranslations, useLocale } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import { formatPercent, MIN_MONTHLY_INCOME_POTENTIAL_USD, PLAN_PRICING } from "@/lib/plans/pricing";

type Locale = "es" | "en" | "fr" | "ru" | "pt" | "de";
type Plan = "vitrina" | "esencial" | "gestor";

type Step = {
  title: Record<Locale, string>;
  description: Record<Locale, string>;
};

const stepsByPlan: Record<Plan, Step[]> = {
  vitrina: [
    {
      title: {
        es: "Contáctanos",
        en: "Get started",
        fr: "Contactez-nous",
        ru: "Свяжитесь с нами",
        pt: "Fale conosco",
        de: "Kontaktieren Sie uns",
      },
      description: {
        es: "Escríbenos por WhatsApp o usa el formulario. Cuéntanos sobre tu propiedad — ubicación, tipo, precio estimado — y te respondemos en menos de 24 horas.",
        en: "Message us on WhatsApp or use the contact form. Tell us about your property — location, type, estimated price — and we'll reply within 24 hours.",
        fr: "Écrivez-nous sur WhatsApp ou utilisez le formulaire. Parlez-nous de votre bien — emplacement, type, prix estimé — et nous vous répondrons dans les 24 heures.",
        ru: "Напишите в WhatsApp или воспользуйтесь формой. Расскажите о вашем объекте — расположение, тип, примерная цена — и мы ответим в течение 24 часов.",
        pt: "Escreva pelo WhatsApp ou use o formulário. Conte sobre seu imóvel — localização, tipo, preço estimado — e responderemos em menos de 24 horas.",
        de: "Schreiben Sie uns auf WhatsApp oder nutzen Sie das Formular. Erzählen Sie von Ihrer Immobilie — Lage, Typ, Schätzpreis — und wir antworten innerhalb von 24 Stunden.",
      },
    },
    {
      title: {
        es: "Firma del acuerdo Vitrina",
        en: "Sign the Vitrina agreement",
        fr: "Signature de l'accord Vitrina",
        ru: "Подписание соглашения Vitrina",
        pt: "Assinar o acordo Vitrina",
        de: "Vitrina-Vereinbarung unterzeichnen",
      },
      description: {
        es: "Te enviamos un acuerdo de una página por correo electrónico. Lo firmas digitalmente en minutos desde tu teléfono. Establece la comisión aplicable según el tipo de operación.",
        en: "We send you a one-page agreement by email. You sign it digitally in minutes from your phone. It sets out the commission that applies per type of transaction.",
        fr: "Nous vous envoyons un accord d'une page par e-mail. Vous le signez numériquement en quelques minutes depuis votre téléphone. Il précise la commission selon le type d'opération.",
        ru: "Отправляем вам одностраничное соглашение по электронной почте. Подписываете его цифровой подписью за несколько минут с телефона. В нём указана комиссия по каждому типу сделки.",
        pt: "Enviamos um acordo de uma página por e-mail. Você o assina digitalmente em minutos pelo celular. Ele define a comissão aplicável conforme o tipo de operação.",
        de: "Wir senden Ihnen eine einseitige Vereinbarung per E-Mail. Sie unterzeichnen sie digital in wenigen Minuten vom Handy. Sie legt die Provision je nach Transaktionsart fest.",
      },
    },
    {
      title: {
        es: "Nos envías los datos de tu propiedad",
        en: "Send us your property details",
        fr: "Envoyez-nous les informations de votre bien",
        ru: "Отправьте нам данные объекта",
        pt: "Envie os dados do seu imóvel",
        de: "Senden Sie uns Ihre Immobiliendaten",
      },
      description: {
        es: "Fotos (mínimo 5), descripción, precio de renta y disponibilidad. Si no tienes fotos profesionales, podemos coordinar una sesión por cuenta del propietario.",
        en: "Photos (minimum 5), description, rental price, and availability. If you don't have professional photos, we can coordinate a session at the owner's cost.",
        fr: "Photos (5 minimum), description, prix de location et disponibilités. Si vous n'avez pas de photos professionnelles, nous pouvons coordonner une séance aux frais du propriétaire.",
        ru: "Фотографии (минимум 5), описание, цена аренды и доступность. Если нет профессиональных фото — можем организовать съёмку за счёт владельца.",
        pt: "Fotos (mínimo 5), descrição, preço de aluguel e disponibilidade. Se não tiver fotos profissionais, podemos coordenar uma sessão por conta do proprietário.",
        de: "Fotos (mindestens 5), Beschreibung, Mietpreis und Verfügbarkeit. Wenn Sie keine professionellen Fotos haben, können wir eine Session auf Eigentümerkosten koordinieren.",
      },
    },
    {
      title: {
        es: "Publicamos tu propiedad",
        en: "We publish your property",
        fr: "Nous publions votre bien",
        ru: "Размещаем ваш объект",
        pt: "Publicamos seu imóvel",
        de: "Wir veröffentlichen Ihre Immobilie",
      },
      description: {
        es: "Subimos tu propiedad a nuestro portal en casaconcierge.co en un plazo de 5 días hábiles. Todas las consultas de interesados llegan a nosotros directamente — tú no recibes contacto directo de desconocidos.",
        en: "We list your property on our portal at casaconcierge.co within 5 business days. All inquiries from interested parties come directly to us — you don't receive direct contact from strangers.",
        fr: "Nous listons votre bien sur notre portail casaconcierge.co dans les 5 jours ouvrables. Toutes les demandes des personnes intéressées nous parviennent directement — vous ne recevez pas de contact direct d'inconnus.",
        ru: "Публикуем объект на нашем портале casaconcierge.co в течение 5 рабочих дней. Все запросы от заинтересованных лиц поступают напрямую к нам — вы не получаете прямых контактов от незнакомцев.",
        pt: "Listamos seu imóvel no nosso portal casaconcierge.co em até 5 dias úteis. Todas as consultas de interessados chegam diretamente a nós — você não recebe contato direto de desconhecidos.",
        de: "Wir listen Ihre Immobilie innerhalb von 5 Werktagen auf unserem Portal casaconcierge.co. Alle Anfragen von Interessenten kommen direkt zu uns — Sie erhalten keinen Direktkontakt von Unbekannten.",
      },
    },
    {
      title: {
        es: "Coordinamos las reservaciones",
        en: "We coordinate the bookings",
        fr: "Nous coordonnons les réservations",
        ru: "Мы координируем бронирования",
        pt: "Coordenamos as reservas",
        de: "Wir koordinieren die Buchungen",
      },
      description: {
        es: "Cuando hay un interesado calificado, te contactamos con los detalles. Coordinamos fechas, condiciones y confirmación del precio antes de poner en contacto a las partes.",
        en: "When there's a qualified interested party, we contact you with the details. We coordinate dates, conditions, and price confirmation before putting the parties in contact.",
        fr: "Quand il y a une personne intéressée qualifiée, nous vous contactons avec les détails. Nous coordonnons les dates, les conditions et la confirmation du prix avant de mettre les parties en contact.",
        ru: "При появлении квалифицированного кандидата сообщаем вам детали. Согласовываем даты, условия и подтверждение цены до того, как связать стороны.",
        pt: "Quando há um interessado qualificado, entramos em contato com você com os detalhes. Coordenamos datas, condições e confirmação de preço antes de colocar as partes em contato.",
        de: "Bei einem qualifizierten Interessenten kontaktieren wir Sie mit den Details. Wir koordinieren Daten, Konditionen und Preisbestätigung, bevor die Parteien in Kontakt treten.",
      },
    },
    {
      title: {
        es: "Comisión al confirmar la operación",
        en: "Commission on confirmed transaction",
        fr: "Commission sur transaction confirmée",
        ru: "Комиссия при подтверждении сделки",
        pt: "Comissão na transação confirmada",
        de: "Provision bei bestätigter Transaktion",
      },
      description: {
        es: "Una vez confirmada la reservación o contrato de arrendamiento, se aplica la comisión acordada. Esta se abona antes de la entrega de llaves o firma del contrato. Sin reservación confirmada, sin costo.",
        en: "Once the booking or lease is confirmed, the agreed commission applies. It's paid before key handover or lease signing. No confirmed booking — no charge.",
        fr: "Une fois la réservation ou le bail confirmé, la commission convenue s'applique. Elle est versée avant la remise des clés ou la signature du bail. Pas de réservation confirmée — pas de frais.",
        ru: "После подтверждения бронирования или договора аренды начисляется согласованная комиссия. Оплачивается до передачи ключей или подписания договора. Нет подтверждения — нет платежа.",
        pt: "Uma vez confirmada a reserva ou o contrato de aluguel, a comissão acordada se aplica. É paga antes da entrega das chaves ou assinatura do contrato. Sem reserva confirmada — sem cobrança.",
        de: "Nach Bestätigung der Buchung oder des Mietvertrags gilt die vereinbarte Provision. Sie wird vor der Schlüsselübergabe oder Vertragsunterzeichnung gezahlt. Keine bestätigte Buchung — keine Kosten.",
      },
    },
  ],
  esencial: [
    {
      title: {
        es: "Contáctanos y elige el plan",
        en: "Contact us and choose the plan",
        fr: "Écrivez-nous et choisissez le plan",
        ru: "Свяжитесь с нами и выберите план",
        pt: "Fale conosco e escolha o plano",
        de: "Kontaktieren Sie uns und wählen Sie den Plan",
      },
      description: {
        es: `Escríbenos por WhatsApp o usa el formulario. Cuéntanos sobre tu propiedad. Te confirmamos en menos de 24 horas si es apta para el plan Esencial (ingreso potencial mínimo $${MIN_MONTHLY_INCOME_POTENTIAL_USD.esencial} USD/mes).`,
        en: `Message us on WhatsApp or use the form. Tell us about your property. We confirm within 24 hours whether it qualifies for the Essential plan (minimum income potential $${MIN_MONTHLY_INCOME_POTENTIAL_USD.esencial} USD/month).`,
        fr: `Écrivez-nous sur WhatsApp ou utilisez le formulaire. Parlez-nous de votre bien. Nous confirmons dans les 24 heures s'il est éligible au plan Essentiel (potentiel de revenu minimum $${MIN_MONTHLY_INCOME_POTENTIAL_USD.esencial} USD/mois).`,
        ru: `Напишите в WhatsApp или заполните форму. Расскажите об объекте. Подтвердим в течение 24 часов, подходит ли он для базового плана (минимальный потенциальный доход $${MIN_MONTHLY_INCOME_POTENTIAL_USD.esencial} USD/мес).`,
        pt: `Escreva pelo WhatsApp ou use o formulário. Conte sobre seu imóvel. Confirmamos em até 24 horas se ele se qualifica para o plano Essencial (potencial mínimo de $${MIN_MONTHLY_INCOME_POTENTIAL_USD.esencial} USD/mês).`,
        de: `Schreiben Sie uns auf WhatsApp oder nutzen Sie das Formular. Erzählen Sie von Ihrer Immobilie. Wir bestätigen innerhalb von 24 Stunden, ob sie für den Essential-Plan geeignet ist (Mindestpotenzial $${MIN_MONTHLY_INCOME_POTENTIAL_USD.esencial} USD/Monat).`,
      },
    },
    {
      title: {
        es: "Acuerdo por escrito",
        en: "Written agreement",
        fr: "Accord écrit",
        ru: "Письменное соглашение",
        pt: "Acordo por escrito",
        de: "Schriftliche Vereinbarung",
      },
      description: {
        es: `Te enviamos un resumen del plan: ${formatPercent(
          PLAN_PRICING.esencial.commissionPercent,
        )} sobre ingresos brutos, mínimo $${PLAN_PRICING.esencial.minMonthlyUsd} USD/mes, servicios incluidos y excluidos. Confirmas por correo electrónico. Solo procedemos con confirmación escrita.`,
        en: `We send you a plan summary: ${formatPercent(
          PLAN_PRICING.esencial.commissionPercent,
        )} of gross income, $${PLAN_PRICING.esencial.minMonthlyUsd} USD/month minimum, included and excluded services. You confirm by email. We only proceed with written confirmation.`,
        fr: `Nous vous envoyons un résumé du plan : ${formatPercent(
          PLAN_PRICING.esencial.commissionPercent,
        )} des revenus bruts, minimum $${PLAN_PRICING.esencial.minMonthlyUsd} USD/mois, services inclus et exclus. Vous confirmez par e-mail. Nous ne procédons qu'avec une confirmation écrite.`,
        ru: `Отправляем сводку плана: ${formatPercent(
          PLAN_PRICING.esencial.commissionPercent,
        )} от валового дохода, минимум $${PLAN_PRICING.esencial.minMonthlyUsd} USD/мес, включённые и не включённые услуги. Подтверждаете по электронной почте. Продолжаем только после письменного подтверждения.`,
        pt: `Enviamos um resumo do plano: ${formatPercent(
          PLAN_PRICING.esencial.commissionPercent,
        )} sobre receita bruta, mínimo $${PLAN_PRICING.esencial.minMonthlyUsd} USD/mês, serviços incluídos e excluídos. Você confirma por e-mail. Só prosseguimos com confirmação por escrito.`,
        de: `Wir senden Ihnen eine Planzusammenfassung: ${formatPercent(
          PLAN_PRICING.esencial.commissionPercent,
        )} des Bruttoumsatzes, $${PLAN_PRICING.esencial.minMonthlyUsd} USD/Monat Minimum, enthaltene und nicht enthaltene Leistungen. Sie bestätigen per E-Mail. Wir gehen nur mit schriftlicher Bestätigung vor.`,
      },
    },
    {
      title: {
        es: "Primer pago y bienvenida",
        en: "First payment and welcome",
        fr: "Premier paiement et bienvenue",
        ru: "Первый платёж и приветствие",
        pt: "Primeiro pagamento e boas-vindas",
        de: "Erste Zahlung und Willkommen",
      },
      description: {
        es: `Realizas el primer pago mensual ($${PLAN_PRICING.esencial.minMonthlyUsd} USD o equivalente en MXN al tipo de cambio Banxico). Recibes un recibo numerado en menos de 24 horas y el formulario de incorporación de tu propiedad.`,
        en: `You make the first monthly payment ($${PLAN_PRICING.esencial.minMonthlyUsd} USD or MXN equivalent at the Banxico rate). You receive a numbered receipt within 24 hours and the property onboarding form.`,
        fr: `Vous effectuez le premier paiement mensuel ($${PLAN_PRICING.esencial.minMonthlyUsd} USD ou équivalent MXN au taux Banxico). Vous recevez un reçu numéroté dans les 24 heures et le formulaire d'intégration de votre bien.`,
        ru: `Вносите первый ежемесячный платёж ($${PLAN_PRICING.esencial.minMonthlyUsd} USD или эквивалент в MXN по курсу Банксико). Получаете пронумерованный чек в течение 24 часов и форму для регистрации объекта.`,
        pt: `Você faz o primeiro pagamento mensal ($${PLAN_PRICING.esencial.minMonthlyUsd} USD ou equivalente em MXN pela taxa Banxico). Recebe um recibo numerado em até 24 horas e o formulário de cadastro do imóvel.`,
        de: `Sie leisten die erste Monatszahlung ($${PLAN_PRICING.esencial.minMonthlyUsd} USD oder MXN-Äquivalent zum Banxico-Kurs). Sie erhalten innerhalb von 24 Stunden eine nummerierte Quittung und das Immobilien-Onboarding-Formular.`,
      },
    },
    {
      title: {
        es: "Incorporación de la propiedad",
        en: "Property onboarding",
        fr: "Intégration de la propriété",
        ru: "Регистрация объекта",
        pt: "Cadastro do imóvel",
        de: "Immobilien-Onboarding",
      },
      description: {
        es: "Completas el formulario en línea con: dirección, número de habitaciones, datos de acceso (por canal seguro — nunca WhatsApp), URL de tus listados actuales y reglas de la casa.",
        en: "You complete the online form with: address, number of rooms, access details (via secure channel — never WhatsApp), your current listing URLs, and house rules.",
        fr: "Vous remplissez le formulaire en ligne avec : adresse, nombre de pièces, accès (via canal sécurisé — jamais WhatsApp), URL de vos annonces actuelles et règlement de la maison.",
        ru: "Заполняете онлайн-форму: адрес, количество комнат, данные доступа (через защищённый канал — не через WhatsApp), ссылки на текущие объявления, правила дома.",
        pt: "Você preenche o formulário online com: endereço, número de quartos, dados de acesso (via canal seguro — nunca WhatsApp), URLs dos seus anúncios atuais e regras da casa.",
        de: "Sie füllen das Online-Formular aus: Adresse, Zimmeranzahl, Zugangsdaten (über sicheren Kanal — nie WhatsApp), Ihre aktuellen Listing-URLs und Hausregeln.",
      },
    },
    {
      title: {
        es: "Visita inicial de inspección",
        en: "Initial inspection visit",
        fr: "Visite initiale d'inspection",
        ru: "Первоначальный инспекционный визит",
        pt: "Visita inicial de inspeção",
        de: "Erster Inspektionsbesuch",
      },
      description: {
        es: "Dentro de los 5 días hábiles visitamos tu propiedad. Fotografiamos cada habitación, hacemos inventario y evaluamos su potencial de renta. Recibes un reporte escrito con nuestras recomendaciones antes de activar el servicio.",
        en: "Within 5 business days we visit your property. We photograph every room, take inventory, and assess rental potential. You receive a written report with our recommendations before the service goes active.",
        fr: "Dans les 5 jours ouvrables, nous visitons votre propriété. Nous photographions chaque pièce, faisons l'inventaire et évaluons le potentiel locatif. Vous recevez un rapport écrit avec nos recommandations avant l'activation.",
        ru: "В течение 5 рабочих дней посещаем объект. Фотографируем каждую комнату, составляем опись и оцениваем арендный потенциал. До активации сервиса вы получаете письменный отчёт с рекомендациями.",
        pt: "Em até 5 dias úteis visitamos seu imóvel. Fotografamos cada cômodo, fazemos inventário e avaliamos o potencial de aluguel. Você recebe um relatório escrito com nossas recomendações antes de ativar o serviço.",
        de: "Innerhalb von 5 Werktagen besuchen wir Ihre Immobilie. Wir fotografieren jedes Zimmer, erstellen ein Inventar und bewerten das Mietpotenzial. Sie erhalten einen schriftlichen Bericht mit unseren Empfehlungen, bevor der Service aktiviert wird.",
      },
    },
    {
      title: {
        es: "Consultoría de listado (una vez)",
        en: "Listing consultation (one time)",
        fr: "Consultation d'annonce (une fois)",
        ru: "Консультация по объявлению (однократно)",
        pt: "Consultoria de anúncio (uma vez)",
        de: "Listing-Beratung (einmalig)",
      },
      description: {
        es: "Revisamos tu listado actual en Airbnb o Booking (o te ayudamos a crear uno). Te enviamos recomendaciones escritas sobre título, descripción, fotos y precios. Tú implementas los cambios.",
        en: "We review your current Airbnb or Booking listing (or help you create one). We send written recommendations on title, description, photos, and pricing. You implement the changes.",
        fr: "Nous examinons votre annonce Airbnb ou Booking actuelle (ou vous aidons à en créer une). Nous vous envoyons des recommandations écrites sur le titre, la description, les photos et les prix. Vous mettez en œuvre les changements.",
        ru: "Просматриваем ваше текущее объявление на Airbnb или Booking (или помогаем создать новое). Отправляем письменные рекомендации по заголовку, описанию, фотографиям и ценам. Изменения вносите вы.",
        pt: "Revisamos seu anúncio atual no Airbnb ou Booking (ou ajudamos a criar um). Enviamos recomendações escritas sobre título, descrição, fotos e preços. Você implementa as mudanças.",
        de: "Wir prüfen Ihr aktuelles Airbnb- oder Booking-Inserat (oder helfen Ihnen, eines zu erstellen). Wir senden schriftliche Empfehlungen zu Titel, Beschreibung, Fotos und Preisen. Sie setzen die Änderungen um.",
      },
    },
    {
      title: {
        es: "Operación mensual continua",
        en: "Ongoing monthly operations",
        fr: "Opérations mensuelles continues",
        ru: "Постоянные ежемесячные операции",
        pt: "Operações mensais contínuas",
        de: "Laufende monatliche Operationen",
      },
      description: {
        es: "Cada mes: visita de inspección con reporte fotográfico, coordinación de mantenimiento básico y reporte mensual con el estado de tu propiedad. Puedes cancelar en cualquier momento — sin permanencia mínima.",
        en: "Every month: inspection visit with photo report, basic maintenance coordination, and monthly report on your property's condition. Cancel at any time — no minimum commitment.",
        fr: "Chaque mois : visite d'inspection avec rapport photo, coordination de la maintenance de base et rapport mensuel sur l'état de votre bien. Annulation possible à tout moment — sans engagement minimum.",
        ru: "Каждый месяц: инспекционный визит с фотоотчётом, базовая координация обслуживания и ежемесячный отчёт о состоянии объекта. Отмена в любое время — без минимального срока.",
        pt: "Todo mês: visita de inspeção com relatório fotográfico, coordenação de manutenção básica e relatório mensal do estado do imóvel. Cancele a qualquer momento — sem compromisso mínimo.",
        de: "Jeden Monat: Inspektionsbesuch mit Fotobericht, grundlegende Wartungskoordination und Monatsbericht über den Zustand Ihrer Immobilie. Kündigung jederzeit möglich — keine Mindestlaufzeit.",
      },
    },
  ],
  gestor: [
    {
      title: {
        es: "Contáctanos y elige el plan",
        en: "Contact us and choose the plan",
        fr: "Écrivez-nous et choisissez le plan",
        ru: "Свяжитесь с нами и выберите план",
        pt: "Fale conosco e escolha o plano",
        de: "Kontaktieren Sie uns und wählen Sie den Plan",
      },
      description: {
        es: `Escríbenos por WhatsApp o usa el formulario. Cuéntanos sobre tu propiedad. Respondemos en menos de 24 horas. Evaluamos si aplica el plan Gestor (potencial mínimo $${MIN_MONTHLY_INCOME_POTENTIAL_USD.fullManagement} USD/mes).`,
        en: `Message us on WhatsApp or use the form. Tell us about your property. We reply within 24 hours and assess whether it's a fit for Full Management (minimum $${MIN_MONTHLY_INCOME_POTENTIAL_USD.fullManagement} USD/month potential).`,
        fr: `Écrivez-nous sur WhatsApp ou utilisez le formulaire. Parlez-nous de votre bien. Nous répondons dans les 24 heures et évaluons si le plan Gestion complète correspond (potentiel minimum $${MIN_MONTHLY_INCOME_POTENTIAL_USD.fullManagement} USD/mois).`,
        ru: `Напишите в WhatsApp или заполните форму. Расскажите об объекте. Ответим в течение 24 часов и оценим соответствие плану «Полное управление» (минимальный потенциал $${MIN_MONTHLY_INCOME_POTENTIAL_USD.fullManagement} USD/мес).`,
        pt: `Escreva pelo WhatsApp ou use o formulário. Conte sobre seu imóvel. Respondemos em até 24 horas e avaliamos se ele se enquadra no Full Management (potencial mínimo $${MIN_MONTHLY_INCOME_POTENTIAL_USD.fullManagement} USD/mês).`,
        de: `Schreiben Sie uns auf WhatsApp oder nutzen Sie das Formular. Erzählen Sie von Ihrer Immobilie. Wir antworten innerhalb von 24 Stunden und prüfen, ob Full Management passt (Mindestpotenzial $${MIN_MONTHLY_INCOME_POTENTIAL_USD.fullManagement} USD/Monat).`,
      },
    },
    {
      title: {
        es: "Acuerdo por escrito",
        en: "Written agreement",
        fr: "Accord écrit",
        ru: "Письменное соглашение",
        pt: "Acordo por escrito",
        de: "Schriftliche Vereinbarung",
      },
      description: {
        es: `Te enviamos el resumen del plan Gestor: ${formatPercent(
          PLAN_PRICING.fullManagement.commissionPercent,
        )} sobre ingresos brutos, mínimo $${PLAN_PRICING.fullManagement.minMonthlyUsd} USD/mes, todos los servicios incluidos. Acordamos también el método de pago, el presupuesto mensual de mantenimiento preaprobado y la periodicidad de remisión de ingresos (día 7 de cada mes).`,
        en: `We send you the Full Management plan summary: ${formatPercent(
          PLAN_PRICING.fullManagement.commissionPercent,
        )} of gross income, $${PLAN_PRICING.fullManagement.minMonthlyUsd} USD/month minimum, all services included. We also agree on the payment method, pre-approved monthly maintenance budget, and income remittance schedule (day 7 of each month).`,
        fr: `Nous vous envoyons le résumé du plan Gestion complète : ${formatPercent(
          PLAN_PRICING.fullManagement.commissionPercent,
        )} des revenus bruts, minimum $${PLAN_PRICING.fullManagement.minMonthlyUsd} USD/mois, tous les services inclus. Nous convenons aussi du mode de paiement, du budget mensuel de maintenance pré-approuvé et du calendrier de versement des revenus (7e de chaque mois).`,
        ru: `Отправляем сводку плана «Полное управление»: ${formatPercent(
          PLAN_PRICING.fullManagement.commissionPercent,
        )} от валового дохода, минимум $${PLAN_PRICING.fullManagement.minMonthlyUsd} USD/мес, все услуги включены. Также согласовываем способ оплаты, предварительно одобренный ежемесячный бюджет на обслуживание и график выплат (7-е число каждого месяца).`,
        pt: `Enviamos o resumo do plano Full Management: ${formatPercent(
          PLAN_PRICING.fullManagement.commissionPercent,
        )} sobre receita bruta, mínimo $${PLAN_PRICING.fullManagement.minMonthlyUsd} USD/mês, todos os serviços incluídos. Também acordamos o método de pagamento, orçamento mensal de manutenção pré-aprovado e calendário de remessa de renda (dia 7 de cada mês).`,
        de: `Wir senden Ihnen die Full-Management-Planzusammenfassung: ${formatPercent(
          PLAN_PRICING.fullManagement.commissionPercent,
        )} des Bruttoumsatzes, $${PLAN_PRICING.fullManagement.minMonthlyUsd} USD/Monat Minimum, alle Leistungen inbegriffen. Wir vereinbaren auch Zahlungsmethode, vorab genehmigtes monatliches Wartungsbudget und Einkommensüberweisungsplan (7. jedes Monats).`,
      },
    },
    {
      title: {
        es: "Primer pago y bienvenida",
        en: "First payment and welcome",
        fr: "Premier paiement et bienvenue",
        ru: "Первый платёж и приветствие",
        pt: "Primeiro pagamento e boas-vindas",
        de: "Erste Zahlung und Willkommen",
      },
      description: {
        es: `Realizas el primer pago ($${PLAN_PRICING.fullManagement.minMonthlyUsd} USD o equivalente en MXN). Recibes recibo numerado y el formulario de incorporación completo de la propiedad.`,
        en: `You make the first payment ($${PLAN_PRICING.fullManagement.minMonthlyUsd} USD or MXN equivalent). You receive a numbered receipt and the full property onboarding form.`,
        fr: `Vous effectuez le premier paiement (${PLAN_PRICING.fullManagement.minMonthlyUsd} USD ou équivalent en MXN). Vous recevez un reçu numéroté et le formulaire complet d'intégration de la propriété.`,
        ru: `Вносите первый платёж ($${PLAN_PRICING.fullManagement.minMonthlyUsd} USD или эквивалент в MXN). Получаете пронумерованный чек и полную форму регистрации объекта.`,
        pt: `Você faz o primeiro pagamento ($${PLAN_PRICING.fullManagement.minMonthlyUsd} USD ou equivalente em MXN). Recebe um recibo numerado e o formulário completo de cadastro do imóvel.`,
        de: `Sie leisten die erste Zahlung ($${PLAN_PRICING.fullManagement.minMonthlyUsd} USD oder MXN-Äquivalent). Sie erhalten eine nummerierte Quittung und das vollständige Immobilien-Onboarding-Formular.`,
      },
    },
    {
      title: {
        es: "Incorporación y acceso co-anfitrión",
        en: "Onboarding and co-host access",
        fr: "Intégration et accès co-hôte",
        ru: "Регистрация и доступ соведущего",
        pt: "Cadastro e acesso de co-anfitrião",
        de: "Onboarding und Co-Host-Zugang",
      },
      description: {
        es: "Completas el formulario de incorporación. Nos agregas como co-anfitrión en Airbnb (te explicamos paso a paso). Compartimos datos de acceso por canal seguro — nunca por WhatsApp.",
        en: "You complete the onboarding form. You add us as co-host on Airbnb (we walk you through it step by step). Access details shared via secure channel — never WhatsApp.",
        fr: "Vous remplissez le formulaire d'intégration. Vous nous ajoutez comme co-hôte sur Airbnb (nous vous guidons pas à pas). Les données d'accès sont partagées via un canal sécurisé — jamais WhatsApp.",
        ru: "Заполняете форму регистрации. Добавляете нас как соведущего на Airbnb (проводим вас по шагам). Данные доступа передаются через защищённый канал — не через WhatsApp.",
        pt: "Você preenche a forma de cadastro. Nos adiciona como co-anfitrião no Airbnb (explicamos passo a passo). Dados de acesso compartilhados por canal seguro — nunca WhatsApp.",
        de: "Sie füllen das Onboarding-Formular aus. Sie fügen uns als Co-Host auf Airbnb hinzu (wir führen Sie Schritt für Schritt). Zugangsdaten werden über sicheren Kanal geteilt — nie WhatsApp.",
      },
    },
    {
      title: {
        es: "Inspección inicial y activación del listado",
        en: "Initial inspection and listing activation",
        fr: "Inspection initiale et activation de l'annonce",
        ru: "Первоначальная инспекция и активация объявления",
        pt: "Inspeção inicial e ativação do anúncio",
        de: "Erstinspektion und Listing-Aktivierung",
      },
      description: {
        es: "Visitamos tu propiedad dentro de los 5 días hábiles. Inspeccionamos y fotografiamos todo. Optimizamos o creamos tu listado en Airbnb, VRBO y Booking.com. Tú apruebas el listado antes de publicarlo.",
        en: "We visit your property within 5 business days. We inspect and photograph everything. We optimize or create your listing on Airbnb, VRBO, and Booking.com. You approve the listing before it goes live.",
        fr: "Nous visitons votre bien dans les 5 jours ouvrables. Nous inspectons et photographions tout. Nous optimisons ou créons votre annonce sur Airbnb, VRBO, et Booking.com. Vous approuvez l'annonce avant la mise en ligne.",
        ru: "Посещаем объект в течение 5 рабочих дней. Всё инспектируем и фотографируем. Оптимизируем или создаём объявление на Airbnb, VRBO и Booking.com. Вы одобряете объявление перед публикацией.",
        pt: "Visitamos seu imóvel em até 5 dias úteis. Inspecionamos e fotografamos tudo. Otimizamos ou criamos seu anúncio no Airbnb, VRBO e Booking.com. Você aprova o anúncio antes de publicar.",
        de: "Wir besuchen Ihre Immobilie innerhalb von 5 Werktagen. Wir inspizieren und fotografieren alles. Wir optimieren oder erstellen Ihr Inserat auf Airbnb, VRBO und Booking.com. Sie genehmigen das Inserat vor der Veröffentlichung.",
      },
    },
    {
      title: {
        es: "Gestión activa diaria",
        en: "Active daily management",
        fr: "Gestion active quotidienne",
        ru: "Активное ежедневное управление",
        pt: "Gestão ativa diária",
        de: "Aktives tägliches Management",
      },
      description: {
        es: "Nos encargamos de todo: la comunicación con huéspedes se maneja con un sistema de respuesta rápida, típicamente en minutos durante horas activas (con cobertura extendida para situaciones urgentes). Coordinamos check-in y check-out, gestionamos la limpieza después de cada estancia y manejamos el mantenimiento con tu presupuesto preaprobado. Tú no haces nada.",
        en: "We handle everything: guest communication is handled with a fast-response system, typically within minutes during active hours (extended coverage for urgent situations). We coordinate check-in and check-out, manage cleaning after every stay, and handle maintenance within your pre-approved budget. You do nothing.",
        fr: "Nous gérons tout : la communication avec les clients est gérée via un système de réponse rapide, généralement en quelques minutes pendant les heures actives (couverture étendue pour les situations urgentes). Nous coordonnons les arrivées et départs, gérons le nettoyage après chaque séjour et traitons la maintenance dans votre budget pré-approuvé. Vous ne faites rien.",
        ru: "Берём всё на себя: общение с гостями ведётся через систему быстрого ответа — обычно в течение нескольких минут в активные часы (расширенное покрытие для срочных ситуаций). Мы координируем заезд и выезд, организуем уборку после каждого проживания и решаем вопросы обслуживания в рамках вашего предварительно согласованного бюджета. Вы ничего не делаете.",
        pt: "Cuidamos de tudo: a comunicação com hóspedes é feita com um sistema de resposta rápida, normalmente em minutos durante as horas ativas (cobertura estendida para situações urgentes). Coordenamos check-in e check-out, gerenciamos a limpeza após cada estadia e tratamos da manutenção dentro do seu orçamento pré-aprovado. Você não faz nada.",
        de: "Wir erledigen alles: Die Gästekommunikation erfolgt über ein Schnellantwort-System, typischerweise innerhalb von Minuten während aktiver Zeiten (erweiterte Abdeckung für dringende Situationen). Check-in und Check-out koordinieren wir, die Reinigung nach jedem Aufenthalt wird organisiert, und Wartung erfolgt im Rahmen Ihres vorab genehmigten Budgets. Sie tun nichts.",
      },
    },
    {
      title: {
        es: "Reporte mensual e ingresos",
        en: "Monthly report and income",
        fr: "Rapport mensuel et revenus",
        ru: "Ежемесячный отчёт и доходы",
        pt: "Relatório mensal e renda",
        de: "Monatsbericht und Einnahmen",
      },
      description: {
        es: "Cada mes recibes: tu parte de los ingresos de renta transferida dentro de los primeros 7 días hábiles de cada mes, y un reporte PDF con todas las reservaciones, gastos de limpieza y mantenimiento, nuestra comisión y tu ingreso neto. Todo transparente, sin letra pequeña.",
        en: "Every month you receive: your share of rental income remitted within the first 7 business days of each month, and a PDF report with all bookings, cleaning and maintenance costs, our commission, and your net income. Fully transparent, no fine print.",
        fr: "Chaque mois, vous recevez : votre part des revenus locatifs versée dans les 7 premiers jours ouvrables de chaque mois, et un rapport PDF avec toutes les réservations, les frais de nettoyage et d'entretien, notre commission et votre revenu net. Entièrement transparent, sans petits caractères.",
        ru: "Каждый месяц вы получаете: вашу долю дохода от аренды, переводимую в течение первых 7 рабочих дней каждого месяца, и PDF-отчёт со всеми бронированиями, расходами на уборку и обслуживание, нашей комиссией и вашим чистым доходом. Полная прозрачность, без мелкого шрифта.",
        pt: "Todo mês você recebe: sua parte da renda de aluguel transferida dentro dos primeiros 7 dias úteis de cada mês, e um relatório PDF com todas as reservas, custos de limpeza e manutenção, nossa comissão e sua renda líquida. Totalmente transparente, sem letras miúdas.",
        de: "Jeden Monat erhalten Sie: Ihren Anteil der Mieteinnahmen innerhalb der ersten 7 Werktage jedes Monats, und einen PDF-Bericht mit allen Buchungen, Reinigungs- und Wartungskosten, unserer Provision und Ihrem Nettoeinkommen. Vollständig transparent, kein Kleingedrucktes.",
      },
    },
    {
      title: {
        es: "Cancela cuando quieras",
        en: "Cancel whenever you want",
        fr: "Résiliez quand vous voulez",
        ru: "Отмена в любое время",
        pt: "Cancele quando quiser",
        de: "Kündigen Sie wann immer Sie möchten",
      },
      description: {
        es: "Sin permanencia mínima. Cancelas por correo electrónico en cualquier momento. El servicio continúa hasta el final del período pagado. Tus fotos se eliminan de nuestros canales en máximo 48 horas. Recibes un reporte final de tu propiedad.",
        en: "No minimum commitment. Cancel by email at any time. The service continues until the end of the paid period. Your photos are removed from our channels within 48 hours. You receive a final property report.",
        fr: "Sans engagement minimum. Résiliez par e-mail à tout moment. Le service se poursuit jusqu'à la fin de la période payée. Vos photos sont supprimées de nos canaux dans les 48 heures. Vous recevez un rapport final sur votre bien.",
        ru: "Без минимального срока. Отменяйте по электронной почте в любое время. Сервис продолжается до конца оплаченного периода. Ваши фотографии удаляются с наших каналов в течение 48 часов. Вы получаете финальный отчёт по объекту.",
        pt: "Sem compromisso mínimo. Cancele por e-mail a qualquer momento. O serviço continua até o final do período pago. Suas fotos são removidas dos nossos canais em até 48 horas. Você recebe um relatório final do imóvel.",
        de: "Keine Mindestlaufzeit. Kündigen Sie jederzeit per E-Mail. Der Service läuft bis zum Ende des bezahlten Zeitraums. Ihre Fotos werden innerhalb von 48 Stunden aus unseren Kanälen entfernt. Sie erhalten einen abschließenden Immobilienbericht.",
      },
    },
  ],
};

function planAccent(plan: Plan) {
  if (plan === "vitrina") {
    return {
      badgeBg: "bg-emerald-700",
      badgeText: "text-white",
      headerBorder: "border-emerald-300",
      titleColor: "text-emerald-800",
    };
  }

  return {
    badgeBg: "bg-primary-700",
    badgeText: "text-white",
    headerBorder: "border-primary-200",
    titleColor: "text-primary-800",
  };
}

export function PlanStepsModal({
  plan,
  open,
  onClose,
}: {
  plan: Plan;
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("planSteps");
  const locale = useLocale() as Locale;
  const accent = planAccent(plan);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const [animateIn, setAnimateIn] = useState(false);

  const steps = useMemo(() => stepsByPlan[plan] ?? [], [plan]);

  const modalTitleKey: Record<Plan, "modal_title_vitrina" | "modal_title_esencial" | "modal_title_gestor"> =
    {
      vitrina: "modal_title_vitrina",
      esencial: "modal_title_esencial",
      gestor: "modal_title_gestor",
    };

  useEffect(() => {
    if (!open) return;
    // Prevent background scrolling while the modal is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Next tick enables CSS transition from initial state to final state.
    const id = window.setTimeout(() => {
      // Start from the "out" state, then transition in.
      setAnimateIn(false);
      closeBtnRef.current?.focus();
      window.requestAnimationFrame(() => setAnimateIn(true));
    }, 0);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(id);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function getFocusable() {
      const root = dialogRef.current;
      if (!root) return [];
      return Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled"));
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== "Tab") return;
      const focusables = getFocusable();
      if (!focusables.length) return;

      const current = document.activeElement as HTMLElement | null;
      const idx = current ? focusables.indexOf(current) : -1;

      if (e.shiftKey) {
        if (idx <= 0) {
          e.preventDefault();
          focusables[focusables.length - 1]?.focus();
        }
        return;
      }

      // forward tab
      if (idx === focusables.length - 1) {
        e.preventDefault();
        focusables[0]?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch bg-black/50 p-0 sm:items-center sm:justify-center sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={t(modalTitleKey[plan])}
        className={[
          "flex h-full w-full flex-col overflow-hidden rounded-none bg-white shadow-xl border sm:h-auto sm:max-w-2xl sm:rounded-2xl",
          accent.headerBorder,
          "transform transition-all duration-200",
          animateIn ? "opacity-100 sm:scale-100" : "opacity-0 sm:scale-95",
        ].join(" ")}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 bg-white px-5 py-4">
          <div className="min-w-0">
            <h2
              className={[
                "text-base font-semibold",
                accent.titleColor,
                "truncate",
              ].join(" ")}
            >
              {t(modalTitleKey[plan])}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {plan === "vitrina"
                ? "6 steps"
                : plan === "esencial"
                  ? "7 steps"
                  : "8 steps"}
            </p>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label={t("modal_close")}
            className="rounded-full border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700 hover:bg-slate-50"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 max-h-none sm:max-h-[70vh]">
          <ol className="space-y-5">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <div
                  className={[
                    "shrink-0 rounded-full px-3 py-1 text-xs font-semibold",
                    accent.badgeBg,
                    accent.badgeText,
                  ].join(" ")}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-slate-900">
                    {step.title[locale] ?? step.title.en}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {step.description[locale] ?? step.description.en}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-slate-100 bg-white px-5 py-4">
          <a
            href="#contact"
            className={[
              "inline-flex items-center justify-center rounded-full bg-primary-700 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-800",
            ].join(" ")}
          >
            {t("modal_cta")}
          </a>
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-medium text-slate-500 hover:text-slate-700"
          >
            {t("modal_close")}
          </button>
        </div>
      </div>
    </div>
  );
}

