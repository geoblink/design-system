import { createLocalVue, mount } from '@vue/test-utils'
import GeoTrimmedContent from '@/elements/GeoTrimmedContent/GeoTrimmedContent.vue'
import GeoTooltip from '@/elements/GeoTooltip/GeoTooltip.vue'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-trimmed-content', GeoTrimmedContent)

jest.mock('vue-directive-tooltip')

describe('GeoTrimmedContent', () => {
  it('Should render content', function () {
    const wrapper = mount(GeoTrimmedContent, {
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

  it('Should apply CSS suffix when the modifier is provided', function () {
    const wrapper = mount(GeoTrimmedContent, {
      propsData: {
        cssModifier: 'demo-modifier'
      },
      stubs: {
        GeoTooltip
      }
    })
    const trimmedContent = wrapper.find('.geo-trimmed-content--demo-modifier')
    expect(trimmedContent.exists()).toBe(true)
  })
})
