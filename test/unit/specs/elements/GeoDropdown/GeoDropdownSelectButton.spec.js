import _ from 'lodash'
import { mount } from '@vue/test-utils'
import GeoDropdownSelectButton from '@/elements/GeoDropdown/GeoDropdownSelectButton.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { X_AXIS_POSITION } from 'src/elements/GeoDropdown/GeoDropdown.constants'

const iconsToMock = [
  'faChevronDown'
]
const mockedFalIcons = _.mapValues(_.pick(fas, iconsToMock), (original) => {
  return _.assign({}, original, {
    prefix: 'fal'
  })
})
library.add(mockedFalIcons)

describe('GeoDropdownSelectButton', () => {
  it('Should always render icon', function () {
    const wrapper = mount(GeoDropdownSelectButton, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })

    expect(wrapper.find('.geo-dropdown__regular-button-container__icon').exists()).toBe(true)
  })

  it('Should emit click event when clicked', function () {
    const wrapper = mount(GeoDropdownSelectButton, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })

    wrapper.find('.geo-dropdown__select-button').trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })

  it('Should not emit click event when disabled', function () {
    const wrapper = mount(GeoDropdownSelectButton, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        disabled: true
      }
    })

    wrapper.find('.geo-dropdown__select-button').trigger('click')
    expect(wrapper.emitted().click).toBeFalsy()
  })

  it('Should apply proper class when active', function () {
    const wrapper = mount(GeoDropdownSelectButton, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        active: true
      }
    })

    expect(wrapper.find('.geo-dropdown__regular-button-container--active').exists()).toBe(true)
    expect(wrapper.find('.geo-dropdown__regular-button-container--disabled').exists()).toBe(false)
  })

  it('Should apply proper class when disabled', function () {
    const wrapper = mount(GeoDropdownSelectButton, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        disabled: true
      }
    })

    expect(wrapper.find('.geo-dropdown__regular-button-container--active').exists()).toBe(false)
    expect(wrapper.find('.geo-dropdown__regular-button-container--disabled').exists()).toBe(true)
  })

  it('Should apply proper class when active and disabled', function () {
    const wrapper = mount(GeoDropdownSelectButton, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        active: true,
        disabled: true
      }
    })

    expect(wrapper.find('.geo-dropdown__regular-button-container--active').exists()).toBe(true)
    expect(wrapper.find('.geo-dropdown__regular-button-container--disabled').exists()).toBe(true)
  })

  it('Should apply proper class when icon position by default', function () {
    const wrapper = mount(GeoDropdownSelectButton, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })

    expect(wrapper.find('.geo-dropdown__regular-button-container__icon--right').exists()).toBe(true)
  })

  it('Should apply proper class when icon position left', function () {
    const wrapper = mount(GeoDropdownSelectButton, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        iconPosition: X_AXIS_POSITION.left
      }
    })

    expect(wrapper.find('.geo-dropdown__regular-button-container__icon--left').exists()).toBe(true)
  })
})
