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
    docsDir: 'e2e',
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
  const componentsExamples = getComponentsExamples()

  const examplesByInternalPath = _.groupBy(
    componentsExamples,
    example => example.internalPath.replace(/\.[^.]*$/, '')
  )

  const componentsDefinitions = _.fromPairsMap(componentsDefinitionsPaths, function (pathToComponentDefinition) {
      const relativePath = pathToComponentDefinition
        .replace(`${componentsPath}/`, '')
        .replace(/\.vue$/, '')

      const examples = examplesByInternalPath[relativePath]

      const group = relativePath.split('/')[0]

      return [relativePath, {
        path: relativePath,
        documentation: vueDocs.parse(pathToComponentDefinition),
        group,
        examples
      }]
    })

  return componentsDefinitions
}

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