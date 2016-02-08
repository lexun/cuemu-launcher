/* eslint strict: 0 */
'use strict';

const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const app = electron.app;
const crashReporter = electron.crashReporter;
const ipc = electron.ipcMain;
const shell = electron.shell;

let menu;
let template;
let mainWindow = null;


require('electron-debug')();
crashReporter.start();


app.on('window-all-closed', () => app.quit())
ipc.on('close', () => app.quit())


app.on('ready', () => {
  mainWindow = new BrowserWindow({
    frame: false,
    fullscreen: false,
    height: 350,
    resizable: false,
    transparent: true,
    width: 800,
  });

  if (process.env.HOT) {
    mainWindow.loadURL(`file://${__dirname}/app/dev-app.html`);
  } else {
    mainWindow.loadURL(`file://${__dirname}/app/app.html`);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (process.platform === 'darwin') {
    template = [{
      label: 'Launcher',
      submenu: [{
        label: 'Hide Launcher',
        accelerator: 'Command+H',
        selector: 'hide:'
      }, {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        selector: 'hideOtherApplications:'
      }, {
        label: 'Show All',
        selector: 'unhideAllApplications:'
      }, {
        type: 'separator'
      }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() {
          app.quit();
        }
      }]
    }, {
      label: 'Edit',
      submenu: [{
        label: 'Undo',
        accelerator: 'Command+Z',
        selector: 'undo:'
      }, {
        label: 'Redo',
        accelerator: 'Shift+Command+Z',
        selector: 'redo:'
      }, {
        type: 'separator'
      }, {
        label: 'Cut',
        accelerator: 'Command+X',
        selector: 'cut:'
      }, {
        label: 'Copy',
        accelerator: 'Command+C',
        selector: 'copy:'
      }, {
        label: 'Paste',
        accelerator: 'Command+V',
        selector: 'paste:'
      }, {
        label: 'Select All',
        accelerator: 'Command+A',
        selector: 'selectAll:'
      }]
    }, {
      label: 'View',
      submenu: [{
        label: 'Reload',
        accelerator: 'Command+R',
        click() {
          mainWindow.restart();
        }
      }, {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click() {
          mainWindow.toggleDevTools({detach: true});
        }
      }]
    }, {
      label: 'Window',
      submenu: [{
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:'
      }, {
        label: 'Close',
        accelerator: 'Command+W',
        selector: 'performClose:'
      }, {
        type: 'separator'
      }, {
        label: 'Bring All to Front',
        selector: 'arrangeInFront:'
      }]
    }];

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

  } else {
    template = [{
      label: '&File',
      submenu: [{
        label: '&Open',
        accelerator: 'Ctrl+O'
      }, {
        label: '&Close',
        accelerator: 'Ctrl+W',
        click() {
          mainWindow.close();
        }
      }]
    }, {
      label: '&View',
      submenu: [{
        label: '&Reload',
        accelerator: 'Ctrl+R',
        click() {
          mainWindow.restart();
        }
      }, {
        label: 'Toggle &Developer Tools',
        accelerator: 'Alt+Ctrl+I',
        click() {
          mainWindow.toggleDevTools({detach: true});
        }
      }]
    }];

    menu = Menu.buildFromTemplate(template);
    mainWindow.setMenu(menu);
  }
});
