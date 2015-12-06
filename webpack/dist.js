var options = require('./shared.js')
var webpack = require('webpack');

options.plugins = [
  new webpack.DefinePlugin({
    __DEVTOOLS__: false,
    __HOT__: false
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    sourceMap: false
  })
]

module.exports = options
