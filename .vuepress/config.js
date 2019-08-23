const path = require('path')
const glob = require('glob')
const vueDocs = require('vue-docgen-api')
const _ = require('@geoblink/lodash-mixins').default(require('lodash'))

const componentsPath = path.resolve(__dirname, '../src/elements')

const base = process.env.VUEPRESS_BASE || '/'

const componentsDocumentations = getComponentsDocumentations()
const componentsExamples = getComponentsExamples()

const groupedComponentsDocumentations = _.groupBy(componentsDocumentations, 'group')
const componentsSectionItems = _.map(groupedComponentsDocumentations, function (items, groupName) {
  return {
    text: groupName,
    items: _.map(items, function ({ documentation, path }) {
      return {
        text: documentation.displayName,
        link: `/components/${path}`
      }
    })
  }
})

module.exports = {
  base,
  title: 'Geoblink Design System documentation',
  head: [
    ['link', { rel: 'icon', href: '/assets/img/favicon.ico' }]
  ],
  globalLayout: path.resolve(__dirname, 'components/ComponentExampleLayout.vue'),
  themeConfig: {
    logo: `/assets/img/logo.svg`,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Design tokens', link: '/docs/design-tokens' },
      {
        text: 'Components',
        items: componentsSectionItems
      }
    ],
    sidebar: 'auto',
    lastUpdated: 'Last Updated',
    repo: 'https://bitbucket.org/geoblink/geoblink-design-system',
    docsDir: 'src/elements',
    editLinks: true,
    componentsDocumentations,
    componentsExamples
  },
  plugins: [
    ['live', {
      // optional: use layout to customize how the live editor is going to look like
      layout: path.resolve(__dirname, "./components/ComponentDemo.vue")
    }]
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../src')
      }
    }
  }
}

function getComponentsDocumentations () {
  const componentsDefinitionsPaths = glob.sync(`${componentsPath}/**/*.vue`)
  const existingComponentAbsolutePaths = _.fromPairsMap(componentsDefinitionsPaths, (componentPath) => [componentPath, true])
  const existingComponentInternalPaths = _.mapKeys(
    existingComponentAbsolutePaths,
    (exists, absolutePath) => absolutePath
      .replace(`${componentsPath}/`, '')
      .replace(/\.vue$/, '')
  )
  const componentsExamples = getComponentsExamples()

  const examplesByInternalPath = _.groupBy(
    componentsExamples,
    (example) => {
      const parentComponentInternalPath = example.internalPath.replace(/\.[^.]*$/, '')
      const rootComponentName = _.first(parentComponentInternalPath.split('/'))
      const rootComponentInternalPath = `${rootComponentName}/${rootComponentName}`

      return parentComponentInternalPath in existingComponentInternalPaths
        ? parentComponentInternalPath
        : rootComponentInternalPath
    }
  )

  /**
   * @typedef {Object} ComponentDocumentation
   * @property {string} path
   * @property {ComponentDoc} documentation
   * @property {string} group
   * @property {Array<ComponentExample>} examples
   */

  const componentsDocumentations = _.fromPairsMap(componentsDefinitionsPaths, function (pathToComponentDefinition) {
    const internalPath = pathToComponentDefinition
      .replace(`${componentsPath}/`, '')
      .replace(/\.vue$/, '')

    const examples = examplesByInternalPath[internalPath]

    const rootComponentName = internalPath.split('/')[0]

    return [internalPath, {
      path: internalPath,
      documentation: vueDocs.parse(pathToComponentDefinition),
      group: rootComponentName,
      examples
    }]
  })

  return componentsDocumentations
}

/**
 * @typedef {Object} ComponentExample
 * @property {string} originalRegularPath
 * @property {string} originalRelativePath
 * @property {string} internalPath
 */

function getComponentsExamples () {
  const componentsMarkdownDocumentationsPaths = glob.sync(`${componentsPath}/**/*.md`)

  const componentsExamples = _.map(componentsMarkdownDocumentationsPaths, function (pathToComponentExample) {
    const internalPath = pathToComponentExample
      .replace(`${componentsPath}/`, '')
      .replace(/\.examples.md$/, '')

    return {
      originalRegularPath: `/src/elements/${internalPath}.examples.html`,
      originalRelativePath: `src/elements/${internalPath}.examples.md`,
      internalPath
    }
  })

  return componentsExamples
}