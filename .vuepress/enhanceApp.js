import './styles/index.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import ComponentDocumentation from './components/ComponentDocumentation.vue'
import GeoblinkDesignSystem, { components } from '../src/system'

// We only want to load this in client-side rendering.
if (typeof window !== 'undefined') {
  require('../src/utils/webFontLoader')
}

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
  router.mode = 'hash' // To fix permalinks in S3

  Vue.component('font-awesome-icon', FontAwesomeIcon)
  Vue.use(GeoblinkDesignSystem)

  siteData.themeConfig.componentExamplesByPath = getComponentExamplePages(siteData)
  addComponentDocumentationRoutes(router, siteData)
  addComponentDocumentationPages(siteData)
  removeComponentExamplesFromSearch(siteData)
}

/**
 * @param {any} siteData
 */
function removeComponentExamplesFromSearch (siteData) {
  const {
    componentsDocumentations,
    componentsExamples
  } = siteData.themeConfig

  const pagesByRegularPath = _.fromPairsMap(siteData.pages, (page) => [page.regularPath, page])

  const componentExamplesInternalPaths = {}
  for (const singleComponentExample of componentsExamples) {
    const componentOfExample = getComponentOfExample(singleComponentExample.internalPath, componentsDocumentations)
    componentExamplesInternalPaths[singleComponentExample.originalRegularPath] = componentOfExample
  }

  for (let i = 0; i < siteData.pages.length; i++) {
    const pageInfo = siteData.pages[i]

    if (!(pageInfo.regularPath in componentExamplesInternalPaths)) continue

    const componentRegularPath = `/src/elements/${componentExamplesInternalPaths[pageInfo.regularPath].path}.html`
    const componentPage = pagesByRegularPath[componentRegularPath]

    siteData.pages[i] = componentPage
  }
}

/**
 * @param {any} $site
 * @returns {Object<string, import('./componentUtils').VuePressPage>}
 */
function getComponentExamplePages ($site) {
  const {
    componentsExamples
  } = $site.themeConfig

  const componentExamplesInternalPaths = {}
  for (const singleComponentExample of componentsExamples) {
    componentExamplesInternalPaths[singleComponentExample.originalRegularPath] = true
  }

  const examplesPages = _.filter($site.pages, function (pageInfo) {
    return pageInfo.regularPath in componentExamplesInternalPaths
  })

  return _.fromPairsMap(examplesPages, (pageInfo) => [pageInfo.regularPath, _.cloneDeep(pageInfo)])
}

/**
 * @param {any} router
 * @param {any} $site
 */
function addComponentDocumentationRoutes (router, $site) {
  router.addRoutes([{
    path: '/components/*',
    component: ComponentDocumentation,
    props (route) {
      const componentPath = route.params.pathMatch.replace(/\.[^.]*$/, '')
      const { documentation, examples } = $site.themeConfig.componentsDocumentations[componentPath]
      const definition = components[documentation.displayName]

      return {
        overridenPageSettings: componentUtils.getVuepressPageSettingsForComponent({
          path: componentPath,
          name: documentation.displayName,
          definition,
          documentation,
          examples,
          $site
        }),
        componentPath,
        componentDefinition: components[documentation.displayName],
        componentDocumentation: documentation,
        componentExamples: componentUtils.getComponentExamples(examples, $site.themeConfig.componentExamplesByPath)
      }
    }
  }])
}

/**
 * @param {any} $site
 */
function addComponentDocumentationPages ($site) {
  const { componentsDocumentations } = $site.themeConfig

  for (const componentPath of Object.keys(componentsDocumentations)) {
    const { documentation, examples } = componentsDocumentations[componentPath]
    const definition = components[documentation.displayName]

    $site.pages.push(
      componentUtils.getVuepressPageSettingsForComponent({
        path: componentPath,
        name: documentation.displayName,
        definition,
        documentation,
        examples,
        $site
      })
    )
  }
}

/**
 * @param {string} exampleInternalPath
 * @param {Object<string, ComponentDocumentation>} components
 * @returns {ComponentDocumentation|null}
 */
function getComponentOfExample (exampleInternalPath, components) {
  if (components[exampleInternalPath]) return components[exampleInternalPath]

  const internalPathSegments = exampleInternalPath.split('/')
  const parentInternalPathSegments = _.dropRight(internalPathSegments, 1)

  if (parentInternalPathSegments.length === 1) {
    parentInternalPathSegments.push(parentInternalPathSegments[0])
    const parentInternalPath = parentInternalPathSegments.join('/')
    return components[parentInternalPath] || null
  }

  return getComponentOfExample(parentInternalPathSegments.join('/'), components)
}
