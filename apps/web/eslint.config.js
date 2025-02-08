/** @import import { Linter } from "eslint" */
import { readFileSync } from 'node:fs';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import globals from 'globals';
import oxlint from 'eslint-plugin-oxlint';
import pluginVue from 'eslint-plugin-vue';
import importPlugin from 'eslint-plugin-import';
import js from '@eslint/js';
import checkFile from 'eslint-plugin-check-file';
import jsdoc from 'eslint-plugin-jsdoc';
import parser from '@babel/parser';

const autoImport = JSON.parse(readFileSync('.eslintrc-auto-import.json', 'utf-8'));

const globalsDTs = readFileSync('globals.d.ts', 'utf-8');
const ast = parser.parse(globalsDTs, { sourceType: 'module', plugins: ['typescript'] });
const globalVars = ast.program.body
  .map((node) => node.declarations)
  .flat()
  .map((node) => node.id.name)
  .reduce((acc, name) => {
    acc[name] = 'readonly';
    return acc;
  }, {});

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,ts,mts,tsx,vue}'],
  },
  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '**/*.spec.*',
      'config/**/*',
      'scripts/**/*',
      'index.html',
      '/*.json',
      '/*.js',
      'playwright.config.ts',
      '**/*.cjs',
      '**/*.mjs',
      '**/*.cts',
      '**/*.mts',
    ],
  },
  skipFormatting,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...autoImport.globals,
        ...globalVars,
      },
    },
  },
  ...pluginVue.configs['flat/recommended'],
  ...vueTsEslintConfig(),
  oxlint.configs['flat/recommended'],
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  jsdoc.configs['flat/recommended-error'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      jsdoc,
    },
    rules: {
      'jsdoc/require-param-type': 'off',
      'jsdoc/require-returns-type': 'off',
      'jsdoc/require-property-type': 'off',
    },
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    rules: {
      'jsdoc/require-description': 'error',
      'vue/html-self-closing': ['warn', { html: { normal: 'never', void: 'always' } }],
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'import/namespace': 'off',
      'import/no-unresolved': 'off',
      'import/default': 'off',
      '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
      'vue/block-order': [
        'error',
        {
          order: [
            'script:not([setup])',
            'script[setup]',
            'template',
            'style:not([scoped])',
            'style[scoped]',
          ],
        },
      ],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          registeredComponentsOnly: false,
        },
      ],
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: ['index'],
        },
      ],
      'vue/no-reserved-component-names': 'error',
    },
  },
  {
    files: ['src/components/ui/**/*.{js,ts,jsx,tsx,vue}'],
    rules: {
      'vue/block-lang': 'off',
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    rules: {
      'import/no-unresolved': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: 'vue',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@vue/**',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['type'],
        },
      ],
    },
  },
  {
    files: ['src/**/*'],
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      'check-file/folder-naming-convention': ['error', { './**/': 'CAMEL_CASE' }],
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*/!(index).{vue,jsx,tsx}': 'PASCAL_CASE',
          '**/*/!(index).{js,ts}': 'CAMEL_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    rules: {
      'vue/comment-directive': 'off',
    },
  },
  {
    files: ['src/constants/**/*'],
    rules: {
      'id-match': [
        'error',
        '^_.*|^[A-Z_0-9$]+$',
        { ignoreDestructuring: true, onlyDeclarations: true },
      ],
    },
  },
];
