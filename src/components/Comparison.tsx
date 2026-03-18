"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

const COMP_KEYS = ["comp1", "comp2", "comp3", "comp4"] as const;

export function Comparison() {
  const t = useTranslations("comparison");
  const [active, setActive] = useState(0);

  return (
    <section id="comparison" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-2">
            {COMP_KEYS.map((key, i) => (
              <button
                key={key}
                onClick={() => setActive(i)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                  active === i
                    ? "bg-primary-700 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {t(`${key}.tab`)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10">
          {COMP_KEYS.map((key, i) => {
            if (i !== active) return null;
            const rows = t.raw(`${key}.rows`) as Array<{
              feature: string;
              them: string;
              us: string;
            }>;

            return (
              <div key={key} className="animate-in fade-in duration-300">
                {/* Desktop table */}
                <div className="hidden overflow-hidden rounded-2xl border border-slate-200 shadow-sm md:block">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="px-6 py-4 font-semibold text-slate-700">
                          {t("feature_label")}
                        </th>
                        <th className="px-6 py-4 font-semibold text-slate-400">
                          {t(`${key}.them_label`)}
                        </th>
                        <th className="px-6 py-4 font-semibold text-primary-700">
                          {t("us_label")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {rows.map((row, j) => (
                        <tr
                          key={j}
                          className={j % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                        >
                          <td className="px-6 py-4 font-medium text-slate-700">
                            {row.feature}
                          </td>
                          <td className="px-6 py-4 text-slate-400">
                            {row.them}
                          </td>
                          <td className="px-6 py-4 font-medium text-slate-900">
                            {row.us}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="space-y-3 md:hidden">
                  {rows.map((row, j) => (
                    <div
                      key={j}
                      className="rounded-xl border border-slate-200 bg-white p-4"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {row.feature}
                      </p>
                      <div className="mt-3 space-y-2">
                        <div className="flex items-start gap-2">
                          <span className="mt-0.5 inline-block h-4 w-4 shrink-0 rounded-full bg-slate-200" />
                          <div>
                            <p className="text-xs text-slate-400">
                              {t(`${key}.them_label`)}
                            </p>
                            <p className="text-sm text-slate-500">
                              {row.them}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="mt-0.5 inline-block h-4 w-4 shrink-0 rounded-full bg-primary-600" />
                          <div>
                            <p className="text-xs font-medium text-primary-700">
                              {t("us_label")}
                            </p>
                            <p className="text-sm font-medium text-slate-900">
                              {row.us}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Takeaway */}
                <div className="mt-8 rounded-2xl border border-primary-100 bg-primary-50/50 p-6">
                  <div className="flex gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                      />
                    </svg>
                    <p className="text-sm leading-relaxed text-primary-900">
                      {t(`${key}.takeaway`)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
