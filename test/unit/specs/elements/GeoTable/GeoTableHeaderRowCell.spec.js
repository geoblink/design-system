import { mount } from '@vue/test-utils'
import GeoTableHeaderRowCell from '@/elements/GeoTable/GeoTableHeaderRowCell'

describe('GeoTableHeaderRowCell', () => {
  it('Should render component', function () {
    let slotScope
    const wrapper = createWrapper({
      slots: {
        default: (params) => { slotScope = params; return '' }
      }
    })

    const instance = wrapper.find('.geo-table-header-row-cell--main')
    expect(instance.exists()).toBe(true)

    expect(slotScope).toHaveProperty('variant', 'main')
  })

  it('Should render `aux` variant', function () {
    const wrapper = createWrapper({
      props: {
        variant: GeoTableHeaderRowCell.constants.VARIANTS.aux
      }
    })

    const instance = wrapper.find('.geo-table-header-row-cell--aux')
    expect(instance.exists()).toBe(true)
  })

  it('Should render `main` variant', function () {
    const wrapper = createWrapper({
      props: {
        variant: GeoTableHeaderRowCell.constants.VARIANTS.main
      }
    })

    const instance = wrapper.find('.geo-table-header-row-cell--main')
    expect(instance.exists()).toBe(true)
  })

  it('Should render `single` variant', function () {
    const wrapper = createWrapper({
      props: {
        variant: GeoTableHeaderRowCell.constants.VARIANTS.single
      }
    })

    const instance = wrapper.find('.geo-table-header-row-cell--single')
    expect(instance.exists()).toBe(true)
  })

  it('Should complain when using unknown variant', function () {
    const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })

    createWrapper({
      props: {
        variant: 'unknown-variant-for-tests'
      }
    })

    expect(consoleWarnSpy).toHaveBeenCalled()

    consoleWarnSpy.mockRestore()
  })

  it('Should render content', function () {
    const wrapper = createWrapper({
      slots: {
        default: '<p>Demo content</p>'
      }
    })

    const instance = wrapper.find('.geo-table-header-row-cell--main')
    expect(instance.exists()).toBe(true)
    expect(instance.text()).toEqual('Demo content')
  })
})

function createWrapper (options = {}) {
  return mount(GeoTableHeaderRowCell, Object.assign({}, options))
}
