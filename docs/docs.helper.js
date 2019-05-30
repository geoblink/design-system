/**
 * This is Vue Design System’s JS helper file for docs.
 * You can add more things if/when needed.
 */
import Vue from 'vue'
import _ from 'lodash'
import '../src/utils/webFontLoader'
import statusLabels from './utils/statusLabels'
import activeNav from './utils/activeNav'
import filterSearch from './utils/filterSearch'
import 'codemirror/mode/jsx/jsx'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.mixin(statusLabels)

document.addEventListener('DOMContentLoaded', () => {
  filterSearch.methods.init()
  activeNav.methods.init()
})

window.addEventListener('hashchange', () => {
  filterSearch.methods.init()
  activeNav.methods.init()
})

const iconsToMock = [
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
  'faThumbsUp'
]
const mockedFalIcons = _.mapValues(_.pick(fas, iconsToMock), function (original) {
  return _.assign({}, original, {
    prefix: 'fal'
  })
})

library.add(fab, fas, far, mockedFalIcons)
