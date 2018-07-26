import { createLocalVue, mount } from '@vue/test-utils'
import GeoActivityIndicator from '@/elements/GeoActivityIndicator.vue'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-activity-indicator', GeoActivityIndicator)

describe('GeoActivityIndicator', () => {
  it('should render activity indicator', function () {
    const wrapper = mount(GeoActivityIndicator, {
      propsData: {
        variant: 'primary'
      }
    })

    expect(wrapper.find('.geo-activity-indicator').exists()).toBe(true)
  })

  it('should render given completed percentage', function () {
    const wrapper = mount(GeoActivityIndicator, {
      propsData: {
        percentage: 0.75
      }
    })

    expect(wrapper.find('.geo-activity-indicator').exists()).toBe(true)
    expect(wrapper.vm.completedPercentage).toBe(0.75)
  })

  it('should render given completed percentage', function () {
    const wrapper = mount(GeoActivityIndicator, {
      propsData: {
        percentage: 0.75
      }
    })

    expect(wrapper.find('.geo-activity-indicator').exists()).toBe(true)
    expect(wrapper.vm.completedPercentage).toBe(0.75)
  })

  it('should be indeterminate and animated by default', function () {
    const wrapper = mount(GeoActivityIndicator)
    expect(wrapper.vm.isIndeterminate).toBe(true)
    expect(wrapper.vm.isAnimated).toBe(true)
  })

  it('shouldn\'t animate when completion percentage is given', function () {
    const wrapper = mount(GeoActivityIndicator, {
      propsData: {
        percentage: 0.75
      }
    })

    expect(wrapper.vm.isAnimated).toBe(false)
  })

  it('should animate when animated flag is passed', function () {
    const wrapper = mount(GeoActivityIndicator, {
      propsData: {
        animated: true,
        percentage: 0.75
      }
    })

    expect(wrapper.vm.isAnimated).toBe(true)
  })

  it('should animate when indeterminate flag is passed', function () {
    const wrapper = mount(GeoActivityIndicator, {
      propsData: {
        indeterminate: true
      }
    })

    expect(wrapper.vm.isAnimated).toBe(true)
  })
})
