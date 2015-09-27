import 'bootswatch/slate/bootstrap.css'

import './static/index.html'
import './static/logo.png'
import './static/package.json'
import './static/style.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './components/app'
import reducers from './reducers/app'

const rootElement = document.getElementById('app-root')

let store = createStore(reducers)
let tools = null

if (__DEVTOOLS__) {
  const { devTools } = require('redux-devtools')
  const { DevTools, DebugPanel, LogMonitor } =
    require('redux-devtools/lib/react')

  store = devTools()(createStore)(reducers)
  tools = (
    <div className='dev-tools'>
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    </div>
  )

  if (module.hot) {
    module.hot.accept('./reducers/app', () =>
      store.replaceReducer(require('./reducers/app'))
    )
  }
}

const rootComponent = (
  <div>
    <Provider store={store}>
      <App />
    </Provider>

    { tools }
  </div>
)

ReactDOM.render(rootComponent, rootElement)
