/**
 * @param {Array<Number>} heights
 * @param {Array<Number>} preferredPositions
 * @param {Number} textGroupMargin
 * @param {Number} maxY
 * @param {Number} minY
 * @returns {Array<Number>} positions
 */
export function computeLabelPositionsNaturalDirection (textElemsConfig, generalConfig) {
  var positions = []
  var initialMaxY = generalConfig.maxY
  for (var i = 0; i < textElemsConfig.length; i++) {
    var heightWithMargin = textElemsConfig[i].height + 2 * generalConfig.margin
    var lowerY = textElemsConfig[i].preferredPosition - heightWithMargin / 2
    var upperY = lowerY + heightWithMargin
    if (upperY > generalConfig.maxY) {
      lowerY = generalConfig.maxY - heightWithMargin
      upperY = lowerY + heightWithMargin
    }
    if (lowerY < generalConfig.minY) {
      lowerY = generalConfig.minY
      upperY = lowerY + heightWithMargin
      var tentativeChangePositions = [] // use alternative array in case it is not possible to relocate
      var isBackFixed = false // fix backwards if we can
      var j = i
      tentativeChangePositions[j] = generalConfig.minY // position has to be at least minY
      for (j = i - 1; j >= 0; j--) {
        var currentPosition = positions[j]
        var backPressurePosition = tentativeChangePositions[j + 1]
        var backPressureHeightWithMargin = textElemsConfig[j + 1].height + 2 * generalConfig.margin
        var upperBackPressureY = backPressurePosition + backPressureHeightWithMargin
        if (upperBackPressureY < currentPosition) {
          isBackFixed = true
          break
        } else {
          tentativeChangePositions[j] = upperBackPressureY
        }
      }
      // We moved everything and last one is correct
      if (j === -1 && !isBackFixed) {
        var firstElementHeightWithMargin = textElemsConfig[0].height + 2 * generalConfig.margin
        if (tentativeChangePositions[0] + firstElementHeightWithMargin < initialMaxY) {
          isBackFixed = true
        }
      }

      if (isBackFixed) {
        // copy tentative possitions since it was successful
        // j is the index where we checked everything is good, so don't need to change j
        for (var k = j + 1; k <= i; k++) {
          positions[k] = tentativeChangePositions[k]
        }
      } else {
        // bail out we don't set anything further
        return positions
      }
    }
    // TODO: don't edit config, use local variable
    generalConfig.maxY = lowerY
    positions[i] = lowerY
  }

  return positions
}
