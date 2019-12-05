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
    name: 'exampleMarkdownCode',
    message: 'Example Markdown code:',
    validate (value) {
      if (!value) return 'Example Markdown code cannot be empty.'

      return true
    }
  }
]
