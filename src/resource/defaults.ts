import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { language_code } from '../telegram'
import { UserTimerSettings } from '../types'
import { TIME_FORMAT, TIME_FORMAT_Z } from './constants'

dayjs.extend(utc)

export const defaultReminders = [
  dayjs('12:00', TIME_FORMAT).utc().format(TIME_FORMAT_Z),
]

export const defaultSettings: UserTimerSettings = {
  notify: true,
  reminder_timers: defaultReminders,
  time_offset: new Date().getTimezoneOffset(),
  language_code,
}

export const defaultEnergy = 50
