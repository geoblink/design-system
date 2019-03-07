declare namespace GeoChart {
  interface LabelGroupsGlobalConfig {
    chart: {
      animationsDurationInMilliseconds: number
      size: GeoChart.Size
      margin: GeoChart.Margin
    }
  }

  interface LabelGroupConfig<HorizontalDomain, VerticalDomain> {
    id: string
    axis: {
      horizontal: GeoChart.AxisConfig<HorizontalDomain>
      vertical: GeoChart.AxisConfig<VerticalDomain>
    }
    data: object[]
  }
}