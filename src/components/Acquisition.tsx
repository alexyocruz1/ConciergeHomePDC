"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

type Locale = "es" | "en" | "fr" | "ru" | "pt" | "de";

const rentalCopy: Record<
  Locale,
  { title: string; subtitle: string; body: string; badges: string[]; cta: string }
> = {
  es: {
    title: "¿Buscas rentar en la Riviera Maya?",
    subtitle: "Te ayudamos a encontrar la propiedad adecuada.",
    body: "Ofrecemos un servicio de búsqueda de propiedades en renta para particulares y familias que buscan estancias de mediano o largo plazo en Playa del Carmen y la Riviera Maya. Propiedades verificadas, negociación en tu idioma, sin sorpresas. Para propietarios, también gestionamos la búsqueda y verificación de inquilinos confiables.",
    badges: ["Propiedades verificadas", "Sin estafas", "En tu idioma", "1–12 meses"],
    cta: "Contáctanos",
  },
  en: {
    title: "Looking to rent in the Riviera Maya?",
    subtitle: "We help you find the right property.",
    body: "We offer a rental search service for individuals and families looking for mid to long-term stays in Playa del Carmen and the Riviera Maya. Vetted properties, negotiation in your language, no surprises. For property owners, we also manage the search and vetting of reliable long-term tenants.",
    badges: ["Vetted properties", "No scams", "In your language", "1–12 months"],
    cta: "Contact Us",
  },
  fr: {
    title: "Vous cherchez à louer en Riviera Maya ?",
    subtitle: "Nous vous aidons à trouver la bonne propriété.",
    body: "Nous proposons un service de recherche de propriétés en location pour les particuliers et les familles cherchant des séjours de moyen ou long terme à Playa del Carmen et en Riviera Maya. Propriétés vérifiées, négociation dans votre langue, sans mauvaises surprises. Pour les propriétaires, nous gérons également la recherche et la vérification de locataires fiables.",
    badges: ["Propriétés vérifiées", "Sans arnaques", "Dans votre langue", "1–12 mois"],
    cta: "Nous contacter",
  },
  ru: {
    title: "Хотите снять жилье на Ривьера-Майя?",
    subtitle: "Мы поможем найти подходящую недвижимость.",
    body: "Мы предлагаем услугу поиска аренды для частных лиц и семей, планирующих среднесрочное или долгосрочное проживание в Плая-дель-Кармен и на Ривьера-Майя. Проверенные объекты, переговоры на вашем языке, без неожиданностей. Для владельцев недвижимости — также подбор и проверка надежных арендаторов.",
    badges: ["Проверенные объекты", "Без мошенников", "На вашем языке", "1–12 месяцев"],
    cta: "Связаться с нами",
  },
  pt: {
    title: "Procura alugar na Riviera Maya?",
    subtitle: "Ajudamos você a encontrar o imóvel certo.",
    body: "Oferecemos um serviço de busca de imóveis para aluguel para pessoas e famílias que buscam estadias de médio ou longo prazo em Playa del Carmen e na Riviera Maya. Imóveis verificados, negociação no seu idioma, sem surpresas. Para proprietários, também gerenciamos a busca e verificação de inquilinos confiáveis.",
    badges: ["Imóveis verificados", "Sem golpes", "No seu idioma", "1–12 meses"],
    cta: "Fale conosco",
  },
  de: {
    title: "Auf der Suche nach einer Mietimmobilie an der Riviera Maya?",
    subtitle: "Wir helfen Ihnen, die richtige Immobilie zu finden.",
    body: "Wir bieten einen Mietimmobilien-Suchservice für Einzelpersonen und Familien an, die mittel- bis langfristige Aufenthalte in Playa del Carmen und der Riviera Maya suchen. Geprüfte Immobilien, Verhandlungen in Ihrer Sprache, keine unangenehmen Überraschungen. Für Immobilieneigentümer übernehmen wir auch die Suche und Überprüfung zuverlässiger Langzeitmieter.",
    badges: ["Geprüfte Immobilien", "Kein Betrug", "In Ihrer Sprache", "1–12 Monate"],
    cta: "Kontakt aufnehmen",
  },
};

const vitrinaCopy: Record<Locale, { title: string; subtitle: string; body: string; badges: string[]; cta: string }> = {
  es: {
    title: "Lista tu propiedad gratis",
    subtitle: "Sin costo mensual. Solo comision por resultados.",
    body: "Publica tu propiedad en nuestro portal sin cuota fija mensual. Solo cobramos comision cuando la propiedad se renta o vende a traves de nuestro sitio.",
    badges: ["Sin cuota mensual", "Propiedades verificadas", "Fotos profesionales", "0 riesgo"],
    cta: "Publicar mi propiedad gratis",
  },
  en: {
    title: "List your property for free",
    subtitle: "No monthly fee. Commission only on results.",
    body: "Publish your property on our portal with no fixed monthly fee. We only charge a commission when your property is rented or sold through our site.",
    badges: ["No monthly fee", "Verified listings", "Professional photos", "Zero risk"],
    cta: "List my property for free",
  },
  fr: {
    title: "Listez votre propriété gratuitement",
    subtitle: "Sans frais mensuels. Commission uniquement sur résultats.",
    body: "Publiez votre propriété sur notre portail sans frais mensuels fixes. Nous facturons seulement une commission quand votre bien est loué ou vendu via notre site.",
    badges: ["Sans frais mensuels", "Annonces vérifiées", "Photos professionnelles", "Risque zéro"],
    cta: "Publier ma propriété gratuitement",
  },
  ru: {
    title: "Разместите объект бесплатно",
    subtitle: "Без ежемесячной платы. Комиссия только за результат.",
    body: "Размещайте объект на нашем портале без фиксированной ежемесячной оплаты. Мы берем комиссию только когда объект сдан или продан через наш сайт.",
    badges: ["Без ежемесячной платы", "Проверенные объявления", "Профессиональные фото", "Нулевой риск"],
    cta: "Разместить бесплатно",
  },
  pt: {
    title: "Liste seu imóvel grátis",
    subtitle: "Sem taxa mensal. Comissão apenas por resultados.",
    body: "Publique seu imóvel em nosso portal sem custo fixo mensal. Cobramos comissão apenas quando o imóvel é alugado ou vendido pelo nosso site.",
    badges: ["Sem taxa mensal", "Anúncios verificados", "Fotos profissionais", "Risco zero"],
    cta: "Publicar meu imóvel grátis",
  },
  de: {
    title: "Immobilie kostenlos listen",
    subtitle: "Keine Monatsgebühr. Provision nur bei Ergebnis.",
    body: "Veröffentlichen Sie Ihre Immobilie ohne feste Monatsgebühr in unserem Portal. Wir berechnen nur eine Provision, wenn über unsere Website vermietet oder verkauft wird.",
    badges: ["Keine Monatsgebühr", "Geprüfte Inserate", "Professionelle Fotos", "Kein Risiko"],
    cta: "Meine Immobilie kostenlos listen",
  },
};

export function Acquisition() {
  const t = useTranslations("acquisition");
  const locale = useLocale() as Locale;

  const benefits = [
    {
      label: t("benefit1"),
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
        </svg>
      ),
    },
    {
      label: t("benefit2"),
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      ),
    },
    {
      label: t("benefit3"),
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
    },
    {
      label: t("benefit4"),
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-gradient-to-br from-accent-50 via-white to-primary-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-2 text-lg font-medium text-primary-700">
              {t("subtitle")}
            </p>
            <p className="mt-6 text-base leading-relaxed text-slate-600">
              {t("description")}
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-700 px-8 py-4 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-800 hover:shadow-md"
            >
              {t("cta")}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  {benefit.icon}
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-900">
                  {benefit.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {[
            { ...((rentalCopy[locale] || rentalCopy.en)), topic: "rental_search" },
            { ...((vitrinaCopy[locale] || vitrinaCopy.en)), topic: "vitrina_free_listing" },
          ].map((card) => (
            <div key={card.title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900">{card.title}</h3>
              <p className="mt-2 text-sm font-semibold text-primary-700">{card.subtitle}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{card.body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {card.badges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <a
                href={`?topic=${encodeURIComponent(card.topic)}#contact`}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-700 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-800"
              >
                {card.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
