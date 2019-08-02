module.exports = {
  getArgv
}

/**
 * @param {number} index
 * @returns {string}
 */
function getArgv (index) {
  return process.argv[index] && process.argv[index].trim()
}
