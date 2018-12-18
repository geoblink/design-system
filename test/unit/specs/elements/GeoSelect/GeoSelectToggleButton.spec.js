import { mount } from '@vue/test-utils'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import GeoSelectToggleButton from '@/elements/GeoSelect/GeoSelectToggleButton.vue'

library.add(fas)

describe('GeoSelectToggleButton', () => {
  it('Should render element', () => {
    const wrapper = mount(GeoSelectToggleButton, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        isEmpty: true,
        dropdownIcon: ['fas', 'chevron-down']
      }
    })
    expect(wrapper.find('.geo-select-toggle-button').exists()).toBe(true)
  })

  it('Should emit click event when clicking on toggle icon', () => {
    const wrapper = mount(GeoSelectToggleButton, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        isEmpty: true,
        dropdownIcon: ['fas', 'chevron-down']
      }
    })
    wrapper.find('.geo-select-toggle-button').trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })
})
