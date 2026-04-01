import { existsSync, readFileSync } from "fs";
import { join } from "path";
import {
  BRAND_NAME,
  CONTACT_EMAIL,
  LEGAL_REPRESENTATIVE_NAME,
  WHATSAPP_PHONE_DISPLAY,
} from "@/lib/site";

/**
 * Loads a locale-specific markdown legal doc and replaces known contact/company strings
 * with values from `src/lib/site.ts` so updates are centralized.
 */
export function loadLegalDoc(locale: string, docName: string): string {
  const localePath = join(process.cwd(), "legal", locale, docName);
  if (existsSync(localePath)) {
    return applyLegalReplacements(readFileSync(localePath, "utf-8"));
  }

  const enPath = join(process.cwd(), "legal", "en", docName);
  if (existsSync(enPath)) {
    return applyLegalReplacements(readFileSync(enPath, "utf-8"));
  }

  return applyLegalReplacements(readFileSync(join(process.cwd(), "legal", "es", docName), "utf-8"));
}

function applyLegalReplacements(content: string): string {
  // Contact + company
  content = content
    .replaceAll("Casa Concierge PDC", BRAND_NAME)
    .replaceAll("Casa Concierge Co.", LEGAL_REPRESENTATIVE_NAME)
    .replaceAll("casaconciergepdc@outlook.com", CONTACT_EMAIL);

  // WhatsApp display number
  content = content.replaceAll("+52 ‪984 481 7579‬", WHATSAPP_PHONE_DISPLAY);

  return content;
}

