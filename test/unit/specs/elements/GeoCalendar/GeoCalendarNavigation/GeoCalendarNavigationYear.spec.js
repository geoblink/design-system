import { mount } from '@vue/test-utils'
import GeoCalendarNavigationYear from '@/elements/GeoCalendar/GeoCalendarNavigation/GeoCalendarNavigationYear.vue'
import GeoListItem from '@/elements/GeoList/GeoListItem'
import GeoLinkButton from '@/elements/GeoButton/GeoLinkButton'
import GeoButton from '@/elements/GeoButton/GeoButton'
import GeoSelectBase from '@/elements/GeoSelect/GeoSelectBase.vue'
import GeoDropdown from '@/elements/GeoDropdown/GeoDropdown.vue'
import { YEAR_GRID_CONSTANTS } from '@/elements/GeoCalendar/GeoCalendar.utils.js'
import subYears from 'date-fns/subYears'
import addYears from 'date-fns/addYears'
import getYear from 'date-fns/getYear'

describe('GeoCalendarNavigationYear', () => {
  it('Should render', function () {
    const wrapper = getWrappedComponent()
    expect(wrapper.find('.geo-calendar-navigation__selects-container').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar-navigation--year').exists()).toBe(true)
  })

  describe('Year range selection', () => {
    xit('Should toggle the dropdown when clicked', async () => {
      const wrapper = getWrappedComponent()
      await wrapper.findComponent(GeoLinkButton).trigger('click')
      expect(wrapper.vm.isYearRangeSelectionOpened).toBe(true)
      await wrapper.findComponent(GeoLinkButton).trigger('click')
      expect(wrapper.vm.isYearRangeSelectionOpened).toBe(false)
      await wrapper.setProps({ isDisabled: true })
      await wrapper.findComponent(GeoLinkButton).trigger('click')
      expect(wrapper.vm.isYearRangeSelectionOpened).toBe(false)
    })

    xit('Should emit an event when clicking on one of the year ranges', async () => {
      const wrapper = getWrappedComponent()
      const yearRange = wrapper.findAll('[data-ut="year-range-select"] .geo-list-item')[5].text()
      await wrapper.findAll('[data-ut="year-range-select"] .geo-list-item')[5].trigger('click')
      expect(wrapper.emitted()['go-to-year-range'][1][0]).toEqual(
        [
          parseInt(yearRange.split('-')[0]),
          parseInt(yearRange.split('-')[1])
        ])
    })

    it('Should update the displayed range if the ranges change', async () => {
      const wrapper = getWrappedComponent()
      expect(wrapper.vm.displayedInitialYearInRange).toEqual(2018)
      expect(wrapper.vm.displayedEndYearInRange).toEqual(2033)
      await wrapper.setProps({
        currentInitialYearInRange: 1970,
        currentEndYearInRange: 1986
      })
      expect(wrapper.vm.displayedInitialYearInRange).toEqual(1970)
      expect(wrapper.vm.displayedEndYearInRange).toEqual(1986)
    })

    xdescribe('Year range selection constraints', () => {
      it(`No constraints - Should have as many ranges as there can be between ${YEAR_GRID_CONSTANTS.MIN_YEAR} and ${YEAR_GRID_CONSTANTS.MAX_YEAR}`, () => {
        const wrapper = getWrappedComponent()
        const yearSelectItemsLength = wrapper.findAll('[data-ut="year-range-select"] .geo-list-item').length
        expect(yearSelectItemsLength).toEqual(Math.ceil((YEAR_GRID_CONSTANTS.MAX_YEAR - YEAR_GRID_CONSTANTS.MIN_YEAR + 2) / YEAR_GRID_CONSTANTS.YEARS_IN_GRID))
        expect(wrapper.findAll('[data-ut="year-range-select"] .geo-list-item')[0].text()).toEqual(`${YEAR_GRID_CONSTANTS.MIN_YEAR} - ${(YEAR_GRID_CONSTANTS.MIN_YEAR - 1) + YEAR_GRID_CONSTANTS.YEARS_IN_GRID}`)
        expect(wrapper.findAll('[data-ut="year-range-select"] .geo-list-item')[yearSelectItemsLength - 1].text()).toEqual(`${YEAR_GRID_CONSTANTS.MAX_YEAR - 1} - ${YEAR_GRID_CONSTANTS.MAX_YEAR - 1}`)
      })

      it('Constraints - Should have as many ranges as there can be between earliestDate and latestDate', async () => {
        const wrapper = getWrappedComponent()
        await wrapper.setProps({
          earliestDate: subYears(new Date(), YEAR_GRID_CONSTANTS.YEARS_IN_GRID),
          latestDate: addYears(new Date(), YEAR_GRID_CONSTANTS.YEARS_IN_GRID)
        })
        const yearSelectItemsLength = wrapper.findAll('[data-ut="year-range-select"] .geo-list-item').length
        expect(yearSelectItemsLength).toEqual(Math.ceil(((getYear(wrapper.vm.latestDate) + YEAR_GRID_CONSTANTS.YEARS_IN_GRID) - (getYear(wrapper.vm.earliestDate) - YEAR_GRID_CONSTANTS.YEARS_IN_GRID)) / YEAR_GRID_CONSTANTS.YEARS_IN_GRID))
        expect(wrapper.findAll('[data-ut="year-range-select"] .geo-list-item')[0].text()).toEqual(`${getYear(wrapper.vm.earliestDate) - YEAR_GRID_CONSTANTS.YEARS_IN_GRID} - ${getYear(wrapper.vm.earliestDate) - 1}`)
        expect(wrapper.findAll('[data-ut="year-range-select"] .geo-list-item')[yearSelectItemsLength - 1].text()).toEqual(`${getYear(wrapper.vm.latestDate)} - ${getYear(wrapper.vm.latestDate) + 15}`)
      })
    })
  })
})

function getWrappedComponent () {
  return mount(GeoCalendarNavigationYear, {
    global: {
      components: {
        GeoSelectBase,
        GeoDropdown,
        GeoButton,
        GeoLinkButton,
        GeoListItem
      },
      stubs: {
        'font-awesome-icon': true,
        'geo-bordered-box': true,
        'geo-scrollable-container': true,
        'geo-activity-indicator': true
      }
    },
    props: {
      calendarNavigationSelectIcon: ['fas', 'chevron-down'],
      currentMonth: 6,
      currentYear: 2019,
      isDisabled: false,
      currentInitialYearInRange: 0,
      currentEndYearInRange: 0
    }
  })
}
