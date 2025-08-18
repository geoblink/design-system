import { mount } from '@vue/test-utils'
import GeoCalendarPickerGranularityYear from '@/elements/GeoCalendar/GeoCalendarPickerGranularity/GeoCalendarPickerGranularityYear.vue'
import GeoCalendarPickerGranularityBase from '@/elements/GeoCalendar/GeoCalendarPickerGranularity/GeoCalendarPickerGranularityBase.vue'
import { PICKER_DATE_UNITS, GRANULARITY_IDS } from '@/elements/GeoCalendar/GeoCalendar.utils.js'

describe('GeoCalendarPickerGranularityYear', () => {
  it('Should render', function () {
    const wrapper = mount(GeoCalendarPickerGranularityYear, {
      global: {
        stubs: {
          GeoCalendarPickerGranularityBase,
          FontAwesomeIcon: true
        }
      },
      slots: {
        default: ['<p class="year-granularity-selector">Year Granularity</p>']
      },
      props: {
        isActive: false,
        pickerDateUnit: PICKER_DATE_UNITS.year,
        granularityId: GRANULARITY_IDS.year,
        pickerGranularityIcon: ['fas', 'arrow-right']
      }
    })
    expect(wrapper.find('.geo-calendar-picker-granularity-unit').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar-picker-granularity-unit .year-granularity-selector').exists()).toBe(true)
  })

  it('Should trigger click event when clicked on it', () => {
    const wrapper = mount(GeoCalendarPickerGranularityYear, {
      global: {
        stubs: {
          GeoCalendarPickerGranularityBase,
          FontAwesomeIcon: true
        }
      },
      slots: {
        default: ['<p class="year-granularity-selector">Year Granularity</p>']
      },
      props: {
        isActive: false,
        pickerDateUnit: PICKER_DATE_UNITS.year,
        granularityId: GRANULARITY_IDS.year,
        pickerGranularityIcon: ['fas', 'arrow-right']
      }
    })
    wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeDefined()
    expect(wrapper.emitted().click[0][0].pickerDateUnit).toBe(PICKER_DATE_UNITS.year)
    expect(wrapper.emitted().click[0][0].granularityId).toBe(GRANULARITY_IDS.year)
  })
})
