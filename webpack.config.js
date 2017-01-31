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
const extractText = require("@webpack-blocks/extract-text2");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const stylesheetExtractor = new ExtractTextPlugin("index.css");

module.exports = createConfig([
  entryPoint("./src/index"),
  setOutput("./app/index.js"),
  defineConstants({ "process.env.NODE_ENV": process.env.NODE_ENV }),
  addPlugins([
    new CopyWebpackPlugin([
      { from: "./src/package.json", to: "package.json" },
      { from: "./src/index.html", to: "index.html" },
      { from: "./src/logo.png", to: "logo.png" },
      { from: "./src/main.js", to: "main.js" }
    ]),
    new HtmlWebpackPlugin({ inject: true, template: "./src/index.html" }),
    new webpack.optimize.UglifyJsPlugin()
  ]),
  loadElm(),
  env("development", [ devServer(), elmStyleDev() ]),
  env("production", [
    elmStyleProd(),
    addPlugins([ stylesheetExtractor, new webpack.optimize.UglifyJsPlugin() ])
  ])
]);

function loadElm() {
  return loader({
    test: /\.elm$/,
    exclude: [ /elm-stuff/, /node_modules/, /Stylesheets\.elm$/ ],
    loader: "elm-hot-loader!elm-webpack-loader"
  });
}

function elmStyleDev() {
  return loader({
    test: /Stylesheets\.elm$/,
    loader: "style-loader!css-loader!elm-css-webpack-loader"
  });
}

function elmStyleProd() {
  return loader({
    test: /Stylesheets\.elm$/,
    loader: stylesheetExtractor.extract({
      fallbackLoader: "style-loader",
      loader: "css-loader!elm-css-webpack-loader"
    }),
    loaders: undefined
  });
}

function loader(object) {
  return context => ({ module: { loaders: [ object ] } });
}
