import { createLocalVue, mount } from '@vue/test-utils'
import GeoDropdownListItem from '@/elements/GeoDropdown/GeoDropdownListItem.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fab, fas, far)

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-dropdown-list-item', GeoDropdownListItem)

describe('GeoDropdownListItem', () => {
  it('should render default slot', function () {
    const wrapper = mount(GeoDropdownListItem, {
      slots: {
        default: [`<span class="my-demo-content">Just some unique demo content</span>`]
      }
    })

    expect(wrapper.find('.my-demo-content').exists()).toBe(true)
  })

  it('should render trailingAccessoryItem slot', function () {
    const wrapper = mount(GeoDropdownListItem, {
      slots: {
        default: [`<span class="my-demo-content">Just some unique demo content</span>`],
        trailingAccessoryItem: [`<span class="my-demo-accessory">Just some accessory item</span>`]
      }
    })

    expect(wrapper.find('.my-demo-accessory').exists()).toBe(true)
  })

  it('should render icon', function () {
    const wrapper = mount(GeoDropdownListItem, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        icon: ['far', 'user']
      }
    })

    expect(wrapper.find('svg[data-prefix="far"][data-icon="user"]').exists()).toBe(true)
  })

  it('should emit click event', function () {
    const wrapper = mount(GeoDropdownListItem, {
      slots: {
        default: ['Just some unique demo content']
      }
    })

    wrapper.find('.geo-dropdown__list-item').trigger('click')
    expect(wrapper.emitted()['click']).toBeTruthy()
  })
})
