import { defineConfig } from 'eslint/config';
import ronieryEslintConfig from 'roniery-eslint-config/react.js';

export default defineConfig([
  {
    ignores: [
      'dist/**',
      'build/**',
      'temp/',
      'coverage/',
      '.git',
      '.next',
      'node_modules',
      '.vscode',
      'src/generated',
    ],
  },
  ...ronieryEslintConfig,
]);
