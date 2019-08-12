import { mount } from '@vue/test-utils'
import { addDays, getDate, subMonths, subDays, isEqual } from 'date-fns'
import GeoCalendarDayGridDayUnit from '@/elements/GeoCalendar/GeoCalendarGrid/GeoCalendarDayGridDayUnit.vue'

describe('GeoCalendarDayGridDayUnit', () => {
  // When working with day units we need the actual tested day to be `today`
  // since some of the properties use date-fns functionalities than rely on the fact that it is, in fact, today
  const today = new Date()

  it('Should render', function () {
    const wrapper = mount(GeoCalendarDayGridDayUnit, {
      propsData: {
        currentDate: today,
        day: addDays(today, 5)
      }
    })
    expect(wrapper.find('.geo-calendar-grid__date-picker-unit').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar-date-picker-unit__placeholder').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar-date-picker-unit__placeholder').text()).toBe(`${wrapper.vm.dayNumber}`)
  })

  it('Should print the correct day number', () => {
    const wrapper = mount(GeoCalendarDayGridDayUnit, {
      propsData: {
        currentDate: today,
        day: addDays(today, 5)
      }
    })
    expect(wrapper.vm.dayNumber).toBe(getDate(addDays(today, 5)))
    expect(wrapper.find('.geo-calendar-date-picker-unit__placeholder').text()).toBe(`${wrapper.vm.dayNumber}`)
  })

  it('Emits event when clicking on one day', () => {
    const wrapper = mount(GeoCalendarDayGridDayUnit, {
      propsData: {
        currentDate: today,
        day: today
      }
    })
    wrapper.find('.geo-calendar-grid__date-picker-unit').trigger('click')
    expect(wrapper.emitted()['select-day-unit'][0][0]).toBe(today)
  })

  describe('Test computed properties', () => {
    const wrapper = mount(GeoCalendarDayGridDayUnit, {
      propsData: {
        currentDate: today,
        day: today
      }
    })

    it('isToday', () => {
      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--today').exists()).toBe(true)
      expect(wrapper.vm.isToday).toBe(true)

      wrapper.setProps({
        day: addDays(today, 1)
      })

      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--today').exists()).toBe(false)
      expect(wrapper.vm.isToday).toBe(false)
    })

    it('isDayOutOfBoundaries', () => {
      wrapper.setProps({
        day: subMonths(today, 1)
      })
      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--out-of-boundaries').exists()).toBe(true)
      expect(wrapper.vm.isDayOutOfBoundaries).toBe(true)

      wrapper.setProps({
        day: today
      })
      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--out-of-boundaries').exists()).toBe(false)
      expect(wrapper.vm.isDayOutOfBoundaries).toBe(false)
    })

    it('isDayUnavailable', () => {
      wrapper.setProps({
        earliestDate: subDays(today, 2),
        day: subDays(today, 3)
      })
      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--unavailable').exists()).toBe(true)
      expect(wrapper.vm.isDayUnavailable).toBe(true)

      wrapper.setProps({
        day: today
      })
      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--unavailable').exists()).toBe(false)
      expect(wrapper.vm.isDayUnavailable).toBe(false)
    })

    it('isSelectedDay', () => {
      wrapper.setProps({
        day: subDays(today, 4),
        selectedFromDay: subDays(today, 4)
      })
      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--selected').exists()).toBe(true)
      expect(wrapper.vm.isSelectedDay).toBe(true)

      wrapper.setProps({
        day: today,
        selectedToDay: today
      })
      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--selected').exists()).toBe(true)
      expect(wrapper.vm.isSelectedDay).toBe(true)

      wrapper.setProps({
        day: subDays(today, 1)
      })
      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--selected').exists()).toBe(false)
      expect(wrapper.vm.isSelectedDay).toBe(false)
    })

    it('selectedFromDay', () => {
      wrapper.setProps({
        day: today,
        selectedFromDay: today
      })
      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--from-date').exists()).toBe(true)
      expect(isEqual(wrapper.vm.day, wrapper.vm.selectedFromDay)).toBe(true)
    })

    it('selectedToDay', () => {
      wrapper.setProps({
        day: addDays(today, 4),
        selectedFromDay: null,
        selectedToDay: addDays(today, 4)
      })
      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--to-date').exists()).toBe(true)
      expect(isEqual(wrapper.vm.day, wrapper.vm.selectedToDay)).toBe(true)
    })

    it('isDayWithinRanges', () => {
      wrapper.setProps({
        day: today,
        selectedFromDay: subDays(today, 10),
        selectedToDay: addDays(today, 10)
      })
      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--within-range').exists()).toBe(true)
      expect(wrapper.vm.isDayWithinRanges).toBe(true)

      wrapper.setProps({
        selectedFromDay: addDays(today, 10),
        selectedToDay: addDays(today, 20)
      })
      expect(wrapper.find('.geo-calendar-grid__date-picker-unit--within-range').exists()).toBe(false)
      expect(wrapper.vm.isDayWithinRanges).toBe(false)
    })
  })
})
