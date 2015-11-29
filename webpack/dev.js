var options = require('./shared.js')
var webpack = require('webpack');

options.devTool = 'eval'
options.debug = true

options.module.loaders[0].loaders.unshift('react-hot-loader')

options.plugins = [
  new webpack.DefinePlugin({
    __DEVTOOLS__: true
  })
]

module.exports = options
