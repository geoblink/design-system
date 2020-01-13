import { mount } from '@vue/test-utils'
import GeoInputMessage from '@/elements/GeoInput/GeoInputMessage.vue'

describe('GeoInputMessage', () => {
  it('Should render', function () {
    const wrapper = mount(GeoInputMessage)
    expect(wrapper.find('.geo-input-message').exists()).toBe(true)
  })

  it('Should render with variant', function () {
    const wrapper = mount(GeoInputMessage, {
      context: {
        props: {
          variant: 'error'
        }
      }
    })

    expect(wrapper.find('.geo-input-message--error').exists()).toBe(true)
  })

  it('Should check variant validator is correct', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    const variant = GeoInputMessage.props.variant
    expect(variant.validator(undefined)).toBeTruthy()
    expect(variant.validator('success')).toBeTruthy()
    expect(variant.validator('test')).toBeFalsy()
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
  })
})
