import { GRANULARITY_IDS } from './GeoCalendar.utils'
/**
 * @mixin
 */
export default {
  props: {
    /**
     * Current granularity being displayed on the calendar.
     *
     * Supported values are:
     *
     * - `day` - You will be able to select an initial and end days, creating a
     * range of `n` days. The displayed grid will be days.
     *
     * - `week` - You will be able to select a range of one week. No matter the
     * day you click on, the selected range will consist of the start and the
     * end of the week containing the selected day. The displayed grid will be
     * days.
     *
     * - `month` - You will be able to select an initial and end months,
     * creating a range of `n` months. The displayed grid will be months.
     *
     * - `quarter` - You will be able to select a range of one quarter. No
     * matter the month you click on, the selected range will consist of the
     * start and the end of the quarter containing the selected month. The
     * displayed grid will be months.
     *
     * - `year` - You will be able to select an initial and end years, creating
     * a range of `n` years. The displayed grid will be years.
     *
     * Values are also available in `GRANULARITY_IDS` named export:
     *
     * - `GRANULARITY_IDS.day`
     * - `GRANULARITY_IDS.week`
     * - `GRANULARITY_IDS.month`
     * - `GRANULARITY_IDS.quarter`
     * - `GRANULARITY_IDS.year`
     */
    granularityId: {
      type: String,
      required: true,
      validator (value) {
        if (value in GRANULARITY_IDS) return true
        const supportedGranularities = Object.values(GRANULARITY_IDS).map(i => `«${i}»`).join(', ')
        console.warn(`GeoCalendar [component] :: Unsupported value («${value}») for granularityId property. Use one of ${supportedGranularities}`)
        return false
      }
    }
  }
}
