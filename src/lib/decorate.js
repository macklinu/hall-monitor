const UNDERLINE_CHAR = '^'
const SPACE_CHAR = ' '

export default function decorate(code, messages) {
  if (messages.length === 0) {
    return code
  }
  return messages
    .reduce(
      (codeArray, { message, line, column, endLine, endColumn, source }) => {
        if (line === endLine) {
          const copy = codeArray.slice()
          copy.splice(
            line,
            0,
            createErrorLine({ start: column, end: endColumn, message })
          )
          return copy
        } else {
          const copy = codeArray.slice()
          let linesAdded = 0
          Array.from({ length: endLine - line + 1 }, (v, i) => {
            // first line
            if (i === 0) {
              return createErrorLine({
                start: column,
                end: source.length + 1,
                message,
              })
            }
            // last line
            if (i === endLine - line) {
              return createErrorLine({
                start: 0,
                end: endColumn,
                message,
                messagePadding: source.length + 1 - endColumn + 1,
              })
            }
            // fill the remaining lines
            return createErrorLine({
              start: 0,
              end: source.length + 1,
              message,
            })
          }).forEach((errorLine, index) => {
            copy.splice(line + index + linesAdded++, 0, errorLine)
          })
          return copy
        }
      },
      code.split('\n')
    )
    .join('\n')
}

function createErrorLine({ start, end, message, messagePadding = 1 }) {
  return ''
    .padStart(start)
    .concat(UNDERLINE_CHAR.repeat(end - start))
    .concat(SPACE_CHAR.repeat(messagePadding))
    .concat(`[${message}]`)
}
