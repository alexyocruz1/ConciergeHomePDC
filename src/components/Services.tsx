"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { PlanStepsModal } from "./PlanStepsModal";
import { formatPercent, PLAN_PRICING } from "@/lib/plans/pricing";

type Locale = "es" | "en" | "fr" | "ru" | "pt" | "de";

const vitrinaByLocale: Record<
  Locale,
  {
    name: string;
    description: string;
    positioning: string;
    protection: string;
    subtitle: string;
    minimum: string;
    features: string[];
    cta: string;
  }
> = {
  es: {
    name: "Vitrina",
    description: "Publica tu propiedad gratis. Cobramos sólo si hay resultado.",
    positioning: "Mejor para probar el mercado",
    protection:
      "Casa Concierge actúa únicamente como un servicio de marketing y referidos bajo este plan.",
    subtitle: "Comisión sobre reservas o colocaciones",
    minimum: "Sin cuota mensual",
    features: [
      `10% en reservaciones de corta estancia (mín. $${PLAN_PRICING.vitrina.shortTermMinMxnPerBooking} MXN por reservación)`,
      "50–75% del primer mes en arrendamientos de largo plazo",
      "2–3% en referidos de venta (pagado por la agencia)",
      "Publicación de la propiedad en nuestra plataforma",
      "Reenvío de leads al propietario",
      "Manejo básico opcional de consultas",
      "No incluye: visitas, showings, check-in o check-out de huéspedes, ni coordinación de mantenimiento",
    ],
    cta: "Publicar mi propiedad gratis",
  },
  en: {
    name: "Vitrina",
    description: "List your property free. We only charge when results happen.",
    positioning: "Best for testing the market",
    protection:
      "Casa Concierge acts solely as a marketing and referral service under this plan.",
    subtitle: "Commission on bookings or placements",
    minimum: "No monthly fee",
    features: [
      `10% on short-term bookings (min. $${PLAN_PRICING.vitrina.shortTermMinMxnPerBooking} MXN per booking)`,
      "50–75% of first month's rent on long-term placements",
      "2–3% on sale referrals (paid by the agency, not you)",
      "Property listing on our platform",
      "Lead forwarding to owner",
      "Optional basic inquiry handling",
      "Not included: property visits, showings, guest check-in/out, or maintenance coordination",
    ],
    cta: "List my property for free",
  },
  fr: {
    name: "Vitrina",
    description: "Publiez votre propriété gratuitement. Nous ne facturons que sur résultats.",
    positioning: "Idéal pour tester le marché",
    protection:
      "Casa Concierge agit uniquement en tant que service de marketing et de mise en relation dans le cadre de ce plan.",
    subtitle: "Commission sur réservations ou placements",
    minimum: "Pas de frais mensuel",
    features: [
      `10% sur les réservations courte durée (min. ${PLAN_PRICING.vitrina.shortTermMinMxnPerBooking} MXN par réservation)`,
      "50–75% du premier mois de loyer pour les locations longue durée",
      "2–3% sur les références de vente (payé par l'agence)",
      "Publication de la propriété sur notre plateforme",
      "Transfert des leads au propriétaire",
      "Gestion basique optionnelle des demandes",
      "Non inclus : visites, présentations (showings), check-in/out des voyageurs, ni coordination maintenance",
    ],
    cta: "Publier ma propriété gratuitement",
  },
  ru: {
    name: "Vitrina",
    description: "Разместите объявление бесплатно. Берём комиссию только с результата.",
    positioning: "Лучше всего для теста рынка",
    protection:
      "В рамках этого плана Casa Concierge выступает только как маркетинговый и реферальный сервис.",
    subtitle: "Комиссия за бронирования или заселения",
    minimum: "Без ежемесячной платы",
    features: [
      `10% с краткосрочных бронирований (мин. ${PLAN_PRICING.vitrina.shortTermMinMxnPerBooking} MXN за бронирование)`,
      "50–75% первого месяца аренды при долгосрочном размещении",
      "2–3% с продажи (платит агентство, не вы)",
      "Размещение объекта на нашей платформе",
      "Передача лидов владельцу",
      "Опциональная базовая обработка запросов",
      "Не включает: визиты, показы, check-in/out гостей, или координацию обслуживания",
    ],
    cta: "Разместить объявление бесплатно",
  },
  pt: {
    name: "Vitrina",
    description: "Anuncie seu imóvel grátis. Cobramos apenas pelos resultados.",
    positioning: "Melhor para testar o mercado",
    protection:
      "A Casa Concierge atua exclusivamente como serviço de marketing e indicação neste plano.",
    subtitle: "Comissão em reservas ou colocações",
    minimum: "Sem taxa mensal",
    features: [
      `10% em reservas de curta duração (mín. ${PLAN_PRICING.vitrina.shortTermMinMxnPerBooking} MXN por reserva)`,
      "50–75% do primeiro mês em locações de longa duração",
      "2–3% em indicações de venda (pago pela agência)",
      "Anúncio da propriedade na nossa plataforma",
      "Encaminhamento de leads ao proprietário",
      "Gestão básica opcional de consultas",
      "Não inclui: visitas, apresentações (showings), check-in/out de hóspedes, nem coordenação de manutenção",
    ],
    cta: "Anunciar meu imóvel gratuitamente",
  },
  de: {
    name: "Vitrina",
    description: "Inserieren Sie kostenlos. Wir berechnen nur bei Ergebnissen.",
    positioning: "Am besten zum Testen des Marktes",
    protection:
      "In diesem Plan agiert Casa Concierge ausschließlich als Marketing- und Vermittlungsservice.",
    subtitle: "Provision auf Buchungen oder Vermittlungen",
    minimum: "Keine monatliche Gebühr",
    features: [
      `10% auf Kurzzeitbuchungen (mind. ${PLAN_PRICING.vitrina.shortTermMinMxnPerBooking} MXN pro Buchung)`,
      "50–75% der ersten Monatsmiete bei Langzeitvermietung",
      "2–3% auf Verkaufsempfehlungen (von der Agentur bezahlt)",
      "Immobilien-Eintrag auf unserer Plattform",
      "Lead-Weiterleitung an den Eigentümer",
      "Optionale, einfache Bearbeitung von Anfragen",
      "Nicht enthalten: Besuche, Besichtigungen, Gäste-Check-in/out oder Wartungskoordination",
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

  const positioningByTier: Record<"tier1" | "tier2", Record<Locale, string>> = {
    tier1: {
      es: "Mejor para dueños remotos",
      en: "Best for remote owners",
      fr: "Idéal pour les propriétaires à distance",
      ru: "Лучше всего для удалённых владельцев",
      pt: "Melhor para proprietários remotos",
      de: "Am besten für Remote-Eigentümer",
    },
    tier2: {
      es: "Mejor para inversionistas manos libres",
      en: "Best for hands-off investors",
      fr: "Idéal pour les investisseurs « mains libres »",
      ru: "Лучше всего для инвесторов «без участия»",
      pt: "Melhor para investidores sem preocupações",
      de: "Am besten für Hands-off-Investoren",
    },
  };

  function getTierPricing(tierKey: "tier1" | "tier2") {
    const plan = tierKey === "tier1" ? PLAN_PRICING.esencial : PLAN_PRICING.fullManagement;
    return {
      priceText: formatPercent(plan.commissionPercent),
      minUsd: plan.minMonthlyUsd,
    };
  }

  function formatMinimumUsdLabel(minUsd: number) {
    switch (locale) {
      case "es":
        return `Mínimo $${minUsd} USD/mes`;
      case "fr":
        return `Minimum $${minUsd} USD/mois`;
      case "ru":
        return `Минимум $${minUsd} USD/мес`;
      case "pt":
        return `Mínimo $${minUsd} USD/mês`;
      case "de":
        return `Minimum $${minUsd} USD/Monat`;
      case "en":
      default:
        return `Minimum $${minUsd} USD/month`;
    }
  }

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
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-emerald-700/80">
                {vitrina.positioning}
              </p>
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
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              {vitrina.protection}
            </p>
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
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-primary-700/80">
                    {positioningByTier[tier.key][locale] ||
                      positioningByTier[tier.key].en}
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <span className="text-5xl font-extrabold text-primary-700">
                    {getTierPricing(tier.key).priceText}
                  </span>
                  <p className="mt-1 text-sm text-slate-500">
                    {t("of_income")}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-400">
                    {formatMinimumUsdLabel(getTierPricing(tier.key).minUsd)}
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
