import { createLocalVue, mount } from '@vue/test-utils'
import GeoTableHeaderRowCell from '@/elements/GeoTable/GeoTableHeaderRowCell'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-table-header-row-cell', GeoTableHeaderRowCell)

describe('GeoTableHeaderRowCell', () => {
  it('Should render component', function () {
    let slotScope
    const wrapper = mount(GeoTableHeaderRowCell, {
      scopedSlots: {
        default (params) {
          slotScope = params
        }
      }
    })

    const instance = wrapper.find('.geo-table-header-row-cell--main')
    expect(instance.exists()).toBe(true)

    expect(slotScope).toHaveProperty('cssModifier')
    expect(slotScope).toHaveProperty('variant', 'main')
  })

  it('Should render `aux` variant', function () {
    const wrapper = mount(GeoTableHeaderRowCell, {
      propsData: {
        variant: GeoTableHeaderRowCell.constants.VARIANTS.aux
      }
    })

    const instance = wrapper.find('.geo-table-header-row-cell--aux')
    expect(instance.exists()).toBe(true)
  })

  it('Should render `main` variant', function () {
    const wrapper = mount(GeoTableHeaderRowCell, {
      propsData: {
        variant: GeoTableHeaderRowCell.constants.VARIANTS.main
      }
    })

    const instance = wrapper.find('.geo-table-header-row-cell--main')
    expect(instance.exists()).toBe(true)
  })

  it('Should render `single` variant', function () {
    const wrapper = mount(GeoTableHeaderRowCell, {
      propsData: {
        variant: GeoTableHeaderRowCell.constants.VARIANTS.single
      }
    })

    const instance = wrapper.find('.geo-table-header-row-cell--single')
    expect(instance.exists()).toBe(true)
  })

  it('Should complain when using unknown variant', function () {
    const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => { })
    const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })

    mount(GeoTableHeaderRowCell, {
      propsData: {
        variant: 'unknown-variant-for-tests'
      }
    })

    expect(consoleErrorSpy).toHaveBeenCalled()
    expect(consoleWarnSpy).toHaveBeenCalled()

    consoleErrorSpy.mockRestore()
    consoleWarnSpy.mockRestore()
  })

  it('Should render content', function () {
    const wrapper = mount(GeoTableHeaderRowCell, {
      scopedSlots: {
        default: '<p>Demo content</p>'
      }
    })

    const instance = wrapper.find('.geo-table-header-row-cell--main')
    expect(instance.exists()).toBe(true)
    expect(instance.text()).toEqual('Demo content')
  })

  it('Should apply CSS suffix when the modifier is provided', function () {
    let slotScope
    const wrapper = mount(GeoTableHeaderRowCell, {
      propsData: {
        cssModifier: 'demo-modifier'
      },
      scopedSlots: {
        default (params) {
          slotScope = params
        }
      }
    })

    const instance = wrapper.find('.geo-table-header-row-cell--main--demo-modifier')
    expect(instance.exists()).toBe(true)

    expect(slotScope).toHaveProperty('cssModifier', 'demo-modifier')
  })
})
