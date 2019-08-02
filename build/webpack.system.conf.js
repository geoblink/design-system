'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const path = require('path')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin')
const MergeWebpackPlugin = require('webpack-merge-and-include-globally')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const SafeParser = require('postcss-safe-parser')
const fs = require('fs')

const env = require('../config/prod.env')

baseWebpackConfig.entry = {
  system: ['./src/system.js']
}

const elementsSCSSRelativePathFromRoot = './src/styles/elements'
const elementsSCSS = fs
  .readdirSync(path.resolve(__dirname, '..', elementsSCSSRelativePathFromRoot))
  .filter(name => name.indexOf('.') !== 0)
  .map(name => path.resolve(elementsSCSSRelativePathFromRoot, name))
  .map(absolutePath =>
    fs.readdirSync(absolutePath)
      .filter(name => /.scss$/.test(name))
      .map(relativePath => path.resolve(absolutePath, relativePath))
  )
  .reduce((collector, entry) => [...collector, ...entry], [])

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
        './src/styles/_functions.scss',
        ...elementsSCSS
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
  ])
]

if (isProductionBuild) {
  plugins.push(new PeerDepsExternalsPlugin())
}

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

module.exports = webpackConfig
