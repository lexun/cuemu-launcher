module.exports = do
  target: 'electron'
  entry: './src/main.ls'
  output:
    path: __dirname + '/out'
    filename: 'main.js'
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
