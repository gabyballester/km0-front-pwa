// Logger
export * from './logger';

// String utilities
export * from './stringUtils';

// CSS/Class utilities
export * from './classUtils';

export {
  checkForMimeTypeErrors,
  clearServiceWorkerCaches,
  clearServiceWorkerSessionData,
  forceServiceWorkerUpdate,
  restartServiceWorker,
  unregisterServiceWorker
} from './swUtils';

export {
  checkForStaleFiles,
  clearBrowserCache,
  clearStaleFiles,
  forceReload,
  verifyMainFiles
} from './cacheUtils';
