import { mount } from '@vue/test-utils'
import GeoTrimmedContent from '@/elements/GeoTrimmedContent/GeoTrimmedContent.vue'
import GeoTooltip from '@/elements/GeoTooltip/GeoTooltip.vue'

// Helper function to create wrapper with registered components
function createWrapper (component, options = {}) {
  return mount(component, Object.assign({
    global: {
      components: {
        'geo-trimmed-content': GeoTrimmedContent
      },
      stubs: {
        GeoTooltip
      }
    }
  }, options))
}

describe('GeoTrimmedContent', () => {
  it('Should render content', function () {
    const wrapper = createWrapper(GeoTrimmedContent, {
      slots: {
        default: '<div class="my-content">Custom content</div>'
      }
    })
    const trimmedContent = wrapper.find('.geo-trimmed-content')
    expect(trimmedContent.exists()).toBe(true)
    expect(wrapper.find('.my-content').exists()).toBe(true)
    expect(wrapper.find('.my-content').text()).toEqual('Custom content')
  })

  it('Should complain if tooltipPosition is invalid', function () {
    const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })

    const wrapper = createWrapper(GeoTrimmedContent, {
      props: {
        tooltipPosition: 'invalid position'
      },
      slots: {
        default: '<div class="my-content">Custom content</div>'
      }
    })
    const trimmedContent = wrapper.find('.geo-trimmed-content')
    expect(trimmedContent.exists()).toBe(true)
    expect(consoleWarnSpy).toHaveBeenCalled()
  })

  it('Should complain if tooltipAlignment is invalid', function () {
    const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })

    const wrapper = createWrapper(GeoTrimmedContent, {
      props: {
        tooltipAlignment: 'invalid alignment'
      },
      slots: {
        default: '<div class="my-content">Custom content</div>'
      }
    })
    const trimmedContent = wrapper.find('.geo-trimmed-content')
    expect(trimmedContent.exists()).toBe(true)
    expect(consoleWarnSpy).toHaveBeenCalled()
  })
})
