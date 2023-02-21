export type NestedEmotions = {
  label: string
  value: string
  children: {
    label: string
    value: string
  }[]
}[]

export enum PATHS {
  root = '/',
  settings = 'settings/',
  history = 'history/',
}

export enum API_PATHS {
  settings = 'settings',
  state = 'state',
  report = 'report',
  bot = 'bot',
}

export type UserTimerSettings = {
  reminder_timers: Array<string>
  time_offset: number
  notify: boolean
}

export type UserState = {
  emotion: string
  energy: number
  timestamp: number
  timezone: string
}

export type ReportFormat = 'xlsx' | 'pdf'

export type Ranges = { start?: number; end?: number }
