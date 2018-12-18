import { mount } from '@vue/test-utils'
import GeoSelectReadOnlyEntry from '@/elements/GeoSelect/GeoSelectReadOnlyEntry.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

describe('GeoSelectReadOnlyEntry', () => {
  it('should render default slot', () => {
    const wrapper = mount(GeoSelectReadOnlyEntry, {
      slots: {
        default: [`<span class="read-only-entry-content">Some read only entry text</span>`]
      }
    })

    expect(wrapper.find('.read-only-entry-content').exists()).toBe(true)
    expect(wrapper.find('.read-only-entry-content').element.innerHTML).toBe('Some read only entry text')
  })

  it('should render leading accessory item', () => {
    const wrapper = mount(GeoSelectReadOnlyEntry, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      slots: {
        leadingAccessoryItem: `<font-awesome-icon slot="leadingAccessoryItem" :icon="['fas', 'flag']" />`
      }
    })

    expect(wrapper.find('.fa-flag').exists()).toBe(true)
  })

  it('should render trailing accessory item', () => {
    const wrapper = mount(GeoSelectReadOnlyEntry, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      slots: {
        trailingAccessoryItem: `<font-awesome-icon slot="trailingAccessoryItem" :icon="['fas', 'flag']" />`
      }
    })

    expect(wrapper.find('.fa-flag').exists()).toBe(true)
  })
})
