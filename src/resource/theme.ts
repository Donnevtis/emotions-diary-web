import { createTheme } from '@mui/material/styles';
import { DARK_TG_THEME } from '../resource/constants';

const tgTheme = () => {
  const tg = Telegram.WebApp;
  const {
    colorScheme,
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

  return import.meta.env.PROD
    ? {
      colorScheme,
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
};

const {
  colorScheme,
  headerColor,
  hint_color,
  button_color,
  backgroundColor,
  text_color,
} = tgTheme();

export default createTheme({
  palette: {
    primary: { main: button_color },
    secondary: { main: headerColor },
    info: { main: hint_color },
    background: { default: backgroundColor, paper: headerColor },
    text: { primary: text_color, secondary: hint_color, disabled: hint_color },
    action: { disabled: hint_color, disabledBackground: hint_color },
    mode: colorScheme,
  },
});
