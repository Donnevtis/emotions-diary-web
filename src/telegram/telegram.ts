const tg = Telegram.WebApp;
const {
  initDataUnsafe: { user },
} = tg;

export const language_code = user?.language_code || 'en';

export default tg;
