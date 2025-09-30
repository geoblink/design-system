import { mount } from '@vue/test-utils'
import { PICKER_DATE_UNITS } from '@/elements/GeoCalendar/GeoCalendar.utils.js'
import GeoCalendarNavigation from '@/elements/GeoCalendar/GeoCalendarNavigation/GeoCalendarNavigation.vue'
import { FontAwesomeIconMock } from 'test/unit/utils/FontAwesomeIconMock'

describe('GeoCalendarNavigation', () => {
  const wrapper = mount(GeoCalendarNavigation, {
    global: {
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock,
        'geo-calendar-navigation-day': true,
        'geo-select-base': true,
        'geo-link-button': true,
        'geo-list-item': true
      }
    },
    props: {
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

  it('Should not emit events if the arrows are disabled', async () => {
    await wrapper.setProps({
      isPreviousPickerDateSelectorDisabled: true,
      isNextPickerDateSelectorDisabled: true
    })
    await wrapper.find('.geo-calendar-navigation__nav-icon--previous').trigger('click')
    expect(wrapper.emitted()['go-to-previous-picker-date']).toBeFalsy()
    await wrapper.find('.geo-calendar-navigation__nav-icon--next').trigger('click')
    expect(wrapper.emitted()['go-to-next-picker-date']).toBeFalsy()
  })

  it('Should emit events when navigating backwards/forwards', async () => {
    await wrapper.setProps({
      isPreviousPickerDateSelectorDisabled: false,
      isNextPickerDateSelectorDisabled: false
    })
    await wrapper.find('.geo-calendar-navigation__nav-icon--previous').trigger('click')
    expect(wrapper.emitted()['go-to-previous-picker-date']).toBeDefined()
    await wrapper.find('.geo-calendar-navigation__nav-icon--next').trigger('click')
    expect(wrapper.emitted()['go-to-next-picker-date']).toBeDefined()
  })

  it('GeoCalendarNavigation events emission', async () => {
    wrapper.vm.$refs.calendarNavigation.$emit('go-to-month', 6)
    expect(wrapper.emitted()['go-to-month']).toBeDefined()
    expect(wrapper.emitted()['go-to-month'][0][0]).toEqual(6)

    wrapper.vm.$refs.calendarNavigation.$emit('go-to-year', 2014)
    expect(wrapper.emitted()['go-to-year']).toBeDefined()
    expect(wrapper.emitted()['go-to-year'][0][0]).toEqual(2014)

    await wrapper.setProps({
      pickerDateUnit: PICKER_DATE_UNITS.year
    })

    wrapper.vm.$refs.calendarNavigation.$emit('go-to-year-range', [1970, 1986])
    expect(wrapper.emitted()['go-to-year-range']).toBeDefined()
    expect(wrapper.emitted()['go-to-year-range'][0][0]).toEqual([2018, 2033])
    expect(wrapper.emitted()['go-to-year-range'][1][0]).toEqual([1970, 1986])
  })
})
