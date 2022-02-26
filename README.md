<h1 align="center">
  nano-panel
</h1>
<h4 align="center">
  Configurable debug overlay for websites
</h4>

<div align="center">
  <img src="https://badgen.net/npm/v/nano-panel?icon=npm" />
  <img src="https://badgen.net/bundlephobia/minzip/nano-panel" />
</div>

## :sparkles: Features

`nano-panel` is used to render information when debugging a website. Inject it into the DOM and it renders on top of your other content.

- Polls for data every second

- Uses React

- Has built-in components

- Easy to extend

- Possible to minimize

---

## :newspaper: API

You need to install `react` and `react-dom` if you don't already use these in your app.

Render the `Panel` component with `react-dom`.

```jsx
import ReactDOM from 'react-dom'
import { Panel, NumericValue } from 'nano-panel'

ReactDOM.render(
  <Panel>
    <NumericValue label={'A number'} getValue={() => 42} />
  </Panel>,
  document.getElementById('debug-panel'),
)
```

## :jigsaw: Components

### NumericValue

> Renders a number with a label

<!-- TODO: Show gif -->

Props:

**`label`**

type: `string`

**`getValue`**

type: `() => number`

This function is called once every second. Needs to return the data to display in the panel.

**`warnAt`** _(optional)_

type: `object`

Fields:

**`value`**

type: `number`

If the value returned from `getValue` is above this value, the text will be red.

**`when`**

type: `"above"` (default) or `"below"`

If `below`, will warn when value goes under that number.

```tsx
// Example
```

---

### StringValue

> Renders a string with a label

<!-- TODO: Show gif -->

Props:

**`label`**

type: `string`

**`getValue`**

type: `() => string`

This function is called once every second. Needs to return the data to display in the panel.

```tsx
// Example
```

---

### Button

Props:

**`label`**

type: `string`

**`onClick`**

type: `() => void`

```tsx
<Button
  label={'Click me'}
  onClick={() => {
    console.log('Clicked')
  }}
/>
```

---

### Divider

> A horizontal line to divide sections in the panel

```tsx
<Divider />
```

---

### Checkbox

### Snackbar

### Dropdown

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

## Requirements

- React 18
