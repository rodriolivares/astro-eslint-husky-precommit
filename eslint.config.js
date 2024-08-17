import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginAstro from 'eslint-plugin-astro';


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs['jsx-a11y-recommended'],

  {
    rules: {
      'no-console': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
    },
    files: ['**/*.js', '**/*.ts', '**/*.astro'],
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/public/**",
      "**/build/**"
    ],
  }
];