const fas = (function () {
  try {
    return require('@fortawesome/free-solid-svg-icons')
  } catch (error) {
    return null
  }
})()

const _ = require('lodash')

export default function mockFontAwesomeProIcons (library) {
  if (!fas) throw new Error('To mock FontAwesome pro icons you must install @fortawesome/free-solid-svg-icons')

  const iconsToMock = [
    'faChevronUp',
    'faChevronDown',
    'faChevronLeft',
    'faChevronRight',
    'faStepBackward',
    'faStepForward',
    'faCaretUp',
    'faCaretDown',
    'faLock',
    'faUpload',
    'faCheckCircle',
    'faExclamationTriangle',
    'faLightbulb',
    'faThumbsUp',
    'faEllipsisV',
    'faTimes',
    'faCheck',
    'faSearch'
  ]

  const mockedFalIcons = _.mapValues(_.pick(fas, iconsToMock), function (original) {
    return _.assign({}, original, {
      prefix: 'fal'
    })
  })

  const nonExistingIconsToMock = {
    'external-link-square': 'faExternalLinkSquareAlt',
    'lock-alt': 'faLock'
  }
  const mockedNonExistingIcons = _.mapValues(
    nonExistingIconsToMock,
    (mockedIconKey, originalIconName) => _.assign({}, fas[mockedIconKey], {
      prefix: 'fal',
      iconName: originalIconName
    })
  )

  library.add(mockedFalIcons, mockedNonExistingIcons)
}
