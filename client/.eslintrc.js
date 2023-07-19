module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'comma-dangle': ['error', 'never'],
    'no-param-reassign': 0,
    'react/prop-types': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'max-len': 0,
    'import/prefer-default-export': 0
  }
};
