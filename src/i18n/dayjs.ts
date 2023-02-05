import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'
import 'dayjs/locale/ru'

dayjs.extend(updateLocale)

dayjs.updateLocale('ru', {
  calendar: {
    sameDay: '[Сегодня,] DD MMMM',
  },
})

dayjs.updateLocale('en', {
  calendar: {
    sameDay: '[Today,] DD MMMM',
  },
})
