const logger = require('./logger')
const shell = require('./shell')

module.exports = {
  syncFolderToS3
}

/**
 * @param {object} params
 * @param {string} params.region
 * @param {string} params.localPath
 * @param {string} params.bucketName
 * @param {string} params.targetPrefix
 */
function syncFolderToS3 (params) {
  logger.debug('Uploading folder to S3')

  const {
    stderr,
    status
  } = shell.spawnSync('aws', [
    's3',
    'sync',
    params.localPath,
    `s3://${params.bucketName}/${params.targetPrefix}`,
    '--region',
    params.region,
    '--delete'
  ], { encoding: 'utf-8' })

  if (status !== 0) throw new Error(stderr)

  logger.info('Folder uploaded to S3')
}
