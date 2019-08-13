import './styles/index.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import ComponentDocumentation from './components/ComponentDocumentation.vue'
import GeoblinkDesignSystem, { components } from '../src/system'
import '../src/utils/webFontLoader'

const _ = require('@geoblink/lodash-mixins').default(require('lodash'))

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

  renameComponentExamplesPages(siteData)
  siteData.themeConfig.componentExamplesByPath = getComponentExamplePages(siteData)
  addComponentDocumentationRoutes(router, siteData)
  addComponentDocumentationPages(siteData)
}

/**
 * @param {any} siteData
 */
function renameComponentExamplesPages (siteData) {
  const {
    componentsDocumentations,
    componentsExamples
  } = siteData.themeConfig

  const componentExamplesInternalPaths = {}
  for (const singleComponentExample of componentsExamples) {
    componentExamplesInternalPaths[singleComponentExample.originalRegularPath] = true
  }

  for (let i = 0; i < siteData.pages.length; i++) {
    const pageInfo = siteData.pages[i]

    if (!(pageInfo.regularPath in componentExamplesInternalPaths)) continue
    if (pageInfo.title) continue

    const componentInternalPath = componentUtils.getComponentInternalPathForExample(pageInfo.regularPath)

    const component = componentsDocumentations[componentInternalPath]
    const componentDisplayName = component && component.documentation.displayName

    const parentComponentInternalPath = _.times(2, () => componentInternalPath.split('/')[0]).join('/')
    const parentComponent = componentsDocumentations[parentComponentInternalPath]
    const parentComponentDisplayName = parentComponent && parentComponent.documentation.displayName

    const displayablePath = componentDisplayName
      ? componentDisplayName
      : `${parentComponentDisplayName} » ${componentInternalPath.split('/').slice(-1)[0]}`

    pageInfo.title = `${displayablePath} (Examples)`
  }
}

/**
 * @param {any} siteData
 * @returns {Object<string, any>}
 */
function getComponentExamplePages (siteData) {
  const {
    componentsExamples
  } = siteData.themeConfig

  const componentExamplesInternalPaths = {}
  for (const singleComponentExample of componentsExamples) {
    componentExamplesInternalPaths[singleComponentExample.originalRegularPath] = true
  }

  const examplesPages = _.filter(siteData.pages, function (pageInfo) {
    return pageInfo.regularPath in componentExamplesInternalPaths
  })

  return _.fromPairsMap(examplesPages, (pageInfo) => [pageInfo.regularPath, pageInfo])
}

/**
 * @param {any} router
 * @param {any} siteData
 */
function addComponentDocumentationRoutes (router, siteData) {
  router.addRoutes([{
    path: '/components/*',
    component: ComponentDocumentation,
    props (route) {
      const componentPath = route.params.pathMatch.replace(/\.[^.]*$/, '')
      const { documentation, examples } = siteData.themeConfig.componentsDocumentations[componentPath]

      return {
        componentPath,
        componentDefinition: components[documentation.displayName],
        componentDocumentation: documentation,
        componentExamples: examples
      }
    }
  }])
}

/**
 * @param {any} siteData
 */
function addComponentDocumentationPages (siteData) {
  const { componentsDocumentations } = siteData.themeConfig

  for (const componentPath of Object.keys(componentsDocumentations)) {
    const { documentation } = componentsDocumentations[componentPath]
    const definition = components[documentation.displayName]

    siteData.pages.push(
      componentUtils.getVuepressPageSettingsForComponent({
        path: componentPath,
        name: documentation.displayName,
        definition,
        documentation
      })
    )
  }
}
