import _ from 'lodash'
import { createLocalVue, mount } from '@vue/test-utils'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import GeoActivityIndicator from '@/elements/GeoActivityIndicator/GeoActivityIndicator.vue'
import GeoButton from '@/elements/GeoButton/GeoButton.vue'
import GeoDangerButton from '@/elements/GeoButton/GeoDangerButton.vue'
import GeoTertiaryButton from '@/elements/GeoButton/GeoTertiaryButton.vue'
import GeoLinkButton from '@/elements/GeoButton/GeoLinkButton.vue'
import GeoDangerLinkButton from '@/elements/GeoButton/GeoDangerLinkButton.vue'
import GeoExternalLinkButton from '@/elements/GeoButton/GeoExternalLinkButton.vue'
import GeoPrimaryButton from '@/elements/GeoButton/GeoPrimaryButton.vue'
import GeoSecondaryButton from '@/elements/GeoButton/GeoSecondaryButton.vue'

const nonExistingIconsToMock = {
  'external-link-square': 'faExternalLinkSquareAlt'
}
const mockedNonExistingIcons = _.mapValues(nonExistingIconsToMock, function (mockedIconKey, originalIconName) {
  return _.assign({}, fas[mockedIconKey], {
    prefix: 'fal',
    iconName: originalIconName
  })
})

library.add(mockedNonExistingIcons)

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-activity-indicator', GeoActivityIndicator)
localVue.component('geo-button', GeoButton)
localVue.component('geo-danger-button', GeoDangerButton)
localVue.component('geo-tertiary-button', GeoTertiaryButton)
localVue.component('geo-link-button', GeoLinkButton)
localVue.component('geo-danger-link-button', GeoDangerLinkButton)
localVue.component('geo-external-link-button', GeoExternalLinkButton)
localVue.component('geo-primary-button', GeoPrimaryButton)
localVue.component('geo-secondary-button', GeoSecondaryButton)

describe('GeoButton', () => {
  it('Should render button\'s content', function () {
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

  it('Should emit an event on click', function (done) {
    const wrapper = mount(GeoButton, {
      propsData: {
        type: 'primary'
      }
    })
    wrapper.find('.geo-button').trigger('click')
    setTimeout(function () {
      try {
        expect(wrapper.emitted().click).toBeTruthy()
        done()
      } catch (error) {
        done(error)
      }
    })
  })

  it('Should not emit an event when it\'s disabled', function () {
    const wrapper = mount(GeoButton, {
      propsData: {
        type: 'primary',
        disabled: true
      }
    })

    const button = wrapper.find('.geo-button')
    button.trigger('click')
    expect(wrapper.emitted().click).toBeFalsy()
  })

  it('Should show activity indicator when loading', function () {
    const wrapper = mount(GeoButton, {
      propsData: {
        type: 'primary',
        loading: true
      },
      stubs: { GeoActivityIndicator }
    })

    expect(wrapper.find('.geo-button__activity-indicator').exists()).toBe(true)
  })

  it('Should provide matching activity indicator variant by default', function () {
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
    expect(secondaryWrapper.vm.activityIndicatorVariant).toBe('primary')
    expect(secondaryWrapper.find('.geo-activity-indicator').exists()).toBe(true)

    const tertiaryWrapper = mount(GeoButton, {
      propsData: {
        type: 'tertiary',
        loading: true
      },
      stubs: { GeoActivityIndicator }
    })
    expect(tertiaryWrapper.vm.activityIndicatorVariant).toBe('primary')
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

    const linkWrapper = mount(GeoButton, {
      propsData: {
        type: 'link',
        loading: true
      },
      stubs: { GeoActivityIndicator }
    })
    expect(linkWrapper.vm.activityIndicatorVariant).toBe('primary')
    expect(linkWrapper.find('.geo-activity-indicator').exists()).toBe(true)

    const dangerLinkWrapper = mount(GeoButton, {
      propsData: {
        type: 'dangerLink',
        loading: true
      },
      stubs: { GeoActivityIndicator }
    })
    expect(dangerLinkWrapper.vm.activityIndicatorVariant).toBe('error')
    expect(dangerLinkWrapper.find('.geo-activity-indicator').exists()).toBe(true)
  })
})

const taxonomyButtons = [
  GeoDangerButton,
  GeoPrimaryButton,
  GeoSecondaryButton,
  GeoTertiaryButton,
  GeoLinkButton,
  GeoDangerLinkButton,
  GeoExternalLinkButton
]

describe('GeoButton Children', () => {
  taxonomyButtons.forEach((taxonomyButton) => {
    describe(taxonomyButton.name, function () {
      it('Should render button\'s content', function () {
        const wrapper = mount(taxonomyButton, {
          slots: {
            default: '<span>Button title</span>'
          },
          stubs: {
            GeoButton,
            FontAwesomeIcon
          }
        })
        const button = wrapper.find('.geo-button')
        expect(button.exists()).toBe(true)
        expect(button.find('span').exists()).toBe(true)
      })

      it('Should emit an event on click', function (done) {
        const wrapper = mount(taxonomyButton, {
          stubs: {
            GeoButton,
            FontAwesomeIcon
          }
        })
        wrapper.find('.geo-button').trigger('click')
        setTimeout(function () {
          try {
            expect(wrapper.emitted().click).toBeTruthy()
            done()
          } catch (error) {
            done(error)
          }
        })
      })

      it('Should not emit an event when it\'s disabled', function () {
        const wrapper = mount(taxonomyButton, {
          propsData: {
            disabled: true
          },
          stubs: {
            GeoButton,
            FontAwesomeIcon
          }
        })

        const button = wrapper.find('.geo-button')
        button.trigger('click')
        expect(wrapper.emitted().click).toBeFalsy()
      })

      it('Should show activity indicator when loading', function () {
        const wrapper = mount(taxonomyButton, {
          propsData: {
            loading: true
          },
          stubs: {
            GeoActivityIndicator,
            GeoButton,
            FontAwesomeIcon
          }
        })

        expect(wrapper.find('.geo-button__activity-indicator').exists()).toBe(true)
      })
    })
  })

  describe('GeoExternalLinkButton', function () {
    it('Should render icon', function () {
      const wrapper = mount(GeoExternalLinkButton, {
        stubs: {
          GeoActivityIndicator,
          GeoButton,
          FontAwesomeIcon
        }
      })

      expect(wrapper.find('[data-icon="external-link-square"]').exists()).toBe(true)
    })

    it('Should render «a» wrapper if «href» is given', function () {
      const wrapper = mount(GeoExternalLinkButton, {
        propsData: {
          href: 'https://geoblink.com'
        },
        stubs: {
          GeoActivityIndicator,
          GeoButton,
          FontAwesomeIcon
        }
      })

      expect(wrapper.find('a[href="https://geoblink.com"]').exists()).toBe(true)
    })

    it('Should open links if «href» is given', function () {
      const wrapper = mount(GeoExternalLinkButton, {
        propsData: {
          href: 'https://geoblink.com'
        },
        stubs: {
          GeoActivityIndicator,
          GeoButton,
          FontAwesomeIcon
        }
      })

      const nativeClickSpy = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => { })

      wrapper.find('.geo-button').trigger('click')

      expect(wrapper.emitted().click).toBeTruthy()
      expect(nativeClickSpy).toHaveBeenCalled()
    })
  })
})
