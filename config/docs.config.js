/* eslint-disable comma-dangle */

const path = require('path')
const baseConfig = require('../build/webpack.base.conf.js')
const merge = require('webpack-merge')
const sections = require('./docs.sections.js')

module.exports = {
  /**
   * Name of your design system. Changes both page title and sidebar logo.
   */
  title: 'Geoblink Design System',
  /**
   * Most of the styles are defined in /docs/docs.styles.scss
   */
  theme: {
    maxWidth: '100%',
    sidebarWidth: 300,
    fontFamily: {
      base: ["'Lato'", 'Helvetica', 'Arial', 'sans-serif'],
      monospace: ['Consolas', "'Liberation Mono'", 'Menlo', 'monospace']
    }
  },
  /**
   * Define a custom code highlighting theme.
   */
  editorConfig: {
    theme: 'night'
  },
  /**
   * Path to static assets directory
   */
  assetsDir: path.join(__dirname, '../src/assets'),
  exampleMode: 'expand',
  usageMode: 'expand',
  /**
   * Enabling the below option will break things in Vue Desing System!
   */
  skipComponentsWithoutExample: false,
  /**
   * We’re defining below JS and SCSS requires for the documentation.
   */
  require: [
    path.join(__dirname, '../docs/docs.helper.js'),
    path.join(__dirname, '../docs/docs.styles.scss')
  ],
  /**
   * Enabling the following option splits sections into separate views.
   */
  pagePerSection: true,
  sections,
  /**
   * Custom wrapper template for the documentation.
   */
  template: {
    title: 'Example — Vue Design System',
    lang: 'en',
    trimWhitespace: true,
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0'
        },
        {
          name: 'format-detection',
          content: 'telephone=no'
        }
      ]
    },
    favicon: './favicon.ico'
  },
  /**
   * Ignore tests and example component.
   */
  ignore: [
    '**/__tests__/**',
    '**/*.test.js',
    '**/*.test.jsx',
    '**/*.spec.js',
    '**/*.spec.jsx'
  ],
  webpackConfig: merge(baseConfig, {
    module: {
      rules: [
        {
          test: /\.(css?|scss)(\?.*)?$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  path.join(__dirname, '../src/assets/tokens/tokens.scss'),
                  path.join(__dirname, '../src/assets/tokens/tokens.map.scss'),
                  path.join(__dirname, '../src/styles/styles.scss')
                ]
              }
            }
          ]
        }
      ]
    }
  }),
  styleguideDir: '../dist/docs'
  /**
   * Configure docs server to redirect asset queries
   */
  // configureServer(app) {
  //   // `app` is the instance of the express server running the docs
  //   app.get("/assets/:file", (req, res) => {
  //     res.redirect(req.params.file)
  //   })
  // },
}
