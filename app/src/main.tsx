import React from 'react'
import {
  Panel,
  NumericValue,
  // StringValue,
  // Divider,
  // Button,
  // Checkbox,
  // Dropdown,
  // Input,
  // Snackbar,
} from 'nano-panel'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

ReactDOM.render(
  <Panel>
    <NumericValue label={'A number:'} getValue={() => 42} />
  </Panel>,
  document.getElementById('debug-panel'),
)
