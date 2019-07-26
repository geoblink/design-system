import { mount } from '@vue/test-utils'
import GeoCalendar from '@/elements/GeoCalendar/GeoCalendarPicker.vue'

describe('GeoCalendar', () => {
  it('should render', function () {
    const wrapper = mount(GeoCalendar)
    expect(wrapper.find('.geo-calendar').exists()).toBe(true)
  })
})
