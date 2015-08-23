require! 'app': App
require! 'browser-window': BrowserWindow
require! 'path'
require! 'main.html': template

require('crash-reporter').start!

main-window = null
template-path = path.resolve __dirname, '../', template

App.on 'window-all-closed', -> App.quit!

App.on 'ready', ->
  main-window := new BrowserWindow width: 1600, height: 800
  main-window.load-url 'file://' + template-path
  main-window.on 'closed' -> main-window := null
