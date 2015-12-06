var path = require('path');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer')

options = {
  entry: {
    main: './src/main.js',
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, '..', 'build'),
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.resolve(__dirname, '..', 'src')
      }, {
        test: /(\.html$|\.json$|.png$)/,
        loader: 'file?name=[name].[ext]'
      }, {
        test: /\.css$/,
        loader: 'style/url!file?name=[name].css'
      }
    ]
  },
  resolve: {
    root: __dirname + '/src',
    packageMains: ['webpack', 'browser', 'main'],
    alias: {
      react: path.join(__dirname, '..', 'node_modules', 'react')
    },
    extensions: ['', '.js']
  },
  node: {
    __dirname: true
  }
}

options.target = webpackTargetElectronRenderer(options)
module.exports = options
