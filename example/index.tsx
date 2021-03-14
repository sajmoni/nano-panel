import React, { useState } from 'react'
import ReactJson from 'react-json-view'
import renderPanel, {
  Panel,
  NumericValue,
  StringValue,
  Divider,
  Button,
  Checkbox,
  Dropdown,
  Input,
  Snackbar,
} from 'nano-panel'

const DECIMALS = 6

let randomNumber1 = Number.parseFloat((Math.random() * 10).toFixed(DECIMALS))
let randomNumber2 = Number.parseFloat(Math.random().toFixed(DECIMALS))

// Emulating state changing in a game
setInterval(() => {
  randomNumber1 = Number.parseFloat((Math.random() * 10).toFixed(DECIMALS))
}, 500)

setInterval(() => {
  randomNumber2 = Number.parseFloat(Math.random().toFixed(DECIMALS))
}, 500)

const state = {
  application: { volume: 23, scene: 'menu', number: randomNumber1 },
  name: 'a very long name',
}

const dropDownItems = [
  { label: 'Item 1', value: 'item1' },
  { label: 'This is a long item', value: 'item2' },
]

const DebugPanel = () => {
  const [notification, setNotification] = useState(undefined)
  const [checkboxValue, setCheckBoxValue] = useState(false)
  const [selectedValue, setSelectedValue] = useState(dropDownItems[1].value)
  const [inputValue, setInputValue] = useState(100)

  return (
    <Panel width={400}>
      <Snackbar
        value={notification}
        onClose={() => {
          setNotification(undefined)
        }}
      />
      <NumericValue
        label={'A number'}
        description={'This will show up as a tooltip when you hover it'}
        warnAt={{ value: 5 }}
        getValue={() => {
          return randomNumber1
        }}
      />
      <NumericValue
        label={'Fast update'}
        updateInterval={250}
        warnAt={{ value: 0.5, when: 'below' }}
        getValue={() => {
          return randomNumber2
        }}
      />
      <StringValue
        label={'A label which is too long to fit'}
        getValue={() => {
          return 'A long value'
        }}
      />
      <Divider />
      <Button
        label={'Show notification'}
        onClick={() => {
          setNotification(
            'Error! This is an example of how rendering an error in a snackbar might look like',
          )
        }}
      />
      <Button
        label={'A button with a very long label'}
        onClick={() => {
          console.log('Hello again!')
        }}
      />
      <Checkbox
        checked={checkboxValue}
        label={'A checkbox'}
        onClick={(checked) => {
          console.log('checked', checked)
          setCheckBoxValue(checked)
        }}
      />
      <Dropdown
        value={selectedValue}
        dropdownLabel={'Pick an item'}
        onChange={(value) => {
          console.log('dropdown value changed', value)
          setSelectedValue(value as string)
        }}
        items={dropDownItems}
      />
      <Input
        label={'Enter a value'}
        type={'text'}
        value={inputValue}
        onChange={(value) => {
          setInputValue(value as number)
          console.log('input value change:', value)
        }}
      />
      <Divider />
      <ReactJson
        src={state}
        theme="monokai"
        displayDataTypes={false}
        displayObjectSize={false}
        shouldCollapse={() => true}
        enableClipboard={false}
        name={'state'}
        indentWidth={2}
        collapseStringsAfterLength={10}
      />
    </Panel>
  )
}

renderPanel(<DebugPanel />, document.querySelector('#debug-panel'))
