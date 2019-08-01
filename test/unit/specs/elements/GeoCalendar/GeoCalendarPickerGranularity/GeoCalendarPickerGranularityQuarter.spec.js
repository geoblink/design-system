import { mount } from '@vue/test-utils'
import GeoCalendarPickerGranularityQuarter from '@/elements/GeoCalendar/GeoCalendarPickerGranularity/GeoCalendarPickerGranularityQuarter.vue'
import GeoCalendarPickerGranularityBase from '@/elements/GeoCalendar/GeoCalendarPickerGranularity/GeoCalendarPickerGranularityBase.vue'
import { PICKER_DATE_UNITS, GRANULARITY_IDS } from '@/elements/GeoCalendar/GeoCalendar.utils.js'

describe('GeoCalendarPickerGranularityQuarter', () => {
  it('should render', function () {
    const wrapper = mount(GeoCalendarPickerGranularityQuarter, {
      stubs: {
        GeoCalendarPickerGranularityBase,
        FontAwesomeIcon: true
      },
      slots: {
        default: ['<p class="quarter-granularity-selector">Quarter Granularity</p>']
      },
      propsData: {
        isActive: false,
        pickerDateUnit: PICKER_DATE_UNITS.month,
        granularityId: GRANULARITY_IDS.month,
        pickerGranularityIcon: ['fas', 'arrow-right']
      }
    })
    expect(wrapper.find('.geo-calendar-picker-granularity-unit').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar-picker-granularity-unit .quarter-granularity-selector').exists()).toBe(true)
  })

  it('Should trigger click event when clicked on it', () => {
    const wrapper = mount(GeoCalendarPickerGranularityQuarter, {
      stubs: [
        'geo-calendar-picker-granularity-base',
        'font-awesome-icon'
      ],
      slots: {
        default: ['<p class="quarter-granularity-selector">Quarter Granularity</p>']
      },
      propsData: {
        isActive: false,
        pickerDateUnit: PICKER_DATE_UNITS.month,
        granularityId: GRANULARITY_IDS.quarter,
        pickerGranularityIcon: ['fas', 'arrow-right']
      }
    })
    wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeDefined()
    expect(wrapper.emitted().click[0][0].pickerDateUnit).toBe(PICKER_DATE_UNITS.month)
    expect(wrapper.emitted().click[0][0].granularityId).toBe(GRANULARITY_IDS.quarter)
  })
})
