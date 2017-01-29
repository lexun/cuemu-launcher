require("./main.js");
require("../package.json");

const Elm = require("./Main.elm");
const mountNode = document.getElementById("main");

Elm.Main.embed(mountNode);
