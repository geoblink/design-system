'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.system.conf')
const utils = require('./utils')
const fs = require('fs-extra')

const spinner = ora('Building Design System Library...')
spinner.start()

rm(path.join(config.system.assetsRoot, config.system.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n'
    )

    if (stats.hasErrors()) {
      // eslint-disable-next-line no-console
      console.log(chalk.red('  Design System Library build failed with errors.\n'))
      process.exit(1)
    }

    cleanupSCSSAutomaticStyles()
      .then(function () {
        // eslint-disable-next-line no-console
        console.log(chalk.cyan('  Design System Library build complete.\n'))
        // eslint-disable-next-line no-console
        console.log(
          chalk.yellow(
            '  Tip: You can now publish your library as a private NPM module.\n' +
            "  Users can import it as an ES6 module: import DesignSystem from 'system'\n"
          )
        )
      })
      .catch(function (error) {
        // eslint-disable-next-line no-console
        console.log(chalk.red('  Design System SCSS cleanup failed with errors.\n'))
        console.error(error)
        process.exit(1)
      })
  })
})

async function cleanupSCSSAutomaticStyles () {
  const spinner = ora('Cleaning up Design System SCSS...')
  spinner.start()

  const pathToSCSSStyles = path.join(config.system.assetsRoot, utils.assetsSystemPath('system.utils.scss'))

  const originalContent = (await fs.readFile(pathToSCSSStyles)).toString()
  const contentWithoutDefaultModifierAutomaticInitialization = originalContent.replace(
    /@include\s+geo-.*-make\s*\(''\);/gi,
    ''
  )

  await fs.writeFile(pathToSCSSStyles, contentWithoutDefaultModifierAutomaticInitialization)

  spinner.stop()
}
