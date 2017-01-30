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

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = createConfig([
  entryPoint("./src/index"),
  setOutput("./app/index.js"),
  defineConstants({ "process.env.NODE_ENV": process.env.NODE_ENV }),
  addPlugins([
    new CopyWebpackPlugin([
      { from: "./package.json", to: "package.json" },
      { from: "./src/index.html", to: "index.html" },
      { from: "./src/logo.png", to: "logo.png" },
      { from: "./src/main.js", to: "main.js" }
    ]),
    new HtmlWebpackPlugin({ inject: true, template: "./src/index.html" })
  ]),
  loadElm(),
  env("development", [ devServer() ])
]);

function loadElm() {
  return context => ({
    module: {
      loaders: [
        {
          test: /\.elm$/,
          exclude: [ /elm-stuff/, /node_modules/ ],
          loader: "elm-hot-loader!elm-webpack-loader"
        }
      ]
    }
  });
}
