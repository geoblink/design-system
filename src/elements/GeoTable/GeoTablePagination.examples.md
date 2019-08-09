`GeoTablePagination` is a component designed to fit nicely in a
[GeoTable](./#/Elements/GeoTable?id=geotable-1) footer.
It displays controls for paginated content, including shortcuts to display first
and last page of content, as well as a currently visible range.

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Default pagination</h3>
    <div class="element-demo__block">
      <div class="element-demo__bordered-box">
        <geo-table-pagination
          :current-page="currentPage"
          :page-size="pageSize"
          :source-data-length="sourceDataLength"
          @go-to-page="goToPage($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPage: 0
    }
  },
  computed: {
    pageSize () {
      return 10
    },

    sourceDataLength () {
      return 35
    }
  },
  methods: {
    goToPage (page) {
      this.currentPage = page
    }
  }
}
</script>
```

## Customizing actions

There are 4 slots which allow customizing the actions displayed in the pagination:

- `firstPageShortcut`
- `prevPageShortcut`
- `nextPageShortcut`
- `lastPageShortcut`

All of them are scoped slots, taking as scoped parameters:

- `action`: function to be called in order to emit proper change page event.
Note that each slot has a different function bound to this property.
- `isNotFirstPage`: `boolean` value telling whether currently displayed page is
the first one (`false`) or not (`true`). Useful to show or hide first page
shortcut accordingly.
- `hasPreviousPage`: `boolean` value telling whether there is a previous page that
could be displayed (`true`) or not (`false`). Useful to show or hide previous
page shortcut accordingly.
- `hasNextPage`: `boolean` value telling whether there is a next page that could
be displayed (`true`) or not (`false`). Useful to show or hide next page shortcut
accordingly.
- `isNotLastPage`: `boolean` value telling whether currently displayed page is
the last one (`false`) or not (`true`). Useful to show or hide last page
shortcut accordingly.

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Custom actions</h3>
    <div class="element-demo__block">
      <div class="element-demo__bordered-box">
        <geo-table-pagination
          :current-page="currentPage"
          :page-size="pageSize"
          :source-data-length="sourceDataLength"
          @go-to-page="goToPage($event)"
        >
          <template slot="firstPageShortcut" slot-scope="{ action, isNotFirstPage }">
            <a v-if="isNotFirstPage" @click="action">Go to first</a>
          </template>
          <template slot="prevPageShortcut" slot-scope="{ action, hasPreviousPage }">
            <a v-if="hasPreviousPage" @click="action" style="margin-left: 10px;">« Go to previous page</a>
          </template>
          <template slot="nextPageShortcut" slot-scope="{ action, hasNextPage }">
            <a v-if="hasNextPage" @click="action" style="margin-right: 10px;">Go to next page »</a>
          </template>
          <template slot="lastPageShortcut" slot-scope="{ action, isNotLastPage }">
            <a v-if="isNotLastPage" @click="action">Go to last</a>
          </template>
        </geo-table-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPage: 0
    }
  },
  computed: {
    pageSize () {
      return 10
    },

    sourceDataLength () {
      return 35
    }
  },
  methods: {
    goToPage (page) {
      this.currentPage = page
    }
  }
}
</script>
```

## Customizing displayed range

Just like pagination actions can be customized, the text displaying currently
visible range is customizable, too. To do so, use the `default` slot of
`GeoTablePagination`. It's a scoped slot which takes as scoped parameters:

- `isNotFirstPage`: `boolean` value telling whether currently displayed page is
the first one (`false`) or not (`true`). Useful to show or hide first page
shortcut accordingly.
- `hasPreviousPage`: `boolean` value telling whether there is a previous page that
could be displayed (`true`) or not (`false`). Useful to show or hide previous
page shortcut accordingly.
- `hasNextPage`: `boolean` value telling whether there is a next page that could
be displayed (`true`) or not (`false`). Useful to show or hide next page shortcut
accordingly.
- `isNotLastPage`: `boolean` value telling whether currently displayed page is
the last one (`false`) or not (`true`). Useful to show or hide last page
shortcut accordingly.

- `currentPage`: `number`. Page currently being displayed.
shortcut accordingly.
- `pageSize`: `number`. Amount of items displayed in a single page at most.
- `sourceDataLength`: `number`. Total amount of items handled by parent table.
- `rangeStart`: `number`. Index of the first item being displayed.
- `rangeEnd`: `number`. Index of the last item being displayed.

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Custom displayed range</h3>
    <div class="element-demo__block">
      <div class="element-demo__bordered-box">
        <geo-table-pagination
          :current-page="currentPage"
          :page-size="pageSize"
          :source-data-length="sourceDataLength"
          @go-to-page="goToPage($event)"
        >
          <template slot-scope="{ rangeStart, rangeEnd, sourceDataLength }">
            Displaying rows {{ rangeStart }} to {{ rangeEnd }} of {{ sourceDataLength }}
          </template>
        </geo-table-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPage: 0
    }
  },
  computed: {
    pageSize () {
      return 10
    },

    sourceDataLength () {
      return 35
    }
  },
  methods: {
    goToPage (page) {
      this.currentPage = page
    }
  }
}
</script>
```

## Advanced customization

If you need additional customization not covered by any of the slots you can
build your own paginator based on `GeoTablePaginationMixin`, a mixin providing
the props, computed properties and methods used in `GeoTablePagination` component.
