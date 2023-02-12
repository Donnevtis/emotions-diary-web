const tg = Telegram.WebApp
const {
  initDataUnsafe: { user },
} = tg

const isDev = import.meta.env.DEV

export const language_code = user?.language_code || 'en'
export const user_id = isDev ? Number(import.meta.env.VITE_USER_ID) : user?.id
export const {
  BackButton,
  HapticFeedback,
  MainButton,
  backgroundColor,
  close,
  closeScanQrPopup,
  colorScheme,
  disableClosingConfirmation,
  enableClosingConfirmation,
  expand,
  headerColor,
  initData,
  initDataUnsafe,
  isClosingConfirmationEnabled,
  isExpanded,
  isVersionAtLeast,
  offEvent,
  onEvent,
  openInvoice,
  openLink,
  openTelegramLink,
  platform,
  readTextFromClipboard,
  ready,
  sendData,
  setBackgroundColor,
  setHeaderColor,
  showAlert,
  showConfirm,
  showPopup,
  showScanQrPopup,
  themeParams,
  version,
  viewportHeight,
  viewportStableHeight,
} = tg
