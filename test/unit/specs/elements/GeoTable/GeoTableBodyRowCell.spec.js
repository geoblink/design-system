import { mount } from '@vue/test-utils'
import GeoTableBodyRowCell from '@/elements/GeoTable/GeoTableBodyRowCell'

function createWrapper (component, options = {}) {
  return mount(component, Object.assign({}, options))
}

describe('GeoTableBodyRowCell', () => {
  it('Should render component', function () {
    const wrapper = createWrapper(GeoTableBodyRowCell, {
      slots: {
        default: () => ''
      }
    })

    const instance = wrapper.find('.geo-table-body-row-cell')
    expect(instance.exists()).toBe(true)
  })

  it('Should render content', function () {
    const wrapper = createWrapper(GeoTableBodyRowCell, {
      slots: {
        default: '<p>Demo content</p>'
      }
    })

    const instance = wrapper.find('.geo-table-body-row-cell')
    expect(instance.exists()).toBe(true)
    expect(instance.text()).toEqual('Demo content')
  })
})
