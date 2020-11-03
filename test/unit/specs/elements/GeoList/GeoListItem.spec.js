import { shallowMount } from '@vue/test-utils'
import GeoListItem from '@/elements/GeoList/GeoListItem.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

describe.only('GeoListItem', () => {
  it('Should render a <div> wrapper by default', () => {
    expect(getShallowWrapper().find('div.geo-list-item').exists()).toBe(true)
  })

  it('Should render a <label> wrapper if wrapperTag is provided', () => {
    const wrapper = getShallowWrapper({
      propsData: {
        wrapperTag: 'label'
      }
    })
    expect(wrapper.find('div.geo-list-item').exists()).toBe(false)
    expect(wrapper.find('label.geo-list-item').exists()).toBe(true)
  })

  it('Should render default slot', function () {
    const wrapper = getShallowWrapper({
      slots: {
        default: ['<span class="my-demo-content">Just some unique demo content</span>']
      }
    })

    expect(wrapper.find('.my-demo-content').exists()).toBe(true)
  })

  it('Should render trailingAccessoryItem slot', function () {
    const wrapper = getShallowWrapper({
      slots: {
        default: ['<span class="my-demo-content">Just some unique demo content</span>'],
        trailingAccessoryItem: ['<span class="my-demo-accessory">Just some accessory item</span>']
      }
    })

    expect(wrapper.find('.my-demo-accessory').exists()).toBe(true)
  })

  it('Should render icon', function () {
    const wrapper = getShallowWrapper({
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        icon: ['fas', 'user']
      }
    })

    expect(wrapper.find('svg[data-prefix="fas"][data-icon="user"]').exists()).toBe(true)
  })

  it('Should render description', function () {
    const wrapper = getShallowWrapper({
      slots: {
        description: ['<span class="my-demo-description">Description</span>']
      }
    })

    expect(wrapper.find('.my-demo-description').exists()).toBe(true)
  })

  it('Should emit click event', function () {
    const clickListener = jest.fn()
    const wrapper = getShallowWrapper({
      slots: {
        default: ['Just some unique demo content']
      },
      listeners: {
        click: clickListener
      }
    })
    wrapper.find('.geo-list-item').trigger('click')
    expect(clickListener).toHaveBeenCalled()
  })

  it('Should include disabled suffix when it is disabled', function () {
    const wrapper = getShallowWrapper({
      propsData: {
        disabled: true
      }
    })

    expect(wrapper.find('.geo-list-item--disabled').exists()).toBe(true)
  })
})

function getShallowWrapper (options) {
  return shallowMount(GeoListItem, options)
}
