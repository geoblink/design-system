/**
 * System.js creates the Design System Library.
 * Used both in dev environment and when exporting the system.
 */
import instance from '@/utils/vueInstance'

import mockFontAwesomeProIcons from './utils/mockFontAwesomeProIcons'

import '@/styles/styles.scss'

// Defines contexts to require
// (you should remove templates from this if not used in production)
const contexts = (() => {
  // Use dynamic imports when available (used in documentation which uses Vite)
  if (typeof import.meta !== 'undefined') {
    const elements = import.meta.glob('@/elements/**/*.vue', { eager: true })
    const patterns = import.meta.glob('@/patterns/**/*.vue', { eager: true })
    const templates = import.meta.glob('@/templates/**/*.vue', { eager: true })

    
    return [
      createContext(elements),
      createContext(patterns),
      createContext(templates)
    ]
  }
  
  // Fall back to Webpack require.context
  if (typeof require !== 'undefined' && require.context) {
    return [
      require.context('@/elements/', true, /\.vue$/),
      require.context('@/patterns/', true, /\.vue$/),
      require.context('@/templates/', true, /\.vue$/)
    ]
  }
  
  return []
})()

const componentsList = []
const componentsByName = {}
const constantsByComponentName = {}
contexts.forEach(context => {
  context.keys().forEach(key => {
    const definition = context(key).default
    const { name, constants } = definition

    componentsList.push(definition)
    componentsByName[name] = definition

    if (constants) {
      constantsByComponentName[name] = constants
    }
  })
})

const directives = (() => {
  // Use dynamic imports when available (used in documentation which uses Vite)
  if (typeof import.meta !== 'undefined') {
    const directivesGlob = import.meta.glob('@/directives/**/*.js', { eager: true })
    
    return createContext(directivesGlob)
  }
  
  // Fall back to Webpack require.context
  if (typeof require !== 'undefined' && require.context) {
    return require.context('@/directives/', true, /\.js$/)
  }
  
  // Fallback for other environments
  return { keys: () => [], get: () => {} }
})()
const directivesByName = {}
const directivesList = []
directives.keys().forEach(key => {
  const definition = directives(key).default
  const directiveName = key.replace(/^\.\/(.*)\.js$/i, '$1')
  directivesByName[directiveName] = definition
  directivesList.push({ name: directiveName, definition })
})

export default {
  install (Vue) {
    componentsList.forEach(c => Vue.component(c.name, c))
    directivesList.forEach(d => Vue.directive(d.name, d.definition))
  }
}

export { directivesByName as directives }
export { componentsByName as components }
export { constantsByComponentName as constants }

export { instance }

export { mockFontAwesomeProIcons }

/**
 * 
 * @param {*} modules 
 * We use this function to return a context object from a modules object
 * so we keep the same interface for both import.meta.glob and require.context.
 * @returns {Object} A context object
 */
function createContext(modules) {
  const context = (key) => modules[key]
  context.keys = () => Object.keys(modules)
  return context
}