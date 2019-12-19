'use strict'
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = require('../config')

module.exports = {
  assetsPath,
  assetsSystemPath,
  cssLoaders,
  styleLoaders
}

/**
 * @param {string} _path
 * @returns {string}
 */
function assetsPath (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

/**
 * @param {string} _path
 * @returns {string}
 */
function assetsSystemPath (_path) {
  return path.posix.join(config.system.assetsSubDirectory, _path)
}

/**
 * @typedef {Object} LoaderOptions
 */

/**
 * @template T
 * @typedef {WebpackLoaderConfigString | WebpackLoaderConfigObject<T>} WebpackLoaderConfig
 */

/**
 * @typedef {String} WebpackLoaderConfigString
 */

/**
 * @template T
 * @typedef {Object} WebpackLoaderConfigObject
 * @property {string} loader
 * @property {T} [options]
 */

/**
 * @typedef {Object} CSSLoders
 * @property {Array<WebpackLoaderConfig<any>>} css
 * @property {Array<WebpackLoaderConfig<any>>} postcss
 * @property {Array<WebpackLoaderConfig<any>>} sass
 * @property {Array<WebpackLoaderConfig<any>>} scss
 */

/**
 * @param {LoaderOptions} [options]
 * @returns {CSSLoders}
 */
function cssLoaders (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const sassResourcesConfig = {
    loader: 'sass-resources-loader',
    options: {
      resources: [
        path.resolve(__dirname, '../src/assets/tokens/tokens.scss'),
        path.resolve(__dirname, '../src/assets/tokens/tokens.map.scss'),
        path.resolve(__dirname, '../src/styles/styles.scss')
      ]
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    sass: generateLoaders('sass', { indentedSyntax: true }).concat(sassResourcesConfig),
    scss: generateLoaders('sass', { }).concat(sassResourcesConfig)
  }

  // generate loader string to be used with extract text plugin

  /**
   * @param {string} [loader]
   * @param {LoaderOptions} [loaderOptions]
   * @returns {Array<WebpackLoaderConfig<any>>}
   */
  function generateLoaders (loader, loaderOptions) {
    const loaders = []

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      loaders.push(MiniCssExtractPlugin.loader)
    } else {
      loaders.push({
        loader: 'vue-style-loader'
      })
    }

    loaders.push(cssLoader)

    if (options.usePostCSS) {
      loaders.push(postcssLoader)
    }

    if (loader) {
      loaders.push({
        loader: `${loader}-loader`,
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    return loaders
  }
}

/**
 * @typedef {Object} WebpackStyleLoaderConfigObject
 * @property {RegExp} test
 * @property {CSSLoders} use
 */

/**
 * Generate loaders for standalone style files (outside of .vue).
 * @param {LoaderOptions} [options]
 * @returns {Array<WebpackStyleLoaderConfigObject>}
 */
function styleLoaders (options) {
  const output = []
  const loaders = cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}
