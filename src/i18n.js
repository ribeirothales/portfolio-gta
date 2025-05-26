import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  // Carrega traduções de /public/locales
  .use(Backend )
  // Detecta idioma do navegador
  .use(LanguageDetector)
  // Integração com React
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // não necessário para React
    },
    
    // Opções de detecção de idioma
    detection: {
      order: ['navigator', 'htmlTag', 'path', 'cookie'],
      caches: ['cookie'],
      cookieExpirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 dias
    }
  });

export default i18n;
