var path = require('path');
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
        loaders: ['react-hot-loader', 'babel?stage=0'],
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
    packageMains: ['webpack', 'browser', 'main']
  },
  publicPath: 'http://localhost:2992/dist/',
  node: {
    __dirname: true
  }
}

options.target = webpackTargetElectronRenderer(options)
module.exports = options
