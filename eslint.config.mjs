import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', '@rocketseat/eslint-config/react'],
    plugins: ['simple-import-sort'],
    rules: {
      'simple-import-sort/imports': 'error',
      'no-console': 'warn', // Adiciona um aviso se encontrar console.log
    },
  }),
]

export default eslintConfig
