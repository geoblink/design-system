import { mount } from '@vue/test-utils'
import GeoKPI from '@/elements/GeoKPI/GeoKPI.vue'

describe('GeoKPI', function () {
  it('Should render', function () {
    const wrapper = mount(GeoKPI)
    expect(wrapper.find('.geo-kpi').exists()).toBe(true)
  })
})
