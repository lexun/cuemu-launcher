var path = require('path');
var webpack = require('webpack');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer')

options = {
  devTool: 'eval',
  debug: true,
  entry: {
    main: './src/main.js',
    app: './src/app.js'
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot-loader', 'babel'],
        include: path.join(__dirname, 'src')
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
      react: path.join(__dirname, 'node_modules', 'react')
    },
    extensions: ['', '.js']
  },
  publicPath: 'http://localhost:2992/dist/',
  node: {
    __dirname: true
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEVTOOLS__: true
    })
  ]
}

options.target = webpackTargetElectronRenderer(options)
module.exports = options
