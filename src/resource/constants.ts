type TgTheme = Pick<
  Telegram['WebApp'],
  'colorScheme' | 'headerColor' | 'backgroundColor'
> &
  Telegram['WebApp']['themeParams'];

export const DARK_TG_THEME: TgTheme = {
  colorScheme: 'dark',
  headerColor: '#282e33',
  backgroundColor: '#282e33',
  bg_color: '#282e33',
  button_color: '#4e9c56',
  button_text_color: '#ffffff',
  hint_color: '#82868a',
  link_color: '#69cf6c',
  secondary_bg_color: '#313b43',
  text_color: '#f5f5f5',
};

export const WHITE_TG_THEME: TgTheme = {
  colorScheme: 'light',
  headerColor: '#ffffff',
  backgroundColor: '#ffffff',
  bg_color: '#ffffff',
  button_color: '#40a7e3',
  button_text_color: '#ffffff',
  hint_color: '#999999',
  link_color: '#168acd',
  secondary_bg_color: '#f1f1f1',
  text_color: '#000000',
};

export const TIME_FORMAT = 'HH:mm';

export const DEFAULT_REMINDERS = ['09:00', '13:00', '20:00'];

export const DEFAULT_ENERGY = 50;
