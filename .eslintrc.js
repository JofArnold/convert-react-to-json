module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  env: {
    jest: true,
    node: true,
    es6: true,
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/no-var-requires': 0,
    'no-unused-expressions': [
      'error',
      {
        allowTernary: true,
      },
    ],
    'no-console': 0,
    'no-confusing-arrow': 0,
    'no-else-return': 0,
    'no-return-assign': [2, 'except-parens'],
    'no-underscore-dangle': 0,
    camelcase: 0,
    'prefer-arrow-callback': [
      'error',
      {
        allowNamedFunctions: true,
      },
    ],
    'no-restricted-syntax': 0,
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'import/no-extraneous-dependencies': 0,
    'arrow-body-style': 0,
    'no-nested-ternary': 0,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  parser: '@typescript-eslint/parser',
};
