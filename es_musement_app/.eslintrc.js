module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': 0,
    'array-bracket-spacing': 0,
    'brace-style': 0,
    'array-bracket-newline': 0,
    'object-curly-spacing': 0,
    'object-curly-newline': 0,
    'jsx-quotes': 1,
    'quote-props': 1,
    quotes: 1,
    'class-methods-use-this': "off",
    'no-alert': "off"
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
