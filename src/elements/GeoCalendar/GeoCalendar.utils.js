import { isBefore, isAfter, startOfDay, isEqual, isWithinRange } from 'date-fns'

export const PICKER_DATE_UNITS = {
  day: 'day',
  month: 'month',
  year: 'year'
}

export const GRANULARITY_IDS = {
  day: 'day',
  week: 'week',
  month: 'month',
  quarter: 'quarter',
  year: 'year'
}

export const YEAR_GRID_CONSTANTS = {
  MAX_YEAR: 2099,
  MIN_YEAR: 1970,
  YEARS_IN_GRID: 16
}

export const DAY_GRID_CONSTANTS = {
  TOTAL_DAYS_IN_WEEK: 7,
  MONDAY_INDEX_IN_WEEK: 1
}

export const MONTH_GRID_CONSTANTS = {
  NUMBER_OF_MONTHS_IN_GREGORIAN_CALENDAR: 12
}

export const FOCUSABLE_INPUT_FIELDS = {
  FROM_DATE: 'FROM_DATE',
  TO_DATE: 'TO_DATE'
}

export const isDayUnavailable = (vm, day) => {
  return isBeforeDay(day, vm.earliestDate) || isAfterDay(day, vm.latestDate)
}

const isBeforeDay = (dateRef, dateToCompare) => {
  return isBefore(startOfDay(dateRef), startOfDay(dateToCompare))
}

const isAfterDay = (dateRef, dateToCompare) => {
  return isAfter(startOfDay(dateRef), startOfDay(dateToCompare))
}

const isEqualDay = (dateRef, dateToCompare) => {
  return isEqual(startOfDay(dateRef), startOfDay(dateToCompare))
}

const isDayWithinRange = (dateRef, rangeStartDate, rangeEndDate) => {
  return isWithinRange(startOfDay(dateRef), startOfDay(rangeStartDate), startOfDay(rangeEndDate))
}

export {
  isBeforeDay as isBefore,
  isAfterDay as isAfter,
  isEqualDay as isEqual,
  isDayWithinRange as isWithinRange
}
