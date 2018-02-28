import hallMonitor from '..'

const rule = context => {
  const options = context.options[0] || []
  return {
    CallExpression(node) {
      if (options.includes(node.callee.name)) {
        context.report({
          node,
          message: "No call expressions named '{{ name }}'",
          data: { name: node.callee.name },
        })
      }
    },
  }
}

hallMonitor('options', rule, {
  valid: [''],
  invalid: [{ code: 'badFunctionName()', options: ['badFunctionName'] }],
})
