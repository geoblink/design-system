import { mount } from '@vue/test-utils'
import GeoBorderedToken from '@/elements/GeoBorderedToken/GeoBorderedToken.vue'
import { FontAwesomeIconMock, expectFontAwesomeIconProp } from 'test/unit/utils/FontAwesomeIconMock.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

// Helper function to create wrapper with registered components
function createWrapper (component, options = {}) {
  return mount(component, Object.assign({
    global: {
      components: {
        'geo-bordered-token': GeoBorderedToken
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock
      }
    }
  }, options))
}

describe('GeoBorderedToken', () => {
  it('Should render GeoBorderedToken component', function () {
    const wrapper = createWrapper(GeoBorderedToken)
    expect(wrapper.find('.geo-bordered-token').exists()).toBe(true)
  })

  it('Should render the correct label', function () {
    const wrapper = createWrapper(GeoBorderedToken, {
      slots: {
        default: 'test'
      }
    })
    expect(wrapper.find('.geo-bordered-token__label').text()).toBe('test')
  })

  it('Should display the correct icon when provided', function () {
    const wrapper = createWrapper(GeoBorderedToken, {
      props: {
        icon: ['fas', 'map-marker']
      },
      slots: {
        default: 'test'
      }
    })
    const fontAwesomeIconElem = wrapper.findComponent(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'map-marker'])
  })

  it('Should not display the slot when label is defined', function () {
    jest.spyOn(console, 'warn').mockImplementation(() => {})
    const wrapper = createWrapper(GeoBorderedToken, {
      props: {
        label: 'test'
      },
      slots: {
        default: '<p class="my-class">default slot</p>'
      }
    })
    expect(console.warn).toHaveBeenCalledTimes(1)
    expect(wrapper.find('.my-class').exists()).toBe(false)
    expect(wrapper.find('.geo-bordered-token__label').text()).toBe('test')
  })

  it('Should not display any icon when none provided', function () {
    const wrapper = createWrapper(GeoBorderedToken, {
      props: {
        label: 'test'
      }
    })
    expect(wrapper.find('.geo-bordered-token__icon').exists()).toBe(false)
  })
})
