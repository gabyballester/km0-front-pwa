# 🚀 Guía de Desarrollo

Esta guía describe el workflow de desarrollo y las mejores prácticas para contribuir al proyecto.

## 🛠️ Configuración Inicial

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar Husky (automático)
```bash
npm run prepare
```

### 3. Verificar configuración
```bash
npm run lint
npm run test
```

## 📝 Workflow de Commits

### Reglas de Commits

Este proyecto utiliza **Conventional Commits**. Ver [docs/commits.md](./commits.md) para detalles completos.

### Formato Básico
```bash
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Ejemplos para este proyecto:

```bash
# Nueva característica
feat(auth): add social login with Google

# Corrección de bug
fix(router): resolve navigation issue in mobile

# Refactorización
refactor(components): extract reusable hooks

# Documentación
docs(readme): update installation guide

# Mejora de rendimiento
perf(images): implement lazy loading

# Test
test(components): add unit tests for Button

# Mantenimiento
chore(deps): update dependencies
```

## 🔧 Scripts Disponibles

### Desarrollo
```bash
npm run dev              # Servidor de desarrollo
npm run build            # Build de producción (sin incrementar versión)
npm run build:with-version # Build de producción + incrementar versión
npm run preview          # Preview del build
```

### Versionado
```bash
npm run version:bump     # Solo incrementar versión (sin build)
```

**Nota sobre versionado**: 
- `npm run build` - Build normal sin afectar la versión
- `npm run build:with-version` - Build que también incrementa la versión
- El versionado automático solo ocurre en push a master (via hook pre-push)

### Linting y Formateo
```bash
npm run lint         # Ejecutar ESLint
npm run lint:fix     # Corregir errores de ESLint
npm run format       # Formatear con Prettier
npm run fix-all      # Lint + Format
```

### Tests
```bash
npm run test         # Ejecutar tests
npm run test:dev     # Tests en modo watch
npm run test:prod    # Tests silenciosos
```

### Commits
```bash
npm run commitlint           # Validar commit actual
npm run commitlint:check     # Validar último commit
```

### Utilidades
```bash
npm run docs:check           # Verificar documentación
npm run generate-pwa-icons   # Generar iconos PWA
npm run clean-install        # Limpiar e instalar
```

## 🎯 Scopes Recomendados

### Para este proyecto:

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

## 🔄 Workflow de Desarrollo

### 1. Crear una rama
```bash
git checkout -b feat/nueva-caracteristica
```

### 2. Hacer cambios
- Escribir código
- Añadir tests si es necesario
- Actualizar documentación

### 3. Verificar cambios
```bash
npm run lint
npm run test
npm run build
```

### 4. Hacer commit
```bash
git add .
git commit -m "feat(components): add new feature"
```

### 5. Push y Pull Request
```bash
git push origin feat/nueva-caracteristica
```

## ⚠️ Hooks de Git

### Pre-commit
- Ejecuta linting
- Ejecuta tests
- Formatea código

### Commit-msg
- Valida formato del commit
- Verifica Conventional Commits

## 🧪 Testing

### Estructura de Tests
```
src/
├── __test__/
│   ├── __mocks__/
│   └── jest.setup.ts
└── components/
    └── Component.test.tsx
```

### Ejecutar Tests
```bash
npm run test          # Todos los tests
npm run test:dev      # Modo watch
npm run test:prod     # Silencioso
```

## 📚 Documentación

### Archivos de Documentación
- `docs/commits.md` - Guía de Conventional Commits
- `docs/development.md` - Esta guía
- `README.md` - Documentación principal
- `src/shared/docs/` - Documentación técnica

### Generar Documentación
```bash
npm run docs:check
```

## 🚀 Deployment

### Build de Producción
```bash
npm run build
```

### Preview
```bash
npm run preview
```

### Limpiar
```bash
npm run clean-install
```

## 🔍 Troubleshooting

### Problemas Comunes

#### Error de Husky
```bash
npm run prepare
```

#### Error de Commitlint
```bash
npm run commitlint:check
```

#### Error de Linting
```bash
npm run lint:fix
```

#### Error de Tests
```bash
npm run test:prod
```

## 📋 Checklist de Pull Request

- [ ] Código sigue las convenciones del proyecto
- [ ] Tests pasan
- [ ] Linting sin errores
- [ ] Documentación actualizada
- [ ] Commits siguen Conventional Commits
- [ ] Build de producción exitoso

## �� Mejores Prácticas

1. **Commits pequeños y frecuentes**
2. **Siempre incluir tests para nuevas características**
3. **Documentar cambios importantes**
4. **Usar scopes apropiados en commits**
5. **Verificar que el build funcione antes de hacer PR**
6. **Mantener el código limpio y bien formateado** 