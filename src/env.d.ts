/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVICE_URL: string;
  readonly VITE_DB_URL: string;
  readonly VITE_USER_ID: number;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
