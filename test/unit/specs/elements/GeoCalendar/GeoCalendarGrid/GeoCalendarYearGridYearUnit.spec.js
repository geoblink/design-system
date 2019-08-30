import { mount } from '@vue/test-utils'
import GeoCalendarYearGridYearUnit from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarYearGridYearUnit.vue'
import { subYears, addYears, getYear, getMonth } from 'date-fns'

describe('GeoCalendarYearGridYearUnit', () => {
  const today = new Date(2019, 6, 30) // Fixed date to avoid future errors with random dates
  const currentYear = getYear(today)
  const currentMonth = getMonth(today)
  const wrapper = mount(GeoCalendarYearGridYearUnit, {
    propsData: {
      currentMonth,
      currentYear,
      year: 2019
    }
  })

  it('should render', function () {
    expect(wrapper.find('.geo-calendar-grid__date-picker-unit').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar-grid__date-picker-unit__placeholder').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar-grid__date-picker-unit__placeholder').text()).toBe('2019')
  })

  describe('Computed properties', () => {
    it('isDateInYear', () => {
      wrapper.setProps({
        selectedFromDay: today
      })
      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--selected').exists()).toBe(true)
      expect(wrapper.vm.isDateInYear).toBe(true)

      wrapper.setProps({
        selectedFromDay: subYears(today, 1),
        selectedToDay: addYears(today, 1)
      })
      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--selected').exists()).toBe(false)
      expect(wrapper.vm.isDateInYear).toBe(false)
    })

    it('isDateWithinSelectedYears', () => {
      wrapper.setProps({
        selectedFromDay: subYears(today, 1),
        selectedToDay: addYears(today, 2)
      })

      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--within-range').exists()).toBe(true)
      expect(wrapper.vm.isDateWithinSelectedYears).toBe(true)

      wrapper.setProps({
        selectedFromDay: addYears(today, 1),
        selectedToDay: addYears(today, 2)
      })

      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--within-range').exists()).toBe(false)
      expect(wrapper.vm.isDateWithinSelectedYears).toBe(false)
    })

    it('isYearUnavailable', () => {
      wrapper.setProps({
        earliestDate: subYears(today, 1),
        latestDate: addYears(today, 1)
      })

      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--unavailable').exists()).toBe(false)
      expect(wrapper.vm.isYearUnavailable).toBe(false)

      wrapper.setProps({
        earliestDate: addYears(today, 1),
        latestDate: addYears(today, 2)
      })

      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--unavailable').exists()).toBe(true)
      expect(wrapper.vm.isYearUnavailable).toBe(true)
    })

    it('isDayWithinFromYear', () => {
      wrapper.setProps({
        selectedFromDay: today
      })

      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--from-date').exists()).toBe(true)
      expect(wrapper.vm.isDayWithinFromYear).toBe(true)
    })

    it('isDayWithinToYear', () => {
      wrapper.setProps({
        selectedToDay: today
      })

      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--to-date').exists()).toBe(true)
      expect(wrapper.vm.isDayWithinToYear).toBe(true)
    })
  })

  describe('Select year', () => {
    it('Should not emit event if the passed year does not have data', () => {
      wrapper.setProps({
        earliestDate: addYears(today, 1),
        latestDate: addYears(today, 2)
      })

      wrapper.find('.geo-calendar-grid__date-picker-unit').trigger('click')
      expect(wrapper.emitted()['select-year-unit']).toBeUndefined()
    })

    it('Should emit an event when the passed year does have data', () => {
      wrapper.setProps({
        earliestDate: subYears(today, 1)
      })

      wrapper.find('.geo-calendar-grid__date-picker-unit').trigger('click')
      expect(wrapper.emitted()['select-year-unit']).toBeDefined()
      expect(wrapper.emitted()['select-year-unit'][0][0]).toBe(currentYear)
    })
  })
})
