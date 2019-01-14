declare namespace GeoChart {
  enum AxisDimension {
    horizontal = 'horizontal',
    vertical = 'vertical'
  }

  enum AxisPositionType {
    bottom = 'bottom',
    top = 'top',
    left = 'left',
    right = 'right',
    verticallyCenteredInTheMiddle = 'verticallyCenteredInTheMiddle',
    horizontallyCenteredInTheMiddle = 'horizontallyCenteredInTheMiddle',
    anchoredToAxis = 'anchoredToAxis'
  }

  interface AxisConfigScale<Domain> {
    valueForOrigin: Domain
    axisScale: d3.AxisScale<Domain>
  }

  interface AxisPositionConfigSimple {
    type: (
      AxisPositionType.bottom |
      AxisPositionType.top |
      AxisPositionType.left |
      AxisPositionType.right |
      AxisPositionType.verticallyCenteredInTheMiddle |
      AxisPositionType.horizontallyCenteredInTheMiddle
    )
  }

  interface AxisPositionConfigRelative<RelativeScaleDomain> {
    type: 'anchoredToAxis'
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

  interface AxisConfig<Domain, RelativeScaleDomain> {
    id: string
    keyForValues: string
    position: AxisPosition<RelativeScaleDomain>
    scale: AxisConfigScale<Domain>
    chart: {
      animationsDurationInMilliseconds: number
      size: GeoChart.Size
      margin: GeoChart.Margin
    }
    cssClasses?: (originalClasses: string[]) => string[]
    ticks: {
      count?: number
      cssClasses?: (originalClasses: string[]) => string[]
      format?: (d: object, i: number) => {
        text: string
        cssClasses: string[]
      }[]
      label?: {
        maxWidth?: (drawingEnvironment: DrawingEnvironment) => number
      }
    }
  }
}
