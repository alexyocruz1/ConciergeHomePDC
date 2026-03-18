import { setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/LegalPage";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

type Props = {
  params: Promise<{ locale: string }>;
};

function loadLegalDoc(locale: string, docName: string): string {
  const localePath = join(process.cwd(), "legal", locale, docName);
  if (existsSync(localePath)) return readFileSync(localePath, "utf-8");

  const enPath = join(process.cwd(), "legal", "en", docName);
  if (existsSync(enPath)) return readFileSync(enPath, "utf-8");

  return readFileSync(join(process.cwd(), "legal", "es", docName), "utf-8");
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = loadLegalDoc(locale, "privacy.md");

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
