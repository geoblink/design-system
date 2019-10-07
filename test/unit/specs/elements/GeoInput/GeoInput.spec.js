import { mount } from '@vue/test-utils'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import GeoInput from '@/elements/GeoInput/GeoInput.vue'
import { FontAwesomeIconMock, expectFontAwesomeIconProp } from 'test/unit/utils/FontAwesomeIconMock.js'

library.add(fas)

describe('GeoInput', () => {
  it('Should render', function () {
    const wrapper = mount(GeoInput)
    expect(wrapper.find('.geo-input').exists()).toBe(true)
    expect(wrapper.find('.geo-input--error').exists()).toBe(false)
    expect(wrapper.find('.geo-input--success').exists()).toBe(false)
    expect(wrapper.find('.geo-input--disabled').exists()).toBe(false)
  })

  it('Should render as error', function () {
    const wrapper = mount(GeoInput, {
      propsData: {
        error: true
      }
    })

    expect(wrapper.find('.geo-input').exists()).toBe(true)
    expect(wrapper.find('.geo-input--error').exists()).toBe(true)
    expect(wrapper.find('.geo-input--success').exists()).toBe(false)
    expect(wrapper.find('.geo-input--disabled').exists()).toBe(false)
  })

  it('Should render as success', function () {
    const wrapper = mount(GeoInput, {
      propsData: {
        success: true
      }
    })

    expect(wrapper.find('.geo-input').exists()).toBe(true)
    expect(wrapper.find('.geo-input--error').exists()).toBe(false)
    expect(wrapper.find('.geo-input--success').exists()).toBe(true)
    expect(wrapper.find('.geo-input--disabled').exists()).toBe(false)
  })

  it('Should render as disabled', function () {
    const wrapper = mount(GeoInput, {
      propsData: {
        disabled: true,
        disabledIcon: ['fas', 'lock']
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })

    expect(wrapper.find('.geo-input').exists()).toBe(true)
    expect(wrapper.find('.geo-input--error').exists()).toBe(false)
    expect(wrapper.find('.geo-input--success').exists()).toBe(false)
    expect(wrapper.find('.geo-input--disabled').exists()).toBe(true)
    expect(wrapper.find('.geo-input__icon').exists()).toBe(true)
    expect(wrapper.find('.geo-input__icon--trailing').exists()).toBe(true)
  })

  it('Should render leading icon if provided', function () {
    const wrapper = mount(GeoInput, {
      propsData: {
        leadingAccessoryIcon: ['fas', 'search']
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })

    expect(wrapper.find('.geo-input').exists()).toBe(true)
    expect(wrapper.find('.geo-input--error').exists()).toBe(false)
    expect(wrapper.find('.geo-input--success').exists()).toBe(false)
    expect(wrapper.find('.geo-input--disabled').exists()).toBe(false)
    expect(wrapper.find('.geo-input__icon').exists()).toBe(true)
    expect(wrapper.find('.geo-input__icon--trailing').exists()).toBe(false)
    expect(wrapper.find('.geo-input__icon--leading').exists()).toBe(true)
  })

  it('Should emit input', function () {
    const wrapper = mount(GeoInput)

    const input = wrapper.find('input')
    input.setValue('some value')

    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().input[0][0]).toEqual('some value')
  })

  it('Should render correct prefix when provided', function () {
    const wrapper = mount(GeoInput, {
      propsData: {
        prefix: true
      },
      slots: {
        prefix: 'A prefix'
      }
    })
    expect(wrapper.find('.geo-input__prefix').text()).toBe('A prefix')
  })

  it('Should render correct suffix when provided', function () {
    const wrapper = mount(GeoInput, {
      propsData: {
        prefix: true
      },
      slots: {
        prefix: `<font-awesome-icon :icon="['fas', 'euro-sign']" fixed-width />`
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock
      }
    })
    const fontAwesomeIconElem = wrapper.find(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'euro-sign'])
  })
})
