/**
 * This is Vue Design System’s JS helper file for docs.
 * You can add more things if/when needed.
 */
import Vue from 'vue'
import WebFontLoader from '../src/utils/webFontLoader' // eslint-disable-line no-unused-vars
import statusLabels from './utils/statusLabels'
import activeNav from './utils/activeNav'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.mixin(statusLabels)
Vue.mixin(activeNav)

library.add(fab, fas, far)
