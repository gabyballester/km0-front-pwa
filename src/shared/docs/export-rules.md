# Reglas de Exportación

Este documento describe las reglas y mejores prácticas para la exportación de componentes y módulos en el proyecto.

## Regla Principal: Usar `export * from`

**SIEMPRE** usar `export * from` en los archivos barrel (index.ts) para evitar errores de exportación y mantener la consistencia.

### ✅ Correcto

```typescript
// En src/shared/components/index.ts
export * from './custom';
export * from './ui';
```

### ❌ Incorrecto

```typescript
// En src/shared/components/index.ts
export { Button } from './ui/button';
export { Card } from './ui/card';
export { AppLoader } from './custom/AppLoader';
```

## Exportación de Componentes Default

Los componentes que usan `export default` deben ser exportados como nombrados en sus archivos originales para poder ser importados desde los barrels.

### ✅ Correcto

```typescript
// En src/shared/components/custom/AppLoader.tsx
export function AppLoader() {
  // ...
}

// También exportar como default si es necesario
export default AppLoader;
```

### ❌ Incorrecto

```typescript
// En src/shared/components/custom/AppLoader.tsx
export default function AppLoader() {
  // ...
}
// Solo export default - no se puede importar desde barrel
```

## Imports Cortos con Alias

Usar siempre los alias configurados para imports más limpios y mantenibles.

### ✅ Correcto

```typescript
import { Button, Card, AppLoader } from '@components';
import { useVersion } from '@contexts';
import { VERSION_CONFIG } from '@constants';
```

### ❌ Incorrecto

```typescript
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { AppLoader } from '@custom-uiAppLoader';
```

## Estructura de Barrels

### Barrel Principal (`src/shared/components/index.ts`)

```typescript
/**
 * Barrel export principal para todos los componentes
 *
 * REGLAS DE EXPORTACIÓN:
 * - Usar SIEMPRE 'export * from' para evitar errores de exportación
 * - NO usar exportaciones nombradas individuales
 * - Los componentes default deben ser exportados como nombrados en sus archivos originales
 * - Mantener imports cortos usando alias (@components, @ui, etc.)
 */

export * from './custom';
export * from './ui';
```

### Barrel de Categoría (`src/shared/components/custom/index.ts`)

```typescript
/**
 * Barrel export para componentes custom
 *
 * REGLAS DE EXPORTACIÓN:
 * - Usar SIEMPRE 'export * from' para evitar errores de exportación
 * - NO usar exportaciones nombradas individuales
 * - Los componentes default deben ser exportados como nombrados en sus archivos originales
 * - Mantener imports cortos usando alias (@components, @ui, etc.)
 */

export * from './AppLoader';
export * from './ContentLoader';
export * from './UserAvatar';
// ... más exports
```

## Beneficios de Esta Aproximación

1. **Consistencia**: Todos los barrels siguen el mismo patrón
2. **Mantenibilidad**: Fácil de mantener y actualizar
3. **Evita Errores**: Previene errores de exportación comunes
4. **Imports Limpios**: Permite imports cortos y legibles
5. **Escalabilidad**: Fácil de extender con nuevos componentes

## Ejemplos de Uso

### Importar Componentes

```typescript
// Importar desde el barrel principal
import { Button, Card, AppLoader, UserAvatar } from '@components';

// Importar desde barrel específico (si es necesario)
import { Button, Card } from '@ui';
import { AppLoader, UserAvatar } from '@custom';
```

### Uso en Componentes

```typescript
function MyPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Mi Página</CardTitle>
        </CardHeader>
        <CardContent>
          <AppLoader>
            <UserAvatar user={currentUser} />
            <Button>Acción</Button>
          </AppLoader>
        </CardContent>
      </Card>
    </div>
  );
}
```

## Verificación

Para verificar que las reglas se están siguiendo correctamente:

1. Todos los archivos barrel usan `export * from`
2. No hay exportaciones nombradas individuales en barrels
3. Los componentes default también tienen exportación nombrada
4. Los imports usan alias cortos
5. La documentación está actualizada en cada barrel
