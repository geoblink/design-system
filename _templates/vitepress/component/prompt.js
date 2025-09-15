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
    name: 'jsonDocumentation',
    message: 'Documentation in JSON format:',
    validate (value) {
      if (!value) return 'Documentation cannot be empty.'

      try {
        JSON.parse(value)

        return true
      } catch (error) {
        return 'Documentation should be a valid JSON'
      }
    }
  }
]
