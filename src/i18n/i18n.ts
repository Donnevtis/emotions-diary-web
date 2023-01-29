import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { locale } from './locale';
import en from '../resource/locales/en/translation.json';
import ru from '../resource/locales/ru/translation.json';

i18next.use(initReactI18next).init({
  resources: { en, ru },
  supportedLngs: ['en', 'ru'],
  debug: import.meta.env.DEV,
  fallbackLng: 'en',
  lng: locale,
  load: 'currentOnly',
});

export default i18next;
