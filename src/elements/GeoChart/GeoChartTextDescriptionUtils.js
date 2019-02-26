/**
 * This function receives a list of suggested positions and it readjusts them to
 * fit as many as possible.
 *
 * @param {Array<TextDescription.TextElemConfig>} textElemsConfig Array must be sorted by preferredPosition in descending order
 * @param {TextDescription.GeneralConfig} generalConfig
 * @returns {Array<TextDescription.ComputedLabelPosition>} positions
 */
export function computeLabelPositionsWithBackPressure (textElemsConfig, generalConfig) {
  let maxY = generalConfig.maxY
  const positions = []
  const initialMaxY = maxY
  for (let i = 0; i < textElemsConfig.length; i++) {
    const heightWithMargin = textElemsConfig[i].height + 2 * generalConfig.margin
    let lowerY = textElemsConfig[i].preferredPosition - heightWithMargin / 2
    let upperY = lowerY + heightWithMargin
    if (upperY > maxY) {
      lowerY = maxY - heightWithMargin
      upperY = lowerY + heightWithMargin
    }
    if (lowerY < generalConfig.minY) {
      lowerY = generalConfig.minY
      upperY = lowerY + heightWithMargin
      const tentativeChangePositions = [] // use alternative array in case it is not possible to relocate
      let isBackFixed = false // fix backwards if we can
      let j = i
      tentativeChangePositions[j] = generalConfig.minY // position has to be at least minY
      for (j = i - 1; j >= 0; j--) {
        let currentPosition = positions[j]
        let backPressurePosition = tentativeChangePositions[j + 1]
        let backPressureHeightWithMargin = textElemsConfig[j + 1].height + 2 * generalConfig.margin
        let upperBackPressureY = backPressurePosition + backPressureHeightWithMargin
        if (upperBackPressureY < currentPosition) {
          isBackFixed = true
          break
        } else {
          tentativeChangePositions[j] = upperBackPressureY
        }
      }
      // We moved everything and last one is correct
      if (j === -1 && !isBackFixed) {
        let firstElementHeightWithMargin = textElemsConfig[0].height + 2 * generalConfig.margin
        if (tentativeChangePositions[0] + firstElementHeightWithMargin < initialMaxY) {
          isBackFixed = true
        }
      }

      if (isBackFixed) {
        // copy tentative possitions since it was successful
        // j is the index where we checked everything is good, so don't need to change j
        for (let k = j + 1; k <= i; k++) {
          positions[k] = tentativeChangePositions[k]
        }
      } else {
        // bail out we don't set anything further
        break
      }
    }

    maxY = lowerY
    positions[i] = lowerY
  }

  for (let i = 0; i < textElemsConfig.length; i++) {
    if (i < positions.length) {
      positions[i] = positions[i] + generalConfig.margin + textElemsConfig[i].height / 2
    } else {
      positions[i] = null
    }
  }

  return positions
}

/**
 * This function receives a list of suggested positions and removes the necessary ones
 * to avoid overlapping
 * @param {Array<TextDescription.TextElemConfig>} textElemsConfig Array must be sorted by preferredPosition in descending order
 * @param {TextDescription.GeneralConfig} generalConfig
 * @returns {Array<TextDescription.ComputedLabelPosition>} positions
 */
export function computeLabelPositionsWithoutReadjustment (textElemsConfig, generalConfig) {
  const positions = []
  let maxY = generalConfig.maxY

  for (let i = 0; i < textElemsConfig.length; i++) {
    const textElemConfig = textElemsConfig[i]
    const heightWithMargin = textElemConfig.height + 2 * generalConfig.margin
    const lowerY = textElemConfig.preferredPosition - heightWithMargin / 2
    const upperY = lowerY + heightWithMargin
    if (upperY > maxY) {
      positions.push(null) // bbox doesn't fit and we are not readjusting
    } else {
      positions.push(textElemConfig.preferredPosition)
      maxY = lowerY // this raises the limit so the next bbox doesn't intersect
    }
  }

  return positions
}
