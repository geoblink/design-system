import { mount } from '@vue/test-utils'
import GeoListItem from '@/elements/GeoList/GeoListItem.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

describe('GeoListItem', () => {
  it('should render default slot', function () {
    const wrapper = mount(GeoListItem, {
      slots: {
        default: [`<span class="my-demo-content">Just some unique demo content</span>`]
      }
    })

    expect(wrapper.find('.my-demo-content').exists()).toBe(true)
  })

  it('should render trailingAccessoryItem slot', function () {
    const wrapper = mount(GeoListItem, {
      slots: {
        default: [`<span class="my-demo-content">Just some unique demo content</span>`],
        trailingAccessoryItem: [`<span class="my-demo-accessory">Just some accessory item</span>`]
      }
    })

    expect(wrapper.find('.my-demo-accessory').exists()).toBe(true)
  })

  it('should render icon', function () {
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

  it('should render description', function () {
    const wrapper = mount(GeoListItem, {
      slots: {
        description: [`<span class="my-demo-description">Description</span>`]
      }
    })

    expect(wrapper.find('.my-demo-description').exists()).toBe(true)
  })

  it('should emit click event', function () {
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
})
