import { mount } from '@vue/test-utils'
import GeoCalendarPickerGranularityBase from '@/elements/GeoCalendar/GeoCalendarPickerGranularity/GeoCalendarPickerGranularityBase.vue'

describe('GeoCalendarPickerGranularityBase', () => {
  it('should render', function () {
    const wrapper = mount(GeoCalendarPickerGranularityBase, {
      stubs: ['font-awesome-icon'],
      propsData: {
        isActive: false,
        pickerGranularityIcon: ['fas', 'arrow-right']
      }
    })
    expect(wrapper.find('.geo-calendar-picker-granularity-unit').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar-picker-granularity-unit__selector-icon').exists()).toBe(true)
  })

  it('Should toggle isActive prop classes', () => {
    const wrapper = mount(GeoCalendarPickerGranularityBase, {
      stubs: ['font-awesome-icon'],
      propsData: {
        isActive: false,
        pickerGranularityIcon: ['fas', 'arrow-right']
      }
    })
    expect(wrapper.find('.geo-calendar-picker-granularity-unit--active').exists()).toBe(false)
    wrapper.setProps({ isActive: true })
    expect(wrapper.find('.geo-calendar-picker-granularity-unit--active').exists()).toBe(true)
  })
})
