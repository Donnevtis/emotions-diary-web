import { DARK_TG_THEME } from '../resource/constants';

const tg = Telegram.WebApp;
const {
  headerColor,
  backgroundColor,
  themeParams: {
    bg_color,
    text_color,
    hint_color,
    button_color,
    button_text_color,
    link_color,
    secondary_bg_color,
  },
} = tg;

export const useTgTheme = () =>
  import.meta.env.PROD
    ? {
        headerColor,
        backgroundColor,
        bg_color,
        text_color,
        hint_color,
        button_color,
        button_text_color,
        link_color,
        secondary_bg_color,
      }
    : DARK_TG_THEME;
