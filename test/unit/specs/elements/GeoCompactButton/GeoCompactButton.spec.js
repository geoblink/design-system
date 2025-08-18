import _ from 'lodash'
import { mount } from '@vue/test-utils'
import { FontAwesomeIconMock, expectFontAwesomeIconProp } from 'test/unit/utils/FontAwesomeIconMock.js'
import GeoActivityIndicator from '@/elements/GeoActivityIndicator/GeoActivityIndicator.vue'
import GeoCompactButton from '@/elements/GeoCompactButton/GeoCompactButton.vue'
import GeoPrimaryCompactButton from '@/elements/GeoCompactButton/GeoPrimaryCompactButton.vue'
import GeoSecondaryCompactButton from '@/elements/GeoCompactButton/GeoSecondaryCompactButton.vue'
import GeoDangerCompactButton from '@/elements/GeoCompactButton/GeoDangerCompactButton.vue'
import GeoInputAccessoryCompactButton from '@/elements/GeoCompactButton/GeoInputAccessoryCompactButton.vue'

function getWrapper (component, options = {}) {
  return mount(component, _.merge({
    global: {
      components: {
        'geo-activity-indicator': GeoActivityIndicator,
        'geo-primary-compact-button': GeoPrimaryCompactButton,
        'geo-secondary-compact-button': GeoSecondaryCompactButton,
        'geo-danger-compact-button': GeoDangerCompactButton,
        'geo-inputAccessory-compact-button': GeoInputAccessoryCompactButton
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock
      }
    }
  }, options))
}

describe('GeoCompactButton', function () {
  it('Should render button\'s content', function () {
    const wrapper = getWrapper(GeoCompactButton, {
      props: {
        type: 'primary'
      }
    })
    const button = wrapper.find('.geo-compact-button')
    expect(button.exists()).toBe(true)
  })

  it('Should emit an event on click', async function () {
    const wrapper = getWrapper(GeoCompactButton, {
      props: {
        type: 'primary'
      }
    })
    await wrapper.find('.geo-compact-button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().click).toBeTruthy()
  })

  // TODO: Fix check, native click event is still triggered even if custom click event is not emitted
  xit('Should not emit an event when it\'s disabled', async function () {
    const wrapper = getWrapper(GeoCompactButton, {
      props: {
        type: 'primary',
        disabled: true
      }
    })
    const button = wrapper.find('.geo-compact-button')
    await button.trigger('click')
    expect(wrapper.emitted().click).toBeFalsy()
  })

  it('Should show activity indicator when loading', function () {
    const wrapper = getWrapper(GeoCompactButton, {
      props: {
        type: 'primary',
        loading: true
      }
    })
    expect(wrapper.find('.geo-compact-button__activity-indicator').exists()).toBe(true)
  })

  it('Should render correct icon when provided', function () {
    const wrapper = getWrapper(GeoCompactButton, {
      props: {
        type: 'primary',
        icon: ['fas', 'thumbs-up']
      }
    })
    const fontAwesomeIconElem = wrapper.findComponent(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'thumbs-up'])
  })

  it('Should provide matching activity indicator variant by default', function () {
    const primaryWrapper = getWrapper(GeoCompactButton, {
      props: {
        type: 'primary',
        loading: true
      }
    })
    expect(primaryWrapper.vm.activityIndicatorVariant).toBe('primary')
    expect(primaryWrapper.find('.geo-activity-indicator--primary').exists()).toBe(true)

    const secondaryWrapper = getWrapper(GeoCompactButton, {
      props: {
        type: 'secondary',
        loading: true
      }
    })
    expect(secondaryWrapper.vm.activityIndicatorVariant).toBe('default')
    expect(secondaryWrapper.find('.geo-activity-indicator').exists()).toBe(true)
  })
})

const taxonomyButtons = [
  GeoPrimaryCompactButton,
  GeoSecondaryCompactButton,
  GeoDangerCompactButton,
  GeoInputAccessoryCompactButton
]

describe('GeoButton Children', function () {
  taxonomyButtons.forEach(function (taxonomyButton) {
    describe(taxonomyButton.name, function () {
      it('Should render button\'s content', function () {
        const wrapper = getWrapper(taxonomyButton, {
          props: {
            icon: ['fas', 'thumbs-up']
          },
          global: {
            components: {
              GeoCompactButton
            }
          }
        })
        const taxonomyClass = `.geo-compact-button--${wrapper.vm.type}`
        const button = wrapper.find(taxonomyClass)
        expect(button.exists()).toBe(true)
      })

      if (taxonomyButton === GeoPrimaryCompactButton) {
        it('Should render correct default icon', function () {
          const wrapper = getWrapper(taxonomyButton, {
            global: {
              components: {
                GeoCompactButton
              }
            }
          })
          const fontAwesomeIconElem = wrapper.findComponent(FontAwesomeIconMock)
          expectFontAwesomeIconProp(fontAwesomeIconElem, ['fal', 'check'])
        })
      } else if (taxonomyButton === GeoSecondaryCompactButton) {
        it('Should render correct default icon', function () {
          const wrapper = getWrapper(taxonomyButton, {
            global: {
              components: {
                GeoCompactButton
              }
            }
          })
          const fontAwesomeIconElem = wrapper.findComponent(FontAwesomeIconMock)
          expectFontAwesomeIconProp(fontAwesomeIconElem, ['fal', 'times'])
        })
      }

      it('Should render correct icon when provided', function () {
        const wrapper = getWrapper(taxonomyButton, {
          props: {
            icon: ['fas', 'thumbs-up']
          },
          global: {
            components: {
              GeoCompactButton
            }
          }
        })
        const fontAwesomeIconElem = wrapper.findComponent(FontAwesomeIconMock)
        expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'thumbs-up'])
      })

      it('Should emit an event on click', async function () {
        const wrapper = getWrapper(taxonomyButton, {
          props: {
            icon: ['fas', 'thumbs-up']
          },
          global: {
            components: {
              GeoCompactButton
            }
          }
        })
        wrapper.find('.geo-compact-button').trigger('click')

        await wrapper.vm.$nextTick()

        expect(wrapper.emitted().click).toBeTruthy()
      })

      // TODO: Fix check, native click event is still triggered even if custom click event is not emitted
      xit('Should not emit an event when it\'s disabled', async function () {
        const wrapper = getWrapper(taxonomyButton, {
          props: {
            icon: ['fas', 'thumbs-up'],
            disabled: true
          },
          global: {
            components: {
              GeoCompactButton
            }
          }
        })
        const button = wrapper.find('.geo-compact-button')
        await button.trigger('click')
        expect(wrapper.emitted().click).toBeFalsy()
      })

      it('Should show activity indicator when loading', function () {
        const wrapper = getWrapper(taxonomyButton, {
          props: {
            icon: ['fas', 'thumbs-up'],
            loading: true
          },
          global: {
            components: {
              GeoCompactButton
            }
          }
        })
        expect(wrapper.find('.geo-compact-button__activity-indicator').exists()).toBe(true)
      })
    })
  })
})
