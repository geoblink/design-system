import { mount } from '@vue/test-utils'
import { PICKER_DATE_UNITS, GRANULARITY_IDS } from '@/elements/GeoCalendar/GeoCalendar.utils'
import GeoCalendarDropdown from '@/elements/GeoCalendar/GeoCalendarDropdown.vue'
import GeoBorderedBox from '@/elements/GeoBorderedBox/GeoBorderedBox'
import GeoCalendar from '@/elements/GeoCalendar/GeoCalendar'
import GeoDropdown from '@/elements/GeoDropdown/GeoDropdown'

describe('GeoCalendarDropdown', () => {
  const today = new Date(2019, 6, 30) // Fixed date to avoid future errors with random dates

  it('Should render', function () {
    const wrapper = getWrappedComponent()
    expect(wrapper.vm.isCalendarPopupOpened).toBe(false)
    wrapper.find('.calendar-toggle').vm.$emit('click')
    expect(wrapper.vm.isCalendarPopupOpened).toBe(true)
    expect(wrapper.find('.geo-calendar').exists()).toBe(true)
  })

  it('Should render with appended cssModifier', () => {
    const wrapper = getWrappedComponent()
    wrapper.setProps({
      cssModifier: 'test-calendar-dropdown'
    })
    wrapper.find('.calendar-toggle').vm.$emit('click')
    expect(wrapper.find('.geo-calendar--test-calendar-dropdown').exists()).toBe(true)
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
  })

  describe('Reset dates', () => {
    it('Reset dates when closing the calendar', () => {
      const wrapper = getWrappedComponent()
      wrapper.find('.calendar-toggle').vm.$emit('click')
      const geoCalendarWrapper = wrapper.find(GeoCalendar)

      geoCalendarWrapper.vm.$emit('emit-from-date', {
        fromDate: today
      })
      geoCalendarWrapper.vm.$emit('emit-to-date', {
        toDate: today
      })

      expect(wrapper.emitted()['emit-from-date']).toBeDefined()
      expect(wrapper.emitted()['emit-from-date'][0][0]).toEqual({
        fromDate: today
      })

      expect(wrapper.emitted()['emit-to-date']).toBeDefined()
      expect(wrapper.emitted()['emit-to-date'][0][0]).toEqual({
        toDate: today
      })

      wrapper.find(GeoDropdown).vm.$emit('click-outside')
      expect(wrapper.vm.isCalendarPopupOpened).toBe(false)
      expect(wrapper.find('.geo-calendar').exists()).toBe(false)
      expect(wrapper.emitted()['emit-from-date'][1][0]).toEqual({
        fromDate: null
      })
      expect(wrapper.emitted()['emit-to-date'][1][0]).toEqual({
        toDate: null
      })
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
      GeoCalendar,
      GeoDropdown
    },
    propsData: {
      pickerDateUnit: PICKER_DATE_UNITS.day,
      granularityId: GRANULARITY_IDS.day,
      locale: {}
    }
  })
}
