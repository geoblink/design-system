declare namespace GeoChart {
  interface SingleBarGroupConfig<HorizontalDomain, VerticalDomain> extends BidimensionalGroupConfig<HorizontalDomain, VerticalDomain> {
    normalOffset?: number
    naturalNormalOffset?: number
    width?: number
    naturalWidth?: number
    tooltip?: {
      getContent: (item: object, index: number) => string | null | undefined
      getOffset?: (event: MouseEvent) => { x: number, y: number } | null | undefined
    }
  }
}
