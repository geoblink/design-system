import _ from 'lodash'
import { createLocalVue, mount } from '@vue/test-utils'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIconMock, expectFontAwesomeIconProp } from 'test/unit/utils/FontAwesomeIconMock.js'
import GeoActivityIndicator from '@/elements/GeoActivityIndicator/GeoActivityIndicator.vue'
import GeoCompactButton from '@/elements/GeoCompactButton/GeoCompactButton.vue'
import GeoPrimaryCompactButton from '@/elements/GeoCompactButton/GeoPrimaryCompactButton.vue'
import GeoSecondaryCompactButton from '@/elements/GeoCompactButton/GeoSecondaryCompactButton.vue'
import GeoDangerCompactButton from '@/elements/GeoCompactButton/GeoDangerCompactButton.vue'
import GeoInputAccessoryCompactButton from '@/elements/GeoCompactButton/GeoInputAccessoryCompactButton.vue'

library.add(fas)

const iconsToMock = [
  'faTimes',
  'faCheck'
]

const mockedFalIcons = _.mapValues(_.pick(fas, iconsToMock), (original) => {
  return _.assign({}, original, {
    prefix: 'fal'
  })
})

library.add(mockedFalIcons)

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-activity-indicator', GeoActivityIndicator)
localVue.component('geo-compact-button', GeoCompactButton)
localVue.component('geo-primary-compact-button', GeoPrimaryCompactButton)
localVue.component('geo-secondary-compact-button', GeoSecondaryCompactButton)
localVue.component('geo-danger-compact-button', GeoDangerCompactButton)
localVue.component('geo-inputAccessory-compact-button', GeoInputAccessoryCompactButton)

describe('GeoCompactButton', function () {
  it('Should render button\'s content', function () {
    const wrapper = mount(GeoCompactButton, {
      propsData: {
        type: 'primary'
      },
      stubs: {
        FontAwesomeIcon
      }
    })
    const button = wrapper.find('.geo-compact-button')
    expect(button.exists()).toBe(true)
  })

  it('Should emit an event on click', async function () {
    const wrapper = mount(GeoCompactButton, {
      propsData: {
        type: 'primary'
      },
      stubs: {
        FontAwesomeIcon
      }
    })
    wrapper.find('.geo-compact-button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted()['click']).toBeTruthy()
  })

  it('Should not emit an event when it\'s disabled', function () {
    const wrapper = mount(GeoCompactButton, {
      propsData: {
        type: 'primary',
        disabled: true
      },
      stubs: {
        FontAwesomeIcon
      }
    })
    const button = wrapper.find('.geo-compact-button')
    button.trigger('click')
    expect(wrapper.emitted()['click']).toBeFalsy()
  })

  it('Should show activity indicator when loading', function () {
    const wrapper = mount(GeoCompactButton, {
      propsData: {
        type: 'primary',
        loading: true
      },
      stubs: {
        GeoActivityIndicator,
        FontAwesomeIcon
      }
    })
    expect(wrapper.find('.geo-compact-button__activity-indicator').exists()).toBe(true)
  })

  it('Should render correct icon when provided', function () {
    const wrapper = mount(GeoCompactButton, {
      propsData: {
        type: 'primary',
        icon: ['fas', 'thumbs-up']
      },
      stubs: {
        GeoActivityIndicator,
        'font-awesome-icon': FontAwesomeIconMock
      }
    })
    const fontAwesomeIconElem = wrapper.find(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'thumbs-up'])
  })

  it('Should provide matching activity indicator variant by default', function () {
    const primaryWrapper = mount(GeoCompactButton, {
      propsData: {
        type: 'primary',
        loading: true
      },
      stubs: {
        GeoActivityIndicator,
        FontAwesomeIcon
      }
    })
    expect(primaryWrapper.vm.activityIndicatorVariant).toBe('primary')
    expect(primaryWrapper.find('.geo-activity-indicator--primary').exists()).toBe(true)

    const secondaryWrapper = mount(GeoCompactButton, {
      propsData: {
        type: 'secondary',
        loading: true
      },
      stubs: {
        GeoActivityIndicator,
        FontAwesomeIcon
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
        const wrapper = mount(taxonomyButton, {
          stubs: {
            GeoCompactButton,
            FontAwesomeIcon
          }
        })
        const taxonomyClass = `.geo-compact-button--${wrapper.vm.type}`
        const button = wrapper.find(taxonomyClass)
        expect(button.exists()).toBe(true)
      })

      it('Should render correct default icon', function () {
        const wrapper = mount(taxonomyButton, {
          stubs: {
            GeoCompactButton,
            'font-awesome-icon': FontAwesomeIconMock
          }
        })
        const fontAwesomeIconElem = wrapper.find(FontAwesomeIconMock)
        switch (wrapper.vm.type) {
          case 'primary':
            expectFontAwesomeIconProp(fontAwesomeIconElem, ['fal', 'check'])
            break
          case 'secondary':
            expectFontAwesomeIconProp(fontAwesomeIconElem, ['fal', 'times'])
            break
        }
      })

      it('Should render correct icon when provided', function () {
        const wrapper = mount(taxonomyButton, {
          propsData: {
            icon: ['fas', 'thumbs-up']
          },
          stubs: {
            GeoCompactButton,
            'font-awesome-icon': FontAwesomeIconMock
          }
        })
        const fontAwesomeIconElem = wrapper.find(FontAwesomeIconMock)
        expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'thumbs-up'])
      })

      it('Should emit an event on click', async function () {
        const wrapper = mount(taxonomyButton, {
          stubs: {
            GeoCompactButton,
            FontAwesomeIcon
          }
        })
        wrapper.find('.geo-compact-button').trigger('click')

        await wrapper.vm.$nextTick()

        expect(wrapper.emitted()['click']).toBeTruthy()
      })

      it('Should not emit an event when it\'s disabled', function () {
        const wrapper = mount(taxonomyButton, {
          propsData: {
            disabled: true
          },
          stubs: {
            GeoCompactButton,
            FontAwesomeIcon
          }
        })
        const button = wrapper.find('.geo-compact-button')
        button.trigger('click')
        expect(wrapper.emitted()['click']).toBeFalsy()
      })

      it('Should show activity indicator when loading', function () {
        const wrapper = mount(taxonomyButton, {
          propsData: {
            loading: true
          },
          stubs: {
            GeoActivityIndicator,
            GeoCompactButton,
            FontAwesomeIcon
          }
        })
        expect(wrapper.find('.geo-compact-button__activity-indicator').exists()).toBe(true)
      })
    })
  })
})
