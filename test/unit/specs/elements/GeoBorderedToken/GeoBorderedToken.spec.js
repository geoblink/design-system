import { createLocalVue, mount } from '@vue/test-utils'
import GeoBorderedToken from '@/elements/GeoBorderedToken/GeoBorderedToken.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

const FontAwesomeIconMock = {
  props: ['icon'],
  template: '<div></div>'
}

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-bordered-token', GeoBorderedToken)

describe('GeoBorderedToken', () => {
  it('Should render GeoBorderedToken component', function () {
    const wrapper = mount(GeoBorderedToken, {
      propsData: {
        label: 'test'
      }
    })
    expect(wrapper.find('.geo-bordered-token').exists()).toBe(true)
  })

  it('Should render the correct label', function () {
    const wrapper = mount(GeoBorderedToken, {
      propsData: {
        label: 'test'
      }
    })
    expect(wrapper.find('.geo-bordered-token__label').text()).toBe('test')
  })

  it('Should display the correct icon when provided', function () {
    const wrapper = mount(GeoBorderedToken, {
      propsData: {
        label: 'test',
        icon: ['fas', 'map-marker']
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock
      }
    })
    const fontAwesomeIconElem = wrapper.find(FontAwesomeIconMock)
    expect(fontAwesomeIconElem.props().icon).toStrictEqual(['fas', 'map-marker'])
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

  it('Should apply a CSS suffix when the modifier is provided', function () {
    const wrapper = mount(GeoBorderedToken, {
      propsData: {
        label: 'test',
        icon: ['fas', 'map-marker'],
        cssModifier: 'test-alert'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    expect(wrapper.find('.geo-bordered-token--test-alert').exists()).toBe(true)
  })
})
