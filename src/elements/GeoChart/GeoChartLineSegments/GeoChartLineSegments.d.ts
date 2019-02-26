declare namespace GeoChart {
  enum BarDimension {
    horizontal = 'horizontal',
    vertical = 'vertical'
  }

  interface LineSegmentsGroupsGlobalConfig {
    chart: {
      animationsDurationInMilliseconds: number
      size: GeoChart.Size
      margin: GeoChart.Margin
    }
  }
  interface SingleLineSegmentsGroupConfig<HorizontalDomain, VerticalDomain> {
    id: string
    dimension: GeoChart.BarDimension
    axis: {
      horizontal: GeoChart.AxisConfig<HorizontalDomain>
      vertical: GeoChart.AxisConfig<VerticalDomain>
    }
    data: object[]
    normalOffset?: number
    naturalNormalOffset?: number
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
