import { mount } from '@vue/test-utils'
import GeoCalendarDayGrid from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarDayGrid.vue'
import GeoCalendarDayGridWeekUnit from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarDayGridWeekUnit.vue'
import GeoCalendarDayGridDayUnit from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarDayGridDayUnit.vue'
import { GRANULARITY_IDS } from '@/elements/GeoCalendar/GeoCalendar.utils.js'
import { startOfWeek, startOfDay, endOfWeek } from 'date-fns'

describe('GeoCalendarDayGrid', () => {
  it('should render', function () {
    const wrapper = getWrappedComponent()
    expect(wrapper.find('.geo-calendar-grid').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar-grid__weekdays-row-container').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar-grid__day-container').exists()).toBe(true)
    expect(wrapper.findAll('.geo-calendar-weekdays-row__weekday-name').length).toBe(7)
  })

  describe('Edge months', () => {
    it('Should render (1st day of month is Sunday)', function () {
      const wrapper = getWrappedComponent()
      wrapper.setProps({
        currentMonth: 11
      })

      expect(wrapper.findAll('.geo-calendar-grid__week-unit .geo-calendar-grid__date-picker-unit__placeholder').at(6).text()).toBe('1')
      expect(wrapper.find('.geo-calendar-grid').exists()).toBe(true)
      expect(wrapper.find('.geo-calendar-grid__weekdays-row-container').exists()).toBe(true)
      expect(wrapper.find('.geo-calendar-grid__day-container').exists()).toBe(true)
      expect(wrapper.findAll('.geo-calendar-weekdays-row__weekday-name').length).toBe(7)
    })

    it('Should render (1st day of month is saturday)', function () {
      const wrapper = getWrappedComponent()
      wrapper.setProps({
        currentMonth: 5
      })
      expect(wrapper.findAll('.geo-calendar-grid__week-unit .geo-calendar-grid__date-picker-unit__placeholder').at(5).text()).toBe('1')
      expect(wrapper.find('.geo-calendar-grid').exists()).toBe(true)
      expect(wrapper.find('.geo-calendar-grid__weekdays-row-container').exists()).toBe(true)
      expect(wrapper.find('.geo-calendar-grid__day-container').exists()).toBe(true)
      expect(wrapper.findAll('.geo-calendar-weekdays-row__weekday-name').length).toBe(7)
    })
  })

  describe('Events (day/week)', () => {
    const today = new Date(2019, 6, 30) // Fixed date to avoid future errors with random dates
    it('Emits select-day event when clicked on a day', () => {
      const wrapper = getWrappedComponent()
      const childWeek = wrapper.find(GeoCalendarDayGridWeekUnit)
      childWeek.vm.$emit('select-day', today)
      expect(wrapper.emitted()['select-day']).toBeDefined()
      expect(wrapper.emitted()['select-day'][0][0]).toBe(today)
    })

    it('Emits select-week event when clicked on a week', () => {
      const wrapper = getWrappedComponent()
      const childWeek = wrapper.find(GeoCalendarDayGridWeekUnit)
      const weekStart = startOfWeek(today, { weekStartsOn: 1 })
      const weekEnd = startOfDay(endOfWeek(today, { weekStartsOn: 1 }))

      childWeek.vm.$emit('select-week', {
        fromDate: weekStart,
        toDate: weekEnd
      })
      expect(wrapper.emitted()['select-week']).toBeDefined()
      expect(wrapper.emitted()['select-week'][0][0]).toEqual({
        fromDate: weekStart,
        toDate: weekEnd
      })
    })
  })
})

function getWrappedComponent () {
  return mount(GeoCalendarDayGrid, {
    stubs: {
      GeoCalendarDayGridWeekUnit,
      GeoCalendarDayGridDayUnit
    },
    propsData: {
      currentMonth: 6,
      currentYear: 2019,
      granularityId: GRANULARITY_IDS.day
    }
  })
}
