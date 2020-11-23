module.exports = {
  '**/*.{js,ts,tsx}?(x)': () => 'tsc',
  'src/**/*.{js,ts,tsx,md}': ['xo --fix'],
}
