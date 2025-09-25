import { mount } from '@vue/test-utils'
import GeoCalendarNavigationDay from '@/elements/GeoCalendar/GeoCalendarNavigation/GeoCalendarNavigationDay.vue'
import GeoListItem from '@/elements/GeoList/GeoListItem'
import GeoButton from '@/elements/GeoButton/GeoButton.vue'
import GeoLinkButton from '@/elements/GeoButton/GeoLinkButton'
import GeoSelectBase from '@/elements/GeoSelect/GeoSelectBase.vue'
import GeoDropdown from '@/elements/GeoDropdown/GeoDropdown.vue'
import GeoScrollableContainer from '@/elements/GeoScrollableContainer/GeoScrollableContainer.vue'
import GeoBorderedBox from '@/elements/GeoBorderedBox/GeoBorderedBox.vue'
import { YEAR_GRID_CONSTANTS } from '@/elements/GeoCalendar/GeoCalendar.utils.js'
import getYear from 'date-fns/getYear'
import subYears from 'date-fns/subYears'
import addYears from 'date-fns/addYears'
import { FontAwesomeIconMock } from 'test/unit/utils/FontAwesomeIconMock'

const today = new Date(2019, 6, 30) // Fixed date to avoid future errors with random dates

describe('GeoCalendarNavigationDay', () => {
  it('Should render', function () {
    const wrapper = mount(GeoCalendarNavigationDay, {
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock,
          'geo-select-base': GeoSelectBase,
          'geo-dropdown': GeoDropdown,
          'geo-link-button': GeoLinkButton,
          'geo-list-item': GeoListItem,
          'geo-button': GeoButton,
          'geo-bordered-box': GeoBorderedBox,
          'geo-scrollable-container': GeoScrollableContainer,
          'geo-activity-indicator': true
        }
      },
      props: {
        calendarNavigationSelectIcon: ['fas', 'chevron-down'],
        currentMonth: 6,
        currentYear: 2019
      }
    })
    expect(wrapper.find('.geo-calendar-navigation__selects-container').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar-navigation--day').exists()).toBe(true)
  })

  describe('Earliest and latest dates constraints', () => {
    const wrapper = mount(GeoCalendarNavigationDay, {
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock,
          'geo-select-base': GeoSelectBase,
          'geo-dropdown': GeoDropdown,
          'geo-link-button': GeoLinkButton,
          'geo-list-item': GeoListItem,
          'geo-button': GeoButton,
          'geo-bordered-box': GeoBorderedBox,
          'geo-scrollable-container': GeoScrollableContainer,
          'geo-activity-indicator': true,
          teleport: true
        }
      },
      props: {
        calendarNavigationSelectIcon: ['fas', 'chevron-down'],
        currentMonth: 6,
        currentYear: 2019
      }
    })
    it(`Should set earliest and latest date as ${YEAR_GRID_CONSTANTS.MIN_YEAR} and ${YEAR_GRID_CONSTANTS.MAX_YEAR} if no constraints are set`, () => {
      expect(getYear(wrapper.vm.earliestYearInSelect)).toEqual(YEAR_GRID_CONSTANTS.MIN_YEAR)
      expect(getYear(wrapper.vm.latestYearInSelect)).toEqual(YEAR_GRID_CONSTANTS.MAX_YEAR)
      expect(wrapper.vm.numYearsWithData).toEqual((YEAR_GRID_CONSTANTS.MAX_YEAR - YEAR_GRID_CONSTANTS.MIN_YEAR) + 1)
    })

    it('Should set earliest and latest date as the provided props if these constraints are set', async () => {
      await setDateConstraints(wrapper)
      expect(getYear(wrapper.vm.earliestYearInSelect)).toEqual(2014)
      expect(getYear(wrapper.vm.latestYearInSelect)).toEqual(2024)
      expect(wrapper.vm.numYearsWithData).toEqual(11)
    })
  })

  describe('Month selection', () => {
    const wrapper = mount(GeoCalendarNavigationDay, {
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock,
          'geo-select-base': GeoSelectBase,
          'geo-dropdown': GeoDropdown,
          'geo-link-button': GeoLinkButton,
          'geo-list-item': GeoListItem,
          'geo-button': GeoButton,
          'geo-bordered-box': GeoBorderedBox,
          'geo-scrollable-container': GeoScrollableContainer,
          'geo-activity-indicator': true,
          'geo-tooltip': true,
          'geo-list-footer-button': true,
          teleport: true
        }
      },
      props: {
        calendarNavigationSelectIcon: ['fas', 'chevron-down'],
        currentMonth: 6,
        currentYear: 2019
      },
      data: () => ({
        isMonthSelectionOpened: true
      })
    })

    // TODO: WEB-2073 fix, click native event triggers toggle twice for some reason
    xit('Should toggle the dropdown when clicked', async () => {
      await wrapper.find('[data-ut="month-select"] .geo-button').trigger('click')
      expect(wrapper.vm.isMonthSelectionOpened).toBe(false)
      await wrapper.find('[data-ut="month-select"] .geo-button').trigger('click')
      expect(wrapper.vm.isMonthSelectionOpened).toBe(true)
    })

    it('Should have a fixed list of months', async () => {
      expect(wrapper.vm.currentSelectedMonth).toEqual('July')
      expect(wrapper.findAll('[data-ut="month-select"] .geo-list-item').length).toEqual(12)
    })

    it('Should emit an event when clicking on one of the months', async () => {
      await wrapper.findAll('[data-ut="month-select"] .geo-list-item').at(10).trigger('click')
      expect(wrapper.emitted()['go-to-month'][0][0]).toEqual(10)
    })
  })

  describe('Year selection', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(GeoCalendarNavigationDay, {
        global: {
          stubs: {
            'font-awesome-icon': FontAwesomeIconMock,
            'geo-select-base': GeoSelectBase,
            'geo-dropdown': GeoDropdown,
            'geo-link-button': GeoLinkButton,
            'geo-list-item': GeoListItem,
            'geo-button': GeoButton,
            'geo-bordered-box': GeoBorderedBox,
            'geo-scrollable-container': GeoScrollableContainer,
            'geo-activity-indicator': true,
            'geo-tooltip': true,
            'geo-list-footer-button': true,
            teleport: true
          }
        },
        props: {
          calendarNavigationSelectIcon: ['fas', 'chevron-down'],
          currentMonth: 6,
          currentYear: 2019
        },
        data: () => ({
          isYearSelectionOpened: true
        })
      })
    })

    afterEach(() => {
      wrapper.unmount()
    })

    // TODO: WEB-2073 fix, click native event triggers toggle twice for some reason
    xit('Should toggle the dropdown when clicked', async () => {
      await wrapper.find('[data-ut="year-select"] .geo-button').trigger('click')
      expect(wrapper.vm.isYearSelectionOpened).toBe(false)
      await wrapper.find('[data-ut="year-select"] .geo-button').trigger('click')
      expect(wrapper.vm.isYearSelectionOpened).toBe(true)
    })

    it('Should emit an event when clicking on one of the years', async () => {
      await wrapper.findAll('[data-ut="year-select"] .geo-list-item').at(5).trigger('click')
      expect(wrapper.emitted()['go-to-year'][0][0]).toEqual(1975)
    })

    describe('Year selection constraints', () => {
      it(`No constraints - Should have as many items as years between ${YEAR_GRID_CONSTANTS.MIN_YEAR} and ${YEAR_GRID_CONSTANTS.MAX_YEAR}`, () => {
        const yearSelectItemsLength = wrapper.findAll('[data-ut="year-select"] .geo-list-item').length
        expect(yearSelectItemsLength).toEqual((YEAR_GRID_CONSTANTS.MAX_YEAR - YEAR_GRID_CONSTANTS.MIN_YEAR) + 1)
        expect(wrapper.findAll('[data-ut="year-select"] .geo-list-item').at(0).text()).toEqual(`${YEAR_GRID_CONSTANTS.MIN_YEAR}`)
        expect(wrapper.findAll('[data-ut="year-select"] .geo-list-item').at(yearSelectItemsLength - 1).text()).toEqual(`${YEAR_GRID_CONSTANTS.MAX_YEAR}`)
      })

      it('Constraints - Should have as many items as years between earliestDate and latestDate', async () => {
        await setDateConstraints(wrapper)
        const yearSelectItemsLength = wrapper.findAll('[data-ut="year-select"] .geo-list-item').length
        expect(yearSelectItemsLength).toEqual(11)
        expect(wrapper.findAll('[data-ut="year-select"] .geo-list-item').at(0).text()).toEqual(`${getYear(wrapper.vm.earliestDate)}`)
        expect(wrapper.findAll('[data-ut="year-select"] .geo-list-item').at(yearSelectItemsLength - 1).text()).toEqual(`${getYear(wrapper.vm.latestDate)}`)
      })
    })
  })
})

async function setDateConstraints (wrapper) {
  await wrapper.setProps({
    earliestDate: subYears(today, 5),
    latestDate: addYears(today, 5)
  })
}
