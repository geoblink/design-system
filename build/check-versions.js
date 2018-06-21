'use strict'
const chalk = require('chalk')
const semver = require('semver')
const packageConfig = require('../package.json')
const shell = require('shelljs')
function exec (cmd) {
  return require('child_process')
    .execSync(cmd)
    .toString()
    .trim()
}

const versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  }
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
  const warnings = []
  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(
        mod.name + ': ' + chalk.red(mod.currentVersion) + ' should be ' + chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    // eslint-disable-next-line no-console
    console.log('')
    // eslint-disable-next-line no-console
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    // eslint-disable-next-line no-console
    console.log()
    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      // eslint-disable-next-line no-console
      console.log('  ' + warning)
    }
    // eslint-disable-next-line no-console
    console.log()
    process.exit(1)
  }
}
