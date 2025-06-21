# 🚀 KM0 PWA - React TypeScript

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.11-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.4-38B2AC.svg)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-green.svg)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Una aplicación web progresiva (PWA) moderna construida con React, TypeScript y Vite, diseñada para ofrecer una experiencia de usuario excepcional con funcionalidades offline y características nativas.

## 📋 Tabla de Contenidos

- [🚀 Características](#-características)
- [🛠️ Tecnologías](#️-tecnologías)
- [📦 Instalación](#-instalación)
- [🔧 Scripts Disponibles](#-scripts-disponibles)
- [🏗️ Estructura del Proyecto](#️-estructura-del-proyecto)
- [🎨 Arquitectura](#-arquitectura)
- [🌐 Internacionalización](#-internacionalización)
- [📱 PWA Features](#-pwa-features)
- [🧪 Testing](#-testing)
- [📚 Documentación](#-documentación)
- [📝 Convenciones de Código](#-convenciones-de-código)
- [📝 Conventional Commits](#-conventional-commits)
- [🚀 Despliegue](#-despliegue)
- [🤝 Contribución](#-contribución)
- [📄 Licencia](#-licencia)

## 🚀 Características

### ✨ Funcionalidades Principales

- **🔐 Sistema de Autenticación Completo** - Login, registro y gestión de sesiones con persistencia
- **📊 Dashboard Interactivo** - Panel de control con navegación protegida
- **🗺️ Integración con Google Maps** - Visualización de mapas con marcadores y clustering
- **🌍 Internacionalización** - Soporte multiidioma (Español/Inglés) con i18next
- **🎨 Tema Dinámico** - Modo claro/oscuro con persistencia automática
- **📱 PWA Ready** - Instalable y funcional offline con Service Worker
- **⚡ Performance Optimizada** - Lazy loading, code splitting y optimizaciones de Vite

### 🎯 Características Técnicas

- **TypeScript Strict Mode** - Tipado estático completo y seguro
- **React 19** - Últimas características de React con Suspense
- **Vite 6** - Build tool ultra rápido con HMR
- **Tailwind CSS 4** - Framework CSS utility-first moderno
- **Radix UI** - Componentes primitivos accesibles y personalizables
- **React Router v7** - Navegación moderna con lazy loading
- **i18next** - Internacionalización robusta con detección automática
- **Workbox** - Service Worker avanzado con estrategias de caché

## 🛠️ Tecnologías

### Frontend Core

- **React 19.1.0** - Biblioteca de UI moderna
- **TypeScript 5.7.2** - Tipado estático avanzado
- **Vite 6.0.11** - Build tool y dev server ultra rápido
- **React Router DOM 7.6.2** - Enrutamiento con lazy loading
- **Tailwind CSS 4.1.4** - Framework CSS utility-first

### UI/UX Components

- **Radix UI** - Componentes primitivos accesibles (Dialog, Dropdown, Select, etc.)
- **Lucide React** - Iconografía moderna y consistente
- **Framer Motion** - Animaciones fluidas y performantes
- **Sonner** - Notificaciones toast elegantes
- **Class Variance Authority** - Sistema de variantes de componentes

### PWA & Performance

- **Vite PWA Plugin** - Configuración PWA automática
- **Workbox** - Service Worker con estrategias de caché
- **PWA Assets Generator** - Generación automática de iconos
- **Service Worker** - Funcionalidad offline y background sync

### Testing & Quality

- **Jest** - Framework de testing completo
- **React Testing Library** - Testing de componentes centrado en UX
- **Testing Library User Event** - Simulación de eventos de usuario
- **ESLint** - Linting de código con reglas estrictas
- **Prettier** - Formateo de código automático

### Development Tools

- **Husky** - Git hooks para calidad de código
- **Lint Staged** - Linting pre-commit
- **TypeScript ESLint** - Linting específico para TypeScript
- **Unimported** - Detección de imports no utilizados

## 📦 Instalación

### Prerrequisitos

- **Node.js** 18.0.0 o superior
- **npm** 9.0.0 o superior

### Pasos de Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/km0-pwa-react-ts.git
   cd km0-pwa-react-ts
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno (opcional)**

   ```bash
   # Crear archivo .env.local para configuraciones locales
   touch .env.local
   ```

4. **Iniciar servidor de desarrollo**

   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**

   ```
   http://localhost:3000
   ```

## 🔧 Scripts Disponibles

### Desarrollo

```bash
npm run dev          # Inicia servidor de desarrollo con HMR
npm run build        # Construye para producción optimizado
npm run preview      # Previsualiza build de producción
```

### Testing

```bash
npm run test         # Ejecuta tests con coverage
npm run test:dev     # Ejecuta tests en modo watch
npm run test:prod    # Ejecuta tests en modo silencioso
```

### Linting y Formateo

```bash
npm run lint         # Ejecuta ESLint en todo el proyecto
npm run lint:fix     # Corrige errores de ESLint automáticamente
npm run format       # Formatea código con Prettier
```

### PWA

```bash
npm run generate-pwa-icons  # Genera iconos PWA automáticamente
```

### Utilidades

```bash
npm run clean-install       # Limpia node_modules e instala de nuevo
npm run rebuild            # Reconstruye completamente el proyecto
npm run prod              # Build + preview en un comando
npm run remove-files      # Limpia archivos generados
```

## 🏗️ Estructura del Proyecto

```
src/
├── assets/                 # Recursos estáticos (imágenes, iconos)
├── features/              # Funcionalidades por dominio
│   ├── auth/              # Sistema de autenticación
│   │   ├── layouts/       # Layout de autenticación
│   │   └── pages/         # Páginas de login/registro
│   ├── dashboard/         # Panel de control
│   │   ├── components/    # Componentes del dashboard
│   │   └── pages/         # Páginas del dashboard
│   ├── landing/           # Página de inicio
│   ├── about/             # Página sobre nosotros
│   └── google-maps/       # Integración de mapas
├── shared/                # Código compartido
│   ├── components/        # Componentes reutilizables
│   │   ├── ui/           # Componentes de UI base (shadcn)
│   │   ├── layouts/      # Layouts compartidos
│   │   └── custom/       # Componentes personalizados
│   ├── contexts/          # Contextos de React
│   │   ├── AuthContext   # Contexto de autenticación
│   │   └── theme-context # Contexto de temas
│   ├── hooks/             # Hooks personalizados
│   │   ├── useAuthRedirect
│   │   ├── useConfirmDialog
│   │   ├── useDeviceType
│   │   ├── usePageLoading
│   │   ├── useRequireAuth
│   │   └── useToast
│   ├── layouts/           # Layouts de la aplicación
│   ├── lib/               # Utilidades y configuraciones
│   ├── types/             # Tipos TypeScript
│   ├── constants/         # Constantes de la aplicación
│   ├── pages/             # Páginas compartidas (404, etc.)
│   └── docs/              # Documentación del proyecto
├── router/                # Configuración de rutas
│   ├── routes.tsx         # Definición de rutas
│   ├── paths.router.ts    # Constantes de rutas
│   └── types.ts           # Tipos de rutas
├── i18n/                  # Configuración de internacionalización
├── styles/                # Estilos globales
├── __test__/              # Tests globales
├── App.tsx                # Componente raíz
├── main.tsx              # Punto de entrada
└── sw.ts                 # Service Worker
```

## 🎨 Arquitectura

### Patrón de Diseño

- **Feature-First Architecture** - Organización por funcionalidades de dominio
- **Component Composition** - Composición de componentes reutilizables
- **Custom Hooks** - Lógica reutilizable encapsulada en hooks
- **Context API** - Estado global compartido
- **TypeScript** - Tipado estático completo con strict mode

### Principios de Diseño

- **Single Responsibility** - Cada componente tiene una responsabilidad única
- **DRY (Don't Repeat Yourself)** - Evitar duplicación de código
- **KISS (Keep It Simple, Stupid)** - Mantener la simplicidad
- **Separation of Concerns** - Separación clara de responsabilidades
- **SOLID Principles** - Principios de diseño orientado a objetos

### Sistema de Componentes

- **Modal System** - Sistema completo de modales
  - `Modal` - Modal base con animaciones personalizadas
  - `ConfirmDialog` - Confirmaciones con tipos (info, warning, success, error)
  - `FormModal` - Formularios en modales con validación
  - `InfoModal` - Información con iconos y tipos
- **Toast System** - Notificaciones con Sonner
- **Theme System** - Temas dinámicos con persistencia
- **Loading States** - Estados de carga con skeletons
- **Error Boundaries** - Manejo de errores con React Error Boundary

### Hooks Personalizados

- `useAuthRedirect` - Redirección basada en autenticación
- `useConfirmDialog` - Manejo fácil de confirmaciones
- `useDeviceType` - Detección de tipo de dispositivo
- `usePageLoading` - Estados de carga de páginas
- `useRequireAuth` - Verificación de autenticación
- `useToast` - Sistema de notificaciones

## 🌐 Internacionalización

### Idiomas Soportados

- **Español** (es) - Idioma por defecto
- **Inglés** (en) - Idioma secundario

### Configuración

```typescript
// Uso básico
const { t } = useTranslation();
t('auth.login');

// Con namespace
const { t } = useTranslation('common');
t('auth.login');
```

### Estructura de Traducciones

```
public/locales/
├── es/
│   └── common.json        # Traducciones en español
└── en/
    └── common.json        # Traducciones en inglés
```

### Características

- **Detección automática** de idioma del navegador
- **Persistencia** del idioma seleccionado
- **Fallbacks** para traducciones faltantes
- **Interpolación** de variables en traducciones

## 📱 PWA Features

### Características PWA

- **Offline Support** - Funcionalidad completa sin conexión
- **Installable** - Instalable como app nativa
- **Push Notifications** - Preparado para notificaciones push
- **Background Sync** - Sincronización en segundo plano
- **App Shell** - Shell de aplicación optimizado

### Service Worker

- **Cache First** - Estrategia de caché para recursos estáticos
- **Network First** - Estrategia para datos dinámicos
- **Background Sync** - Sincronización automática
- **Offline Fallback** - Página offline personalizada
- **Runtime Caching** - Caché inteligente de recursos

### Manifest

- **App Icons** - Iconos en múltiples tamaños (64x64, 192x192, 512x512)
- **Theme Colors** - Colores del tema personalizados
- **Display Modes** - Modos de visualización (standalone, fullscreen)
- **Screenshots** - Capturas de pantalla para stores
- **Start URL** - URL de inicio personalizada

## 🧪 Testing

### Configuración

- **Jest** como test runner principal
- **React Testing Library** para testing de componentes
- **Coverage** automático con reportes
- **Mock Service Worker** para APIs (preparado)

### Ejecutar Tests

```bash
# Todos los tests
npm run test

# Tests en modo watch
npm run test:dev

# Tests con coverage
npm run test -- --coverage

# Tests en modo producción
npm run test:prod
```

### Convenciones de Testing

- **Tests junto a los componentes** - Co-locación de tests
- **Nombres descriptivos** - Tests que explican el comportamiento
- **Testing de comportamiento** - No testing de implementación
- **Mocks para dependencias externas** - Aislamiento de tests
- **Testing de accesibilidad** - Asegurar accesibilidad

## 📚 Documentación

### Estrategia de Documentación

Este proyecto sigue una estrategia **híbrida** priorizando **JSDoc** como fuente principal de verdad:

#### **1. JSDoc (Prioridad Principal)**
- **Documentación inline** en todos los componentes, hooks y utilidades
- **Ejemplos de uso** directamente en el código
- **TypeScript types** documentados automáticamente
- **Autocompletado** en IDEs

#### **2. README.md (Visión General)**
- **Quick start** y instalación
- **Arquitectura** de alto nivel
- **Enlaces** a documentación específica
- **Guías** de contribución

#### **3. Documentación Especializada (Opcional)**
- **Guías de migración** cuando sea necesario
- **Arquitecturas complejas** que requieren explicación extensa
- **Decisiones técnicas** importantes

### Documentación Disponible

#### **Componentes con JSDoc Completo**
- `Button` - Componente con múltiples variantes y tamaños
- `Modal` - Sistema de modales personalizado
- `ConfirmDialog` - Confirmaciones con tipos
- `useAuth` - Hook de autenticación completo
- `useConfirmDialog` - Hook para confirmaciones
- `combineClassNames` - Utilidad para clases CSS

#### **Documentación Especializada**
- [`src/shared/docs/README.md`](src/shared/docs/README.md) - Guía de documentación
- [`src/shared/docs/loading-architecture.md`](src/shared/docs/loading-architecture.md) - Sistema de loading
- [`src/shared/docs/path-aliases.md`](src/shared/docs/path-aliases.md) - Aliases de importación
- [`src/shared/docs/loader-types.md`](src/shared/docs/loader-types.md) - Tipos del loader

### Cómo Documentar

#### **Para Componentes**
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

#### **Para Hooks**
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

### Beneficios de esta Estrategia

1. **Documentación Cerca del Código** - JSDoc está junto al código que documenta
2. **Autocompletado Mejorado** - IDEs muestran documentación al usar componentes
3. **Mantenimiento Fácil** - Cambios en código y documentación van juntos
4. **Ejemplos Prácticos** - Ejemplos de uso directamente en el código
5. **TypeScript Integration** - Tipos documentados automáticamente

## 📝 Convenciones de Código

### TypeScript

- **Strict Mode** habilitado completamente
- **No Implicit Any** - Tipado explícito requerido
- **Interface over Type** - Preferir interfaces para objetos
- **Generic Types** - Tipos genéricos cuando sea apropiado
- **Type Guards** - Verificación de tipos en runtime

### React

- **Functional Components** - Componentes funcionales con hooks
- **Custom Hooks** - Lógica reutilizable en hooks
- **Props Interface** - Interfaces para props de componentes
- **Event Handlers** - Manejadores de eventos tipados
- **Error Boundaries** - Manejo de errores en componentes

### Naming Conventions

- **Components** - PascalCase (`UserProfile`, `DashboardLayout`)
- **Files** - kebab-case (`user-profile.tsx`, `dashboard-layout.tsx`)
- **Variables** - camelCase (`userName`, `isLoading`)
- **Constants** - UPPER_SNAKE_CASE (`API_BASE_URL`, `STORAGE_KEYS`)
- **Types/Interfaces** - PascalCase (`UserData`, `AuthContextType`)
- **Hooks** - camelCase con prefijo `use` (`useAuth`, `useConfirmDialog`)

### File Structure

- **One component per file** - Un componente por archivo
- **Index files** - Archivos barrel para exportaciones limpias
- **Feature folders** - Carpetas por funcionalidad de dominio
- **Shared code** - Código compartido en `/shared`
- **Co-location** - Tests y tipos junto a los componentes

### Linting y Formateo

- **ESLint** - Reglas estrictas para TypeScript y React
- **Prettier** - Formateo automático consistente
- **Husky** - Git hooks para calidad de código
- **Lint Staged** - Linting solo en archivos modificados
- **Import sorting** - Ordenamiento automático de imports

## 📝 Conventional Commits

### Tipos Simplificados (Solo 5)

```bash
feat: nueva característica
fix: corrección de bug
refactor: refactorización de código
docs: documentación
chore: tareas de mantenimiento
```

### Ejemplos:

```bash
feat: add user authentication
fix: resolve navigation issue
refactor: simplify component structure
docs: update readme
chore: update dependencies
```

**Ver [Guía Simplificada](./docs/commits-simple.md) para uso diario.**

## 🚀 Despliegue

### Netlify (Configurado)

```bash
# Build automático en push a main
git push origin main
```

### Configuración Manual

```bash
# Build de producción
npm run build

# Servir archivos estáticos
npm run preview
```

### Variables de Entorno

```bash
# .env.production
VITE_API_URL=https://api.tudominio.com
VITE_GOOGLE_MAPS_API_KEY=tu-api-key
VITE_PWA_ENABLED=true
```

### Optimizaciones de Producción

- **Code Splitting** - División automática de código
- **Tree Shaking** - Eliminación de código no utilizado
- **Asset Optimization** - Optimización de imágenes y recursos
- **Service Worker** - Caché inteligente para performance
- **PWA Assets** - Iconos y manifest optimizados

## 🤝 Contribución

### Flujo de Trabajo

1. **Fork** el repositorio
2. **Create** una rama feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios siguiendo [Conventional Commits](./docs/commits.md)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Open** un Pull Request

### Estándares de Código

- **ESLint** - Linting automático con reglas estrictas
- **Prettier** - Formateo automático consistente
- **Husky** - Git hooks para calidad de código
- **Conventional Commits** - Mensajes de commit estandarizados
- **TypeScript** - Tipado estricto requerido

### Conventional Commits

Este proyecto utiliza **Conventional Commits** para mantener un historial de commits limpio. Ver la [guía completa](./docs/commits.md) para detalles.

#### Formato Básico:
```bash
<type>(<scope>): <description>

# Ejemplos:
feat(auth): add social login with Google
fix(router): resolve navigation issue in mobile
refactor(components): extract reusable hooks
docs(readme): update installation guide
```

#### Tipos de Commit:
- `feat` - Nuevas características
- `fix` - Correcciones de bugs
- `docs` - Documentación
- `style` - Cambios de estilo
- `refactor` - Refactorización
- `perf` - Mejoras de rendimiento
- `test` - Tests
- `chore` - Tareas de mantenimiento

### Documentación

- [📝 Guía de Conventional Commits](./docs/commits.md) - Formato y ejemplos de commits
- [🚀 Guía de Desarrollo](./docs/development.md) - Workflow y mejores prácticas
- [📚 Documentación Técnica](./src/shared/docs/README.md) - Documentación del código

### Checklist de PR

- [ ] Tests pasando (`npm run test`)
- [ ] Linting sin errores (`npm run lint`)
- [ ] Build exitoso (`npm run build`)
- [ ] Documentación actualizada
- [ ] Screenshots (si aplica)
- [ ] Descripción clara del cambio
- [ ] Conventional commit message
- [ ] Scope apropiado en el commit

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- **Vite Team** por el build tool ultra rápido
- **Tailwind CSS Team** por el framework CSS utility-first
- **Radix UI Team** por los componentes accesibles
- **React Team** por la biblioteca increíble
- **TypeScript Team** por el tipado estático
- **Shadcn/ui** por los componentes base
- **Workbox Team** por el Service Worker

---

**Desarrollado con ❤️ usando React, TypeScript y Vite**

## 🛠️ Nota sobre TypeScript y ESLint

> ⚠️ **Advertencia esperada:**
>
> Si ves el mensaje:
> 
> `Multiple projects found, consider using a single tsconfig with references to speed up, or use noWarnOnMultipleProjects to suppress this warning`
>
> Es completamente normal en proyectos grandes con referencias y múltiples tsconfig. No afecta el funcionamiento, el build ni el lint. Puedes ignorarlo con seguridad.
>
> La configuración del proyecto ya está optimizada y es estándar para monorepos o proyectos grandes con references.
