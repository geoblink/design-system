declare namespace GeoChart {
  interface SingleStackedBarGroupConfig<HorizontalDomain, VerticalDomain> extends BidimensionalGroupConfig<HorizontalDomain, VerticalDomain> {
    width?: number,
    naturalWidth?: number,
    tooltip?: {
      getContent: (item: object, index: number) => string | null | undefined
      getOffset?: (event: MouseEvent) => { x: number, y: number } | null | undefined
    }
  }
}