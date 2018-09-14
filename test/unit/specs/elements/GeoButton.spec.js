import { createLocalVue, mount } from '@vue/test-utils'
import GeoActivityIndicator from '@/elements/GeoActivityIndicator/GeoActivityIndicator.vue'
import GeoButton from '@/elements/GeoButton/GeoButton.vue'
import GeoDangerButton from '@/elements/GeoButton/GeoDangerButton.vue'
import GeoTertiaryButton from '@/elements/GeoButton/GeoTertiaryButton.vue'
import GeoPrimaryButton from '@/elements/GeoButton/GeoPrimaryButton.vue'
import GeoSecondaryButton from '@/elements/GeoButton/GeoSecondaryButton.vue'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-activity-indicator', GeoActivityIndicator)
localVue.component('geo-button', GeoButton)
localVue.component('geo-danger-button', GeoDangerButton)
localVue.component('geo-tertiary-button', GeoTertiaryButton)
localVue.component('geo-primary-button', GeoPrimaryButton)
localVue.component('geo-secondary-button', GeoSecondaryButton)

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

    const dangerWrapper = mount(GeoButton, {
      propsData: {
        type: 'danger',
        loading: true
      },
      stubs: { GeoActivityIndicator }
    })
    expect(dangerWrapper.vm.activityIndicatorVariant).toBe('error')
    expect(dangerWrapper.find('.geo-activity-indicator--error').exists()).toBe(true)
  })
})

const taxonomyButtons = [GeoDangerButton, GeoPrimaryButton, GeoSecondaryButton, GeoTertiaryButton]

fdescribe('GeoButton Children', () => {
  taxonomyButtons.forEach((taxonomyButton) => {
    it('should render button\'s content', function () {
      const wrapper = mount(taxonomyButton, {
        slots: {
          default: '<span>Button title</span>'
        },
        stubs: {
          GeoButton
        }
      })
      const button = wrapper.find('.geo-button')
      expect(button.exists()).toBe(true)
      expect(button.find('span').exists()).toBe(true)
    })

    it('should emit an event on click', function (done) {
      const wrapper = mount(taxonomyButton, {
        stubs: {
          GeoButton
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
      const wrapper = mount(taxonomyButton, {
        propsData: {
          disabled: true
        },
        stubs: {
          GeoButton
        }
      })

      const button = wrapper.find('.geo-button')
      button.trigger('click')
      expect(wrapper.emitted()['click']).toBeFalsy()
    })

    it('should add CSS Suffix when given', function () {
      const wrapper = mount(taxonomyButton, {
        propsData: {
          cssModifier: 'custom'
        },
        stubs: {
          GeoButton
        }
      })

      expect(wrapper.find('.geo-button--custom').exists()).toBe(true)
    })

    it('should show activity indicator when loading', function () {
      const wrapper = mount(taxonomyButton, {
        propsData: {
          loading: true
        },
        stubs: { GeoActivityIndicator, GeoButton }
      })

      expect(wrapper.find('.geo-button__activity-indicator').exists()).toBe(true)
    })
  })
})
