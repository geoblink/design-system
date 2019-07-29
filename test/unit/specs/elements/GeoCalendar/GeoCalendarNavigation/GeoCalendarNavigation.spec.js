import { mount } from '@vue/test-utils'
import { PICKER_DATE_UNITS } from '@/elements/GeoCalendar/GeoCalendar.utils'
import GeoCalendarNavigation from '@/elements/GeoCalendar/GeoCalendarNavigation/GeoCalendarNavigation.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

describe('GeoCalendarNavigation', () => {
  const wrapper = mount(GeoCalendarNavigation, {
    stubs: {
      FontAwesomeIcon,
      'geo-calendar-navigation-day': true,
      'geo-select-base': true,
      'geo-link-button': true,
      'geo-list-item': true
    },
    propsData: {
      calendarNavigationSelectIcon: ['fas', 'chevron-down'],
      nextDateInSelectedGranularityIcon: ['fas', 'chevron-right'],
      previousDateInSelectedGranularityIcon: ['fas', 'chevron-left'],
      currentMonth: 6,
      currentYear: 2019,
      pickerDateUnit: PICKER_DATE_UNITS.day,
      currentInitialYearInRange: 2018,
      currentEndYearInRange: 2033
    }
  })

  it('Should render', function () {
    expect(wrapper.find('.geo-calendar-navigation').exists()).toBe(true)
  })

  it('Should not emit events if the arrows are disabled', () => {
    wrapper.setProps({
      isPreviousPickerDateSelectorDisabled: true,
      isNextPickerDateSelectorDisabled: true
    })
    wrapper.find('.geo-calendar-navigation__nav-icon--previous').trigger('click')
    expect(wrapper.emitted()['go-to-previous-picker-date']).toBeFalsy()
    wrapper.find('.geo-calendar-navigation__nav-icon--next').trigger('click')
    expect(wrapper.emitted()['go-to-next-picker-date']).toBeFalsy()
  })

  it('Should emit events when navigating backwards/forwards', () => {
    wrapper.setProps({
      isPreviousPickerDateSelectorDisabled: false,
      isNextPickerDateSelectorDisabled: false
    })
    wrapper.find('.geo-calendar-navigation__nav-icon--previous').trigger('click')
    expect(wrapper.emitted()['go-to-previous-picker-date']).toBeDefined()
    wrapper.find('.geo-calendar-navigation__nav-icon--next').trigger('click')
    expect(wrapper.emitted()['go-to-next-picker-date']).toBeDefined()
  })

  it('GeoCalendarNavigation events emission', () => {
    wrapper.vm.$refs.calendarNavigation.$emit('go-to-month', 6)
    expect(wrapper.emitted()['go-to-month']).toBeDefined()
    expect(wrapper.emitted()['go-to-month'][0][0]).toEqual(6)

    wrapper.vm.$refs.calendarNavigation.$emit('go-to-year', 2014)
    expect(wrapper.emitted()['go-to-year']).toBeDefined()
    expect(wrapper.emitted()['go-to-year'][0][0]).toEqual(2014)

    wrapper.setProps({
      pickerDateUnit: PICKER_DATE_UNITS.year
    })

    wrapper.vm.$refs.calendarNavigation.$emit('go-to-year-range', [1970, 1986])
    expect(wrapper.emitted()['go-to-year-range']).toBeDefined()
    expect(wrapper.emitted()['go-to-year-range'][0][0]).toEqual([2018, 2033])
    expect(wrapper.emitted()['go-to-year-range'][1][0]).toEqual([1970, 1986])
  })
})
