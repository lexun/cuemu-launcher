const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let window;

function createWindow() {
  window = new BrowserWindow({ width: 800, height: 400 });

  window.loadURL(
    process.env.NODE_ENV === "development" ? url.format({
          pathname: "localhost:8080",
          protocol: "http:",
          slashes: true
        }) : url.format({
          pathname: path.join(__dirname, "index.html"),
          protocol: "file:",
          slashes: true
        })
  );

  window.on("closed", () => {
    window = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (window === null) {
    createWindow();
  }
});
