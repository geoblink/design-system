declare namespace GeoChart {
    interface SingleQuadrantGroupConfig<Domain, RelativeScaleDomain> {
      horizontalAxisConfig: GeoChart.AxisConfig<Domain, RelativeScaleDomain>
      verticalAxisConfig: GeoChart.AxisConfig<Domain, RelativeScaleDomain>
      horizontalThreshold?: number | string | Date
      verticalThreshold?: number | string | Date
      quadrantTopLeftName?: string
      quadrantTopRightName?: string
      quadrantBottomLeftName?: string
      quadrantBottomRightName?: number
      fontSize?: number
      tooltip?: {
        getContent?: (item: object, index: number) => string | null | undefined
        getOffset?: (event: MouseEvent) => { x: number, y: number } | null | undefined
      }
      cssClasses?: (defaultClasses: string[], item: object, index: number) => string[]
    }
  }
