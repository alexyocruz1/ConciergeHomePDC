import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en", "fr", "ru", "pt", "de"],
  defaultLocale: "es",
});
