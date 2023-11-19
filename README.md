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

- Uses React

- Has simple built-in components

- Easy to extend

- Can be minimized

---

## :newspaper: API

You need to install `react` and `react-dom` if you don't already use these in your app.

First add a `div` to your `index.html`:

```html
<div id="debug-panel"></div>
```

Then render the `Panel` component with `react-dom`:

```tsx
import { createRoot } from 'react-dom/client'
import { Panel, NumericValue } from 'nano-panel'

const root = createRoot(document.getElementById('debug-panel'))

root.render(
  <Panel>
    <NumericValue
      label={'A number'}
      getValue={() => 42}
    />
  </Panel>,
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
<NumericValue
  label={'A number'}
  getValue={() => 1}
  warnAt={{ value: 2, when: 'above' }}
/>
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
<StringValue
  label={'A string'}
  getValue={() => 'abc'}
/>
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

If you want Buttons to appear on the same row, wrap them in a row component:

```tsx
<Row>
  <Button
    label={'Click me'}
    onClick={() => {}}
  />
  <Button
    label={'Click me'}
    onClick={() => {}}
  />
</Row>
```

---

### Divider

> A horizontal line to divide sections in the panel

```tsx
<Divider />
```

---

### Checkbox

```tsx
<Checkbox
  label={'Is checked'}
  onClick={(checked) => {
    setIsChecked(checked)
  }}
  checked={isChecked}
/>
```

### Snackbar

```tsx
<Snackbar
  isOpen={showSnackbar}
  onClose={() => {
    setShowSnackbar(false)
  }}
  value={'This is a Snackbar'}
/>
```

### Dropdown

```tsx
<Dropdown
  label='Pick a value'
  description='This text describes the Dropdown'
  items={[
    { label: 'Label 1', value: '1' },
    { label: 'Label 2', value: '2' },
  ]}
  value={dropDownValue}
  onChange={(value) => {
    setDropdownValue(value)
  }}
/>
```

---

## :package: Install

```console
npm install nano-panel
```

## Requirements

- React 18

## Guide

Since `nano-panel` is intended for debugging only, you don't want to initialize the code to run `nano-panel` in production.

Put the code in a module and conditionally initialize it if the app runs in development mode:

```tsx
if (import.meta.env.MODE === 'development') {
  initDebugPanel()
}
```
