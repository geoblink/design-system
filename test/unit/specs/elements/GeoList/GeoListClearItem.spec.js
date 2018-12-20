import { mount } from '@vue/test-utils'
import GeoListClearItem from '@/elements/GeoList/GeoListClearItem.vue'

describe('GeoListClearItem', () => {
  it('should render default slot', () => {
    const wrapper = mount(GeoListClearItem, {
      slots: {
        default: [`<span class="read-only-entry-content">Some read only entry text</span>`]
      }
    })

    expect(wrapper.find('.read-only-entry-content').exists()).toBe(true)
    expect(wrapper.find('.read-only-entry-content').element.innerHTML).toBe('Some read only entry text')
  })
})
