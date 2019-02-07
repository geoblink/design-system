declare namespace GeoChart {
  enum BarDimension {
    horizontal = 'horizontal',
    vertical = 'vertical'
  }

  interface PieGlobalConfig {
    chart: {
      animationsDurationInMilliseconds: number
      size: GeoChart.Size
      margin: GeoChart.Margin
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
