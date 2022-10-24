const { merge } = require('webpack-merge');
const common = require('./common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    open: ['/popup.html'],
    port: 3000,
  },
});
