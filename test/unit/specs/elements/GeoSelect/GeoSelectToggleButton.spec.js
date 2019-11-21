import { mount } from '@vue/test-utils'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import GeoSelectToggleButton from '@/elements/GeoSelect/GeoSelectToggleButton.vue'
import { FontAwesomeIconMock, expectFontAwesomeIconProp } from 'test/unit/utils/FontAwesomeIconMock.js'
import _ from 'lodash'

const iconsToMock = [
  'faLock',
  'faChevronDown'
]
const mockedFalIcons = _.mapValues(_.pick(fas, iconsToMock), function (original) {
  return _.assign({}, original, {
    prefix: 'fal'
  })
})

library.add(fas, mockedFalIcons)

describe('GeoSelectToggleButton', () => {
  it('Should render element', () => {
    const wrapper = mount(GeoSelectToggleButton, {
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock
      },
      propsData: {
        isEmpty: true
      }
    })
    expect(wrapper.find('.geo-select-toggle-button').exists()).toBe(true)
    expect(wrapper.find('.geo-select-toggle-button--disabled').exists()).toBe(false)
  })

  it('Should render correct default dropdownIcon', () => {
    const wrapper = mount(GeoSelectToggleButton, {
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock
      },
      propsData: {
        isEmpty: true
      }
    })
    const fontAwesomeIconElem = wrapper.find(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fal', 'chevron-down'])
  })

  it('Should emit click event when clicking on toggle icon', () => {
    const wrapper = mount(GeoSelectToggleButton, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        isEmpty: true,
        dropdownIcon: ['fas', 'chevron-down']
      }
    })
    wrapper.find('.geo-select-toggle-button').trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })

  it('Should render delete icon', async () => {
    const wrapper = mount(GeoSelectToggleButton, {
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock
      },
      propsData: {
        isEmpty: false,
        isValueDeletable: true
      }
    })
    expect(wrapper.find('.geo-select-toggle-button__delete-icon').exists()).toBe(true)
    const fontAwesomeIconElem = wrapper.find(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'times-circle'])
  })

  it('Should emit delete-value event when clicking on delete icon', () => {
    const wrapper = mount(GeoSelectToggleButton, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        isEmpty: false,
        isValueDeletable: true,
        dropdownIcon: ['fas', 'chevron-down'],
        deleteIcon: ['fas', 'times-circle']
      }
    })

    wrapper.find('.geo-select-toggle-button__delete-icon').trigger('click')
    expect(wrapper.emitted()['delete-value']).toBeTruthy()
  })

  it('Should render proper variant', () => {
    const wrapper = mount(GeoSelectToggleButton, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        isEmpty: false,
        isValueDeletable: true
      }
    })

    expect(wrapper.find('.geo-select-toggle-button').exists()).toBe(true)

    wrapper.setProps({ variant: 'inputAccessorySuffix' })
    expect(wrapper.find('.geo-select-toggle-button--inputAccessorySuffix').exists()).toBe(true)

    wrapper.setProps({ variant: 'inputAccessoryPrefix' })
    expect(wrapper.find('.geo-select-toggle-button--inputAccessoryPrefix').exists()).toBe(true)
  })

  describe('When disabled', () => {
    it('Should set `--disabled` suffix to CSS class', () => {
      const wrapper = mount(GeoSelectToggleButton, {
        stubs: {
          'font-awesome-icon': FontAwesomeIcon
        },
        propsData: {
          isEmpty: true,
          disabled: true,
          dropdownIcon: ['fas', 'chevron-down']
        }
      })
      expect(wrapper.find('.geo-select-toggle-button--disabled').exists()).toBe(true)
    })

    it('Should disable user interaction', () => {
      const wrapper = mount(GeoSelectToggleButton, {
        stubs: {
          'font-awesome-icon': FontAwesomeIcon
        },
        propsData: {
          isEmpty: true,
          disabled: true,
          dropdownIcon: ['fas', 'chevron-down']
        }
      })
      wrapper.find('.geo-select-toggle-button').trigger('click')
      expect(wrapper.emitted().click).toBeFalsy()
    })
  })
})
