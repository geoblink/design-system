import { mount } from '@vue/test-utils'
import GeoCircle from '@/elements/GeoCircle/GeoCircle.vue'

describe('GeoCircle', () => {
  it('Should render', function () {
    const wrapper = mount(GeoCircle)
    expect(wrapper.find('.geo-circle').exists()).toBe(true)
  })

  it('Should use proper variant', function () {
    const wrapper = mount(GeoCircle, {
      propsData: {
        variant: 'primary'
      }
    })

    expect(wrapper.find('.geo-primary-circle').exists()).toBe(true)
  })
})
