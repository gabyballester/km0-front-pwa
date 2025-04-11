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

declare module 'util' {
  export class TextEncoder {
    encode(input?: string): Uint8Array;
    encoding: string; // Es necesario incluir encoding para el conflicto.
    encodeInto?(source: string, destination: Uint8Array): { read: number; written: number }; // Método opcional
  }

  export class TextDecoder {
    constructor(encoding?: string, options?: { fatal?: boolean; ignoreBOM?: boolean });
    decode(input?: Uint8Array, options?: { stream?: boolean }): string;
    encoding: string;
    fatal: boolean;
    ignoreBOM: boolean;
  }
}

declare global {
  interface GlobalThis {
    TextEncoder: typeof TextEncoder;
    TextDecoder: typeof TextDecoder;
  }
}
