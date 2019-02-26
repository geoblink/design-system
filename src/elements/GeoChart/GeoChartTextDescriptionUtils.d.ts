declare namespace GeoChart {
  enum TextDescriptionUtilsAlgorithims {
    backPressure = 'backPressure',
    withoutReadjustment = 'withoutReadjustment'
  }
  interface TextDescriptionUtilsTextElemConfig {
    height: number
    // This is the coordinate in the main direction of the middle point of the bbox
    preferredPosition: number
  }

  interface TextDescriptionUtilsGeneralConfig {
    // This is the number of pixels around the bounding box,
    // in the case of 2 boxes one next to the other, margin will be applied twice
    margin: number
    minY: number
    maxY: number
  }

  // This is the coordinate of the center of the bbox in the main direction
  // once it has been adjusted. It's null if it is not possible to place the label
  type TextDescriptionUtilsComputedLabelPosition = number | null
}