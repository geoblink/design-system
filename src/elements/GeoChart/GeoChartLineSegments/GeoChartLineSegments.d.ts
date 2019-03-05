declare namespace GeoChart {

  interface LineSegmentsGroupsGlobalConfig {
    chart: {
      animationsDurationInMilliseconds: number
      size: GeoChart.Size
      margin: GeoChart.Margin
    }
  }
  interface SingleLineSegmentsGroupConfig<HorizontalDomain, VerticalDomain> {
    id: number
    dimension: GeoChart.BarDimension
    axis: {
      horizontal: GeoChart.AxisConfig<HorizontalDomain, any>
      vertical: GeoChart.AxisConfig<VerticalDomain, any>
    }
    circleData: object[]
    lineWidth?: number,
    lineNaturalWidth?: number,
    circleRadius?: number,
    circleNaturalRadius?: number,
    circleMargin?: number,
    circleNaturalMargin?: number,
    normalValue: number
    cssClasses?: (defaultClasses: string[], item: object, index: number) => string[]
  }
}
