import { mount } from '@vue/test-utils'
import GeoTableBodyRow from '@/elements/GeoTable/GeoTableBodyRow'

function getWrapper (component, options = {}) {
  return mount(component, Object.assign({}, options))
}

describe('GeoTableBodyRow', () => {
  it('Should render component', function () {
    const wrapper = getWrapper(GeoTableBodyRow, {
      slots: {
        default: () => ''
      }
    })

    const instance = wrapper.find('.geo-table-body-row--default')
    expect(instance.exists()).toBe(true)
  })

  it('Should render content', function () {
    const wrapper = getWrapper(GeoTableBodyRow, {
      slots: {
        default: '<p>Demo content</p>'
      }
    })

    const instance = wrapper.find('.geo-table-body-row--default')
    expect(instance.exists()).toBe(true)
    expect(instance.text()).toEqual('Demo content')
  })

  it('Should apply variant when provided', function () {
    const wrapper = getWrapper(GeoTableBodyRow, {
      props: {
        variant: 'highlighted'
      }
    })

    const instance = wrapper.find('.geo-table-body-row--highlighted')
    expect(instance.exists()).toBe(true)
  })

  it('Should complain when using unknown variant', function () {
    const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })

    getWrapper(GeoTableBodyRow, {
      props: {
        variant: 'unknown-variant-for-tests'
      }
    })

    expect(consoleWarnSpy).toHaveBeenCalled()

    consoleWarnSpy.mockRestore()
  })
})
