"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

type Locale = "es" | "en" | "fr" | "ru" | "pt" | "de";

const vitrinaByLocale: Record<Locale, { name: string; description: string; subtitle: string; minimum: string; features: string[]; cta: string }> = {
  es: {
    name: "Vitrina",
    description: "Publicación gratuita con comisión solo por resultados.",
    subtitle: "Comisión sobre reservas o colocaciones",
    minimum: "Sin cuota mínima mensual",
    features: ["$0/mes", "10% en reservas cortas", "50%-75% en colocación de renta", "2%-3% en referidos de venta", "Ideal para probar el mercado sin riesgo"],
    cta: "Publicar mi propiedad gratis",
  },
  en: {
    name: "Vitrina",
    description: "Free listing with commission only on results.",
    subtitle: "Commission on bookings or placements",
    minimum: "No monthly minimum fee",
    features: ["$0/month", "10% on short-term bookings", "50%-75% on long-term placements", "2%-3% on sale referrals", "Ideal to test the market with zero upfront risk"],
    cta: "List my property for free",
  },
  fr: {
    name: "Vitrina",
    description: "Annonce gratuite avec commission uniquement sur résultats.",
    subtitle: "Commission sur réservations ou placements",
    minimum: "Aucun minimum mensuel",
    features: ["$0/mois", "10% sur réservations courte durée", "50%-75% sur placements longue durée", "2%-3% sur referrals de vente", "Idéal pour tester le marché sans risque initial"],
    cta: "Publier ma propriété gratuitement",
  },
  ru: {
    name: "Vitrina",
    description: "Бесплатное размещение с комиссией только за результат.",
    subtitle: "Комиссия за бронирования или заселения",
    minimum: "Без ежемесячного минимума",
    features: ["$0/месяц", "10% за краткосрочные бронирования", "50%-75% за долгосрочное заселение", "2%-3% за реферальную продажу", "Подходит для теста рынка без стартовых затрат"],
    cta: "Разместить объект бесплатно",
  },
  pt: {
    name: "Vitrina",
    description: "Anúncio gratuito com comissão apenas por resultados.",
    subtitle: "Comissão em reservas ou colocações",
    minimum: "Sem mínimo mensal",
    features: ["$0/mes", "10% em reservas de curta duração", "50%-75% em colocações de longo prazo", "2%-3% em referrals de venda", "Ideal para testar o mercado sem risco inicial"],
    cta: "Publicar meu imóvel grátis",
  },
  de: {
    name: "Vitrina",
    description: "Kostenloses Listing, Provision nur bei Ergebnissen.",
    subtitle: "Provision auf Buchungen oder Vermittlungen",
    minimum: "Keine monatliche Mindestgebühr",
    features: ["$0/Monat", "10% auf Kurzzeitbuchungen", "50%-75% bei Langzeitvermittlung", "2%-3% bei Verkaufsreferrals", "Ideal zum risikofreien Testen des Marktes"],
    cta: "Meine Immobilie kostenlos listen",
  },
};

export function Services() {
  const t = useTranslations("services");
  const locale = useLocale() as Locale;
  const vitrina = vitrinaByLocale[locale] || vitrinaByLocale.en;

  const tiers = [
    {
      key: "tier1" as const,
      badge: null,
      highlight: false,
    },
    {
      key: "tier2" as const,
      badge: t("popular"),
      highlight: true,
    },
    {
      key: "tier3" as const,
      badge: null,
      highlight: false,
    },
  ];

  const addons = t.raw("addons") as Array<{ name: string; price: string }>;

  return (
    <section id="services" className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-4">
          <div className="relative flex flex-col rounded-3xl border border-emerald-200 bg-emerald-50/40 p-8 shadow-sm">
            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-900">{vitrina.name}</h3>
              <p className="mt-2 text-sm text-slate-500">{vitrina.description}</p>
            </div>

            <div className="mt-6 text-center">
              <span className="text-5xl font-extrabold text-emerald-700">$0</span>
              <p className="mt-1 text-sm text-slate-500">{vitrina.subtitle}</p>
              <p className="mt-1 text-xs font-medium text-slate-400">{vitrina.minimum}</p>
            </div>

            <ul className="mt-8 flex-1 space-y-3">
              {vitrina.features.map((feature, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600">
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="?topic=vitrina_free_listing#contact"
              className="mt-8 block rounded-full bg-emerald-700 py-3.5 text-center text-sm font-semibold text-white transition-all hover:bg-emerald-800"
            >
              {vitrina.cta}
            </a>
          </div>

          {tiers.map((tier) => {
            const features = t.raw(`${tier.key}.features`) as string[];
            return (
              <div
                key={tier.key}
                className={`relative flex flex-col rounded-3xl p-8 transition-shadow ${
                  tier.highlight
                    ? "border-2 border-primary-600 bg-white shadow-xl ring-1 ring-primary-600/10"
                    : "border border-slate-200 bg-white shadow-sm hover:shadow-md"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex rounded-full bg-primary-700 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-xl font-bold text-slate-900">
                    {t(`${tier.key}.name`)}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    {t(`${tier.key}.description`)}
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <span className="text-5xl font-extrabold text-primary-700">
                    {t(`${tier.key}.price`)}
                  </span>
                  <p className="mt-1 text-sm text-slate-500">
                    {t("of_income")}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-400">
                    {t(`${tier.key}.minimum`)}
                  </p>
                </div>

                <ul className="mt-8 flex-1 space-y-3">
                  {features.map((feature: string, i: number) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-600">
                      <svg
                        className="mt-0.5 h-5 w-5 shrink-0 text-primary-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-8 block rounded-full py-3.5 text-center text-sm font-semibold transition-all ${
                    tier.highlight
                      ? "bg-primary-700 text-white shadow-sm hover:bg-primary-800 hover:shadow-md"
                      : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                  }`}
                >
                  {t("subscribe")}
                </a>
              </div>
            );
          })}
        </div>

        <div className="mt-20">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900">
              {t("addons_title")}
            </h3>
            <p className="mt-2 text-base text-slate-500">
              {t("addons_subtitle")}
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-3xl space-y-3 sm:space-y-0 sm:divide-y sm:divide-slate-100 sm:overflow-hidden sm:rounded-2xl sm:border sm:border-slate-200">
            {addons.map((addon: { name: string; price: string }, i: number) => (
              <div
                key={i}
                className={`flex flex-col gap-1 rounded-xl border border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:rounded-none sm:border-0 sm:px-6 sm:py-4 ${
                  i % 2 === 0 ? "bg-white" : "bg-white sm:bg-slate-50"
                }`}
              >
                <span className="text-sm text-slate-700">{addon.name}</span>
                <span className="text-sm font-semibold text-primary-700 sm:shrink-0 sm:text-right sm:font-medium sm:text-slate-900">
                  {addon.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Legal disclaimer */}
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-slate-400">
          {t("disclaimer")}
        </p>
        <p className="mx-auto mt-2 max-w-2xl text-center text-xs leading-relaxed text-slate-400">
          {t("mxn_note")}
        </p>
      </div>
    </section>
  );
}
