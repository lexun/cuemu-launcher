module.exports = do
  target: 'electron'
  entry:
    main: './src/main.ls'
    app: './src/app.ls'
  output:
    path: __dirname + '/out'
    filename: '[name].js'
    chunk-filename: '[id].js'
  module:
    loaders:
      * test: /\.ls$/,
        loader: 'livescript'
      * test: /\.html$/
        loader: 'file?name=[name].html'
  resolve:
    root: __dirname + '/src'
  node:
    __dirname: true
