import { createLocalVue, mount } from '@vue/test-utils'
import GeoDropdownCompactButton from '@/elements/GeoDropdown/GeoDropdownCompactButton.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fab, fas, far)

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-dropdown-footer', GeoDropdownCompactButton)

describe('GeoDropdownCompactButton', () => {
  it('should render icon', function () {
    const wrapper = mount(GeoDropdownCompactButton, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        icon: ['far', 'user']
      }
    })

    expect(wrapper.find('svg[data-prefix="far"][data-icon="user"]').exists()).toBe(true)
  })

  it('should emit click event when clicked', function () {
    const wrapper = mount(GeoDropdownCompactButton, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        icon: ['far', 'user']
      }
    })

    wrapper.find('.geo-dropdown__compact-button-container').trigger('click')
    expect(wrapper.emitted()['click']).toBeTruthy()
  })
})
