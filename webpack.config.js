var path = require('path');

module.exports = {
  target: 'electron',
  entry: {
    main: './src/main.js',
    app: './src/app.js'
  },
  output: {
    path: __dirname + '/app',
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      }, {
        test: /\.html$/,
        loader: 'file?name=[name].html'
      }, {
        test: /\.css$/,
        loader: 'style/url!file?name=[name].css'
      }
    ]
  },
  resolve: {
    root: __dirname + '/src'
  },
  node: {
    __dirname: true
  }
};
