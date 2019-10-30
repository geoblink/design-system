import _ from 'lodash'
import { mount } from '@vue/test-utils'
import GeoSuffixSelect from '@/elements/GeoSuffixSelect/GeoSuffixSelect.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

const iconsToMock = [
  'faLock'
]
const mockedFalIcons = _.mapValues(_.pick(fas, iconsToMock), function (original) {
  return _.assign({}, original, {
    prefix: 'fal'
  })
})

library.add(fas, mockedFalIcons)

describe('GeoSuffixSelect', () => {
  it('Should render element', () => {
    const wrapper = mount(GeoSuffixSelect, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        dropdownIcon: ['fas', 'chevron-down']
      }
    })
    expect(wrapper.find('.geo-suffix-select').exists()).toBe(true)
    expect(wrapper.find('.geo-suffix-select--disabled').exists()).toBe(false)
  })

  it('Should emit click event when clicking on toggle icon', () => {
    const wrapper = mount(GeoSuffixSelect, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        dropdownIcon: ['fas', 'chevron-down']
      }
    })
    wrapper.find('.geo-suffix-select').trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })

  describe('When disabled', () => {
    it('Should set `--disabled` suffix to CSS class', () => {
      const wrapper = mount(GeoSuffixSelect, {
        stubs: {
          'font-awesome-icon': FontAwesomeIcon
        },
        propsData: {
          disabled: true,
          dropdownIcon: ['fas', 'chevron-down']
        }
      })
      expect(wrapper.find('.geo-suffix-select--disabled').exists()).toBe(true)
    })

    it('Should disable user interaction', () => {
      const wrapper = mount(GeoSuffixSelect, {
        stubs: {
          'font-awesome-icon': FontAwesomeIcon
        },
        propsData: {
          disabled: true,
          dropdownIcon: ['fas', 'chevron-down']
        }
      })
      wrapper.find('.geo-suffix-select').trigger('click')
      expect(wrapper.emitted().click).toBeFalsy()
    })
  })
})
