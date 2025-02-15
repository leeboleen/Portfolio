module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-scss'],
  // https://stylelint.io/user-guide/configuration
  rules: {
    'at-rule-no-unknown': null,
    'no-descending-specificity': null,
    'scss/at-rule-no-unknown': [true, {
      ignoreAtRules: [
        'screen',
      ],
    }],
    'declaration-colon-newline-after': null,
    'import-notation': 'string',
  },
};
