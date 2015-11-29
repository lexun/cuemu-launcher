import 'bootswatch/slate/bootstrap.css';

import './static/index.html';
import './static/logo.png';
import './static/package.json';
import './static/style.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import App from './components/app';
import reducers from './reducers/app';

const rootElement = document.getElementById('app-root')
let store

if (__DEVTOOLS__) {
  const Monitor = require('./components/monitor')
  store = compose(applyMiddleware(thunk), Monitor.instrument())
                 (createStore)(reducers)
} else {
  store = applyMiddleware(thunk)(createStore)(reducers)
}


if (module.hot) {
  module.hot.accept('./reducers/app', () =>
    store.replaceReducer(require('./reducers/app'))
  )
}

const rootComponent = (
  <div>
    <Provider store={store}>
      <App />
    </Provider>
  </div>
)

ReactDOM.render(rootComponent, rootElement)
