# Path Aliases - Guía de Uso

Este proyecto utiliza alias personalizados para hacer los imports más cortos y fáciles de usar. Los alias están configurados en TypeScript y Vite para funcionar tanto en desarrollo como en producción.

## 📋 Alias Disponibles

### Alias Generales

- `@/*` - Acceso a cualquier archivo en `src/`
- `@components` - Acceso directo al barrel de componentes (`src/shared/components`)
- `@utils` - Acceso directo al barrel de utilidades (`src/shared/utils`)
- `@hooks` - Acceso directo al barrel de hooks (`src/shared/hooks`)
- `@constants` - Acceso directo al barrel de constantes (`src/shared/constants`)
- `@router` - Acceso directo al barrel del router (`src/router`)
- `@paths` - Acceso directo a las rutas (`src/router/paths.router`)

### Alias Cortos para Subcarpetas

- `@c/*` - Acceso a `src/shared/components/*`
- `@u/*` - Acceso a `src/shared/utils/*`
- `@h/*` - Acceso a `src/shared/hooks/*`
- `@const/*` - Acceso a `src/shared/constants/*`
- `@r/*` - Acceso a `src/router/*`
- `@types/*` - Acceso a `src/shared/types/*`
- `@ctx/*` - Acceso a `src/shared/contexts/*`

## 🚀 Ejemplos de Uso

### Antes vs Después

```tsx
// ❌ Antes - Imports largos
import { Button, Modal, Card } from '@/shared/components/ui/button';
import { logger, combineClassNames } from '@/shared/utils/logger';
import { useToast, usePageLoading } from '@/shared/hooks/useToast';
import { PATHS } from '@/router/paths.router';
import { TOAST_TYPES } from '@/shared/constants/toast.constants';

// ✅ Ahora - Imports más cortos con barrels
import { Button, Modal, Card } from '@components';
import { logger, combineClassNames } from '@utils';
import { useToast, usePageLoading } from '@hooks';
import { PATHS } from '@paths';
import { TOAST_TYPES } from '@constants';

// ✅ O incluso más corto con alias individuales
import { Button } from '@c/ui/button';
import { logger } from '@u/logger';
import { useToast } from '@h/useToast';
```

### Casos de Uso Recomendados

#### 1. **Usar Barrels Principales (Recomendado)**

```tsx
// Para múltiples imports del mismo módulo
import { Button, Modal, Card, Input } from '@components';
import { logger, combineClassNames, capitalize } from '@utils';
import { useToast, usePageLoading, useAuth } from '@hooks';
```

#### 2. **Usar Alias Cortos para Archivos Específicos**

```tsx
// Para imports específicos de archivos individuales
import { UserAvatar } from '@c/custom/UserAvatar';
import { validateEmail } from '@u/validation';
import { useConfirmDialog } from '@h/useConfirmDialog';
```

#### 3. **Casos Especiales**

```tsx
// Rutas y paths
import { PATHS } from '@paths';

// Contextos
import { AuthContext } from '@ctx/AuthContext';

// Tipos
import type { User } from '@types/auth.types';
```

## 🎯 Beneficios

1. **Imports más cortos**: Menos caracteres para escribir
2. **Mejor autocomplete**: Cursor/VSCode sugerirá automáticamente los alias
3. **Más legibles**: Fácil identificar de dónde viene cada import
4. **Consistencia**: Patrones uniformes en todo el proyecto
5. **Refactoring más fácil**: Cambios de estructura más simples

## 💡 Consejos de Uso

1. **Prioriza los barrels**: Usa `@components`, `@utils`, `@hooks` cuando sea posible
2. **Alias cortos para específicos**: Usa `@c/*`, `@u/*`, etc. para archivos individuales
3. **Mantén consistencia**: Usa el mismo patrón en archivos similares
4. **Aprovecha el autocomplete**: Cursor/VSCode te sugerirá los alias automáticamente

## 🔧 Configuración Técnica

Los alias están configurados en:

- `tsconfig.json` - Para TypeScript
- `tsconfig.app.json` - Para la aplicación
- `vite.config.ts` - Para Vite en desarrollo

No necesitas configurar nada adicional, los alias funcionan automáticamente.
