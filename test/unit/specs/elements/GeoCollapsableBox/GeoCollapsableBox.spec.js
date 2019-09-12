import { mount } from '@vue/test-utils'
import GeoCollapsableBox from '@/elements/GeoCollapsableBox/GeoCollapsableBox.vue'

describe('GeoCollapsableBox', function () {
  describe('When it is collapsed', function () {
    it('Should not render', function () {
      const wrapper = getCollapsedWrappedComponent()

      expect(wrapper.find('.geo-collapsable-box__body').exists()).toBe(false)
    })

    it('Should expand when clicking header', function () {
      const wrapper = getCollapsedWrappedComponent()

      wrapper.find('.geo-collapsable-box__header').trigger('click')

      expect(wrapper.find('.geo-collapsable-box__body').exists()).toBe(true)
    })

    it('Should collapse when clicking header twice', function () {
      const wrapper = getCollapsedWrappedComponent()

      wrapper.find('.geo-collapsable-box__header').trigger('click')
      wrapper.find('.geo-collapsable-box__header').trigger('click')

      expect(wrapper.find('.geo-collapsable-box__body').exists()).toBe(false)
    })

    function getCollapsedWrappedComponent () {
      const wrapper = getWrappedComponent()
      wrapper.setData({ isExpanded: false })
      return wrapper
    }
  })

  describe('When it is expanded', function () {
    it('Should render body', function () {
      const wrapper = getExpandedWrappedComponent()

      expect(wrapper.find('.geo-collapsable-box__body').exists()).toBe(true)
    })

    it('Should expand when clicking header', function () {
      const wrapper = getExpandedWrappedComponent()

      wrapper.find('.geo-collapsable-box__header').trigger('click')

      expect(wrapper.find('.geo-collapsable-box__body').exists()).toBe(false)
    })

    it('Should collapse when clicking header twice', function () {
      const wrapper = getExpandedWrappedComponent()

      wrapper.find('.geo-collapsable-box__header').trigger('click')
      wrapper.find('.geo-collapsable-box__header').trigger('click')

      expect(wrapper.find('.geo-collapsable-box__body').exists()).toBe(true)
    })

    function getExpandedWrappedComponent () {
      const wrapper = getWrappedComponent()
      wrapper.setData({ isExpanded: true })
      return wrapper
    }
  })

  it('Should render', function () {
    const wrapper = getWrappedComponent()
    expect(wrapper.find('.geo-collapsable-box').exists()).toBe(true)
  })

  it('Should be expanded by default', function () {
    const wrapper = getWrappedComponent()
    expect(wrapper.vm.isExpanded).toBe(true)
  })

  it('Should be collapsed when passing initially-collapse property true', function () {
    const wrapper = getWrappedComponent({
      initiallyCollapsed: true
    })

    expect(wrapper.vm.isExpanded).toBe(false)
  })

  it('Should be expanded when passing initially-collapse property false', function () {
    const wrapper = getWrappedComponent({
      initiallyCollapsed: false
    })

    expect(wrapper.vm.isExpanded).toBe(true)
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
