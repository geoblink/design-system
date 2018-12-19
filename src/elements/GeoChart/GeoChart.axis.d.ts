declare namespace GeoChart {
  interface AxisConfigScale<Domain> {
    valueForOrigin: Domain
    axisScale: d3.AxisScale<Domain>
  }

  interface AxisConfig<Domain> {
    id: string
    ticks: number
    position: GeoChart.AxisPosition
    scale: AxisConfigScale<Domain>
    chart: {
      animationsDurationInMilliseconds: number
      size: GeoChart.Size
      margin: GeoChart.Margin
    }
  }
}
