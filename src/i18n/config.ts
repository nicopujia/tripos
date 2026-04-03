import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      app: {
        title: 'Tripos',
      },
      nav: {
        home: 'Home',
        play: 'Play',
        rules: 'Rules',
        about: 'About',
      },
    },
  },
  es: {
    translation: {
      app: {
        title: 'Tripos',
      },
      nav: {
        home: 'Inicio',
        play: 'Jugar',
        rules: 'Reglas',
        about: 'Acerca de',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
