import { mount } from '@vue/test-utils'
import GeoHorizontalLayout from '@/elements/GeoHorizontalLayout/GeoHorizontalLayout.vue'

describe('GeoHorizontalLayout', function () {
  it('Should render GeoHorizontalLayout component', function () {
    const wrapper = mount(GeoHorizontalLayout)
    expect(wrapper.find('.geo-horizontal-layout').exists()).toBe(true)
  })

  it('Should render default slot', function () {
    const wrapper = mount(GeoHorizontalLayout, {
      slots: {
        default: [`<span class="my-demo-content">Just some unique demo content</span>`]
      }
    })
    expect(wrapper.find('.my-demo-content').exists()).toBe(true)
  })

  it('Should apply a CSS suffix when the modifier is provided', function () {
    const wrapper = mount(GeoHorizontalLayout, {
      propsData: {
        cssModifier: 'test'
      }
    })
    expect(wrapper.find('.geo-horizontal-layout--test').exists()).toBe(true)
  })
})
