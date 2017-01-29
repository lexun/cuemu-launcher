const {
  addPlugins,
  createConfig,
  entryPoint,
  env,
  setOutput,
  sourceMaps,
  webpack
} = require("@webpack-blocks/webpack2");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = createConfig([
  entryPoint("./src/index"),
  setOutput("./app/index.js"),
  addPlugins([
    new HtmlWebpackPlugin({ inject: true, template: "./src/index.html" }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env || "development")
    })
  ]),
  loadElm(),
  loadFiles(),
  env("development", [ sourceMaps() ])
]);

function loadElm() {
  return context => ({
    module: {
      loaders: [
        {
          test: /\.elm$/,
          exclude: [ /elm-stuff/, /node_modules/ ],
          loader: "elm-webpack-loader"
        }
      ]
    }
  });
}

function loadFiles() {
  return context => ({
    module: {
      loaders: [
        {
          test: [ /main\.js$/, /package\.json$/ ],
          exclude: [ /elm-stuff/, /node_modules/ ],
          loader: "file-loader?name=[name].[ext]"
        }
      ]
    }
  });
}
