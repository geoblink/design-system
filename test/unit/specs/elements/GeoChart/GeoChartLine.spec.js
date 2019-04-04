import { mount } from '@vue/test-utils'
import GeoChartLine from '@/elements/GeoChartLine/GeoChartLine.vue'

describe('GeoChartLine', () => {
  it('should render', function () {
    const wrapper = mount(GeoChartLine)
    expect(wrapper.find('.geo-chart-line').exists()).toBe(true)
  })
})
