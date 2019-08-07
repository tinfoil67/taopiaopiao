/* @flow */

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import citySwitchReducer from './reducers/citySwitch'
import './index.css'

const store = createStore(citySwitchReducer)
const container = document.getElementById('root')

container && ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  container
)
