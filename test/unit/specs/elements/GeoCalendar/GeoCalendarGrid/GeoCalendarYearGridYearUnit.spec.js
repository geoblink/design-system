import { mount } from '@vue/test-utils'
import GeoCalendarYearGridYearUnit from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarYearGridYearUnit.vue'
import { getYear, addYears, subYears, getMonth } from 'date-fns'

describe('GeoCalendarYearGridYearUnit', () => {
  const today = new Date(2019, 6, 30) // Fixed date to avoid future errors with random dates
  const currentYear = getYear(today)
  const currentMonth = getMonth(today)
  const wrapper = mount(GeoCalendarYearGridYearUnit, {
    props: {
      currentMonth,
      currentYear,
      year: 2019
    }
  })

  it('Should render', function () {
    expect(wrapper.find('.geo-calendar-grid__date-picker-unit').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar-grid__date-picker-unit__placeholder').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar-grid__date-picker-unit__placeholder').text()).toBe('2019')
  })

  describe('Computed properties', () => {
    it('isDateInYear', async () => {
      await wrapper.setProps({
        selectedFromDay: today
      })
      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--selected').exists()).toBe(true)
      expect(wrapper.vm.isDateInYear).toBe(true)

      await wrapper.setProps({
        selectedFromDay: subYears(today, 1),
        selectedToDay: addYears(today, 1)
      })
      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--selected').exists()).toBe(false)
      expect(wrapper.vm.isDateInYear).toBe(false)
    })

    it('isDateWithinSelectedYears', async () => {
      await wrapper.setProps({
        selectedFromDay: subYears(today, 1),
        selectedToDay: addYears(today, 2)
      })

      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--within-range').exists()).toBe(true)
      expect(wrapper.vm.isDateWithinSelectedYears).toBe(true)

      await wrapper.setProps({
        selectedFromDay: addYears(today, 1),
        selectedToDay: addYears(today, 2)
      })

      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--within-range').exists()).toBe(false)
      expect(wrapper.vm.isDateWithinSelectedYears).toBe(false)
    })

    it('isYearUnavailable', async () => {
      await wrapper.setProps({
        earliestDate: subYears(today, 1),
        latestDate: addYears(today, 1)
      })

      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--unavailable').exists()).toBe(false)
      expect(wrapper.vm.isYearUnavailable).toBe(false)

      await wrapper.setProps({
        earliestDate: addYears(today, 1),
        latestDate: addYears(today, 2)
      })

      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--unavailable').exists()).toBe(true)
      expect(wrapper.vm.isYearUnavailable).toBe(true)
    })

    it('isDayWithinFromYear', async () => {
      await wrapper.setProps({
        selectedFromDay: today
      })

      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--from-date').exists()).toBe(true)
      expect(wrapper.vm.isDayWithinFromYear).toBe(true)
    })

    it('isDayWithinToYear', async () => {
      await wrapper.setProps({
        selectedToDay: today
      })

      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--to-date').exists()).toBe(true)
      expect(wrapper.vm.isDayWithinToYear).toBe(true)
    })
  })

  describe('Select year', () => {
    it('Should not emit event if the passed year does not have data', async () => {
      await wrapper.setProps({
        earliestDate: addYears(today, 1),
        latestDate: addYears(today, 2)
      })

      wrapper.find('.geo-calendar-grid__date-picker-unit').trigger('mousedown')
      expect(wrapper.emitted()['select-year-unit']).toBeUndefined()
    })

    it('Should emit an event when the passed year does have data', async () => {
      await wrapper.setProps({
        earliestDate: subYears(today, 1)
      })

      wrapper.find('.geo-calendar-grid__date-picker-unit').trigger('mousedown')
      expect(wrapper.emitted()['select-year-unit']).toBeDefined()
      expect(wrapper.emitted()['select-year-unit'][0][0]).toBe(currentYear)
    })

    it('Emits event when hovering on year', async () => {
      wrapper.find('.geo-calendar-grid__date-picker-unit').trigger('mouseover')
      expect(wrapper.emitted()['year-unit-mouseover']).toBeDefined()
      expect(wrapper.emitted()['year-unit-mouseover'][0][0]).toBe(currentYear)
    })
  })
})
