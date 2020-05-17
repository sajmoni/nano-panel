<h1 align="center">
  nano-overlay
</h1>
<h4 align="center">
  Minimal configurable overlay for any website
</h4>

<div align="center">
  <img src="https://badgen.net/npm/v/nano-overlay?icon=npm" />
  <img src="https://badgen.net/bundlephobia/minzip/nano-overlay" />
</div>

## :sparkles: Features

 - Possible to minimize. Is remembered between browser refreshes.

 - Supports buttons.

---

## :newspaper: API

The library only has one (default) export.

It takes a list of `items` and returns a `render` function:

```js
import createOverlay from 'nano-overlay'

const items = [
  {
    type: 'label',
    label: 'A random number',
    getData: () => Math.random().toFixed(3),
  }
]

const options = {}

const renderOverlay = createOverlay(items, options)

// Update the overlay every second
setInterval(renderOverlay, 1000)
```

### Items

All items have a `type` property, that can be one of: 

 - `label`
 - `button`
 - `divider`

Items also have properties specific to their type.

#### `label`

`label`

type: `string`

A label.

`getData`

type: `() => any`

This function is called whenever the overlay is re rendered. Needs to return the data to display in the overlay.

`threshold`

type: `number`

If the value returned from `getData` is above this value, the text will be red

#### `button`

`label`

type: `string`

A label.

`onClick`

type: `() => void`

Called when the button is clicked

#### `divider`

Divider is a horizontal line to divide sections in the overlay.

#### Options

#### `element`

type: `HTMLElement`

default: `document.body`

Where in the DOM to inject the overlay.

#### `width`

type: `number`

default: `130`

The width of the overlay.

---

## :package: Install

**npm**

```
npm install nano-overlay
```

**yarn**

```
yarn add nano-overlay
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
RR