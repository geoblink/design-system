declare namespace GeoChart {
  interface SingleLabelConfig {
    text: string
    padding?: {
      top: number
      right: number
      bottom: number
      left: number
    }
    margin?: {
      top: number
      right: number
      bottom: number
      left: number
    }
    cornerRadius?: number
    cssClasses?: (defaultClasses: string[], item: object, index: number) => string[]
  }

  interface SingleLabelLineConfig {
    labels: SingleLabelConfig[]
  }

  interface LabelGroupConfig<HorizontalDomain, VerticalDomain> {
    id: string
    axis: {
      horizontal: GeoChart.AxisConfig<HorizontalDomain>
      vertical: GeoChart.AxisConfig<VerticalDomain>
    }
    data: SingleLabelLineConfig[],
    mainDimension: string
  }
}