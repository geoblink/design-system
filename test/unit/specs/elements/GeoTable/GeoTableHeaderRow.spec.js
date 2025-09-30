import { mount } from '@vue/test-utils'
import GeoTableHeaderRow from '@/elements/GeoTable/GeoTableHeaderRow'

function createWrapper (component, options = {}) {
  return mount(component, Object.assign({}, options))
}

describe('GeoTableHeaderRow', () => {
  it('Should render component', function () {
    let slotScope
    const wrapper = createWrapper(GeoTableHeaderRow, {
      slots: {
        default: (params) => { slotScope = params; return '' }
      }
    })

    const instance = wrapper.find('.geo-table-header-row--main')
    expect(instance.exists()).toBe(true)

    expect(slotScope).toHaveProperty('variant', 'main')
  })

  it('Should render `aux` variant', function () {
    const wrapper = createWrapper(GeoTableHeaderRow, {
      props: {
        variant: GeoTableHeaderRow.constants.VARIANTS.aux
      }
    })

    const instance = wrapper.find('.geo-table-header-row--aux')
    expect(instance.exists()).toBe(true)
  })

  it('Should render `main` variant', function () {
    const wrapper = createWrapper(GeoTableHeaderRow, {
      props: {
        variant: GeoTableHeaderRow.constants.VARIANTS.main
      }
    })

    const instance = wrapper.find('.geo-table-header-row--main')
    expect(instance.exists()).toBe(true)
  })

  it('Should render `single` variant', function () {
    const wrapper = createWrapper(GeoTableHeaderRow, {
      props: {
        variant: GeoTableHeaderRow.constants.VARIANTS.single
      }
    })

    const instance = wrapper.find('.geo-table-header-row--single')
    expect(instance.exists()).toBe(true)
  })

  it('Should complain when using unknown variant', function () {
    const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })

    createWrapper(GeoTableHeaderRow, {
      props: {
        variant: 'unknown-variant-for-tests'
      }
    })

    expect(consoleWarnSpy).toHaveBeenCalled()

    consoleWarnSpy.mockRestore()
  })

  it('Should render content', function () {
    const wrapper = createWrapper(GeoTableHeaderRow, {
      slots: {
        default: '<p>Demo content</p>'
      }
    })

    const instance = wrapper.find('.geo-table-header-row--main')
    expect(instance.exists()).toBe(true)
    expect(instance.text()).toEqual('Demo content')
  })
})
