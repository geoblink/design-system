`GeoSelect` is a combination of a button and a popup which is toggled in and
out using that button. It's suitable for dropdown menus and actions which
require additional or complex user input like handling filters.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Simple select</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        :value="currentSelection"
        :options="itemsList"
        :constant-width="200"
        :dropdown-icon="['fas', 'chevron-down']"
        placeholder="Select option">
        <geo-select-entry
          slot-scope="{option}"
          @change-current-selection="changeCurrentSelection(option)">
          <span slot="content">{{option.name}}</span>
        </geo-select-entry>
      </geo-select>
    </div>
    <h3 class="element-demo__header">Select with opt-groups</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        :value="currentOptGroupsSelection"
        :options="optGroupsFlattenList"
        :constant-width="200"
        :dropdown-icon="['fas', 'chevron-down']"
        :has-opt-groups="true"
        placeholder="Select option">
        <template slot-scope="{option}">
          <geo-select-entry
            v-if="option.isOptGroup"
            :option="option">
            <span slot="content">{{option.name}}</span>
          </geo-select-entry>
          <geo-select-entry
            v-else
            :option="option"
            :has-opt-groups="true"
            @change-current-selection="changeOptGroupSelection(option)">
            <span slot="content">{{option.name}}</span>
          </geo-select-entry>
        </template>
      </geo-select>
    </div>
    <h3 class="element-demo__header">Select with search option</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        :value="currentSearchSelection"
        :options="filteredItemsList"
        :constant-width="200"
        :dropdown-icon="['fas', 'chevron-down']"
        placeholder="Select option">
        <geo-select-search-entry
          slot="searchEntry"
          :search-icon="['fas', 'search']"
          @search-pattern="filterList"
          placeholder="Search...">
          <span
            v-if="!filteredItemsList.length">No options found</span>
        </geo-select-search-entry>
        <geo-select-entry
          slot-scope="{option}"
          :option="option"
          @change-current-selection="changeSearchSelection(option)">
          <span slot="content">{{option.name}}</span>
        </geo-select-entry>
      </geo-select>
    </div>
    <h3 class="element-demo__header">Select with pagination</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        :value="currentLongListSelection"
        :options="chunkedLongList"
        :constant-width="200"
        :dropdown-icon="['fas', 'chevron-down']"
        :has-more-results="true"
        placeholder="Select option"
        @load-more-results="loadNextPage($event)">
        <geo-select-entry
          slot-scope="{option}"
          :option="option"
          @change-current-selection="changeLongListSelection(option)">
          <span slot="content">{{option.name}}</span>
        </geo-select-entry>
        <template slot="moreResultsTextContent">Load more results</template>
      </geo-select>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentSelection: null,
      currentOptGroupsSelection: null,
      currentSearchSelection: null,
      currentLongListSelection: null,
      currentLongListPage: 1,
      maxItemsPerPage: 20,
      itemsList: [
        {
          name: 'item 1'
        },
        {
          name: 'item 2'
        },
        {
          name: 'item 3'
        },
        {
          name: 'item 4'
        }
      ],
      filteredItemsList: [
        {
          name: 'item 1'
        },
        {
          name: 'item 2'
        },
        {
          name: 'item 3'
        },
        {
          name: 'item 4'
        }
      ],
      optGroupsList: [
        {
          isOptGroup: true,
          name: 'First Group',
          items: [
            {
              name: 'item 1'
            },
            {
              name: 'item 2'
            },
            {
              name: 'item 3'
            },
            {
              name: 'item 4'
            }
          ]
        },
        {
          isOptGroup: true,
          name: 'Second Group',
          items: [
            {
              name: 'item 5'
            },
            {
              name: 'item 6'
            },
            {
              name: 'item 7'
            },
            {
              name: 'item 8'
            }
          ]
        },
      ],
      longList: _.times(500, function (i) {
        return {
          name: 'item ' + i
        }
      })
    }
  },
  computed: {
    chunkedLongList () {
      return this.longList.slice(0, this.currentLongListPage * this.maxItemsPerPage)
    },
    optGroupsFlattenList () {
      return _.flatMap(this.optGroupsList, function (group) {
        return [group, ...group.items]
      })
    }
  },
  methods: {
    changeCurrentSelection (selection) {
      this.currentSelection = selection
    },
    changeOptGroupSelection (selection) {
      this.currentOptGroupsSelection = selection
    },
    changeSearchSelection (selection) {
      this.currentSearchSelection = selection
    },
    changeLongListSelection (selection) {
      this.currentLongListSelection = selection
    },
    filterList (pattern) {
      this.filteredItemsList = _.filter(this.itemsList, function (item) {
        return item.name.indexOf(pattern) !== -1
      })
    },
    loadNextPage (payload) {
      var lastVisibleEntry = payload.lastVisibleEntry
      this.currentLongListPage++
      this.$nextTick(function () {
        lastVisibleEntry.parentNode.scrollTop = lastVisibleEntry.offsetTop - lastVisibleEntry.parentNode.offsetTop
      })
    }
  } 
}
</script>

<style lang="scss" scoped>
</style>
```
