import { mount } from '@vue/test-utils'
import GeoCalendarYearGridYearUnit from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarYearGridYearUnit.vue'
import { subYears, addYears, getYear, getMonth } from 'date-fns'

describe('GeoCalendarYearGridYearUnit', () => {
  const today = new Date()
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
    expect(wrapper.find('.geo-calendar-years__year-unit').exists()).toBe(true)
    expect(wrapper.find('.year-unit__year-number').exists()).toBe(true)
    expect(wrapper.find('.year-unit__year-number').text()).toBe('2019')
  })

  describe('Computed properties', () => {
    it('isDateInYear', () => {
      wrapper.setProps({
        selectedFromDay: today
      })
      expect(wrapper.find('.geo-calendar-years__year-unit--selected').exists()).toBe(true)
      expect(wrapper.vm.isDateInYear).toBe(true)

      wrapper.setProps({
        selectedFromDay: subYears(today, 1),
        selectedToDay: addYears(today, 1)
      })
      expect(wrapper.find('.geo-calendar-years__year-unit--selected').exists()).toBe(false)
      expect(wrapper.vm.isDateInYear).toBe(false)
    })

    it('isDateWithinSelectedYears', () => {
      wrapper.setProps({
        selectedFromDay: subYears(today, 1),
        selectedToDay: addYears(today, 2)
      })

      expect(wrapper.find('.geo-calendar-years__year-unit--within-range').exists()).toBe(true)
      expect(wrapper.vm.isDateWithinSelectedYears).toBe(true)

      wrapper.setProps({
        selectedFromDay: addYears(today, 1),
        selectedToDay: addYears(today, 2)
      })

      expect(wrapper.find('.geo-calendar-years__year-unit--within-range').exists()).toBe(false)
      expect(wrapper.vm.isDateWithinSelectedYears).toBe(false)
    })

    it('isYearWithoutData', () => {
      wrapper.setProps({
        earliestDate: subYears(today, 1),
        latestDate: addYears(today, 1)
      })

      expect(wrapper.find('.geo-calendar-years__year-unit--no-data').exists()).toBe(false)
      expect(wrapper.vm.isYearWithoutData).toBe(false)

      wrapper.setProps({
        earliestDate: addYears(today, 1),
        latestDate: addYears(today, 2)
      })

      expect(wrapper.find('.geo-calendar-years__year-unit--no-data').exists()).toBe(true)
      expect(wrapper.vm.isYearWithoutData).toBe(true)
    })

    it('isDayWithinFromYear', () => {
      wrapper.setProps({
        selectedFromDay: today
      })

      expect(wrapper.find('.geo-calendar-years__year-unit--from-date').exists()).toBe(true)
      expect(wrapper.vm.isDayWithinFromYear).toBe(true)
    })

    it('isDayWithinToYear', () => {
      wrapper.setProps({
        selectedToDay: today
      })

      expect(wrapper.find('.geo-calendar-years__year-unit--to-date').exists()).toBe(true)
      expect(wrapper.vm.isDayWithinToYear).toBe(true)
    })
  })

  describe('Select year', () => {
    it('Should not emit event if the passed year does not have data', () => {
      wrapper.setProps({
        earliestDate: addYears(today, 1),
        latestDate: addYears(today, 2)
      })

      wrapper.find('.geo-calendar-years__year-unit').trigger('click')
      expect(wrapper.emitted()['select-year-unit']).toBeUndefined()
    })

    it('Should emit an event when the passed year does have data', () => {
      wrapper.setProps({
        earliestDate: subYears(today, 1)
      })

      wrapper.find('.geo-calendar-years__year-unit').trigger('click')
      expect(wrapper.emitted()['select-year-unit']).toBeDefined()
      expect(wrapper.emitted()['select-year-unit'][0][0]).toBe(currentYear)
    })
  })
})
