import log from 'loglevel';

// Configurar niveles por entorno
if (import.meta.env.PROD) {
  log.setLevel(log.levels.ERROR); // Solo errores en producción
} else {
  log.setLevel(log.levels.DEBUG); // Todo en desarrollo
}

// Personalizar los mensajes con prefijos y colores en desarrollo
const logger = {
  error: (...args: unknown[]) => {
    if (!import.meta.env.PROD) {
      console.error('%c[ERROR]', 'color: #ef4444; font-weight: bold;', ...args);
    }
    log.error('[ERROR]', ...args);
  },

  warn: (...args: unknown[]) => {
    if (!import.meta.env.PROD) {
      console.warn('%c[WARN]', 'color: #f59e0b; font-weight: bold;', ...args);
    }
    log.warn('[WARN]', ...args);
  },

  info: (...args: unknown[]) => {
    log.info('[INFO]', ...args);
  },

  debug: (...args: unknown[]) => {
    log.debug('[DEBUG]', ...args);
  }
};

export { logger };
