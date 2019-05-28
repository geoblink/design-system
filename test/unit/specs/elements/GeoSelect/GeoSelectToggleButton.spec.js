import { mount } from '@vue/test-utils'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import GeoSelectToggleButton from '@/elements/GeoSelect/GeoSelectToggleButton.vue'
import _ from 'lodash'

const iconsToMock = [
  'faLock'
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
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        isEmpty: true,
        dropdownIcon: ['fas', 'chevron-down']
      }
    })
    expect(wrapper.find('.geo-select-toggle-button').exists()).toBe(true)
    expect(wrapper.find('.geo-select-toggle-button--disabled').exists()).toBe(false)
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
