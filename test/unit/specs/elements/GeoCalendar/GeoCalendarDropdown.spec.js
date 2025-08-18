import _ from 'lodash'
import { mount } from '@vue/test-utils'
import { PICKER_DATE_UNITS, GRANULARITY_IDS } from '@/elements/GeoCalendar/GeoCalendar.utils.js'
import GeoCalendarDropdown from '@/elements/GeoCalendar/GeoCalendarDropdown.vue'
import GeoBorderedBox from '@/elements/GeoBorderedBox/GeoBorderedBox.vue'
import GeoBorderedBoxFooter from '@/elements/GeoBorderedBox/GeoBorderedBoxFooter.vue'
import GeoCalendar from '@/elements/GeoCalendar/GeoCalendar.vue'
import GeoDropdown from '@/elements/GeoDropdown/GeoDropdown.vue'
import GeoPrimaryButton from '@/elements/GeoButton/GeoPrimaryButton.vue'
import GeoButton from '@/elements/GeoButton/GeoButton.vue'
import GeoScrollableContainer from '@/elements/GeoScrollableContainer/GeoScrollableContainer.vue'

describe('GeoCalendarDropdown', () => {
  const today = new Date(2019, 6, 30) // Fixed date to avoid future errors with random dates

  it('Should render', async () => {
    const wrapper = getWrappedComponent()
    expect(wrapper.vm.isCalendarPopupOpened).toBe(false)
    await wrapper.find('.calendar-toggle').trigger('click')
    expect(wrapper.vm.isCalendarPopupOpened).toBe(true)
    expect(wrapper.findComponent(GeoCalendar).exists()).toBe(true)
  })

  it('Should render with granularity picker', async () => {
    const wrapper = getWrappedComponent({
      slots: {
        pickerGranularity: '<div class="picker-granularity">Picker granularity selectors</div>'
      }
    })
    expect(wrapper.vm.isCalendarPopupOpened).toBe(false)
    await wrapper.find('.calendar-toggle').trigger('click')
    expect(wrapper.vm.isCalendarPopupOpened).toBe(true)
    const geoCalendarWrapper = wrapper.findComponent(GeoCalendar)
    expect(geoCalendarWrapper.exists()).toBe(true)
    expect(geoCalendarWrapper.find('.picker-granularity').exists()).toBe(true)
  })

  it('Should render with predefined aliases', async () => {
    const wrapper = getWrappedComponent({
      slots: {
        pickerAliases: '<template>Picker predefined aliases</template>'
      }
    })
    expect(wrapper.vm.isCalendarPopupOpened).toBe(false)
    await wrapper.find('.calendar-toggle').trigger('click')
    expect(wrapper.vm.isCalendarPopupOpened).toBe(true)
    expect(wrapper.findComponent(GeoCalendar).exists()).toBe(true)
    expect(wrapper.find('.geo-calendar__sidebar-container').exists()).toBe(true)
  })

  it('Should render with popup class', async () => {
    const wrapper = getWrappedComponent()
    await wrapper.setProps({
      popupClass: 'test-calendar-popup-class'
    })
    await wrapper.find('.calendar-toggle').trigger('click')
    expect(wrapper.find('.test-calendar-popup-class').exists()).toBe(true)
    const geoCalendarWrapper = wrapper.findComponent(GeoCalendar)
    expect(geoCalendarWrapper.exists()).toBe(true)
  })

  describe('Calendar events', () => {
    it('Emits event when receiving from date', async () => {
      const wrapper = getWrappedComponent()
      expect(wrapper.vm.isCalendarPopupOpened).toBe(false)
      await wrapper.find('.calendar-toggle').trigger('click')
      expect(wrapper.vm.isCalendarPopupOpened).toBe(true)
      const geoCalendarEl = document.body.querySelector('.geo-calendar')
      expect(geoCalendarEl).toBeDefined()
      const geoCalendarWrapper = wrapper.findComponent(GeoCalendar)
      geoCalendarWrapper.vm.$emit('emit-from-date', {
        fromDate: today
      })

      expect(wrapper.emitted()['emit-from-date']).toBeDefined()
      expect(wrapper.emitted()['emit-from-date'][0][0]).toEqual({
        fromDate: today
      })
    })

    it('Emits event when receiving to date', async () => {
      const wrapper = getWrappedComponent()
      await wrapper.find('.calendar-toggle').trigger('click')
      const geoCalendarWrapper = wrapper.findComponent(GeoCalendar)
      geoCalendarWrapper.vm.$emit('emit-to-date', {
        toDate: today
      })

      expect(wrapper.emitted()['emit-to-date']).toBeDefined()
      expect(wrapper.emitted()['emit-to-date'][0][0]).toEqual({
        toDate: today
      })
    })

    it('Emits when applying dates', async () => {
      const wrapper = getWrappedComponent()
      await wrapper.find('.calendar-toggle').trigger('click')
      const geoCalendarWrapper = wrapper.findComponent(GeoCalendar)

      geoCalendarWrapper.vm.$emit('emit-from-date', {
        fromDate: today
      })
      geoCalendarWrapper.vm.$emit('emit-to-date', {
        toDate: today
      })

      await wrapper.find('.calendar-apply-ranges').trigger('click')
      expect(wrapper.emitted()['apply-range-selection']).toBeDefined()
      expect(document.body.querySelector('.geo-calendar')).toBeNull()
    })
  })
})

function getWrappedComponent (options = {}) {
  return mount(GeoCalendarDropdown, _.merge({
    global: {
      components: {
        GeoCalendar,
        GeoBorderedBox,
        GeoBorderedBoxFooter,
        GeoButton,
        GeoDropdown,
        GeoPrimaryButton,
        GeoScrollableContainer
      },
      stubs: {
        'geo-activity-indicator': true,
        'geo-link-button': true,
        'geo-bordered-box-header': true,
        'geo-input': true,
        'font-awesome-icon': true,
        'geo-calendar-picker': true,
        'geo-dropdown-regular-button': true,
        'geo-input-message': true,
        'geo-list-footer-button': true,
        teleport: true
      }
    },
    slots: {
      popupContent: GeoCalendar,
      toggleButton: `<template #toggleButton="{ toggleCalendarPopup }">
                      <geo-dropdown-regular-button
                        class="calendar-toggle"
                        :icon="['fas', 'calendar']"
                        @click="toggleCalendarPopup"
                      >
                        Calendar:
                      </geo-dropdown-regular-button>
                    </template>`,
      calendarFooter: `<template #calendarFooter="{ applyRangeSelection }">
                        <geo-primary-button
                          class="calendar-apply-ranges"
                          @click="applyRangeSelection"
                        >
                          Apply Dates
                        </geo-primary-button>
                      </template>`
    },
    props: {
      pickerDateUnit: PICKER_DATE_UNITS.day,
      granularityId: GRANULARITY_IDS.day,
      locale: {}
    }
  }, options))
}
