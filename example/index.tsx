import React, { useState } from 'react'
import renderPanel, {
  NumericValue,
  StringValue,
  Divider,
  Button,
  Checkbox,
  Dropdown,
} from 'nano-panel'

let randomNumber1 = Number.parseFloat((Math.random() * 10).toFixed(3))
let randomNumber2 = Number.parseFloat(Math.random().toFixed(3))

// Emulating state changing in a game
setInterval(() => {
  randomNumber1 = Number.parseFloat((Math.random() * 10).toFixed(3))
}, 500)

setInterval(() => {
  randomNumber2 = Number.parseFloat(Math.random().toFixed(3))
}, 500)

const Panel = () => {
  return (
    <>
      <NumericValue
        label={'A number'}
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
          return 'Hi!'
        }}
      />
      <Divider />
      <Button
        label={'Console log'}
        onClick={() => {
          console.log('Hello!')
        }}
      />
      <Button
        label={'Another log'}
        onClick={() => {
          console.log('Hello again!')
        }}
      />
      <Checkbox
        label={'Something'}
        onClick={(checked) => {
          console.log('checked', checked)
        }}
      />
      <Dropdown
        initialValue={'test2'}
        dropdownLabel={'Pick an item'}
        onChange={(value) => {
          console.log('dropdown value changed', value)
        }}
        items={[
          { label: 'test', value: 'test' },
          { label: 'test2', value: 'test2' },
        ]}
      />
    </>
  )
}

renderPanel(<Panel />, document.querySelector('#debug-panel'))
