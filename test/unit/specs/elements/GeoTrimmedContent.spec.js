import { createLocalVue, shallowMount } from '@vue/test-utils'
import GeoTrimmedContent from '@/elements/GeoTrimmedContent/GeoTrimmedContent.vue'
import GeoTooltip from '@/elements/GeoTooltip/GeoTooltip.vue'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-trimmed-content', GeoTrimmedContent)

describe('GeoTrimmedContent', () => {
  it('Should render content', function () {
    const wrapper = shallowMount(GeoTrimmedContent, {
      slots: {
        default: '<div class="my-content">Custom content</div>'
      },
      stubs: {
        GeoTooltip
      }
    })
    const trimmedContent = wrapper.find('.geo-trimmed-content')
    expect(trimmedContent.exists()).toBe(true)
    expect(wrapper.find('.my-content').exists()).toBe(true)
    expect(wrapper.find('.my-content').text()).toEqual('Custom content')
  })

  it('Should complain if tooltipPosition is invalid', function () {
    const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })
    const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => { })

    const wrapper = shallowMount(GeoTrimmedContent, {
      propsData: {
        tooltipPosition: 'invalid position'
      },
      slots: {
        default: '<div class="my-content">Custom content</div>'
      },
      stubs: {
        GeoTooltip
      }
    })
    const trimmedContent = wrapper.find('.geo-trimmed-content')
    expect(trimmedContent.exists()).toBe(true)
    expect(consoleErrorSpy).toHaveBeenCalled()
    expect(consoleWarnSpy).toHaveBeenCalled()
  })

  it('Should complain if tooltipAlignment is invalid', function () {
    const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })
    const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => { })

    const wrapper = shallowMount(GeoTrimmedContent, {
      propsData: {
        tooltipAlignment: 'invalid alignment'
      },
      slots: {
        default: '<div class="my-content">Custom content</div>'
      },
      stubs: {
        GeoTooltip
      }
    })
    const trimmedContent = wrapper.find('.geo-trimmed-content')
    expect(trimmedContent.exists()).toBe(true)
    expect(consoleErrorSpy).toHaveBeenCalled()
    expect(consoleWarnSpy).toHaveBeenCalled()
  })
})
