import { createLocalVue, mount } from '@vue/test-utils'
import GeoButton from '@/elements/GeoButton.vue'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-button', GeoButton)

describe('GeoButton', () => {
  it('should render button\'s content', function () {
    const wrapper = mount(GeoButton, {
      slots: {
        default: '<span>Button title</span>'
      },
      propsData: {
        type: 'primary'
      }
    })
    const button = wrapper.find('.geo-button')
    expect(button.exists()).toBe(true)
    expect(button.find('span').exists()).toBe(true)
  })

  it('should emit an event on click', function (done) {
    const wrapper = mount(GeoButton, {
      propsData: {
        type: 'primary'
      }
    })
    wrapper.find('.geo-button').trigger('click')
    setTimeout(function () {
      try {
        expect(wrapper.emitted()['click']).toBeTruthy()
        done()
      } catch (error) {
        done(error)
      }
    })
  })

  it('should not emit an event when it\'s disabled', function () {
    const wrapper = mount(GeoButton, {
      propsData: {
        type: 'primary',
        disabled: true
      }
    })

    const button = wrapper.find('.geo-button')
    button.trigger('click')
    expect(wrapper.emitted()['click']).toBeFalsy()
  })

  it('should add CSS Suffix when given', function () {
    const wrapper = mount(GeoButton, {
      propsData: {
        type: 'primary',
        cssModifier: 'custom'
      }
    })

    expect(wrapper.find('.geo-button--custom').exists()).toBe(true)
  })
})
