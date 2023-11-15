import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createStore, combineReducers } from "redux"
import { Provider } from "react-redux"

import anecdoteReducer from "./reducers/anecdoteReducer"
import filterReducer from "./reducers/filterReducer.js"

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer
})

const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
