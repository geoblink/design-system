import { mount } from '@vue/test-utils'
import GeoDropdownCompactButton from '@/elements/GeoDropdown/GeoDropdownCompactButton.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

describe('GeoDropdownCompactButton', () => {
  it('Should render icon', function () {
    const wrapper = mount(GeoDropdownCompactButton, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        icon: ['fas', 'user']
      }
    })

    expect(wrapper.find('svg[data-prefix="fas"][data-icon="user"]').exists()).toBe(true)
  })

  it('Should emit click event when clicked', function () {
    const wrapper = mount(GeoDropdownCompactButton, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        icon: ['fas', 'user']
      }
    })

    wrapper.find('.geo-dropdown__compact-button-container').trigger('click')
    expect(wrapper.emitted()['click']).toBeTruthy()
  })
})
