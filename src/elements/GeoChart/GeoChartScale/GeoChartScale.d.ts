declare namespace GeoChart {
  enum ScaleType {
    linear = 'linear',
    logarithmic = 'logarithmic',
    categorical = 'categorical'
  }

  interface ScaleNumericalRangeDomain {
    start: number
    end: number
  }

  interface BandScalePadding {
    outer?: number
    innert?: number
  }

  interface BaseScaleConfig<Domain> {
    type: ScaleType
    valueForOrigin: Domain
  }

  interface NumericalScaleConfig extends BaseScaleConfig<number> {
    domain: ScaleNumericalRangeDomain | number[]
  }

  interface BandScaleConfig extends BaseScaleConfig<string> {
    domain: string[]
    padding?: BandScalePadding
  }

  type ScaleConfig = NumericalScaleConfig | BandScaleConfig

  type AxisScale = d3.ScaleLinear<number, number> | d3.ScaleLogarithmic<number, number> | d3.ScaleBand<string>
}
