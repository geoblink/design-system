import { mount } from '@vue/test-utils'
import GeoChart from '@/elements/GeoChart/GeoChart.vue'

describe('GeoChartLine', () => {
  it('should render', function () {
    const wrapper = mount(GeoChart)
    expect(wrapper.find('.geo-chart-line').exists()).toBe(true)
  })
})
