<template>
  <div
    :class="{
      'geo-table-sort': true,
      'geo-table-sort--active': currentlySortingTable
    }"
  >
    <!-- @slot _Optional_. Use this slot to customize the button used to sort in `asc` order -->
    <slot
      :action="sortAsc"
      :is-current-sorting-direction="isCurrentlyAscendingOrdered"
      name="sortAscButton"
    >
      <font-awesome-icon
        :icon="sortAscendingIcon"
        :class="{
          'geo-table-sort__button': true,
          'geo-table-sort__button--asc': true,
          'geo-table-sort__button--active': isCurrentlyAscendingOrdered
        }"
        aria-hidden="true"
        fixed-width
        @click="sortAsc()"
      />
    </slot>

    <!-- @slot _Optional_. Use this slot to customize the button used to sort in `desc` order -->
    <slot
      :action="sortDesc"
      :is-current-sorting-direction="isCurrentlyDescendingOrdered"
      name="sortDescButton"
    >
      <font-awesome-icon
        :icon="sortDescendingIcon"
        :class="{
          'geo-table-sort__button': true,
          'geo-table-sort__button--desc': true,
          'geo-table-sort__button--active': isCurrentlyDescendingOrdered
        }"
        aria-hidden="true"
        fixed-width
        @click="sortDesc()"
      />
    </slot>
  </div>
</template>

<script>
import { SORTING_DIRECTIONS } from './GeoTable.constants'
import { enumPropertyFactory } from '../../utils/enumPropertyFactory'

/**
 * `GeoTableSort` is a component which fits nicely in a [GeoTable](./GeoTable)
 * header. It's designed to display buttons to sort data in a table by their
 * values in a specific column.
 */
export default {
  name: 'GeoTableSort',
  status: 'ready',
  release: '10.1.0',
  constants: { SORTING_DIRECTIONS },
  props: {
    /**
     * Direction by which data is being currently sorted. Used only to highlight
     * current status.
     */
    currentSortingDirection: enumPropertyFactory({
      componentName: 'GeoTableSort',
      propertyName: 'currentSortingDirection',
      enumDictionary: SORTING_DIRECTIONS,
      required: true
    }),

    /**
     * Whether table is being sorted using the criteria represented by this
     * sorter or not. Used only to highlight current status.
     */
    currentlySortingTable: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    isCurrentlyAscendingOrdered () {
      return this.currentlySortingTable && this.currentSortingDirection === SORTING_DIRECTIONS.asc
    },

    isCurrentlyDescendingOrdered () {
      return this.currentlySortingTable && this.currentSortingDirection === SORTING_DIRECTIONS.desc
    },

    sortAscendingIcon () {
      return [
        this.isCurrentlyAscendingOrdered ? 'fas' : 'fal',
        'caret-up'
      ]
    },

    sortDescendingIcon () {
      return [
        this.isCurrentlyDescendingOrdered ? 'fas' : 'fal',
        'caret-down'
      ]
    }
  },
  methods: {
    sortAsc () {
      this.sort(SORTING_DIRECTIONS.asc)
    },

    sortDesc () {
      this.sort(SORTING_DIRECTIONS.desc)
    },

    sort (direction) {
      /**
       * User wants to sort data using the criteria represented by this sorter
       * in the direction passed as parameter.
       *
       * Check `SORTING_DIRECTIONS` named export for possible directions.
       *
       * @event sort
       * @type {string}
       */
      this.$emit('sort', direction)
    }
  }
}
</script>
