import hallMonitor from '..'

const rule = context => ({
  ArrowFunctionExpression(node) {
    context.report({
      node,
      message: 'No arrow functions',
    })
  },
})

hallMonitor('multiline', rule, {
  valid: ['function foo() {}'],
  invalid: [
    [
      'const myFunction = () => {',
      '  const a = 1',
      '  const b = 2',
      '  const c = 3',
      '  return a + b + c',
      '}',
    ].join('\n'),
  ],
})
