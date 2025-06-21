# 🗂️ Path Aliases - Guía Completa

## 📋 Resumen

Los path aliases permiten importar módulos usando rutas cortas y semánticas, mejorando la legibilidad y mantenibilidad del código.

## 🎯 Aliases Disponibles

### **Aliases Principales**
```typescript
// Componentes
@components    → src/shared/components
@ui           → src/shared/components/ui
@custom       → src/shared/components/custom

// Utilidades y Configuración
@utils        → src/shared/utils
@constants    → src/shared/constants
@types        → src/shared/types
@hooks        → src/shared/hooks
@contexts     → src/shared/contexts

// Páginas y Características
@pages        → src/shared/pages
@features     → src/features
@assets       → src/assets

// Router
@router       → src/router
@paths        → src/router/paths.router

// General
@/*           → src/*
```

## 📝 Ejemplos de Uso

### **Antes (Imports Largos)**
```tsx
// ❌ Imports largos y repetitivos
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { logger } from '@/shared/utils/logger';
import { SESSION_KEYS } from '@/shared/constants/key.constants';
import type { User } from '@/shared/types/auth.types';
```

### **Después (Aliases Cortos)**
```tsx
// ✅ Imports cortos y semánticos
import { Button, Card } from '@ui';
import { logger } from '@utils';
import { SESSION_KEYS } from '@constants';
import type { User } from '@types';
```

### **Ejemplos por Categoría**

#### **Componentes UI**
```tsx
// ✅ Importar múltiples componentes UI
import { Button, Card, Modal, Input } from '@ui';

// ✅ Importar componentes custom
import { AppLoader, ContentLoader } from '@custom';
```

#### **Utilidades y Tipos**
```tsx
// ✅ Importar utilidades
import { logger, combineClassNames } from '@utils';

// ✅ Importar constantes
import { SESSION_KEYS, STORAGE_KEYS } from '@constants';

// ✅ Importar tipos
import type { User, LoaderVariant } from '@types';
```

#### **Hooks y Contextos**
```tsx
// ✅ Importar hooks
import { useToast, usePageLoading } from '@hooks';

// ✅ Importar contextos
import { useAuth } from '@contexts';
```

#### **Páginas y Features**
```tsx
// ✅ Importar páginas compartidas
import { NotFoundPage } from '@pages';

// ✅ Importar features
import { DashboardPage } from '@features/dashboard';
```

## 🎨 Mejores Prácticas

### **1. Usar Aliases Específicos**
```tsx
// ✅ Preferir aliases específicos
import { Button } from '@ui';
import { logger } from '@utils';

// ❌ Evitar el alias general cuando hay uno específico
import { Button } from '@/shared/components/ui/button';
```

### **2. Agrupar Imports por Categoría**
```tsx
// ✅ Imports organizados
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Componentes
import { Button, Card } from '@ui';
import { AppLoader } from '@custom';

// Utilidades y tipos
import { logger } from '@utils';
import type { User } from '@types';

// Hooks
import { useAuth } from '@contexts';
```

### **3. Usar Imports de Barril**
```tsx
// ✅ Importar desde el índice del módulo
import { Button, Card, Modal } from '@ui';
import { logger, combineClassNames } from '@utils';

// ❌ Evitar imports directos a archivos específicos
import { Button } from '@ui/button';
```

## 🔧 Configuración

### **TypeScript (tsconfig.json)**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@hooks": ["./src/shared/hooks"],
      "@components": ["./src/shared/components"],
      "@ui": ["./src/shared/components/ui"],
      "@custom": ["./src/shared/components/custom"],
      "@utils": ["./src/shared/utils"],
      "@constants": ["./src/shared/constants"],
      "@contexts": ["./src/shared/contexts"],
      "@types": ["./src/shared/types"],
      "@pages": ["./src/shared/pages"],
      "@router": ["./src/router"],
      "@paths": ["./src/router/paths.router"],
      "@features": ["./src/features"],
      "@assets": ["./src/assets"],
      "@/*": ["./src/*"]
    }
  }
}
```

### **Vite (vite.config.ts)**
```typescript
import { resolve } from 'path';

// Función auxiliar para resolver rutas desde la raíz del proyecto
function resolveFromRoot(relativePath: string): string {
  return resolve(__dirname, relativePath);
}

export default defineConfig({
  resolve: {
    alias: {
      '@hooks': resolveFromRoot('./src/shared/hooks'),
      '@components': resolveFromRoot('./src/shared/components'),
      '@ui': resolveFromRoot('./src/shared/components/ui'),
      '@custom': resolveFromRoot('./src/shared/components/custom'),
      '@utils': resolveFromRoot('./src/shared/utils'),
      '@constants': resolveFromRoot('./src/shared/constants'),
      '@contexts': resolveFromRoot('./src/shared/contexts'),
      '@types': resolveFromRoot('./src/shared/types'),
      '@pages': resolveFromRoot('./src/shared/pages'),
      '@router': resolveFromRoot('./src/router'),
      '@paths': resolveFromRoot('./src/router/paths.router'),
      '@features': resolveFromRoot('./src/features'),
      '@assets': resolveFromRoot('./src/assets'),
      '@': resolveFromRoot('./src')
    }
  }
});
```

## 🛠️ Utilidades de Rutas

Para evitar la repetición de `resolve(__dirname, ...)` en todo el proyecto, hemos creado utilidades centralizadas.

### **Para Código Fuente (TypeScript/JavaScript)**

Utilidades disponibles en `@utils/pathUtils`:

#### `resolvePath(relativePath: string)`
Resuelve una ruta relativa desde el directorio actual.

```typescript
import { resolvePath } from '@utils';

// En lugar de:
const filePath = resolve(__dirname, '../version.json');

// Usar:
const filePath = resolvePath('../version.json');
```

#### `resolveFromRoot(relativePath: string)`
Resuelve una ruta desde el directorio raíz del proyecto.

```typescript
import { resolveFromRoot } from '@utils';

// En configuraciones:
const srcDir = resolveFromRoot('src');
const distDir = resolveFromRoot('dist');
```

#### `resolveFromSrc(relativePath: string)`
Resuelve una ruta desde el directorio `src/`.

```typescript
import { resolveFromSrc } from '@utils';

// En lugar de:
const componentPath = resolve(__dirname, './components/Button.tsx');

// Usar:
const componentPath = resolveFromSrc('shared/components/Button.tsx');
```

#### `resolveFromPublic(relativePath: string)`
Resuelve una ruta desde el directorio `public/`.

```typescript
import { resolveFromPublic } from '@utils';

// En lugar de:
const assetPath = resolve(__dirname, '../public/images/logo.png');

// Usar:
const assetPath = resolveFromPublic('images/logo.png');
```

### **Para Scripts (CommonJS)**

Utilidades centralizadas en `scripts/utils.cjs`:

```javascript
// scripts/example.cjs
const { resolveFromRoot, resolveFromSrc, resolveFromPublic } = require('./utils.cjs');

const VERSION_FILE = resolveFromRoot('version.json');
const BUILD_INFO_FILE = resolveFromRoot('src/shared/utils/build-info.generated.ts');
const SRC_DIR = resolveFromRoot('src');
```

### **Ejemplos de Uso**

#### En Configuraciones
```typescript
// vite.config.ts
import { resolveFromRoot } from '@utils';

export default defineConfig({
  resolve: {
    alias: {
      '@hooks': resolveFromRoot('src/shared/hooks'),
      '@components': resolveFromRoot('src/shared/components'),
      // ... más aliases
    }
  }
});
```

#### En Scripts
```javascript
// scripts/version-bump.cjs
const { resolveFromRoot } = require('./utils.cjs');

const VERSION_FILE = resolveFromRoot('version.json');
const BUILD_INFO_FILE = resolveFromRoot('src/shared/utils/build-info.generated.ts');
```

#### En Componentes
```typescript
// Componentes que necesiten acceder a archivos
import { resolveFromPublic } from '@utils';

const logoPath = resolveFromPublic('images/logo.png');
```

## 📁 Gestión de Archivos de Versión

### **Archivo Único de Versión**

El proyecto mantiene un solo archivo de versión:
- **Ubicación**: `version.json` (en la raíz del proyecto)
- **Propósito**: Almacenar la versión actual del proyecto
- **Acceso**: El frontend lee la versión desde el archivo generado `build-info.generated.ts`

### **Flujo de Versionado**

1. **Push a master** → Hook ejecuta `version-bump.cjs`
2. **Script incrementa** → `version.json` (v0 → v1 → v2...)
3. **Genera build info** → `src/shared/utils/build-info.generated.ts`
4. **Frontend lee** → Versión desde `BUILD_INFO.VERSION_STRING`

## 🚀 Beneficios

1. **Legibilidad**: Imports más cortos y semánticos
2. **Mantenibilidad**: Fácil refactoring de rutas
3. **Consistencia**: Patrones de importación uniformes
4. **Productividad**: Autocompletado mejorado
5. **Organización**: Imports agrupados por categoría
6. **DRY**: Evita repetición de `resolve(__dirname, ...)`
7. **Centralización**: Lógica de rutas en un solo lugar
8. **Simplicidad**: Un solo archivo de versión

## 📚 Referencias

- [TypeScript Path Mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)
- [Vite Alias Configuration](https://vitejs.dev/config/shared-options.html#resolve-alias)
- [React Import Organization](https://react.dev/learn/importing-and-exporting-components)
