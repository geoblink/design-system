declare namespace GeoChart {
  interface TextDescriptionOptions {
    text: string
    newLine: boolean
  }

  interface TextDescriptionSettingsData {
    data: object[]
    keyForId: string
    textOptions: GeoChart.TextDescriptionOptions[]
    // y coordinate to position the text
    getTextPositionMainDirection: (item: object, index: number) => number
    // [x, y] coordinates where the main group will be translated
    startPosition: number[]
    textAnchor: string
    minY: number
    maxY: number
    algorithm: GeoChart.TextDescriptionUtilsAlgorithms
  }

  interface TextDescriptionGlobalOptions {
    chart: {
      animationsDurationInMilliseconds: number
      size: GeoChart.Size
      margin: GeoChart.Margin
    }
  }
}