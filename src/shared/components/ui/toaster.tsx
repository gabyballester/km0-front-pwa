import { Toaster as SonnerToaster } from 'sonner';

/**
 * Componente Toaster para mostrar notificaciones toast
 * 
 * Este componente utiliza Sonner para mostrar notificaciones toast con estilos
 * personalizados que coinciden con el tema de la aplicación.
 * 
 * @example
 * ```tsx
 * // En el layout principal de la aplicación
 * function AppLayout() {
 *   return (
 *     <div>
 *       <main>Contenido de la app</main>
 *       <Toaster />
 *     </div>
 *   );
 * }
 * 
 * // Uso con el hook useToast
 * import { useToast } from '@hooks';
 * 
 * function MyComponent() {
 *   const { toast } = useToast();
 *   
 *   const handleSuccess = () => {
 *     toast({
 *       title: "Éxito",
 *       description: "Operación completada correctamente"
 *     });
 *   };
 *   
 *   const handleError = () => {
 *     toast({
 *       title: "Error",
 *       description: "Algo salió mal",
 *       variant: "destructive"
 *     });
 *   };
 *   
 *   return (
 *     <div>
 *       <button onClick={handleSuccess}>Mostrar éxito</button>
 *       <button onClick={handleError}>Mostrar error</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function Toaster() {
  return (
    <SonnerToaster
      richColors
      closeButton
      position='top-center'
      toastOptions={{
        duration: 5000,
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground'
        }
      }}
    />
  );
}
