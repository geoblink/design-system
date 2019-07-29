import { mount } from '@vue/test-utils'
import GeoCalendarDayGrid from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarDayGrid.vue'
import GeoCalendarDayGridWeekUnit from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarDayGridWeekUnit.vue'
import { GRANULARITY_IDS } from '@/elements/GeoCalendar/GeoCalendar.utils'
import { startOfWeek, startOfDay, endOfWeek } from 'date-fns'

describe('GeoCalendarDayGrid', () => {
  const wrapper = mount(GeoCalendarDayGrid, {
    stubs: {
      GeoCalendarDayGridWeekUnit,
      GeoCalendarDayGridDayUnit: true
    },
    propsData: {
      currentMonth: 6,
      currentYear: 2019,
      granularityId: GRANULARITY_IDS.day
    }
  })

  it('should render', function () {
    expect(wrapper.find('.geo-calendar-grid').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar-grid__weekdays-row-container').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar-grid__day-container').exists()).toBe(true)
    expect(wrapper.findAll('.geo-calendar-weekdays-row__weekday-name').length).toBe(7)
  })

  describe('Edge months', () => {
    const wrapper = mount(GeoCalendarDayGrid, {
      stubs: {
        GeoCalendarDayGridWeekUnit,
        GeoCalendarDayGridDayUnit: true
      },
      propsData: {
        currentMonth: 11,
        currentYear: 2019,
        granularityId: GRANULARITY_IDS.day
      }
    })
    it('Should render (1st day of month is Sunday)', function () {
      expect(wrapper.find('.geo-calendar-grid').exists()).toBe(true)
      expect(wrapper.find('.geo-calendar-grid__weekdays-row-container').exists()).toBe(true)
      expect(wrapper.find('.geo-calendar-grid__day-container').exists()).toBe(true)
      expect(wrapper.findAll('.geo-calendar-weekdays-row__weekday-name').length).toBe(7)
    })

    it('Should render (1st day of month is saturday)', function () {
      wrapper.setProps({
        currentMonth: 5
      })
      expect(wrapper.find('.geo-calendar-grid').exists()).toBe(true)
      expect(wrapper.find('.geo-calendar-grid__weekdays-row-container').exists()).toBe(true)
      expect(wrapper.find('.geo-calendar-grid__day-container').exists()).toBe(true)
      expect(wrapper.findAll('.geo-calendar-weekdays-row__weekday-name').length).toBe(7)
    })
  })

  describe('Events (day/week)', () => {
    const today = new Date()
    const childWeek = wrapper.find(GeoCalendarDayGridWeekUnit)
    it('Emits select-day event when clicked on a day', () => {
      childWeek.vm.$emit('select-day', today)
      expect(wrapper.emitted()['select-day']).toBeDefined()
      expect(wrapper.emitted()['select-day'][0][0]).toBe(today)
    })

    it('Emits select-week event when clicked on a week', () => {
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
