/// <reference types="vite/client" />

// Mendeskripsikan variabel .env agar import.meta.env punya tipe yang jelas
interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
