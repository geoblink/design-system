import { mount } from '@vue/test-utils'
import _ from 'lodash'
import { GRANULARITY_IDS } from '@/elements/GeoCalendar/GeoCalendar.utils.js'
import GeoCalendarDayGridWeekUnit from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarDayGridWeekUnit.vue'
import GeoCalendarDayGridDayUnit from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarDayGridDayUnit.vue'
import { addDays, endOfMonth, startOfMonth, differenceInCalendarDays, subDays, startOfWeek, endOfWeek, startOfDay, addMonths, subMonths } from 'date-fns'

describe('GeoCalendarDayGridWeekUnit', () => {
  const today = new Date(2019, 6, 30) // Fixed date to avoid future errors with random dates
  const wrapper = getWrappedComponent()

  it('Should render', function () {
    expect(wrapper.find('.geo-calendar-grid__week-unit').exists()).toBe(true)
  })

  describe('Week granularity', () => {
    const wrapper = getWrappedComponent()
    wrapper.setProps({
      earliestDate: addMonths(today, 3),
      latestDate: addMonths(today, 5),
      granularityId: GRANULARITY_IDS.week
    })

    const dayChild = wrapper.find(GeoCalendarDayGridDayUnit)

    it('Should add proper classes', () => {
      expect(wrapper.find('.geo-calendar-grid__week-unit--is-week-granularity').exists()).toBe(true)
      expect(wrapper.find('.geo-calendar-grid__week-unit--unavailable').exists()).toBe(true)
    })

    it('Should select week if there is data', () => {
      wrapper.setProps({
        earliestDate: subMonths(today, 3),
        latestDate: addMonths(today, 5)
      })
      dayChild.vm.$emit('select-day-unit', today)
      const weekStart = startOfWeek(today, { weekStartsOn: 1 })
      const weekEnd = startOfDay(endOfWeek(today, { weekStartsOn: 1 }))

      expect(wrapper.emitted()['select-week']).toBeDefined()
      expect(wrapper.emitted()['select-week'][0][0]).toEqual({
        fromDate: weekStart,
        toDate: weekEnd
      })
    })
  })

  describe('Day granularity', () => {
    const wrapper = getWrappedComponent()
    const dayChild = wrapper.find(GeoCalendarDayGridDayUnit)

    wrapper.setProps({
      earliestDate: subDays(today, 5),
      latestDate: addDays(today, 3),
      granularityId: GRANULARITY_IDS.day
    })

    it('Should not do anything if day has no data and is clicked', () => {
      dayChild.vm.$emit('select-day-unit', subDays(today, 7))
      expect(wrapper.emitted()['select-day']).toBeUndefined()
    })

    it('Should select day if day has data and is clicked', () => {
      dayChild.vm.$emit('select-day-unit', today)
      expect(wrapper.emitted()['select-day']).toBeDefined()
      expect(wrapper.emitted()['select-day'][0][0]).toBe(today)
    })

    it('Should emit mouseover event if received from child component', () => {
      const wrapper = getWrappedComponent()
      const geoCalendarDayGridDayUnitWrapper = wrapper.find(GeoCalendarDayGridDayUnit)

      geoCalendarDayGridDayUnitWrapper.vm.$emit('day-unit-mouseover', today)
      expect(wrapper.emitted()['day-unit-mouseover']).toBeDefined()
      expect(wrapper.emitted()['day-unit-mouseover'][0][0]).toBe(today)
    })
  })
})

function getWrappedComponent (granularityId) {
  const today = new Date(2019, 6, 30) // Fixed date to avoid future errors with random dates
  const week = _.times(7, (day) => {
    return addDays(today, day)
  })
  const monthStart = startOfMonth(today)
  const monthEnd = endOfMonth(today)
  const fullMonthCalendar = _.chunk(_.times(differenceInCalendarDays(monthEnd, monthStart), (day) => {
    return addDays(monthStart, day)
  }), 7)

  return mount(GeoCalendarDayGridWeekUnit, {
    stubs: {
      GeoCalendarDayGridDayUnit
    },
    propsData: {
      currentDate: today,
      week,
      fullMonthCalendar,
      weekIndex: 4,
      granularityId: GRANULARITY_IDS.day
    }
  })
}
