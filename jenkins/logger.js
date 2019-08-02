const color = {
  off: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
}

module.exports = {
  color,
  raw,
  getRedactedSensibleValue,
  error,
  errorAndExit,
  success,
  debug,
  info,
  warn
}

/**
 * @param {string} sensibleValue
 * @returns {string}
 */
function getRedactedSensibleValue (sensibleValue, trailingLengthToBeDisplayed) {
  const redactedValue = []

  if (sensibleValue.length <= trailingLengthToBeDisplayed) {
    while (redactedValue.length < sensibleValue.length) {
      redactedValue.push('*')
    }
  } else {
    while (redactedValue.length < sensibleValue.length - trailingLengthToBeDisplayed) {
      redactedValue.push('*')
    }

    redactedValue.push(...sensibleValue.slice(redactedValue.length))
  }

  return redactedValue.join('')
}

/**
 * @param {string} message
 */
function raw (message) {
  console.error(message)
}

/**
 * @param {string} message
 */
function error (message) {
  raw(`${color.red}[ERR]${color.off} ${message}`)
}

/**
 * @param {string} message
 * @note This will end the program with return code -1
 */
function errorAndExit (message) {
  error(message)
  process.exit(-1)
}

/**
 * @param {string} message
 */
function success (message) {
  raw(`${color.green}[SUC]${color.off} ${message}`)
}

/**
 * @param {string} message
 */
function debug (message) {
  raw(`${color.cyan}[DBG]${color.off} ${message}`)
}

/**
 * @param {string} message
 */
function info (message) {
  raw(`${color.blue}[INF]${color.off} ${message}`)
}

/**
 * @param {string} message
 */
function warn (message) {
  raw(`${color.yellow}[WRN]${color.off} ${message}`)
}
