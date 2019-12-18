import { mount } from '@vue/test-utils'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import GeoInput from '@/elements/GeoInput/GeoInput.vue'
import GeoInputPrefix from '@/elements/GeoInput/GeoInputPrefix.vue'
import GeoInputSuffix from '@/elements/GeoInput/GeoInputSuffix.vue'

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
    expect(wrapper.find('.geo-input__accessory-items').exists()).toBe(true)
    expect(wrapper.find('.geo-input__accessory-items--trailing').exists()).toBe(true)
  })

  it('Should render leading accessory item if provided', function () {
    const wrapper = mount(GeoInput, {
      slots: {
        leadingAccessoryItem: '<font-awesome-icon :icon="[\'fas\', \'search\']" />'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })

    expect(wrapper.find('.geo-input').exists()).toBe(true)
    expect(wrapper.find('.geo-input--error').exists()).toBe(false)
    expect(wrapper.find('.geo-input--success').exists()).toBe(false)
    expect(wrapper.find('.geo-input--disabled').exists()).toBe(false)
    expect(wrapper.find('.geo-input__accessory-items').exists()).toBe(true)
    expect(wrapper.find('.geo-input__accessory-items--leading').exists()).toBe(true)
    expect(wrapper.find(FontAwesomeIcon).exists()).toBe(true)
  })

  it('Should emit input', function () {
    const wrapper = mount(GeoInput)

    const input = wrapper.find('input')
    input.setValue('some value')

    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().input[0][0]).toEqual('some value')
  })

  it('Should render accessory items when provided', function () {
    const wrapper = mount(GeoInput, {
      slots: {
        trailingAccessoryItem: '<p class="my-accessory-item">This is something custom</p>'
      }
    })
    expect(wrapper.find('.my-accessory-item').exists()).toBe(true)
  })

  it('Should render correct prefix when provided', function () {
    const wrapper = mount(GeoInput, {
      slots: {
        leadingAccessoryItem: '<geo-input-prefix> A prefix </geo-input-prefix>'
      },
      stubs: {
        GeoInputPrefix
      }
    })
    expect(wrapper.find('.geo-input__accessory-items').exists()).toBe(true)
    expect(wrapper.find('.geo-input-prefix').text()).toBe('A prefix')
  })

  it('Should render correct suffix when provided', function () {
    const wrapper = mount(GeoInput, {
      slots: {
        trailingAccessoryItem: '<geo-input-suffix> A suffix </geo-input-suffix>'
      },
      stubs: {
        GeoInputSuffix
      }
    })
    expect(wrapper.find('.geo-input__accessory-items').exists()).toBe(true)
    expect(wrapper.find('.geo-input-suffix').text()).toBe('A suffix')
  })
})
