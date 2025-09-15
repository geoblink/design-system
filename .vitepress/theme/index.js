import DefaultTheme from 'vitepress/theme'
import './styles/index.scss'
import GeoDesignSystem from '../../src/system.js'
import tokensMixin from './components/tokens.mixin.js'
import { VueLive } from 'vue-live'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import mockFontAwesomeProIcons from '../../src/utils/mockFontAwesomeProIcons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fab, fas, far)
mockFontAwesomeProIcons(library)

const componentFiles = import.meta.glob('./components/**/*.vue', { eager: true })


export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // Register the design system
    app.use(GeoDesignSystem)

    // Auto-register all components from .vitepress/theme/components
    Object.entries(componentFiles).forEach(([path, component]) => {
      const pathParts = path.split('/')
      const fileName = pathParts.pop().replace('.vue', '')
      const directoryName = pathParts[pathParts.length - 1]
      
      // For constants components, use the full path structure
      if (path.includes('/constants/')) {
        const componentName = `constants-${directoryName}-${fileName}`
        app.component(componentName, component.default || component)
      } else {
        // For regular components, use just the filename
        app.component(fileName, component.default || component)
      }
    })
    
    // Register tokens mixin
    app.mixin(tokensMixin)
    
    // Register external components
    app.component('VueLive', VueLive)
    app.component('FontAwesomeIcon', FontAwesomeIcon)


  }
} 