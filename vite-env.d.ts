/// <reference types="vite/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

interface ImportMetaEnv {
    readonly VITE_ASSETS_PATH: string;
    readonly VITE_PUBLIC_PATH: string;
    // Add other env variables here
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }