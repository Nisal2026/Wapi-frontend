import i18n from "@/src/lib/i18n";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loadTranslations = (locale: string, translations: Record<string, any>): void => {
  if (!translations || typeof translations !== "object") return;

  // `true, true` = deep merge + overwrite existing keys
  i18n.addResourceBundle(locale, "translation", translations, true, true);
};
