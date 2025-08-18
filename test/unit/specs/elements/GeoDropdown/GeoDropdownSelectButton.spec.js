
import { mount } from '@vue/test-utils'
import GeoDropdownSelectButton from '@/elements/GeoDropdown/GeoDropdownSelectButton.vue'
import { X_AXIS_POSITION } from 'src/elements/GeoDropdown/GeoDropdown.constants'
import { FontAwesomeIconMock } from 'test/unit/utils/FontAwesomeIconMock'

describe('GeoDropdownSelectButton', () => {
  it('Should always render icon', function () {
    const wrapper = mount(GeoDropdownSelectButton, {
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      }
    })

    expect(wrapper.find('.geo-dropdown-regular-button-container__icon').exists()).toBe(true)
  })

  it('Should emit click event when clicked', function () {
    const wrapper = mount(GeoDropdownSelectButton, {
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      }
    })

    wrapper.find('.geo-dropdown__select-button').trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })

  // TODO: fix check, native click event is still being triggered when disabled
  xit('Should not emit click event when disabled', function () {
    const wrapper = mount(GeoDropdownSelectButton, {
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      },
      props: {
        disabled: true
      }
    })

    wrapper.find('.geo-dropdown__select-button').trigger('click')
    expect(wrapper.emitted().click).toBeFalsy()
  })

  it('Should apply proper class when active', function () {
    const wrapper = mount(GeoDropdownSelectButton, {
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      },
      props: {
        active: true
      }
    })

    expect(wrapper.find('.geo-dropdown-regular-button-container--active').exists()).toBe(true)
    expect(wrapper.find('.geo-dropdown-regular-button-container--disabled').exists()).toBe(false)
  })

  it('Should apply proper class when disabled', function () {
    const wrapper = mount(GeoDropdownSelectButton, {
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      },
      props: {
        disabled: true
      }
    })

    expect(wrapper.find('.geo-dropdown-regular-button-container--active').exists()).toBe(false)
    expect(wrapper.find('.geo-dropdown-regular-button-container--disabled').exists()).toBe(true)
  })

  it('Should apply proper class when active and disabled', function () {
    const wrapper = mount(GeoDropdownSelectButton, {
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      },
      props: {
        active: true,
        disabled: true
      }
    })

    expect(wrapper.find('.geo-dropdown-regular-button-container--active').exists()).toBe(true)
    expect(wrapper.find('.geo-dropdown-regular-button-container--disabled').exists()).toBe(true)
  })

  it('Should apply proper class when icon position by default', function () {
    const wrapper = mount(GeoDropdownSelectButton, {
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      }
    })

    expect(wrapper.find('.geo-dropdown-regular-button-container__icon--right').exists()).toBe(true)
  })

  it('Should apply proper class when icon position left', function () {
    const wrapper = mount(GeoDropdownSelectButton, {
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      },
      props: {
        iconPosition: X_AXIS_POSITION.left
      }
    })

    expect(wrapper.find('.geo-dropdown-regular-button-container__icon--left').exists()).toBe(true)
  })

  it('Should render default slot content when given', async function () {
    const wrapper = mount(GeoDropdownSelectButton, {
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      },
      slots: {
        default: ['<span class="my-demo-content">Just some unique demo content</span>']
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.find('.geo-dropdown-regular-button-container__content .my-demo-content').exists()).toBe(true)
  })

  it('Should not render container if default slot if empty', async function () {
    const wrapper = mount(GeoDropdownSelectButton, {
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      }
    })

    await wrapper.vm.$nextTick()
    console.log(wrapper.html())
    expect(wrapper.find('.geo-dropdown-regular-button-container__content').exists()).toBe(false)
  })
})
