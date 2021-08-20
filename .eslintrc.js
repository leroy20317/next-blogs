module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint'), 'next'],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'no-nested-ternary': 0,
    'prefer-template': 0,
    '@typescript-eslint/dot-notation': 0,
  },
};
