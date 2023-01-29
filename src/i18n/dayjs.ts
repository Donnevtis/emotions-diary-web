import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/ru';
import { locale } from './locale';

dayjs.extend(updateLocale);

if (locale === 'ru') {
  dayjs.updateLocale('ru', {
    calendar: {
      sameDay: '[Сегодня,] DD MMMM',
    },
  });
}

dayjs.locale(locale);

dayjs.updateLocale('en', {
  calendar: {
    sameDay: '[Today,] DD MMMM',
  },
});
