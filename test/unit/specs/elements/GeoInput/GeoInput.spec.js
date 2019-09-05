import { mount } from '@vue/test-utils'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import GeoInput from '@/elements/GeoInput/GeoInput.vue'

library.add(fas)

describe('GeoInput', () => {
  it('should render', function () {
    const wrapper = mount(GeoInput)
    expect(wrapper.find('.geo-input').exists()).toBe(true)
    expect(wrapper.find('.geo-input--error').exists()).toBe(false)
    expect(wrapper.find('.geo-input--success').exists()).toBe(false)
    expect(wrapper.find('.geo-input--disabled').exists()).toBe(false)
  })

  it('should render as error', function () {
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

  it('should render as success', function () {
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

  it('should render as disabled', function () {
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

  it('should render leading icon if provided', function () {
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

  it('should emit input', function () {
    const wrapper = mount(GeoInput)

    const input = wrapper.find('input')
    input.setValue('some value')

    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().input[0][0]).toEqual('some value')
  })
})
