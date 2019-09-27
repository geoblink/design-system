import { mount } from '@vue/test-utils'
import { GRANULARITY_IDS } from '@/elements/GeoCalendar/GeoCalendar.utils.js'
import GeoCalendarMonthGridQuarterUnit from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarMonthGridQuarterUnit.vue'
import GeoCalendarMonthGridMonthUnit from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarMonthGridMonthUnit.vue'
import { addMonths, subMonths } from 'date-fns'

const today = new Date(2019, 6, 30) // Fixed date to avoid future errors with random dates

describe('GeoCalendarMonthGridQuarterUnit', () => {
  it('Should render', function () {
    const wrapper = getWrappedComponent(GRANULARITY_IDS.month)
    expect(wrapper.find('.geo-calendar-grid__quarter-unit').exists()).toBe(true)
  })

  describe('Month granularity', () => {
    const wrapper = getWrappedComponent(GRANULARITY_IDS.month)
    const childMonth = wrapper.find(GeoCalendarMonthGridMonthUnit)
    it('Does not emit any event if the received month has no data', () => {
      wrapper.setProps({
        earliestDate: addMonths(today, 1)
      })
      childMonth.vm.$emit('select-month-unit', 6)
      expect(wrapper.emitted('select-month')).toBeUndefined()
    })

    it('Emits event when the received month has data', () => {
      wrapper.setProps({
        earliestDate: subMonths(today, 1)
      })
      childMonth.vm.$emit('select-month-unit', 6)
      expect(wrapper.emitted('select-month')).toBeDefined()
      expect(wrapper.emitted('select-month')[0][0]).toBe(6)
    })

    it('Emits mouseover event if received from child component', () => {
      const wrapper = getWrappedComponent(GRANULARITY_IDS.month)
      const geoCalendarMonthGridMonthUnitWrapper = wrapper.find(GeoCalendarMonthGridMonthUnit)

      geoCalendarMonthGridMonthUnitWrapper.vm.$emit('month-unit-mouseover', 6)
      expect(wrapper.emitted()['month-unit-mouseover']).toBeDefined()
      expect(wrapper.emitted()['month-unit-mouseover'][0][0]).toBe(6)
    })
  })

  describe('Quarter granularity', () => {
    const wrapper = getWrappedComponent(GRANULARITY_IDS.quarter)
    const childMonth = wrapper.find(GeoCalendarMonthGridMonthUnit)

    it('Adds proper classes', () => {
      expect(wrapper.find('.geo-calendar-grid__quarter-unit--actionable').exists()).toBe(true)
      expect(wrapper.vm.canQuarterBeHighlighted).toBe(true)
    })

    it('isSomeMonthInQuarterUnavailable', () => {
      wrapper.setProps({
        earliestDate: subMonths(today, 5),
        latestDate: subMonths(today, 4)
      })
      expect(wrapper.find('.geo-calendar-grid__quarter-unit--unavailable').exists()).toBe(true)
      expect(wrapper.vm.isSomeMonthInQuarterUnavailable).toBe(true)
    })

    it('Does not emit any event if the received month has no data', () => {
      childMonth.vm.$emit('select-month-unit', 6)
      expect(wrapper.emitted()['select-quarter']).toBeUndefined()
    })

    it('Emits event when the received month has data', () => {
      wrapper.setProps({
        earliestDate: subMonths(today, 2),
        latestDate: addMonths(today, 3)
      })
      childMonth.vm.$emit('select-month-unit', 6)
      expect(wrapper.emitted()['select-quarter']).toBeDefined()
      expect(wrapper.emitted()['select-quarter'][0][0]).toBe(6)
    })
  })
})

function getWrappedComponent (granularityId) {
  return mount(GeoCalendarMonthGridQuarterUnit, {
    stubs: {
      GeoCalendarMonthGridMonthUnit
    },
    propsData: {
      quarter: [
        { index: 6, name: 'July' },
        { index: 7, name: 'August' },
        { index: 8, name: 'September' }
      ],
      currentMonth: 6,
      currentYear: 2019,
      granularityId
    }
  })
}
