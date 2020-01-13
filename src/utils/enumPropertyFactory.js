export {
  enumPropertyFactory
}

/**
 * @param {object} params
 * @param {string} [params.defaultValue]
 * @param {Boolean} [params.required]
 * @param {Boolean} [params.checkUndefined]
 * @param {Object<string, string>} params.enumDictionary
 * @param {string} params.componentName
 * @param {string} params.propertyName
 */
function enumPropertyFactory (params) {
  const enumProperty = {
    type: String,
    validator (value) {
      if (params.checkUndefined && value === undefined) return true

      const allValues = Object.values(params.enumDictionary)
      if (allValues.includes(value)) return true

      const supportedValues = allValues.map(i => `«${i}»`).join(', ')
      console.warn(`${params.componentName} [component] :: Unsupported value («${value}») for «${params.propertyName}» property. Use one of ${supportedValues}`)
      return false
    }
  }

  if ('defaultValue' in params) {
    enumProperty.default = params.defaultValue
  }
  if ('required' in params) {
    enumProperty.required = !!params.required
  }

  return enumProperty
}
