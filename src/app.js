import 'bootswatch/slate/bootstrap.css'

import './static/index.html'
import './static/logo.png'
import './static/package.json'
import './static/style.css'

import React from 'react'
import Layout from './components/layout'

React.render(
  React.createElement(Layout),
  document.getElementById('app-root')
)
