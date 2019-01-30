import { createLocalVue, mount } from '@vue/test-utils'
import GeoTableBodyRowCell from '@/elements/GeoTable/GeoTableBodyRowCell'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-table-body-row-cell', GeoTableBodyRowCell)

describe('GeoTableBodyRowCell', () => {
  it('should render component', function () {
    let slotScope
    const wrapper = mount(GeoTableBodyRowCell, {
      scopedSlots: {
        default (params) {
          slotScope = params
        }
      }
    })

    const instance = wrapper.find('.geo-table-body-row-cell')
    expect(instance.exists()).toBe(true)

    expect(slotScope).toHaveProperty('cssModifier')
  })

  it('should render content', function () {
    const wrapper = mount(GeoTableBodyRowCell, {
      scopedSlots: {
        default: '<p>Demo content</p>'
      }
    })

    const instance = wrapper.find('.geo-table-body-row-cell')
    expect(instance.exists()).toBe(true)
    expect(instance.text()).toEqual('Demo content')
  })

  it('should apply CSS suffix when the modifier is provided', function () {
    let slotScope
    const wrapper = mount(GeoTableBodyRowCell, {
      propsData: {
        cssModifier: 'demo-modifier'
      },
      scopedSlots: {
        default (params) {
          slotScope = params
        }
      }
    })

    const instance = wrapper.find('.geo-table-body-row-cell--demo-modifier')
    expect(instance.exists()).toBe(true)

    expect(slotScope).toHaveProperty('cssModifier', 'demo-modifier')
  })
})
