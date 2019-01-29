<template>
  <div
    v-if="hasMultiplePages"
    :class="`geo-table-pagination${cssSuffix}`"
  >
    <!-- @slot Use this slot to customize the shortcut to display first page of data -->
    <slot
      :action="goToFirstPage"
      :is-not-first-page="isNotFirstPage"
      :has-previous-page="hasPreviousPage"
      :has-next-page="hasNextPage"
      :is-not-last-page="isNotLastPage"
      name="firstPageShortcut"
    >
      <font-awesome-icon
        v-if="isNotFirstPage"
        :icon="['fal', 'step-backward']"
        class="geo-table-pagination__action-first"
        aria-hidden="true"
        fixed-width
        @click="goToFirstPage()"
      />
      <div
        v-else
        class="geo-table-pagination__action-first--disabled"
        aria-hidden="true"
      />
    </slot>

    <!-- @slot Use this slot to customize the button to display previous page of data -->
    <slot
      :action="goToPreviousPage"
      :is-not-first-page="isNotFirstPage"
      :has-previous-page="hasPreviousPage"
      :has-next-page="hasNextPage"
      :is-not-last-page="isNotLastPage"
      name="prevPageShortcut"
    >
      <font-awesome-icon
        v-if="hasPreviousPage"
        :icon="['fal', 'chevron-left']"
        class="geo-table-pagination__action-prev"
        aria-hidden="true"
        fixed-width
        @click="goToPreviousPage()"
      />
      <div
        v-else
        class="geo-table-pagination__action-prev--disabled"
        aria-hidden="true"
      />
    </slot>

    <div class="geo-table-pagination__current-range">
      <!-- @slot Use this slot to customize how currently displayed range is shown -->
      <slot
        :is-not-first-page="isNotFirstPage"
        :has-previous-page="hasPreviousPage"
        :has-next-page="hasNextPage"
        :is-not-last-page="isNotLastPage"
        :current-page="currentPage"
        :page-size="pageSize"
        :source-data-length="sourceDataLength"
        :range-start="rangeStart"
        :range-end="rangeEnd"
      >
        {{ rangeStart }}-{{ rangeEnd }} ({{ sourceDataLength }})
      </slot>
    </div>

    <!-- @slot Use this slot to customize the button to display next page of data -->
    <slot
      :action="goToNextPage"
      :is-not-first-page="isNotFirstPage"
      :has-previous-page="hasPreviousPage"
      :has-next-page="hasNextPage"
      :is-not-last-page="isNotLastPage"
      name="nextPageShortcut"
    >
      <font-awesome-icon
        v-if="hasNextPage"
        :icon="['fal', 'chevron-right']"
        class="geo-table-pagination__action-next"
        aria-hidden="true"
        fixed-width
        @click="goToNextPage()"
      />
      <div
        v-else
        class="geo-table-pagination__action-next--disabled"
        aria-hidden="true"
      />
    </slot>

    <!-- @slot Use this slot to customize the shortcut to display last page of data -->
    <slot
      :action="goToLastPage"
      :is-not-first-page="isNotFirstPage"
      :has-previous-page="hasPreviousPage"
      :has-next-page="hasNextPage"
      :is-not-last-page="isNotLastPage"
      name="lastPageShortcut"
    >
      <font-awesome-icon
        v-if="isNotLastPage"
        :icon="['fal', 'step-forward']"
        class="geo-table-pagination__action-last"
        aria-hidden="true"
        fixed-width
        @click="goToLastPage()"
      />
      <div
        v-else
        class="geo-table-pagination__action-last--disabled"
        aria-hidden="true"
      />
    </slot>
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'
import paginationMixin from './GeoTablePaginationMixin'

export default {
  name: 'GeoTablePagination',
  status: 'missing-tests',
  release: '9.5.0',
  mixins: [paginationMixin, cssSuffix]
}
</script>
