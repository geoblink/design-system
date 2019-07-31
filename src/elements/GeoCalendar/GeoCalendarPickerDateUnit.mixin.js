import { PICKER_DATE_UNITS } from './GeoCalendar.utils'
/**
 * @mixin
 */
export default {
  props: {
    /**
     * Type of grid being displayed. `day`, `month` or `year`
     * Values available in PICKER_DATE_UNITS:
     *
     * - `PICKER_DATE_UNITS.day`
     * - `PICKER_DATE_UNITS.month`
     * - `PICKER_DATE_UNITS.year`
     */
    pickerDateUnit: {
      type: String,
      required: true,
      validator (value) {
        if (value in PICKER_DATE_UNITS) return true
        const supportedPickerDateUnits = Object.values(PICKER_DATE_UNITS).map(i => `«${i}»`).join(', ')
        console.warn(`GeoCalendar [component] :: Unsupported value («${value}») for pickerDateUnit property. Use one of ${supportedPickerDateUnits}`)
        return false
      }
    }
  }
}
