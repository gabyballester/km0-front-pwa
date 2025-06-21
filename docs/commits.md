# 📝 Conventional Commits

Este proyecto utiliza **Conventional Commits** para mantener un historial de commits limpio y automatizado.

## 🎯 ¿Qué son Conventional Commits?

Conventional Commits es una especificación para agregar significado humano y máquina legible a los mensajes de commit. Esto permite:

- **Generación automática de changelogs**
- **Determinación automática de versiones semánticas**
- **Historial de commits más legible**
- **Integración con herramientas de CI/CD**

## 🚀 Guía Rápida (Simplificada)

### Solo 5 Tipos de Commit:

```bash
feat: nueva característica
fix: corrección de bug
refactor: refactorización de código
docs: documentación
chore: tareas de mantenimiento
```

**Ver [Guía Simplificada](./commits-simple.md) para uso diario.**

## 📋 Formato del Commit

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

### Estructura

1. **Type** (obligatorio): Tipo de cambio
2. **Scope** (opcional): Ámbito del cambio
3. **Description** (obligatorio): Descripción corta del cambio
4. **Body** (opcional): Descripción más detallada
5. **Footer** (opcional): Referencias a issues, breaking changes, etc.

## 🏷️ Tipos de Commit (Completos)

### `feat` - Nuevas características
```bash
feat(auth): add social login with Google
feat(ui): implement dark mode toggle
feat(api): add user profile endpoint
```

### `fix` - Correcciones de bugs
```bash
fix(router): resolve navigation issue in mobile
fix(validation): correct email format validation
fix(performance): optimize image loading
```

### `refactor` - Refactorización
```bash
refactor(components): extract reusable hooks
refactor(utils): simplify date formatting
refactor(auth): improve error handling
```

### `docs` - Documentación
```bash
docs(readme): update installation instructions
docs(api): add endpoint documentation
docs(components): add usage examples
```

### `chore` - Tareas de mantenimiento
```bash
chore(deps): update dependencies
chore(build): update build configuration
chore(ci): update GitHub Actions
```

## 🎯 Scopes Recomendados

### Para este proyecto

- **`components`** - Componentes de UI
- **`hooks`** - Custom hooks
- **`utils`** - Utilidades y helpers
- **`api`** - Endpoints y servicios
- **`auth`** - Autenticación
- **`router`** - Enrutamiento
- **`i18n`** - Internacionalización
- **`pwa`** - Funcionalidades PWA
- **`version`** - Sistema de versionado
- **`docs`** - Documentación
- **`build`** - Configuración de build
- **`deps`** - Dependencias

## 📝 Ejemplos Prácticos

### Commit simple
```bash
feat(auth): add login form component
```

### Commit con scope
```bash
fix(router): resolve navigation issue in mobile devices
```

### Commit con body
```bash
feat(api): add user profile endpoint

This endpoint allows users to fetch and update their profile information.
It includes validation for email format and password strength.

Closes #123
```

### Commit con breaking change
```bash
feat(api)!: change user endpoint response format

BREAKING CHANGE: The user endpoint now returns a different structure.
The old `user.name` field is now `user.profile.name`.

Migration guide: Update your API calls to use the new structure.
```

### Commit con múltiples footers
```bash
fix(components): resolve button click issue

Fixes #456
Closes #789
See also #101
```

## 🔧 Configuración del Proyecto

### Husky Hooks

El proyecto incluye hooks de Git configurados con Husky:

1. **pre-commit**: Ejecuta linting y tests antes de cada commit
2. **commit-msg**: Valida el formato del mensaje de commit

### Commitlint

La configuración de commitlint está en `commitlint.config.js` y valida:

- Tipos de commit permitidos
- Formato del mensaje
- Longitud máxima del header
- Caso de las palabras (lowercase)

## 🚀 Comandos Útiles

### Crear un commit
```bash
git commit -m "feat(auth): add social login with Google"
```

### Crear un commit con body
```bash
git commit -m "feat(api): add user profile endpoint" -m "This endpoint allows users to fetch and update their profile information."
```

### Verificar formato de un commit
```bash
npx commitlint --edit .git/COMMIT_EDITMSG
```

### Ver historial de commits
```bash
git log --oneline
```

## 📚 Recursos Adicionales

- [Guía Simplificada](./commits-simple.md) - Para uso diario
- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Commitlint Documentation](https://commitlint.js.org/)
- [Husky Documentation](https://typicode.github.io/husky/)

## 🎯 Beneficios

1. **Historial limpio**: Commits fáciles de entender
2. **Automatización**: Generación automática de changelogs
3. **Versionado semántico**: Determinación automática de versiones
4. **Colaboración**: Mejor comunicación entre desarrolladores
5. **CI/CD**: Integración con pipelines de deployment

## ⚠️ Reglas Importantes

1. **Siempre usar tipos válidos**
2. **Descripción en minúsculas**
3. **Sin punto final en la descripción**
4. **Máximo 72 caracteres en el header**
5. **Usar imperativo en la descripción** ("add" no "added")
6. **Incluir scope cuando sea relevante**
