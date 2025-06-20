import { toast } from 'sonner';

import { TOAST_TYPES } from '@/shared/constants';
import { logger } from '@/shared/utils';

/**
 * Opciones de configuración para los toasts
 */
interface ToastOptions {
  /** Duración en milisegundos del toast */
  duration?: number;
  /** Posición del toast en la pantalla */
  position?:
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-center'
    | 'bottom-center';
  /** Descripción opcional del toast */
  description?: string;
  /** Si se debe omitir el logging automático */
  skipLogging?: boolean;
}

type ToastType = (typeof TOAST_TYPES)[keyof typeof TOAST_TYPES];

/**
 * Hook personalizado para mostrar notificaciones toast usando Sonner
 *
 * @example
 * ```tsx
 * const { showSuccess, showError } = useToast();
 *
 * // Mostrar un toast de éxito
 * showSuccess("Operación exitosa");
 *
 * // Mostrar un toast de error con opciones personalizadas
 * showError("Error en la operación", {
 *   duration: 3000,
 *   position: 'bottom-center',
 *   description: 'Por favor, intenta de nuevo'
 * });
 * ```
 */
export function useToast() {
  /**
   * Muestra un toast con el tipo y opciones especificadas
   *
   * @param type - Tipo de toast (success, error, info, warning)
   * @param title - Título del toast
   * @param options - Opciones de configuración del toast
   */
  const showToast = (type: ToastType, title: string, options: ToastOptions = {}) => {
    const { duration = 5000, position = 'top-center', description, skipLogging = false } = options;

    // Logging automático (a menos que se especifique lo contrario)
    if (!skipLogging) {
      const logMessage = description ? `${title} - ${description}` : title;

      switch (type) {
        case TOAST_TYPES.SUCCESS:
          logger.info(`[TOAST SUCCESS] ${logMessage}`);
          break;
        case TOAST_TYPES.ERROR:
          logger.error(`[TOAST ERROR] ${logMessage}`);
          break;
        case TOAST_TYPES.INFO:
          logger.info(`[TOAST INFO] ${logMessage}`);
          break;
        case TOAST_TYPES.WARNING:
          logger.warn(`[TOAST WARNING] ${logMessage}`);
          break;
        default:
          logger.info(`[TOAST] ${logMessage}`);
      }
    }

    const toastOptions = {
      duration,
      position,
      description
    };

    switch (type) {
      case TOAST_TYPES.SUCCESS:
        toast.success(title, toastOptions);
        break;
      case TOAST_TYPES.ERROR:
        toast.error(title, toastOptions);
        break;
      case TOAST_TYPES.INFO:
        toast.info(title, toastOptions);
        break;
      case TOAST_TYPES.WARNING:
        toast.warning(title, toastOptions);
        break;
      default:
        toast(title, toastOptions);
    }
  };

  /**
   * Muestra un toast de éxito
   *
   * @param message - Mensaje a mostrar
   * @param options - Opciones de configuración del toast
   */
  const showSuccess = (message: string, options?: ToastOptions) => {
    showToast(TOAST_TYPES.SUCCESS, message, options);
  };

  /**
   * Muestra un toast de error
   *
   * @param message - Mensaje a mostrar
   * @param options - Opciones de configuración del toast
   */
  const showError = (message: string, options?: ToastOptions) => {
    showToast(TOAST_TYPES.ERROR, message, options);
  };

  /**
   * Muestra un toast informativo
   *
   * @param message - Mensaje a mostrar
   * @param options - Opciones de configuración del toast
   */
  const showInfo = (message: string, options?: ToastOptions) => {
    showToast(TOAST_TYPES.INFO, message, options);
  };

  /**
   * Muestra un toast de advertencia
   *
   * @param message - Mensaje a mostrar
   * @param options - Opciones de configuración del toast
   */
  const showWarning = (message: string, options?: ToastOptions) => {
    showToast(TOAST_TYPES.WARNING, message, options);
  };

  return {
    showToast,
    showSuccess,
    showError,
    showInfo,
    showWarning
  };
}
