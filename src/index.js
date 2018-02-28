import is from '@sindresorhus/is'
import { Linter } from 'eslint'

import decorate from './lib/decorate'

function createHallMonitor(eslintOptions = {}) {
  return (ruleName, rule, { valid = [], invalid = [] }) => {
    function normalizeTestCaseData(testCase) {
      return is.string(testCase)
        ? { code: testCase }
        : is.object(testCase)
          ? testCase
          : throwError('Test case must be string or object')
    }

    function throwError(message) {
      throw new Error(message)
    }

    function runTestCase({
      code,
      skip = false,
      only = false,
      description = '',
      options,
    }) {
      const testFn = skip ? it.skip : only ? it.only : it
      const testName = description || code || '[no code]'
      testFn(testName, () => {
        const linter = new Linter()
        linter.defineRule(ruleName, rule)
        const config = Object.assign(
          {
            rules: {
              [ruleName]: options ? ['error', options] : 'error',
            },
          },
          eslintOptions
        )
        const messages = linter.verify(code, config)

        const fatal = messages.find(message => message.fatal)
        if (fatal) {
          // TODO not sure what to do in this case
          expect(new Error(fatal.message)).toMatchSnapshot()
        } else {
          expect(decorate(code, messages)).toMatchSnapshot()
        }
      })
    }
    if (!is.string(ruleName)) {
      throwError("'ruleName' must be a string")
    }
    if (!is.function(rule) || !is.object(rule)) {
      throwError("'rule' must be a function or object")
    }
    if (valid.length === 0) {
      throwError("Missing 'valid' test cases")
    }
    if (invalid.length === 0) {
      throwError("Missing 'invalid' test cases")
    }

    describe(ruleName, () => {
      describe('valid', () => {
        valid.map(normalizeTestCaseData).forEach(runTestCase)
      })
      describe('invalid', () => {
        invalid.map(normalizeTestCaseData).forEach(runTestCase)
      })
    })
  }
}

export { createHallMonitor }
export default createHallMonitor({ parserOptions: { ecmaVersion: 6 } })
