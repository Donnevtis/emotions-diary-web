const tg = Telegram.WebApp;
const { HapticFeedback, expand, ready, platform } = tg;

export const useTg = () => ({
  HapticFeedback,
  expand,
  ready,
  platform,
});
