const { user } = Telegram.WebApp.initDataUnsafe;

export const locale = user?.language_code || 'en';
