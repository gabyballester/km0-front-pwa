import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import eslintComments from 'eslint-plugin-eslint-comments';
import eslintPluginImport from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const importResolverBase = {
  alwaysTryTypes: true,
  conditions: ['import', 'require', 'default'],
  extensionAlias: {
    '.js': ['.js', '.ts', '.tsx'],
    '.svg': ['.svg']
  }
};

// Configuración base compartida
const baseConfig = {
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    import: eslintPluginImport,
    'jsx-a11y': jsxA11yPlugin,
    'eslint-comments': eslintComments,
    react: reactPlugin
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: {
        ...importResolverBase,
        project: ['./tsconfig.app.json', './tsconfig.node.json']
      }
    }
  }
};

// Configuración mejorada para ordenamiento de imports
const importOrderConfig = {
  groups: [
    'builtin', // Node.js built-in modules
    'external', // Third-party modules
    'internal', // Internal modules (aliases)
    'parent', // Parent directory imports
    'sibling', // Same directory imports
    'index', // Index imports
    'object', // Object imports
    'type' // Type imports
  ],
  pathGroups: [
    // React siempre primero
    {
      pattern: 'react',
      group: 'external',
      position: 'before'
    },
    // React Router
    {
      pattern: 'react-router*',
      group: 'external',
      position: 'after'
    },
    // Lucide React (iconos)
    {
      pattern: 'lucide-react',
      group: 'external',
      position: 'after'
    },
    // Imports internos con alias @ (original)
    {
      pattern: '@/**',
      group: 'internal',
      position: 'before'
    },
    // Nuevos alias específicos
    {
      pattern: '@components',
      group: 'internal',
      position: 'before'
    },
    {
      pattern: '@utils',
      group: 'internal',
      position: 'before'
    },
    {
      pattern: '@hooks',
      group: 'internal',
      position: 'before'
    },
    {
      pattern: '@contexts',
      group: 'internal',
      position: 'before'
    },
    {
      pattern: '@constants',
      group: 'internal',
      position: 'before'
    },
    {
      pattern: '@router',
      group: 'internal',
      position: 'before'
    },
    {
      pattern: '@paths',
      group: 'internal',
      position: 'before'
    },
    {
      pattern: '@types',
      group: 'internal',
      position: 'before'
    },
    {
      pattern: '@ctx/**',
      group: 'internal',
      position: 'before'
    },
    // Alias cortos con subcarpetas
    {
      pattern: '@c/**',
      group: 'internal',
      position: 'before'
    },
    {
      pattern: '@u/**',
      group: 'internal',
      position: 'before'
    },
    {
      pattern: '@h/**',
      group: 'internal',
      position: 'before'
    },
    {
      pattern: '@const/**',
      group: 'internal',
      position: 'before'
    },
    {
      pattern: '@r/**',
      group: 'internal',
      position: 'before'
    },
    {
      pattern: '@types/**',
      group: 'internal',
      position: 'before'
    },
    // Assets y archivos estáticos
    {
      pattern: '*.{css,scss,less,styl}',
      group: 'object',
      patternOptions: { matchBase: true },
      position: 'after'
    },
    // Tipos de TypeScript
    {
      pattern: '*.{d.ts}',
      group: 'type',
      patternOptions: { matchBase: true },
      position: 'after'
    }
  ],
  pathGroupsExcludedImportTypes: ['react', 'react-router*'],
  alphabetize: {
    order: 'asc',
    caseInsensitive: true
  },
  'newlines-between': 'always',
  warnOnUnassignedImports: true
};

// Reglas base compartidas mejoradas
const baseRules = {
  ...reactHooks.configs.recommended.rules,
  'react-refresh/only-export-components': 'off',
  'no-multiple-empty-lines': ['error', { max: 1 }],
  'padding-line-between-statements': [
    'error',
    { blankLine: 'always', prev: 'import', next: 'expression' },
    { blankLine: 'always', prev: 'expression', next: 'export' }
  ],
  'import/no-extraneous-dependencies': ['off'],
  '@typescript-eslint/no-require-imports': 'error',
  '@typescript-eslint/no-explicit-any': 'error',
  'linebreak-style': ['error', 'unix'],
  'no-console': ['error', { allow: ['warn', 'error'] }],
  'react-hooks/exhaustive-deps': 'error',
  'react-hooks/rules-of-hooks': 'error',
  'comma-dangle': ['error', 'never'],
  'import/first': 'error',
  'import/no-duplicates': 'error',
  'import/order': ['error', importOrderConfig],
  'sort-imports': [
    'error',
    {
      ignoreCase: true,
      ignoreDeclarationSort: true, // Dejamos que import/order maneje esto
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
    }
  ],
  'react/jsx-key': 'error',
  'react/jsx-no-target-blank': 'error',
  'react/self-closing-comp': [
    'error',
    {
      component: true,
      html: true
    }
  ],
  'react/jsx-fragments': ['error', 'syntax'],
  'react/jsx-curly-brace-presence': ['error', 'never'],
  'jsx-a11y/alt-text': 'error',
  'jsx-a11y/anchor-has-content': 'error',
  'jsx-a11y/aria-role': 'error',
  '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
  '@typescript-eslint/consistent-type-imports': [
    'error',
    {
      prefer: 'type-imports',
      disallowTypeAnnotations: false
    }
  ],
  'no-implicit-coercion': 'error',
  'prefer-object-spread': 'error',
  'default-case-last': 'error',
  'eslint-comments/no-unused-disable': 'error',
  'no-promise-executor-return': 'off',
  'no-unreachable-loop': 'error',
  'react/jsx-uses-react': 'off',
  'react/react-in-jsx-scope': 'off',
  'import/no-unresolved': [
    'error',
    {
      ignore: ['@vite-pwa/assets-generator/config', 'virtual:pwa-register/react']
    }
  ],
  // Nuevas reglas para mejor calidad de código
  'prefer-const': 'error',
  'no-var': 'error',
  'object-shorthand': 'error',
  'prefer-template': 'error',
  'template-curly-spacing': 'error',
  'arrow-spacing': 'error',
  'no-duplicate-imports': 'error',
  'no-useless-rename': 'error'
};

// Reglas optimizadas para pre-commit (manteniendo orden de imports)
const preCommitRules = {
  ...baseRules,
  // Mantener orden de imports en pre-commit
  'import/order': ['error', importOrderConfig],
  'sort-imports': baseRules['sort-imports'],
  '@typescript-eslint/consistent-type-imports':
    baseRules['@typescript-eslint/consistent-type-imports'],
  // Reducir algunas reglas a warnings para velocidad
  'jsx-a11y/alt-text': 'warn',
  'jsx-a11y/anchor-has-content': 'warn',
  'jsx-a11y/aria-role': 'warn',
  'react-hooks/exhaustive-deps': 'warn',
  // Deshabilitar reglas muy costosas solo en pre-commit
  'import/no-unresolved': [
    'warn',
    {
      ignore: ['@vite-pwa/assets-generator/config', 'virtual:pwa-register/react']
    }
  ]
};

export default tseslint.config(
  {
    ignores: [
      'dist',
      'dev-dist',
      'node_modules',
      'coverage',
      '*.config.js',
      'jest.config.ts' // Ignorar solo jest.config.ts
    ]
  },
  // Configuración principal para archivos de la aplicación
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettierConfig],
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        React: 'writable'
      },
      parserOptions: {
        project: './tsconfig.app.json',
        warnOnMultipleProjects: false, // Suprimir warning para project references
        ecmaFeatures: { jsx: true },
        EXPERIMENTAL_useProjectService: true,
        noWarnOnMultipleProjects: true // Opción adicional para mayor compatibilidad
      }
    },
    ...baseConfig,
    rules: process.env.NODE_ENV === 'pre-commit' ? preCommitRules : baseRules
  },
  // Configuración para archivos de configuración
  {
    files: ['vite.config.ts', 'pwa-assets.config.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.node.json',
        warnOnMultipleProjects: false,
        EXPERIMENTAL_useProjectService: true,
        noWarnOnMultipleProjects: true
      }
    },
    plugins: {
      import: eslintPluginImport,
      '@typescript-eslint': tseslint.plugin
    },
    settings: {
      'import/resolver': {
        typescript: {
          ...importResolverBase,
          project: './tsconfig.node.json'
        }
      }
    },
    rules: {
      'import/no-default-export': 'off',
      'import/no-unresolved': ['error', { ignore: ['@vite-pwa/assets-generator/config'] }],
      'import/order': 'off' // Deshabilitar orden en archivos de config
    }
  },
  // Configuración para archivos de test
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}', 'src/__test__/**/*'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.app.json',
        warnOnMultipleProjects: false,
        EXPERIMENTAL_useProjectService: true,
        noWarnOnMultipleProjects: true
      }
    },
    plugins: {
      import: eslintPluginImport
    },
    rules: {
      'import/no-unresolved': 'off', // Más permisivo en tests
      'no-console': 'off' // Permitir console en tests
    }
  }
);
