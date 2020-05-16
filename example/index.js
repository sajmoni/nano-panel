import createOverlay from 'nano-overlay'

let randomNumber1 = 0
let randomNumber2 = 0

setInterval(() => {
  randomNumber1 = (Math.random() * 10).toFixed(3)
}, 500)

setInterval(() => {
  randomNumber2 = Math.random().toFixed(3)
}, 500)

// const spector = new SPECTOR.Spector()
const debugItems = [
  { label: 'Number 1', getData: () => randomNumber1, threshold: 5 },
  { label: 'Number 2', getData: () => randomNumber2 },
  { label: 'A label which is too long to fit', getData: () => 'Hi!' },
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

const renderDebugOverlay = createOverlay(debugItems)

setInterval(() => {
  renderDebugOverlay()
}, 1000)
