import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'
import 'dayjs/locale/ru'

dayjs.extend(updateLocale)

dayjs.updateLocale('ru', {
  calendar: {
    sameDay: '[Сегодня,] DD MMMM',
    nextDay: '[Завтра]',
    nextWeek: 'dddd',
    lastDay: '[Вчера,] DD MMMM',
    lastWeek: 'dddd, D MMMM',
    sameElse: 'DD/MM/YYYY',
  },
})

dayjs.updateLocale('en', {
  calendar: {
    sameDay: '[Today,] DD MMMM',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd, DD MMMM',
    lastDay: '[Yesterday] DD MMMM',
    lastWeek: 'dddd, DD MMMM',
    sameElse: 'DD/MM/YYYY',
  },
})
