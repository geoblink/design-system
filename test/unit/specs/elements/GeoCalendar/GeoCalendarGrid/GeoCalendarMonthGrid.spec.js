import { mount } from '@vue/test-utils'
import GeoCalendarMonthGrid from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarMonthGrid.vue'
import GeoCalendarMonthGridQuarterUnit from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarMonthGridQuarterUnit.vue'
import { GRANULARITY_IDS } from '@/elements/GeoCalendar/GeoCalendar.utils.js'

describe('GeoCalendarMonthGrid', () => {
  const wrapper = mount(GeoCalendarMonthGrid, {
    stubs: {
      GeoCalendarMonthGridQuarterUnit,
      GeoCalendarMonthGridMonthUnit: true
    },
    propsData: {
      currentMonth: 6,
      currentYear: 2019,
      granularityId: GRANULARITY_IDS.month
    }
  })

  it('Should render', function () {
    expect(wrapper.find('.geo-calendar-grid').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar-grid__month-container').exists()).toBe(true)
  })

  describe('Events (month/quarter/mouseover)', () => {
    const childMonth = wrapper.find(GeoCalendarMonthGridQuarterUnit)
    it('Emits select-month event when clicking on a month', () => {
      childMonth.vm.$emit('select-month', 8)
      expect(wrapper.emitted()['select-month']).toBeDefined()
      expect(wrapper.emitted()['select-month'][0][0]).toBe(8)
    })

    it('Emits select-quarter event when clicking on a month in quarter granularity', () => {
      childMonth.vm.$emit('select-quarter', 8)
      expect(wrapper.emitted()['select-quarter']).toBeDefined()
      expect(wrapper.emitted()['select-quarter'][0][0]).toBe(8)
    })

    it('Emits mouseover event if received from child component', () => {
      childMonth.vm.$emit('month-unit-mouseover', 6)
      expect(wrapper.emitted()['month-unit-mouseover']).toBeDefined()
      expect(wrapper.emitted()['month-unit-mouseover'][0][0]).toBe(6)
    })
  })
})
