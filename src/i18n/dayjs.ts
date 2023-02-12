import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'
import 'dayjs/locale/ru'

dayjs.extend(updateLocale)

dayjs.updateLocale('ru', {
  calendar: {
    sameDay: '[Сегодня,] DD MMMM',
    nextDay: '[Завтра]', // The next day ( Tomorrow at 2:30 AM )
    nextWeek: 'dddd', // The next week ( Sunday at 2:30 AM )
    lastDay: '[Вчера,] DD MMMM', // The day before ( Yesterday at 2:30 AM )
    lastWeek: 'dddd, D MMMM', // Last week ( Last Monday at 2:30 AM )
    sameElse: 'DD/MM/YYYY', // Everything else ( 7/10/2011 )
  },
})

dayjs.updateLocale('en', {
  calendar: {
    sameDay: '[Today,] DD MMMM',
    nextDay: '[Tomorrow]', // The next day ( Tomorrow at 2:30 AM )
    nextWeek: 'dddd, DD MMMM', // The next week ( Sunday at 2:30 AM )
    lastDay: '[Yesterday] DD MMMM', // The day before ( Yesterday at 2:30 AM )
    lastWeek: 'dddd, DD MMMM', // Last week ( Last Monday at 2:30 AM )
    sameElse: 'DD/MM/YYYY', // Everything else ( 7/10/2011 )
  },
})
