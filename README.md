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

  - Uses React

  - Has built-in components

  - Easy to extend

  - Possible to minimize. The state is remembered between browser refreshes.
---

## :newspaper: API

The library exports a `renderPanel` function as a default export.

It takes a React component and an HTML element to inject the panel into.

```jsx
import renderPanel, { NumericValue } from 'nano-panel'

renderPanel((
  <>
    <NumericValue 
      label={'A number'}
      getValue={() => 3}
    />
  </>
), document.getElementById('debug-panel'))
```

## Components

### NumericValue

Renders a `number` with a label.

<!-- TODO: Show gif -->

Props:

**`label`**

type: `string`

**`getValue`**

type: `() => number`

This function is called once every second. Needs to return the data to display in the panel.

**`warnAt`** *(optional)*

type: `object`

Fields:

**`value`**

type: `number`

If the value returned from `getValue` is above this value, the text will be red.

**`when`**

type: `"above"` (default) or `"below"`

If `below`, will warn when value goes under that number.

---

### StringValue

Renders a `string` with a label.

<!-- TODO: Show gif -->

Props:

**`label`**

type: `string`

**`getValue`**

type: `() => string`

This function is called once every second. Needs to return the data to display in the panel.

---

### Button

Props:

**`label`**

type: `string`

**`onClick`**

type: `() => void`

---

### Divider

A horizontal line to divide sections in the panel.

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
