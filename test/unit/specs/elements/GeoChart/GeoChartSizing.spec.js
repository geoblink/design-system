import * as GeoChartSizing from '@/elements/GeoChart/GeoChartUtils/GeoChartSizing.js'

describe('GeoChartSizing', () => {
  it('Should export EMPTY_MARGIN', function () {
    expect(GeoChartSizing.EMPTY_MARGIN).toHaveProperty('top')
    expect(GeoChartSizing.EMPTY_MARGIN).toHaveProperty('right')
    expect(GeoChartSizing.EMPTY_MARGIN).toHaveProperty('bottom')
    expect(GeoChartSizing.EMPTY_MARGIN).toHaveProperty('left')
  })
})
