import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [
  ...compat.config({
    // A mágica acontece aqui:
    extends: [
      'next/core-web-vitals',
      // "plugin:prettier/recommended" deve ser o último para
      // sobrescrever outras configurações de formatação.
      'plugin:prettier/recommended',
    ],

    // O objeto "rules" agora deve conter apenas regras do ESLint,
    // não as do Prettier, pois elas já foram movidas para o prettier.config.mjs
    rules: {
      // Você não precisa mais da regra "semi" aqui, pois o Prettier
      // já está cuidando disso. Mas se quisesse, aqui seria o lugar.
      // Exemplo de uma regra não relacionada a formatação:
      'no-console': 'warn', // Adiciona um aviso se encontrar console.log
    },
  }),
];

export default eslintConfig;
