declare namespace GeoChart {
  enum BarDimension {
    horizontal = 'horizontal',
    vertical = 'vertical'
  }

  interface BarGroupConfig<HorizontalDomain, VerticalDomain> {
    id: string
    dimension: GeoChart.BarDimension
    axis: {
      horizontal: GeoChart.AxisConfig<HorizontalDomain>
      vertical: GeoChart.AxisConfig<VerticalDomain>
    }
    chart: {
      size: GeoChart.Size
      margin: GeoChart.Margin
    }
    data: object[]
  }
}