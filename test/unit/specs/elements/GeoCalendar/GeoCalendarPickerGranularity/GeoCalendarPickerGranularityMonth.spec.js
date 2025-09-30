import { mount } from '@vue/test-utils'
import GeoCalendarPickerGranularityMonth from '@/elements/GeoCalendar/GeoCalendarPickerGranularity/GeoCalendarPickerGranularityMonth.vue'
import GeoCalendarPickerGranularityBase from '@/elements/GeoCalendar/GeoCalendarPickerGranularity/GeoCalendarPickerGranularityBase.vue'
import { PICKER_DATE_UNITS, GRANULARITY_IDS } from '@/elements/GeoCalendar/GeoCalendar.utils.js'

describe('GeoCalendarPickerGranularityMonth', () => {
  it('Should render', function () {
    const wrapper = mount(GeoCalendarPickerGranularityMonth, {
      global: {
        stubs: {
          GeoCalendarPickerGranularityBase,
          FontAwesomeIcon: true
        }
      },
      slots: {
        default: ['<p class="month-granularity-selector">Month Granularity</p>']
      },
      props: {
        isActive: false,
        pickerDateUnit: PICKER_DATE_UNITS.month,
        granularityId: GRANULARITY_IDS.month
      }
    })
    expect(wrapper.find('.geo-calendar-picker-granularity-unit').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar-picker-granularity-unit .month-granularity-selector').exists()).toBe(true)
  })

  it('Should trigger click event when clicked on it', async () => {
    const wrapper = mount(GeoCalendarPickerGranularityMonth, {
      global: {
        stubs: {
          GeoCalendarPickerGranularityBase,
          FontAwesomeIcon: true
        }
      },
      slots: {
        default: ['<p class="month-granularity-selector">Month Granularity</p>']
      },
      props: {
        isActive: false,
        pickerDateUnit: PICKER_DATE_UNITS.month,
        granularityId: GRANULARITY_IDS.month,
        pickerGranularityIcon: ['fas', 'arrow-right']
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeDefined()
    expect(wrapper.emitted().click[0][0].pickerDateUnit).toBe(PICKER_DATE_UNITS.month)
    expect(wrapper.emitted().click[0][0].granularityId).toBe(GRANULARITY_IDS.month)
  })
})
