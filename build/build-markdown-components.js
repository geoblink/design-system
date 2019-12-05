const bt = require('@babel/types')
const path = require('path')
const glob = require('glob')
const rm = require('rimraf')
const ora = require('ora')
const chalk = require('chalk')
const npm = require('npm')
const fs = require('fs')

const pathToRootFolder = path.resolve(__dirname, '..')
const pathToResultingMarkdownDocumentation = path.resolve(pathToRootFolder, './docs/components')
const pathToResultingConstantsComponents = path.resolve(pathToRootFolder, '.vuepress/components/constants')
const pathToMarkdownComponents = path.resolve(pathToRootFolder, './src/elements')

const vueDocs = require('vue-docgen-api')

const spinner = ora() // Building Design System Markdown documentation for components')

deleteOldContent()
  .then(() => getComponentsToDocument())
  .then((files) => loadNPM().then(() => files))
  .then(async function (files) {
    for (const componentPath of files) {
      await generateDocumentationOfComponent(pathToMarkdownComponents, componentPath)
      const examples = await getExamplesOfComponent(path.resolve(pathToMarkdownComponents, componentPath))

      for (const examplePath of examples) {
        await injectExampleOfComponent(path.resolve(pathToMarkdownComponents, componentPath), examplePath)
      }
    }
  })
  .catch(function (error) {
    // eslint-disable-next-line no-console
    console.log(chalk.red('  Design System Markdown documentation for components build failed with errors.\n'))
    console.error(error)
    process.exit(1)
  })

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

async function deleteOldContent () {
  spinner.start('Clean up previous Markdown files')

  await new Promise(function (resolve, reject) {
    spinner.succeed()

    rm(pathToResultingMarkdownDocumentation, function (err) {
      if (err) return reject(err)
      resolve()
    })
  })

  spinner.start('Clean up previous Vue constants components')

  await new Promise(function (resolve, reject) {
    spinner.succeed()

    rm(pathToResultingConstantsComponents, function (err) {
      if (err) return reject(err)
      resolve()
    })
  })
}

/**
 * @returns {Promise<Array<string>>}
 */
function getComponentsToDocument () {
  spinner.start('Find Vue components to document')

  return new Promise(function (resolve, reject) {
    // return resolve(['GeoChart/GeoChart.vue'])
    glob('**/*.vue', { cwd: pathToMarkdownComponents }, function (err, files) {
      if (err) {
        spinner.fail()
        return reject(err)
      }

      spinner.succeed()

      resolve(files)
    })
  })
}

/**
 * @returns {Promise<void>}
 */
function loadNPM () {
  spinner.start('Load NPM config')

  return new Promise(function (resolve, reject) {
    npm.load(function (err) {
      if (err) {
        spinner.fail()
        return reject(err)
      }

      spinner.succeed()

      resolve()
    })
  })
}

/**
 * @param {string} pathToMarkdownComponents
 * @param {string} componentPath
 * @returns {Promise<void>}
 */
function generateDocumentationOfComponent (pathToMarkdownComponents, componentPath) {
  spinner.start(`Generate documentation for ${componentPath}`)

  const documentation = vueDocs.parse(path.resolve(pathToMarkdownComponents, componentPath), {
    addScriptHandlers: [
      extractRelease,
      extractStatus
    ],
    jsx: false
  })

  return new Promise(function (resolve, reject) {
    npm.commands['run-script']([
      'docs:build:markdown:component',
      '--path',
      componentPath,
      '--jsonDocumentation',
      JSON.stringify(documentation)
        .replace(/\$/gi, '\\$')
        .replace(/`/gi, '\\`')
        .replace(/\n/gi, '\\n')
    ], function (err) {
      if (err) {
        spinner.fail()
        return reject(err)
      }

      spinner.succeed()

      resolve()
    })
  })
}

/**
 * @param {string} componentPath
 * @returns {Promise<Array<string>>}
 */
function getExamplesOfComponent (componentPath) {
  spinner.start(`Get examples of ${componentPath}`)

  return new Promise(function (resolve, reject) {
    glob('**/*.examples.md', { cwd: path.dirname(componentPath) }, function (err, files) {
      if (err) {
        spinner.fail()
        return reject(err)
      }

      spinner.succeed()

      resolve(files)
    })
  })
}

/**
 * @param {string} componentPath
 * @param {string} examplePath
 * @returns {Promise<void>}
 */
async function injectExampleOfComponent (componentPath, examplePath) {
  const absolutePathToExample = path.resolve(path.dirname(componentPath), examplePath)
  const relativePathToExample = path.relative(
    path.resolve(__dirname, '..'),
    absolutePathToExample
  )
  const relativePathToComponent = path.relative(
    pathToMarkdownComponents,
    componentPath
  )

  spinner.start(`Read example at ${relativePathToExample}`)

  const exampleCode = await new Promise(function (resolve, reject) {
    fs.readFile(absolutePathToExample, function (err, buffer) {
      if (err) {
        spinner.fail()
        return reject(err)
      }

      spinner.succeed()

      resolve(buffer.toString())
    })
  })

  spinner.start(relativePathToComponent)
  spinner.succeed(relativePathToComponent)

  return new Promise(function (resolve, reject) {
    spinner.start(`Inject example at ${examplePath}`)

    npm.commands['run-script']([
      'docs:build:markdown:example',
      '--path',
      relativePathToComponent,
      '--exampleMarkdownCode',
      exampleCode
        .replace(/\$/gi, '\\$')
        .replace(/`/gi, '\\`')
        .replace(/\n/gi, '\\n')
    ], function (err) {
      if (err) {
        spinner.fail()
        return reject(err)
      }

      spinner.succeed()

      resolve()
    })
  })
}
