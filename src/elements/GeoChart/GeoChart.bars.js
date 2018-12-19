/**
 * @typedef BarDimension
 * @readonly
 * @enum {string}
 */
export const DIMENSIONS = {
  horizontal: 'horizontal',
  vertical: 'vertical'
}

/**
 * @template HorizontalDomain
 * @template VerticalDomain
 * @typedef {Object} BarGroupScales
 * @property {d3.AxisScale<HorizontalDomain>} horizontal
 * @property {d3.AxisScale<VerticalDomain>} vertical
 */

/**
 * @template Domain
 * @typedef {Object} BarGroupConfig
 * @property {String} id
 * @property {BarDimension} dimension
 * @property {BarGroupScales} scale
 * @property {Object[]} data
 */

/**
 * @callback AddBarGroupFunction
 * @param {BarGroupConfig<Domain>} options
 */

/**
 * @param {d3.Selection<any, any, null, undefined>} d3Instance
 * @returns {AddBarGroupFunction}
 */
export function addBarGroupFactory (d3Instance) {
  const groups = {}

  return function (options) {
    const group = groups[options.id] || d3Instance
      .append('g')
      .attr('class', `geo-chart-bars-group geo-chart-bars-group--${options.id} geo-chart-bars-group--${options.dimension}`)
    groups[options.id] = group

    const bars = group
      .selectAll('rect.geo-chart-bar')
      .data(options.data)

    console.log(bars, options)

    bars
      .enter()
      .append('rect')
      .attr('class', (d, i) => `geo-chart-bar geo-chart-bar--${i} geo-chart-bar--${options.dimension}`)

    bars
      .exit()
      .remove()

    // const axis = getAxisForPositionAndScale(options.position, options.scale)
    //   .ticks(options.ticks)

    // const xTranslation = getAxisXTranslation(
    //   options.position,
    //   options.chartSize,
    //   options.chartMargin
    // )
    // const yTranslation = getAxisYTranslation(
    //   options.position,
    //   options.chartSize,
    //   options.chartMargin
    // )

    // const dominantBaselineForPosition = {
    //   [POSITIONS.top]: 'baseline',
    //   [POSITIONS.bottom]: 'hanging',
    //   [POSITIONS.verticallyCenteredInTheMiddle]: 'baseline',
    //   [POSITIONS.left]: null,
    //   [POSITIONS.right]: null,
    //   [POSITIONS.horizontallyCenteredInTheMiddle]: null
    // }

    // const textAnchorForPosition = {
    //   [POSITIONS.top]: null,
    //   [POSITIONS.bottom]: null,
    //   [POSITIONS.verticallyCenteredInTheMiddle]: null,
    //   [POSITIONS.left]: 'end',
    //   [POSITIONS.right]: 'start',
    //   [POSITIONS.horizontallyCenteredInTheMiddle]: 'end'
    // }

    // group.attr('transform', `translate(${xTranslation}, ${yTranslation})`)
    // group.call(axis)
    //   .selectAll('g.tick')
    //   .attr('class', `tick geo-chart-axis-tick--${options.position}`)
    //   .selectAll('text')
    //   .attr('dominant-baseline', dominantBaselineForPosition[options.position])
    //   .attr('text-anchor', textAnchorForPosition[options.position])
    //   .attr('dx', null)
    //   .attr('dy', null)
  }
}
