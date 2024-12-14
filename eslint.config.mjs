// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  prettierConfig,
  {
    ignores: ['node_modules', 'dist', 'jest.config.js'],
    rules: {
      '@typescript-eslint/ban-tslint-comment': 'off',
    },
  }
);
