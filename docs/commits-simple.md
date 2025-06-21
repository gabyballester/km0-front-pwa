# 📝 Conventional Commits - Guía Simplificada

Esta guía simplificada describe cómo hacer commits en el proyecto usando solo los tipos más esenciales.

## 🎯 Tipos de Commit (Solo 5)

### `feat` - Nuevas características
```bash
feat: add user authentication
feat: implement dark mode
feat: add google maps integration
```

### `fix` - Correcciones de bugs
```bash
fix: resolve navigation issue
fix: correct email validation
fix: fix mobile layout
```

### `refactor` - Refactorización de código
```bash
refactor: simplify component structure
refactor: extract reusable hooks
refactor: improve error handling
```

### `docs` - Documentación
```bash
docs: update readme
docs: add component examples
docs: fix typos in comments
```

### `chore` - Tareas de mantenimiento
```bash
chore: update dependencies
chore: fix build configuration
chore: add new scripts
```

## 📋 Formato Simple

```
<type>: <description>
```

### Ejemplos:

```bash
# Nueva característica
feat: add social login

# Corrección de bug
fix: resolve mobile navigation

# Refactorización
refactor: simplify auth logic

# Documentación
docs: update installation guide

# Mantenimiento
chore: update dependencies
```

## 🎯 Scopes (Opcional)

Puedes añadir un scope para ser más específico:

```bash
feat(auth): add social login
fix(router): resolve navigation issue
refactor(components): extract reusable hooks
docs(readme): update installation guide
chore(deps): update dependencies
```

## ⚠️ Reglas Importantes

1. **Siempre usar uno de los 5 tipos**
2. **Descripción en minúsculas**
3. **Sin punto final**
4. **Máximo 72 caracteres**
5. **Usar imperativo** ("add" no "added")

## 🚀 Comandos Útiles

```bash
# Crear commit
git commit -m "feat: add new feature"

# Crear commit con scope
git commit -m "fix(router): resolve navigation issue"

# Verificar formato
npm run commitlint:check
```

## 📚 Guía Completa

Para más detalles, ver [docs/commits.md](./commits.md) 