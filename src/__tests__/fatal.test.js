import { createHallMonitor } from '..'

const hallMonitor = createHallMonitor({ parserOptions: { ecmaVersion: 3 } })

hallMonitor('fatal', () => ({}), {
  valid: ['var a'],
  invalid: ['const fn = () => {}'],
})
