/**
 * This is Vue Design System’s JS helper file for docs.
 * You can add more things if/when needed.
 */
import Vue from 'vue'
import WebFontLoader from '../src/utils/webFontLoader' // eslint-disable-line no-unused-vars
import statusLabels from './utils/statusLabels'
import activeNav from './utils/activeNav'

import fontawesome from '@fortawesome/fontawesome'
import faFreeBrands from '@fortawesome/fontawesome-free-brands'
import faFreeSolid from '@fortawesome/fontawesome-free-solid'
import faFreeRegular from '@fortawesome/fontawesome-free-regular'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.mixin(statusLabels)
Vue.mixin(activeNav)

fontawesome.library.add(faFreeBrands, faFreeSolid, faFreeRegular)
