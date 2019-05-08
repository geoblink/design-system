declare namespace GeoChart {
  interface SingleColorBarGroupConfig<HorizontalDomain, VerticalDomain> extends BidimensionalGroupConfig<HorizontalDomain, VerticalDomain> {
    normalOffset?: number
    naturalNormalOffset?: number
    width?: number
    naturalWidth?: number
    highlightedWidth?: number
    naturalHighlightedWidth?: number
    normalValue: number
  }
}
