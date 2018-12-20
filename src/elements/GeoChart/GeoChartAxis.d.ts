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
    anchoredToScale = 'anchoredToScale'
  }

  interface AxisConfigScale<Domain> {
    valueForOrigin: Domain
    axisScale: d3.AxisScale<Domain>
  }

  interface AxisPositionConfigSimple {
    type: 'bottom' | 'top' | 'left' | 'right' | 'verticallyCenteredInTheMiddle' | 'horizontallyCenteredInTheMiddle'
  }

  interface AxisPositionConfigRelative<RelativeScaleDomain> {
    type: 'anchoredToScale'
    value: RelativeScaleDomain
    scale: AxisConfigScale<RelativeScaleDomain>
    relativeAxisPosition: AxisPositionConfigSimple
  }

  type AxisPosition<RelativeScaleDomain> = AxisPositionConfigSimple | AxisPositionConfigRelative<RelativeScaleDomain>

  interface AxisConfig<Domain, RelativeScaleDomain> {
    id: string
    ticks: number
    position: AxisPosition<RelativeScaleDomain>
    scale: AxisConfigScale<Domain>
    chart: {
      animationsDurationInMilliseconds: number
      size: GeoChart.Size
      margin: GeoChart.Margin
    }
  }
}
