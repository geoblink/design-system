import { mount } from '@vue/test-utils'
import GeoCalendarYearGrid from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarYearGrid.vue'
import GeoCalendarYearGridYearUnit from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarYearGridYearUnit.vue'
import getMonth from 'date-fns/getMonth'
import getYear from 'date-fns/getYear'

describe('GeoCalendarYearGrid', () => {
  const today = new Date(2019, 6, 30) // Fixed date to avoid future errors with random dates
  const currentMonth = getMonth(today)
  const currentYear = getYear(today)

  const wrapper = mount(GeoCalendarYearGrid, {
    stubs: {
      GeoCalendarYearGridYearUnit
    },
    propsData: {
      currentInitialYearInRange: 2015,
      currentEndYearInRange: 2030,
      currentMonth,
      currentYear
    }
  })

  it('Should render', function () {
    expect(wrapper.find('.geo-calendar-grid').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar-grid__year-container').exists()).toBe(true)
  })

  it('Should emit event when receiving a year', () => {
    const childYear = wrapper.find(GeoCalendarYearGridYearUnit)
    childYear.vm.$emit('select-year-unit', 2020)
    expect(wrapper.emitted()['select-year']).toBeDefined()
    expect(wrapper.emitted()['select-year'][0][0]).toBe(2020)
  })

  it('Should emit hovering event when received from child component', () => {
    const childYear = wrapper.find(GeoCalendarYearGridYearUnit)
    childYear.vm.$emit('year-unit-mouseover', 2020)
    expect(wrapper.emitted()['year-unit-mouseover']).toBeDefined()
    expect(wrapper.emitted()['year-unit-mouseover'][0][0]).toBe(2020)
  })
})
