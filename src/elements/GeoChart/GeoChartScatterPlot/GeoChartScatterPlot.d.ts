declare namespace GeoChart {
  interface ScatterPlotGroupConfig<HorizontalDomain, VerticalDomain> extends BidimensionalGroupConfig<HorizontalDomain, VerticalDomain> {
    data: [number, number][]
    radius?: number
    fillColor?: string
    onDotClick?: (item: object, index: number) => string | null | undefined
    tooltip?: {
      getContent?: (item: object, index: number) => string | null | undefined
      getOffset?: (event: MouseEvent) => { x: number, y: number } | null | undefined
    }
    cssClasses?: (defaultClasses: string[], item: object, index: number) => string[]
    groupKey?: string
  }
}
