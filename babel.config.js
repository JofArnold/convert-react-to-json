// babel.config.js
module.exports = {
  presets: [
    '@babel/preset-react',
    ['@babel/preset-env', { targets: { esmodules: false, node: 'current' } }],
    '@babel/preset-typescript',
  ],
};
