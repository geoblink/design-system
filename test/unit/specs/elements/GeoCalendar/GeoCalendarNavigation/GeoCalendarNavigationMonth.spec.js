import { mount } from '@vue/test-utils'
import GeoCalendarNavigationMonth from '@/elements/GeoCalendar/GeoCalendarNavigation/GeoCalendarNavigationMonth.vue'
import GeoListItem from '@/elements/GeoList/GeoListItem'
import GeoLinkButton from '@/elements/GeoButton/GeoLinkButton'
import GeoButton from '@/elements/GeoButton/GeoButton'
import { YEAR_GRID_CONSTRAINTS } from '@/elements/GeoCalendar/Geocalendar.utils'
import { getYear, subYears, addYears } from 'date-fns'

describe('GeoCalendarNavigationMonth', () => {
  it('should render', function () {
    const wrapper = mount(GeoCalendarNavigationMonth, {
      stubs: [
        'font-awesome-icon',
        'geo-select-base',
        'geo-link-button',
        'geo-list-item'
      ],
      propsData: {
        calendarNavigationSelectIcon: ['fas', 'chevron-down'],
        currentMonth: 6,
        currentYear: 2019
      }
    })
    expect(wrapper.find('.geo-calendar-navigation__selects-container').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar-navigation--month').exists()).toBe(true)
  })

  describe('Earliest and latest dates constraints', () => {
    const wrapper = mount(GeoCalendarNavigationMonth, {
      stubs: [
        'font-awesome-icon',
        'geo-select-base',
        'geo-link-button',
        'geo-list-item'
      ],
      propsData: {
        calendarNavigationSelectIcon: ['fas', 'chevron-down'],
        currentMonth: 6,
        currentYear: 2019
      }
    })
    it(`Should set earliest and latest date as ${YEAR_GRID_CONSTRAINTS.MIN_YEAR} and ${YEAR_GRID_CONSTRAINTS.MAX_YEAR} if no constraints are set`, () => {
      expect(getYear(wrapper.vm.earliestYearInSelect)).toEqual(YEAR_GRID_CONSTRAINTS.MIN_YEAR)
      expect(getYear(wrapper.vm.latestYearInSelect)).toEqual(YEAR_GRID_CONSTRAINTS.MAX_YEAR)
      expect(wrapper.vm.numYearsWithData).toEqual((YEAR_GRID_CONSTRAINTS.MAX_YEAR - YEAR_GRID_CONSTRAINTS.MIN_YEAR) + 1)
    })

    it('Should set earliest and latest date as the provided props if these constraints are set', () => {
      setDateConstraints(wrapper)
      expect(getYear(wrapper.vm.earliestYearInSelect)).toEqual(2014)
      expect(getYear(wrapper.vm.latestYearInSelect)).toEqual(2024)
      expect(wrapper.vm.numYearsWithData).toEqual(11)
    })
  })

  describe('Year selection', () => {
    const wrapper = mount(GeoCalendarNavigationMonth, {
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
        currentYear: 2019
      }
    })

    it('Should toggle the dropdown when clicked', () => {
      wrapper.find('[data-ut="year-select"] .geo-button--calendar-navigation-toggle-button').trigger('click')
      expect(wrapper.vm.isYearSelectionOpened).toBe(true)
      wrapper.find('[data-ut="year-select"] .geo-button--calendar-navigation-toggle-button').trigger('click')
      expect(wrapper.vm.isYearSelectionOpened).toBe(false)
    })

    it('Should emit an event when clicking on one of the years', () => {
      wrapper.findAll('[data-ut="year-select"] .geo-list-item').at(5).trigger('click')
      expect(wrapper.emitted()['go-to-year'][0][0]).toEqual(1975)
    })

    describe('Year selection constraints', () => {
      it(`No constraints - Should have as many items as years between ${YEAR_GRID_CONSTRAINTS.MIN_YEAR} and ${YEAR_GRID_CONSTRAINTS.MAX_YEAR}`, () => {
        const yearSelectItemsLength = wrapper.findAll('[data-ut="year-select"] .geo-list-item').length
        expect(yearSelectItemsLength).toEqual((YEAR_GRID_CONSTRAINTS.MAX_YEAR - YEAR_GRID_CONSTRAINTS.MIN_YEAR) + 1)
        expect(wrapper.findAll('[data-ut="year-select"] .geo-list-item').at(0).text()).toEqual(`${YEAR_GRID_CONSTRAINTS.MIN_YEAR}`)
        expect(wrapper.findAll('[data-ut="year-select"] .geo-list-item').at(yearSelectItemsLength - 1).text()).toEqual(`${YEAR_GRID_CONSTRAINTS.MAX_YEAR}`)
      })

      it('Constraints - Should have as many items as years between earliestDate and latestDate', () => {
        setDateConstraints(wrapper)
        const yearSelectItemsLength = wrapper.findAll('[data-ut="year-select"] .geo-list-item').length
        expect(yearSelectItemsLength).toEqual(11)
        expect(wrapper.findAll('[data-ut="year-select"] .geo-list-item').at(0).text()).toEqual(`${getYear(wrapper.vm.earliestDate)}`)
        expect(wrapper.findAll('[data-ut="year-select"] .geo-list-item').at(yearSelectItemsLength - 1).text()).toEqual(`${getYear(wrapper.vm.latestDate)}`)
      })
    })
  })
})

function setDateConstraints (wrapper) {
  wrapper.setProps({
    earliestDate: subYears(new Date(), 5),
    latestDate: addYears(new Date(), 5)
  })
}
