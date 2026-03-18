"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useState, useEffect, useCallback } from "react";

type CookiePrefs = {
  analytics: boolean;
  preferences: boolean;
};

const COOKIE_KEY = "cookie_consent";

function readPrefs(): CookiePrefs | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COOKIE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookiePrefs;
  } catch {
    return null;
  }
}

function savePrefs(prefs: CookiePrefs) {
  localStorage.setItem(COOKIE_KEY, JSON.stringify(prefs));
}

export function CookieBanner() {
  const t = useTranslations("cookies_banner");
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [prefs, setPrefs] = useState<CookiePrefs>({
    analytics: false,
    preferences: false,
  });

  useEffect(() => {
    const existing = readPrefs();
    if (!existing) {
      setVisible(true);
    }
  }, []);

  const dismiss = useCallback((p: CookiePrefs) => {
    savePrefs(p);
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6">
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6">
        {!showCustomize ? (
          <>
            <p className="text-sm leading-relaxed text-slate-600">
              {t("message")}{" "}
              <Link
                href="/cookies"
                className="font-medium text-primary-700 underline decoration-primary-300 underline-offset-2 hover:text-primary-900"
              >
                {t("privacy_link")}
              </Link>
            </p>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
              <button
                onClick={() => dismiss({ analytics: false, preferences: false })}
                className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                {t("reject")}
              </button>
              <button
                onClick={() => setShowCustomize(true)}
                className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                {t("customize")}
              </button>
              <button
                onClick={() => dismiss({ analytics: true, preferences: true })}
                className="rounded-full bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-800"
              >
                {t("accept")}
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm leading-relaxed text-slate-600">
              {t("message")}
            </p>

            <div className="mt-4 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={prefs.analytics}
                  onChange={(e) =>
                    setPrefs((p) => ({ ...p, analytics: e.target.checked }))
                  }
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-primary-700 focus:ring-primary-500/20"
                />
                <div>
                  <span className="text-sm font-medium text-slate-900">
                    {t("analytics_label")}
                  </span>
                  <p className="text-xs text-slate-500">{t("analytics_desc")}</p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={prefs.preferences}
                  onChange={(e) =>
                    setPrefs((p) => ({ ...p, preferences: e.target.checked }))
                  }
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-primary-700 focus:ring-primary-500/20"
                />
                <div>
                  <span className="text-sm font-medium text-slate-900">
                    {t("preferences_label")}
                  </span>
                  <p className="text-xs text-slate-500">
                    {t("preferences_desc")}
                  </p>
                </div>
              </label>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setShowCustomize(false)}
                className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                ←
              </button>
              <button
                onClick={() => dismiss(prefs)}
                className="rounded-full bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-800"
              >
                {t("save")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function CookieSettingsButton() {
  const t = useTranslations("footer");

  function reopenBanner() {
    localStorage.removeItem(COOKIE_KEY);
    window.location.reload();
  }

  return (
    <button
      onClick={reopenBanner}
      className="text-sm text-slate-400 transition-colors hover:text-white"
    >
      {t("cookie_settings")}
    </button>
  );
}
