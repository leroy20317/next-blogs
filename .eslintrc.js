module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint'), 'next'],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'react-hooks/exhaustive-deps': 0,
    'no-param-reassign': 0,
    'no-nested-ternary': 0,
    'prefer-template': 0,
    '@typescript-eslint/dot-notation': 0,
    '@typescript-eslint/consistent-type-imports': 2,
    '@typescript-eslint/no-invalid-this':0,
    'no-underscore-dangle': 0
  },
};
