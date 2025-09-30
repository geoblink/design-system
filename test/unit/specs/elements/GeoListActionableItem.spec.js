import { mount } from '@vue/test-utils'
import GeoListActionableItem from '@/elements/GeoList/GeoListActionableItem.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIconMock, expectFontAwesomeIconProp } from 'test/unit/utils/FontAwesomeIconMock'

library.add(fas)

describe('GeoListActionableItem', () => {
  it('Should render default slot', function () {
    const wrapper = mount(GeoListActionableItem, {
      slots: {
        default: ['<span class="spec-content">Body content</span>']
      }
    })

    expect(wrapper.find('.spec-content').exists()).toBe(true)
  })

  it('Should render trailingAccessoryItem slot', function () {
    const wrapper = mount(GeoListActionableItem, {
      slots: {
        default: ['<span class="spec-content">Body content</span>'],
        trailingAccessoryItem: ['<span class="spec-accessory">Icon</span>']
      }
    })

    expect(wrapper.find('.spec-accessory').exists()).toBe(true)
  })

  it('Should render actions slot', function () {
    const wrapper = mount(GeoListActionableItem, {
      slots: {
        default: ['<span class="spec-content">Body content</span>'],
        actions: ['<span class="spec-actions">Buttons</span>']
      }
    })

    expect(wrapper.find('.spec-actions').exists()).toBe(true)
  })

  it('Should render icon', function () {
    const wrapper = mount(GeoListActionableItem, {
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      },
      props: {
        icon: ['fas', 'times']
      }
    })

    const fontAwesomeIcon = wrapper.findComponent(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIcon, ['fas', 'times'])
  })
})
