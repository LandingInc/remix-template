import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  tseslint.configs.recommended,
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: { react: pluginReact.configs.flat.recommended },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'off',
      'react/display-name': 'off',
      'react/require-default-props': 'off',
      'no-empty-pattern': 'off',
    },
  },
  stylistic.configs.customize({
    semi: true,
  }),
]);
