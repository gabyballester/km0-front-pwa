import { Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from '@/shared/components/ui/button';
import { Modal } from '@/shared/components/ui/modal';
import { logger } from '@/shared/utils/logger';

export interface FormModalProps {
  /** Indica si el modal está abierto */
  open: boolean;
  /** Función que se llama cuando cambia el estado del modal */
  onOpenChange: (open: boolean) => void;
  /** Título del modal */
  title: string;
  /** Descripción del modal */
  description?: string;
  /** Contenido del formulario */
  children: ReactNode;
  /** Texto del botón de guardar */
  saveText?: string;
  /** Texto del botón de cancelar */
  cancelText?: string;
  /** Función que se ejecuta al guardar */
  onSave: () => void | Promise<void>;
  /** Función que se ejecuta al cancelar */
  onCancel?: () => void;
  /** Indica si el formulario está cargando */
  isLoading?: boolean;
  /** Indica si el botón de guardar está deshabilitado */
  isSaveDisabled?: boolean;
  /** Indica si se debe prevenir el cierre al hacer clic fuera */
  preventCloseOnClickOutside?: boolean;
  /** Indica si se debe prevenir el cierre al presionar Escape */
  preventCloseOnEscape?: boolean;
  /** Tamaño del modal */
  size?: 'sm' | 'md' | 'lg';
  /** Clases CSS adicionales para el contenido */
  className?: string;
}

/**
 * Componente FormModal para formularios en modales
 *
 * @example
 * ```tsx
 * // Formulario básico
 * <FormModal
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Crear usuario"
 *   description="Completa los datos del nuevo usuario"
 *   onSave={handleSave}
 *   isLoading={isLoading}
 * >
 *   <form onSubmit={handleSubmit}>
 *     <Input name="name" placeholder="Nombre" />
 *     <Input name="email" placeholder="Email" />
 *   </form>
 * </FormModal>
 *
 * // Formulario con validación
 * <FormModal
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Editar perfil"
 *   onSave={handleSave}
 *   isSaveDisabled={!isFormValid}
 *   isLoading={isLoading}
 * >
 *   <form>
 *     <Input name="name" placeholder="Nombre" />
 *     <Input name="email" placeholder="Email" />
 *     <Textarea name="bio" placeholder="Biografía" />
 *   </form>
 * </FormModal>
 *
 * // Formulario con prevención de cierre
 * <FormModal
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Configuración avanzada"
 *   onSave={handleSave}
 *   preventCloseOnClickOutside
 *   preventCloseOnEscape
 * >
 *   <form>
 *     <Select name="theme">
 *       <option value="light">Claro</option>
 *       <option value="dark">Oscuro</option>
 *     </Select>
 *   </form>
 * </FormModal>
 * ```
 */
export function FormModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  saveText = 'Guardar',
  cancelText = 'Cancelar',
  onSave,
  onCancel,
  isLoading = false,
  isSaveDisabled = false,
  preventCloseOnClickOutside = false,
  preventCloseOnEscape = false,
  size = 'md',
  className
}: FormModalProps) {
  const handleSave = async () => {
    try {
      await onSave();
      onOpenChange(false);
    } catch (error) {
      logger.error('Error al guardar:', error);
      // El error se maneja en la función onSave
    }
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const footer = (
    <div className='flex gap-2 justify-end'>
      <Button variant='outline' onClick={handleCancel} disabled={isLoading}>
        {cancelText}
      </Button>
      <Button onClick={handleSave} disabled={isLoading || isSaveDisabled}>
        {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
        {isLoading ? 'Guardando...' : saveText}
      </Button>
    </div>
  );

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      footer={footer}
      size={size}
      className={className}
      preventCloseOnClickOutside={preventCloseOnClickOutside}
      preventCloseOnEscape={preventCloseOnEscape}
    >
      {children}
    </Modal>
  );
}
