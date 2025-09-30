import { mount } from '@vue/test-utils'
import GeoCalendarPickerGranularityQuarter from '@/elements/GeoCalendar/GeoCalendarPickerGranularity/GeoCalendarPickerGranularityQuarter.vue'
import GeoCalendarPickerGranularityBase from '@/elements/GeoCalendar/GeoCalendarPickerGranularity/GeoCalendarPickerGranularityBase.vue'
import { PICKER_DATE_UNITS, GRANULARITY_IDS } from '@/elements/GeoCalendar/GeoCalendar.utils.js'

describe('GeoCalendarPickerGranularityQuarter', () => {
  it('Should render', function () {
    const wrapper = getWrappedComponent()
    expect(wrapper.find('.geo-calendar-picker-granularity-unit').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar-picker-granularity-unit .quarter-granularity-selector').exists()).toBe(true)
  })

  it('Should trigger click event when clicked on it', async () => {
    const wrapper = getWrappedComponent()
    await wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeDefined()
    expect(wrapper.emitted().click[0][0].pickerDateUnit).toBe(PICKER_DATE_UNITS.month)
    expect(wrapper.emitted().click[0][0].granularityId).toBe(GRANULARITY_IDS.quarter)
  })
})

function getWrappedComponent () {
  return mount(GeoCalendarPickerGranularityQuarter, {
    global: {
      components: {
        GeoCalendarPickerGranularityBase
      },
      stubs: {
        FontAwesomeIcon: true
      }
    },
    slots: {
      default: ['<p class="quarter-granularity-selector">Quarter Granularity</p>']
    },
    props: {
      isActive: false,
      pickerDateUnit: PICKER_DATE_UNITS.month,
      granularityId: GRANULARITY_IDS.month,
      pickerGranularityIcon: ['fas', 'arrow-right']
    }
  })
}