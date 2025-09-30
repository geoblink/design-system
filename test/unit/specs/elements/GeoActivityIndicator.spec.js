import { mount } from '@vue/test-utils'
import GeoActivityIndicator from '@/elements/GeoActivityIndicator/GeoActivityIndicator.vue'

// Helper function to create wrapper with registered components
function createWrapper (component, options = {}) {
  return mount(component, Object.assign({
    global: {
      components: {
        'geo-activity-indicator': GeoActivityIndicator
      }
    }
  }, options))
}

describe('GeoActivityIndicator', () => {
  it('Should render activity indicator', function () {
    const wrapper = createWrapper(GeoActivityIndicator, {
      props: {
        variant: 'primary'
      }
    })

    expect(wrapper.find('.geo-activity-indicator').exists()).toBe(true)
  })

  it('Should render given completed percentage', function () {
    const wrapper = createWrapper(GeoActivityIndicator, {
      props: {
        percentage: 0.75
      }
    })

    expect(wrapper.find('.geo-activity-indicator').exists()).toBe(true)
    expect(wrapper.vm.completedPercentage).toBe(0.75)
  })

  it('Should render given completed percentage', function () {
    const wrapper = createWrapper(GeoActivityIndicator, {
      props: {
        percentage: 0.75
      }
    })

    expect(wrapper.find('.geo-activity-indicator').exists()).toBe(true)
    expect(wrapper.vm.completedPercentage).toBe(0.75)
  })

  it('Should be indeterminate and animated by default', function () {
    const wrapper = createWrapper(GeoActivityIndicator)
    expect(wrapper.vm.isIndeterminate).toBe(true)
    expect(wrapper.vm.isAnimated).toBe(true)
  })

  it('Shouldn\'t animate when completion percentage is given', function () {
    const wrapper = createWrapper(GeoActivityIndicator, {
      props: {
        percentage: 0.75
      }
    })

    expect(wrapper.vm.isAnimated).toBe(false)
  })

  it('Should animate when animated flag is passed', function () {
    const wrapper = createWrapper(GeoActivityIndicator, {
      props: {
        animated: true,
        percentage: 0.75
      }
    })

    expect(wrapper.vm.isAnimated).toBe(true)
  })

  it('Should animate when indeterminate flag is passed', function () {
    const wrapper = createWrapper(GeoActivityIndicator, {
      props: {
        indeterminate: true
      }
    })

    expect(wrapper.vm.isAnimated).toBe(true)
  })
})
