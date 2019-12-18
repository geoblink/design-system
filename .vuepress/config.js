const path = require('path')
const glob = require('glob')
const _ = require('@geoblink/lodash-mixins').default(require('lodash'))

const componentsPath = path.resolve(__dirname, '../src/elements')

const base = process.env.VUEPRESS_BASE || '/'

module.exports = {
  base,
  title: 'Geoblink Design System',
  dest: 'public',
  head: [
    ['link', { rel: 'icon', href: '/assets/img/favicon.ico' }]
  ],
  themeConfig: {
    logo: `/assets/img/logo.svg`,
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Guides',
        items: [
          { text: 'Getting started', link: '/docs/guides/getting-started' },
          { text: 'Using constants', link: '/docs/guides/using-constants' },
          { text: 'Developing', link: '/docs/guides/developing' }
        ]
      },
      { text: 'Changelog', link: '/changelog' },
      { text: 'Design tokens', link: '/docs/design-tokens' },
      {
        text: 'Elements',
        items: [{
          text: 'All elements',
          link: '/docs/elements'
        }, ...getGroupedComponents(componentsPath)]
      }
    ],
    sidebar: 'auto',
    lastUpdated: 'Last Updated',
    repo: 'https://bitbucket.org/geoblink/geoblink-design-system',
    docsDir: 'src/elements',
    editLinks: true
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
  },
  patterns: [
    '!src',
    'docs/components/**/*.md',
    'docs/**/*.md',
    'docs/**/*.md',
    '*.md'
  ]
}

/**
 * @param {string} componentRootPath
 * @returns {Array<{ text: string, link: string } | { text: string, items: Array<{ text: string, link: string }> }>}
 */
function getGroupedComponents (componentRootPath) {
  const componentsPaths = _.map(
    glob.sync('*/*.vue', { cwd: componentRootPath }),
    (singlePath) => path.relative(componentRootPath, path.resolve(componentRootPath, singlePath))
  )

  const groupedComponents = _.groupBy(componentsPaths, (singlePath) => path.dirname(singlePath))

  return _.map(groupedComponents, function (items, commonPath) {
    const name = path.basename(commonPath)

    const itemEntries = _.map(items, function (singleItemPath) {
      return {
        text: path.basename(singleItemPath, '.vue'),
        link: `/docs/components/${path.dirname(singleItemPath)}/${path.basename(singleItemPath, '.vue')}.html`
      }
    })

    return {
      text: name,
      items: itemEntries
    }
  })
}
