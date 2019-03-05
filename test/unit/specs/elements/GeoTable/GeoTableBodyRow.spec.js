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

    const instance = wrapper.find('.geo-table-body-row--default')
    expect(instance.exists()).toBe(true)

    expect(slotScope).toHaveProperty('cssModifier')
  })

  it('should render content', function () {
    const wrapper = mount(GeoTableBodyRow, {
      scopedSlots: {
        default: '<p>Demo content</p>'
      }
    })

    const instance = wrapper.find('.geo-table-body-row--default')
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

    const instance = wrapper.find('.geo-table-body-row--default--demo-modifier')
    expect(instance.exists()).toBe(true)

    expect(slotScope).toHaveProperty('cssModifier', 'demo-modifier')
  })

  it('should apply variant when provided', function () {
    const wrapper = mount(GeoTableBodyRow, {
      propsData: {
        variant: 'alternative'
      }
    })

    const instance = wrapper.find('.geo-table-body-row--alternative')
    expect(instance.exists()).toBe(true)
  })

  it('should apply variant and CSS suffix when both are provided', function () {
    let slotScope
    const wrapper = mount(GeoTableBodyRow, {
      propsData: {
        variant: 'selected',
        cssModifier: 'demo-modifier'
      },
      scopedSlots: {
        default (params) {
          slotScope = params
        }
      }
    })

    const instance = wrapper.find('.geo-table-body-row--selected--demo-modifier')
    expect(instance.exists()).toBe(true)

    expect(slotScope).toHaveProperty('cssModifier', 'demo-modifier')
  })

  it('should complain when using unknown variant', function () {
    const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => { })

    mount(GeoTableBodyRow, {
      propsData: {
        variant: 'unknown-variant-for-tests'
      }
    })

    expect(consoleErrorSpy).toHaveBeenCalled()

    consoleErrorSpy.mockRestore()
  })
})
