declare namespace GeoChart {
  interface SingleAxisGuidelinesGroupConfig<Domain, RelativeScaleDomain> {
    id: string
    axisConfig: GeoChart.AxisConfig<Domain, RelativeScaleDomain>
    cssClasses?: (defaultClasses: string[], item: object, index: number) => string[]
    guidelines: {
      count?: number
      outerLines?: boolean
      cssClasses?: (originalClasses: string[], item: object, index: number) => string[]
    }
  }
}
