import { createLocalVue, mount } from '@vue/test-utils'
import GeoTableBodyRowCell from '@/elements/GeoTable/GeoTableBodyRowCell'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-table-body-row-cell', GeoTableBodyRowCell)

describe('GeoTableBodyRowCell', () => {
  it('Should render component', function () {
    const wrapper = mount(GeoTableBodyRowCell, {
      scopedSlots: {
        default () { }
      }
    })

    const instance = wrapper.find('.geo-table-body-row-cell')
    expect(instance.exists()).toBe(true)
  })

  it('Should render content', function () {
    const wrapper = mount(GeoTableBodyRowCell, {
      slots: {
        default: '<p>Demo content</p>'
      }
    })

    const instance = wrapper.find('.geo-table-body-row-cell')
    expect(instance.exists()).toBe(true)
    expect(instance.text()).toEqual('Demo content')
  })
})
