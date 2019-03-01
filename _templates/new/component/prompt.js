module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'Component name (for example GeoComponent):',
    validate (value) {
      if (!value.length) {
        return 'Components must have a name.'
      }
      const nameRegex = RegExp('^Geo[A-Z]\\w*$')

      if (!nameRegex.test(value)) {
        return 'Component names should start with Geo and in PascalCase, example GeoComponent.'
      }

      return true
    }
  }
]
