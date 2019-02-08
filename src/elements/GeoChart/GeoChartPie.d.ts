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
    cssClasses?: (defaultClasses: string[], item: object, index: number) => string[]
  }
}
