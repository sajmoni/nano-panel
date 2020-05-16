module.exports = (plop) => {
  plop.setGenerator('Docs', {
    description: 'Add documentation for a function',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'function name',
      },
    ],
    actions: () => {
      return [
        {
          type: 'add',
          path: 'docs/{{name}}.md',
          templateFile: 'plop/docs.hbs',
        },
      ]
    },
  })
}

// TODO: Append to index and index.test and add new docs?

// plop to generate new function, file and test
