// eslint.config.js
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [

  js.configs.recommended,             // JS base rules
  ...tseslint.configs.recommended,    // TS recommended rules

  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
    },

    plugins: {
      '@typescript-eslint': tseslint,
    },

    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',

      // JS Style Rules
      semi: ['error', 'always'],
      quotes: ['warn', 'single', { avoidEscape: true }],
      'prefer-const': 'error',
      'no-console': 'off',
    },
  },

  {
    ignores: [
      'node_modules/',
      'playwright-report/',
      'allure-report/',
      'allure-results/',
      'test-results/',
      'playwright-html-report/',
      '*.config.*.ts',
      'playwright.config.ts',
    ],
  }
];
