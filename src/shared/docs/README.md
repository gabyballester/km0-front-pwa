# 📚 Documentación del Proyecto

## 🎯 Estrategia de Documentación

Este proyecto sigue una estrategia **híbrida** de documentación priorizando **JSDoc** como fuente principal de verdad:

### **1. JSDoc (Prioridad Principal)**
- **Documentación inline** en todos los componentes, hooks y utilidades
- **Ejemplos de uso** directamente en el código
- **TypeScript types** documentados automáticamente
- **Autocompletado** en IDEs

### **2. README.md (Visión General)**
- **Quick start** y instalación
- **Arquitectura** de alto nivel
- **Enlaces** a documentación específica
- **Guías** de contribución

### **3. Documentación Especializada (Opcional)**
- **Guías de migración** cuando sea necesario
- **Arquitecturas complejas** que requieren explicación extensa
- **Decisiones técnicas** importantes

## 📁 Archivos de Documentación Especializada

### **Arquitecturas Complejas**
- [`loading-architecture.md`](./loading-architecture.md) - Sistema unificado de loading states
- [`ui-components.md`](./ui-components.md) - Sistema de modales y toasts

### **Configuración y Herramientas**
- [`path-aliases.md`](./path-aliases.md) - Aliases de importación y configuración
- [`loader-types.md`](./loader-types.md) - Tipos mejorados del sistema de loading
- [`export-rules.md`](./export-rules.md) - Reglas de exportación y barrels

## 🚀 Cómo Documentar

### **Para Componentes**
```tsx
/**
 * Componente Button personalizado con variantes
 * 
 * @example
 * ```tsx
 * // Botón primario
 * <Button variant="primary" size="lg">
 *   Click me
 * </Button>
 * 
 * // Botón con loading
 * <Button disabled={isLoading}>
 *   {isLoading && <Loader size="sm" />}
 *   Submit
 * </Button>
 * ```
 */
export function Button({ variant, size, children, ...props }) {
  // ...
}
```

### **Para Hooks**
```tsx
/**
 * Hook para manejar estados de autenticación
 * 
 * @example
 * ```tsx
 * const { user, isLoading, login, logout } = useAuth();
 * 
 * if (isLoading) return <Loader />;
 * if (!user) return <LoginForm />;
 * 
 * return <Dashboard user={user} />;
 * ```
 */
export function useAuth() {
  // ...
}
```

### **Para Utilidades**
```tsx
/**
 * Combina múltiples clases CSS de forma segura
 * 
 * @param classes - Clases CSS a combinar
 * @returns String con clases combinadas
 * 
 * @example
 * ```tsx
 * const className = combineClassNames(
 *   'base-class',
 *   isActive && 'active',
 *   variant === 'primary' && 'text-blue-500'
 * );
 * ```
 */
export function combineClassNames(...classes: (string | boolean | undefined)[]): string {
  // ...
}
```

## 📋 Checklist de Documentación

### **Antes de Crear un Archivo .md**
- [ ] ¿La información no cabe en JSDoc?
- [ ] ¿Es una guía de migración o arquitectura compleja?
- [ ] ¿Requiere diagramas o explicaciones extensas?
- [ ] ¿Es información que cambia frecuentemente?

### **Para Cada Componente/Hook**
- [ ] ¿Tiene JSDoc con descripción clara?
- [ ] ¿Incluye ejemplos de uso?
- [ ] ¿Documenta props/parámetros importantes?
- [ ] ¿Menciona casos de uso específicos?

## 🔄 Migración

### **Fase 1: JSDoc en Componentes Principales**
- [x] ConfirmDialog
- [x] Modal
- [x] useConfirmDialog
- [ ] Button
- [ ] Input
- [ ] Card
- [ ] useAuth
- [ ] useToast

### **Fase 2: Revisar Documentación Especializada**
- [ ] Evaluar si `loading-architecture.md` puede simplificarse
- [ ] Mover ejemplos de `ui-components.md` a JSDoc
- [ ] Mantener solo guías de configuración en .md

### **Fase 3: Limpiar y Organizar**
- [ ] Eliminar archivos .md obsoletos
- [ ] Actualizar README principal con enlaces
- [ ] Crear índice de documentación

## 📚 Referencias

- [JSDoc Documentation](https://jsdoc.app/)
- [React Documentation Best Practices](https://react.dev/learn/writing-markup-with-jsx)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/JSDoc) 