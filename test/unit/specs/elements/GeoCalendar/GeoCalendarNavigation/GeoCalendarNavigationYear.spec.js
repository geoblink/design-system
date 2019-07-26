import { mount } from '@vue/test-utils'
import GeoCalendarNavigationYear from '@/elements/GeoCalendar/GeoCalendarNavigation/GeoCalendarNavigationYear.vue'
import GeoListItem from '@/elements/GeoList/GeoListItem'
import GeoLinkButton from '@/elements/GeoButton/GeoLinkButton'
import GeoButton from '@/elements/GeoButton/GeoButton'
import { YEAR_GRID_CONSTRAINTS } from '@/elements/GeoCalendar/Geocalendar.utils'
import { subYears, addYears, getYear } from 'date-fns'

describe('GeoCalendarNavigationYear', () => {
  it('should render', function () {
    const wrapper = mount(GeoCalendarNavigationYear, {
      stubs: [
        'font-awesome-icon',
        'geo-select-base',
        'geo-link-button',
        'geo-list-item'
      ],
      propsData: {
        isDisabled: false,
        calendarNavigationSelectIcon: ['fas', 'chevron-down'],
        currentMonth: 6,
        currentYear: 2019
      }
    })
    expect(wrapper.find('.geo-calendar-navigation__selects-container').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar-navigation--year').exists()).toBe(true)
  })

  describe('Year range selection', () => {
    const wrapper = mount(GeoCalendarNavigationYear, {
      stubs: {
        'font-awesome-icon': true,
        'geo-select-base': true,
        GeoButton,
        GeoLinkButton,
        GeoListItem,
        'geo-dropdown': true,
        'geo-bordered-box': true,
        'geo-scrollable-container': true
      },
      propsData: {
        calendarNavigationSelectIcon: ['fas', 'chevron-down'],
        currentMonth: 6,
        currentYear: 2019,
        isDisabled: false,
        currentInitialYearRange: 2018,
        currentEndYearInRange: 2033
      }
    })

    it('Should toggle the dropdown when clicked', () => {
      wrapper.find('[data-ut="year-range-select"] .geo-button--calendar-navigation-toggle-button').trigger('click')
      expect(wrapper.vm.isYearRangeSelectionOpened).toBe(true)
      wrapper.find('[data-ut="year-range-select"] .geo-button--calendar-navigation-toggle-button').trigger('click')
      expect(wrapper.vm.isYearRangeSelectionOpened).toBe(false)
      wrapper.setProps({ isDisabled: true })
      wrapper.find('[data-ut="year-range-select"] .geo-button--calendar-navigation-toggle-button').trigger('click')
      expect(wrapper.vm.isYearRangeSelectionOpened).toBe(false)
    })

    it('Should emit an event when clicking on one of the year ranges', () => {
      const yearRange = wrapper.findAll('[data-ut="year-range-select"] .geo-list-item').at(5).text()
      wrapper.findAll('[data-ut="year-range-select"] .geo-list-item').at(5).trigger('click')
      expect(wrapper.emitted()['go-to-year-range'][1][0]).toEqual(
        [
          parseInt(yearRange.split('-')[0]),
          parseInt(yearRange.split('-')[1])
        ])
    })

    it('Should update the displayed range if the ranges change', () => {
      expect(wrapper.vm.displayedInitialYearInRange).toEqual(2018)
      expect(wrapper.vm.displayedEndYearInRange).toEqual(2033)
      wrapper.setProps({
        currentInitialYearInRange: 1970,
        currentEndYearInRange: 1986
      })
      expect(wrapper.vm.displayedInitialYearInRange).toEqual(1970)
      expect(wrapper.vm.displayedEndYearInRange).toEqual(1986)
    })

    describe('Year range selection constraints', () => {
      it(`No constraints - Should have as many ranges as there can be between ${YEAR_GRID_CONSTRAINTS.MIN_YEAR} and ${YEAR_GRID_CONSTRAINTS.MAX_YEAR}`, () => {
        const yearSelectItemsLength = wrapper.findAll('[data-ut="year-range-select"] .geo-list-item').length
        expect(yearSelectItemsLength).toEqual(Math.ceil((YEAR_GRID_CONSTRAINTS.MAX_YEAR - YEAR_GRID_CONSTRAINTS.MIN_YEAR + 2) / YEAR_GRID_CONSTRAINTS.YEARS_IN_GRID))
        expect(wrapper.findAll('[data-ut="year-range-select"] .geo-list-item').at(0).text()).toEqual(`${YEAR_GRID_CONSTRAINTS.MIN_YEAR} - ${(YEAR_GRID_CONSTRAINTS.MIN_YEAR - 1) + 16}`)
        expect(wrapper.findAll('[data-ut="year-range-select"] .geo-list-item').at(yearSelectItemsLength - 1).text()).toEqual(`${YEAR_GRID_CONSTRAINTS.MAX_YEAR - 1} - ${YEAR_GRID_CONSTRAINTS.MAX_YEAR - 1}`)
      })

      it('Constraints - Should have as many ranges as there can be between earliestDate and latestDate', () => {
        wrapper.setProps({
          earliestDate: subYears(new Date(), 16),
          latestDate: addYears(new Date(), 16)
        })
        const yearSelectItemsLength = wrapper.findAll('[data-ut="year-range-select"] .geo-list-item').length
        expect(yearSelectItemsLength).toEqual(Math.ceil(((getYear(wrapper.vm.latestDate) + 16) - (getYear(wrapper.vm.earliestDate) - 16)) / 16))
        expect(wrapper.findAll('[data-ut="year-range-select"] .geo-list-item').at(0).text()).toEqual(`${getYear(wrapper.vm.earliestDate) - 16} - ${getYear(wrapper.vm.earliestDate) - 1}`)
        expect(wrapper.findAll('[data-ut="year-range-select"] .geo-list-item').at(yearSelectItemsLength - 1).text()).toEqual(`${getYear(wrapper.vm.latestDate)} - ${getYear(wrapper.vm.latestDate) + 15}`)
      })
    })
  })
})
