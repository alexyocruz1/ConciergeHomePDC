import type { LocaleCode, LocaleJson } from "./types";

export function getLocalizedText(
  json: LocaleJson | null | undefined,
  locale: string,
  fallback = ""
): string {
  if (!json || typeof json !== "object") return fallback;
  const l = locale as LocaleCode;
  return (
    json[l] ||
    json.en ||
    json.es ||
    Object.values(json).find((v) => typeof v === "string" && v.length > 0) ||
    fallback
  );
}
