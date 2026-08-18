import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettier from 'eslint-config-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores([
    '**/dist/**',
    '**/node_modules/**',
    '.cz-config.cjs',
    '.prettierrc.js',
    '.prettierrc.cjs',
    'commitlint.config.js',
    'commitlint.config.cjs',
    'eslint.config.mjs',
  ]),

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      'no-unused-vars': 'off',

      'no-console': 'off',
      'no-debugger': 'off',

      'array-bracket-spacing': ['error', 'never'],
      'no-var': 'error',
      'no-eval': 'error',
      'arrow-spacing': 'error',
      'block-spacing': 'error',
      'key-spacing': 'error',
      'brace-style': 'error',
      'comma-dangle': 'off',
      'object-curly-spacing': ['error', 'always'],

      complexity: ['error', { max: 10 }],

      'prefer-const': [
        'error',
        {
          destructuring: 'all',
          ignoreReadBeforeAssign: false,
        },
      ],

      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            [
              // React
              '^react',

              // 第三方包
              '^@?\\w',
              // 内部 npm 包
              '^@kilnonedre(/.*|$)',
              // 项目 alias
              '^@/.*',
              // 父级路径
              '^\\.\\.(?!/?$)',
              '^\\.\\./?$',
              // 当前目录
              '^\\./(?=.*/)(?!/?$)',
              '^\\.(?!/?$)',
              '^\\./?$',
              // 样式
              '^.+\\.(css|less|scss)$',
              // side effect
              '^\\u0000',
            ],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },

  prettier,
])
