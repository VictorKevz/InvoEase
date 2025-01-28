import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? process.env.REACT_APP_BASE_PATH : '';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    backend: {
      loadPath: `${basePath}locales/{{lng}}.json`,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;