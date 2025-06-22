# Componentes UI - Toast y Modal

Todos los componentes de UI (incluyendo Modal, Button, Card, etc.) deben importarse desde el alias `@ui`.

```tsx
import { Modal, Button, Card } from '@ui';
```

No importes Modal desde @custom-ui. Los barrels están organizados para que cada tipo de componente se importe desde su alias correspondiente.

## Sistema de Toast (Sonner)

El sistema de Toast utiliza la librería [Sonner](https://sonner.emilkowal.ski/) para mostrar notificaciones no intrusivas en la aplicación.

### Uso Básico

```tsx
import { useToast } from '@/shared/hooks/useToast';
import { TOAST_MESSAGES } from '@/shared/constants/key.constants';

function MiComponente() {
  const { showSuccess, showError, showInfo, showWarning } = useToast();

  // Toast básicos usando constantes
  showSuccess(TOAST_MESSAGES.AUTH.LOGIN_SUCCESS);
  showError(TOAST_MESSAGES.AUTH.INVALID_CREDENTIALS);
  showInfo(TOAST_MESSAGES.GENERAL.INFO);
  showWarning(TOAST_MESSAGES.GENERAL.WARNING);

  // Toast con mensaje personalizado
  showSuccess('Mensaje personalizado', {
    description: 'Descripción opcional',
    duration: 3000,
    position: 'top-center'
  });
}
```

### Constantes Disponibles

El sistema utiliza constantes predefinidas para mantener la consistencia en los mensajes:

```typescript
// Tipos de toast
TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Mensajes predefinidos
TOAST_MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: 'Has iniciado sesión correctamente',
    LOGOUT_SUCCESS: 'Has cerrado sesión correctamente',
    LOGIN_REQUIRED: 'Debes iniciar sesión para acceder a esta página',
    INVALID_CREDENTIALS: 'Credenciales inválidas',
    REGISTER_SUCCESS: 'Registro exitoso'
  },
  GENERAL: {
    ERROR: 'Ha ocurrido un error',
    SUCCESS: 'Operación exitosa',
    WARNING: 'Advertencia',
    INFO: 'Información'
  }
};
```

### Opciones Disponibles

- `duration`: Duración en milisegundos (por defecto: 5000ms)
- `position`: Posición del toast
  - `top-left`
  - `top-right`
  - `bottom-left`
  - `bottom-right`
  - `top-center`
  - `bottom-center`
- `description`: Texto descriptivo opcional

### Buenas Prácticas

1. **Uso de Constantes**

   - Usar `TOAST_MESSAGES` para mensajes predefinidos
   - Mantener los mensajes personalizados concisos y claros
   - Evitar duplicar mensajes similares

2. **Configuración**

   - Mantener la duración entre 3-5 segundos
   - Usar el tipo de toast apropiado según el contexto
   - Evitar mostrar múltiples toasts simultáneamente
   - Preferir la posición `bottom-right` para mensajes no críticos

3. **Accesibilidad**
   - Asegurar que los mensajes sean claros y comprensibles
   - No depender únicamente del color para transmitir información
   - Mantener un contraste adecuado en los textos

## Sistema de Modal

El sistema de Modal utiliza un componente personalizado que encapsula la funcionalidad de shadcn/ui Dialog para proporcionar una interfaz más simple y consistente.

### Uso Básico

```tsx
import { useState } from 'react';
import { Modal } from '@/shared/components/ui/modal';
import { Button } from '@/shared/components/ui/button';

function MiComponente() {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      title='Título del Modal'
      description='Descripción opcional del modal'
      size='md'
    >
      <p>Contenido del modal aquí...</p>
      <Modal.Footer>
        <Button onClick={() => setOpen(false)}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}
```

### Props Disponibles

- `open`: Indica si el modal está abierto
- `onOpenChange`: Función que se llama cuando cambia el estado del modal
- `title`: Título del modal (opcional)
- `description`: Descripción del modal (opcional)
- `children`: Contenido del modal
- `footer`: Contenido del footer (botones de acción) (opcional)
- `className`: Clases CSS adicionales para el contenido (opcional)
- `size`: Tamaño del modal ("sm" | "md" | "lg") (por defecto: "md")
- `showCloseButton`: Indica si se debe mostrar el botón de cerrar (por defecto: true)
- `preventCloseOnClickOutside`: Indica si se debe prevenir el cierre al hacer clic fuera (por defecto: false)
- `preventCloseOnEscape`: Indica si se debe prevenir el cierre al presionar Escape (por defecto: false)
- `onBeforeClose`: Función que se llama antes de cerrar el modal (opcional)

### Componentes Subordinados

#### Modal.Footer

```tsx
<Modal.Footer>
  <Button onClick={() => setOpen(false)}>Cancelar</Button>
  <Button onClick={handleSave}>Guardar</Button>
</Modal.Footer>
```

#### Modal.Header

```tsx
<Modal.Header
  title='Título Personalizado'
  description='Descripción personalizada'
  onClose={() => setOpen(false)}
/>
```

### Personalización

#### Tamaños Predefinidos

```tsx
<Modal size="sm"> // Modal pequeño (425px)
<Modal size="md"> // Modal mediano (600px)
<Modal size="lg"> // Modal grande (800px)
```

#### Prevenir Cierre

```tsx
<Modal
  open={open}
  onOpenChange={setOpen}
  preventCloseOnClickOutside
  preventCloseOnEscape
  onBeforeClose={async () => {
    // Confirmar antes de cerrar
    return window.confirm('¿Estás seguro?');
  }}
>
  {/* ... contenido del modal ... */}
</Modal>
```

#### Modal con Formulario

```tsx
<Modal
  open={open}
  onOpenChange={setOpen}
  title='Editar Perfil'
  description='Realiza cambios en tu perfil aquí'
  size='sm'
>
  <form
    onSubmit={e => {
      e.preventDefault();
      // Manejar el envío
      setOpen(false);
    }}
  >
    {/* ... campos del formulario ... */}
    <Modal.Footer>
      <Button type='submit'>Guardar cambios</Button>
    </Modal.Footer>
  </form>
</Modal>
```

### Buenas Prácticas

1. **Contenido**

   - Mantener el contenido relevante y conciso
   - Usar el tamaño apropiado según el contenido
   - Asegurar que el modal sea accesible (título descriptivo, botón de cerrar visible)

2. **Interacción**

   - Implementar `preventCloseOnClickOutside` y `preventCloseOnEscape` cuando se requiera confirmación del usuario
   - Usar `onBeforeClose` para confirmaciones importantes
   - Proporcionar botones de acción claros en el footer

3. **Accesibilidad**
   - Siempre incluir un título descriptivo
   - Asegurar que el modal se pueda cerrar con el teclado
   - Mantener el foco dentro del modal mientras está abierto
   - Proporcionar texto alternativo para iconos

### Ejemplos

Ver los componentes de ejemplo en:

- `src/examples/ToastExamples.tsx`
- `src/examples/ModalExamples.tsx`
