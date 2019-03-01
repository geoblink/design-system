const path = require('path')
const baseConfig = require('../build/webpack.base.conf.js')
const merge = require('webpack-merge')

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
  require: [path.join(__dirname, '../docs/docs.helper.js'), path.join(__dirname, '../docs/docs.styles.scss')],
  /**
   * Enabling the following option splits sections into separate views.
   */
  pagePerSection: true,
  sections: [
    {
      name: 'Geoblink\'s Design System',
      content: '../docs/getting-started.md',
      components: '../docs/components/status/**/[A-Z]*.vue',
      sectionDepth: 1,
      exampleMode: 'hide',
      usageMode: 'hide'
    },
    {
      name: 'Design Principles',
      content: '../docs/principles.md'
    },
    {
      name: 'Voice & Tone',
      content: '../docs/voice-and-tone.md'
    },
    {
      name: 'Design Tokens',
      content: '../docs/tokens.md',
      sectionDepth: 1,
      exampleMode: 'hide',
      usageMode: 'hide',
      components: () => [
        '../docs/components/tokens/Color.vue',
        '../docs/components/tokens/FontSize.vue',
        '../docs/components/tokens/Spacing.vue',
        '../docs/components/tokens/All.vue'
      ]
    },
    {
      name: 'Elements',
      content: '../docs/elements.md',
      exampleMode: 'expand',
      usageMode: 'expand',
      sectionDepth: 1,
      sections: [
        {
          name: 'GeoActivityIndicator',
          components: '../src/elements/GeoActivityIndicator/GeoActivityIndicator*.vue',
          sectionDepth: 0
        },
        {
          name: 'GeoAlert',
          components: '../src/elements/GeoAlert/Geo*Alert.vue',
          sectionDepth: 0
        },
        {
          name: 'GeoBorderedBox',
          components: '../src/elements/GeoBorderedBox/GeoBorderedBox*.vue',
          sectionDepth: 1
        },
        {
          name: 'GeoBorderedToken',
          components: '../src/elements/GeoBorderedToken/GeoBorderedToken.vue',
          sectionDepth: 0
        },
        {
          name: 'GeoButton',
          components: '../src/elements/GeoButton/Geo*Button.vue',
          sectionDepth: 0
        },
        {
          name: 'GeoCircle',
          components: '../src/elements/GeoCircle/GeoCircle.vue',
          sectionDepth: 0
        },
        {
          name: 'GeoDropdown',
          components: '../src/elements/GeoDropdown/GeoDropdown*.vue',
          sectionDepth: 1
        },
        {
          name: 'GeoFileUpload',
          components: '../src/elements/GeoFileUpload/GeoFileUpload*.vue',
          sectionDepth: 0
        },
        {
          name: 'GeoInput',
          components: '../src/elements/GeoInput/GeoInput*.vue',
          sectionDepth: 0
        },
        {
          name: 'GeoList',
          components: '../src/elements/GeoList/GeoList*.vue',
          sectionDepth: 1
        },
        {
          name: 'GeoModal',
          components: '../src/elements/GeoModal/GeoModal*.vue',
          sectionDepth: 1
        },
        {
          name: 'GeoNotificationBar',
          components: '../src/elements/GeoNotificationBar/GeoNotificationBar*.vue',
          sectionDepth: 1
        },
        {
          name: 'GeoScrollableContainer',
          components: '../src/elements/GeoScrollableContainer/GeoScrollableContainer*.vue',
          sectionDepth: 0
        },
        {
          name: 'GeoSegmentedControl',
          components: '../src/elements/GeoSegmentedControl/GeoSegmentedControl*.vue',
          sectionDepth: 0
        },
        {
          name: 'GeoSelect',
          components: '../src/elements/GeoSelect/GeoSelect*.vue',
          sectionDepth: 1
        },
        {
          name: 'GeoTabBar',
          components: '../src/elements/GeoTabBar/GeoTabBar*.vue',
          sectionDepth: 1
        },
        {
          name: 'GeoTable',
          components: '../src/elements/GeoTable/GeoTable*.vue',
          sectionDepth: 1
        },
        {
          name: 'String Utils',
          components: () => [
            '../src/elements/GeoHighlightedString/GeoHighlightedString.vue',
            '../src/elements/GeoTrimmedContent/GeoTrimmedContent.vue',
            '../src/elements/GeoMarquee/GeoMarquee.vue',
            '../src/elements/GeoMarkdownContent/GeoMarkdownContent.vue'
          ],
          sectionDepth: 1
        },
        {
          name: 'Charts',
          sections: [{
            name: 'Introduction',
            components: '../src/elements/GeoChart/GeoChart.vue'
          }, {
            name: 'Axes',
            content: '../src/elements/GeoChart/GeoChartAxis.md'
          }, {
            name: 'Axes guidelines',
            content: '../src/elements/GeoChart/GeoChartAxisGuidelines.md'
          }, {
            name: 'Scales',
            content: '../src/elements/GeoChart/GeoChartScale.md'
          }, {
            name: 'Labels',
            content: '../src/elements/GeoChart/GeoChartLabels.md'
          }, {
            name: 'Bar charts',
            content: '../src/elements/GeoChart/GeoChartBars.md'
          }, {
            name: 'Colored bar charts',
            content: '../src/elements/GeoChart/GeoChartColorBar.md'
          }, {
            name: 'Pie charts',
            content: '../src/elements/GeoChart/GeoChartPie.md'
          }]
        }
        // hygen-component (reference for injection, do not remove)
      ]
    },
    {
      name: 'Patterns',
      content: '../docs/patterns.md',
      components: '../src/patterns/**/[A-Z]*.vue',
      exampleMode: 'expand',
      usageMode: 'expand',
      sectionDepth: 2
    },
    {
      name: 'Templates',
      content: '../docs/templates.md',
      components: '../src/templates/**/[A-Z]*.vue',
      exampleMode: 'expand',
      usageMode: 'expand',
      sectionDepth: 2
    },
    {
      name: 'Customizing Components',
      content: '../docs/custom-styling.md'
    },
    {
      name: 'Components Constants',
      content: '../docs/components-constants.md'
    },
    {
      name: 'FAQ',
      content: '../docs/faq.md',
      sectionDepth: 1
    },
    {
      /**
       * Private components have to be loaded into the documentation as well,
       * otherwise anything using them will be broken. We’re loading them in
       * their own section, which then gets hidden in docs/docs.styles.scss
       */
      name: 'Private Components',
      components: '../src/**/[_]*.vue'
    }
  ],
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
   * Ignore app.vue, tests, and example component.
   */
  ignore: [
    '**/App.vue',
    '**/__tests__/**',
    '**/*.test.js',
    '**/*.test.jsx',
    '**/*.spec.js',
    '**/*.spec.jsx',
    '**/ExampleComponent.vue'
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
