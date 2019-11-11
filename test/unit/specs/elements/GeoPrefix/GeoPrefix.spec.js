import { mount } from '@vue/test-utils'
import GeoPrefix from '@/elements/GeoPrefix/GeoPrefix.vue'

describe('GeoPrefix', function () {
  it('Should render', function () {
    const wrapper = mount(GeoPrefix)
    expect(wrapper.find('.geo-prefix').exists()).toBe(true)
  })

  it('Should render default slot when provided', function () {
    const wrapper = mount(GeoPrefix, {
      slots: {
        default: '<p class="my-prefix">Prefix</p>'
      }
    })
    expect(wrapper.find('.my-prefix').exists()).toBe(true)
  })
})
