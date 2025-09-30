import { mount } from '@vue/test-utils'
import GeoPill from '@/elements/GeoPill/GeoPill.vue'

// Helper function to create wrapper with registered components
function createWrapper (component, options = {}) {
  return mount(component, Object.assign({
    global: {
      components: {
        'geo-pill': GeoPill
      }
    }
  }, options))
}

describe('GeoPill', () => {
  it('Should render content', function () {
    const pillTextContent = 'Pill content'
    const wrapper = createWrapper(GeoPill, {
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
    const wrapper = createWrapper(GeoPill, {
      slots: {
        default: `<span>${pillTextContent}</span>`
      },
      props: {
        variant: 'light'
      }
    })
    const pill = wrapper.find('.geo-pill--light')
    expect(pill.exists()).toBe(true)
    expect(pill.find('span').exists()).toBe(true)
    expect(pill.find('span').text()).toBe(pillTextContent)
  })

  it('Should complain when using unknown variant', function () {
    const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })

    createWrapper(GeoPill, {
      props: {
        variant: 'unknown-variant-for-tests'
      }
    })

    expect(consoleWarnSpy).toHaveBeenCalled()

    consoleWarnSpy.mockRestore()
  })
})
