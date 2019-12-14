'use strict'
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin')
const MergeWebpackPlugin = require('webpack-merge-and-include-globally')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const SafeParser = require('postcss-safe-parser')
const glob = require('glob')
const _ = require('lodash')

const utils = require('./utils')
const config = require('../config')
const baseWebpackConfig = require('./webpack.base.conf')

const env = require('../config/prod.env')

const vueComponentsRelativePathFromRoot = './src/elements'
const vueComponentsPaths = glob.sync('**/*.vue', {
  cwd: path.resolve(__dirname, '../', vueComponentsRelativePathFromRoot)
})

const systemEntrypoints = {
  system: ['./src/system.js']
}

const componentsEntrypoints = _.fromPairs(
  _.map(
    vueComponentsPaths,
    (relativePath) => [
      path.relative('', path.resolve('components', path.basename(relativePath, '.vue'))),
      [path.resolve(vueComponentsRelativePathFromRoot, relativePath)]
    ]
  )
)

const elementsSCSSRelativePathFromRoot = './src/styles/elements'
const elementsSCSSPaths = glob.sync('**/*.scss', {
  cwd: path.resolve(__dirname, '../', elementsSCSSRelativePathFromRoot)
}).map(name => path.resolve(elementsSCSSRelativePathFromRoot, name))

const stylesEntrypoints = _.fromPairs(
  _.map(
    elementsSCSSPaths,
    (relativePath) => [
      path.relative('', path.resolve('styles', path.basename(relativePath, '.scss'))),
      [path.resolve(elementsSCSSRelativePathFromRoot, relativePath)]
    ]
  )
)

const plugins = [
  // http://vuejs.github.io/vue-loader/en/workflow/production.html
  new webpack.DefinePlugin({
    'process.env': env
  }),
  new UglifyJsPlugin({
    sourceMap: config.system.productionSourceMap,
    parallel: true
  }),
  // Compress extracted CSS. We are using this plugin so that possible
  // duplicated CSS from different components can be deduped.
  new OptimizeCSSPlugin({
    cssProcessorOptions: { parser: SafeParser }
  }),
  // keep module.id stable when vendor modules does not change
  new webpack.HashedModuleIdsPlugin(),
  // enable scope hoisting
  new webpack.optimize.ModuleConcatenationPlugin(),
  // Copy and merge Sass tokens and system utilities as well
  new MergeWebpackPlugin({
    files: {
      [utils.assetsSystemPath('system.utils.scss')]: [
        './src/assets/tokens/tokens.scss',
        './src/styles/_spacing.scss',
        './src/styles/_fontsMaps.scss',
        './src/styles/_mixins.scss',
        './src/styles/_functions.scss'
      ]
    }
  }),
  // copy custom static assets
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, '../src/assets'),
      to: config.system.assetsSubDirectory,
      ignore: ['.*', '*.png', '*.svg', '*.ico']
    }
  ]),
  new PeerDepsExternalsPlugin()
]

const webpackConfig = merge(baseWebpackConfig, {
  externals: {
    lodash: 'lodash',
    vue: 'vue'
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.system.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.system.devtool : false,
  output: {
    path: config.system.assetsRoot,
    filename: utils.assetsSystemPath('[name].js'),
    library: '[name]',
    libraryTarget: 'umd'
  },
  plugins
})

if (config.system.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(' + config.system.productionGzipExtensions.join('|') + ')$'),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.system.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = {
  all: _.assign({}, webpackConfig, {
    entry: _.assign({}, systemEntrypoints, componentsEntrypoints, stylesEntrypoints)
  }),
  system: _.assign({}, webpackConfig, {
    entry: systemEntrypoints
  }),
  components: _.assign({}, webpackConfig, {
    entry: componentsEntrypoints
  }),
  styles: _.assign({}, webpackConfig, {
    entry: stylesEntrypoints
  })
}
