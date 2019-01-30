const vueDirectiveTooltip = (function () {
  try {
    const vueDirectiveTooltip = require('vue-directive-tooltip')
    let vueDirectiveTooltipConfig = null
    // We need this since `vue-directive-tooltip` does not expose directive's
    // config explicitly
    vueDirectiveTooltip.install({
      directive (name, config) {
        vueDirectiveTooltipConfig = config
      }
    })
    return vueDirectiveTooltipConfig
  } catch (error) {
    return null
  }
})()

const tooltipDirective = vueDirectiveTooltip || { }

export default tooltipDirective
