import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { TIME_FORMAT, TIME_FORMAT_Z } from '../../resource/constants'
import { TimersToDisabled } from './Settings.types'

dayjs.extend(utc)

export const toUTC = (time: string) =>
  dayjs(time, TIME_FORMAT).utc().format(TIME_FORMAT_Z)

export const toLocal = (time: string) =>
  dayjs(time, TIME_FORMAT_Z).format(TIME_FORMAT)

export const divTimers = (timers: string[]) =>
  timers.reduce((pre, cur) => {
    const [hour, minute] = cur.split(':').map(Number)
    ;(pre[hour] ??= []).push(minute)

    return pre
  }, {} as TimersToDisabled)
