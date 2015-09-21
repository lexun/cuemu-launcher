import 'bootswatch/slate/bootstrap.css'

import './static/index.html'
import './static/logo.png'
import './static/package.json'
import './static/style.css'

import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './components/layout'

ReactDOM.render(
  React.createElement(Layout),
  document.getElementById('app-root')
)
