import { mount } from '@vue/test-utils'
import GeoKPI from '@/elements/GeoKPI/GeoKPI.vue'

describe('GeoKPI', () => {
  it('Should display GeoKPI primary value', () => {
    const props = {
      value: "Mocked KPI value",
      isPrimary: true
    }
    const wrapper = mount(GeoKPI, {
      propsData: {
        data: props
      }
    })
    expect(wrapper.find('.geo-KPI--is-primary').exists()).toBe(true)
    expect(wrapper.find('.geo-KPI--is-primary .geo-KPI__value').text()).toBe(props.value)
  })

  it('Should render GeoKPI secondary value', () => {
    const props = {
      value: "Mocked KPI value",
      isPrimary: false
    }
    const wrapper = mount(GeoKPI, {
      propsData: {
        data: props
      }
    })
    expect(wrapper.find('.geo-KPI--is-secondary').exists()).toBe(true)
    expect(wrapper.find('.geo-KPI--is-secondary .geo-KPI__value').text()).toBe(props.value)
  })
})
