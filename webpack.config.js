const {
  addPlugins,
  createConfig,
  defineConstants,
  entryPoint,
  env,
  setOutput,
  webpack
} = require("@webpack-blocks/webpack2");

const devServer = require("@webpack-blocks/dev-server2");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = createConfig([
  entryPoint("./src/index"),
  setOutput("./app/index.js"),
  defineConstants({ "process.env.NODE_ENV": process.env.NODE_ENV }),
  addPlugins([
    new HtmlWebpackPlugin({ inject: true, template: "./src/index.html" })
  ]),
  loadElm(),
  loadFiles(),
  env("development", [ devServer() ])
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
