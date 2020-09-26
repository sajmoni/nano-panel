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

`nano-panel` is used to render information when debugging a website. It will be injected into the DOM and rendered on top of your other content.

- Possible to minimize. The state is remembered between browser refreshes.

- Supports buttons.

- Zero dependencies.

---

## :newspaper: API

The library exports a `createPanel` function as a default export.

It takes a list of `items` and returns a `render` function:

```js
import createPanel from 'nano-panel'

const items = [
  {
    type: 'label',
    label: 'A random number',
    getData: () => Math.random().toFixed(3),
  },
]

const options = {}

const renderPanel = createPanel(items, options)

// Update the panel every second
setInterval(renderPanel, 1000)
```

### Items

All items have a `type` property, that can be one of:

- `label`
- `button`
- `divider`

Items also have properties specific to their type.

#### label

Renders any data.

Properties:

`label`

type: `string`

A label.

`getData`

type: `() => any`

This function is called whenever the panel is re-rendered. Needs to return the data to display in the panel.

`threshold`

type: `number`

If the value returned from `getData` is above this value, the text will be red

#### button

Properties:

`label`

type: `string`

A label.

`onClick`

type: `() => void`

Called when the button is clicked

#### divider

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
