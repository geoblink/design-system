declare namespace GeoChart {
  enum AxisPositionType {
    bottom = 'bottom',
    top = 'top',
    left = 'left',
    right = 'right',
    verticallyCenteredInTheMiddle = 'verticallyCenteredInTheMiddle',
    horizontallyCenteredInTheMiddle = 'horizontallyCenteredInTheMiddle',
    anchoredToAxis = 'anchoredToAxis'
  }

  type SimpleAxisPositionType = (
    AxisPositionType.bottom |
    AxisPositionType.top |
    AxisPositionType.left |
    AxisPositionType.right |
    AxisPositionType.verticallyCenteredInTheMiddle |
    AxisPositionType.horizontallyCenteredInTheMiddle
  )

  interface AxisConfigScale<Domain> {
    valueForOrigin: Domain
    axisScale: d3.scale.Linear<Domain, any> |
      d3.scale.Log<Domain, any> |
      d3.scale.Quantile<any> |
      d3.scale.Quantize<any> |
      d3.scale.Pow<Domain, any> |
      d3.scale.Identity |
      d3.scale.Ordinal<Domain, any> |
      d3.scale.Threshold<Domain, any>
  }

  interface AxisPositionConfigSimple {
    type: SimpleAxisPositionType
  }

  interface AxisPositionConfigRelative<RelativeScaleDomain> {
    type: AxisPositionType.anchoredToAxis
    value: RelativeScaleDomain
    scale: AxisConfigScale<RelativeScaleDomain>
    relativeAxisPosition: AxisPositionConfigSimple
  }

  type AxisPosition<RelativeScaleDomain> = AxisPositionConfigSimple | AxisPositionConfigRelative<RelativeScaleDomain>

  interface DrawingEnvironment {
    canvasSize: GeoChart.Size
    chartMargin: GeoChart.Margin
    absolutePosition: {
      x: number
      y: number
    }
  }

  interface GlobalAxesConfig {
    chart: {
      animationsDurationInMilliseconds: number
      size: GeoChart.Size
      margin: GeoChart.Margin
    }
  }

  interface AxisConfig<Domain, RelativeScaleDomain> {
    id: string
    keyForValues: string
    position: AxisPosition<RelativeScaleDomain>
    scale: AxisConfigScale<Domain>
    cssClasses?: (originalClasses: string[]) => string[]
    ticks: {
      count?: number
      cssClasses?: (originalClasses: string[], value: Domain, index: number) => string[]
      format?: (d: object, i: number) => {
        text: string
        cssClasses: string[]
      }[]
    },
    label?: {
      content: string
      offset?: number
      maxWidth?: (drawingEnvironment: DrawingEnvironment) => number
    }
  }

  interface BidimensionalGroupConfig<HorizontalDomain, VerticalDomain> {
    id: string
    mainDimension: GeoChart.DIMENSIONS.DIMENSIONS_2D
    axis: {
      horizontal: AxisConfig<HorizontalDomain, any>
      vertical: AxisConfig<VerticalDomain, any>
    }
    data: object[]
    cssClasses?: (defaultClasses: string[], item: object, index: number) => string[]
  }

  interface Axis {
    id: string
    dimension: DIMENSIONS_2D
    scale: ScaleConfig
  }
}
