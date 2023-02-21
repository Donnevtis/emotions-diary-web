/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GATEWAY_URL: string
  readonly VITE_USER_ID: string
  readonly VITE_TOKEN: string

  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
