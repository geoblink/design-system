const fs = require('fs')

module.exports = [
  {
    type: 'input',
    name: 'path',
    message: 'Component path (for example «elements/GeoActivityIndicator/GeoActivityIndicator.vue»):',
    validate (value) {
      if (!value) return 'Path cannot be empty.'

      if (!fs.existsSync(value)) return 'Path must point to an existing file'

      return true
    }
  },
  {
    type: 'input',
    name: 'exampleMarkdownPath',
    message: 'Example path (for example «elements/GeoActivityIndicator/GeoActivityIndicator.examples.md»):',
    validate (value) {
      if (!value) return 'Path to example cannot be empty.'

      if (!fs.existsSync(value)) return 'Path to example must point to an existing file'

      return true
    }
  }
]
