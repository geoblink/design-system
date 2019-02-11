declare namespace GeoChart {
  enum BarDimension {
    horizontal = 'horizontal',
    vertical = 'vertical'
  }

  interface ColorBarGroupsGlobalConfig {
    chart: {
      animationsDurationInMilliseconds: number
      size: GeoChart.Size
      margin: GeoChart.Margin
    }
  }

  interface SingleColorBarGroupConfig<HorizontalDomain, VerticalDomain> {
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
    highlightedWidth?: number
    naturalHighlightedWidth?: number
    cssClasses?: (defaultClasses: string[], item: object, index: number) => string[]
  }
}
