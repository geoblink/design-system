const path = require('path')
const aws = require('./aws')
const logger = require('./logger')
const cli = require('./cli')
const git = require('./git')

const packageInfo = require('../package.json')

if (process.argv.length < 3) logUsageAndExit()

const bucketName = cli.getArgv(2)
if (bucketName === '') logUsageAndExit()

const optionalVersionAlias = cli.getArgv(3)

const CONSTANTS = require('./constants')
const region = CONSTANTS.region

logSettings()

const docsLocalPath = path.resolve(__dirname, '../.vuepress/dist')
const packageVersion = packageInfo.version
const packageVersionTargetPrefix = `design-system/${packageVersion}`

uploadDocsToS3({
  region,
  localPath: docsLocalPath,
  bucketName,
  targetPrefix: packageVersionTargetPrefix
})

const commitHash = git.getCurrentCommitHash()
const commitHashTargetPrefix = `design-system/${commitHash}`

uploadDocsToS3({
  region,
  localPath: docsLocalPath,
  bucketName,
  targetPrefix: commitHashTargetPrefix
})

if (optionalVersionAlias) {
  const optionalVersionAliasPrefix = `design-system/${optionalVersionAlias}`

  uploadDocsToS3({
    region,
    localPath: docsLocalPath,
    bucketName,
    targetPrefix: optionalVersionAliasPrefix
  })
}

logger.success('Documentation published!')

/**
 * @param {object} params
 * @param {string} params.region
 * @param {string} params.localPath
 * @param {string} params.bucketName
 * @param {string} params.targetPrefix
 */
function uploadDocsToS3 (params) {
  logger.debug(`Uploading ${logger.color.yellow}${params.localPath}${logger.color.off} to ${logger.color.blue}s3://${bucketName}/${params.targetPrefix}${logger.color.off}`)

  aws.syncFolderToS3(params)

  logger.info(`Docs from ${logger.color.yellow}${params.localPath}${logger.color.off} successfully uploaded to ${logger.color.blue}http://${bucketName}.s3-website-${params.region}.amazonaws.com/${params.targetPrefix}${logger.color.off}!`)
}

function logUsageAndExit () {
  logUsage()
  process.exit(-1)
}

function logUsage () {
  logger.raw('Usage:')
  logger.raw('')
  logger.raw(`  ${logger.color.blue}node ${__filename}${logger.color.off} ${logger.color.magenta}<BUCKET_NAME>${logger.color.off} ${logger.color.magenta}[ALIAS]${logger.color.off}`)
  logger.raw('')
  logger.raw(`    ${logger.color.magenta}<BUCKET_NAME>${logger.color.off} name of the S3 bucket to publish to (example: ${logger.color.yellow}geoblink-app-docs${logger.color.off})`)
  logger.raw(`    ${logger.color.magenta}[ALIAS]${logger.color.off} (optional) alias under which this version will be also published to the S3 bucket (example: ${logger.color.yellow}master${logger.color.off})`)
  logger.raw('')
}

function logSettings () {
  logger.info('Settings:')
  logger.info(`${logger.color.magenta}BUCKET_NAME${logger.color.off}=${logger.color.yellow}${bucketName}${logger.color.off}`)
  logger.info(`${logger.color.magenta}ALIAS${logger.color.off}=${logger.color.yellow}${optionalVersionAlias}${logger.color.off}`)
}
