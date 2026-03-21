"use client";

import { useLocale } from "next-intl";
import { useState } from "react";

type Locale = "es" | "en" | "fr" | "ru" | "pt" | "de";
type FaqItem = { key: string; q: string; a: string };
type CategoryKey = "getting_started" | "pricing" | "service" | "trust" | "process";
type Category = { key: CategoryKey; title: Record<Locale, string> };
type FaqSourceItem = {
  key: string;
  category: CategoryKey;
  question: Record<Locale, string>;
  answer: Record<Locale, string>;
};

const CATEGORIES: Category[] = [
  {
    key: "getting_started",
    title: {
      es: "Cómo empezar",
      en: "Getting started",
      fr: "Pour commencer",
      ru: "Начало работы",
      pt: "Como começar",
      de: "Erste Schritte",
    },
  },
  {
    key: "pricing",
    title: {
      es: "Precios y pagos",
      en: "Pricing & payments",
      fr: "Tarifs et paiements",
      ru: "Цены и оплата",
      pt: "Preços e pagamentos",
      de: "Preise & Zahlung",
    },
  },
  {
    key: "service",
    title: {
      es: "Cómo funciona",
      en: "How it works",
      fr: "Comment ça fonctionne",
      ru: "Как это работает",
      pt: "Como funciona",
      de: "Wie es funktioniert",
    },
  },
  {
    key: "trust",
    title: {
      es: "Confianza y seguridad",
      en: "Trust & safety",
      fr: "Confiance et sécurité",
      ru: "Доверие и безопасность",
      pt: "Confiança e segurança",
      de: "Vertrauen & Sicherheit",
    },
  },
  {
    key: "process",
    title: {
      es: "Proceso y comunicación",
      en: "Process & communication",
      fr: "Processus et communication",
      ru: "Процесс и коммуникация",
      pt: "Processo e comunicação",
      de: "Prozess & Kommunikation",
    },
  },
];

const FAQ_ITEMS: FaqSourceItem[] = [
  {
    key: "faq_how_to_start",
    category: "getting_started",
    question: {
      es: "¿Como empiezo a trabajar con Casa Concierge PDC?",
      en: "How do I get started with Casa Concierge PDC?",
      fr: "Comment puis-je commencer avec Casa Concierge PDC ?",
      ru: "Как начать работу с Casa Concierge PDC?",
      pt: "Como comeco a trabalhar com a Casa Concierge PDC?",
      de: "Wie fange ich mit Casa Concierge PDC an?",
    },
    answer: {
      es: "Es muy sencillo. Contactanos por WhatsApp o por el formulario de esta pagina. Conversamos sobre tu propiedad, te recomendamos el plan mas adecuado y acordamos los terminos por escrito. Una vez confirmado el acuerdo, hacemos una visita inicial a tu propiedad y comenzamos.",
      en: "It's straightforward. Contact us via WhatsApp or through the form on this page. We'll talk about your property, recommend the best plan, and confirm the terms in writing. Once the agreement is in place, we schedule an initial visit and get started.",
      fr: "C'est simple. Contactez-nous via WhatsApp ou via le formulaire de cette page. Nous discuterons de votre propriete, recommanderons le plan le plus adapte et confirmerons les termes par ecrit. Une fois l'accord conclu, nous planifions une visite initiale et commencons.",
      ru: "Всё просто. Свяжитесь с нами через WhatsApp или форму на этой странице. Обсудим вашу недвижимость, подберём подходящий план и подтвердим условия в письменном виде. После этого назначим первый визит на объект и приступим к работе.",
      pt: "E simples. Entre em contato pelo WhatsApp ou pelo formulario desta pagina. Conversaremos sobre seu imovel, recomendaremos o plano mais adequado e confirmaremos os termos por escrito. Com o acordo firmado, agendamos uma visita inicial e comecamos.",
      de: "Ganz einfach. Kontaktieren Sie uns per WhatsApp oder uber das Formular auf dieser Seite. Wir besprechen Ihre Immobilie, empfehlen den passenden Plan und bestatigen die Bedingungen schriftlich. Sobald die Vereinbarung steht, planen wir einen ersten Besuch und legen los.",
    },
  },
  {
    key: "faq_where_do_you_operate",
    category: "getting_started",
    question: {
      es: "¿En que zonas operan?",
      en: "What areas do you cover?",
      fr: "Quelles zones couvrez-vous ?",
      ru: "В каких районах вы работаете?",
      pt: "Quais areas voces atendem?",
      de: "Welche Gebiete decken Sie ab?",
    },
    answer: {
      es: "Operamos principalmente en Playa del Carmen y la Riviera Maya, incluyendo Tulum, Puerto Morelos, Akumal y zonas residenciales como Mayakoba. Si tu propiedad esta fuera de estas areas, contactanos igualmente - evaluamos cada caso individualmente.",
      en: "We operate primarily in Playa del Carmen and the Riviera Maya, including Tulum, Puerto Morelos, Akumal, and residential areas like Mayakoba. If your property is outside these areas, contact us anyway - we evaluate each case individually.",
      fr: "Nous operons principalement a Playa del Carmen et sur la Riviera Maya, incluant Tulum, Puerto Morelos, Akumal et des zones residentielles comme Mayakoba. Si votre propriete est en dehors de ces zones, contactez-nous quand meme - nous evaluons chaque cas individuellement.",
      ru: "Мы работаем преимущественно в Плая-дель-Кармен и на Ривьера-Майя, включая Тулум, Пуэрто-Морелос, Акумаль и жилые комплексы, например Майакоба. Если ваша недвижимость находится за пределами этих зон - свяжитесь с нами, мы рассматриваем каждый случай индивидуально.",
      pt: "Atuamos principalmente em Playa del Carmen e na Riviera Maya, incluindo Tulum, Puerto Morelos, Akumal e areas residenciais como Mayakoba. Se seu imovel estiver fora dessas areas, entre em contato mesmo assim - avaliamos cada caso individualmente.",
      de: "Wir sind hauptsachlich in Playa del Carmen und der Riviera Maya tatig, einschliesslich Tulum, Puerto Morelos, Akumal und Wohngebieten wie Mayakoba. Wenn Ihre Immobilie ausserhalb dieser Gebiete liegt, kontaktieren Sie uns trotzdem - wir prufen jeden Fall individuell.",
    },
  },
  {
    key: "faq_property_types",
    category: "getting_started",
    question: {
      es: "¿Que tipo de propiedades gestionan?",
      en: "What types of properties do you manage?",
      fr: "Quels types de proprietes gerez-vous ?",
      ru: "Какими типами недвижимости вы управляете?",
      pt: "Que tipos de imoveis voces gerenciam?",
      de: "Welche Arten von Immobilien verwalten Sie?",
    },
    answer: {
      es: "Gestionamos departamentos, condominios, casas y villas vacacionales. La propiedad debe tener un potencial de ingreso mensual minimo de $600 USD para que la gestion sea rentable para ambas partes. Si no estas seguro, cuentanos sobre tu propiedad y te damos una evaluacion honesta.",
      en: "We manage apartments, condos, houses, and vacation villas. The property should have a minimum monthly income potential of $600 USD for management to make financial sense for both sides. If you're not sure, tell us about your property and we'll give you an honest assessment.",
      fr: "Nous gerons des appartements, condos, maisons et villas de vacances. La propriete doit avoir un potentiel de revenu mensuel minimum de 600 USD pour que la gestion soit rentable des deux cotes. Si vous n'etes pas sur, parlez-nous de votre propriete et nous vous donnerons une evaluation honnete.",
      ru: "Мы управляем квартирами, кондоминиумами, домами и туристическими виллами. Для обоюдной выгоды объект должен приносить не менее $600 USD в месяц. Если не уверены - расскажите о своей недвижимости, и мы честно оценим её потенциал.",
      pt: "Gerenciamos apartamentos, condominios, casas e vilas de ferias. O imovel deve ter um potencial de renda mensal minimo de $600 USD para que a gestao seja financeiramente viavel para ambas as partes. Se nao tiver certeza, fale sobre seu imovel e faremos uma avaliacao honesta.",
      de: "Wir verwalten Apartments, Eigentumswohnungen, Hauser und Ferienvillen. Die Immobilie sollte ein monatliches Einkommenspotenzial von mindestens $600 USD haben. Falls Sie unsicher sind, erzahlen Sie uns von Ihrer Immobilie - wir geben Ihnen eine ehrliche Einschatzung.",
    },
  },
  {
    key: "faq_first_visit",
    category: "getting_started",
    question: {
      es: "¿Que pasa en la primera visita a mi propiedad?",
      en: "What happens during the first visit to my property?",
      fr: "Que se passe-t-il lors de la premiere visite de ma propriete ?",
      ru: "Что происходит при первом визите на объект?",
      pt: "O que acontece na primeira visita ao meu imovel?",
      de: "Was passiert beim ersten Besuch meiner Immobilie?",
    },
    answer: {
      es: "Hacemos una inspeccion completa: estado general, fotografias de todas las habitaciones, inventario de mobiliario y electrodomesticos, revision de accesos, y evaluacion del potencial de renta. Te enviamos un reporte escrito con nuestras recomendaciones antes de empezar a gestionar activamente.",
      en: "We conduct a full inspection: general condition, photos of every room, furniture and appliance inventory, access review, and rental potential assessment. We send you a written report with our recommendations before we begin active management.",
      fr: "Nous effectuons une inspection complete : etat general, photos de chaque piece, inventaire du mobilier et des appareils, verification des acces et evaluation du potentiel locatif. Nous vous envoyons un rapport ecrit avec nos recommandations avant de commencer la gestion active.",
      ru: "Проводим полную инспекцию: общее состояние, фотосъёмка каждой комнаты, опись мебели и техники, проверка доступа и оценка арендного потенциала. До начала активного управления отправляем вам письменный отчёт с рекомендациями.",
      pt: "Realizamos uma inspecao completa: estado geral, fotos de todos os comodos, inventario de moveis e eletrodomesticos, revisao de acessos e avaliacao do potencial de aluguel. Enviamos um relatorio escrito com nossas recomendacoes antes de iniciar a gestao ativa.",
      de: "Wir fuhren eine vollstandige Inspektion durch: Allgemeinzustand, Fotos aller Zimmer, Inventar von Mobeln und Geraten, Zugangsuberprufung und Bewertung des Mietpotenzials. Wir schicken Ihnen einen schriftlichen Bericht mit unseren Empfehlungen, bevor wir mit der aktiven Verwaltung beginnen.",
    },
  },
  {
    key: "faq_rental_search",
    category: "getting_started",
    question: {
      es: "¿Tambien ayudan a encontrar propiedades en renta?",
      en: "Do you also help find rental properties?",
      fr: "Aidez-vous egalement a trouver des proprietes a louer ?",
      ru: "Вы также помогаете найти арендное жильё?",
      pt: "Voces tambem ajudam a encontrar imoveis para alugar?",
      de: "Helfen Sie auch beim Finden von Mietimmobilien?",
    },
    answer: {
      es: "Si. Ofrecemos un servicio de busqueda de propiedades en renta para personas y familias que buscan estancias de 1 a 12 meses en Playa del Carmen y la Riviera Maya. Propiedades verificadas, gestion en tu idioma y sin sorpresas. Para propietarios, tambien buscamos y verificamos inquilinos confiables para renta de largo plazo. Contactanos con tus requisitos y presupuesto.",
      en: "Yes. We offer a rental search service for individuals and families looking for 1 to 12-month stays in Playa del Carmen and the Riviera Maya. Vetted properties, handled in your language, no surprises. For property owners, we also source and vet reliable long-term tenants. Contact us with your requirements and budget.",
      fr: "Oui. Nous proposons un service de recherche de location pour les particuliers et familles cherchant des sejours de 1 a 12 mois a Playa del Carmen et en Riviera Maya. Proprietes verifiees, gestion dans votre langue, sans mauvaises surprises. Pour les proprietaires, nous recherchons et verifions egalement des locataires fiables. Contactez-nous avec vos exigences et votre budget.",
      ru: "Да. Мы предлагаем услугу поиска аренды для частных лиц и семей, планирующих проживание от 1 до 12 месяцев в Плая-дель-Кармен и на Ривьера-Майя. Проверенные объекты, ведение на вашем языке, без сюрпризов. Для владельцев - также подбор и проверка надёжных долгосрочных арендаторов. Свяжитесь с нами, указав требования и бюджет.",
      pt: "Sim. Oferecemos um servico de busca de imoveis para aluguel para pessoas e familias que buscam estadias de 1 a 12 meses em Playa del Carmen e na Riviera Maya. Imoveis verificados, atendimento no seu idioma, sem surpresas. Para proprietarios, tambem buscamos e verificamos inquilinos confiaveis para aluguel de longo prazo. Entre em contato com seus requisitos e orcamento.",
      de: "Ja. Wir bieten einen Mietimmobilien-Suchservice fur Einzelpersonen und Familien an, die 1 bis 12-monatige Aufenthalte in Playa del Carmen und der Riviera Maya suchen. Geprufte Immobilien, Abwicklung in Ihrer Sprache, keine Uberraschungen. Fur Immobilieneigentumer suchen und prufen wir auch zuverlassige Langzeitmieter. Kontaktieren Sie uns mit Ihren Anforderungen und Ihrem Budget.",
    },
  },
  {
    key: "faq_how_billing_works",
    category: "pricing",
    question: {
      es: "¿Como funciona exactamente el cobro?",
      en: "How exactly does billing work?",
      fr: "Comment fonctionne exactement la facturation ?",
      ru: "Как именно происходит оплата?",
      pt: "Como funciona exatamente o faturamento?",
      de: "Wie funktioniert die Abrechnung genau?",
    },
    answer: {
      es: "Cobramos un porcentaje de los ingresos brutos de renta - 18%, 22% o 28% segun el plan. Hay una cuota minima mensual ($60, $100 o $120 USD) que solo aplica si el porcentaje resulta menor. Si tu propiedad no genera ingresos, casi no pagas. Al cierre de cada mes recibes un desglose transparente: ingresos, nuestra comision y tu ingreso neto.",
      en: "We charge a percentage of your gross rental income - 18%, 22%, or 28% depending on the plan. There's a monthly minimum ($60, $100, or $120 USD) that only applies if the percentage comes out lower. If your property earns nothing, you pay almost nothing. At month end you receive a transparent breakdown: income, our fee, and your net.",
      fr: "Nous facturons un pourcentage des revenus locatifs bruts - 18%, 22% ou 28% selon le plan. Il y a un minimum mensuel (60, 100 ou 120 USD) qui ne s'applique que si le pourcentage est inferieur. Si votre propriete ne genere rien, vous payez presque rien. En fin de mois vous recevez un releve transparent : revenus, notre commission et votre net.",
      ru: "Берём процент от валового дохода от аренды - 18%, 22% или 28% в зависимости от плана. Есть ежемесячный минимум ($60, $100 или $120 USD), который применяется только если процент ниже него. Если недвижимость не приносит дохода - платёж минимален. В конце месяца вы получаете прозрачный отчёт: доходы, наша комиссия и ваша выплата.",
      pt: "Cobramos uma porcentagem da receita bruta de aluguel - 18%, 22% ou 28% dependendo do plano. Ha um minimo mensal ($60, $100 ou $120 USD) que so se aplica se a porcentagem for menor. Se seu imovel nao gerar renda, voce quase nao paga. No fim do mes voce recebe um demonstrativo transparente: receitas, nossa comissao e seu liquido.",
      de: "Wir berechnen einen Prozentsatz der Bruttomieteinnahmen - 18%, 22% oder 28% je nach Plan. Es gibt ein monatliches Minimum ($60, $100 oder $120 USD), das nur gilt, wenn der Prozentsatz darunter liegt. Verdient Ihre Immobilie nichts, zahlen Sie fast nichts. Am Monatsende erhalten Sie eine transparente Aufstellung: Einnahmen, unsere Provision und Ihr Nettobetrag.",
    },
  },
  {
    key: "faq_payment_methods",
    category: "pricing",
    question: {
      es: "¿Puedo pagar en pesos mexicanos o en efectivo?",
      en: "Can I pay in Mexican pesos or cash?",
      fr: "Puis-je payer en pesos mexicains ou en especes ?",
      ru: "Можно ли платить в мексиканских песо или наличными?",
      pt: "Posso pagar em pesos mexicanos ou em dinheiro?",
      de: "Kann ich in mexikanischen Pesos oder bar bezahlen?",
    },
    answer: {
      es: "Si. Aceptamos transferencia SPEI (cuentas bancarias mexicanas), transferencia internacional y efectivo, previa confirmacion por escrito. Los pagos en MXN se convierten al tipo de cambio oficial Banxico vigente en la fecha de pago. Proximamente tambien disponible pago con tarjeta directamente desde el sitio.",
      en: "Yes. We accept SPEI transfer (Mexican bank accounts), international wire transfer, and cash - with prior written confirmation. MXN payments are converted using the official Banxico exchange rate on the payment date. Card payment directly through the site is coming soon.",
      fr: "Oui. Nous acceptons le virement SPEI (comptes bancaires mexicains), le virement international et les especes - avec confirmation ecrite prealable. Les paiements en MXN sont convertis au taux de change officiel Banxico a la date de paiement. Le paiement par carte directement sur le site sera bientot disponible.",
      ru: "Да. Принимаем переводы SPEI (мексиканские банковские счета), международные банковские переводы и наличные - при предварительном письменном подтверждении. Платежи в MXN конвертируются по официальному курсу Banxico на дату платежа. Оплата картой через сайт скоро будет доступна.",
      pt: "Sim. Aceitamos transferencia SPEI (contas bancarias mexicanas), transferencia internacional e dinheiro - com confirmacao previa por escrito. Pagamentos em MXN sao convertidos pela taxa de cambio oficial do Banxico na data do pagamento. Pagamento com cartao diretamente pelo site em breve.",
      de: "Ja. Wir akzeptieren SPEI-Uberweisungen (mexikanische Bankkonten), internationale Uberweisungen und Bargeld - mit vorheriger schriftlicher Bestatigung. MXN-Zahlungen werden zum offiziellen Banxico-Wechselkurs am Zahlungsdatum umgerechnet. Kartenzahlung direkt uber die Website kommt bald.",
    },
  },
  {
    key: "faq_no_income_month",
    category: "pricing",
    question: {
      es: "¿Que pasa si mi propiedad no genera ingresos un mes?",
      en: "What if my property earns nothing in a month?",
      fr: "Que se passe-t-il si ma propriete ne genere aucun revenu un mois ?",
      ru: "Что если в какой-то месяц недвижимость не приносит дохода?",
      pt: "E se meu imovel nao gerar renda em um mes?",
      de: "Was passiert, wenn meine Immobilie in einem Monat keine Einnahmen erzielt?",
    },
    answer: {
      es: "Solo pagas la cuota minima mensual de tu plan ($60, $100 o $120 USD). Esta cubre nuestra visita de inspeccion, el reporte mensual y la disponibilidad continua del equipo. Sin penalizaciones ni cargos adicionales.",
      en: "You only pay the monthly minimum fee for your plan ($60, $100, or $120 USD). This covers our inspection visit, monthly report, and the team's continued availability. No penalties, no extra charges.",
      fr: "Vous ne payez que la redevance mensuelle minimale de votre plan (60, 100 ou 120 USD). Cela couvre notre visite d'inspection, le rapport mensuel et la disponibilite continue de l'equipe. Pas de penalites, pas de frais supplementaires.",
      ru: "Вы платите только ежемесячный минимум по вашему плану ($60, $100 или $120 USD). Он покрывает инспекционный визит, ежемесячный отчёт и постоянную доступность команды. Никаких штрафов и дополнительных платежей.",
      pt: "Voce paga apenas a taxa minima mensal do seu plano ($60, $100 ou $120 USD). Isso cobre nossa visita de inspecao, relatorio mensal e disponibilidade continua da equipe. Sem penalidades nem cobrancas extras.",
      de: "Sie zahlen nur die monatliche Mindestgebuhr Ihres Plans ($60, $100 oder $120 USD). Diese deckt unseren Inspektionsbesuch, den Monatsbericht und die kontinuierliche Verfugbarkeit des Teams. Keine Strafen, keine zusatzlichen Gebuhren.",
    },
  },
  {
    key: "faq_cancel_anytime",
    category: "pricing",
    question: {
      es: "¿Puedo cancelar en cualquier momento?",
      en: "Can I cancel at any time?",
      fr: "Puis-je annuler a tout moment ?",
      ru: "Можно ли отменить в любое время?",
      pt: "Posso cancelar a qualquer momento?",
      de: "Kann ich jederzeit kundigen?",
    },
    answer: {
      es: "Si. Puedes cancelar en cualquier momento por correo o desde tu portal. El servicio continua activo hasta el final del periodo facturado - sin permanencia minima ni penalizaciones. Al cancelar, tus fotografias se eliminan de nuestro portal en maximo 48 horas y recibes un reporte final de tu propiedad.",
      en: "Yes. You can cancel at any time by email or from your portal. The service remains active until the end of the billed period - no minimum commitment, no cancellation fee. Upon cancellation, your photos are removed from our portal within 48 hours and you receive a final property report.",
      fr: "Oui. Vous pouvez annuler a tout moment par e-mail ou depuis votre portail. Le service reste actif jusqu'a la fin de la periode facturee - sans engagement minimum ni frais d'annulation. A l'annulation, vos photos sont supprimees de notre portail dans les 48 heures et vous recevez un rapport final.",
      ru: "Да. Можно отменить в любое время по электронной почте или через портал. Сервис остаётся активным до конца оплаченного периода - без минимального срока и штрафов. После отмены ваши фотографии удаляются с портала в течение 48 часов, а вы получаете финальный отчёт.",
      pt: "Sim. Voce pode cancelar a qualquer momento por e-mail ou pelo portal. O servico permanece ativo ate o final do periodo faturado - sem compromisso minimo nem multa. Ao cancelar, suas fotos sao removidas do portal em ate 48 horas e voce recebe um relatorio final.",
      de: "Ja. Sie konnen jederzeit per E-Mail oder uber Ihr Portal kundigen. Der Service bleibt bis zum Ende des abgerechneten Zeitraums aktiv - keine Mindestlaufzeit, keine Kundigungsgebuhr. Bei Kundigung werden Ihre Fotos innerhalb von 48 Stunden aus unserem Portal entfernt und Sie erhalten einen Abschlussbericht.",
    },
  },
  {
    key: "faq_platforms",
    category: "service",
    question: {
      es: "¿En que plataformas publican mi propiedad?",
      en: "Which platforms do you list my property on?",
      fr: "Sur quelles plateformes publiez-vous ma propriete ?",
      ru: "На каких платформах вы размещаете мою недвижимость?",
      pt: "Em quais plataformas voces anunciam meu imovel?",
      de: "Auf welchen Plattformen listen Sie meine Immobilie?",
    },
    answer: {
      es: "En los planes Gestor y Premium gestionamos activamente tu propiedad en Airbnb, VRBO y Booking.com, y la publicamos en nuestro propio portal de propiedades en este sitio. En el plan Esencial te asesoramos sobre como configurar y optimizar tus propios listados.",
      en: "On Full Management and Premium plans we actively manage your property on Airbnb, VRBO, and Booking.com, and feature it on our own property portal on this site. On the Essential plan we advise you on how to set up and optimize your own listings.",
      fr: "Sur les plans Full Management et Premium, nous gerons activement votre propriete sur Airbnb, VRBO et Booking.com, et la presentons sur notre propre portail. Sur le plan Essentiel, nous vous conseillons sur la configuration et l'optimisation de vos propres annonces.",
      ru: "В планах «Полное управление» и «Премиум» мы активно управляем недвижимостью на Airbnb, VRBO и Booking.com и размещаем её на нашем портале. В плане «Базовый» консультируем по настройке и оптимизации собственных объявлений.",
      pt: "Nos planos Full Management e Premium gerenciamos ativamente seu imovel no Airbnb, VRBO e Booking.com e o divulgamos em nosso portal. No plano Essencial, orientamos sobre como configurar e otimizar seus proprios anuncios.",
      de: "Bei Full Management- und Premium-Planen verwalten wir Ihre Immobilie aktiv auf Airbnb, VRBO und Booking.com und prasentieren sie in unserem Portal. Im Essential-Plan beraten wir Sie bei der Einrichtung und Optimierung Ihrer eigenen Inserate.",
    },
  },
  {
    key: "faq_cleaning",
    category: "service",
    question: {
      es: "¿Ustedes hacen la limpieza o la coordinan?",
      en: "Do you handle cleaning directly or coordinate it?",
      fr: "Gerez-vous le nettoyage directement ou le coordonnez-vous ?",
      ru: "Вы сами занимаетесь уборкой или координируете её?",
      pt: "Voces fazem a limpeza diretamente ou a coordenam?",
      de: "Erledigen Sie die Reinigung direkt oder koordinieren Sie diese?",
    },
    answer: {
      es: "La coordinamos. Trabajamos con personal de limpieza de confianza en cada zona. Nosotros agendamos, supervisamos y verificamos la calidad despues de cada limpieza. El costo se factura al propietario al costo real sin margen adicional. Para limpiezas profundas hay un servicio adicional disponible.",
      en: "We coordinate it. We work with trusted cleaning staff in each area, scheduling, supervising, and verifying quality after every clean. Cleaning costs are billed to the owner at actual cost - no markup. Deep cleaning is available as an add-on service.",
      fr: "Nous la coordonnons. Nous travaillons avec du personnel de nettoyage de confiance dans chaque zone, planifiant, supervisant et verifiant la qualite apres chaque nettoyage. Les couts sont factures au proprietaire au cout reel, sans marge. Le nettoyage en profondeur est disponible en option.",
      ru: "Мы координируем уборку. Работаем с проверенным персоналом в каждом районе: организуем, контролируем и проверяем качество после каждой уборки. Стоимость выставляется владельцу по фактической цене без наценки. Генеральная уборка доступна как дополнительная услуга.",
      pt: "Nos a coordenamos. Trabalhamos com pessoal de limpeza confiavel em cada area, agendando, supervisionando e verificando a qualidade apos cada limpeza. Os custos sao cobrados do proprietario pelo valor real, sem margem. Limpeza profunda disponivel como servico adicional.",
      de: "Wir koordinieren sie. Wir arbeiten mit vertrauenswurdigem Reinigungspersonal, planen, beaufsichtigen und prufen die Qualitat nach jeder Reinigung. Kosten werden zum tatsachlichen Preis ohne Aufschlag berechnet. Grundreinigung als Zusatzleistung verfugbar.",
    },
  },
  {
    key: "faq_maintenance",
    category: "service",
    question: {
      es: "¿Que pasa si hay un problema de mantenimiento?",
      en: "What happens if there's a maintenance issue?",
      fr: "Que se passe-t-il en cas de probleme d'entretien ?",
      ru: "Что происходит при поломке или неисправности?",
      pt: "O que acontece se houver um problema de manutencao?",
      de: "Was passiert bei einem Wartungsproblem?",
    },
    answer: {
      es: "Para problemas menores actuamos dentro del presupuesto de mantenimiento mensual que tu pre-apruebas. Para reparaciones mayores te notificamos de inmediato con fotos, te presentamos al menos dos presupuestos de contratistas de confianza y esperamos tu autorizacion. Nunca se gasta sin que lo sepas.",
      en: "For minor issues we act within the monthly maintenance budget you pre-approve. For major repairs we notify you immediately with photos, present at least two quotes from trusted contractors, and wait for your authorization. Nothing is ever spent without your knowledge.",
      fr: "Pour les problemes mineurs, nous intervenons dans le budget de maintenance mensuel que vous pre-approuvez. Pour les reparations importantes, nous vous informons immediatement avec photos, presentons au moins deux devis et attendons votre autorisation. Rien n'est jamais depense sans que vous le sachiez.",
      ru: "Мелкие неисправности устраняем в рамках заранее согласованного ежемесячного бюджета. При серьёзных поломках немедленно уведомляем с фотографиями, предоставляем не менее двух смет и ждём вашего разрешения. Без вашего ведома ничего не тратится.",
      pt: "Para problemas menores, agimos dentro do orcamento de manutencao mensal pre-aprovado por voce. Para reparos maiores, notificamos com fotos, apresentamos pelo menos dois orcamentos e aguardamos sua autorizacao. Nada e gasto sem seu conhecimento.",
      de: "Bei kleineren Problemen handeln wir im Rahmen des von Ihnen vorab genehmigten Budgets. Bei grosseren Reparaturen benachrichtigen wir Sie sofort mit Fotos, legen mindestens zwei Angebote vor und warten auf Ihre Genehmigung. Ohne Ihr Wissen wird nie etwas ausgegeben.",
    },
  },
  {
    key: "faq_property_access",
    category: "trust",
    question: {
      es: "¿Como manejan el acceso a mi propiedad?",
      en: "How do you handle access to my property?",
      fr: "Comment gerez-vous l'acces a ma propriete ?",
      ru: "Как вы управляете доступом к моей недвижимости?",
      pt: "Como voces gerenciam o acesso ao meu imovel?",
      de: "Wie verwalten Sie den Zugang zu meiner Immobilie?",
    },
    answer: {
      es: "Los datos de acceso se recogen durante la incorporacion y se almacenan de forma segura - nunca por WhatsApp. Solo el equipo de Casa Concierge PDC y el personal autorizado (limpieza, mantenimiento) acceden a la propiedad, y solo cuando es necesario. Cada acceso queda registrado en tu reporte mensual.",
      en: "Access details are collected during onboarding and stored securely - never via WhatsApp. Only the Casa Concierge PDC team and authorized personnel (cleaning, maintenance) access the property, and only when necessary. Every access is logged in your monthly report.",
      fr: "Les details d'acces sont collectes lors de l'integration et stockes en toute securite - jamais via WhatsApp. Seule l'equipe Casa Concierge PDC et le personnel autorise accedent a la propriete, uniquement lorsque necessaire. Chaque acces est enregistre dans votre rapport mensuel.",
      ru: "Данные доступа собираются при подключении и хранятся в безопасности - никогда через WhatsApp. Доступ к объекту имеют только команда Casa Concierge PDC и авторизованный персонал, и только при необходимости. Каждый визит фиксируется в ежемесячном отчёте.",
      pt: "Os dados de acesso sao coletados durante a integracao e armazenados com seguranca - nunca via WhatsApp. Apenas a equipe da Casa Concierge PDC e pessoal autorizado acessam o imovel, e somente quando necessario. Cada acesso e registrado no relatorio mensal.",
      de: "Zugangsdaten werden beim Onboarding erfasst und sicher gespeichert - nie per WhatsApp. Nur das Casa Concierge PDC-Team und autorisiertes Personal betreten die Immobilie, und nur wenn notig. Jeder Zugang wird im Monatsbericht protokolliert.",
    },
  },
  {
    key: "faq_damage",
    category: "trust",
    question: {
      es: "¿Que pasa si un huesped dana mi propiedad?",
      en: "What if a guest damages my property?",
      fr: "Que se passe-t-il si un locataire endommage ma propriete ?",
      ru: "Что если гость повредит мою недвижимость?",
      pt: "E se um hospede danificar meu imovel?",
      de: "Was passiert, wenn ein Gast meine Immobilie beschadigt?",
    },
    answer: {
      es: "Documentamos el estado de la propiedad con fotos antes y despues de cada estancia. Si hay danos, te notificamos en 24 horas y gestionamos la reclamacion ante Airbnb AirCover (cobertura de hasta $3M USD) o la plataforma correspondiente. Casa Concierge PDC actua como coordinador - no asumimos responsabilidad financiera directa por danos de huespedes, tal como se detalla en nuestros Terminos de Servicio.",
      en: "We document the property's condition with photos before and after every stay. If there's damage, we notify you within 24 hours and manage the claim through Airbnb AirCover (up to $3M USD) or the relevant platform. Casa Concierge PDC acts as coordinator - we don't assume direct financial liability for guest-caused damage, as detailed in our Terms of Service.",
      fr: "Nous documentons l'etat de la propriete avec des photos avant et apres chaque sejour. En cas de dommages, nous vous informons dans les 24 heures et gerons la reclamation via Airbnb AirCover (jusqu'a 3 M USD) ou la plateforme concernee. Casa Concierge PDC agit en coordinateur - nous n'assumons pas de responsabilite financiere directe pour les dommages des locataires, comme indique dans nos Conditions de Service.",
      ru: "Документируем состояние объекта с фотографиями до и после каждого заезда. При ущербе уведомляем в течение 24 часов и ведём претензию через Airbnb AirCover (до $3 млн USD) или соответствующую платформу. Casa Concierge PDC выступает координатором - прямую финансовую ответственность за ущерб от гостей не несём, что описано в Условиях обслуживания.",
      pt: "Documentamos o estado do imovel com fotos antes e depois de cada estadia. Se houver danos, notificamos em 24 horas e gerenciamos a reclamacao pelo Airbnb AirCover (ate $3M USD) ou plataforma relevante. A Casa Concierge PDC atua como coordenadora - nao assumimos responsabilidade financeira direta por danos de hospedes, conforme os Termos de Servico.",
      de: "Wir dokumentieren den Zustand mit Fotos vor und nach jedem Aufenthalt. Bei Schaden benachrichtigen wir Sie innerhalb von 24 Stunden und verwalten den Anspruch uber Airbnb AirCover (bis zu 3 Mio. USD) oder die entsprechende Plattform. Casa Concierge PDC koordiniert - wir ubernehmen keine direkte Haftung fur gastverursachte Schaden, wie in den Nutzungsbedingungen beschrieben.",
    },
  },
  {
    key: "faq_my_data",
    category: "trust",
    question: {
      es: "¿Que hacen con mis datos personales?",
      en: "What do you do with my personal data?",
      fr: "Que faites-vous de mes donnees personnelles ?",
      ru: "Что вы делаете с моими личными данными?",
      pt: "O que voces fazem com meus dados pessoais?",
      de: "Was machen Sie mit meinen personlichen Daten?",
    },
    answer: {
      es: "Tus datos se usan exclusivamente para gestionar tu propiedad y tu cuenta. No los vendemos ni compartimos con fines publicitarios. Cumplimos con la LFPDPPP (Mexico) y el GDPR (Union Europea). Puedes consultar nuestra Politica de Privacidad completa en el pie de pagina.",
      en: "Your data is used exclusively to manage your property and account. We never sell or share it for advertising purposes. We comply with Mexico's LFPDPPP and the European GDPR. You can read our full Privacy Policy in the footer.",
      fr: "Vos donnees sont utilisees exclusivement pour gerer votre propriete et votre compte. Nous ne les vendons ni ne les partageons a des fins publicitaires. Nous respectons la LFPDPPP mexicaine et le RGPD europeen. Consultez notre politique de confidentialite complete dans le pied de page.",
      ru: "Ваши данные используются исключительно для управления недвижимостью и аккаунтом. Мы никогда не продаём и не передаём их в рекламных целях. Соблюдаем мексиканский LFPDPPP и европейский GDPR. Полная Политика конфиденциальности - в подвале сайта.",
      pt: "Seus dados sao usados exclusivamente para gerenciar seu imovel e conta. Nunca os vendemos nem compartilhamos para fins publicitarios. Cumprimos a LFPDPPP mexicana e o GDPR europeu. Leia nossa Politica de Privacidade completa no rodape.",
      de: "Ihre Daten werden ausschliesslich zur Verwaltung Ihrer Immobilie und Ihres Kontos verwendet. Wir verkaufen oder teilen sie nie zu Werbezwecken. Wir halten uns an Mexikos LFPDPPP und die europaische DSGVO. Vollstandige Datenschutzrichtlinie in der Fusszeile.",
    },
  },
  {
    key: "faq_response_time",
    category: "process",
    question: {
      es: "¿Cuanto tardan en responder?",
      en: "How quickly do you respond?",
      fr: "Combien de temps mettez-vous a repondre ?",
      ru: "Как быстро вы отвечаете?",
      pt: "Em quanto tempo voces respondem?",
      de: "Wie schnell antworten Sie?",
    },
    answer: {
      es: "Nuestro objetivo es responder en menos de 24 horas en dias habiles. Los clientes Premium tienen un objetivo de respuesta de 4 horas, 7 dias a la semana. Para emergencias operativas (huesped bloqueado, fuga de agua, acceso fallido), respondemos de inmediato sin importar el plan.",
      en: "Our goal is to respond within 24 hours on business days. Premium clients have a 4-hour response target, 7 days a week. For operational emergencies (locked-out guest, water leak, access failure), we respond immediately regardless of plan.",
      fr: "Notre objectif est de repondre dans les 24 heures les jours ouvrables. Les clients Premium ont un objectif de 4 heures, 7 jours sur 7. Pour les urgences operationnelles (locataire bloque, fuite d'eau, acces defaillant), nous repondons immediatement quel que soit le plan.",
      ru: "Цель - ответить в течение 24 часов в рабочие дни. Клиенты «Премиум» - 4 часа, 7 дней в неделю. При операционных экстренных ситуациях (гость не может войти, протечка, проблема с доступом) реагируем немедленно вне зависимости от плана.",
      pt: "Nosso objetivo e responder em ate 24 horas em dias uteis. Clientes Premium tem meta de 4 horas, 7 dias por semana. Para emergencias operacionais (hospede bloqueado, vazamento, falha de acesso), respondemos imediatamente independentemente do plano.",
      de: "Unser Ziel ist eine Antwort innerhalb von 24 Stunden an Werktagen. Premium-Kunden haben ein 4-Stunden-Ziel, 7 Tage die Woche. Bei operativen Notfallen (eingeschlossener Gast, Wasserleck, Zugangsproblem) reagieren wir sofort, unabhangig vom Plan.",
    },
  },
  {
    key: "faq_reports",
    category: "process",
    question: {
      es: "¿Que informacion recibo cada mes?",
      en: "What information do I receive each month?",
      fr: "Quelles informations est-ce que je recois chaque mois ?",
      ru: "Какую информацию я получаю каждый месяц?",
      pt: "Que informacoes recebo todo mes?",
      de: "Welche Informationen erhalte ich jeden Monat?",
    },
    answer: {
      es: "Cada mes recibes un reporte PDF con: ingresos brutos generados, desglose de reservaciones (fechas, duracion, precio por noche), tasa de ocupacion, gastos de limpieza y mantenimiento, fotos actuales de la propiedad, nuestra comision y tu ingreso neto. Todo claro, sin letra pequena.",
      en: "Every month you receive a PDF report with: gross income generated, booking breakdown (dates, duration, nightly rate), occupancy rate, cleaning and maintenance expenses, current property photos, our commission, and your net income. Clear, no fine print.",
      fr: "Chaque mois vous recevez un rapport PDF avec : revenus bruts, detail des reservations (dates, duree, prix par nuit), taux d'occupation, depenses de nettoyage et d'entretien, photos actuelles de la propriete, notre commission et votre revenu net. Clair, sans petits caracteres.",
      ru: "Каждый месяц - PDF-отчёт: валовой доход, детализация бронирований (даты, продолжительность, цена за ночь), заполняемость, расходы на уборку и обслуживание, актуальные фотографии объекта, наша комиссия и ваш чистый доход. Всё ясно, без мелкого шрифта.",
      pt: "Todo mes voce recebe um relatorio PDF com: receita bruta, detalhamento das reservas (datas, duracao, diaria), taxa de ocupacao, despesas de limpeza e manutencao, fotos atuais do imovel, nossa comissao e sua renda liquida. Claro, sem letras miudas.",
      de: "Jeden Monat erhalten Sie einen PDF-Bericht mit: Bruttoeinnahmen, Buchungsaufschlusselung (Daten, Dauer, Ubernachtungspreis), Belegungsrate, Reinigungs- und Wartungskosten, aktuellen Fotos der Immobilie, unserer Provision und Ihrem Nettoeinkommen. Klar, kein Kleingedrucktes.",
    },
  },
  {
    key: "faq_meetings",
    category: "process",
    question: {
      es: "¿Podemos tener reuniones para revisar el desempeno?",
      en: "Can we have meetings to review performance?",
      fr: "Pouvons-nous avoir des reunions pour examiner les performances ?",
      ru: "Можем ли мы встречаться для обсуждения результатов?",
      pt: "Podemos ter reunioes para revisar o desempenho?",
      de: "Konnen wir Meetings zur Leistungsuberprufung haben?",
    },
    answer: {
      es: "Si. Los clientes Premium tienen incluida una videollamada trimestral de revision. Los clientes de otros planes pueden solicitar una llamada en cualquier momento y respondemos en el plazo acordado. Tambien puedes escribirnos por correo o portal para revisar cualquier aspecto sin necesidad de agendar una reunion formal.",
      en: "Yes. Premium clients have a quarterly review video call included. Clients on other plans can request a call at any time and we respond within the agreed timeframe. You can also reach us by email or portal to review any aspect without needing to schedule a formal meeting.",
      fr: "Oui. Les clients Premium beneficient d'un appel video trimestriel inclus. Les clients des autres plans peuvent demander un appel a tout moment et nous repondons dans les delais convenus. Vous pouvez egalement nous contacter par e-mail ou portail pour examiner n'importe quel aspect sans reunion formelle.",
      ru: "Да. Клиентам «Премиум» включён ежеквартальный видеозвонок. Клиенты других планов могут запросить звонок в любое время - отвечаем в согласованные сроки. Также можно написать по электронной почте или через портал, чтобы обсудить любой вопрос без формальной встречи.",
      pt: "Sim. Clientes Premium tem videochamada trimestral de revisao incluida. Clientes de outros planos podem solicitar uma chamada a qualquer momento e respondemos no prazo acordado. Voce tambem pode nos contatar por e-mail ou portal para revisar qualquer aspecto sem agendar reuniao formal.",
      de: "Ja. Premium-Kunden erhalten ein vierteljahrliches Review-Videogesprach inklusive. Kunden anderer Plane konnen jederzeit ein Gesprach anfragen - wir antworten innerhalb der vereinbarten Frist. Sie konnen uns auch per E-Mail oder Portal kontaktieren, ohne ein formelles Meeting planen zu mussen.",
    },
  },
  {
    key: "faq_whatsapp_official",
    category: "process",
    question: {
      es: "¿WhatsApp es el canal oficial de comunicacion?",
      en: "Is WhatsApp the official communication channel?",
      fr: "WhatsApp est-il le canal de communication officiel ?",
      ru: "Является ли WhatsApp официальным каналом связи?",
      pt: "O WhatsApp e o canal oficial de comunicacao?",
      de: "Ist WhatsApp der offizielle Kommunikationskanal?",
    },
    answer: {
      es: "WhatsApp es nuestro canal operativo del dia a dia - ideal para coordinar check-ins, avisos rapidos y consultas generales. Para acuerdos formales, cambios de servicio o reclamaciones, el canal oficial es el correo electronico. Todo queda por escrito y con fecha, lo que protege a ambas partes.",
      en: "WhatsApp is our day-to-day operational channel - ideal for check-in coordination, quick updates, and general questions. For formal agreements, service changes, or complaints, the official channel is email. Everything is in writing and dated, which protects both sides.",
      fr: "WhatsApp est notre canal operationnel quotidien - ideal pour les check-ins, les mises a jour rapides et les questions generales. Pour les accords formels, les changements de service ou les reclamations, le canal officiel est l'e-mail. Tout est par ecrit et date, ce qui protege les deux parties.",
      ru: "WhatsApp - повседневный операционный канал: удобен для координации заездов, быстрых обновлений и общих вопросов. Для официальных договорённостей, изменений услуг или претензий - электронная почта. Всё фиксируется письменно с датой, что защищает обе стороны.",
      pt: "O WhatsApp e nosso canal operacional do dia a dia - ideal para check-ins, atualizacoes rapidas e duvidas gerais. Para acordos formais, mudancas de servico ou reclamacoes, o canal oficial e o e-mail. Tudo fica por escrito e datado, o que protege ambas as partes.",
      de: "WhatsApp ist unser taglicher Betriebskanal - ideal fur Check-in-Koordination, schnelle Updates und allgemeine Fragen. Fur formelle Vereinbarungen, Serviceanderungen oder Beschwerden ist E-Mail der offizielle Kanal. Alles ist schriftlich und datiert, was beide Seiten schutzt.",
    },
  },
];

function polishText(locale: Locale, text: string): string {
  if (locale === "en" || locale === "ru") return text;

  const shared: Array<[string, string]> = [
    [" - ", " — "],
  ];

  const es: Array<[string, string]> = [
    ["Como", "Cómo"],
    ["comecar", "comenzar"],
    ["comunicacion", "comunicación"],
    ["comision", "comisión"],
    ["minima", "mínima"],
    ["politica", "política"],
    ["electronico", "electrónico"],
    ["pagina", "página"],
    ["terminos", "términos"],
    ["mas", "más"],
    ["tambien", "también"],
    ["busqueda", "búsqueda"],
    ["si", "sí"],
    ["informacion", "información"],
    ["dias", "días"],
    ["habiles", "hábiles"],
    ["inspeccion", "inspección"],
    ["fotografias", "fotografías"],
    ["evaluacion", "evaluación"],
    ["condominios", "condominios"],
    ["electrodomesticos", "electrodomésticos"],
    ["duracion", "duración"],
    ["ocupacion", "ocupación"],
    ["rapidos", "rápidos"],
  ];

  const fr: Array<[string, string]> = [
    ["propriete", "propriété"],
    ["proprietes", "propriétés"],
    ["verifiees", "vérifiées"],
    ["recherche", "recherche"],
    ["sejours", "séjours"],
    ["adapte", "adapté"],
    ["ecrit", "écrit"],
    ["equipe", "équipe"],
    ["securite", "sécurité"],
    ["necessaire", "nécessaire"],
    ["enregistre", "enregistré"],
    ["reclamations", "réclamations"],
    ["qualite", "qualité"],
    ["couts", "coûts"],
    ["penalites", "pénalités"],
    ["releve", "relevé"],
  ];

  const pt: Array<[string, string]> = [
    ["comeco", "começo"],
    ["imovel", "imóvel"],
    ["imoveis", "imóveis"],
    ["comissao", "comissão"],
    ["duracao", "duração"],
    ["integracao", "integração"],
    ["seguranca", "segurança"],
    ["relatorio", "relatório"],
    ["avaliacao", "avaliação"],
    ["formulario", "formulário"],
    ["confirmacao", "confirmação"],
    ["informacoes", "informações"],
    ["publicitarios", "publicitários"],
    ["servico", "serviço"],
    ["servicos", "serviços"],
    ["comunicacao", "comunicação"],
    ["reunioes", "reuniões"],
  ];

  const de: Array<[string, string]> = [
    ["uber", "über"],
    ["Uber", "Über"],
    ["ausser", "außer"],
    ["einschliesslich", "einschließlich"],
    ["hauptsachlich", "hauptsächlich"],
    ["tatig", "tätig"],
    ["prufen", "prüfen"],
    ["fuhren", "führen"],
    ["vollstandige", "vollständige"],
    ["Mobeln", "Möbeln"],
    ["Geraten", "Geräten"],
    ["Zugangsuberprufung", "Zugangsüberprüfung"],
    ["gepruften", "geprüften"],
    ["Geprufte", "Geprüfte"],
    ["Uberraschungen", "Überraschungen"],
    ["Immobilieneigentumer", "Immobilieneigentümer"],
    ["Uberprufung", "Überprüfung"],
    ["Monatsgebuhr", "Monatsgebühr"],
    ["Mindestgebuhr", "Mindestgebühr"],
    ["Kundigung", "Kündigung"],
    ["kundigen", "kündigen"],
    ["Schaden", "Schäden"],
  ];

  const rules = locale === "es" ? es : locale === "fr" ? fr : locale === "pt" ? pt : de;
  let polished = text;
  for (const [from, to] of shared) polished = polished.replaceAll(from, to);
  for (const [from, to] of rules) polished = polished.replaceAll(from, to);
  return polished;
}

function getCategoriesForLocale(locale: Locale) {
  return CATEGORIES.map((category) => ({
    key: category.key,
    title: polishText(locale, category.title[locale]),
    items: FAQ_ITEMS.filter((item) => item.category === category.key).map((item): FaqItem => ({
      key: item.key,
      q: polishText(locale, item.question[locale]),
      a: polishText(locale, item.answer[locale]),
    })),
  }));
}

export function Faq() {
  const locale = useLocale() as Locale;
  const categories = getCategoriesForLocale(locale);
  const [openKey, setOpenKey] = useState("");

  return (
    <section id="faq" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            FAQ
          </h2>
        </div>

        <div className="mt-12 space-y-8">
          {categories.map((category) => (
            <div key={category.key} className="rounded-2xl border border-slate-200 bg-slate-50/40 p-4 sm:p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                {category.title}
              </h3>
              <div className="mt-4 space-y-3">
                {category.items.map((item) => {
                  const isOpen = openKey === item.key;
                  return (
                    <div key={item.key} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                      <button
                        type="button"
                        onClick={() => setOpenKey(isOpen ? "" : item.key)}
                        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
                      >
                        <span className="text-sm font-semibold text-slate-900">{item.q}</span>
                        <span className="text-slate-500">{isOpen ? "−" : "+"}</span>
                      </button>
                      {isOpen && (
                        <div className="border-t border-slate-100 px-4 py-3">
                          <p className="text-sm leading-relaxed text-slate-600">{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
