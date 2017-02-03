const { app, BrowserWindow } = require("electron");
const updater = require("electron-updater").autoUpdater;
const logger = require("electron-log");
const path = require("path");
const url = require("url");

checkForUpdates();

let window;

function createWindow() {
  window = new BrowserWindow({ width: 800, height: 400 });

  window.loadURL(envSpecificUrl());

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

function checkForUpdates() {
  if (isDev()) return;

  updater.logger = logger;
  updater.logger.transports.file.level = "info";

  updater.checkForUpdates();
}

function envSpecificUrl() {
  const devServer = {
    pathname: "localhost:8080",
    protocol: "http:",
    slashes: true
  };

  const buildOutput = {
    pathname: path.join(__dirname, "index.html"),
    protocol: "file:",
    slashes: true
  };

  return url.format(isDev() ? devServer : buildOutput);
}

function isDev() {
  return process.env.NODE_ENV === "development";
}
