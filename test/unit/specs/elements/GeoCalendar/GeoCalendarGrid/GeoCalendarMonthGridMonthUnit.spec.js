import { mount } from '@vue/test-utils'
import { GRANULARITY_IDS } from '@/elements/GeoCalendar/GeoCalendar.utils.js'
import GeoCalendarMonthGridMonthUnit from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarMonthGridMonthUnit.vue'
import { subDays, subMonths, addMonths, getMonth, getYear } from 'date-fns'

describe('GeoCalendarMonthGridMonthUnit', () => {
  const today = new Date(2019, 7, 29)
  const currentMonth = getMonth(today)
  const currentYear = getYear(today)
  const monthName = 'July'
  const monthIndex = 7

  it('should render', function () {
    const wrapper = mount(GeoCalendarMonthGridMonthUnit, {
      propsData: {
        monthName,
        monthIndex,
        currentMonth,
        currentYear,
        granularityId: GRANULARITY_IDS.month
      }
    })
    expect(wrapper.find('.geo-calendar-grid__date-picker-unit').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar-date-picker-unit__placeholder').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar-date-picker-unit__placeholder').text()).toBe('July')
    expect(wrapper.vm.monthName).toBe('July')
    expect(wrapper.vm.monthIndex).toBe(7)
  })

  describe('Computed properties', () => {
    const wrapper = mount(GeoCalendarMonthGridMonthUnit, {
      propsData: {
        monthName,
        monthIndex,
        currentMonth,
        currentYear,
        granularityId: GRANULARITY_IDS.month
      }
    })

    it('isDateInMonth', () => {
      wrapper.setProps({
        selectedFromDay: subDays(today, 5)
      })
      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--selected').exists()).toBe(true)
      expect(wrapper.vm.isDateInMonth).toBe(true)

      wrapper.setProps({
        selectedFromDay: subMonths(today, 2),
        selectedToDay: addMonths(today, 2)
      })
      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--selected').exists()).toBe(false)
      expect(wrapper.vm.isDateInMonth).toBe(false)
    })

    it('isDateWithinSelectedMonths', () => {
      wrapper.setProps({
        selectedFromDay: subMonths(today, 2),
        selectedToDay: addMonths(today, 1)
      })
      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--within-range').exists()).toBe(true)
      expect(wrapper.vm.isDateWithinSelectedMonths).toBe(true)

      wrapper.setProps({
        selectedFromDay: addMonths(today, 1),
        selectedToDay: addMonths(today, 2)
      })
      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--within-range').exists()).toBe(false)
      expect(wrapper.vm.isDateWithinSelectedMonths).toBe(false)
    })

    it('isMonthUnavailable', () => {
      wrapper.setProps({
        earliestDate: addMonths(today, 3)
      })
      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--unavailable').exists()).toBe(true)
      expect(wrapper.vm.isMonthUnavailable).toBe(true)

      wrapper.setProps({
        earliestDate: subMonths(today, 3),
        latestDate: addMonths(today, 1)
      })
      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--unavailable').exists()).toBe(false)
      expect(wrapper.vm.isMonthUnavailable).toBe(false)
    })

    it('isMonthWithinFromMonth', () => {
      wrapper.setProps({
        selectedFromDay: today
      })
      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--from-date').exists()).toBe(true)
      expect(wrapper.vm.isDayWithinFromMonth).toBe(true)

      wrapper.setProps({
        selectedFromDay: addMonths(today, 1)
      })
      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--from-date').exists()).toBe(false)
      expect(wrapper.vm.isDayWithinFromMonth).toBe(false)
    })

    it('isMonthWithinToMonth', () => {
      wrapper.setProps({
        selectedToDay: today
      })
      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--to-date').exists()).toBe(true)
      expect(wrapper.vm.isDayWithinToMonth).toBe(true)

      wrapper.setProps({
        selectedToDay: subMonths(today, 1)
      })
      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--to-date').exists()).toBe(false)
      expect(wrapper.vm.isDayWithinToMonth).toBe(false)
    })
  })

  describe('Click month event', () => {
    it('Emits event when clicking on month', () => {
      const wrapper = mount(GeoCalendarMonthGridMonthUnit, {
        propsData: {
          monthName,
          monthIndex,
          currentMonth,
          currentYear,
          granularityId: GRANULARITY_IDS.month
        }
      })
      wrapper.find('.geo-calendar-grid__date-picker-unit').trigger('click')
      expect(wrapper.emitted()['select-month-unit']).toBeDefined()
      expect(wrapper.emitted()['select-month-unit'][0][0]).toBe(7)
    })
  })
})
