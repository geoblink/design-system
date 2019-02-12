declare namespace GeoChart {
  enum GuidelineDimension {
    horizontal = 'horizontal',
    vertical = 'vertical'
  }

  interface GuidelinesGroupsGlobalConfig {
    chart: {
      animationsDurationInMilliseconds: number
      size: GeoChart.Size
      margin: GeoChart.Margin
    }
  }

  interface SingleGuidelinesGroupConfig<HorizontalDomain, VerticalDomain> {
    id: string
    dimension: GeoChart.GuidelineDimension
    axis: {
      horizontal: GeoChart.AxisConfig<HorizontalDomain>
      vertical: GeoChart.AxisConfig<VerticalDomain>
    }
    cssClasses?: (defaultClasses: string[], item: HorizontalDomain | VerticalDomain, index: number) => string[]
  }
}
