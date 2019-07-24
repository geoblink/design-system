import { GRANULARITY_IDS } from './GeoCalendar.utils'

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
        return value in GRANULARITY_IDS
      }
    }
  }
}
