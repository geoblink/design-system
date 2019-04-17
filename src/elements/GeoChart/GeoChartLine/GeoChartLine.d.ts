declare namespace GeoChart {
  enum InterpolationType {
    'curveLinear' = d3.curveLinear,
    'curveStepBefore' = d3.curveStepBefore,
    'curveStepAfter' = d3.curveStepAfter,
    'curveBasis' = d3.curveBasis,
    'curveBasisOpen' = d3.curveBasisOpen,
    'curveBasisClosed' = d3.curveBasisClosed,
    'curveBundle' = d3.curveBundle,
    'curveCardinal' = d3.curveCardinal,
    'curveCardinalOpen' = d3.curveCardinalOpen,
    'curveCardinalClosed' = d3.curveCardinalClosed,
    'curveNatural' = d3.curveNatural
  }

  interface LineGroupsGlobalConfig {
    chart: {
      animationsDurationInMilliseconds: number
      size: GeoChart.Size
      margin: GeoChart.Margin
    }
  }

  interface SingleLineGroupConfig<HorizontalDomain, VerticalDomain> {
    id: number,
    dimension: GeoChart.BarDimension,
    axis: {
      horizontal: GeoChart.AxisConfig<HorizontalDomain, any>
      vertical: GeoChart.AxisConfig<VerticalDomain, any>
    },
    lineData: object[],
    lineWidth?: number,
    hoverCircleRadius?: number,
    interpolationFn?: () => InterpolationType,
    tooltip?: {
      getContent?: (item: object, index: number) => string | null | undefined
      getOffset?: (event: MouseEvent) => { x: number, y: number } | null | undefined
    },
    cssClasses?: (defaultClasses: string[], item: object, index: number) => string[],
    groupKey?: string
  }
}
