import { createLocalVue, mount } from '@vue/test-utils'
import GeoDropdownFooter from '@/elements/GeoDropdown/GeoDropdownFooter.vue'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-dropdown-footer', GeoDropdownFooter)

describe('GeoDropdownFooter', () => {
  it('should render default slot', function () {
    const wrapper = mount(GeoDropdownFooter, {
      slots: {
        default: [`<span class="my-demo-content">Just some unique demo content</span>`]
      }
    })

    expect(wrapper.find('.my-demo-content').exists()).toBe(true)
  })
})
