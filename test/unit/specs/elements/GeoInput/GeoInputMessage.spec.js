import { mount } from '@vue/test-utils'
import GeoInputMessage from '@/elements/GeoInput/GeoInputMessage.vue'

describe('GeoInputMessage', () => {
  it('should render', function () {
    const wrapper = mount(GeoInputMessage)
    expect(wrapper.find('.geo-input-message').exists()).toBe(true)
  })

  it('should render with variant', function () {
    const wrapper = mount(GeoInputMessage, {
      context: {
        props: {
          variant: 'error'
        }
      }
    })

    expect(wrapper.find('.geo-input-message--error').exists()).toBe(true)
  })

  it('should render with cssModifier', function () {
    const wrapper = mount(GeoInputMessage, {
      context: {
        props: {
          variant: 'error',
          cssModifier: 'my-message'
        }
      }
    })

    expect(wrapper.find('.geo-input-message--error--my-message').exists()).toBe(true)
  })
})