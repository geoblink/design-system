import { mount } from '@vue/test-utils'
import GeoInputPrefix from '@/elements/GeoInput/GeoInputPrefix.vue'

describe('GeoInputPrefix', function () {
  it('Should render', function () {
    const wrapper = mount(GeoInputPrefix)
    expect(wrapper.find('.geo-input-prefix').exists()).toBe(true)
  })

  it('Should render default slot when provided', function () {
    const wrapper = mount(GeoInputPrefix, {
      slots: {
        default: '<p class="my-prefix">Prefix</p>'
      }
    })
    expect(wrapper.find('.my-prefix').exists()).toBe(true)
  })
})
