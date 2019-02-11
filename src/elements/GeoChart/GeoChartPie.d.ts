declare namespace GeoChart {
  interface PieGlobalConfig {
    chart: {
      animationsDurationInMilliseconds: number
      size: GeoChart.Size
      margin: GeoChart.Margin
      chartHeight: GeoChart.Size.height
      chartWidth: GeoChart.Size.width
      chartRadius: number
    }
  }

  interface PieConfig {
    data: object[]
    innerRadius: number
    outerRadius: number
    keyForValues: string
    getTooltip?: (item: object, index: number) => string | null | undefined
    cssClasses?: (defaultClasses: string[], item: object, index: number) => string[]
  }
}
