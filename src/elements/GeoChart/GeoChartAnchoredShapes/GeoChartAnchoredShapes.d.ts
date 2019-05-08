declare namespace GeoChart {
  enum AnchorPosition {
    leading = 'leading',
    trailing = 'trailing'
  }

  interface SingleAnchoredShapesGroupConfig<HorizontalDomain, VerticalDomain> extends BidimensionalGroupConfig<HorizontalDomain, VerticalDomain> {
    offset?: number
    normalOffset?: number
    naturalNormalOffset?: number
    normalValue: number
    getShapeSize: (item: object, index: number) => { width: number, height: number }
    getShapePath: (item: object, index: number, size: object) => string
    getAnchorPosition: (item: object, index: number) => AnchorPosition
    text: {
      content: (item: object, index: number) => string[]
    }
    trackByKey?: () => string
  }
}