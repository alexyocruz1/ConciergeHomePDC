import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en", "fr", "ru", "pt", "de"],
  defaultLocale: "es",
  pathnames: {
    "/": "/",
    "/cookies": "/cookies",
    "/privacy": "/privacy",
    "/terms": "/terms",
    "/properties": {
      es: "/propiedades",
      en: "/properties",
      fr: "/proprietes",
      ru: "/nedvizhimost",
      pt: "/imoveis",
      de: "/immobilien",
    },
    "/properties/[slug]": {
      es: "/propiedades/[slug]",
      en: "/properties/[slug]",
      fr: "/proprietes/[slug]",
      ru: "/nedvizhimost/[slug]",
      pt: "/imoveis/[slug]",
      de: "/immobilien/[slug]",
    },
  },
});
