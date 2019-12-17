import './styles/index.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import GeoblinkDesignSystem from '../src/system'

// We only want to load this in client-side rendering.
if (typeof window !== 'undefined') {
  require('../src/utils/webFontLoader')
}

const _ = require('@geoblink/lodash-mixins').default(require('lodash'))

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
const mockedNonExistingIcons = _.mapValues(nonExistingIconsToMock, function (mockedIconKey, originalIconName) {
  return _.assign({}, fas[mockedIconKey], {
    prefix: 'fal',
    iconName: originalIconName
  })
})

library.add(fab, fas, far, mockedFalIcons, mockedNonExistingIcons)

export default ({ Vue }) => {
  Vue.component('font-awesome-icon', FontAwesomeIcon)
  Vue.use(GeoblinkDesignSystem)
}
