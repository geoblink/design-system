declare namespace GeoChart {
  enum BarDimension {
    horizontal = 'horizontal',
    vertical = 'vertical'
  }

  interface BarGroupsGlobalConfig {
    chart: {
      animationsDurationInMilliseconds: number
      size: GeoChart.Size
      margin: GeoChart.Margin
    }
  }

  interface SingleBarGroupConfig<HorizontalDomain, VerticalDomain> {
    id: string
    dimension: GeoChart.BarDimension
    axis: {
      horizontal: GeoChart.AxisConfig<HorizontalDomain>
      vertical: GeoChart.AxisConfig<VerticalDomain>
    }
    data: object[]
    normalOffset?: number
    naturalNormalOffset?: number
    width?: number
    naturalWidth?: number
    getTooltip?: (item: object, index: number) => string | null | undefined
    cssClasses?: (defaultClasses: string[], item: object, index: number) => string[]
  }
}
