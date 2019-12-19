'use strict'
process.env.NODE_ENV = 'production'

const rm = require('rimraf')
const path = require('path')
const webpack = require('webpack')
const fs = require('fs-extra')
const Listr = require('listr')
const _ = require('lodash')

const config = require('../config')
const webpackConfigs = require('./webpack.system.conf')

main()

/**
 * @template T
 * @typedef {Object} Task
 * @property {string} title
 * @property {(ctx: any) => Promise<T> | T} task
 */

async function main () {
  const statsPath = path.resolve(__dirname, '..')

  const removeDistAssetsTask = getRemoveDistAssetsTask()
  const buildAssetsTask = getBuildAssetsTask()
  const writeStatsReportTask = getWriteStatsReportTask(statsPath)

  const listr = new Listr([removeDistAssetsTask, buildAssetsTask, writeStatsReportTask])
  const ctx = await listr.run()

  const webpackStats = ctx.webpackStats.system

  logWebpackStats(webpackStats)
}

/**
 * @returns {Task<any>}
 */
function getRemoveDistAssetsTask () {
  return {
    title: 'Remove previously built assets',
    task () {
      return new Promise(function (resolve, reject) {
        const pathToDistAssets = path.resolve(config.system.assetsRoot, config.system.assetsSubDirectory)
        rm(pathToDistAssets, function (error) {
          if (error) return reject(error)
          resolve()
        })
      })
    }
  }
}

/**
 * @returns {Task<any>}
 */
function getBuildAssetsTask () {
  const buildSystemTask = getBuildWebpackConfigTask('system', 'Build system library', webpackConfigs.system)
  const buildComopnentsTask = getBuildWebpackConfigTask('components', 'Build isolated components', webpackConfigs.components)
  const buildStylesTask = getBuildWebpackConfigTask('styles', 'Build isolated styles', webpackConfigs.styles)

  return {
    title: 'Build Design System',
    task () {
      return new Listr([
        buildSystemTask,
        buildComopnentsTask,
        buildStylesTask
      ], { concurrent: false })
    }
  }
}

/**
 * @param {string} id
 * @param {string} title
 * @param {webpack.Configuration} webpackConfig
 * @returns {Task<void>}
 */
function getBuildWebpackConfigTask (id, title, webpackConfig) {
  return {
    title,
    task (ctx) {
      return new Promise(function (resolve, reject) {
        webpack(webpackConfig, function (err, webpackStats) {
          if (err) return reject(err)
          if (webpackStats.hasErrors()) return reject(new Error(webpackStats.compilation.errors))

          ctx.webpackStats = ctx.webpackStats || {}
          ctx.webpackStats[id] = webpackStats

          resolve()
        })
      })
    }
  }
}

/**
 * @param {webpack.Stats} stats
 */
function logWebpackStats (stats) {
  process.stdout.write(
    stats.toString({
      colors: true,
      children: false,
      chunks: false,
      chunkModules: false,
      entrypoints: false,
      modules: false,
      performance: true
    }) + '\n\n'
  )
}

/**
 * @param {string} statsFolderPath
 * @returns {Task<any>}
 */
function getWriteStatsReportTask (statsFolderPath) {
  return {
    title: 'Write webpack statistics',
    task (ctx) {
      const tasks = _.map(ctx.webpackStats, function (stats, id) {
        const jsonStats = stats.toJson()
        const statsPath = path.resolve(statsFolderPath, `webpack.stats.${id}.json`)

        return {
          title: `Write statistics for ${id}`,
          task: () => fs.writeFile(statsPath, JSON.stringify(jsonStats))
        }
      })

      return new Listr(tasks, { concurrent: true })
    }
  }
}
