import { createLocalVue, mount } from '@vue/test-utils'
import GeoChart from '@/elements/GeoChart/GeoChart.vue'

import * as GeoChartScale from '@/elements/GeoChart/GeoChartScale'
import * as GeoChartAxis from '@/elements/GeoChart/GeoChartAxis'
import * as GeoChartBars from '@/elements/GeoChart/GeoChartBars'

const localVue = createLocalVue()
localVue.component('geo-chart', GeoChart)

describe('GeoChart', () => {
  describe('Constants', function () {
    it('should export SCALE_TYPES', function () {
      expect(GeoChart).toHaveProperty('constants.SCALE_TYPES', GeoChartScale.SCALE_TYPES)
    })

    it('should export POSITIONS', function () {
      expect(GeoChart).toHaveProperty('constants.POSITIONS', GeoChartAxis.POSITIONS)
    })

    it('should export BARS_DIMENSIONS', function () {
      expect(GeoChart).toHaveProperty('constants.BARS_DIMENSIONS', GeoChartBars.DIMENSIONS)
    })
  })
})
