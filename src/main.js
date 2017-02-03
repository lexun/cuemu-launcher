require("./Stylesheets.elm");

const Elm = require("./Main.elm");
const mountNode = document.getElementById("main");

Elm.Main.embed(mountNode);
