import { GRANULARITY_IDS } from './GeoCalendar.utils'
/**
 * @mixin
 */
export default {
  props: {
    /**
     * Current granularity being displayed on the calendar. `day`, `week`, `month`, `quarter`, `year`
     * Values available in `GRANULARITY_IDS`:
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
