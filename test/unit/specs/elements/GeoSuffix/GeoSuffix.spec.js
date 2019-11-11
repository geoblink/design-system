import { mount } from '@vue/test-utils'
import GeoSuffix from '@/elements/GeoSuffix/GeoSuffix.vue'

describe('GeoSuffix', function () {
  it('Should render', function () {
    const wrapper = mount(GeoSuffix)
    expect(wrapper.find('.geo-suffix').exists()).toBe(true)
  })

  it('Should render default slot when provided', function () {
    const wrapper = mount(GeoSuffix, {
      slots: {
        default: '<p class="my-suffix">Suffix</p>'
      }
    })
    expect(wrapper.find('.my-suffix').exists()).toBe(true)
  })
})
