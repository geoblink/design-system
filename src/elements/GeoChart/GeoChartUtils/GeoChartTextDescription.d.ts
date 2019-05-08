declare namespace GeoChart {
  interface TextDescriptionOptions<Datum extends object> {
    margin?: number
    content: (item: Datum, index: number) => {
      text: string
      cssClass: string
      newLine: boolean
    }[]
    cssClassesGroups?: (defaultClasses: string[], item: Datum, index: number) => string[]
    cssClassesTexts?: (defaultClasses: string[], item: Datum, index: number) => string[]
  }

  interface TextDescriptionSettingsData<Datum extends object> {
    data: Datum[]
    keyForId: string
    textOptions: GeoChart.TextDescriptionOptions<Datum>
    // y coordinate to position the text
    getTextPositionMainDirection: (item: Datum, index: number) => number
    // [x, y] coordinates where the main group will be translated
    startPosition: number[]
    textAnchor: string
    minY: number
    maxY: number
    algorithm: GeoChart.TextDescriptionUtilsAlgorithms
  }
}