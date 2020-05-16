<h1 align="center">
  nano-overlay
</h1>
<h4 align="center">
    A javascript library
</h4>

<div align="center">
  <img src="https://badgen.net/npm/v/nano-overlay?icon=npm" />
  <img src="https://badgen.net/bundlephobia/minzip/nano-overlay" />
</div>

## :sparkles: Features

An overlay for your website that displays any data you want.

 - Possible to minimize.

 - Supports buttons.

---

## :wrench: Example usage

TODO

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

## :newspaper: API

The library only has one (default) export.

It takes a list of `items` and returns a `render` function_

```js
import createOverlay from 'nano-overlay'

const items = [
  {
    type: 'label',
    label: 'Hello',
    getData: () => 'world',
  }
]

const renderOverlay = createOverlay(items)

// Update the overlay every second
setInterval(renderOverlay, 1000)
```

### Items

#### `label`

`type`

Either `label`, `button` or `divider`

`label`

A label.

`getData`

This function is called whenever the overlay is re rendered. Needs to return the data to display in the overlay.

`threshold`

TODO: Threshold should be able to be negative?

If the value returned from `getData` is above this value, the text will be red

#### `button`

`type`

Either `label`, `button` or `divider`

`label`

A label.

`onClick`

Called when the button is clicked

`() => void`

#### `divider`

`type`

Either `label`, `button` or `divider`

---

[createOverlay](docs/createOverlay.md) - Create the overlay

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