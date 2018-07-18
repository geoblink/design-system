/**
 * Web Font Loader takes care of Vue Design System’s font loading.
 * For full documentation, see: https://github.com/typekit/webfontloader
 */
import WebFont from 'webfontloader'

WebFont.load({
  google: {
    families: [
      'Montserrat:300,400,400i,600,700',
      'Lato:300,400,400i,600,700'
    ]
  }
})
