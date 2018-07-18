/**
 * System.js creates the Design System Library.
 * Used both in dev environment and when exporting the system.
 */
import instance from '@/utils/vueInstance'

// Defines contexts to require
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

export default {
  install (Vue) {
    componentsList.forEach(c => Vue.component(c.name, c))
  }
}

export { componentsByName as components }
export { constantsByComponentName as constants }

export { instance }
