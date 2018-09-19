// Vue Design System: The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import WebFontLoader from '@/utils/webFontLoader' // eslint-disable-line no-unused-vars
import Meta from 'vue-meta'

// Vue Design System: Auto importing components globally
import DesignSystem from '@/system'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fab, fas, far)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(DesignSystem)
Vue.use(Meta)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App,
    FontAwesomeIcon
  },
  template: '<App/>'
})
