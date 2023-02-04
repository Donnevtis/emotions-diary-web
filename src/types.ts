export type NestedEmotions = {
  label: string;
  value: string;
  children: {
    label: string;
    value: string;
  }[];
}[];

export enum PATHS {
  root = '/',
  settings = 'settings/',
}

export type UserTimerSettings = {
  reminder_timers: Array<string>;
  time_offset: number;
  notify: boolean;
};

export type UserState = {
  emotion: string;
  energy: number;
  timestamp: string;
};
