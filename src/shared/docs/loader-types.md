# 🎯 Tipos Mejorados del Loader

## 📋 Resumen

Se han creado tipos específicos para el sistema de loading que eliminan la necesidad de casting y proporcionan mejor autocompletado y type safety.

## 🏗️ Tipos Disponibles

### **Tipos del Loader Base**
```typescript
import type { LoaderVariant, LoaderSize, LoaderFullScreen } from '@types';

// Tipos extraídos automáticamente de las variantes del Loader
type LoaderVariant = 'default' | 'verifying' | 'initializing' | 'error';
type LoaderSize = 'sm' | 'md' | 'lg' | 'xl';
type LoaderFullScreen = boolean;
```

### **Tipos del AppLoader**
```typescript
import type { AppLoaderVariant, AppLoaderVariantConfig } from '@types';

// Variantes del AppLoader
type AppLoaderVariant = 'app-init' | 'route-load' | 'error';

// Configuración de cada variante
interface AppLoaderVariantConfig {
  icon: string;
  title: string;
  description: string;
  loaderVariant: LoaderVariant; // Sin casting necesario
  bgColor: string;
}
```

## 🚀 Beneficios de los Tipos Mejorados

### **1. Sin Casting Necesario**
```tsx
// ❌ Antes - Necesitaba casting
const config = {
  loaderVariant: 'initializing' as const,
  // ...
};

// ✅ Ahora - Tipado automático
const config: AppLoaderVariantConfig = {
  loaderVariant: 'initializing', // TypeScript infiere el tipo correcto
  // ...
};
```

### **2. Autocompletado Mejorado**
```tsx
// ✅ Autocompletado para variantes
<Loader variant="|" /> // Sugiere: 'default' | 'verifying' | 'initializing' | 'error'

// ✅ Autocompletado para tamaños
<Loader size="|" /> // Sugiere: 'sm' | 'md' | 'lg' | 'xl'
```

### **3. Type Safety**
```tsx
// ❌ Error de TypeScript - Variante inválida
<Loader variant="invalid-variant" /> // Error: Type '"invalid-variant"' is not assignable

// ✅ Correcto
<Loader variant="initializing" /> // ✅ Sin errores
```

## 📝 Ejemplos de Uso

### **AppLoader con Tipos Mejorados**
```tsx
import type { AppLoaderVariant, AppLoaderVariantConfig } from '@types';

interface AppLoaderProps {
  variant: AppLoaderVariant; // Tipo específico
  title?: string;
  description?: string;
  icon?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function AppLoader({ variant, ...props }: AppLoaderProps) {
  const getVariantConfig = (): AppLoaderVariantConfig => {
    switch (variant) {
      case 'app-init':
        return {
          icon: '🚀',
          title: t('loading.appInit.title'),
          description: t('loading.appInit.description'),
          loaderVariant: 'initializing', // Sin casting
          bgColor: 'bg-background'
        };
      case 'route-load':
        return {
          icon: '📄',
          title: t('loading.routeLoad.title'),
          description: t('loading.routeLoad.description'),
          loaderVariant: 'default', // Sin casting
          bgColor: 'bg-background'
        };
      case 'error':
        return {
          icon: '⚠️',
          title: t('loading.error.title'),
          description: t('loading.error.description'),
          loaderVariant: 'error', // Sin casting
          bgColor: 'bg-background'
        };
    }
  };

  const config = getVariantConfig();
  
  return (
    <Loader variant={config.loaderVariant} size="lg" />
  );
}
```

### **Componente Loader con Tipos**
```tsx
import type { LoaderVariant, LoaderSize, LoaderFullScreen } from '@types';

interface LoaderProps {
  variant?: LoaderVariant; // Opcional con valor por defecto
  size?: LoaderSize;
  fullScreen?: LoaderFullScreen;
  className?: string;
  children?: React.ReactNode;
}

export function Loader({ 
  variant = 'default',
  size = 'md',
  fullScreen = false,
  className,
  children 
}: LoaderProps) {
  // TypeScript garantiza que variant, size y fullScreen son válidos
  return (
    <div className={loaderVariants({ variant, size, fullScreen })}>
      {/* ... */}
    </div>
  );
}
```

## 🔧 Implementación Técnica

### **Extracción de Tipos desde CVA**
```typescript
import type { VariantProps } from 'class-variance-authority';
import { loaderVariants } from '@/components';

// Extraer tipos automáticamente de las variantes
export type LoaderVariant = NonNullable<VariantProps<typeof loaderVariants>['variant']>;
export type LoaderSize = NonNullable<VariantProps<typeof loaderVariants>['size']>;
export type LoaderFullScreen = NonNullable<VariantProps<typeof loaderVariants>['fullScreen']>;
```

### **Ventajas de esta Aproximación**
1. **Sincronización automática**: Los tipos se actualizan automáticamente cuando cambian las variantes
2. **Single source of truth**: Las variantes se definen una sola vez en CVA
3. **Type safety**: TypeScript garantiza que solo se usen variantes válidas
4. **Mantenibilidad**: Cambios en las variantes se reflejan automáticamente en los tipos

## 🎨 Mejores Prácticas

### **1. Usar Tipos Específicos**
```tsx
// ✅ Preferir tipos específicos
import type { LoaderVariant } from '@types';

// ❌ Evitar tipos genéricos
import type { string } from 'typescript';
```

### **2. Aprovechar el Autocompletado**
```tsx
// ✅ Usar autocompletado para descubrir variantes
const variant: LoaderVariant = '|'; // TypeScript sugiere las opciones disponibles
```

### **3. Validación en Runtime (Opcional)**
```tsx
// ✅ Validar variantes en runtime si es necesario
const isValidVariant = (variant: string): variant is LoaderVariant => {
  return ['default', 'verifying', 'initializing', 'error'].includes(variant);
};
```

## 📚 Referencias

- [Class Variance Authority](https://cva.style/docs)
- [TypeScript Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [React TypeScript Best Practices](https://react.dev/learn/typescript) 