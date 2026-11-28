/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SITE_URL?: string;
    readonly VITE_SITE_NAME?: string;
    readonly VITE_AUTHOR_NAME?: string;
    readonly VITE_AUTHOR_EMAIL?: string;
    readonly VITE_GIT_BRANCH?: string;
    readonly VITE_GIT_SHA?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
