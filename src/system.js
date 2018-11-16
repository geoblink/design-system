/**
 * System.js creates the Design System Library.
 * Used both in dev environment and when exporting the system.
 */
import instance from '@/utils/vueInstance'

import '@/styles/styles.scss'

// Defines contexts to require
// (you should remove templates from this if not used in production)
const contexts = [
  require.context('@/elements/', true, /\.vue$/),
  require.context('@/patterns/', true, /\.vue$/),
  require.context('@/templates/', true, /\.vue$/)
]

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

const directives = require.context('@/directives/', true, /\.js$/)
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
