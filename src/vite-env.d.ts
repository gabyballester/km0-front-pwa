/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/react" />

declare module 'virtual:pwa-register/react' {
  import type { RegisterSWOptions } from 'vite-plugin-pwa/types';

  export interface UseRegisterSWOptions {
    onRegisterError?: (_error: Error) => void; 
    onRegistered?: (
      _registration: ServiceWorkerRegistration | undefined
    ) => void;
    onRegisterSW?: (
      _swScriptUrl: string,
      _options: RegisterSWOptions
    ) => void;
  }

  export function useRegisterSW(_options?: UseRegisterSWOptions): {
    needRefresh: [boolean, (_needRefresh: boolean) => void];
    offlineReady: [boolean, (_offlineReady: boolean) => void];
    updateServiceWorker: (_reloadPage?: boolean) => Promise<void>;
  };
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.svg?url' {
  const src: string;
  export default src;
}