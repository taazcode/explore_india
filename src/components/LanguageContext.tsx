import { createContext, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { translations, type Language } from "../data/translations";
import { getPendingCount, getTranslationsSnapshot, requestTranslation, subscribeTranslations } from "../lib/translate";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  translating: boolean;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("bharat-language") as Language | null;
    return saved && saved in translations ? saved : "English";
  });
  const dynamic = useSyncExternalStore(subscribeTranslations, getTranslationsSnapshot);
  const pendingCount = useSyncExternalStore(subscribeTranslations, getPendingCount);

  const changeLanguage = (next: Language) => {
    setLanguage(next);
    localStorage.setItem("bharat-language", next);
  };

  const value = useMemo(() => {
    const t = (key: string): string => {
      if (!key || language === "English") return key;

      // Every language object spreads `...english` as a base, so a key that
      // was never explicitly translated still reads as "present" with its
      // English value. Only trust it as a real translation when it differs
      // from English — otherwise fall through to live translation.
      const known = translations[language][key];
      if (known && known !== translations.English[key]) return known;

      const dynamicKey = `${language}::${key}`;
      const cached = dynamic[dynamicKey];
      if (cached) return cached;

      requestTranslation(key, language);
      return key;
    };
    return { language, setLanguage: changeLanguage, t, translating: pendingCount > 0 };
  }, [language, dynamic, pendingCount]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
