import createPanel from 'nano-panel'

let randomNumber1 = ''
let randomNumber2 = ''

setInterval(() => {
  randomNumber1 = (Math.random() * 10).toFixed(3)
}, 500)

setInterval(() => {
  randomNumber2 = Math.random().toFixed(3)
}, 500)

const debugItems = [
  {
    type: 'label',
    label: 'Number 1',
    getData: () => {
      return randomNumber1
    },
    threshold: 5,
  },
  { type: 'label', label: 'Number 2', getData: () => randomNumber2 },
  {
    type: 'label',
    label: 'A label which is too long to fit',
    getData: () => 'Hi!',
  },
  {
    type: 'divider',
  },
  {
    type: 'button',
    label: 'Console log',
    onClick: () => {
      console.log('Hello!')
    },
  },
  {
    type: 'button',
    label: 'Another log',
    onClick: () => {
      console.log('Hello again!')
    },
  },
]

const options = {
  width: 120,
  element: document.body,
}

const renderPanel = createPanel(debugItems, options)

setInterval(() => {
  renderPanel()
}, 1000)
