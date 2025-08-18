import _ from 'lodash'
import { mount } from '@vue/test-utils'
import GeoActivityIndicator from '@/elements/GeoActivityIndicator/GeoActivityIndicator.vue'
import GeoButton from '@/elements/GeoButton/GeoButton.vue'
import GeoDangerButton from '@/elements/GeoButton/GeoDangerButton.vue'
import GeoTertiaryButton from '@/elements/GeoButton/GeoTertiaryButton.vue'
import GeoLinkButton from '@/elements/GeoButton/GeoLinkButton.vue'
import GeoDangerLinkButton from '@/elements/GeoButton/GeoDangerLinkButton.vue'
import GeoExternalLinkButton from '@/elements/GeoButton/GeoExternalLinkButton.vue'
import GeoPrimaryButton from '@/elements/GeoButton/GeoPrimaryButton.vue'
import GeoSecondaryButton from '@/elements/GeoButton/GeoSecondaryButton.vue'
import { FontAwesomeIconMock, expectFontAwesomeIconProp } from 'test/unit/utils/FontAwesomeIconMock'

function getWrapper (component, options = {}) {
  return mount(component, _.merge({
    global: {
      stubs: {
        GeoActivityIndicator,
        'font-awesome-icon': FontAwesomeIconMock
      }
    }
  }, options))
}

describe('GeoButton', () => {
  it('Should render button\'s content', function () {
    const wrapper = getWrapper(GeoButton, {
      slots: {
        default: '<span>Button title</span>'
      },
      props: {
        type: 'primary'
      }
    })
    const button = wrapper.find('.geo-button')
    expect(button.exists()).toBe(true)
    expect(button.find('span').exists()).toBe(true)
  })

  it('Should emit an event on click', async function () {
    const wrapper = getWrapper(GeoButton, {
      props: {
        type: 'primary'
      }
    })
    await wrapper.find('.geo-button').trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })

  // TODO: fix emitting check: when using emit('click') on a component, the test check fails
  // because wrapper.emitted returns both the native click and the component custom click
  xit('Should not emit an event when it\'s disabled', async function () {
    const wrapper = getWrapper(GeoButton, {
      props: {
        type: 'primary',
        disabled: true
      }
    })

    const button = wrapper.find('.geo-button')
    await button.trigger('click')
    expect(wrapper.emitted().click).toBeFalsy()
  })

  it('Should show activity indicator when loading', function () {
    const wrapper = getWrapper(GeoButton, {
      props: {
        type: 'primary',
        loading: true
      },
      global: {
        stubs: { GeoActivityIndicator }
      }
    })

    expect(wrapper.find('.geo-button__activity-indicator').exists()).toBe(true)
  })

  it('Should provide matching activity indicator variant by default', function () {
    const primaryWrapper = getWrapper(GeoButton, {
      props: {
        type: 'primary',
        loading: true
      },
      global: {
        stubs: { GeoActivityIndicator }
      }
    })
    expect(primaryWrapper.vm.activityIndicatorVariant).toBe('primary')
    expect(primaryWrapper.find('.geo-activity-indicator--primary').exists()).toBe(true)

    const secondaryWrapper = getWrapper(GeoButton, {
      props: {
        type: 'secondary',
        loading: true
      },
      global: {
        stubs: { GeoActivityIndicator }
      }
    })
    expect(secondaryWrapper.vm.activityIndicatorVariant).toBe('primary')
    expect(secondaryWrapper.find('.geo-activity-indicator').exists()).toBe(true)

    const tertiaryWrapper = getWrapper(GeoButton, {
      props: {
        type: 'tertiary',
        loading: true
      },
      global: {
        stubs: { GeoActivityIndicator }
      }
    })
    expect(tertiaryWrapper.vm.activityIndicatorVariant).toBe('primary')
    expect(tertiaryWrapper.find('.geo-activity-indicator').exists()).toBe(true)

    const dangerWrapper = getWrapper(GeoButton, {
      props: {
        type: 'danger',
        loading: true
      },
      global: {
        stubs: { GeoActivityIndicator }
      }
    })
    expect(dangerWrapper.vm.activityIndicatorVariant).toBe('error')
    expect(dangerWrapper.find('.geo-activity-indicator--error').exists()).toBe(true)

    const linkWrapper = getWrapper(GeoButton, {
      props: {
        type: 'link',
        loading: true
      },
      global: {
        stubs: { GeoActivityIndicator }
      }
    })
    expect(linkWrapper.vm.activityIndicatorVariant).toBe('primary')
    expect(linkWrapper.find('.geo-activity-indicator').exists()).toBe(true)

    const dangerLinkWrapper = getWrapper(GeoButton, {
      props: {
        type: 'dangerLink',
        loading: true
      },
      global: {
        stubs: { GeoActivityIndicator }
      }
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
        const wrapper = getWrapper(taxonomyButton, {
          global: {
            components: {
              GeoButton
            }
          },
          slots: {
            default: '<span>Button title</span>'
          }
        })
        const button = wrapper.find('.geo-button')
        expect(button.exists()).toBe(true)
        expect(button.find('span').exists()).toBe(true)
      })

      it('Should emit an event on click', async function () {
        const wrapper = getWrapper(taxonomyButton, {
          global: {
            components: {
              GeoButton
            }
          }
        })
        await wrapper.find('.geo-button').trigger('click')
        expect(wrapper.emitted().click).toBeTruthy()
      })

      // TODO: fix emitting check: when using emit('click') on a component, the test check fails
      // because wrapper.emitted returns both the native click and the component custom click
      xit('Should not emit an event when it\'s disabled', async function () {
        const wrapper = getWrapper(taxonomyButton, {
          props: {
            disabled: true
          },
          global: {
            components: {
              GeoButton
            }
          }
        })

        const button = wrapper.find('.geo-button')
        await button.trigger('click')
        expect(wrapper.emitted().click).toBeFalsy()
      })

      it('Should show activity indicator when loading', function () {
        const wrapper = getWrapper(taxonomyButton, {
          props: {
            loading: true
          },
          global: {
            components: {
              GeoButton
            }
          }
        })

        expect(wrapper.find('.geo-button__activity-indicator').exists()).toBe(true)
      })
    })
  })

  describe('GeoExternalLinkButton', function () {
    it('Should render icon', function () {
      const wrapper = getWrapper(GeoExternalLinkButton, {
        global: {
          components: {
            GeoButton
          }
        }
      })

      expectFontAwesomeIconProp(wrapper.findComponent(FontAwesomeIconMock), ['fal', 'external-link-square'])
    })

    it('Should render «a» wrapper if «href» is given', function () {
      const wrapper = getWrapper(GeoExternalLinkButton, {
        props: {
          href: 'https://geoblink.com'
        },
        global: {
          components: {
            GeoButton
          }
        }
      })

      expect(wrapper.find('a[href="https://geoblink.com"]').exists()).toBe(true)
    })

    it('Should open links if «href» is given', function () {
      const wrapper = getWrapper(GeoExternalLinkButton, {
        props: {
          href: 'https://geoblink.com'
        },
        global: {
          components: {
            GeoButton
          }
        }
      })

      const nativeClickSpy = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => { })

      wrapper.find('.geo-button').trigger('click')

      expect(wrapper.emitted().click).toBeTruthy()
      expect(nativeClickSpy).toHaveBeenCalled()
    })
  })
})
