import React from 'react'
import ReactDOM from 'react-dom'
import renderPanel, { Label, Divider, Button } from 'nano-panel'

let randomNumber1 = (Math.random() * 10).toFixed(3)
let randomNumber2 = Math.random().toFixed(3)

// Emulating state changing in a game
setInterval(() => {
  randomNumber1 = (Math.random() * 10).toFixed(3)
}, 500)

setInterval(() => {
  randomNumber2 = Math.random().toFixed(3)
}, 500)

const Panel = () => {
  // const [state, dispatch] = useReducer(() => {}, {})

  return (
    <>
      <Label
        label={'Number 1'}
        warnAt={{ value: 5 }}
        getData={() => {
          return randomNumber1
        }}
      />
      <Label
        label={'Number 2'}
        warnAt={{ value: 0.5, when: 'below' }}
        getData={() => {
          return randomNumber2
        }}
      />
      <Label
        label={'A label which is too long to fit'}
        getData={() => {
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
    </>
  )
}

renderPanel(<Panel />, document.querySelector('#debug-panel'))
