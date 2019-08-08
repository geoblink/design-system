import _ from 'lodash'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import ComponentDocumentation from './components/ComponentDocumentation.vue'
import GeoblinkDesignSystem, { components } from '../src/system'

const componentUtils = require('./componentUtils')

const iconsToMock = [
  'faChevronLeft',
  'faChevronRight',
  'faStepBackward',
  'faStepForward',
  'faCaretUp',
  'faCaretDown',
  'faLock',
  'faUpload',
  'faCheckCircle',
  'faExclamationTriangle',
  'faLightbulb',
  'faThumbsUp'
]
const mockedFalIcons = _.mapValues(_.pick(fas, iconsToMock), function (original) {
  return _.assign({}, original, {
    prefix: 'fal'
  })
})

library.add(fab, fas, far, mockedFalIcons)

export default ({ Vue, router, siteData }) => {
  Vue.component('font-awesome-icon', FontAwesomeIcon)
  Vue.use(GeoblinkDesignSystem)

  const {
    componentsDocumentations,
    componentsExamples
  } = siteData.themeConfig

  // Remove default pages corresponding component examples

  const regularPathsToBeIgnored = {}
  for (const singleComponentExample of componentsExamples) {
    regularPathsToBeIgnored[singleComponentExample.originalRegularPath] = { }
  }

  for (let i = 0; i < siteData.pages.length;) {
    const pageInfo = siteData.pages[i]
    if (pageInfo.regularPath in regularPathsToBeIgnored) {
      const parentComponentName = pageInfo.regularPath.replace('/src/elements/', '').split('.')[0]
      const parentComponent = componentsDocumentations[parentComponentName]

      regularPathsToBeIgnored[pageInfo.regularPath] = {
        key: pageInfo.key,
        title: pageInfo.title || (parentComponent && parentComponent.documentation.displayName),
        frontmatter: pageInfo.frontmatter,
        headers: pageInfo.headers
      }

      siteData.pages.splice(i, 1)
    } else {
      i++
    }
  }

  // Add a dynamic route to be able to show component's documentation automatically
  router.addRoutes([{
    path: '/components/*',
    component: ComponentDocumentation,
    props (route) {
      const componentPath = route.params.pathMatch.replace(/\.[^.]*$/, '')
      const { documentation, examples } = componentsDocumentations[componentPath]

      return {
        componentPath,
        componentDefinition: components[documentation.displayName],
        componentDocumentation: documentation,
        componentExamples: examples
      }
    }
  }])

  // Add component documentation dynamic page to search index
  for (const componentPath of Object.keys(componentsDocumentations)) {
    const { documentation } = componentsDocumentations[componentPath]
    const componentDefinition = components[documentation.displayName]

    siteData.pages.push(
      componentUtils.getVuepressPageSettingsForComponent({
        path: componentPath,
        definition: componentDefinition,
        documentation
      })
    )
  }

  // Add pages corresponding to component examples
  for (const singleComponentExample of componentsExamples) {
    siteData.pages.push(
      componentUtils.getVuepressPageSettingsForExample(
        regularPathsToBeIgnored[singleComponentExample.originalRegularPath],
        singleComponentExample
      )
    )
  }
}
