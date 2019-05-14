import { createLocalVue, mount } from '@vue/test-utils'
import GeoTableBodyRowCell from '@/elements/GeoTable/GeoTableBodyRowCell'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-table-body-row-cell', GeoTableBodyRowCell)

describe('GeoTableBodyRowCell', () => {
  it('should render component', function () {
    const wrapper = mount(GeoTableBodyRowCell)

    const instance = wrapper.find('.geo-table-body-row-cell')
    expect(instance.exists()).toBe(true)
  })

  it('should render content', function () {
    const wrapper = mount(GeoTableBodyRowCell, {
      slots: {
        default: '<p>Demo content</p>'
      }
    })

    const instance = wrapper.find('.geo-table-body-row-cell')
    expect(instance.exists()).toBe(true)
    expect(instance.text()).toEqual('Demo content')
  })

  it('should apply CSS suffix when the modifier is provided', function () {
    const wrapper = mount(GeoTableBodyRowCell, {
      context: {
        props: {
          cssModifier: 'demo-modifier'
        }
      }
    })

    const instance = wrapper.find('.geo-table-body-row-cell--demo-modifier')
    expect(instance.exists()).toBe(true)
  })
})
