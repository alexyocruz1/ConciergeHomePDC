"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { PlanStepsModal } from "./PlanStepsModal";

type Locale = "es" | "en" | "fr" | "ru" | "pt" | "de";

const vitrinaByLocale: Record<Locale, { name: string; description: string; subtitle: string; minimum: string; features: string[]; cta: string }> = {
  es: {
    name: "Vitrina",
    description: "Publica tu propiedad gratis. Cobramos sólo si hay resultado.",
    subtitle: "Comisión sobre reservas o colocaciones",
    minimum: "Sin cuota mensual",
    features: [
      "Sin cuota mensual",
      "10% en reservaciones de corta estancia (mín. $500 MXN)",
      "50–75% del primer mes en arrendamientos de largo plazo",
      "2–3% en referidos de venta (pagado por la agencia)",
      "Ideal para probar el mercado sin riesgo",
    ],
    cta: "Publicar mi propiedad gratis",
  },
  en: {
    name: "Vitrina",
    description: "List your property free. We only charge when results happen.",
    subtitle: "Commission on bookings or placements",
    minimum: "No monthly fee",
    features: [
      "No monthly fee",
      "10% on short-term bookings (min. $500 MXN per booking)",
      "50–75% of first month's rent on long-term placements",
      "2–3% on sale referrals (paid by the agency, not you)",
      "Perfect for testing the market with zero upfront risk",
    ],
    cta: "List my property for free",
  },
  fr: {
    name: "Vitrina",
    description: "Publiez votre propriété gratuitement. Nous ne facturons que sur résultats.",
    subtitle: "Commission sur réservations ou placements",
    minimum: "Pas de frais mensuel",
    features: [
      "Pas de frais mensuel",
      "10% sur les réservations courte durée (min. 500 MXN par réservation)",
      "50–75% du premier mois de loyer pour les locations longue durée",
      "2–3% sur les références de vente (payé par l'agence)",
      "Idéal pour tester le marché sans risque",
    ],
    cta: "Publier ma propriété gratuitement",
  },
  ru: {
    name: "Vitrina",
    description: "Разместите объявление бесплатно. Берём комиссию только с результата.",
    subtitle: "Комиссия за бронирования или заселения",
    minimum: "Без ежемесячной платы",
    features: [
      "Без ежемесячной платы",
      "10% с краткосрочной аренды (мин. 500 MXN за бронирование)",
      "50–75% первого месяца аренды при долгосрочном размещении",
      "2–3% с продажи (платит агентство, не вы)",
      "Идеально для тестирования рынка без риска",
    ],
    cta: "Разместить объявление бесплатно",
  },
  pt: {
    name: "Vitrina",
    description: "Anuncie seu imóvel grátis. Cobramos apenas pelos resultados.",
    subtitle: "Comissão em reservas ou colocações",
    minimum: "Sem taxa mensal",
    features: [
      "Sem taxa mensal",
      "10% em reservas de curta duração (mín. 500 MXN por reserva)",
      "50–75% do primeiro mês em locações de longa duração",
      "2–3% em indicações de venda (pago pela agência)",
      "Ideal para testar o mercado sem risco",
    ],
    cta: "Anunciar meu imóvel gratuitamente",
  },
  de: {
    name: "Vitrina",
    description: "Inserieren Sie kostenlos. Wir berechnen nur bei Ergebnissen.",
    subtitle: "Provision auf Buchungen oder Vermittlungen",
    minimum: "Keine monatliche Gebühr",
    features: [
      "Keine monatliche Gebühr",
      "10% auf Kurzzeitbuchungen (mind. 500 MXN pro Buchung)",
      "50–75% der ersten Monatsmiete bei Langzeitvermietung",
      "2–3% auf Verkaufsempfehlungen (von der Agentur bezahlt)",
      "Ideal zum risikofreien Testen des Marktes",
    ],
    cta: "Meine Immobilie kostenlos inserieren",
  },
};

export function Services() {
  const t = useTranslations("services");
  const tPlanSteps = useTranslations("planSteps");
  const locale = useLocale() as Locale;
  const vitrina = vitrinaByLocale[locale] || vitrinaByLocale.en;
  const [openModal, setOpenModal] = useState<"vitrina" | "esencial" | "gestor" | null>(null);

  /* Premium Concierge (tier3) is defined in messages for a future launch — keep translations, re-add here when ready. */
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

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
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
            <button
              type="button"
              onClick={() => setOpenModal("vitrina")}
              className="mt-2 w-full text-center text-xs font-medium text-slate-500 underline underline-offset-2 hover:text-slate-700"
            >
              {tPlanSteps("trigger_link")}
            </button>
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
                <button
                  type="button"
                  onClick={() =>
                    setOpenModal(tier.key === "tier1" ? "esencial" : "gestor")
                  }
                  className="mt-2 w-full text-center text-xs font-medium text-slate-500 underline underline-offset-2 hover:text-slate-700"
                >
                  {tPlanSteps("trigger_link")}
                </button>
              </div>
            );
          })}
        </div>

        {openModal && (
          <PlanStepsModal
            plan={openModal}
            open={true}
            onClose={() => setOpenModal(null)}
          />
        )}

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
