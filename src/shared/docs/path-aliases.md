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

export default defineConfig({
  resolve: {
    alias: {
      '@hooks': resolve(__dirname, './src/shared/hooks'),
      '@components': resolve(__dirname, './src/shared/components'),
      '@ui': resolve(__dirname, './src/shared/components/ui'),
      '@custom': resolve(__dirname, './src/shared/components/custom'),
      '@utils': resolve(__dirname, './src/shared/utils'),
      '@constants': resolve(__dirname, './src/shared/constants'),
      '@contexts': resolve(__dirname, './src/shared/contexts'),
      '@types': resolve(__dirname, './src/shared/types'),
      '@pages': resolve(__dirname, './src/shared/pages'),
      '@router': resolve(__dirname, './src/router'),
      '@paths': resolve(__dirname, './src/router/paths.router'),
      '@features': resolve(__dirname, './src/features'),
      '@assets': resolve(__dirname, './src/assets'),
      '@': resolve(__dirname, './src')
    }
  }
});
```

## 🚀 Beneficios

1. **Legibilidad**: Imports más cortos y semánticos
2. **Mantenibilidad**: Fácil refactoring de rutas
3. **Consistencia**: Patrones de importación uniformes
4. **Productividad**: Autocompletado mejorado
5. **Organización**: Imports agrupados por categoría

## 📚 Referencias

- [TypeScript Path Mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)
- [Vite Alias Configuration](https://vitejs.dev/config/shared-options.html#resolve-alias)
- [React Import Organization](https://react.dev/learn/importing-and-exporting-components)
