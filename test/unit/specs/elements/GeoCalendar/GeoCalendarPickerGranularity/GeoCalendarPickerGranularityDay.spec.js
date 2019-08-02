import { mount } from '@vue/test-utils'
import GeoCalendarPickerGranularityDay from '@/elements/GeoCalendar/GeoCalendarPickerGranularity/GeoCalendarPickerGranularityDay.vue'
import GeoCalendarPickerGranularityBase from '@/elements/GeoCalendar/GeoCalendarPickerGranularity/GeoCalendarPickerGranularityBase.vue'
import { PICKER_DATE_UNITS, GRANULARITY_IDS } from '@/elements/GeoCalendar/GeoCalendar.utils.js'

describe('GeoCalendarPickerGranularityDay', () => {
  it('should render', function () {
    const wrapper = mount(GeoCalendarPickerGranularityDay, {
      stubs: {
        GeoCalendarPickerGranularityBase,
        FontAwesomeIcon: true
      },
      slots: {
        default: ['<p class="day-granularity-selector">Day Granularity</p>']
      },
      propsData: {
        isActive: false,
        pickerDateUnit: PICKER_DATE_UNITS.day,
        granularityId: GRANULARITY_IDS.day,
        pickerGranularityIcon: ['fas', 'arrow-right']
      }
    })
    expect(wrapper.find('.geo-calendar-picker-granularity-unit').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar-picker-granularity-unit .day-granularity-selector').exists()).toBe(true)
  })

  it('Should trigger click event when clicked on it', () => {
    const wrapper = mount(GeoCalendarPickerGranularityDay, {
      stubs: [
        'geo-calendar-picker-granularity-base',
        'font-awesome-icon'
      ],
      slots: {
        default: ['<p class="day-granularity-selector">Day Granularity</p>']
      },
      propsData: {
        isActive: false,
        pickerDateUnit: PICKER_DATE_UNITS.day,
        granularityId: GRANULARITY_IDS.day,
        pickerGranularityIcon: ['fas', 'arrow-right']
      }
    })
    wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeDefined()
    expect(wrapper.emitted().click[0][0].pickerDateUnit).toBe(PICKER_DATE_UNITS.day)
    expect(wrapper.emitted().click[0][0].granularityId).toBe(GRANULARITY_IDS.day)
  })
})
