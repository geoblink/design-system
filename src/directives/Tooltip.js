import vueDirectiveTooltip from 'vue-directive-tooltip'

let vueDirectiveTooltipConfig = null

// We need this since `vue-directive-tooltip` does not expose directive's
// config explicitly
vueDirectiveTooltip.install({
  directive (name, config) {
    vueDirectiveTooltipConfig = config
  }
})

const tooltipDirective = vueDirectiveTooltipConfig || { }

export default tooltipDirective
