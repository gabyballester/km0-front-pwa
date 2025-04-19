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

export default tseslint.config(
  { ignores: ['dist', 'dev-dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettierConfig],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        React: 'writable'
      },
      parserOptions: {
        project: './tsconfig.eslint.json',
        ecmaFeatures: { jsx: true },
        EXPERIMENTAL_useProjectService: true
      }
    },
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
          project: './tsconfig.app.json'
        }
      }
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'padding-line-between-statements': [
        'error', // También una línea en blanco antes de una expresión
        { blankLine: 'always', prev: 'import', next: 'expression' }
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
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before'
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before'
            }
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          },
          'newlines-between': 'always'
        }
      ],
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
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

      // Reglas de accesibilidad
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/aria-role': 'error',

      // Mejores prácticas TypeScript
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/consistent-type-imports': 'error',

      // Nuevas reglas generales
      'no-implicit-coercion': 'error',
      'prefer-object-spread': 'error',
      'default-case-last': 'error',
      'eslint-comments/no-unused-disable': 'error',

      // Mejor manejo de Promesas
      'no-promise-executor-return': 'error',
      'no-unreachable-loop': 'error',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'import/no-unresolved': [
        'error',
        {
          ignore: ['@vite-pwa/assets-generator/config', 'virtual:pwa-register/react']
        }
      ]
    }
  },
  // Configuración para archivos de configuración (tsconfig.node.json)
  {
    files: ['vite.config.ts', 'pwa-assets.config.ts', 'jest.config.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json',
        EXPERIMENTAL_useProjectService: true
      }
    },
    settings: {
      'import/resolver': {
        typescript: {
          ...importResolverBase,
          project: './tsconfig.eslint.json'
        }
      }
    },
    // Reglas específicas para archivos de configuración
    rules: {
      'import/no-default-export': 'off',
      'import/no-unresolved': ['error', { ignore: ['@vite-pwa/assets-generator/config'] }]
    }
  }
);
