require! 'app': App
require! 'browser-window': BrowserWindow
require! 'path'

require('crash-reporter').start!

main-window = null

App.on 'window-all-closed' -> App.quit!

App.on 'ready', ->
  main-window := new BrowserWindow width: 1200, height: 600, frame: false
  main-window.load-url 'file://' + path.resolve __dirname, '../index.html'
  main-window.on 'closed' -> main-window := null
