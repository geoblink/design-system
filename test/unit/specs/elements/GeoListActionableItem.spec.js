import { mount } from '@vue/test-utils'
import GeoListActionableItem from '@/elements/GeoList/GeoListActionableItem.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

describe('GeoListActionableItem', () => {
  it('should render default slot', function () {
    const wrapper = mount(GeoListActionableItem, {
      slots: {
        default: [`<span class="spec-content">Body content</span>`]
      }
    })

    expect(wrapper.find('.spec-content').exists()).toBe(true)
  })

  it('should render trailingAccessoryItem slot', function () {
    const wrapper = mount(GeoListActionableItem, {
      slots: {
        default: [`<span class="spec-content">Body content</span>`],
        trailingAccessoryItem: [`<span class="spec-accessory">Icon</span>`]
      }
    })

    expect(wrapper.find('.spec-accessory').exists()).toBe(true)
  })

  it('should render actions slot', function () {
    const wrapper = mount(GeoListActionableItem, {
      slots: {
        default: [`<span class="spec-content">Body content</span>`],
        actions: [`<span class="spec-actions">Buttons</span>`]
      }
    })

    expect(wrapper.find('.spec-actions').exists()).toBe(true)
  })

  it('should render icon', function () {
    const wrapper = mount(GeoListActionableItem, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        icon: ['fas', 'times']
      }
    })

    expect(wrapper.find('svg[data-prefix="fas"][data-icon="times"]').exists()).toBe(true)
  })
})
