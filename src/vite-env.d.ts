/// <reference types="vite/client" />

// Mendeskripsikan variabel .env agar import.meta.env punya tipe yang jelas
interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_STUDENT_NAME: string;
  readonly VITE_STUDENT_NIM: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
