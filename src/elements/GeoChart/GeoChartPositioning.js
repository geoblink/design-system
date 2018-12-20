/**
 * @enum {GeoChart.AxisPosition}
 */
export const POSITIONS = {
  bottom: 'bottom',
  top: 'top',
  left: 'left',
  right: 'right',
  verticallyCenteredInTheMiddle: 'verticallyCenteredInTheMiddle',
  horizontallyCenteredInTheMiddle: 'horizontallyCenteredInTheMiddle',
  anchoredToScale: 'anchoredToScale'
}

/**
 * @param {GeoChart.AxisPosition} position
 * @param {GeoChart.Size} svgSize
 * @param {GeoChart.Margin} margin
 * @returns {string}
 */
export function getOriginXTranslation (position, svgSize, margin) {
  switch (position) {
    case POSITIONS.top:
    case POSITIONS.bottom:
    case POSITIONS.verticallyCenteredInTheMiddle:
      return 0
    case POSITIONS.left:
      return margin.left
    case POSITIONS.right:
      return svgSize.width - margin.right
    case POSITIONS.horizontallyCenteredInTheMiddle:
      return margin.left + (svgSize.width - margin.left - margin.right) / 2
  }

  console.warn(`GeoChart [component] :: Tried to get X Translation for unknown position: ${position}`)
}

/**
 * @param {GeoChart.AxisPosition} position
 * @param {GeoChart.Size} svgSize
 * @param {GeoChart.Margin} [margin]
 * @returns {string}
 */
export function getOriginYTranslation (position, svgSize, margin) {
  switch (position) {
    case POSITIONS.top:
      return margin.top
    case POSITIONS.bottom:
      return svgSize.height - margin.bottom
    case POSITIONS.verticallyCenteredInTheMiddle:
      return (svgSize.height - margin.top - margin.bottom) / 2
    case POSITIONS.left:
    case POSITIONS.right:
    case POSITIONS.horizontallyCenteredInTheMiddle:
      return 0
  }

  console.warn(`GeoChart [component] :: Tried to get X Translation for unknown position: ${position}`)
}
