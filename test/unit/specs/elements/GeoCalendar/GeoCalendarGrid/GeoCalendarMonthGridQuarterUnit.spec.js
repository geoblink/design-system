import { mount } from '@vue/test-utils'
import { GRANULARITY_IDS } from '@/elements/GeoCalendar/GeoCalendar.utils'
import GeoCalendarMonthGridQuarterUnit from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarMonthGridQuarterUnit.vue'
import GeoCalendarMonthGridMonthUnit from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarMonthGridMonthUnit.vue'
import { addMonths, subMonths } from 'date-fns'

describe('GeoCalendarMonthGridQuarterUnit', () => {
  it('should render', function () {
    const wrapper = getWrappedComponent(GRANULARITY_IDS.month)
    expect(wrapper.find('.geo-calendar-months-container__quarter').exists()).toBe(true)
  })

  describe('Month granularity', () => {
    const wrapper = getWrappedComponent(GRANULARITY_IDS.month)
    const childMonth = wrapper.find(GeoCalendarMonthGridMonthUnit)
    it('Does not emit any event if the received month has no data', () => {
      wrapper.setProps({
        earliestDate: addMonths(new Date(), 1)
      })
      childMonth.vm.$emit('select-month-unit', 6)
      expect(wrapper.emitted('select-month')).toBeUndefined()
    })

    it('Emits event when the received month has data', () => {
      wrapper.setProps({
        earliestDate: subMonths(new Date(), 1)
      })
      childMonth.vm.$emit('select-month-unit', 6)
      expect(wrapper.emitted('select-month')).toBeDefined()
      expect(wrapper.emitted('select-month')[0][0]).toBe(6)
    })
  })

  describe('Quarter granularity', () => {
    const wrapper = getWrappedComponent(GRANULARITY_IDS.quarter)
    const childMonth = wrapper.find(GeoCalendarMonthGridMonthUnit)

    it('Adds proper classes', () => {
      expect(wrapper.find('.geo-calendar-months-container__quarter--actionable').exists()).toBe(true)
      expect(wrapper.vm.canQuarterBeHighlighted).toBe(true)
    })

    it('Quarter without data', () => {
      wrapper.setProps({
        earliestDate: subMonths(new Date(), 5),
        latestDate: subMonths(new Date(), 4)
      })
      expect(wrapper.find('.geo-calendar-months-container__quarter--no-data').exists()).toBe(true)
      expect(wrapper.vm.isSomeMonthInQuarterWithoutData).toBe(true)
    })

    it('Does not emit any event if the received month has no data', () => {
      childMonth.vm.$emit('select-month-unit', 6)
      expect(wrapper.emitted()['select-quarter']).toBeUndefined()
    })

    it('Emits event when the received month has data', () => {
      wrapper.setProps({
        earliestDate: subMonths(new Date(), 2),
        latestDate: addMonths(new Date(), 3)
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
        { index: 6, month: 'July' },
        { index: 7, month: 'August' },
        { index: 8, month: 'September' }
      ],
      currentMonth: 6,
      currentYear: 2019,
      granularityId
    }
  })
}
