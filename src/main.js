import App from 'app';
import BrowserWindow from 'browser-window';
import crashReporter from 'crash-reporter';
import ipc from 'ipc';
import path from 'path';

let mainWindow = null

crashReporter.start()

App.on('window-all-closed', () => App.quit())
ipc.on('close', () => App.quit())

App.on('ready', () => {
  mainWindow = new BrowserWindow({
    frame: false,
    fullscreen: false,
    height: 600,
    resizable: false,
    transparent: true,
    width: 1200,
  })

  let index = 'file://' + path.resolve(__dirname, '../index.html')
  if (__HOT__) { index = 'http://localhost:2992/' }

  mainWindow.loadUrl(index)
  mainWindow.on('closed', () => { mainWindow = null })
})
