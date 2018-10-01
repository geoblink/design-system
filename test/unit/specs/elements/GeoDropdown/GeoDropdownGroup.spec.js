import { mount } from '@vue/test-utils'
import GeoDropdownGroup from '@/elements/GeoDropdown/GeoDropdownGroup.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

describe('GeoDropdownGroup', () => {
  it('should render title slot in header', function () {
    const wrapper = mount(GeoDropdownGroup, {
      slots: {
        title: [`<span class="my-demo-content">Just some unique demo content</span>`]
      }
    })

    expect(wrapper.find('.geo-dropdown__group__header .my-demo-content').exists()).toBe(true)
  })

  it('should not render header if there is no title slot', function () {
    const wrapper = mount(GeoDropdownGroup, {})

    expect(wrapper.find('.geo-dropdown__group__header').exists()).toBe(false)
  })

  it('should render icon in header', function () {
    const wrapper = mount(GeoDropdownGroup, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        icon: ['fas', 'user']
      },
      slots: {
        title: [`<span class="my-demo-content">Just some unique demo content</span>`]
      }
    })

    expect(wrapper.find('svg[data-prefix="fas"][data-icon="user"]').exists()).toBe(true)
  })

  it('should trigger click event when clicking on header', function () {
    const wrapper = mount(GeoDropdownGroup, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      slots: {
        title: [`<span class="my-demo-content">Just some unique demo content</span>`]
      }
    })

    wrapper.find('.geo-dropdown__group__header').trigger('click')
    expect(wrapper.emitted()['click']).toBeTruthy()
  })

  it('should render trailing accessory items from trailingAccessoryItem slot', function () {
    const wrapper = mount(GeoDropdownGroup, {
      slots: {
        title: [`<span class="some-title">Just some unique demo content</span>`],
        trailingAccessoryItem: [`<span class="my-demo-content">Just some unique demo content</span>`]
      }
    })

    expect(wrapper.find('.geo-dropdown__group__header__trailing-accessory-items .my-demo-content').exists()).toBe(true)
  })

  it('should not render trailing accessory items container if trailingAccessoryItem is empty', function () {
    const wrapper = mount(GeoDropdownGroup, {})

    expect(wrapper.find('.geo-dropdown__group__header__trailing-accessory-items').exists()).toBe(false)
  })
})
