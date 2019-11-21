import { mount } from '@vue/test-utils'
import GeoInputSuffix from '@/elements/GeoInput/GeoInputSuffix.vue'

describe('GeoInputSuffix', function () {
  it('Should render', function () {
    const wrapper = mount(GeoInputSuffix)
    expect(wrapper.find('.geo-input-suffix').exists()).toBe(true)
  })

  it('Should render default slot when provided', function () {
    const wrapper = mount(GeoInputSuffix, {
      slots: {
        default: '<p class="my-suffix">Suffix</p>'
      }
    })
    expect(wrapper.find('.my-suffix').exists()).toBe(true)
  })
})
