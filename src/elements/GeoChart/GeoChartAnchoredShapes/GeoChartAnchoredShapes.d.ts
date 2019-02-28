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
    id: number
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
    text: {
      content: (item: object, index: number) => string[]
    },
    cssClasses?: (defaultClasses: string[], item: object, index: number) => string[]
  }
}