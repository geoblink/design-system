declare namespace GeoChart {
  interface AxisGuidelinesGroupsGlobalConfig {
    chart: {
      animationsDurationInMilliseconds: number
      size: GeoChart.Size
      margin: GeoChart.Margin
    }
  }

  interface SingleAxisGuidelinesGroupConfig<HorizontalDomain, VerticalDomain> {
    id: string
    axisConfig: GeoChart.AxisConfig
    cssClasses?: (defaultClasses: string[], item: HorizontalDomain | VerticalDomain, index: number) => string[]
    guidelines: {
      count?: number
      outerLines?: boolean
      cssClasses?: (originalClasses: string[]) => string[]
    }
  }
}
