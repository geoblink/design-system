declare namespace GeoChart {
  interface TextDescriptionOptions {
    text: string
    newLine: boolean
  }

  interface TextDescriptionSettingsData {
    keyForId: singlePieOptions.keyForId
    textOptions: GeoChart.TextDescriptionOptions[]
    getTextPositionMainDirection: (item: object, index: number) => number
    width: number
    height: number
    minY: number
    maxY: number
    algorithim: GeoChart.TextDescriptionUtilsAlgorithims
  }

  interface TextDescriptionGlobalOptions {
    chart: {
      animationsDurationInMilliseconds: number
      size: GeoChart.Size
      margin: GeoChart.Margin
    }
  }
}