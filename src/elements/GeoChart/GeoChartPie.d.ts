declare namespace GeoChart {
  interface PieGlobalConfig {
    chart: {
      animationsDurationInMilliseconds: number
      size: GeoChart.Size
      margin: GeoChart.Margin
      chartHeight: GeoChart.Size.height
      chartWidth: GeoChart.Size.width
    }
  }

  interface PieConfig {
    data: object[]
    innerRadius: number
    outerRadius: number
    keyForValues: string
    tooltip: {
      getContent?: (item: object, index: number) => string | null | undefined
      getOffset?: (event: MouseEvent) => { x: number, y: number } | null | undefined
    }
    cssClasses?: (defaultClasses: string[], item: object, index: number) => string[]
  }
}
