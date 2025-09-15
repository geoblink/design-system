import { mount } from '@vue/test-utils'
import GeoCalendarNavigationMonth from '@/elements/GeoCalendar/GeoCalendarNavigation/GeoCalendarNavigationMonth.vue'
import GeoListItem from '@/elements/GeoList/GeoListItem'
import GeoLinkButton from '@/elements/GeoButton/GeoLinkButton'
import GeoButton from '@/elements/GeoButton/GeoButton'
import GeoDropdown from '@/elements/GeoDropdown/GeoDropdown.vue'
import GeoSelectBase from '@/elements/GeoSelect/GeoSelectBase.vue'
import GeoScrollableContainer from '@/elements/GeoScrollableContainer/GeoScrollableContainer.vue'
import GeoBorderedBox from '@/elements/GeoBorderedBox/GeoBorderedBox.vue'
import { YEAR_GRID_CONSTANTS } from '@/elements/GeoCalendar/GeoCalendar.utils.js'
import { getYear, subYears, addYears } from 'date-fns'

const today = new Date(2019, 6, 30) // Fixed date to avoid future errors with random dates

describe('GeoCalendarNavigationMonth', () => {
  it('Should render', function () {
    const wrapper = mount(GeoCalendarNavigationMonth, {
      global: {
        stubs: [
          'font-awesome-icon',
          'geo-select-base',
          'geo-link-button',
          'geo-list-item'
        ]
      },
      props: {
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
      global: {
        stubs: [
          'font-awesome-icon',
          'geo-select-base',
          'geo-link-button',
          'geo-list-item'
        ]
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

  describe('Year selection', () => {
    function getWrapper () {
      return mount(GeoCalendarNavigationMonth, {
        global: {
          components: {
            GeoDropdown,
            GeoSelectBase,
            GeoButton,
            GeoLinkButton,
            GeoListItem
          },
          stubs: {
            GeoBorderedBox,
            GeoScrollableContainer,
            'font-awesome-icon': true,
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
        }
      })
    }

    xit('Should toggle the dropdown when clicked', async () => {
      const wrapper = getWrapper()
      await wrapper.find('[data-ut="year-select"] .geo-button').trigger('click')
      expect(wrapper.vm.isYearSelectionOpened).toBe(true)
      await wrapper.find('[data-ut="year-select"] .geo-button').trigger('click')
      expect(wrapper.vm.isYearSelectionOpened).toBe(false)
    })

    it('Should emit an event when clicking on one of the years', async () => {
      const wrapper = getWrapper()
      await wrapper.setData({
        isYearSelectionOpened: true
      })
      await wrapper.findAll('[data-ut="year-select"] .geo-list-item')[5].trigger('click')
      expect(wrapper.emitted()['go-to-year'][0][0]).toEqual(1975)
    })

    describe('Year selection constraints', () => {
      it(`No constraints - Should have as many items as years between ${YEAR_GRID_CONSTANTS.MIN_YEAR} and ${YEAR_GRID_CONSTANTS.MAX_YEAR}`, async () => {
        const wrapper = getWrapper()
        await wrapper.setData({
          isYearSelectionOpened: true
        })
        const yearSelectItemsLength = wrapper.findAll('[data-ut="year-select"] .geo-list-item').length
        expect(yearSelectItemsLength).toEqual((YEAR_GRID_CONSTANTS.MAX_YEAR - YEAR_GRID_CONSTANTS.MIN_YEAR) + 1)
        expect(wrapper.findAll('[data-ut="year-select"] .geo-list-item').at(0).text()).toEqual(`${YEAR_GRID_CONSTANTS.MIN_YEAR}`)
        expect(wrapper.findAll('[data-ut="year-select"] .geo-list-item').at(yearSelectItemsLength - 1).text()).toEqual(`${YEAR_GRID_CONSTANTS.MAX_YEAR}`)
      })

      it('Constraints - Should have as many items as years between earliestDate and latestDate', async () => {
        const wrapper = getWrapper()
        await wrapper.setData({
          isYearSelectionOpened: true
        })
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
