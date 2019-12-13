import { createLocalVue, mount } from '@vue/test-utils'
import GeoTableBodyRow from '@/elements/GeoTable/GeoTableBodyRow'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-table-body-row', GeoTableBodyRow)

describe('GeoTableBodyRow', () => {
  it('Should render component', function () {
    const wrapper = mount(GeoTableBodyRow, {
      scopedSlots: {
        default () { }
      }
    })

    const instance = wrapper.find('.geo-table-body-row--default')
    expect(instance.exists()).toBe(true)
  })

  it('Should render content', function () {
    const wrapper = mount(GeoTableBodyRow, {
      scopedSlots: {
        default: '<p>Demo content</p>'
      }
    })

    const instance = wrapper.find('.geo-table-body-row--default')
    expect(instance.exists()).toBe(true)
    expect(instance.text()).toEqual('Demo content')
  })

  it('Should apply variant when provided', function () {
    const wrapper = mount(GeoTableBodyRow, {
      propsData: {
        variant: 'highlighted'
      }
    })

    const instance = wrapper.find('.geo-table-body-row--highlighted')
    expect(instance.exists()).toBe(true)
  })

  it('Should complain when using unknown variant', function () {
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
