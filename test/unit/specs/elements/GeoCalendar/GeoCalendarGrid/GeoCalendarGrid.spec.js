import { mount } from '@vue/test-utils'
import { PICKER_DATE_UNITS, GRANULARITY_IDS } from '@/elements/GeoCalendar/GeoCalendar.utils'
import GeoCalendarGrid from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarGrid.vue'
import GeoCalendarDayGrid from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarDayGrid.vue'
import GeoCalendarMonthGrid from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarMonthGrid.vue'
import GeoCalendarYearGrid from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarYearGrid.vue'
import { getMonth, getYear, startOfWeek, startOfDay, endOfWeek } from 'date-fns'

describe('GeoCalendarGrid', () => {
  const today = new Date()
  const currentMonth = getMonth(today)
  const currentYear = getYear(today)

  const wrapper = mount(GeoCalendarGrid, {
    stubs: {
      GeoCalendarDayGrid,
      GeoCalendarMonthGrid,
      GeoCalendarYearGrid,
      GeoCalendarDayGridWeekUnit: true,
      GeoCalendarDayGridDayUnit: true,
      GeoCalendarMonthGridQuarterUnit: true,
      GeoCalendarMonthGridMonthUnit: true
    },
    propsData: {
      currentInitialYearInRange: 2015,
      currentEndYearInRange: 2030,
      currentMonth,
      currentYear,
      pickerDateUnit: PICKER_DATE_UNITS.day,
      granularityId: GRANULARITY_IDS.day
    }
  })

  for (const pickerDateUnit in PICKER_DATE_UNITS) {
    describe('Correct component rendering', () => {
      it(`Should render proper ${pickerDateUnit} grid`, function () {
        wrapper.setProps({
          pickerDateUnit
        })
        expect(wrapper.find('.geo-calendar-grid').exists()).toBe(true)
        expect(wrapper.find(`.geo-calendar-grid__${pickerDateUnit}-container`).exists()).toBe(true)
      })
    })
  }

  describe('Select granularity events', () => {
    const wrapper = mount(GeoCalendarGrid, {
      stubs: {
        GeoCalendarDayGrid,
        GeoCalendarMonthGrid,
        GeoCalendarYearGrid,
        GeoCalendarDayGridWeekUnit: true,
        GeoCalendarDayGridDayUnit: true,
        GeoCalendarMonthGridQuarterUnit: true,
        GeoCalendarMonthGridMonthUnit: true
      },
      propsData: {
        currentInitialYearInRange: 2015,
        currentEndYearInRange: 2030,
        currentMonth,
        currentYear,
        pickerDateUnit: PICKER_DATE_UNITS.day,
        granularityId: GRANULARITY_IDS.day
      }
    })

    describe('DAY datePickerUnit', () => {
      const today = new Date()

      it('Selects a day', () => {
        wrapper.setProps({
          pickerDateUnit: PICKER_DATE_UNITS.day,
          granularityId: GRANULARITY_IDS.day
        })
        const geoCalendarDayGrid = wrapper.find(GeoCalendarDayGrid)
        geoCalendarDayGrid.vm.$emit('select-day', today)
        expect(wrapper.emitted()['select-day']).toBeDefined()
        expect(wrapper.emitted()['select-day'][0][0]).toBe(today)
      })

      it('Selects a week', () => {
        wrapper.setProps({
          pickerDateUnit: PICKER_DATE_UNITS.day,
          granularityId: GRANULARITY_IDS.week
        })
        const geoCalendarDayGrid = wrapper.find(GeoCalendarDayGrid)
        const weekStart = startOfWeek(today, { weekStartsOn: 1 })
        const weekEnd = startOfDay(endOfWeek(today, { weekStartsOn: 1 }))

        geoCalendarDayGrid.vm.$emit('select-week', {
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

    describe('MONTH datePickerUnit', () => {
      it('Selects a month', () => {
        wrapper.setProps({
          pickerDateUnit: PICKER_DATE_UNITS.month,
          granularityId: GRANULARITY_IDS.month
        })
        const geoCalendarMonthGrid = wrapper.find(GeoCalendarMonthGrid)

        geoCalendarMonthGrid.vm.$emit('select-month', 6)
        expect(wrapper.emitted()['select-month']).toBeDefined()
        expect(wrapper.emitted()['select-month'][0][0]).toBe(6)
      })

      it('Selects a quarter', () => {
        wrapper.setProps({
          pickerDateUnit: PICKER_DATE_UNITS.month,
          granularityId: GRANULARITY_IDS.quarter
        })
        const geoCalendarMonthGrid = wrapper.find(GeoCalendarMonthGrid)

        geoCalendarMonthGrid.vm.$emit('select-quarter', 6)
        expect(wrapper.emitted()['select-quarter']).toBeDefined()
        expect(wrapper.emitted()['select-quarter'][0][0]).toBe(6)
      })
    })

    describe('YEAR datePickerUnit', () => {
      it('Selects a year', () => {
        wrapper.setProps({
          pickerDateUnit: PICKER_DATE_UNITS.year,
          granularityId: GRANULARITY_IDS.year
        })
        const geoCalendarYearGrid = wrapper.find(GeoCalendarYearGrid)

        geoCalendarYearGrid.vm.$emit('select-year', 2021)
        expect(wrapper.emitted()['select-year']).toBeDefined()
        expect(wrapper.emitted()['select-year'][0][0]).toBe(2021)
      })
    })
  })
})
