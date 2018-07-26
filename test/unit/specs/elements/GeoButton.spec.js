import { createLocalVue, mount } from '@vue/test-utils'
import GeoActivityIndicator from '@/elements/GeoActivityIndicator.vue'
import GeoButton from '@/elements/GeoButton.vue'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-activity-indicator', GeoActivityIndicator)
localVue.component('geo-button', GeoButton)

describe('GeoButton', () => {
  it('should render button\'s content', function () {
    const wrapper = mount(GeoButton, {
      slots: {
        default: '<span>Button title</span>'
      },
      propsData: {
        type: 'primary'
      }
    })
    const button = wrapper.find('.geo-button')
    expect(button.exists()).toBe(true)
    expect(button.find('span').exists()).toBe(true)
  })

  it('should emit an event on click', function (done) {
    const wrapper = mount(GeoButton, {
      propsData: {
        type: 'primary'
      }
    })
    wrapper.find('.geo-button').trigger('click')
    setTimeout(function () {
      try {
        expect(wrapper.emitted()['click']).toBeTruthy()
        done()
      } catch (error) {
        done(error)
      }
    })
  })

  it('should not emit an event when it\'s disabled', function () {
    const wrapper = mount(GeoButton, {
      propsData: {
        type: 'primary',
        disabled: true
      }
    })

    const button = wrapper.find('.geo-button')
    button.trigger('click')
    expect(wrapper.emitted()['click']).toBeFalsy()
  })

  it('should add CSS Suffix when given', function () {
    const wrapper = mount(GeoButton, {
      propsData: {
        type: 'primary',
        cssModifier: 'custom'
      }
    })

    expect(wrapper.find('.geo-button--custom').exists()).toBe(true)
  })

  it('should show activity indicator when loading', function () {
    const wrapper = mount(GeoButton, {
      propsData: {
        type: 'primary',
        loading: true
      },
      stubs: { GeoActivityIndicator }
    })

    expect(wrapper.find('.geo-button__activity-indicator').exists()).toBe(true)
  })

  it('should provide matching activity indicator variant by default', function () {
    const primaryWrapper = mount(GeoButton, {
      propsData: {
        type: 'primary',
        loading: true
      },
      stubs: { GeoActivityIndicator }
    })
    expect(primaryWrapper.vm.activityIndicatorVariant).toBe('primary')
    expect(primaryWrapper.find('.geo-activity-indicator--primary').exists()).toBe(true)

    const secondaryWrapper = mount(GeoButton, {
      propsData: {
        type: 'secondary',
        loading: true
      },
      stubs: { GeoActivityIndicator }
    })
    expect(secondaryWrapper.vm.activityIndicatorVariant).toBe(undefined)
    expect(secondaryWrapper.find('.geo-activity-indicator').exists()).toBe(true)

    const tertiaryWrapper = mount(GeoButton, {
      propsData: {
        type: 'tertiary',
        loading: true
      },
      stubs: { GeoActivityIndicator }
    })
    expect(tertiaryWrapper.vm.activityIndicatorVariant).toBe(undefined)
    expect(tertiaryWrapper.find('.geo-activity-indicator').exists()).toBe(true)

    const destructiveWrapper = mount(GeoButton, {
      propsData: {
        type: 'destructive',
        loading: true
      },
      stubs: { GeoActivityIndicator }
    })
    expect(destructiveWrapper.vm.activityIndicatorVariant).toBe('error')
    expect(destructiveWrapper.find('.geo-activity-indicator--error').exists()).toBe(true)
  })
})
