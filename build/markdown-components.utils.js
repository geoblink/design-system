const path = require('path')
const execa = require('execa')
const bt = require('@babel/types')
const vueDocs = require('vue-docgen-api')
const rm = require('rimraf')
const glob = require('glob')
const _ = require('lodash')
const Listr = require('listr')

const pathToRootFolder = path.resolve(__dirname, '..')
const pathToResultingMarkdownDocumentation = path.resolve(pathToRootFolder, './docs/components')
const pathToResultingConstantsComponents = path.resolve(pathToRootFolder, '.vuepress/components/constants')
const pathToVueComponents = path.resolve(pathToRootFolder, './src/elements')

/**
 * @template T
 * @typedef {Object} Task
 * @property {string} title
 * @property {() => Promise<T>} task
 */

module.exports = {
  pathToResultingMarkdownDocumentation,
  pathToResultingConstantsComponents,
  pathToVueComponents,
  deleteOldContent,
  generateDocumentationOfComponent,
  injectExamplesOfComponent,
  injectExampleOfComponent
}

/**
 * @returns {Task<void>}
 */
function deleteOldContent () {
  return {
    title: 'Clean up previous Markdown files',
    task
  }

  async function task () {
    const promise = Promise.all([
      new Promise(function (resolve, reject) {
        rm(pathToResultingMarkdownDocumentation, function (err) {
          if (err) return reject(err)
          resolve()
        })
      }),

      new Promise(function (resolve, reject) {
        rm(pathToResultingConstantsComponents, function (err) {
          if (err) return reject(err)
          resolve()
        })
      })
    ])

    await promise
  }
}

/**
 * @param {string} componentRelativePath
 * @returns {Task<void>}
 */
function generateDocumentationOfComponent (componentRelativePath) {
  return {
    title: `Generate documentation for ${componentRelativePath}`,
    task
  }

  async function task () {
    const documentation = vueDocs.parse(path.resolve(pathToVueComponents, componentRelativePath), {
      addScriptHandlers: [
        extractRelease,
        extractStatus
      ],
      jsx: false
    })

    await execa('yarn', [
      'docs:build:markdown:component',
      '--path',
      componentRelativePath,
      '--jsonDocumentation',
      JSON.stringify(documentation)
        .replace(/'/gi, '&#39;')
        .replace(/\n/gi, '\\n')
    ], {
      cwd: path.resolve(__dirname, '..')
    })
  }
}

function extractRelease (documentation, componentDefinition, astPath, opt) {
  if (bt.isObjectExpression(componentDefinition.node)) {
    const releasePath = componentDefinition
      .get('properties')
      .filter(
        (p) =>
          bt.isObjectProperty(p.node) &&
          p.node.key.name === 'release'
      )

    if (releasePath.length) {
      const releaseValue = releasePath[0].get('value').node.value
      documentation.set('release', releaseValue)
    }
  }
}

function extractStatus (documentation, componentDefinition, astPath, opt) {
  if (bt.isObjectExpression(componentDefinition.node)) {
    const statusPath = componentDefinition
      .get('properties')
      .filter(
        (p) =>
          bt.isObjectProperty(p.node) &&
          p.node.key.name === 'status'
      )

    if (statusPath.length) {
      const statusValue = statusPath[0].get('value').node.value
      documentation.set('status', statusValue)
    }
  }
}

/**
 * @returns {Task<any>}
 */
function injectExamplesOfComponent (componentRelativePath) {
  const componentName = path.basename(componentRelativePath, '.vue')

  return {
    title: `Inject examples of component ${componentRelativePath}`,
    async task () {
      const files = await new Promise(function (resolve, reject) {
        glob('**/*.examples.md', {
          cwd: path.resolve(pathToVueComponents, path.dirname(componentRelativePath))
        }, function (err, files) {
          if (err) return reject(err)

          const componentExampleFiles = _.filter(
            files,
            (name) => _.startsWith(name, `${componentName}.`)
          )

          resolve(componentExampleFiles)
        })
      })

      const tasks = _.map(files, (examplePath) => injectExampleOfComponent(componentRelativePath, examplePath))

      return new Listr(tasks, { concurrent: false })
    }
  }
}

/**
 * @param {string} componentRelativePath
 * @param {string} exampleRelativePath
 * @returns {Task<void>}
 */
function injectExampleOfComponent (componentRelativePath, exampleRelativePath) {
  const componentAbsolutePath = path.resolve(
    pathToVueComponents,
    componentRelativePath
  )
  const absolutePathToExample = path.resolve(path.dirname(componentAbsolutePath), exampleRelativePath)

  return {
    title: `Handle example at ${exampleRelativePath}`,
    task
  }

  async function task () {
    await execa('yarn', [
      'docs:build:markdown:example',
      '--path',
      componentRelativePath,
      '--exampleMarkdownPath',
      absolutePathToExample
    ], {
      cwd: path.resolve(__dirname, '..')
    })
  }
}
