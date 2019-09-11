import { mount } from '@vue/test-utils'
import GeoCollapsableBox from '@/elements/GeoCollapsableBox/GeoCollapsableBox.vue'

describe('GeoCollapsableBox', () => {
  it('Should render', function () {
    const wrapper = getWrappedComponent()
    expect(wrapper.find('.geo-collapsable-box').exists()).toBe(true)
  })

  it('Should render', function () {
    const wrapper = getWrappedComponent()
    expect(wrapper.find('.geo-collapsable-box').exists()).toBe(true)
  })
})

/**
 * @param {any} [propsData]
 */
function getWrappedComponent (propsData = {}) {
  return mount(GeoCollapsableBox, {
    propsData,
    stubs: {
      'font-awesome-icon': true
    }
  })
}