import { mount } from '@vue/test-utils'
import { PICKER_DATE_UNITS, GRANULARITY_IDS } from '@/elements/GeoCalendar/GeoCalendar.utils.js'
import GeoCalendarGrid from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarGrid.vue'
import GeoCalendarDayGrid from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarDayGrid.vue'
import GeoCalendarMonthGrid from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarMonthGrid.vue'
import GeoCalendarYearGrid from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarYearGrid.vue'
import GeoCalendarGridMixin from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarGrid.mixin'
import { getMonth, getYear, startOfWeek, startOfDay, endOfWeek, addDays } from 'date-fns'

describe('Mixins', () => {
  describe('GeoCalendarGrid.mixin', () => {
    it('Should export props object', () => {
      expect(GeoCalendarGridMixin).toHaveProperty('props')
    })

    it('Should have selectedFromDay and selectedToDay properties', () => {
      expect(GeoCalendarGridMixin.props).toHaveProperty('selectedFromDay')
      expect(GeoCalendarGridMixin.props).toHaveProperty('selectedToDay')
    })

    it('Should have correct validation params', () => {
      expect(GeoCalendarGridMixin.props.selectedFromDay).toHaveProperty('type')
      expect(GeoCalendarGridMixin.props.selectedFromDay.type).toBe(Date)
      expect(GeoCalendarGridMixin.props.selectedFromDay).toHaveProperty('required')
      expect(GeoCalendarGridMixin.props.selectedFromDay.required).toBe(false)

      expect(GeoCalendarGridMixin.props.selectedToDay).toHaveProperty('type')
      expect(GeoCalendarGridMixin.props.selectedToDay.type).toBe(Date)
      expect(GeoCalendarGridMixin.props.selectedToDay).toHaveProperty('required')
      expect(GeoCalendarGridMixin.props.selectedToDay.required).toBe(false)
    })
  })
})

describe('GeoCalendarGrid', () => {
  const today = new Date(2019, 6, 30) // Fixed date to avoid future errors with random dates
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

  describe('Highlight dates mouseover', function () {
    wrapper.setProps({
      pickerDateUnit: PICKER_DATE_UNITS.day
    })

    const geoCalendarDayGridWrapper = wrapper.find(GeoCalendarDayGrid)
    geoCalendarDayGridWrapper.vm.$emit('day-unit-mouseover', today)

    expect(wrapper.emitted()['day-unit-mouseover']).toBeDefined()
    expect(wrapper.emitted()['day-unit-mouseover'][0][0]).toBe(today)

    wrapper.setProps({
      pickerDateUnit: PICKER_DATE_UNITS.month
    })

    const geoCalendarMonthGridWrapper = wrapper.find(GeoCalendarMonthGrid)
    geoCalendarMonthGridWrapper.vm.$emit('month-unit-mouseover', 5)

    expect(wrapper.emitted()['month-unit-mouseover']).toBeDefined()
    expect(wrapper.emitted()['month-unit-mouseover'][0][0]).toBe(5)

    wrapper.setProps({
      pickerDateUnit: PICKER_DATE_UNITS.year
    })

    const geoCalendarYearGridWrapper = wrapper.find(GeoCalendarYearGrid)
    geoCalendarYearGridWrapper.vm.$emit('year-unit-mouseover', 2020)

    expect(wrapper.emitted()['year-unit-mouseover']).toBeDefined()
    expect(wrapper.emitted()['year-unit-mouseover'][0][0]).toBe(2020)
  })

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
      const today = new Date(2019, 6, 30) // Fixed date to avoid future errors with random dates

      it('Selects a day', () => {
        wrapper.setProps({
          pickerDateUnit: PICKER_DATE_UNITS.day,
          granularityId: GRANULARITY_IDS.day,
          selectedFromDay: today,
          selectedToDay: addDays(today, 10)
        })
        const geoCalendarDayGridWrapper = wrapper.find(GeoCalendarDayGrid)
        geoCalendarDayGridWrapper.vm.$emit('select-day', today)
        expect(wrapper.emitted()['select-day']).toBeDefined()
        expect(wrapper.emitted()['select-day'][0][0]).toBe(today)
      })

      it('Selects a week', () => {
        wrapper.setProps({
          pickerDateUnit: PICKER_DATE_UNITS.day,
          granularityId: GRANULARITY_IDS.week
        })
        const geoCalendarDayGridWrapper = wrapper.find(GeoCalendarDayGrid)
        const weekStart = startOfWeek(today, { weekStartsOn: 1 })
        const weekEnd = startOfDay(endOfWeek(today, { weekStartsOn: 1 }))

        geoCalendarDayGridWrapper.vm.$emit('select-week', {
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
        const geoCalendarMonthGridWrapper = wrapper.find(GeoCalendarMonthGrid)

        geoCalendarMonthGridWrapper.vm.$emit('select-month', 6)
        expect(wrapper.emitted()['select-month']).toBeDefined()
        expect(wrapper.emitted()['select-month'][0][0]).toBe(6)
      })

      it('Selects a quarter', () => {
        wrapper.setProps({
          pickerDateUnit: PICKER_DATE_UNITS.month,
          granularityId: GRANULARITY_IDS.quarter
        })
        const geoCalendarMonthGridWrapper = wrapper.find(GeoCalendarMonthGrid)

        geoCalendarMonthGridWrapper.vm.$emit('select-quarter', 6)
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
        const geoCalendarYearGridWrapper = wrapper.find(GeoCalendarYearGrid)

        geoCalendarYearGridWrapper.vm.$emit('select-year', 2021)
        expect(wrapper.emitted()['select-year']).toBeDefined()
        expect(wrapper.emitted()['select-year'][0][0]).toBe(2021)
      })
    })
  })
})
