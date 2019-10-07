import { mount } from '@vue/test-utils'
import GeoListItem from '@/elements/GeoList/GeoListItem.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

describe('GeoListItem', () => {
  it('Should render a <div> wrapper by default', () => {
    const wrapper = mount(GeoListItem)
    expect(wrapper.find('div.geo-list-item').exists()).toBe(true)
  })

  it('Should render a <label> wrapper if wrapperTag is provided', () => {
    const wrapper = mount(GeoListItem, {
      propsData: {
        wrapperTag: 'label'
      }
    })
    expect(wrapper.find('div.geo-list-item').exists()).toBe(false)
    expect(wrapper.find('label.geo-list-item').exists()).toBe(true)
  })

  it('Should render default slot', function () {
    const wrapper = mount(GeoListItem, {
      slots: {
        default: [`<span class="my-demo-content">Just some unique demo content</span>`]
      }
    })

    expect(wrapper.find('.my-demo-content').exists()).toBe(true)
  })

  it('Should render trailingAccessoryItem slot', function () {
    const wrapper = mount(GeoListItem, {
      slots: {
        default: [`<span class="my-demo-content">Just some unique demo content</span>`],
        trailingAccessoryItem: [`<span class="my-demo-accessory">Just some accessory item</span>`]
      }
    })

    expect(wrapper.find('.my-demo-accessory').exists()).toBe(true)
  })

  it('Should render icon', function () {
    const wrapper = mount(GeoListItem, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      context: {
        props: {
          icon: ['fas', 'user']
        }
      }
    })

    expect(wrapper.find('svg[data-prefix="fas"][data-icon="user"]').exists()).toBe(true)
  })

  it('Should render description', function () {
    const wrapper = mount(GeoListItem, {
      slots: {
        description: [`<span class="my-demo-description">Description</span>`]
      }
    })

    expect(wrapper.find('.my-demo-description').exists()).toBe(true)
  })

  it('Should emit click event', function () {
    const clickListener = jest.fn()
    const wrapper = mount(GeoListItem, {
      slots: {
        default: ['Just some unique demo content']
      },
      context: {
        on: {
          click: clickListener
        }
      }
    })
    wrapper.find('.geo-list-item').trigger('click')
    expect(clickListener).toHaveBeenCalled()
  })

  it('Should include CSS suffix', function () {
    const wrapper = mount(GeoListItem, {
      propsData: {
        cssModifier: 'my-custom-modifier'
      }
    })

    expect(wrapper.find('.geo-list-item--my-custom-modifier').exists()).toBe(true)
  })

  it('Should include disabled suffix when it is disabled', function () {
    const wrapper = mount(GeoListItem, {
      propsData: {
        disabled: true
      }
    })

    expect(wrapper.find('.geo-list-item--disabled').exists()).toBe(true)
  })

  it('Should include disabled suffix when it is disabled and has CSS modifier', function () {
    const wrapper = mount(GeoListItem, {
      propsData: {
        cssModifier: 'my-custom-modifier',
        disabled: true
      }
    })

    expect(wrapper.find('.geo-list-item--disabled--my-custom-modifier').exists()).toBe(true)
  })
})
