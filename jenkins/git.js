const shell = require('./shell')

module.exports = {
  getCurrentCommitHash
}

/**
 * @returns {string}
 */
function getCurrentCommitHash () {
  const {
    stdout,
    stderr,
    status
  } = shell.spawnSync('git', ['rev-parse', '--verify', 'HEAD'], { encoding: 'utf-8' })

  if (status !== 0) {
    throw new Error(stderr)
  }

  const trimmedStdout = stdout.trim()

  return trimmedStdout
}
