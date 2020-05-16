/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable ava/no-ignored-test-files */

const test = require('ava')
const { sayHello } = require('nano-overlay')

test('sayHello', (t) => {
  t.is(sayHello(), 'Hello world!')
})
