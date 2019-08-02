import { mount } from '@vue/test-utils'
import { GRANULARITY_IDS, PICKER_DATE_UNITS } from '@/elements/GeoCalendar/GeoCalendar.utils.js'
import GeoCalendarPicker from '@/elements/GeoCalendar/GeoCalendarPicker.vue'
import GeoCalendarNavigation from '@/elements/GeoCalendar/GeoCalendarNavigation/GeoCalendarNavigation.vue'
import GeoCalendarGrid from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarGrid.vue'
import { getMonth, getYear, subDays, startOfWeek, startOfDay, endOfWeek, endOfMonth, startOfMonth, addDays, addYears } from 'date-fns'

describe('GeoCalendarPicker', () => {
  const wrapper = getWrappedComponent()

  it('should render', function () {
    expect(wrapper.find('.geo-calendar-picker').exists()).toBe(true)
  })

  describe('Select dates events', () => {
    const geoCalendarGridWrapper = wrapper.find(GeoCalendarGrid)
    const geoCalendarNavigationWrapper = wrapper.find(GeoCalendarNavigation)

    it('goToMonth', () => {
      geoCalendarNavigationWrapper.vm.$emit('go-to-month', 5)
      expect(wrapper.emitted()['go-to-month']).toBeDefined()
      expect(wrapper.emitted()['go-to-month'][0][0]).toBe(5)
    })

    it('goToYear', () => {
      geoCalendarNavigationWrapper.vm.$emit('go-to-year', 2018)
      expect(wrapper.emitted()['go-to-year']).toBeDefined()
      expect(wrapper.emitted()['go-to-year'][0][0]).toBe(2018)
    })

    it('goToYearRange', () => {
      geoCalendarNavigationWrapper.vm.$emit('go-to-year-range', [2031, 2047])
      expect(wrapper.emitted()['go-to-year-range']).toBeDefined()
      expect(wrapper.emitted()['go-to-year-range'][0][0]).toEqual([2031, 2047])
    })

    it('selectDay', () => {
      const dayToSelect = subDays(new Date(), 2)
      geoCalendarGridWrapper.vm.$emit('select-day', dayToSelect)
      expect(wrapper.emitted()['select-day']).toBeDefined()
      expect(wrapper.emitted()['select-day'][0][0]).toBe(dayToSelect)
    })

    it('selectWeek', () => {
      const today = new Date(2019, 6, 30) // Fixed date to avoid future errors with random dates
      const weekStart = startOfWeek(today, { weekStartsOn: 1 })
      const weekEnd = startOfDay(endOfWeek(today, { weekStartsOn: 1 }))
      geoCalendarGridWrapper.vm.$emit('select-week', {
        fromDate: weekStart,
        toDate: weekEnd
      })
      expect(wrapper.emitted()['select-week']).toBeDefined()
      expect(wrapper.emitted()['select-week'][0][0]).toEqual({
        fromDate: weekStart,
        toDate: weekEnd
      })
    })

    it('selectMonth', () => {
      geoCalendarGridWrapper.vm.$emit('select-month', 5)
      expect(wrapper.emitted()['select-month']).toBeDefined()
      expect(wrapper.emitted()['select-month'][0][0]).toBe(5)
    })

    it('selectQuarter', () => {
      geoCalendarGridWrapper.vm.$emit('select-quarter', 5)
      expect(wrapper.emitted()['select-quarter']).toBeDefined()
      expect(wrapper.emitted()['select-quarter'][0][0]).toBe(5)
    })

    it('selectYear', () => {
      geoCalendarGridWrapper.vm.$emit('select-year', 2018)
      expect(wrapper.emitted()['select-year']).toBeDefined()
      expect(wrapper.emitted()['select-year'][0][0]).toBe(2018)
    })
  })

  describe('Navigate backwards/forward', () => {
    describe('DAYS granularity', () => {
      it('Goes backwards', () => {
        const wrapper = getWrappedComponent()
        const geoCalendarNavigationWrapper = wrapper.find(GeoCalendarNavigation)
        wrapper.setProps({
          granularityId: GRANULARITY_IDS.day,
          pickerDateUnit: PICKER_DATE_UNITS.day
        })
        geoCalendarNavigationWrapper.vm.$emit('go-to-previous-picker-date')
        expect(wrapper.emitted()['go-to-month']).toBeDefined()
        wrapper.setProps({
          currentMonth: 0
        })
        geoCalendarNavigationWrapper.vm.$emit('go-to-previous-picker-date')
        expect(wrapper.emitted()['go-to-year']).toBeDefined()
      })

      it('Goes forward', () => {
        const wrapper = getWrappedComponent()
        const geoCalendarNavigationWrapper = wrapper.find(GeoCalendarNavigation)
        wrapper.setProps({
          granularityId: GRANULARITY_IDS.day,
          pickerDateUnit: PICKER_DATE_UNITS.day
        })
        geoCalendarNavigationWrapper.vm.$emit('go-to-next-picker-date')
        expect(wrapper.emitted()['go-to-month']).toBeDefined()
        wrapper.setProps({
          currentMonth: 11
        })
        geoCalendarNavigationWrapper.vm.$emit('go-to-next-picker-date')
        expect(wrapper.emitted()['go-to-year']).toBeDefined()
      })

      it('Cannot navigate any further', () => {
        const wrapper = getWrappedComponent()
        const today = new Date(2019, 6, 30) // Fixed date to avoid future errors with random dates
        const geoCalendarNavigationWrapper = wrapper.find(GeoCalendarNavigation)
        wrapper.setProps({
          earliestDate: startOfMonth(today),
          latestDate: endOfMonth(today),
          currentYear: getYear(today),
          currentMonth: getMonth(today)
        })
        geoCalendarNavigationWrapper.vm.$emit('go-to-previous-picker-date')
        expect(wrapper.emitted()['go-to-month']).toBeUndefined()
        geoCalendarNavigationWrapper.vm.$emit('go-to-next-picker-date')
        expect(wrapper.emitted()['go-to-month']).toBeUndefined()
      })
    })

    describe('MONTHS granularity', () => {
      const wrapper = getWrappedComponent()
      const today = new Date(2019, 6, 30) // Fixed date to avoid future errors with random dates
      const geoCalendarNavigationWrapper = wrapper.find(GeoCalendarNavigation)
      wrapper.setProps({
        granularityId: GRANULARITY_IDS.month,
        pickerDateUnit: PICKER_DATE_UNITS.month
      })
      it('Goes backwards', () => {
        geoCalendarNavigationWrapper.vm.$emit('go-to-previous-picker-date')
        expect(wrapper.emitted()['go-to-year']).toBeDefined()
      })

      it('Goes forward', () => {
        geoCalendarNavigationWrapper.vm.$emit('go-to-next-picker-date')
        expect(wrapper.emitted()['go-to-year']).toBeDefined()
      })

      it('Cannot navigate any further', () => {
        wrapper.setProps({
          earliestDate: startOfMonth(today),
          latestDate: endOfMonth(today),
          currentYear: getYear(today),
          currentMonth: getMonth(today)
        })
        geoCalendarNavigationWrapper.vm.$emit('go-to-previous-picker-date')
        expect(wrapper.emitted()['go-to-year'][0][2]).toBeUndefined()
        geoCalendarNavigationWrapper.vm.$emit('go-to-next-picker-date')
        expect(wrapper.emitted()['go-to-year'][0][2]).toBeUndefined()
      })
    })

    describe('YEARS granularity', () => {
      const wrapper = getWrappedComponent()
      const geoCalendarNavigationWrapper = wrapper.find(GeoCalendarNavigation)
      wrapper.setProps({
        granularityId: GRANULARITY_IDS.year,
        pickerDateUnit: PICKER_DATE_UNITS.year
      })
      it('Goes backwards', () => {
        geoCalendarNavigationWrapper.vm.$emit('go-to-previous-picker-date')
        expect(wrapper.emitted()['go-to-year-range']).toBeDefined()
      })

      it('Goes forward', () => {
        geoCalendarNavigationWrapper.vm.$emit('go-to-next-picker-date')
        expect(wrapper.emitted()['go-to-year-range']).toBeDefined()
      })

      it('Cannot navigate any further', () => {
        const today = new Date(2019, 6, 30) // Fixed date to avoid future errors with random dates
        wrapper.setProps({
          earliestDate: subDays(today, 5),
          latestDate: addDays(today, 5),
          currentYear: getYear(today),
          currentMonth: getMonth(today)
        })
        geoCalendarNavigationWrapper.vm.$emit('go-to-previous-picker-date')
        expect(wrapper.emitted()['go-to-year-range'][3]).toBeUndefined()
        geoCalendarNavigationWrapper.vm.$emit('go-to-next-picker-date')
        expect(wrapper.emitted()['go-to-year-range'][3]).toBeUndefined()

        wrapper.setProps({
          currentInitialYearInRange: 2040,
          currentEndYearInRange: 2000,
          latestDate: addYears(today, 15),
          earliestDate: today
        })
        geoCalendarNavigationWrapper.vm.$emit('go-to-previous-picker-date')
        expect(wrapper.emitted()['go-to-year-range'][3]).toBeUndefined()
        geoCalendarNavigationWrapper.vm.$emit('go-to-next-picker-date')
        expect(wrapper.emitted()['go-to-year-range'][3]).toBeUndefined()
      })
    })
    describe('Wrong pickerDateUnit', () => {
      it('Should throw error if provided wrong pickerDateUnit prop', () => {
        const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })
        const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => { })
        const today = new Date(2019, 6, 30) // Fixed date to avoid future errors with random dates
        const wrapper = getWrappedComponent()
        wrapper.setProps({
          pickerDateUnit: 'wrong picker date unit',
          earliestDate: startOfMonth(today),
          latestDate: endOfMonth(today)
        })
        expect(consoleWarnSpy).toHaveBeenCalled()
        expect(consoleErrorSpy).toHaveBeenCalled()
        expect(function () {
          return wrapper.vm.canSelectNextDates
        }).toThrowError()

        expect(function () {
          return wrapper.vm.canSelectPastDates
        }).toThrowError()

        consoleWarnSpy.mockRestore()
        consoleErrorSpy.mockRestore()
      })
    })
  })

  describe('Cannot navigate further if constraints are met', () => {
    const today = new Date(2019, 6, 30) // Fixed date to avoid future errors with random dates
    const wrapper = getWrappedComponent()
    wrapper.setProps({
      earliestDate: startOfMonth(today),
      latestDate: endOfMonth(today),
      currentYear: getYear(today),
      currentMonth: getMonth(today)
    })

    it('Should not navigate forwards or backwards', () => {
      wrapper.setProps({
        pickerDateUnit: PICKER_DATE_UNITS.day,
        granularityId: GRANULARITY_IDS.day
      })
      expect(wrapper.vm.canSelectNextDates).toBe(false)
      expect(wrapper.vm.canSelectPastDates).toBe(false)
      wrapper.setProps({
        pickerDateUnit: PICKER_DATE_UNITS.year,
        granularityId: GRANULARITY_IDS.year
      })
      expect(wrapper.vm.canSelectNextDates).toBe(false)
      expect(wrapper.vm.canSelectPastDates).toBe(false)
    })
  })
})

function getWrappedComponent () {
  const today = new Date(2019, 6, 30) // Fixed date to avoid future errors with random dates
  const currentMonth = getMonth(today)
  const currentYear = getYear(today)

  return mount(GeoCalendarPicker, {
    stubs: {
      GeoCalendarNavigation,
      GeoCalendarGrid,
      'geo-calendar-day-grid': true,
      'geo-calendar-month-grid': true,
      'geo-calendar-year-grid': true,
      'geo-list-item': true,
      'geo-select-base': true,
      'geo-link-button': true,
      'font-awesome-icon': true
    },
    propsData: {
      currentMonth,
      currentYear,
      granularityId: GRANULARITY_IDS.day,
      pickerDateUnit: PICKER_DATE_UNITS.day,
      calendarNavigationSelectIcon: ['fas', 'arrow-right'],
      currentInitialYearInRange: 2015,
      currentEndYearInRange: 2030,
      nextDateInSelectedGranularityIcon: ['fas', 'arrow-right'],
      previousDateInSelectedGranularityIcon: ['fas', 'arrow-right']
    }
  })
}
