declare namespace GeoChart {
  interface SingleLineGroupConfig<HorizontalDomain, VerticalDomain> extends BidimensionalGroupConfig<HorizontalDomain, VerticalDomain> {
    data: [number, number][]
    lineWidth?: number
    hoverCircleRadius?: number
    interpolationFn?: () => d3.CurveGenerator
    tooltip?: {
      getContent?: (item: object, index: number) => string | null | undefined
      getOffset?: (event: MouseEvent) => { x: number, y: number } | null | undefined
    }
    cssClasses?: (defaultClasses: string[], item: object, index: number) => string[]
    groupKey?: string
  }
}
