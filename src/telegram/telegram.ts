const tg = Telegram.WebApp
const {
  initDataUnsafe: { user, query_id },
} = tg

const isDev = import.meta.env.DEV

export const language_code = user?.language_code || 'en'
export const user_id = isDev ? import.meta.env.VITE_USER_ID : user?.id

export default { language_code, query_id, user_id, ...tg }
