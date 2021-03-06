const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  modulePaths: ['<rootDir>'],
  moduleFileExtensions: ['js', 'json', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '.*\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.vue$': '<rootDir>/node_modules/vue-jest'
  },
  testResultsProcessor: '<rootDir>/node_modules/jest-junit-reporter',
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  setupFiles: ['<rootDir>/test/unit/setup'],
  coverageDirectory: '<rootDir>/test/unit/coverage',
  coverageReporters: ['json', 'text', 'html', 'lcov'],
  collectCoverageFrom: [
    '<rootDir>/src/util/**/*.{js,vue}',
    '<rootDir>/src/elements/**/*.{js,vue}',
    '<rootDir>/docs/**/*.{js,vue}',
    '!<rootDir>/node_modules/**',
    '!<rootDir>/src/system.js',
    '!<rootDir>/docs/docs.helper.js',
    '!<rootDir>/docs/components/status/*'
  ],
  // TODO: Remove this on task https://geoblink.atlassian.net/browse/CORE-8494
  testPathIgnorePatterns: [
    'test/unit/specs/utils/throttle.spec.js'
  ]
}
