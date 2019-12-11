const path = require('path')
const glob = require('glob')
const chalk = require('chalk')
const Listr = require('listr')
const _ = require('lodash')

const markdownComponentsUtils = require('./markdown-components.utils')

const mainTask = new Listr([
  markdownComponentsUtils.deleteOldContent(),
  getComponentsToDocumentTask(),
  prepareBaseDocumentationTask(),
  injectComponentsExamplesTask()
], { showSubtasks: false })

mainTask.run().catch(function (error) {
  // eslint-disable-next-line no-console
  console.log(chalk.red('  Design System Markdown documentation for components build failed with errors.\n'))
  console.error(error)
  process.exit(1)
})

/**
 * @template T
 * @typedef {Object} Task
 * @property {string} title
 * @property {(ctx: any) => Promise<T> | T} task
 */

/**
 * @returns {Task<Array<string>>}
 */
function getComponentsToDocumentTask () {
  return {
    title: 'Find Vue components to document',
    task (ctx) {
      return new Promise(function (resolve, reject) {
        glob('**/*.vue', { cwd: markdownComponentsUtils.pathToVueComponents }, function (err, files) {
          if (err) return reject(err)

          ctx.components = files

          resolve(files)
        })
      })
    }
  }
}

/**
 * @returns {Task<any>}
 */
function prepareBaseDocumentationTask () {
  return {
    title: 'Prepare base documentation',
    task () {
      return new Listr([
        getBaseMarkdownDocumentationOfComponentsTask(),
        getExamplesOfComponentsTask()
      ], { concurrent: true })
    }
  }
}

/**
 * @returns {Task<any>}
 */
function getBaseMarkdownDocumentationOfComponentsTask () {
  return {
    title: 'Prepare base Markdown documentation of components',
    task (ctx) {
      return new Listr(
        _.map(ctx.components, (componentRelativePath) => markdownComponentsUtils.generateDocumentationOfComponent(componentRelativePath)),
        { concurrent: true }
      )
    }
  }
}

/**
 * @returns {Task<any>}
 */
function injectComponentsExamplesTask () {
  return {
    title: 'Inject components examples',
    task (ctx) {
      const tasks = _.map(ctx.exampleFiles, function (files, componentRelativePath) {
        return {
          title: `Inject examples of ${componentRelativePath}`,
          task: () => new Listr(
            _.map(files, (examplePath) => markdownComponentsUtils.injectExampleOfComponent(componentRelativePath, examplePath))
          )
        }
      })

      return new Listr(tasks, { concurrent: true })
    }
  }
}

/**
 * @returns {Task<any>}
 */
function getExamplesOfComponentsTask () {
  return {
    title: 'Get examples of components',
    task (ctx) {
      return new Listr(
        _.map(ctx.components, (componentRelativePath) => getExamplesOfComponent(componentRelativePath)),
        { concurrent: true }
      )
    }
  }

  /**
   * @param {string} componentRelativePath
   * @returns {Task<any>}
   */
  function getExamplesOfComponent (componentRelativePath) {
    return {
      title: `Get examples of ${componentRelativePath}`,
      task
    }

    function task (ctx) {
      return new Promise(function (resolve, reject) {
        glob('**/*.examples.md', {
          cwd: path.resolve(markdownComponentsUtils.pathToVueComponents, path.dirname(componentRelativePath))
        }, function (err, files) {
          if (err) return reject(err)

          if (!ctx.exampleFiles) ctx.exampleFiles = {}
          ctx.exampleFiles[componentRelativePath] = files

          resolve(files)
        })
      })
    }
  }
}
