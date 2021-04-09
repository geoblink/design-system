import { mount } from '@vue/test-utils'
import GeoDropdownRegularButton from '@/elements/GeoDropdown/GeoDropdownRegularButton.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { X_AXIS_POSITION } from 'src/elements/GeoDropdown/GeoDropdown.constants'

library.add(fas)

describe('GeoDropdownRegularButton', () => {
  it('Should render icon when given', function () {
    const wrapper = mount(GeoDropdownRegularButton, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        icon: ['fas', 'user']
      }
    })

    expect(wrapper.find('.geo-dropdown__regular-button-container__icon').exists()).toBe(true)
  })

  it('Should not render icon if not given', function () {
    const wrapper = mount(GeoDropdownRegularButton, { })

    expect(wrapper.find('.geo-dropdown__regular-button-container__icon').exists()).toBe(false)
  })

  it('Should render default slot content when given', function () {
    const wrapper = mount(GeoDropdownRegularButton, {
      slots: {
        default: ['<span class="my-demo-content">Just some unique demo content</span>']
      }
    })

    expect(wrapper.find('.geo-dropdown__regular-button-container__string .my-demo-content').exists()).toBe(true)
  })

  it('Should not render container if default slot if empty', function () {
    const wrapper = mount(GeoDropdownRegularButton, { })

    expect(wrapper.find('.geo-dropdown__regular-button-container__string').exists()).toBe(false)
  })

  it('Should emit click event when clicked', function () {
    const wrapper = mount(GeoDropdownRegularButton, { })

    wrapper.find('.geo-dropdown__regular-button-container').trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })

  it('Should not emit click event when disabled', function () {
    const wrapper = mount(GeoDropdownRegularButton, {
      propsData: {
        disabled: true
      }
    })

    wrapper.find('.geo-dropdown__regular-button-container').trigger('click')
    expect(wrapper.emitted().click).toBeFalsy()
  })

  it('Should apply proper class when active', function () {
    const wrapper = mount(GeoDropdownRegularButton, {
      propsData: {
        active: true
      }
    })

    expect(wrapper.find('.geo-dropdown__regular-button-container--active').exists()).toBe(true)
    expect(wrapper.find('.geo-dropdown__regular-button-container--disabled').exists()).toBe(false)
  })

  it('Should apply proper class when disabled', function () {
    const wrapper = mount(GeoDropdownRegularButton, {
      propsData: {
        disabled: true
      }
    })

    expect(wrapper.find('.geo-dropdown__regular-button-container--active').exists()).toBe(false)
    expect(wrapper.find('.geo-dropdown__regular-button-container--disabled').exists()).toBe(true)
  })

  it('Should apply proper class when active and disabled', function () {
    const wrapper = mount(GeoDropdownRegularButton, {
      propsData: {
        active: true,
        disabled: true
      }
    })

    expect(wrapper.find('.geo-dropdown__regular-button-container--active').exists()).toBe(true)
    expect(wrapper.find('.geo-dropdown__regular-button-container--disabled').exists()).toBe(true)
  })

  it('Should apply proper class when icon position by default', function () {
    const wrapper = mount(GeoDropdownRegularButton, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        icon: ['fas', 'user']
      }
    })

    expect(wrapper.find('.geo-dropdown__regular-button-container__icon--left').exists()).toBe(true)
  })

  it('Should apply proper class when icon position left', function () {
    const wrapper = mount(GeoDropdownRegularButton, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        icon: ['fas', 'user'],
        iconPosition: X_AXIS_POSITION.right
      }
    })

    expect(wrapper.find('.geo-dropdown__regular-button-container__icon--right').exists()).toBe(true)
  })
})
