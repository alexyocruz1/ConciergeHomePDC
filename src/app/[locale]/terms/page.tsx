import { setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/LegalPage";
import { loadLegalDoc } from "@/lib/legal/loadLegalDoc";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = loadLegalDoc(locale, "terms.md");

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
