import './styles/index.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import mockFontAwesomeProIcons from '../src/utils/mockFontAwesomeProIcons'
import GeoblinkDesignSystem from '../src/system'

// We only want to load this in client-side rendering.
if (typeof window !== 'undefined') {
  require('../src/utils/webFontLoader')
}

library.add(fab, fas, far)
mockFontAwesomeProIcons(library)

export default ({ Vue }) => {
  Vue.component('font-awesome-icon', FontAwesomeIcon)
  Vue.use(GeoblinkDesignSystem)
}
