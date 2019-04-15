declare namespace GeoChart {
  enum InterpolationType {
    'd3.curveLinear' = d3.curveLinear,
    'd3.curveStepBefore' = d3.curveStepBefore,
    'd3.curveStepAfter' = d3.curveStepAfter,
    'd3.curveBasis' = d3.curveBasis,
    'd3.curveBasisOpen' = d3.curveBasisOpen,
    'd3.curveBasisClosed' = d3.curveBasisClosed,
    'd3.curveBundle' = d3.curveBundle,
    'd3.curveCardinal' = d3.curveCardinal,
    'd3.curveCardinalOpen' = d3.curveCardinalOpen,
    'd3.curveCardinalClosed' = d3.curveCardinalClosed,
    'd3.curveNatural' = d3.curveNatural
  }
  interface LineGroupsGlobalConfig {
    chart: {
      animationsDurationInMilliseconds: number
      size: GeoChart.Size
      margin: GeoChart.Margin
    }
  }
  interface SingleLineGroupConfig<HorizontalDomain, VerticalDomain> {
    id: number
    lineGroupId?: string,
    dimension: GeoChart.BarDimension
    axis: {
      horizontal: GeoChart.AxisConfig<HorizontalDomain, any>
      vertical: GeoChart.AxisConfig<VerticalDomain, any>
    }
    lineData: object[]
    lineWidth?: number,
    hoverCircleRadius?: number,
    interpolationFn?: () => InterpolationType,
    tooltip?: {
      getContent?: (item: object, index: number) => string | null | undefined
      getOffset?: (event: MouseEvent) => { x: number, y: number } | null | undefined
    }
    cssClasses?: (defaultClasses: string[], item: object, index: number) => string[]
  }
}
