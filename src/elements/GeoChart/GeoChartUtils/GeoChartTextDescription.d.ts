declare namespace GeoChart {
  type TextDescriptionOptions = {
    margin: number
    content: (item: object, index: number) => {
      text: string
      cssClass: string
      newLine: boolean
    }[]
    cssClassesGroups: (defaultClasses: string[], item: object, index: number) => string[]
    cssClassesTexts: (defaultClasses: string[], item: object, index: number) => string[]
  }

  interface TextDescriptionSettingsData {
    data: object[]
    keyForId: string
    textOptions: GeoChart.TextDescriptionOptions
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