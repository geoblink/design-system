declare namespace GeoChart {
    interface SingleQuadrantGroupConfig<Domain, RelativeScaleDomain> {
      horizontalAxisConfig?: GeoChart.AxisConfig<Domain, RelativeScaleDomain>
      verticalAxisConfig?: GeoChart.AxisConfig<Domain, RelativeScaleDomain>
      thresholdX?: number | string
      thresholdY?: number | string
      quadrantTopLeftName?: string
      quadrantTopRightName?: string
      quadrantBottomLeftName?: string
      quadrantBottomRightName?: number
      labelSize?: number
      tooltip?: {
        getContent?: (item: object, index: number) => string | null | undefined
        getOffset?: (event: MouseEvent) => { x: number, y: number } | null | undefined
      }
      cssClasses?: (defaultClasses: string[], item: object, index: number) => string[]
    }
  }