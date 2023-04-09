// eslint-disable-next-line no-undef
module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'airbnb',
  ],
  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'max-len': 'warn',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'class-methods-use-this': 'off',
    'no-useless-constructor': 'off',
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    'no-empty-function': 'off',
    'import/extensions': 'off',
    'max-classes-per-file': 'off',
    'default-case': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'no-empty': 'off',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
  },
};
