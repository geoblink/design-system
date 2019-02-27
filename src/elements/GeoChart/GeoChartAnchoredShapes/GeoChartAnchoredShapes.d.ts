declare namespace GeoChart {
  enum AnchorPositions {
    leading = 'leading',
    trailing = 'trailing'
  }
  interface LineSegmentsGroupsGlobalConfig {
    chart: {
      animationsDurationInMilliseconds: number
      size: GeoChart.Size
      margin: GeoChart.Margin
    }
  }
  interface SingleAnchoredShapesGroupConfig<HorizontalDomain, VerticalDomain> {
    id: string
    dimension: GeoChart.BarDimension
    axis: {
      horizontal: GeoChart.AxisConfig<HorizontalDomain>
      vertical: GeoChart.AxisConfig<VerticalDomain>
    }
    shapeData: object[],
    offset?: number,
    normalOffset?: number,
    naturalNormalOffset?: number,
    normalValue: number,
    getShapeSize: (item: object, index: number) => { width: number, height: number },
    getShapePath: (item: object, index: number, size: object) => string,
    getAnchorPosition: (item: object, index: number) => AnchorPositions,
    getAnchoredText: (item: object, index: number) => string,
    cssClasses?: (defaultClasses: string[], item: object, index: number) => string[]
  }
}