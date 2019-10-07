import { mount } from '@vue/test-utils'
import GeoBorderedBoxColumn from '@/elements/GeoBorderedBox/GeoBorderedBoxColumn.vue'

describe('GeoBorderedBoxColumn', function () {
  it('Should render GeoBorderedBoxColumn component', function () {
    const wrapper = mount(GeoBorderedBoxColumn)
    expect(wrapper.find('.geo-bordered-box-column').exists()).toBe(true)
  })

  it('Should render default slot', function () {
    const wrapper = mount(GeoBorderedBoxColumn, {
      slots: {
        default: [`<span class="my-demo-content">Just some unique demo content</span>`]
      }
    })
    expect(wrapper.find('.my-demo-content').exists()).toBe(true)
  })

  it('Should apply a CSS suffix when the modifier is provided', function () {
    const wrapper = mount(GeoBorderedBoxColumn, {
      propsData: {
        cssModifier: 'test'
      }
    })
    expect(wrapper.find('.geo-bordered-box-column--test').exists()).toBe(true)
  })
})
