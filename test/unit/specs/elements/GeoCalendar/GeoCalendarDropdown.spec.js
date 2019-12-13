import { mount } from '@vue/test-utils'
import { PICKER_DATE_UNITS, GRANULARITY_IDS } from '@/elements/GeoCalendar/GeoCalendar.utils.js'
import GeoCalendarDropdown from '@/elements/GeoCalendar/GeoCalendarDropdown.vue'
import GeoBorderedBox from '@/elements/GeoBorderedBox/GeoBorderedBox.vue'
import GeoCalendar from '@/elements/GeoCalendar/GeoCalendar.vue'
import GeoDropdown from '@/elements/GeoDropdown/GeoDropdown.vue'
import GeoPrimaryButton from '@/elements/GeoButton/GeoPrimaryButton.vue'
import GeoButton from '@/elements/GeoButton/GeoButton.vue'

describe('GeoCalendarDropdown', () => {
  const today = new Date(2019, 6, 30) // Fixed date to avoid future errors with random dates

  it('Should render', () => {
    const wrapper = getWrappedComponent()
    expect(wrapper.vm.isCalendarPopupOpened).toBe(false)
    wrapper.find('.calendar-toggle').vm.$emit('click')
    expect(wrapper.vm.isCalendarPopupOpened).toBe(true)
    expect(wrapper.find('.geo-calendar').exists()).toBe(true)
  })

  it('Should render with granularity picker', () => {
    const wrapper = mount(GeoCalendarDropdown, {
      slots: {
        popupContent: GeoCalendar,
        pickerGranularity: '<template>Picker granularity selectors</template>'
      },
      scopedSlots: {
        toggleButton: `<template
                      slot-scope="{ toggleCalendarPopup }"
                      slot="toggleButton"
                    >
                      <geo-dropdown-regular-button
                        class="calendar-toggle"
                        :icon="['fas', 'calendar']"
                        @click="toggleCalendarPopup"
                      >
                        Calendar:
                      </geo-dropdown-regular-button>
                    </template>`
      },
      stubs: {
        GeoBorderedBox,
        'geo-bordered-box-header': true,
        'geo-bordered-box-footer': true,
        'geo-input': true,
        'font-awesome-icon': true,
        'geo-calendar-picker': true,
        'geo-dropdown-regular-button': true,
        'geo-scrollable-container': true,
        GeoButton,
        GeoCalendar,
        GeoDropdown,
        GeoPrimaryButton
      },
      propsData: {
        pickerDateUnit: PICKER_DATE_UNITS.day,
        granularityId: GRANULARITY_IDS.day,
        locale: {}
      }
    })
    expect(wrapper.vm.isCalendarPopupOpened).toBe(false)
    wrapper.find('.calendar-toggle').vm.$emit('click')
    expect(wrapper.vm.isCalendarPopupOpened).toBe(true)
    expect(wrapper.find('.geo-calendar').exists()).toBe(true)
  })

  it('Should render with predefined aliases', () => {
    const wrapper = mount(GeoCalendarDropdown, {
      slots: {
        popupContent: GeoCalendar,
        pickerAliases: '<template>Picker predefined aliases</template>'
      },
      scopedSlots: {
        toggleButton: `<template
                      slot-scope="{ toggleCalendarPopup }"
                      slot="toggleButton"
                    >
                      <geo-dropdown-regular-button
                        class="calendar-toggle"
                        :icon="['fas', 'calendar']"
                        @click="toggleCalendarPopup"
                      >
                        Calendar:
                      </geo-dropdown-regular-button>
                    </template>`
      },
      stubs: {
        GeoBorderedBox,
        'geo-bordered-box-header': true,
        'geo-bordered-box-footer': true,
        'geo-input': true,
        'font-awesome-icon': true,
        'geo-calendar-picker': true,
        'geo-dropdown-regular-button': true,
        'geo-scrollable-container': true,
        GeoButton,
        GeoCalendar,
        GeoDropdown,
        GeoPrimaryButton
      },
      propsData: {
        pickerDateUnit: PICKER_DATE_UNITS.day,
        granularityId: GRANULARITY_IDS.day,
        locale: {}
      }
    })
    expect(wrapper.vm.isCalendarPopupOpened).toBe(false)
    wrapper.find('.calendar-toggle').vm.$emit('click')
    expect(wrapper.vm.isCalendarPopupOpened).toBe(true)
    expect(wrapper.find('.geo-calendar').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar__sidebar-container').exists()).toBe(true)
  })

  it('Should render with popup class', () => {
    const wrapper = getWrappedComponent()
    wrapper.setProps({
      popupClass: 'test-calendar-popup-class'
    })
    wrapper.find('.calendar-toggle').vm.$emit('click')
    expect(wrapper.find('.test-calendar-popup-class').exists()).toBe(true)
  })

  describe('Calendar events', () => {
    it('Emits event when receiving from date', () => {
      const wrapper = getWrappedComponent()
      wrapper.find('.calendar-toggle').vm.$emit('click')
      const geoCalendarWrapper = wrapper.find(GeoCalendar)
      geoCalendarWrapper.vm.$emit('emit-from-date', {
        fromDate: today
      })

      expect(wrapper.emitted()['emit-from-date']).toBeDefined()
      expect(wrapper.emitted()['emit-from-date'][0][0]).toEqual({
        fromDate: today
      })
    })

    it('Emits event when receiving to date', () => {
      const wrapper = getWrappedComponent()
      wrapper.find('.calendar-toggle').vm.$emit('click')
      const geoCalendarWrapper = wrapper.find(GeoCalendar)
      geoCalendarWrapper.vm.$emit('emit-to-date', {
        toDate: today
      })

      expect(wrapper.emitted()['emit-to-date']).toBeDefined()
      expect(wrapper.emitted()['emit-to-date'][0][0]).toEqual({
        toDate: today
      })
    })

    it('Emits when applying dates', function () {
      const wrapper = getWrappedComponent()
      wrapper.find('.calendar-toggle').vm.$emit('click')
      const geoCalendarWrapper = wrapper.find(GeoCalendar)

      geoCalendarWrapper.vm.$emit('emit-from-date', {
        fromDate: today
      })
      geoCalendarWrapper.vm.$emit('emit-to-date', {
        toDate: today
      })

      wrapper.find('.calendar-apply-ranges').trigger('click')
      expect(wrapper.emitted()['apply-range-selection']).toBeDefined()
      expect(wrapper.find('.geo-calendar').exists()).toBe(false)
    })
  })
})

function getWrappedComponent () {
  return mount(GeoCalendarDropdown, {
    slots: {
      popupContent: GeoCalendar
    },
    scopedSlots: {
      toggleButton: `<template
                      slot-scope="{ toggleCalendarPopup }"
                      slot="toggleButton"
                    >
                      <geo-dropdown-regular-button
                        class="calendar-toggle"
                        :icon="['fas', 'calendar']"
                        @click="toggleCalendarPopup"
                      >
                        Calendar:
                      </geo-dropdown-regular-button>
                    </template>`,
      calendarFooter: `<template
                        slot-scope="{ applyRangeSelection }"
                        slot="calendarFooter"
                      >
                        <geo-primary-button
                          class="calendar-apply-ranges"
                          @click="applyRangeSelection"
                        >
                          Apply Dates
                        </geo-primary-button>
                      </template>`
    },
    stubs: {
      GeoBorderedBox,
      'geo-bordered-box-header': true,
      'geo-bordered-box-footer': true,
      'geo-input': true,
      'font-awesome-icon': true,
      'geo-calendar-picker': true,
      'geo-dropdown-regular-button': true,
      'geo-scrollable-container': true,
      GeoButton,
      GeoCalendar,
      GeoDropdown,
      GeoPrimaryButton
    },
    propsData: {
      pickerDateUnit: PICKER_DATE_UNITS.day,
      granularityId: GRANULARITY_IDS.day,
      locale: {}
    }
  })
}
