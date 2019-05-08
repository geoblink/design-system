declare namespace GeoChart {
  interface SingleLineSegmentsGroupConfig<HorizontalDomain, VerticalDomain> extends BidimensionalGroupConfig<HorizontalDomain, VerticalDomain> {
    lineWidth?: number,
    lineNaturalWidth?: number,
    circleRadius?: number,
    circleNaturalRadius?: number,
    circleMargin?: number,
    circleNaturalMargin?: number,
    normalValue: number,
    trackByKey?: () => string
  }
}
