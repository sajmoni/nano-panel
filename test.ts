import test from 'ava'

import { sayHello } from 'nano-panel2'

test('sayHello', (t) => {
  t.is(sayHello(), 'Hello world!')
})
