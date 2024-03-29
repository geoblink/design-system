import { mount, shallowMount } from '@vue/test-utils'
import { PICKER_DATE_UNITS, GRANULARITY_IDS, FOCUSABLE_INPUT_FIELDS } from '@/elements/GeoCalendar/GeoCalendar.utils.js'
import GeoCalendar from '@/elements/GeoCalendar/GeoCalendar.vue'
import GeoInput from '@/elements/GeoInput/GeoInput.vue'
import GeoLinkButton from '@/elements/GeoButton/GeoLinkButton.vue'
import GeoButton from '@/elements/GeoButton/GeoButton.vue'
import GeoCalendarPicker from '@/elements/GeoCalendar/GeoCalendarPicker.vue'
import GeoCalendarGranularityIdMixin from '@/elements/GeoCalendar/GeoCalendarGranularityId.mixin'
import addDays from 'date-fns/addDays'
import startOfQuarter from 'date-fns/startOfQuarter'
import endOfQuarter from 'date-fns/endOfQuarter'
import startOfWeek from 'date-fns/startOfWeek'
import endOfWeek from 'date-fns/endOfWeek'
import subYears from 'date-fns/subYears'
import addYears from 'date-fns/addYears'
import subMonths from 'date-fns/subMonths'
import endOfMonth from 'date-fns/endOfMonth'
import endOfYear from 'date-fns/endOfYear'
import getMonth from 'date-fns/getMonth'
import addMonths from 'date-fns/addMonths'
import startOfMonth from 'date-fns/startOfMonth'
import getYear from 'date-fns/getYear'
import startOfYear from 'date-fns/startOfYear'
import subDays from 'date-fns/subDays'

const today = new Date(Date.UTC(2019, 6, 30)) // Fixed date to avoid future errors with random dates

describe('Mixins', () => {
  describe('GeoCalendarGranularityId.mixin', () => {
    it('Should export props object', () => {
      expect(GeoCalendarGranularityIdMixin).toHaveProperty('props')
    })

    it('Should have granularityId property', () => {
      expect(GeoCalendarGranularityIdMixin.props).toHaveProperty('granularityId')
    })

    it('Should have correct validation params', () => {
      expect(GeoCalendarGranularityIdMixin.props.granularityId).toHaveProperty('type')
      expect(GeoCalendarGranularityIdMixin.props.granularityId.type).toBe(String)
      expect(GeoCalendarGranularityIdMixin.props.granularityId).toHaveProperty('required')
      expect(GeoCalendarGranularityIdMixin.props.granularityId.required).toBe(true)
    })

    it('Should validate provided granularities', () => {
      const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })
      expect(GeoCalendarGranularityIdMixin.props.granularityId.validator(GRANULARITY_IDS.day)).toBe(true)
      expect(GeoCalendarGranularityIdMixin.props.granularityId.validator('Random granularity')).toBe(false)
      expect(consoleWarnSpy).toHaveBeenCalled()
      consoleWarnSpy.mockRestore()
    })
  })
})

describe('GeoCalendar', () => {
  it('Should render', () => {
    const wrapper = getWrappedComponent()
    expect(wrapper.find('.geo-calendar').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar__sidebar-container').exists()).toBe(true)
    expect(wrapper.find('.geo-calendar__picker-controls').exists()).toBe(true)
    expect(wrapper.vm.$refs.calendarPicker).toBeDefined()
  })

  describe('Calendar events', () => {
    it('goToMonth', () => {
      const wrapper = getWrappedComponent()
      const calendarPicker = wrapper.vm.$refs.calendarPicker
      calendarPicker.$emit('go-to-month', 8)
      expect(wrapper.vm.currentMonth).toBe(8)
    })

    it('goToYear', () => {
      const wrapper = getWrappedComponent()
      const calendarPicker = wrapper.vm.$refs.calendarPicker
      calendarPicker.$emit('go-to-year', 2021)
      expect(wrapper.vm.currentYear).toBe(2021)
    })

    it('goToYearRange', () => {
      const wrapper = getWrappedComponent()
      const calendarPicker = wrapper.vm.$refs.calendarPicker
      calendarPicker.$emit('go-to-year-range', [2015, 2030])
      expect(wrapper.vm.currentInitialYearInRange).toBe(2015)
      expect(wrapper.vm.currentEndYearInRange).toBe(2030)
    })

    it('selectDay', () => {
      const wrapper = getWrappedComponent()
      const calendarPicker = wrapper.vm.$refs.calendarPicker
      const selectedDay = addDays(today, 4)
      calendarPicker.$emit('select-day', selectedDay)
      expect(wrapper.vm.fromRawDate).toEqual(selectedDay)
      expect(wrapper.vm.fromFormattedDate).toBe('03/08/2019')
      expect(wrapper.emitted()['emit-from-date']).toBeDefined()
      expect(wrapper.emitted()['emit-from-date'][0][0]).toEqual({ fromDate: selectedDay })
    })

    it('selectDay with isFromDateDisabled prop set', () => {
      const wrapper = getWrappedComponent()
      wrapper.setProps({ isFromDateDisabled: true })
      const calendarPicker = wrapper.vm.$refs.calendarPicker
      const selectedDay = addDays(today, 4)
      const geoFromInput = wrapper.findAll(GeoInput).at(0)
      expect(geoFromInput.props('disabled')).toBe(true)
      calendarPicker.$emit('select-day', selectedDay)
      expect(wrapper.vm.toRawDate).toEqual(selectedDay)
      expect(wrapper.vm.toFormattedDate).toBe('03/08/2019')
      expect(wrapper.emitted()['emit-to-date']).toBeDefined()
      expect(wrapper.emitted()['emit-to-date'][0][0]).toEqual({ toDate: selectedDay })
    })

    it('selectDay with isToDateDisabled prop set', () => {
      const wrapper = getWrappedComponent()
      wrapper.setProps({ isToDateDisabled: true })
      const calendarPicker = wrapper.vm.$refs.calendarPicker
      const selectedDay = addDays(today, 4)
      const geoToInput = wrapper.findAll(GeoInput).at(1)
      expect(geoToInput.props('disabled')).toBe(true)
      calendarPicker.$emit('select-day', selectedDay)
      expect(wrapper.vm.fromRawDate).toEqual(selectedDay)
      expect(wrapper.vm.fromFormattedDate).toBe('03/08/2019')
      expect(wrapper.emitted()['emit-from-date']).toBeDefined()
      expect(wrapper.emitted()['emit-from-date'][0][0]).toEqual({ fromDate: selectedDay })
    })

    describe('selectMonth', () => {
      it('Sets first day of month in from input', () => {
        const wrapper = getWrappedComponent()
        wrapper.setData({
          currentYear: getYear(today)
        })
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        calendarPicker.$emit('select-month', 8)
        expect(wrapper.vm.currentMonth).toBe(8)
        const currentDate = new Date(Date.UTC(wrapper.vm.currentYear, wrapper.vm.currentMonth))
        expect(wrapper.vm.fromRawDate).toEqual(currentDate)
        expect(wrapper.vm.fromFormattedDate).toBe('01/09/2019')
        expect(wrapper.emitted()['emit-from-date']).toBeDefined()
        expect(wrapper.emitted()['emit-from-date'][0][0]).toEqual({ fromDate: currentDate })
      })

      it('Sets first day of month in to input when isFromDateDisabled prop set', () => {
        const wrapper = getWrappedComponent()
        wrapper.setData({
          currentYear: getYear(today)
        })
        wrapper.setProps({ isFromDateDisabled: true })
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        calendarPicker.$emit('select-month', 8)
        expect(wrapper.vm.currentMonth).toBe(8)
        const currentDate = endOfMonth(new Date(Date.UTC(wrapper.vm.currentYear, wrapper.vm.currentMonth)))
        const validatedUtcRange = wrapper.vm.getUTCValidatedRange({ end: currentDate })
        expect(wrapper.vm.toRawDate).toEqual(validatedUtcRange.end)
        expect(wrapper.vm.toFormattedDate).toBe('30/09/2019')
        expect(wrapper.emitted()['emit-to-date']).toBeDefined()
        expect(wrapper.emitted()['emit-to-date'][0][0]).toEqual({ toDate: validatedUtcRange.end })
      })

      it('Sets last day of month in to input', () => {
        const wrapper = getWrappedComponent()
        wrapper.setData({
          currentYear: getYear(today)
        })
        wrapper.setData({
          lastInputFieldFocused: FOCUSABLE_INPUT_FIELDS.FROM_DATE
        })
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        calendarPicker.$emit('select-month', 6)
        calendarPicker.$emit('select-month', 8)
        expect(wrapper.vm.currentMonth).toBe(8)
        const currentDate = endOfMonth(new Date(Date.UTC(wrapper.vm.currentYear, wrapper.vm.currentMonth)))
        const validatedUtcRange = wrapper.vm.getUTCValidatedRange({ end: currentDate })
        expect(wrapper.vm.toRawDate).toEqual(validatedUtcRange.end)
        expect(wrapper.vm.toFormattedDate).toBe('30/09/2019')
        expect(wrapper.emitted()['emit-to-date']).toBeDefined()
        expect(wrapper.emitted()['emit-to-date'][1][0]).toEqual({ toDate: validatedUtcRange.end })
      })

      it('Sets earliestDate if first day of month is before earliestDate', () => {
        const earliestDate = new Date(2019, 8, 21)
        const wrapper = getWrappedComponent()
        wrapper.setProps({ earliestDate })
        wrapper.setData({
          currentYear: getYear(today)
        })
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        calendarPicker.$emit('select-month', 8)
        expect(wrapper.vm.currentMonth).toBe(8)
        const validatedUtcRange = wrapper.vm.getUTCValidatedRange({ start: earliestDate })
        expect(wrapper.vm.fromRawDate).toEqual(validatedUtcRange.start)
        expect(wrapper.vm.fromFormattedDate).toBe('21/09/2019')
        expect(wrapper.emitted()['emit-from-date']).toBeDefined()
        expect(wrapper.emitted()['emit-from-date'][0][0]).toEqual({ fromDate: validatedUtcRange.start })
      })

      it('Sets latestDate if last day of month is after latestDate', () => {
        const latestDate = new Date(2019, 8, 21)
        const wrapper = getWrappedComponent()
        wrapper.setProps({ latestDate })
        wrapper.setData({
          currentYear: getYear(today)
        })
        wrapper.setData({
          lastInputFieldFocused: FOCUSABLE_INPUT_FIELDS.FROM_DATE
        })
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        calendarPicker.$emit('select-month', 6)
        calendarPicker.$emit('select-month', 8)
        expect(wrapper.vm.currentMonth).toBe(8)
        const validatedUtcRange = wrapper.vm.getUTCValidatedRange({ end: latestDate })
        expect(wrapper.vm.toRawDate).toEqual(validatedUtcRange.end)
        expect(wrapper.vm.toFormattedDate).toBe('21/09/2019')
        expect(wrapper.emitted()['emit-to-date']).toBeDefined()
        expect(wrapper.emitted()['emit-to-date'][1][0]).toEqual({ toDate: validatedUtcRange.end })
      })

      it('Sets same date for start and last day if earliestDate is last day of month', () => {
        const earliestDate = new Date(2019, 8, 30)
        const latestDate = new Date(2019, 9, 21)
        const wrapper = getWrappedComponent()
        wrapper.setProps({ earliestDate, latestDate })
        wrapper.setData({
          currentYear: getYear(today)
        })
        wrapper.setData({
          lastInputFieldFocused: FOCUSABLE_INPUT_FIELDS.FROM_DATE
        })
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        calendarPicker.$emit('select-month', 8)
        calendarPicker.$emit('select-month', 8)
        expect(wrapper.vm.currentMonth).toBe(8)
        const validatedUtcRange = wrapper.vm.getUTCValidatedRange({ start: earliestDate, end: earliestDate })
        expect(wrapper.vm.toRawDate).toEqual(validatedUtcRange.start)
        expect(wrapper.vm.toFormattedDate).toBe('30/09/2019')
        expect(wrapper.vm.fromRawDate).toEqual(validatedUtcRange.end)
        expect(wrapper.vm.fromFormattedDate).toBe('30/09/2019')
        expect(wrapper.emitted()['emit-from-date']).toBeDefined()
        expect(wrapper.emitted()['emit-from-date'][0][0]).toEqual({ fromDate: validatedUtcRange.start })
        expect(wrapper.emitted()['emit-to-date']).toBeDefined()
        expect(wrapper.emitted()['emit-to-date'][1][0]).toEqual({ toDate: validatedUtcRange.end })
      })
    })

    describe('selectQuarter', () => {
      it('Sets first day of quarter in from input', () => {
        const wrapper = getWrappedComponent()
        wrapper.setData({
          currentYear: getYear(today)
        })
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        calendarPicker.$emit('select-quarter', 3)
        const fromDate = startOfQuarter(new Date(wrapper.vm.currentYear, 3))
        const validatedUtcRange = wrapper.vm.getUTCValidatedRange({ start: fromDate })
        expect(wrapper.vm.fromRawDate).toEqual(validatedUtcRange.start)
        expect(wrapper.vm.fromFormattedDate).toBe('01/04/2019')
        expect(wrapper.emitted()['emit-from-date']).toBeDefined()
        expect(wrapper.emitted()['emit-from-date'][0][0]).toEqual({ fromDate: validatedUtcRange.start })
      })

      it('Sets first day of quarter in to input when isFromDateDisabled prop set', () => {
        const wrapper = getWrappedComponent()
        wrapper.setData({
          currentYear: getYear(today)
        })
        wrapper.setProps({ isFromDateDisabled: true })
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        calendarPicker.$emit('select-quarter', 3)
        const toDate = endOfQuarter(new Date(wrapper.vm.currentYear, 3))
        const validatedUtcRange = wrapper.vm.getUTCValidatedRange({ end: toDate })
        expect(wrapper.vm.toRawDate).toEqual(validatedUtcRange.end)
        expect(wrapper.vm.toFormattedDate).toBe('30/06/2019')
        expect(wrapper.emitted()['emit-to-date']).toBeDefined()
        expect(wrapper.emitted()['emit-to-date'][0][0]).toEqual({ toDate: validatedUtcRange.end })
      })

      it('Sets last day of quarter in to input', () => {
        const wrapper = getWrappedComponent()
        wrapper.setData({
          currentYear: getYear(today)
        })
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        calendarPicker.$emit('select-quarter', 4)
        calendarPicker.$emit('select-quarter', 5)
        const toDate = endOfQuarter(new Date(wrapper.vm.currentYear, 5))
        const validatedUtcRange = wrapper.vm.getUTCValidatedRange({ end: toDate })
        expect(wrapper.vm.toRawDate).toEqual(validatedUtcRange.end)
        expect(wrapper.vm.toFormattedDate).toBe('30/06/2019')
        expect(wrapper.emitted()['emit-to-date']).toBeDefined()
        expect(wrapper.emitted()['emit-to-date'][1][0]).toEqual({ toDate: validatedUtcRange.end })
      })

      it('Sets last day of another quarter in to input', () => {
        const wrapper = getWrappedComponent()
        wrapper.setData({
          currentYear: getYear(today)
        })
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        calendarPicker.$emit('select-quarter', 4)
        calendarPicker.$emit('select-quarter', 8)
        const toDate = endOfQuarter(new Date(wrapper.vm.currentYear, 8))
        const validatedUtcRange = wrapper.vm.getUTCValidatedRange({ end: toDate })
        expect(wrapper.vm.toRawDate).toEqual(validatedUtcRange.end)
        expect(wrapper.vm.toFormattedDate).toBe('30/09/2019')
        expect(wrapper.emitted()['emit-to-date']).toBeDefined()
        expect(wrapper.emitted()['emit-to-date'][1][0]).toEqual({ toDate: validatedUtcRange.end })
      })

      it('Sets earliestDate if first day of quarter is before earliestDate', () => {
        const earliestDate = new Date(2019, 4, 21)
        const wrapper = getWrappedComponent()
        wrapper.setProps({ earliestDate })
        wrapper.setData({
          currentYear: getYear(today)
        })
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        calendarPicker.$emit('select-quarter', 3)
        const validatedUtcRange = wrapper.vm.getUTCValidatedRange({ start: earliestDate })
        expect(wrapper.vm.fromRawDate).toEqual(validatedUtcRange.start)
        expect(wrapper.vm.fromFormattedDate).toBe('21/05/2019')
        expect(wrapper.emitted()['emit-from-date']).toBeDefined()
        expect(wrapper.emitted()['emit-from-date'][0][0]).toEqual({ fromDate: validatedUtcRange.start })
      })

      it('Sets latestDate if last day of quarter is after latestDate', () => {
        const latestDate = new Date(2019, 8, 21)
        const wrapper = getWrappedComponent()
        wrapper.setProps({ latestDate })
        wrapper.setData({
          currentYear: getYear(today)
        })
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        calendarPicker.$emit('select-quarter', 4)
        calendarPicker.$emit('select-quarter', 8)
        const validatedUtcRange = wrapper.vm.getUTCValidatedRange({ end: latestDate })
        expect(wrapper.vm.toRawDate).toEqual(validatedUtcRange.end)
        expect(wrapper.vm.toFormattedDate).toBe('21/09/2019')
        expect(wrapper.emitted()['emit-to-date']).toBeDefined()
        expect(wrapper.emitted()['emit-to-date'][1][0]).toEqual({ toDate: validatedUtcRange.end })
      })
    })

    describe('selectWeek', () => {
      it('Sets first day of week in from input', () => {
        const wrapper = getWrappedComponent()
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        const weekStart = startOfWeek(today)
        const weekEnd = endOfWeek(today)
        calendarPicker.$emit('select-week', {
          fromDate: weekStart,
          toDate: weekEnd
        })
        const validatedUtcRange = wrapper.vm.getUTCValidatedRange({ start: weekStart })
        expect(wrapper.vm.fromRawDate).toEqual(validatedUtcRange.start)
        expect(wrapper.vm.fromFormattedDate).toBe('28/07/2019')
        expect(wrapper.emitted()['emit-from-date']).toBeDefined()
        expect(wrapper.emitted()['emit-from-date'][0][0]).toEqual({ fromDate: validatedUtcRange.start })
      })

      it('Sets last day of week in to input when isFromDateDisabled prop set', () => {
        const wrapper = getWrappedComponent()
        wrapper.setProps({ isFromDateDisabled: true })
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        const weekStart = startOfWeek(today)
        const weekEnd = endOfWeek(today)
        calendarPicker.$emit('select-week', {
          fromDate: weekStart,
          toDate: weekEnd
        })
        const validatedUtcRange = wrapper.vm.getUTCValidatedRange({ end: weekEnd })
        expect(wrapper.vm.toRawDate).toEqual(validatedUtcRange.end)
        expect(wrapper.vm.toFormattedDate).toBe('03/08/2019')
        expect(wrapper.emitted()['emit-to-date']).toBeDefined()
        expect(wrapper.emitted()['emit-to-date'][0][0]).toEqual({ toDate: validatedUtcRange.end })
      })

      it('Sets earliestDate if first day of week is before earliestDate', () => {
        const earliestDate = new Date(2019, 6, 30)
        const wrapper = getWrappedComponent()
        wrapper.setProps({ earliestDate })
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        const weekStart = startOfWeek(today)
        const weekEnd = endOfWeek(today)
        calendarPicker.$emit('select-week', {
          fromDate: weekStart,
          toDate: weekEnd
        })
        const validatedUtcRange = wrapper.vm.getUTCValidatedRange({ start: earliestDate })
        expect(wrapper.vm.fromRawDate).toEqual(validatedUtcRange.start)
        expect(wrapper.vm.fromFormattedDate).toBe('30/07/2019')
        expect(wrapper.emitted()['emit-from-date']).toBeDefined()
        expect(wrapper.emitted()['emit-from-date'][0][0]).toEqual({ fromDate: validatedUtcRange.start })
      })

      it('Sets last day of week in to input', () => {
        const wrapper = getWrappedComponent()
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        const weekStart = startOfWeek(today)
        const weekEnd = endOfWeek(today)
        calendarPicker.$emit('select-week', {
          fromDate: weekStart,
          toDate: weekEnd
        })
        calendarPicker.$emit('select-week', {
          fromDate: weekStart,
          toDate: weekEnd
        })
        const validatedUtcRange = wrapper.vm.getUTCValidatedRange({ start: weekStart, end: weekEnd })
        expect(wrapper.vm.fromRawDate).toEqual(validatedUtcRange.start)
        expect(wrapper.vm.toRawDate).toEqual(validatedUtcRange.end)
        expect(wrapper.vm.fromFormattedDate).toBe('28/07/2019')
        expect(wrapper.vm.toFormattedDate).toBe('03/08/2019')
        expect(wrapper.emitted()['emit-from-date']).toBeDefined()
        expect(wrapper.emitted()['emit-to-date']).toBeDefined()
        expect(wrapper.emitted()['emit-from-date'][0][0]).toEqual({ fromDate: validatedUtcRange.start })
        expect(wrapper.emitted()['emit-to-date'][1][0]).toEqual({ toDate: validatedUtcRange.end })
      })

      it('Sets last day of another week in to input', () => {
        const wrapper = getWrappedComponent()
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        const weekStart = startOfWeek(today)
        const weekEnd = endOfWeek(today)

        const nextWeek = addDays(today, 7)
        const startOfNextWeek = startOfWeek(nextWeek)
        const endOfNextWeek = endOfWeek(nextWeek)
        calendarPicker.$emit('select-week', {
          fromDate: weekStart,
          toDate: weekEnd
        })
        calendarPicker.$emit('select-week', {
          fromDate: startOfNextWeek,
          toDate: endOfNextWeek
        })
        const validatedUtcRange = wrapper.vm.getUTCValidatedRange({ start: weekStart, end: endOfNextWeek })
        expect(wrapper.vm.fromRawDate).toEqual(validatedUtcRange.start)
        expect(wrapper.vm.toRawDate).toEqual(validatedUtcRange.end)
        expect(wrapper.vm.fromFormattedDate).toBe('28/07/2019')
        expect(wrapper.vm.toFormattedDate).toBe('10/08/2019')
        expect(wrapper.emitted()['emit-from-date']).toBeDefined()
        expect(wrapper.emitted()['emit-to-date']).toBeDefined()
        expect(wrapper.emitted()['emit-from-date'][0][0]).toEqual({ fromDate: validatedUtcRange.start })
        expect(wrapper.emitted()['emit-to-date'][1][0]).toEqual({ toDate: validatedUtcRange.end })
      })

      it('Sets latestDate if last day of week is after latestDate', () => {
        const latestDate = new Date(2019, 7, 1)
        const wrapper = getWrappedComponent()
        wrapper.setProps({ latestDate })
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        const weekStart = startOfWeek(today)
        const weekEnd = endOfWeek(today)
        calendarPicker.$emit('select-week', {
          fromDate: weekStart,
          toDate: weekEnd
        })
        calendarPicker.$emit('select-week', {
          fromDate: weekStart,
          toDate: weekEnd
        })
        const validatedUtcRange = wrapper.vm.getUTCValidatedRange({ start: weekStart, end: latestDate })
        expect(wrapper.vm.fromRawDate).toEqual(validatedUtcRange.start)
        expect(wrapper.vm.toRawDate).toEqual(validatedUtcRange.end)
        expect(wrapper.vm.fromFormattedDate).toBe('28/07/2019')
        expect(wrapper.vm.toFormattedDate).toBe('01/08/2019')
        expect(wrapper.emitted()['emit-from-date']).toBeDefined()
        expect(wrapper.emitted()['emit-to-date']).toBeDefined()
        expect(wrapper.emitted()['emit-from-date'][0][0]).toEqual({ fromDate: validatedUtcRange.start })
        expect(wrapper.emitted()['emit-to-date'][1][0]).toEqual({ toDate: validatedUtcRange.end })
      })
    })

    describe('selectYear', () => {
      it('Sets first day of year in from input', () => {
        const wrapper = getWrappedComponent()
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        calendarPicker.$emit('select-year', 2020)
        expect(wrapper.vm.currentYear).toBe(2020)
        const startUTCValidatedRange = wrapper.vm.getUTCValidatedRange({ start: new Date(2020, 0) })
        expect(wrapper.vm.fromRawDate).toEqual(startUTCValidatedRange.start)
        expect(wrapper.vm.fromFormattedDate).toBe('01/01/2020')
        expect(wrapper.emitted()['emit-from-date']).toBeDefined()
        expect(wrapper.emitted()['emit-from-date'][0][0]).toEqual({ fromDate: startUTCValidatedRange.start })
      })

      it('Sets last day of year in to input when isFromDateDisabled prop set', () => {
        const wrapper = getWrappedComponent()
        wrapper.setData({
          lastInputFieldFocused: FOCUSABLE_INPUT_FIELDS.FROM_DATE
        })
        wrapper.setProps({ isFromDateDisabled: true })
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        calendarPicker.$emit('select-year', 2020)
        expect(wrapper.vm.currentYear).toBe(2020)
        const endUTCValidatedRange = wrapper.vm.getUTCValidatedRange({ end: endOfYear(new Date(wrapper.vm.currentYear, wrapper.vm.currentMonth)) })
        expect(wrapper.vm.toRawDate).toEqual(endUTCValidatedRange.end)
        expect(wrapper.vm.toFormattedDate).toBe('31/12/2020')
        expect(wrapper.emitted()['emit-to-date']).toBeDefined()
        expect(wrapper.emitted()['emit-to-date'][0][0]).toEqual({ toDate: endUTCValidatedRange.end })
      })

      it('Sets last day of year in to input', () => {
        const wrapper = getWrappedComponent()
        wrapper.setData({
          lastInputFieldFocused: FOCUSABLE_INPUT_FIELDS.FROM_DATE
        })
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        calendarPicker.$emit('select-year', 2019)
        calendarPicker.$emit('select-year', 2020)
        expect(wrapper.vm.currentYear).toBe(2020)
        const endUTCValidatedRange = wrapper.vm.getUTCValidatedRange({ end: endOfYear(new Date(wrapper.vm.currentYear, wrapper.vm.currentMonth)) })
        expect(wrapper.vm.toRawDate).toEqual(endUTCValidatedRange.end)
        expect(wrapper.vm.toFormattedDate).toBe('31/12/2020')
        expect(wrapper.emitted()['emit-to-date']).toBeDefined()
        expect(wrapper.emitted()['emit-to-date'][1][0]).toEqual({ toDate: endUTCValidatedRange.end })
      })

      it('Sets earliestDate if first day of year is before earliestDate', () => {
        const earliestDate = new Date(2020, 4, 21)
        const wrapper = getWrappedComponent()
        wrapper.setProps({ earliestDate })
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        calendarPicker.$emit('select-year', 2020)
        const validatedUtcRange = wrapper.vm.getUTCValidatedRange({ start: earliestDate })
        expect(wrapper.vm.currentYear).toBe(2020)
        expect(wrapper.vm.fromRawDate).toEqual(validatedUtcRange.start)
        expect(wrapper.vm.fromFormattedDate).toBe('21/05/2020')
        expect(wrapper.emitted()['emit-from-date']).toBeDefined()
        expect(wrapper.emitted()['emit-from-date'][0][0]).toEqual({ fromDate: validatedUtcRange.start })
      })

      it('Sets latestDate if last day of year is after latestDate', () => {
        const latestDate = new Date(2020, 8, 21)
        const wrapper = getWrappedComponent()
        wrapper.setProps({ latestDate })
        wrapper.setData({
          lastInputFieldFocused: FOCUSABLE_INPUT_FIELDS.FROM_DATE
        })
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        calendarPicker.$emit('select-year', 2019)
        calendarPicker.$emit('select-year', 2020)
        const validatedUtcRange = wrapper.vm.getUTCValidatedRange({ end: latestDate })
        expect(wrapper.vm.currentYear).toBe(2020)
        expect(wrapper.vm.toRawDate).toEqual(validatedUtcRange.end)
        expect(wrapper.vm.toFormattedDate).toBe('21/09/2020')
        expect(wrapper.emitted()['emit-to-date']).toBeDefined()
        expect(wrapper.emitted()['emit-to-date'][1][0]).toEqual({ toDate: validatedUtcRange.end })
      })
    })
  })

  describe('Invalid ranges', () => {
    describe('selectDay', () => {
      it('Should swap days when range is invalid', () => {
        const wrapper = getWrappedComponent()
        const initialDate = today
        const endDate = addDays(today, 4)
        const invalidFromDateRange = addDays(endDate, 5)
        const geoFromInput = wrapper.findAll(GeoInput).at(0)

        wrapper.vm.selectDay(initialDate)
        wrapper.vm.selectDay(endDate)

        geoFromInput.vm.$emit('focus')

        expect(wrapper.vm.lastInputFieldFocused).toBe(FOCUSABLE_INPUT_FIELDS.FROM_DATE)
        expect(wrapper.vm.isSomeInputFieldExplicitlyFocused).toBe(true)

        wrapper.vm.selectDay(invalidFromDateRange)

        const validFromDateRange = wrapper.vm.getUTCValidatedRange({ start: endDate, end: invalidFromDateRange })
        expect(wrapper.vm.fromRawDate).toEqual(validFromDateRange.start)
        expect(wrapper.vm.toRawDate).toEqual(validFromDateRange.end)
        expect(wrapper.vm.fromFormattedDate).toBe('03/08/2019')
        expect(wrapper.vm.toFormattedDate).toBe('08/08/2019')
        expect(wrapper.emitted()['emit-from-date']).toBeDefined()
        expect(wrapper.emitted()['emit-to-date']).toBeDefined()
        expect(wrapper.emitted()['emit-from-date'][2][0]).toEqual({ fromDate: validFromDateRange.start })
        expect(wrapper.emitted()['emit-to-date'][2][0]).toEqual({ toDate: validFromDateRange.end })
      })
    })

    describe('selectMonth', () => {
      it('Should swap months when range is invalid', () => {
        const wrapper = getWrappedComponent()
        const initialMonth = getMonth(today)
        const endDate = addMonths(today, 4)
        const invalidFromDateRange = addMonths(endDate, 5)
        const geoFromInput = wrapper.findAll(GeoInput).at(0)

        wrapper.setData({
          currentYear: getYear(today)
        })
        wrapper.vm.selectMonth(initialMonth)
        wrapper.vm.selectMonth(getMonth(endDate))
        geoFromInput.vm.$emit('focus')
        wrapper.setData({
          currentYear: getYear(invalidFromDateRange)
        })

        wrapper.vm.selectMonth(getMonth(invalidFromDateRange))
        const validatedDateRange = wrapper.vm.getUTCValidatedRange({ start: startOfMonth(endDate), end: endOfMonth(invalidFromDateRange) })
        expect(wrapper.vm.fromRawDate).toEqual(validatedDateRange.start)
        expect(wrapper.vm.toRawDate).toEqual(validatedDateRange.end)
        expect(wrapper.vm.fromFormattedDate).toBe('01/11/2019')
        expect(wrapper.vm.toFormattedDate).toBe('30/04/2020')
        expect(wrapper.emitted()['emit-from-date']).toBeDefined()
        expect(wrapper.emitted()['emit-to-date']).toBeDefined()
        expect(wrapper.emitted()['emit-from-date'][2][0]).toEqual({ fromDate: validatedDateRange.start })
        expect(wrapper.emitted()['emit-to-date'][2][0]).toEqual({ toDate: validatedDateRange.end })
      })
    })

    describe('selectYear', () => {
      it('Should swap years when range is invalid', () => {
        const wrapper = getWrappedComponent()
        const initialYear = getYear(today)
        const endDate = addYears(today, 4)
        const invalidFromDateRange = addYears(endDate, 5)
        const geoFromInput = wrapper.findAll(GeoInput).at(0)

        wrapper.vm.selectYear(initialYear)
        wrapper.vm.selectYear(getYear(endDate))
        geoFromInput.vm.$emit('focus')

        wrapper.setData({
          currentYear: getYear(invalidFromDateRange)
        })

        wrapper.vm.selectYear(getYear(invalidFromDateRange))
        const validFromDateRange = wrapper.vm.getUTCValidatedRange({ start: startOfYear(endDate), end: endOfYear(invalidFromDateRange) })
        expect(wrapper.vm.fromRawDate).toEqual(validFromDateRange.start)
        expect(wrapper.vm.toRawDate).toEqual(validFromDateRange.end)
        expect(wrapper.vm.fromFormattedDate).toBe('01/01/2023')
        expect(wrapper.vm.toFormattedDate).toBe('31/12/2028')
        expect(wrapper.emitted()['emit-from-date']).toBeDefined()
        expect(wrapper.emitted()['emit-to-date']).toBeDefined()
        expect(wrapper.emitted()['emit-from-date'][2][0]).toEqual({ fromDate: validFromDateRange.start })
        expect(wrapper.emitted()['emit-to-date'][2][0]).toEqual({ toDate: validFromDateRange.end })
      })
    })
  })

  describe('Date inputs', () => {
    describe('From date input', () => {
      it('Sets input', () => {
        const wrapper = getWrappedComponent()

        const geoFromInput = wrapper.findAll(GeoInput).at(0)
        geoFromInput.vm.$emit('focus')
        wrapper.setData({
          fromFormattedDate: '30/07/2019'
        })
        geoFromInput.vm.$emit('blur')

        expect(wrapper.vm.fromRawDate).toEqual(today)
        expect(wrapper.emitted()['emit-from-date']).toBeDefined()
        expect(wrapper.emitted()['emit-from-date'][0][0]).toEqual({ fromDate: today })
      })

      it('Sets wrong date', () => {
        const wrapper = getWrappedComponent()
        const geoFromInput = wrapper.findAll(GeoInput).at(0)
        geoFromInput.vm.$emit('focus')
        wrapper.setData({
          fromFormattedDate: 'rrr'
        })
        geoFromInput.vm.$emit('blur')

        expect(wrapper.vm.fromRawDate).toBe(null)
        expect(wrapper.vm.showFromFormatError).toBe(true)
        expect(wrapper.emitted()['emit-from-date']).toBeDefined()
        expect(wrapper.emitted()['emit-from-date'][0][0]).toEqual({ fromDate: null })

        wrapper.setData({
          fromFormattedDate: ''
        })
        geoFromInput.vm.$emit('blur')

        expect(wrapper.vm.showFromFormatError).toBe(false)
        expect(wrapper.vm.fromRawDate).toBe(null)
        expect(wrapper.emitted()['emit-from-date']).toBeDefined()
        expect(wrapper.emitted()['emit-from-date'][1][0]).toEqual({ fromDate: null })
      })
    })

    describe('To date input', () => {
      it('Sets input', () => {
        const wrapper = getWrappedComponent()
        const geoToInput = wrapper.findAll(GeoInput).at(1)
        geoToInput.vm.$emit('focus')
        wrapper.setData({
          toFormattedDate: '30/07/2019'
        })
        geoToInput.vm.$emit('blur')

        expect(wrapper.vm.toRawDate).toEqual(today)
        expect(wrapper.emitted()['emit-to-date']).toBeDefined()
        expect(wrapper.emitted()['emit-to-date'][0][0]).toEqual({ toDate: today })
      })

      it('Sets wrong date', () => {
        const wrapper = getWrappedComponent()
        const geoToInput = wrapper.findAll(GeoInput).at(1)
        geoToInput.vm.$emit('focus')
        wrapper.setData({
          toFormattedDate: 'rrr'
        })
        geoToInput.vm.$emit('blur')

        expect(wrapper.vm.toRawDate).toBe(null)
        expect(wrapper.vm.showToFormatError).toBe(true)
        expect(wrapper.emitted()['emit-to-date']).toBeDefined()
        expect(wrapper.emitted()['emit-to-date'][0][0]).toEqual({ toDate: null })

        wrapper.setData({
          toFormattedDate: ''
        })

        geoToInput.vm.$emit('blur')
        expect(wrapper.vm.showToFormatError).toBe(false)
        expect(wrapper.vm.toRawDate).toBe(null)
        expect(wrapper.emitted()['emit-to-date']).toBeDefined()
        expect(wrapper.emitted()['emit-to-date'][1][0]).toEqual({ toDate: null })
      })
    })

    describe('Select From and To input consecutively', () => {
      it('Should fill both inputs automatically', () => {
        const wrapper = getWrappedComponent()
        const calendarPicker = wrapper.vm.$refs.calendarPicker
        const initialDate = today
        const endDate = addDays(today, 4)
        calendarPicker.$emit('select-day', initialDate)
        calendarPicker.$emit('select-day', endDate)
        expect(wrapper.vm.fromRawDate).toStrictEqual(initialDate)
        expect(wrapper.vm.toRawDate).toStrictEqual(endDate)
        expect(wrapper.vm.fromFormattedDate).toBe('30/07/2019')
        expect(wrapper.vm.toFormattedDate).toBe('03/08/2019')
        expect(wrapper.emitted()['emit-from-date']).toBeDefined()
        expect(wrapper.emitted()['emit-to-date']).toBeDefined()
        expect(wrapper.emitted()['emit-from-date'][0][0]).toEqual({ fromDate: initialDate })
        expect(wrapper.emitted()['emit-to-date'][0][0]).toEqual({ toDate: null })
        expect(wrapper.emitted()['emit-from-date'][1][0]).toEqual({ fromDate: initialDate })
        expect(wrapper.emitted()['emit-to-date'][1][0]).toEqual({ toDate: endDate })
      })

      it('Should swap dates if fromDate is after toDate or viceversa', () => {
        const wrapper = getWrappedComponent()
        const geoFromInput = wrapper.findAll(GeoInput).at(0)
        const geoToInput = wrapper.findAll(GeoInput).at(1)

        geoFromInput.vm.$emit('focus')
        wrapper.setData({
          fromFormattedDate: '10/04/2019'
        })
        geoFromInput.vm.$emit('blur')
        geoToInput.vm.$emit('focus')
        wrapper.setData({
          toFormattedDate: '05/04/2019'
        })
        geoToInput.vm.$emit('blur')

        expect(wrapper.vm.fromFormattedDate).toBe('05/04/2019')
        expect(wrapper.vm.toFormattedDate).toBe('10/04/2019')

        wrapper.setData({
          fromFormattedDate: '',
          toFormattedDate: ''
        })
        geoFromInput.vm.$emit('blur')
        geoToInput.vm.$emit('blur')

        wrapper.setData({
          toFormattedDate: '05/04/2019'
        })
        geoToInput.vm.$emit('blur')

        expect(wrapper.vm.toFormattedDate).toBe('05/04/2019')

        wrapper.setData({
          fromFormattedDate: '10/04/2019'
        })
        geoFromInput.vm.$emit('blur')

        expect(wrapper.vm.fromFormattedDate).toBe('05/04/2019')
        expect(wrapper.vm.toFormattedDate).toBe('10/04/2019')
      })
    })
  })

  describe('Date constraints shortchuts', () => {
    describe('Calendar with no date constraints', () => {
      it('Should not render the buttons', () => {
        const wrapper = getWrappedComponent()
        expect(wrapper.find('.geo-button--link').exists()).toBe(false)
      })

      it('Should not do anything if executing the method', () => {
        const wrapper = getWrappedComponent()
        wrapper.vm.selectDay(today)
        wrapper.vm.selectDay(addDays(today, 15))

        expect(wrapper.find('.geo-button--link').exists()).toBe(false)
        expect(wrapper.vm.fromRawDate).toEqual(today)
        expect(wrapper.vm.toRawDate).toEqual(addDays(today, 15))

        wrapper.vm.setEarliestDate()
        wrapper.vm.setLatestDate()

        expect(wrapper.vm.fromRawDate).toEqual(today)
        expect(wrapper.vm.toRawDate).toEqual(addDays(today, 15))
      })
    })

    describe('Calendar with date constraints', () => {
      it('Should render the buttons', () => {
        const wrapper = getWrappedComponent()
        wrapper.setProps({
          earliestDate: subYears(today, 1),
          latestDate: addYears(today, 1)
        })
        expect(wrapper.find('.geo-button--link').exists()).toBe(true)
        expect(wrapper.findAll('.geo-button--link').at(0).text()).toBe('Earliest date')
        expect(wrapper.findAll('.geo-button--link').at(1).text()).toBe('Latest date')
      })

      it('Pressing the buttons should set the according dates', () => {
        const wrapper = getWrappedComponent()
        const earliestDate = subYears(today, 1)
        const latestDate = addYears(today, 1)
        wrapper.setProps({
          earliestDate: earliestDate,
          latestDate: latestDate
        })
        wrapper.findAll(GeoLinkButton).at(0).trigger('click')
        expect(wrapper.vm.fromRawDate).toEqual(earliestDate)
        expect(wrapper.vm.fromFormattedDate).toEqual('30/07/2018')
        expect(wrapper.emitted()['emit-from-date']).toBeDefined()
        expect(wrapper.emitted()['emit-from-date'][0][0]).toEqual({ fromDate: earliestDate })

        wrapper.findAll(GeoLinkButton).at(1).trigger('click')
        expect(wrapper.vm.toRawDate).toEqual(latestDate)
        expect(wrapper.vm.toFormattedDate).toEqual('30/07/2020')
        expect(wrapper.emitted()['emit-to-date']).toBeDefined()
        expect(wrapper.emitted()['emit-to-date'][0][0]).toEqual({ toDate: latestDate })
      })
    })
  })

  describe('Initial Date', () => {
    it('Should set currentMonth and currentYear according to initialDateInGrid prop ', () => {
      const wrapper = shallowMount(GeoCalendar, {
        stubs: [
          'geo-input',
          'font-awesome-icon',
          'geo-calendar-picker'
        ],
        propsData: {
          calendarNavigationSelectIcon: ['fas', 'arrow-left'],
          nextDateInSelectedGranularityIcon: ['fas', 'arrow-left'],
          previousDateInSelectedGranularityIcon: ['fas', 'arrow-left'],
          pickerDateUnit: PICKER_DATE_UNITS.day,
          granularityId: GRANULARITY_IDS.day,
          locale: {},
          initialDateInGrid: subYears(subMonths(today, 3), 5)
        }
      })

      expect(wrapper.vm.currentMonth).toBe(3)
      expect(wrapper.vm.currentYear).toBe(2014)
    })

    it('Should set currentMonth and currentYear according to defaultToDate prop', () => {
      const wrapper = shallowMount(GeoCalendar, {
        stubs: [
          'geo-input',
          'font-awesome-icon',
          'geo-calendar-picker'
        ],
        propsData: {
          calendarNavigationSelectIcon: ['fas', 'arrow-left'],
          nextDateInSelectedGranularityIcon: ['fas', 'arrow-left'],
          previousDateInSelectedGranularityIcon: ['fas', 'arrow-left'],
          pickerDateUnit: PICKER_DATE_UNITS.day,
          granularityId: GRANULARITY_IDS.day,
          locale: {},
          initialDateInGrid: subYears(subMonths(today, 3), 5),
          defaultFromDate: subYears(subMonths(today, 3), 5),
          defaultToDate: subYears(subMonths(today, 3), 4)
        }
      })

      expect(wrapper.vm.currentMonth).toBe(3)
      expect(wrapper.vm.currentYear).toBe(2015)
    })
  })

  describe('Watchers', () => {
    it('Should set to null both dates if changing granularity', () => {
      const wrapper = getWrappedComponent()
      wrapper.setData({
        fromRawDate: today,
        toRawDate: addDays(today, 4)
      })

      expect(wrapper.vm.fromRawDate).toBe(today)
      expect(wrapper.vm.toRawDate).toEqual(addDays(today, 4))

      wrapper.setProps({
        granularityId: GRANULARITY_IDS.month
      })

      expect(wrapper.vm.fromRawDate).toBe(null)
      expect(wrapper.vm.toRawDate).toBe(null)
    })
  })

  describe('Calendar Flows', () => {
    describe('Explicitly focused inputs', () => {
      it('Sets from input if it is explicitly focused', () => {
        const wrapper = getWrappedComponent()
        const geoFromInput = wrapper.findAll(GeoInput).at(0)

        wrapper.setData({
          fromRawDate: today,
          fromFormattedDate: '30/07/2019'
        })

        expect(wrapper.vm.toRawDate).toBe(null)

        geoFromInput.vm.$emit('focus')

        wrapper.vm.selectDay(addDays(today, 3))
        expect(wrapper.vm.fromRawDate).toEqual(addDays(today, 3))
        expect(wrapper.vm.fromFormattedDate).toEqual('02/08/2019')
        expect(wrapper.vm.toRawDate).toEqual(null)
      })

      it('Sets to input if it is explicitly focused', () => {
        const wrapper = getWrappedComponent()
        const geoToInput = wrapper.findAll(GeoInput).at(1)

        expect(wrapper.vm.fromRawDate).toBe(null)
        expect(wrapper.vm.toRawDate).toBe(null)

        geoToInput.vm.$emit('focus')

        wrapper.vm.selectDay(today)
        expect(wrapper.vm.toRawDate).toEqual(today)
        expect(wrapper.vm.toFormattedDate).toEqual('30/07/2019')
        expect(wrapper.vm.fromRawDate).toEqual(null)
      })
    })

    describe('Natural Flows', () => {
      describe('Closed range is not still set', () => {
        it('Should keep setting fromDate if selected day is before current fromRawDate', () => {
          const wrapper = getWrappedComponent()
          expect(wrapper.vm.fromRawDate).toEqual(null)
          expect(wrapper.vm.toRawDate).toEqual(null)

          wrapper.vm.selectDay(today)
          expect(wrapper.vm.fromRawDate).toEqual(today)
          expect(wrapper.vm.toRawDate).toEqual(null)

          wrapper.vm.selectDay(subDays(today, 1))
          expect(wrapper.vm.fromRawDate).toEqual(subDays(today, 1))
          expect(wrapper.vm.toRawDate).toEqual(null)

          wrapper.vm.selectDay(subDays(today, 2))
          expect(wrapper.vm.fromRawDate).toEqual(subDays(today, 2))
          expect(wrapper.vm.toRawDate).toEqual(null)

          wrapper.vm.selectDay(subDays(today, 3))
          expect(wrapper.vm.fromRawDate).toEqual(subDays(today, 3))
          expect(wrapper.vm.toRawDate).toEqual(null)
        })

        it('Should set toDate if selected date is later than current fromRawDate', () => {
          const wrapper = getWrappedComponent()
          expect(wrapper.vm.fromRawDate).toEqual(null)
          expect(wrapper.vm.toRawDate).toEqual(null)

          wrapper.vm.selectDay(today)
          expect(wrapper.vm.fromRawDate).toEqual(today)
          expect(wrapper.vm.toRawDate).toEqual(null)

          wrapper.vm.selectDay(subDays(today, 1))
          expect(wrapper.vm.fromRawDate).toEqual(subDays(today, 1))
          expect(wrapper.vm.toRawDate).toEqual(null)

          wrapper.vm.selectDay(subDays(today, 2))
          expect(wrapper.vm.fromRawDate).toEqual(subDays(today, 2))
          expect(wrapper.vm.toRawDate).toEqual(null)

          wrapper.vm.selectDay(subDays(today, 3))
          expect(wrapper.vm.fromRawDate).toEqual(subDays(today, 3))
          expect(wrapper.vm.toRawDate).toEqual(null)

          wrapper.vm.selectDay(today)
          expect(wrapper.vm.fromRawDate).toEqual(subDays(today, 3))
          expect(wrapper.vm.toRawDate).toEqual(today)
        })
      })

      describe('Closed range is set', () => {
        it('Should set fromDate is selected day is closer to fromDate than toDate', () => {
          const wrapper = getWrappedComponent()
          expect(wrapper.vm.fromRawDate).toEqual(null)
          expect(wrapper.vm.toRawDate).toEqual(null)

          wrapper.vm.selectDay(today)
          expect(wrapper.vm.fromRawDate).toEqual(today)
          expect(wrapper.vm.toRawDate).toEqual(null)

          wrapper.vm.selectDay(addDays(today, 10))
          expect(wrapper.vm.fromRawDate).toEqual(today)
          expect(wrapper.vm.toRawDate).toEqual(addDays(today, 10))

          wrapper.vm.selectDay(addDays(today, 3))
          expect(wrapper.vm.fromRawDate).toEqual(addDays(today, 3))
          expect(wrapper.vm.toRawDate).toEqual(addDays(today, 10))
        })

        it('Should set toDate is selected day is closer to toDate than fromDate', () => {
          const wrapper = getWrappedComponent()
          expect(wrapper.vm.fromRawDate).toEqual(null)
          expect(wrapper.vm.toRawDate).toEqual(null)

          wrapper.vm.selectDay(today)
          expect(wrapper.vm.fromRawDate).toEqual(today)
          expect(wrapper.vm.toRawDate).toEqual(null)

          wrapper.vm.selectDay(addDays(today, 10))
          expect(wrapper.vm.fromRawDate).toEqual(today)
          expect(wrapper.vm.toRawDate).toEqual(addDays(today, 10))

          wrapper.vm.selectDay(addDays(today, 8))
          expect(wrapper.vm.fromRawDate).toEqual(today)
          expect(wrapper.vm.toRawDate).toEqual(addDays(today, 8))
        })
      })
    })

    describe('Highlighting events', () => {
      describe('Day picker', () => {
        it('Should highlight fromDate input', () => {
          const wrapper = getWrappedComponent()
          const geoCalendarPickerWrapper = wrapper.find(GeoCalendarPicker)

          geoCalendarPickerWrapper.vm.$emit('day-unit-mouseover', today)
          expect(wrapper.vm.lastInputFieldFocused).toBe(FOCUSABLE_INPUT_FIELDS.FROM_DATE)

          wrapper.vm.selectDay(today)
          geoCalendarPickerWrapper.vm.$emit('day-unit-mouseover', subDays(today, 1))
          expect(wrapper.vm.lastInputFieldFocused).toBe(FOCUSABLE_INPUT_FIELDS.FROM_DATE)
        })

        it('Should highlight toDate input', () => {
          const wrapper = getWrappedComponent()
          const geoCalendarPickerWrapper = wrapper.find(GeoCalendarPicker)

          wrapper.vm.selectDay(today)
          geoCalendarPickerWrapper.vm.$emit('day-unit-mouseover', addDays(today, 2))
          expect(wrapper.vm.lastInputFieldFocused).toBe(FOCUSABLE_INPUT_FIELDS.TO_DATE)

          wrapper.vm.selectDay(addDays(today, 3))
          geoCalendarPickerWrapper.vm.$emit('day-unit-mouseover', addDays(today, 5))
          expect(wrapper.vm.lastInputFieldFocused).toBe(FOCUSABLE_INPUT_FIELDS.TO_DATE)
        })

        it('Should not highlight anything if there is a field explicitly focused', () => {
          const wrapper = getWrappedComponent()
          const geoCalendarPickerWrapper = wrapper.find(GeoCalendarPicker)

          wrapper.vm.selectDay(today)
          geoCalendarPickerWrapper.vm.$emit('day-unit-mouseover', addDays(today, 2))
          expect(wrapper.vm.lastInputFieldFocused).toBe(FOCUSABLE_INPUT_FIELDS.TO_DATE)

          wrapper.vm.selectDay(addDays(today, 3))
          wrapper.vm.isSomeInputFieldExplicitlyFocused = true

          geoCalendarPickerWrapper.vm.$emit('day-unit-mouseover', addDays(today, 5))
          expect(wrapper.vm.lastInputFieldFocused).toBe(null)
        })

        it('Should highlight fromDate input if isToDateDisabled prop is set', () => {
          const wrapper = getWrappedComponent()
          wrapper.setProps({ isToDateDisabled: true })
          const geoCalendarPickerWrapper = wrapper.find(GeoCalendarPicker)

          wrapper.vm.selectDay(today)
          geoCalendarPickerWrapper.vm.$emit('day-unit-mouseover', addDays(today, 2))
          expect(wrapper.vm.lastInputFieldFocused).toBe(FOCUSABLE_INPUT_FIELDS.FROM_DATE)

          wrapper.vm.selectDay(addDays(today, 3))
          geoCalendarPickerWrapper.vm.$emit('day-unit-mouseover', addDays(today, 5))
          expect(wrapper.vm.lastInputFieldFocused).toBe(FOCUSABLE_INPUT_FIELDS.FROM_DATE)
        })

        it('Should highlight toDate input if isFromDateDisabled prop is set', () => {
          const wrapper = getWrappedComponent()
          wrapper.setProps({ isFromDateDisabled: true })
          const geoCalendarPickerWrapper = wrapper.find(GeoCalendarPicker)

          geoCalendarPickerWrapper.vm.$emit('day-unit-mouseover', today)
          expect(wrapper.vm.lastInputFieldFocused).toBe(FOCUSABLE_INPUT_FIELDS.TO_DATE)

          wrapper.vm.selectDay(today)
          geoCalendarPickerWrapper.vm.$emit('day-unit-mouseover', subDays(today, 1))
          expect(wrapper.vm.lastInputFieldFocused).toBe(FOCUSABLE_INPUT_FIELDS.TO_DATE)
        })
      })

      describe('Month picker', () => {
        it('Should highlight fromDate input', () => {
          const wrapper = getWrappedComponent()
          const geoCalendarPickerWrapper = wrapper.find(GeoCalendarPicker)

          geoCalendarPickerWrapper.vm.$emit('month-unit-mouseover', 2)
          expect(wrapper.vm.lastInputFieldFocused).toBe(FOCUSABLE_INPUT_FIELDS.FROM_DATE)

          wrapper.vm.selectMonth(2)
          geoCalendarPickerWrapper.vm.$emit('day-unit-mouseover', 1)
          expect(wrapper.vm.lastInputFieldFocused).toBe(FOCUSABLE_INPUT_FIELDS.FROM_DATE)
        })

        it('Should highlight toDate input', () => {
          const wrapper = getWrappedComponent()
          const geoCalendarPickerWrapper = wrapper.find(GeoCalendarPicker)

          wrapper.vm.selectMonth(2)
          geoCalendarPickerWrapper.vm.$emit('month-unit-mouseover', 4)
          expect(wrapper.vm.lastInputFieldFocused).toBe(FOCUSABLE_INPUT_FIELDS.TO_DATE)

          wrapper.vm.selectMonth(4)
          geoCalendarPickerWrapper.vm.$emit('month-unit-mouseover', 5)
          expect(wrapper.vm.lastInputFieldFocused).toBe(FOCUSABLE_INPUT_FIELDS.TO_DATE)
        })

        it('Should not highlight anything if there is a field explicitly focused', () => {
          const wrapper = getWrappedComponent()
          const geoCalendarPickerWrapper = wrapper.find(GeoCalendarPicker)

          wrapper.vm.selectMonth(2)
          geoCalendarPickerWrapper.vm.$emit('month-unit-mouseover', 4)
          expect(wrapper.vm.lastInputFieldFocused).toBe(FOCUSABLE_INPUT_FIELDS.TO_DATE)

          wrapper.vm.selectMonth(5)
          wrapper.vm.isSomeInputFieldExplicitlyFocused = true

          geoCalendarPickerWrapper.vm.$emit('month-unit-mouseover', 6)
          expect(wrapper.vm.lastInputFieldFocused).toBe(null)
        })

        it('Should highlight fromDate input if isToDateDisabled prop is set', () => {
          const wrapper = getWrappedComponent()
          wrapper.setProps({ isToDateDisabled: true })
          const geoCalendarPickerWrapper = wrapper.find(GeoCalendarPicker)

          wrapper.vm.selectMonth(2)
          geoCalendarPickerWrapper.vm.$emit('month-unit-mouseover', 4)
          expect(wrapper.vm.lastInputFieldFocused).toBe(FOCUSABLE_INPUT_FIELDS.FROM_DATE)

          wrapper.vm.selectMonth(4)
          geoCalendarPickerWrapper.vm.$emit('month-unit-mouseover', 5)
          expect(wrapper.vm.lastInputFieldFocused).toBe(FOCUSABLE_INPUT_FIELDS.FROM_DATE)
        })

        it('Should highlight toDate input if isFromDateDisabled prop is set', () => {
          const wrapper = getWrappedComponent()
          wrapper.setProps({ isFromDateDisabled: true })
          const geoCalendarPickerWrapper = wrapper.find(GeoCalendarPicker)

          geoCalendarPickerWrapper.vm.$emit('month-unit-mouseover', 2)
          expect(wrapper.vm.lastInputFieldFocused).toBe(FOCUSABLE_INPUT_FIELDS.TO_DATE)

          wrapper.vm.selectMonth(2)
          geoCalendarPickerWrapper.vm.$emit('day-unit-mouseover', 1)
          expect(wrapper.vm.lastInputFieldFocused).toBe(FOCUSABLE_INPUT_FIELDS.TO_DATE)
        })
      })

      describe('Year picker', () => {
        it('Should highlight fromDate input', () => {
          const wrapper = getWrappedComponent()
          const geoCalendarPickerWrapper = wrapper.find(GeoCalendarPicker)

          geoCalendarPickerWrapper.vm.$emit('year-unit-mouseover', today)
          expect(wrapper.vm.lastInputFieldFocused).toBe(FOCUSABLE_INPUT_FIELDS.FROM_DATE)

          wrapper.vm.selectYear(2015)
          geoCalendarPickerWrapper.vm.$emit('year-unit-mouseover', 2013)
          expect(wrapper.vm.lastInputFieldFocused).toBe(FOCUSABLE_INPUT_FIELDS.FROM_DATE)
        })

        it('Should highlight toDate input', () => {
          const wrapper = getWrappedComponent()
          const geoCalendarPickerWrapper = wrapper.find(GeoCalendarPicker)

          wrapper.vm.selectYear(2012)
          geoCalendarPickerWrapper.vm.$emit('year-unit-mouseover', 2015)
          expect(wrapper.vm.lastInputFieldFocused).toBe(FOCUSABLE_INPUT_FIELDS.TO_DATE)

          wrapper.vm.selectYear(2015)
          geoCalendarPickerWrapper.vm.$emit('year-unit-mouseover', 2016)
          expect(wrapper.vm.lastInputFieldFocused).toBe(FOCUSABLE_INPUT_FIELDS.TO_DATE)
        })

        it('Should not highlight anything if there is a field explicitly focused', () => {
          const wrapper = getWrappedComponent()
          const geoCalendarPickerWrapper = wrapper.find(GeoCalendarPicker)

          wrapper.vm.selectYear(2012)
          geoCalendarPickerWrapper.vm.$emit('year-unit-mouseover', 2015)
          expect(wrapper.vm.lastInputFieldFocused).toBe(FOCUSABLE_INPUT_FIELDS.TO_DATE)

          wrapper.vm.selectYear(2015)
          wrapper.vm.isSomeInputFieldExplicitlyFocused = true

          geoCalendarPickerWrapper.vm.$emit('year-unit-mouseover', 2016)
          expect(wrapper.vm.lastInputFieldFocused).toBe(null)
        })

        it('Should highlight fromDate input if isToDateDisabled prop is set', () => {
          const wrapper = getWrappedComponent()
          wrapper.setProps({ isToDateDisabled: true })
          const geoCalendarPickerWrapper = wrapper.find(GeoCalendarPicker)

          wrapper.vm.selectYear(2012)
          geoCalendarPickerWrapper.vm.$emit('year-unit-mouseover', 2015)
          expect(wrapper.vm.lastInputFieldFocused).toBe(FOCUSABLE_INPUT_FIELDS.FROM_DATE)

          wrapper.vm.selectYear(2015)
          geoCalendarPickerWrapper.vm.$emit('year-unit-mouseover', 2016)
          expect(wrapper.vm.lastInputFieldFocused).toBe(FOCUSABLE_INPUT_FIELDS.FROM_DATE)
        })

        it('Should highlight toDate input if isFromDateDisabled prop is set', () => {
          const wrapper = getWrappedComponent()
          wrapper.setProps({ isFromDateDisabled: true })
          const geoCalendarPickerWrapper = wrapper.find(GeoCalendarPicker)

          geoCalendarPickerWrapper.vm.$emit('year-unit-mouseover', today)
          expect(wrapper.vm.lastInputFieldFocused).toBe(FOCUSABLE_INPUT_FIELDS.TO_DATE)

          wrapper.vm.selectYear(2015)
          geoCalendarPickerWrapper.vm.$emit('year-unit-mouseover', 2013)
          expect(wrapper.vm.lastInputFieldFocused).toBe(FOCUSABLE_INPUT_FIELDS.TO_DATE)
        })
      })
    })
  })
})

function getWrappedComponent () {
  return mount(GeoCalendar, {
    stubs: {
      GeoInput,
      GeoCalendarPicker,
      GeoLinkButton,
      GeoButton,
      'font-awesome-icon': true,
      'geo-calendar-navigation': true,
      'geo-calendar-grid': true,
      'geo-dropdown': true,
      'geo-input-message': true
    },
    slots: {
      earliestDatePlaceholder: 'Earliest date',
      latestDatePlaceholder: 'Latest date',
      pickerGranularity: '<div> Granularity Selectors </div>'
    },
    propsData: {
      calendarNavigationSelectIcon: ['fas', 'arrow-left'],
      nextDateInSelectedGranularityIcon: ['fas', 'arrow-left'],
      previousDateInSelectedGranularityIcon: ['fas', 'arrow-left'],
      pickerDateUnit: PICKER_DATE_UNITS.day,
      granularityId: GRANULARITY_IDS.day,
      locale: {}
    }
  })
}
