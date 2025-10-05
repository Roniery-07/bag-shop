/** @type {import("prettier").Config} */
const config = {
  // Largura máxima da linha antes de quebrar
  printWidth: 80,

  // Tamanho do recuo (em espaços)
  tabWidth: 2,

  // Usar tabulações em vez de espaços (geralmente false)
  useTabs: false,

  // Adicionar ponto e vírgula no final das linhas
  semi: true,

  // Usar aspas simples em vez de duplas
  singleQuote: true,

  // Adicionar vírgula no final de objetos e arrays de múltiplas linhas
  // "es5" - adiciona onde for válido em ES5 (objetos, arrays, etc.)
  trailingComma: 'es5',

  // Adicionar espaços entre chaves em literais de objeto. Ex: { foo: bar }
  bracketSpacing: true,

  // Colocar o ">" de um elemento JSX de múltiplas linhas na última linha
  bracketSameLine: false,

  // Adicionar parênteses ao redor de um único parâmetro de arrow function.
  // "always" - (x) => x
  // "avoid"  - x => x
  arrowParens: 'always',
};

export default config;
