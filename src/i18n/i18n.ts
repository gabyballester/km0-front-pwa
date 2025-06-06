import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'es'],
    debug: false, // process.env.NODE_ENV === 'development',
    ns: ['common'], // Namespace(s)
    defaultNS: 'common',
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['localStorage', 'cookie']
    },
    interpolation: { escapeValue: false },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      addPath: '/locales/add/{{lng}}/{{ns}}'
    },
    saveMissing: true,
    saveMissingTo: 'all',
    updateMissing: true,
    react: { useSuspense: true },
    partialBundledLanguages: true
  });

export default i18n;
