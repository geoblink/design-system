import { PICKER_DATE_UNITS } from './GeoCalendar.utils'
import { enumPropertyFactory } from '../../utils/enumPropertyFactory'

/**
 * @mixin
 */
export default {
  props: {
    /**
     * Type of grid being displayed.
     *
     * Supported values are:
     *
     * - `day` - The minimal date unit available. The grid will consist of each
     * one of the days pertaining to the current month in the current selected
     * year, with the days pertaining to the previous and next month greyed out.
     *
     * - `month` - The grid will consist of the 12 months of the year
     * distributed in quarters. This grid is visually constant, no matter which
     * year is selected.
     *
     * - `year` - The maximum date unit available. The grid will consist of 16
     * year ranges.
     *
     * Values are also available in `PICKER_DATE_UNITS` named export:
     *
     * - `PICKER_DATE_UNITS.day`
     * - `PICKER_DATE_UNITS.month`
     * - `PICKER_DATE_UNITS.year`
     */
    pickerDateUnit: enumPropertyFactory({
      componentName: 'GeoCalendar',
      propertyName: 'pickerDateUnit',
      enumDictionary: PICKER_DATE_UNITS,
      required: true
    })
  }
}
