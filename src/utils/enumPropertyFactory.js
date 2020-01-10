/**
 * @param {object} params
 * @param {string} [params.defaultValue]
 * @param {Object<string, string>} params.enumDictionary
 * @param {string} params.componentName
 * @param {string} params.propertyName
 */
export default function enumPropertyFactory (params) {
  return {
    type: String,
    default: params.defaultValue,
    validator (value) {
      const allValues = Object.values(params.enumDictionary)
      if (allValues.includes(params.enumDictionary[value])) return true

      const supportedValues = allValues.map(i => `«${i}»`).join(', ')
      console.warn(`${params.componentName} [component] :: Unsupported value («${value}») for «${params.propertyName}» property. Use one of ${supportedValues}`)
      return false
    }
  }
}
