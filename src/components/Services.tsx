"use client";

import { useTranslations } from "next-intl";

export function Services() {
  const t = useTranslations("services");

  const tiers = [
    {
      key: "tier1" as const,
      badge: null,
      highlight: false,
      hasCommission: false,
    },
    {
      key: "tier2" as const,
      badge: t("popular"),
      highlight: true,
      hasCommission: true,
    },
    {
      key: "tier3" as const,
      badge: null,
      highlight: false,
      hasCommission: true,
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
                  <span className="text-4xl font-extrabold text-slate-900">
                    {t(`${tier.key}.price`)}
                  </span>
                  <span className="text-base text-slate-500">
                    {t("per_month")}
                  </span>
                  <p className="mt-1 text-sm text-slate-400">
                    {t("per_property")}
                  </p>
                  {tier.hasCommission && (
                    <p className="mt-1 text-sm font-medium text-primary-700">
                      {t("plus_commission")}
                    </p>
                  )}
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
      </div>
    </section>
  );
}
