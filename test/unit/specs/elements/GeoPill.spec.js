import { createLocalVue, mount } from '@vue/test-utils'
import GeoPill from '@/elements/GeoPill/GeoPill.vue'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-pill', GeoPill)

describe('GeoPill', () => {
  it('Should render content', function () {
    const pillTextContent = 'Pill content'
    const wrapper = mount(GeoPill, {
      slots: {
        default: `<span>${pillTextContent}</span>`
      }
    })
    const pill = wrapper.find('.geo-pill--default')
    expect(pill.exists()).toBe(true)
    expect(pill.find('span').exists()).toBe(true)
    expect(pill.find('span').text()).toBe(pillTextContent)
  })

  it('Should consider variant', function () {
    const pillTextContent = 'Pill content'
    const wrapper = mount(GeoPill, {
      slots: {
        default: `<span>${pillTextContent}</span>`
      },
      propsData: {
        variant: 'light'
      }
    })
    const pill = wrapper.find('.geo-pill--light')
    expect(pill.exists()).toBe(true)
    expect(pill.find('span').exists()).toBe(true)
    expect(pill.find('span').text()).toBe(pillTextContent)
  })

  it('Should complain when using unknown variant', function () {
    const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => { })

    mount(GeoPill, {
      propsData: {
        variant: 'unknown-variant-for-tests'
      }
    })

    expect(consoleErrorSpy).toHaveBeenCalled()

    consoleErrorSpy.mockRestore()
  })
})
