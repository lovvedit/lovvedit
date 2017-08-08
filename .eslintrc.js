module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },

  plugins: ['prettier'],

  env: {
    es6: true,
    node: true,
    jest: true,
  },

  extends: ['prettier', 'airbnb-base'],
};
