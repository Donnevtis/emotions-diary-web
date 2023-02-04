/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVICE_URL: string;
  readonly VITE_SETTINGS_URL: string;
  readonly VITE_STATE_URL: string;
  readonly VITE_USER_ID: number;
  readonly VITE_TOKEN: string;

  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
