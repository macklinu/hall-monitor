import hallMonitor from '..'

const rule = context => ({
  VariableDeclaration(node) {
    if (node.kind === 'var') {
      context.report({
        node,
        message: 'No vars allowed',
      })
    }
  },
})

hallMonitor('same-line-multiple-errors', rule, {
  valid: ['const a = 1'],
  invalid: ['var a; var b; var c;', 'var a; var b; var c;\nvar d;'],
})
