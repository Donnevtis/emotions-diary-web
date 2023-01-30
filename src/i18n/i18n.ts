import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../resource/locales/en/translation.json';
import ru from '../resource/locales/ru/translation.json';

export const init = (locale: string) => {
  i18next.use(initReactI18next).init({
    resources: { en, ru },
    supportedLngs: ['en', 'ru'],
    debug: import.meta.env.DEV,
    fallbackLng: 'en',
    lng: locale,
    load: 'currentOnly',
  });

  return i18next;
};

export default i18next;
