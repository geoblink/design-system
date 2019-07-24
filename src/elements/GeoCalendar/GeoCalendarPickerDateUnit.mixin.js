import { PICKER_DATE_UNITS } from './GeoCalendar.utils'

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
        return value in PICKER_DATE_UNITS
      }
    }
  }
}
