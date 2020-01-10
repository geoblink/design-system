export {
  enumDefaultPropertyFactory,
  enumRequiredPropertyFactory
}

/**
 * @param {object} params
 * @param {string} [params.defaultValue]
 * @param {Object<string, string>} params.enumDictionary
 * @param {string} params.componentName
 * @param {string} params.propertyName
 */
function enumDefaultPropertyFactory (params) {
  return {
    type: String,
    default: params.defaultValue,
    validator (value) {
      const allValues = Object.values(params.enumDictionary)
      if (allValues.includes(value)) return true

      const supportedValues = allValues.map(i => `«${i}»`).join(', ')
      console.warn(`${params.componentName} [component] :: Unsupported value («${value}») for «${params.propertyName}» property. Use one of ${supportedValues}`)
      return false
    }
  }
}

/**
 * @param {object} params
 * @param {Boolean} [params.required]
 * @param {Object<string, string>} params.enumDictionary
 * @param {string} params.componentName
 * @param {string} params.propertyName
 */
function enumRequiredPropertyFactory (params) {
  return {
    type: String,
    required: params.required ? params.required : false,
    validator (value) {
      const allValues = Object.values(params.enumDictionary)
      if (allValues.includes(value)) return true

      const supportedValues = allValues.map(i => `«${i}»`).join(', ')
      console.warn(`${params.componentName} [component] :: Unsupported value («${value}») for «${params.propertyName}» property. Use one of ${supportedValues}`)
      return false
    }
  }
}
