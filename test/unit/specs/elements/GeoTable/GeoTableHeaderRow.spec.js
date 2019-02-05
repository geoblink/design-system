import { createLocalVue, mount } from '@vue/test-utils'
import GeoTableHeaderRow from '@/elements/GeoTable/GeoTableHeaderRow'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-table-header-row', GeoTableHeaderRow)

describe('GeoTableHeaderRow', () => {
  it('should render component', function () {
    let slotScope
    const wrapper = mount(GeoTableHeaderRow, {
      scopedSlots: {
        default (params) {
          slotScope = params
        }
      }
    })

    const instance = wrapper.find('.geo-table-header-row--main')
    expect(instance.exists()).toBe(true)

    expect(slotScope).toHaveProperty('cssModifier')
    expect(slotScope).toHaveProperty('variant', 'main')
  })

  it('should render `aux` variant', function () {
    const wrapper = mount(GeoTableHeaderRow, {
      propsData: {
        variant: GeoTableHeaderRow.constants.VARIANTS.aux
      }
    })

    const instance = wrapper.find('.geo-table-header-row--aux')
    expect(instance.exists()).toBe(true)
  })

  it('should render `main` variant', function () {
    const wrapper = mount(GeoTableHeaderRow, {
      propsData: {
        variant: GeoTableHeaderRow.constants.VARIANTS.main
      }
    })

    const instance = wrapper.find('.geo-table-header-row--main')
    expect(instance.exists()).toBe(true)
  })

  it('should render `single` variant', function () {
    const wrapper = mount(GeoTableHeaderRow, {
      propsData: {
        variant: GeoTableHeaderRow.constants.VARIANTS.single
      }
    })

    const instance = wrapper.find('.geo-table-header-row--single')
    expect(instance.exists()).toBe(true)
  })

  it('should complain when using unknown variant', function () {
    const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => { })
    const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })

    mount(GeoTableHeaderRow, {
      propsData: {
        variant: 'unknown-variant-for-tests'
      }
    })

    expect(consoleErrorSpy).toHaveBeenCalled()
    expect(consoleWarnSpy).toHaveBeenCalled()

    consoleErrorSpy.mockRestore()
    consoleWarnSpy.mockRestore()
  })

  it('should render content', function () {
    const wrapper = mount(GeoTableHeaderRow, {
      scopedSlots: {
        default: '<p>Demo content</p>'
      }
    })

    const instance = wrapper.find('.geo-table-header-row--main')
    expect(instance.exists()).toBe(true)
    expect(instance.text()).toEqual('Demo content')
  })

  it('should apply CSS suffix when the modifier is provided', function () {
    let slotScope
    const wrapper = mount(GeoTableHeaderRow, {
      propsData: {
        cssModifier: 'demo-modifier'
      },
      scopedSlots: {
        default (params) {
          slotScope = params
        }
      }
    })

    const instance = wrapper.find('.geo-table-header-row--main--demo-modifier')
    expect(instance.exists()).toBe(true)

    expect(slotScope).toHaveProperty('cssModifier', 'demo-modifier')
  })
})
