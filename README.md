<h1 align="center">
  nano-panel
</h1>
<h4 align="center">
  Minimal configurable debug panel for websites
</h4>

<div align="center">
  <img src="https://badgen.net/npm/v/nano-panel?icon=npm" />
  <img src="https://badgen.net/bundlephobia/minzip/nano-panel" />
</div>

## :sparkles: Features

`nano-panel` is used to render information when debugging a website. It injects itself into the DOM and renders on top of your other content.

  - React based

  - Comes with built-in components

  - Easy to extend

  - Possible to minimize. The state is remembered between browser refreshes.

---

## :newspaper: API

The library exports a `renderPanel` function as a default export.

It takes a React component and an HTML element to inject the panel into.

```jsx
import renderPanel, { NumericValue } from 'nano-panel'

const options = {}

const renderPanel = renderPanel((
  <>
    <NumericValue 
      label={'A random number'}
      getValue={() => Number.parseFloat(Math.random().toFixed(3))}
    />
  </>
), document.getElementById('debug-panel'))
```

### Components

#### NumericValue

Renders a `number` with a label.

<!-- TODO: Show gif -->

Props:

`label`

type: `string`

A label that describes the value.

`getValue`

type: `() => number`

This function is called once every second. Needs to return the data to display in the panel.

`warnAt`

type: `object`

If the value returned from `getValue` is above this value, the text will be red

#### Button

Props:

`label`

type: `string`

A label.

`onClick`

type: `() => void`

Called when the button is clicked

#### Divider

A horizontal line to divide sections in the panel.

---

### Options

#### element

type: `HTMLElement`

default: `document.body`

Where in the DOM to inject the panel.

#### width

type: `number`

default: `130`

The width of the panel.

---

## :package: Install

**npm**

```
npm install nano-panel
```

**yarn**

```
yarn add nano-panel
```

---

## :computer: Develop

### Commands

| Command        | Description                                    |
| -------------- | ---------------------------------------------- |
| `yarn build`   | Generate files in the `dist` folder            |
| `yarn release` | Start the process to release a new version     |
| `yarn qa`      | Run a type check with `typescript`             |
| `yarn clean`   | Remove build artefact (`.tgz` file)            |
| `yarn go`      | Builds, packs and installs to `example` folder |

### Workflow

1. Make changes
2. Update tests
3. `yarn go` and verify that your changes work.
4. Commit to `master` or make `PR`

#### Release

`yarn release`
