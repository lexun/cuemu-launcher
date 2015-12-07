# CUEmu Launcher

![](erb-logo.png)

Powered by
[Electron](http://electron.atom.io/),
[React](https://facebook.github.io/react/),
[Redux](https://github.com/rackt/redux), and
[Webpack](http://webpack.github.io/docs/).
Using
[Electron React Boilerplate](
https://github.com/chentsulin/electron-react-boilerplate).

## Install

Install dependencies.

```bash
npm install
```

## Run

Run this two commands __simultaneously__ in different console tabs.

```bash
npm run hot-server
npm run start-hot
```

> Note: require node >= 4 and npm >= 2.

#### Toggle Chrome DevTools

- OS X: <kbd>Cmd</kbd> <kbd>Alt</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Linux: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Windows: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- see [electron-debug](https://github.com/sindresorhus/electron-debug)
  for more detail information.

#### Toggle Redux DevTools

- Open / Close: <kbd>Ctrl+H</kbd>
- Change Position: <kbd>Ctrl+Q</kbd>

> see [redux-devtools-dock-monitor](
  https://github.com/gaearon/redux-devtools-dock-monitor)
  for more detail information.

## Package

```bash
npm run package
```

> see `package.json` for command details

#### Options

- --name, -n: Application name (default: Launcher)
- --version, -v: Electron version (default: latest version)
- --asar, -a: [asar](https://github.com/atom/asar) support (default:
  false)
- --icon, -i: Application icon
- --all: pack for all platforms

After packaging, you will find the builds in `release` folder.

`client`, `test`, `tools`, `release` folder and devDependencies in
`package.json` will be ignored.

#### Building windows apps from non-windows platforms

Please checkout [Building windows apps from non-windows
platforms](https://github.com/maxogden/electron-packager#
building-windows-apps-from-non-windows-platforms).

---

### License

MIT © [Luke Barbuto](https://github.com/lexun)
