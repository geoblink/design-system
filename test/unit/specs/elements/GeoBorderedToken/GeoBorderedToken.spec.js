import { createLocalVue, mount } from '@vue/test-utils'
import GeoBorderedToken from '@/elements/GeoBorderedToken/GeoBorderedToken.vue'
import { FontAwesomeIconMock, expectFontAwesomeIconProp } from 'test/unit/utils/FontAwesomeIconMock.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-bordered-token', GeoBorderedToken)

describe('GeoBorderedToken', () => {
  it('Should render GeoBorderedToken component', function () {
    const wrapper = mount(GeoBorderedToken)
    expect(wrapper.find('.geo-bordered-token').exists()).toBe(true)
  })

  it('Should render the correct label', function () {
    const wrapper = mount(GeoBorderedToken, {
      slots: {
        default: 'test'
      }
    })
    expect(wrapper.find('.geo-bordered-token__label').text()).toBe('test')
  })

  it('Should display the correct icon when provided', function () {
    const wrapper = mount(GeoBorderedToken, {
      propsData: {
        icon: ['fas', 'map-marker']
      },
      slots: {
        default: 'test'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock
      }
    })
    const fontAwesomeIconElem = wrapper.find(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'map-marker'])
  })

  it('Should not display the slot when label is defined', function () {
    jest.spyOn(console, 'warn').mockImplementation(() => {})
    const wrapper = mount(GeoBorderedToken, {
      propsData: {
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
    const wrapper = mount(GeoBorderedToken, {
      propsData: {
        label: 'test'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    expect(wrapper.find('.geo-bordered-token__icon').exists()).toBe(false)
  })
})
