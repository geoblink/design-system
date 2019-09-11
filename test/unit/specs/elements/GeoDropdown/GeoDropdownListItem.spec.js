import { mount } from '@vue/test-utils'
import GeoDropdownListItem from '@/elements/GeoDropdown/GeoDropdownListItem.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

describe('GeoDropdownListItem', () => {
  it('Should render default slot', function () {
    const wrapper = mount(GeoDropdownListItem, {
      slots: {
        default: [`<span class="my-demo-content">Just some unique demo content</span>`]
      }
    })

    expect(wrapper.find('.my-demo-content').exists()).toBe(true)
  })

  it('Should render trailingAccessoryItem slot', function () {
    const wrapper = mount(GeoDropdownListItem, {
      slots: {
        default: [`<span class="my-demo-content">Just some unique demo content</span>`],
        trailingAccessoryItem: [`<span class="my-demo-accessory">Just some accessory item</span>`]
      }
    })

    expect(wrapper.find('.my-demo-accessory').exists()).toBe(true)
  })

  it('Should render icon', function () {
    const wrapper = mount(GeoDropdownListItem, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        icon: ['fas', 'user']
      }
    })

    expect(wrapper.find('svg[data-prefix="fas"][data-icon="user"]').exists()).toBe(true)
  })

  it('Should emit click event', function () {
    const wrapper = mount(GeoDropdownListItem, {
      slots: {
        default: ['Just some unique demo content']
      }
    })

    wrapper.find('.geo-dropdown__list-item').trigger('click')
    expect(wrapper.emitted()['click']).toBeTruthy()
  })
})
