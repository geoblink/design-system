import { mount } from '@vue/test-utils'
import GeoSelectToggleButton from '@/elements/GeoSelect/GeoSelectToggleButton.vue'
import { FontAwesomeIconMock, expectFontAwesomeIconProp } from 'test/unit/utils/FontAwesomeIconMock.js'

describe('GeoSelectToggleButton', () => {
  it('Should render element', () => {
    const wrapper = mount(GeoSelectToggleButton, {
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      },
      props: {
        isEmpty: true
      }
    })
    expect(wrapper.find('.geo-select-toggle-button').exists()).toBe(true)
    expect(wrapper.find('.geo-select-toggle-button--disabled').exists()).toBe(false)
  })

  it('Should render correct default dropdownIcon', () => {
    const wrapper = mount(GeoSelectToggleButton, {
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      },
      props: {
        isEmpty: true
      }
    })
    const fontAwesomeIconElem = wrapper.findComponent(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fal', 'chevron-down'])
  })

  it('Should emit click event when clicking on toggle icon', async () => {
    const wrapper = mount(GeoSelectToggleButton, {
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      },
      props: {
        isEmpty: true,
        dropdownIcon: ['fas', 'chevron-down']
      }
    })
    await wrapper.find('.geo-select-toggle-button').trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })

  it('Should render delete icon', async () => {
    const wrapper = mount(GeoSelectToggleButton, {
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      },
      props: {
        isEmpty: false,
        isValueDeletable: true
      }
    })
    expect(wrapper.find('.geo-select-toggle-button__delete-icon').exists()).toBe(true)
    const fontAwesomeIconElem = wrapper.findComponent(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'times-circle'])
  })

  it('Should emit delete-value event when clicking on delete icon', async () => {
    const wrapper = mount(GeoSelectToggleButton, {
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      },
      props: {
        isEmpty: false,
        isValueDeletable: true,
        dropdownIcon: ['fas', 'chevron-down'],
        deleteIcon: ['fas', 'times-circle']
      }
    })

    await wrapper.find('.geo-select-toggle-button__delete-icon').trigger('click')
    expect(wrapper.emitted()['delete-value']).toBeTruthy()
  })

  it('Should render proper variant', async () => {
    const wrapper = mount(GeoSelectToggleButton, {
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      },
      props: {
        isEmpty: false,
        isValueDeletable: true
      }
    })

    expect(wrapper.find('.geo-select-toggle-button').exists()).toBe(true)

    await wrapper.setProps({ variant: 'inputAccessorySuffix' })
    expect(wrapper.find('.geo-select-toggle-button--inputAccessorySuffix').exists()).toBe(true)

    await wrapper.setProps({ variant: 'inputAccessoryPrefix' })
    expect(wrapper.find('.geo-select-toggle-button--inputAccessoryPrefix').exists()).toBe(true)
  })

  it('Should check variant validator is correct', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    const variant = GeoSelectToggleButton.props.variant
    expect(variant.validator(undefined)).toBeTruthy()
    expect(variant.validator('inputAccessorySuffix')).toBeTruthy()
    expect(variant.validator('test')).toBeFalsy()
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
  })

  describe('When disabled', () => {
    it('Should set `--disabled` suffix to CSS class', () => {
      const wrapper = mount(GeoSelectToggleButton, {
        global: {
          stubs: {
            'font-awesome-icon': FontAwesomeIconMock
          }
        },
        props: {
          isEmpty: true,
          disabled: true,
          dropdownIcon: ['fas', 'chevron-down']
        }
      })
      expect(wrapper.find('.geo-select-toggle-button--disabled').exists()).toBe(true)
    })

    // TODO: fix, custom click event is not triggered but native click is
    xit('Should disable user interaction', () => {
      const wrapper = mount(GeoSelectToggleButton, {
        global: {
          stubs: {
            'font-awesome-icon': FontAwesomeIconMock
          }
        },
        props: {
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
