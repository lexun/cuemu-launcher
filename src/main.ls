require! 'app': App
require! 'browser-window': BrowserWindow
require! ipc
require! path
require('crash-reporter').start!


main-window = null

App.on 'window-all-closed' -> App.quit!
ipc.on 'close' -> App.quit!

App.on 'ready', ->
  main-window := new BrowserWindow {
    frame: false,
    fullscreen: false,
    height: 600,
    resizable: false,
    transparent: true,
    width: 1200
  }
  main-window.load-url 'file://' + path.resolve __dirname, '../index.html'
  main-window.on 'closed' -> main-window := null
