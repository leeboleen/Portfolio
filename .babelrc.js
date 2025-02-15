module.exports = {
  presets: [['next/babel', {
    'preset-react': { runtime: 'automatic' },
    'styled-jsx': {
      'plugins': [['@styled-jsx/plugin-sass', {
        'sassOptions': {
          'includePaths': ['./src/styles'],
        },
      }],
        ['styled-jsx-plugin-postcss']],
    },
  }]],
};
