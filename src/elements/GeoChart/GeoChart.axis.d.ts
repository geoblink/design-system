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
      size: GeoChart.Size
      margin: GeoChart.Margin
    }
  }
}
