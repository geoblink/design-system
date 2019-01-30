import * as GeoChartSizing from '@/elements/GeoChart/GeoChartSizing.js'

describe('GeoChartSizing', () => {
  it('should export EMPTY_MARGIN', function () {
    expect(GeoChartSizing.EMPTY_MARGIN).toHaveProperty('top')
    expect(GeoChartSizing.EMPTY_MARGIN).toHaveProperty('right')
    expect(GeoChartSizing.EMPTY_MARGIN).toHaveProperty('bottom')
    expect(GeoChartSizing.EMPTY_MARGIN).toHaveProperty('left')
  })
})
