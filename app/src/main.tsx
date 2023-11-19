import React, { useState, StrictMode } from 'react'
import {
  Panel,
  NumericValue,
  StringValue,
  Divider,
  Button,
  Checkbox,
  Dropdown,
  Input,
  Snackbar,
  Row,
} from '../../dist'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App'

const mockExternalState = {
  timesClicked: 1,
}

const DebugPanel = () => {
  const [isChecked, setIsChecked] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [dropDownValue, setDropdownValue] = useState('1')
  const [inputValue, setInputValue] = useState('Input text')
  return (
    <Panel>
      <StringValue
        label={'Hello'}
        getValue={() => 'world'}
      />
      <Divider />
      <Row>
        <Button
          label='Click me'
          onClick={() => {
            mockExternalState.timesClicked += 1
          }}
        />
        <Button
          label='Another button'
          onClick={() => {
            // No-op
          }}
        />
        <Button
          label='Another button'
          onClick={() => {
            // No-op
          }}
        />
        <Button
          label='Another button'
          onClick={() => {
            // No-op
          }}
        />
        <Button
          label='Another button'
          onClick={() => {
            // No-op
          }}
        />
      </Row>
      <NumericValue
        label={'Times clicked'}
        getValue={() => mockExternalState.timesClicked}
      />
      <Divider />
      <Dropdown
        label='Pick a value'
        description='This text describes the Dropdown'
        items={[
          { label: 'Label 1', value: '1' },
          { label: 'Label 2', value: '2' },
        ]}
        value={dropDownValue}
        onChange={(value) => {
          setDropdownValue(value)
        }}
      />
      <Checkbox
        label={'Is checked'}
        onClick={(checked) => {
          setIsChecked(checked)
        }}
        checked={isChecked}
      />
      <Input
        label={'An input'}
        onChange={(value) => {
          setInputValue(value)
        }}
        value={inputValue}
      />
      <Divider />
      <Button
        label='Show snackbar'
        onClick={() => {
          setShowSnackbar(true)
        }}
      />
      <Snackbar
        isOpen={showSnackbar}
        onClose={() => {
          setShowSnackbar(false)
        }}
        value={'This is a Snackbar'}
      />
    </Panel>
  )
}

const appRoot = createRoot(document.getElementById('root') as HTMLElement)
appRoot.render(
  <StrictMode>
    <DebugPanel />
    <App />
  </StrictMode>,
)
