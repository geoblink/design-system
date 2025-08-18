const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  modulePaths: ['<rootDir>'],
  moduleFileExtensions: ['js', 'json', 'vue'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@vue/test-utils': '<rootDir>/node_modules/@vue/test-utils/dist/vue-test-utils.cjs.js',
    '^vue-template-compiler$': '<rootDir>/node_modules/@vue/compiler-sfc'
  },
  transform: {
    '.*\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.vue$': ['<rootDir>/node_modules/@vue/vue3-jest', {
      compilerOptions: {
        compatConfig: {
          MODE: 2
        }
      }
    }]
  },
  testResultsProcessor: '<rootDir>/node_modules/jest-junit-reporter',
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
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
