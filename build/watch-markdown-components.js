const path = require('path')
const fs = require('fs-extra')
const chokidar = require('chokidar')
const ora = require('ora')
const Listr = require('listr')

const markdownComponentsUtils = require('./markdown-components.utils')

const spinner = ora()

watchComponentsToDocument()

function watchComponentsToDocument () {
  spinner.start('Find Vue components to document')

  chokidar.watch('*/*.vue', {
    cwd: markdownComponentsUtils.pathToVueComponents,
    ignoreInitial: true
  })
    .on('add', componentRelativePath => handleComponentFileChanged(spinner, componentRelativePath))
    .on('change', componentRelativePath => handleComponentFileChanged(spinner, componentRelativePath))
    .on('unlink', componentRelativePath => deleteComponentMarkdownDocumentation(spinner, componentRelativePath))

  chokidar.watch('**/*.md', {
    cwd: markdownComponentsUtils.pathToVueComponents,
    ignoreInitial: true
  })
    .on('add', (exampleRelativePath) => handleExampleFileChanged(spinner, exampleRelativePath))
    .on('change', (exampleRelativePath) => handleExampleFileChanged(spinner, exampleRelativePath))
    .on('unlink', (exampleRelativePath) => handleExampleFileChanged(spinner, exampleRelativePath))

  spinner.succeed()

  spinner.info('Documentation is prepared, run `yarn docs` to start Vuepress site')
}

/**
 * @param {ora.Ora} spinner
 * @param {string} pathToVueComponent
 * @returns {Promise<void>}
 */
async function deleteComponentMarkdownDocumentation (spinner, pathToVueComponent) {
  const relativePathToComponent = path.relative(
    markdownComponentsUtils.pathToVueComponents,
    pathToVueComponent
  )

  spinner.info(`${relativePathToComponent} deleted!`)

  const absolutePathToResultingMarkdownDocumentation = path.resolve(
    markdownComponentsUtils.pathToResultingMarkdownDocumentation,
    relativePathToComponent
  )
  const absolutePathToResultingConstantsComponent = path.resolve(
    markdownComponentsUtils.pathToResultingConstantsComponents,
    path.dirname(relativePathToComponent),
    `${path.basename(relativePathToComponent, '.vue')}Constants.vue`
  )

  const tasks = [{
    title: `Delete ${absolutePathToResultingMarkdownDocumentation}`,
    task: () => fs.unlink(absolutePathToResultingMarkdownDocumentation)
  }, {
    title: `Delete ${absolutePathToResultingConstantsComponent}`,
    task: () => fs.unlink(absolutePathToResultingConstantsComponent)
  }]

  const mainTask = new Listr(tasks, { concurrent: true })

  await mainTask.run()
}

/**
 * @param {ora.Ora} spinner
 * @param {string} changedComponentFileRelativePath
 * @returns {Promise<void>}
 */
async function handleComponentFileChanged (spinner, changedComponentFileRelativePath) {
  spinner.info(`${changedComponentFileRelativePath} changed!`)

  await generateDocumentationOfComponent(changedComponentFileRelativePath)
}

/**
 * @param {string} componentRelativePath
 * @return {Promise<void>}
 */
async function generateDocumentationOfComponent (componentRelativePath) {
  const generateBaseDocumentationTask = markdownComponentsUtils.generateDocumentationOfComponent(componentRelativePath)
  const injectExamplesTask = markdownComponentsUtils.injectExamplesOfComponent(componentRelativePath)

  const task = new Listr([
    generateBaseDocumentationTask,
    injectExamplesTask
  ])

  await task.run()
}

/**
 * @param {ora.Ora} spinner
 * @param {string} changedExampleFileRelativePath
 * @returns {Promise<void>}
 */
async function handleExampleFileChanged (spinner, changedExampleFileRelativePath) {
  spinner.info(`${changedExampleFileRelativePath} changed!`)

  await generateDocumentationOfComponentExample(changedExampleFileRelativePath)
}

/**
 * @param {string} exampleRelativePath
 * @return {Promise<void>}
 */
async function generateDocumentationOfComponentExample (exampleRelativePath) {
  const folderName = path.dirname(exampleRelativePath)
  const exampleName = path.basename(exampleRelativePath)

  const absolutePathToExampleComponent = path.resolve(
    markdownComponentsUtils.pathToVueComponents,
    folderName,
    `${exampleName.replace(/([^.]+)\..*/i, '$1')}.vue`
  )
  const absolutePathToFallbackComponent = path.resolve(
    markdownComponentsUtils.pathToVueComponents,
    folderName,
    `${folderName}.vue`
  )

  const relativePathToExampleComponent = path.relative(
    markdownComponentsUtils.pathToVueComponents,
    absolutePathToExampleComponent
  )
  const relativePathToFallbackComponent = path.relative(
    markdownComponentsUtils.pathToVueComponents,
    absolutePathToFallbackComponent
  )

  if (fs.existsSync(absolutePathToExampleComponent)) return generateDocumentationOfComponent(relativePathToExampleComponent)
  if (fs.existsSync(absolutePathToFallbackComponent)) return generateDocumentationOfComponent(relativePathToFallbackComponent)

  if (path.dirname(exampleRelativePath) === exampleRelativePath) {
    throw new Error(`Could not infer component for example at ${exampleRelativePath}`)
  }

  return generateDocumentationOfComponentExample(path.dirname(exampleRelativePath))
}
