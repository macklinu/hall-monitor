import hallMonitor from '..'

const rule = context => ({
  Identifier(node) {
    if (node.name === 'foo') {
      context.report({
        node,
        message: 'No variables named foo',
      })
    }
  },
})

hallMonitor('simple', rule, {
  valid: ['', 'let a'],
  invalid: ['let foo = 1'],
})
