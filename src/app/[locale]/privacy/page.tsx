import { setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/LegalPage";
import { readFileSync } from "fs";
import { join } from "path";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = readFileSync(
    join(process.cwd(), "POLITICA_DE_PRIVACIDAD.md"),
    "utf-8"
  );

  const backLabels: Record<string, string> = {
    es: "Volver al inicio",
    en: "Back to home",
    fr: "Retour à l'accueil",
    ru: "Вернуться на главную",
    pt: "Voltar ao início",
    de: "Zurück zur Startseite",
  };

  return <LegalPage content={content} backLabel={backLabels[locale] || backLabels.es} />;
}
