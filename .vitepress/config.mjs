import { defineConfig } from 'vitepress'
import path from 'path'
import glob from 'glob'
import lodash from 'lodash'
import lodashMixins from '@geoblink/lodash-mixins'

// Apply the mixins to lodash
const _ = lodashMixins.default(lodash)

const componentsPath = path.resolve(__dirname, '../src/elements')

export default defineConfig({
  title: 'Geoblink Design System',
  description: 'Geoblink Design System for Vue.js',
  srcDir: '.vitepress/docs',
  outDir: 'public',
  theme: '.vitepress/theme',
  
  head: [
    ['link', { rel: 'icon', href: '/public/assets/img/favicon.ico' }]
  ],
  
  themeConfig: {
    logo: '/assets/img/logo.svg',
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Guides',
        items: [
          { text: 'Getting started', link: '/guides/getting-started' },
          { text: 'Using constants', link: '/guides/using-constants' },
          { text: 'Developing', link: '/guides/developing' }
        ]
      },
      { text: 'Changelog', link: '/changelog' },
      { text: 'Design tokens', link: '/design-tokens' },
      {
        text: 'Elements',
        items: [{
          text: 'All elements',
          link: '/elements'
        }, ...getGroupedComponents(componentsPath)]
      }
    ],
    
    sidebar: 'auto',
    lastUpdated: true,
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/geoblink/design-system' }
    ],
    
    editLink: {
      pattern: 'https://github.com/geoblink/design-system/edit/main/:path'
    }
  },
  
  vite: {
    publicDir: '../public',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../src'),
        'lodash': path.resolve(__dirname, '../node_modules/lodash')
      },
      extensions: ['.vue', '.js', '.ts', '.jsx', '.tsx', '.json']
    }
  }
})

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
        link: `/components/${path.dirname(singleItemPath)}/${path.basename(singleItemPath, '.vue')}`
      }
    })

    return {
      text: name,
      items: itemEntries
    }
  })
} 