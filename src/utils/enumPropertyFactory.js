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
      if (value in params.enumDictionary) return true

      const supportedValues = Object.keys(params.enumDictionary).map(i => `«${i}»`).join(', ')
      console.warn(`${params.componentName} [component] :: Unsupported value («${value}») for «${params.propertyName}» property. Use one of ${supportedValues}`)
      return false
    }
  }
}
