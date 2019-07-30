import { mount, shallowMount } from '@vue/test-utils'
import { PICKER_DATE_UNITS, GRANULARITY_IDS } from '@/elements/GeoCalendar/GeoCalendar.utils'
import GeoCalendar from '@/elements/GeoCalendar/GeoCalendar.vue'
import GeoInput from '@/elements/GeoInput/GeoInput.vue'
import GeoLinkButton from '@/elements/GeoButton/GeoLinkButton.vue'
import GeoButton from '@/elements/GeoButton/GeoButton.vue'
import GeoCalendarPicker from '@/elements/GeoCalendar/GeoCalendarPicker.vue'
import { addDays, startOfQuarter, endOfQuarter, startOfWeek, endOfWeek, subYears, addYears, subMonths, endOfMonth, endOfYear } from 'date-fns'

const today = new Date(2019, 6, 30) // Fixed date to avoid future errors with random dates

describe('GeoCalendar', () => {
  it('Should render', () => {
    const wrapper = getWrappedComponent()
    expect(wrapper.find('.geo-calendar').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar__granularity-selectors').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar__picker-controls').exists()).toBe(true)
    expect(wrapper.vm.$refs.calendarPicker).toBeDefined()
  })

  it('Should render with cssModifier', () => {
    const wrapper = getWrappedComponent()
    wrapper.setProps({
      cssModifier: 'test-calendar'
    })
    expect(wrapper.find('.geo-calendar--test-calendar').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar__granularity-selectors').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar__picker-controls').exists()).toBe(true)
    expect(wrapper.vm.$refs.calendarPicker).toBeDefined()
  })

  describe('Calendar events', () => {
    it('goToMonth', () => {
      const wrapper = getWrappedComponent()
      const calendarPicker = wrapper.vm.$refs.calendarPicker
      calendarPicker.$emit('go-to-month', 8)
      expect(wrapper.vm.currentMonth).toBe(8)
    })

    it('goToYear', () => {
      const wrapper = getWrappedComponent()
      const calendarPicker = wrapper.vm.$refs.calendarPicker
      calendarPicker.$emit('go-to-year', 2021)
      expect(wrapper.vm.currentYear).toBe(2021)
    })

    it('goToYearRange', () => {
      const wrapper = getWrappedComponent()
      const calendarPicker = wrapper.vm.$refs.calendarPicker
      calendarPicker.$emit('go-to-year-range', [2015, 2030])
      expect(wrapper.vm.currentInitialYearInRange).toBe(2015)
      expect(wrapper.vm.currentEndYearInRange).toBe(2030)
    })

    it('selectDay', () => {
      const wrapper = getWrappedComponent()
      const calendarPicker = wrapper.vm.$refs.calendarPicker
      const selectedDay = addDays(today, 4)
      calendarPicker.$emit('select-day', selectedDay)
      expect(wrapper.vm.fromRawDate).toBe(selectedDay)
      expect(wrapper.vm.fromFormattedDate).toBe('03/08/2019')
      expect(wrapper.emitted()['set-from-date']).toBeDefined()
      expect(wrapper.emitted()['set-from-date'][0][0]).toEqual({ fromDate: selectedDay })
    })

    describe('selectMonth', () => {
      it('Sets first day of month in from input', () => {
        const wrapper = getWrappedComponent()
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        calendarPicker.$emit('select-month', 8)
        expect(wrapper.vm.currentMonth).toBe(8)
        const currentDate = new Date(wrapper.vm.currentYear, wrapper.vm.currentMonth)
        expect(wrapper.vm.fromRawDate).toEqual(currentDate)
        expect(wrapper.vm.fromFormattedDate).toBe('01/09/2019')
        expect(wrapper.emitted()['set-from-date']).toBeDefined()
        expect(wrapper.emitted()['set-from-date'][0][0]).toEqual({ fromDate: currentDate })
      })

      it('Sets last day of month in to input', () => {
        const wrapper = getWrappedComponent()
        wrapper.setData({
          fromRawDate: today
        })
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        calendarPicker.$emit('select-month', 8)
        expect(wrapper.vm.currentMonth).toBe(8)
        const currentDate = endOfMonth(new Date(wrapper.vm.currentYear, wrapper.vm.currentMonth))
        expect(wrapper.vm.toRawDate).toEqual(currentDate)
        expect(wrapper.vm.toFormattedDate).toBe('30/09/2019')
        expect(wrapper.emitted()['set-to-date']).toBeDefined()
        expect(wrapper.emitted()['set-to-date'][0][0]).toEqual({ toDate: currentDate })
      })
    })

    it('selectQuarter', () => {
      const wrapper = getWrappedComponent()
      const calendarPicker = wrapper.vm.$refs.calendarPicker
      calendarPicker.$emit('select-quarter', 3)
      const fromDate = startOfQuarter(new Date(wrapper.vm.currentYear, 3))
      const toDate = endOfQuarter(new Date(wrapper.vm.currentYear, 3))
      expect(wrapper.vm.fromRawDate).toEqual(fromDate)
      expect(wrapper.vm.toRawDate).toEqual(toDate)
      expect(wrapper.vm.fromFormattedDate).toBe('01/04/2019')
      expect(wrapper.vm.toFormattedDate).toBe('30/06/2019')
      expect(wrapper.emitted()['set-from-date']).toBeDefined()
      expect(wrapper.emitted()['set-to-date']).toBeDefined()
      expect(wrapper.emitted()['set-from-date'][0][0]).toEqual({ fromDate })
      expect(wrapper.emitted()['set-to-date'][0][0]).toEqual({ toDate })
    })

    it('selectWeek', () => {
      const wrapper = getWrappedComponent()
      const calendarPicker = wrapper.vm.$refs.calendarPicker
      const weekStart = startOfWeek(today)
      const weekEnd = endOfWeek(today)
      calendarPicker.$emit('select-week', {
        fromDate: weekStart,
        toDate: weekEnd
      })
      expect(wrapper.vm.fromRawDate).toBe(weekStart)
      expect(wrapper.vm.toRawDate).toBe(weekEnd)
      expect(wrapper.vm.fromFormattedDate).toBe('28/07/2019')
      expect(wrapper.vm.toFormattedDate).toBe('03/08/2019')
      expect(wrapper.emitted()['set-from-date']).toBeDefined()
      expect(wrapper.emitted()['set-to-date']).toBeDefined()
      expect(wrapper.emitted()['set-from-date'][0][0]).toEqual({ fromDate: weekStart })
      expect(wrapper.emitted()['set-to-date'][0][0]).toEqual({ toDate: weekEnd })
    })

    describe('selectYear', () => {
      it('Sets first day of year in from input', () => {
        const wrapper = getWrappedComponent()
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        calendarPicker.$emit('select-year', 2020)
        expect(wrapper.vm.currentYear).toBe(2020)
        const startOfYear = new Date(2020, 0)
        expect(wrapper.vm.fromRawDate).toEqual(startOfYear)
        expect(wrapper.vm.fromFormattedDate).toBe('01/01/2020')
        expect(wrapper.emitted()['set-from-date']).toBeDefined()
        expect(wrapper.emitted()['set-from-date'][0][0]).toEqual({ fromDate: startOfYear })
      })

      it('Sets last day of year in to input', () => {
        const wrapper = getWrappedComponent()
        wrapper.setData({
          fromRawDate: today
        })
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        calendarPicker.$emit('select-year', 2020)
        expect(wrapper.vm.currentYear).toBe(2020)
        const currentDate = endOfYear(new Date(wrapper.vm.currentYear, wrapper.vm.currentMonth))
        expect(wrapper.vm.toRawDate).toEqual(currentDate)
        expect(wrapper.vm.toFormattedDate).toBe('31/12/2020')
        expect(wrapper.emitted()['set-to-date']).toBeDefined()
        expect(wrapper.emitted()['set-to-date'][0][0]).toEqual({ toDate: currentDate })
      })
    })
  })

  describe('Date inputs', () => {
    describe('From date input', () => {
      it('Sets input', () => {
        const wrapper = getWrappedComponent()

        const geoFromInput = wrapper.findAll(GeoInput).at(0)
        geoFromInput.vm.$emit('click')
        wrapper.setData({
          fromFormattedDate: '30/07/2019'
        })

        expect(wrapper.vm.isFromDateInputFocused).toBe(true)
        expect(wrapper.vm.fromRawDate).toEqual(today)
        expect(wrapper.emitted()['set-from-date']).toBeDefined()
        expect(wrapper.emitted()['set-from-date'][0][0]).toEqual({ fromDate: today })

        wrapper.vm.unfocusFromDateInput()
        expect(wrapper.vm.isFromDateInputFocused).toBe(false)
      })

      it('Sets wrong date', () => {
        const wrapper = getWrappedComponent()
        const geoFromInput = wrapper.findAll(GeoInput).at(0)
        geoFromInput.vm.$emit('click')
        wrapper.setData({
          fromFormattedDate: 'rrr'
        })
        expect(wrapper.vm.isFromDateInputFocused).toBe(true)
        expect(wrapper.vm.fromRawDate).toBe(null)
        expect(wrapper.vm.showFromFormatError).toBe(true)
        expect(wrapper.emitted()['set-from-date']).toBeDefined()
        expect(wrapper.emitted()['set-from-date'][0][0]).toEqual({ fromDate: null })

        wrapper.setData({
          fromFormattedDate: ''
        })

        expect(wrapper.vm.showFromFormatError).toBe(false)
        expect(wrapper.vm.fromRawDate).toBe(null)
        expect(wrapper.emitted()['set-from-date']).toBeDefined()
        expect(wrapper.emitted()['set-from-date'][1][0]).toEqual({ fromDate: null })
      })
    })

    describe('To date input', () => {
      it('Sets input', () => {
        const wrapper = getWrappedComponent()
        const geoFromInput = wrapper.findAll(GeoInput).at(1)
        geoFromInput.vm.$emit('click')
        wrapper.setData({
          toFormattedDate: '30/07/2019'
        })
        expect(wrapper.vm.isToDateInputFocused).toBe(true)
        expect(wrapper.vm.toRawDate).toEqual(today)
        expect(wrapper.emitted()['set-to-date']).toBeDefined()
        expect(wrapper.emitted()['set-to-date'][0][0]).toEqual({ toDate: today })

        wrapper.vm.unfocusToDateInput()
        expect(wrapper.vm.isToDateInputFocused).toBe(false)
      })

      it('Sets wrong date', () => {
        const wrapper = getWrappedComponent()
        const geoFromInput = wrapper.findAll(GeoInput).at(1)
        geoFromInput.vm.$emit('click')
        wrapper.setData({
          toFormattedDate: 'rrr'
        })
        expect(wrapper.vm.isToDateInputFocused).toBe(true)
        expect(wrapper.vm.toRawDate).toBe(null)
        expect(wrapper.vm.showToFormatError).toBe(true)
        expect(wrapper.emitted()['set-to-date']).toBeDefined()
        expect(wrapper.emitted()['set-to-date'][0][0]).toEqual({ toDate: null })

        wrapper.setData({
          toFormattedDate: ''
        })

        expect(wrapper.vm.showToFormatError).toBe(false)
        expect(wrapper.vm.toRawDate).toBe(null)
        expect(wrapper.emitted()['set-to-date']).toBeDefined()
        expect(wrapper.emitted()['set-to-date'][1][0]).toEqual({ toDate: null })
      })
    })

    describe('Select From and To input consecutively', () => {
      it('Should fill both inputs automatically', () => {
        const wrapper = getWrappedComponent()
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        const initialDate = today
        const endDate = addDays(today, 4)
        calendarPicker.$emit('select-day', initialDate)
        calendarPicker.$emit('select-day', endDate)
        expect(wrapper.vm.fromRawDate).toBe(initialDate)
        expect(wrapper.vm.toRawDate).toBe(endDate)
        expect(wrapper.vm.fromFormattedDate).toBe('30/07/2019')
        expect(wrapper.vm.toFormattedDate).toBe('03/08/2019')
        expect(wrapper.emitted()['set-from-date']).toBeDefined()
        expect(wrapper.emitted()['set-to-date']).toBeDefined()
        expect(wrapper.emitted()['set-from-date'][0][0]).toEqual({ fromDate: initialDate })
        expect(wrapper.emitted()['set-to-date'][0][0]).toEqual({ toDate: endDate })
      })
    })
  })

  describe('Date constraints shortchuts', () => {
    describe('Calendar with no date constraints', () => {
      it('Should not render the buttons', () => {
        const wrapper = getWrappedComponent()
        expect(wrapper.find('.geo-button--link--calendar-picker-button').exists()).toBe(false)
      })
    })

    describe('Calendar with date constraits', () => {
      it('Should render the buttons', () => {
        const wrapper = getWrappedComponent()
        wrapper.setProps({
          earliestDate: subYears(today, 1),
          earliestDatePlaceholder: 'Earliest date',
          latestDate: addYears(today, 1),
          latestDatePlaceholder: 'Latest date'
        })
        expect(wrapper.find('.geo-button--link--calendar-picker-button').exists()).toBe(true)
        expect(wrapper.findAll('.geo-button--link--calendar-picker-button').at(0).text()).toBe('Earliest date')
        expect(wrapper.findAll('.geo-button--link--calendar-picker-button').at(1).text()).toBe('Latest date')
      })

      it('Pressing the buttons should set the according dates', () => {
        const wrapper = getWrappedComponent()
        const earliestDate = subYears(today, 1)
        const latestDate = addYears(today, 1)
        wrapper.setProps({
          earliestDate: earliestDate,
          earliestDatePlaceholder: 'Earliest date',
          latestDate: latestDate,
          latestDatePlaceholder: 'Latest date'
        })
        wrapper.findAll(GeoLinkButton).at(0).vm.$emit('click')
        expect(wrapper.vm.fromRawDate).toEqual(earliestDate)
        expect(wrapper.vm.fromFormattedDate).toEqual('30/07/2018')
        expect(wrapper.emitted()['set-from-date']).toBeDefined()
        expect(wrapper.emitted()['set-from-date'][0][0]).toEqual({ fromDate: earliestDate })

        wrapper.findAll(GeoLinkButton).at(1).vm.$emit('click')
        expect(wrapper.vm.toRawDate).toEqual(latestDate)
        expect(wrapper.vm.toFormattedDate).toEqual('30/07/2020')
        expect(wrapper.emitted()['set-to-date']).toBeDefined()
        expect(wrapper.emitted()['set-to-date'][0][0]).toEqual({ toDate: latestDate })
      })
    })
  })

  describe('Initial Date', () => {
    it('Should set currentMonth and currentYear according to initialDateInGridProp ', () => {
      const wrapper = shallowMount(GeoCalendar, {
        stubs: [
          'geo-input',
          'font-awesome-icon',
          'geo-calendar-picker'
        ],
        propsData: {
          calendarNavigationSelectIcon: ['fas', 'arrow-left'],
          nextDateInSelectedGranularityIcon: ['fas', 'arrow-left'],
          previousDateInSelectedGranularityIcon: ['fas', 'arrow-left'],
          pickerDateUnit: PICKER_DATE_UNITS.day,
          granularityId: GRANULARITY_IDS.day,
          locale: {},
          initialDateInGrid: subYears(subMonths(today, 3), 5)
        }
      })

      expect(wrapper.vm.currentMonth).toBe(3)
      expect(wrapper.vm.currentYear).toBe(2014)
    })
  })

  describe('Watchers', () => {
    it('Should set to null both dates if changing granularity', () => {
      const wrapper = getWrappedComponent()
      wrapper.setData({
        fromRawDate: today,
        toRawDate: addDays(today, 4)
      })

      expect(wrapper.vm.fromRawDate).toBe(today)
      expect(wrapper.vm.toRawDate).toEqual(addDays(today, 4))

      wrapper.setProps({
        granularityId: GRANULARITY_IDS.month
      })

      expect(wrapper.vm.fromRawDate).toBe(null)
      expect(wrapper.vm.toRawDate).toBe(null)
    })
  })
})

function getWrappedComponent () {
  return mount(GeoCalendar, {
    stubs: {
      GeoInput,
      GeoCalendarPicker,
      GeoLinkButton,
      GeoButton,
      'font-awesome-icon': true,
      'geo-calendar-navigation': true,
      'geo-calendar-grid': true,
      'geo-dropdown': true
    },
    data () {
      return {
        fromRawDate: null,
        toRawDate: null,
        isFromDateInputFocused: false,
        isToDateInputFocused: false,
        currentMonth: null,
        currentYear: null,
        showFromFormatError: false,
        showToFormatError: false,
        currentInitialYearInRange: 0,
        currentEndYearInRange: 0
      }
    },
    propsData: {
      calendarNavigationSelectIcon: ['fas', 'arrow-left'],
      nextDateInSelectedGranularityIcon: ['fas', 'arrow-left'],
      previousDateInSelectedGranularityIcon: ['fas', 'arrow-left'],
      pickerDateUnit: PICKER_DATE_UNITS.day,
      granularityId: GRANULARITY_IDS.day,
      locale: {}
    }
  })
}
