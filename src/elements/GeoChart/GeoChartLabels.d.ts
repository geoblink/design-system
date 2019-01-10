declare namespace GeoChart {
  interface LabelGroupConfig<HorizontalDomain, VerticalDomain> {
    id: string
    axis: {
      horizontal: GeoChart.AxisConfig<HorizontalDomain>
      vertical: GeoChart.AxisConfig<VerticalDomain>
    }
    chart: {
      animationsDurationInMilliseconds: number
      size: GeoChart.Size
      margin: GeoChart.Margin
    }
    data: object[]
  }
}