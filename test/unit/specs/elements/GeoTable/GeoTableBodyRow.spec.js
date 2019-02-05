import { createLocalVue, mount } from '@vue/test-utils'
import GeoTableBodyRow from '@/elements/GeoTable/GeoTableBodyRow'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-table-body-row', GeoTableBodyRow)

describe('GeoTableBodyRow', () => {
  it('should render component', function () {
    let slotScope
    const wrapper = mount(GeoTableBodyRow, {
      scopedSlots: {
        default (params) {
          slotScope = params
        }
      }
    })

    const instance = wrapper.find('.geo-table-body-row')
    expect(instance.exists()).toBe(true)

    expect(slotScope).toHaveProperty('cssModifier')
  })

  it('should render content', function () {
    const wrapper = mount(GeoTableBodyRow, {
      scopedSlots: {
        default: '<p>Demo content</p>'
      }
    })

    const instance = wrapper.find('.geo-table-body-row')
    expect(instance.exists()).toBe(true)
    expect(instance.text()).toEqual('Demo content')
  })

  it('should apply CSS suffix when the modifier is provided', function () {
    let slotScope
    const wrapper = mount(GeoTableBodyRow, {
      propsData: {
        cssModifier: 'demo-modifier'
      },
      scopedSlots: {
        default (params) {
          slotScope = params
        }
      }
    })

    const instance = wrapper.find('.geo-table-body-row--demo-modifier')
    expect(instance.exists()).toBe(true)

    expect(slotScope).toHaveProperty('cssModifier', 'demo-modifier')
  })
})
