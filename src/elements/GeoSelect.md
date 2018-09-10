`GeoSelect` is a combination of a button and a popup which is toggled in and
out using that button. It's suitable for dropdown menus and actions which
require additional or complex user input like handling filters.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Simple select</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        :opened="isOpened[0]"
        css-modifier="select-demo"
        @click-outside="closeSelect(0)">
        <geo-select-toggle-button
          slot="toggleButton"
          :dropdown-icon="['fas', 'chevron-down']"
          :is-empty="!this.currentSelection[0]"
          @click="toggleSelect(0)">
          {{selectLabels[0]}}
        </geo-select-toggle-button>
        <geo-select-entry
          v-for="(option, index) in itemsList"
          :key="index"
          @change-current-selection="changeCurrentSelection(0, option)">
          {{option.name}}
        </geo-select-entry>
      </geo-select>
    </div>
    <h3 class="element-demo__header">Select with search option</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        :opened="isOpened[1]"
        css-modifier="select-demo"
        @click-outside="closeSelect(1)">
        <geo-select-toggle-button
          slot="toggleButton"
          :dropdown-icon="['fas', 'chevron-down']"
          :is-empty="!this.currentSelection[1]"
          @click="toggleSelect(1)">
          {{selectLabels[1]}}
        </geo-select-toggle-button>
        <geo-select-search-entry-form
          :search-icon="['fas', 'search']"
          @search-pattern="setSearchPattern(1, $event)"
          placeholder="Search...">
          <template
            v-if="!filteredItemsList.length">No options found</template>
        </geo-select-search-entry-form>
        <geo-select-entry
          v-for="(option, index) in filteredItemsList"
          :key="index"
          @change-current-selection="changeCurrentSelection(1, option)">
          <template v-if="!isSearching[1]">{{option.name}}</template>
          <geo-highlighted-string
            v-else
            :matched-chars-position="option.matches"
            :reference-string="option.name"/>
        </geo-select-entry>
      </geo-select>
    </div>
    <h3 class="element-demo__header">Select with opt-groups</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        :opened="isOpened[2]"
        css-modifier="select-demo"
        @click-outside="closeSelect(2)">
        <geo-select-toggle-button
          slot="toggleButton"
          :dropdown-icon="['fas', 'chevron-down']"
          :is-empty="!this.currentSelection[2]"
          @click="toggleSelect(2)">
          {{selectLabels[2]}}
        </geo-select-toggle-button>
        <geo-select-search-entry-form
          :search-icon="['fas', 'search']"
          @search-pattern="setSearchPattern(2, $event)"
          placeholder="Search...">
          <template
            v-if="!filteredOptGroupsItems.length">No options found</template>
        </geo-select-search-entry-form>
        <template v-for="(option, index) in filteredOptGroupsItems">
          <geo-select-entry
            v-if="option.isOptGroup"
            :key="index"
            :option="option"
            :css-modifier="`is-opt-group`">
            <template v-if="!isSearching[2]">{{option.name}}</template>
            <geo-highlighted-string
              v-else
              :matched-chars-position="option.matches"
              :reference-string="option.name"/>
          </geo-select-entry>
          <geo-select-entry
            v-else
            :key="index"
            :option="option"
            :css-modifier="`has-opt-group`"
            @change-current-selection="changeCurrentSelection(2, option)">
            <template v-if="!isSearching[2]">{{option.name}}</template>
            <geo-highlighted-string
              v-else
              :matched-chars-position="option.matches"
              :reference-string="option.name"/>
          </geo-select-entry>
        </template>
      </geo-select>
    </div>
    <h3 class="element-demo__header">Select with pagination</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        :opened="isOpened[3]"
        :has-more-results="hasMoreResultsToLoad"
        css-modifier="select-demo"
        @click-outside="closeSelect(3)"
        @load-more-results="loadNextPage($event)">
        <geo-select-toggle-button
          slot="toggleButton"
          :dropdown-icon="['fas', 'chevron-down']"
          :is-empty="!this.currentSelection[3]"
          @click="toggleSelect(3)">
          {{selectLabels[3]}}
        </geo-select-toggle-button>
        <geo-select-entry
          v-for="(option, index) in chunkedLongList"
          :key="index"
          :option="option"
          @change-current-selection="changeCurrentSelection(3, option)">
          {{option.name}}
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
      isOpened: [false, false, false, false],
      currentSelection: [null, null, null, null],
      currentLongListPage: 1,
      maxItemsPerPage: 20,
      searchPatterns: ['', '', '', ''],
      isSearching: [null, null, null, null],
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
    selectLabels () {
      const PLACEHOLDER = 'Choose an option'
      return [
        this.currentSelection[0] ? this.currentSelection[0].name : PLACEHOLDER,
        this.currentSelection[1] ? this.currentSelection[1].name : PLACEHOLDER,
        this.currentSelection[2] ? this.currentSelection[2].name : PLACEHOLDER,
        this.currentSelection[3] ? this.currentSelection[3].name : PLACEHOLDER
      ]
    },
    hasMoreResultsToLoad () {
      return this.currentLongListPage * this.maxItemsPerPage < this.longList.length
    },
    chunkedLongList () {
      return this.longList.slice(0, this.currentLongListPage * this.maxItemsPerPage)
    },
    filteredOptGroupsItems () {
      var self = this
      return _.filter(_.flatMap(self.optGroupsList, function (group) {
        if (group.name.indexOf(self.searchPatterns[2]) !== -1) {
          var matches = group.name.match(self.searchPatterns[2])
          if (matches) {
            group.matches = _.map(matches[0].split(''), function (char, i) {
              return i + matches.index
            })
          }
          _.forEach(group.items, function (item) {
            var matches = item.name.match(self.searchPatterns[2])
            if (matches) {
              item.matches = _.map(matches[0].split(''), function (char, i) {
                return i + matches.index
              })
            }
          })
          return [group, ...group.items]
        }
        var foundItems = _.filter(group.items, function (item) {
          var matches = item.name.match(self.searchPatterns[2])
          if (matches) {
            item.matches = _.map(matches[0].split(''), function (char, i) {
              return i + matches.index
            })
          }
          return item.name.indexOf(self.searchPatterns[2]) !== -1
        })
        if (foundItems.length) return [group, ...foundItems]
      }))
    },
    filteredItemsList () {
      var self = this
      return _.filter(self.itemsList, function (item) {
        var matches = item.name.match(self.searchPatterns[1])
        if (matches) {
          item.matches = _.map(matches[0].split(''), function (char, i) {
            return i + matches.index
          })
        }
        return item.name.indexOf(self.searchPatterns[1]) !== -1
      })
    },
  },
  methods: {
    closeSelect (selectId) {
      this.$set(this.isOpened, selectId, false)
    },
    toggleSelect (selectId) {
      this.$set(this.isOpened, selectId, !this.isOpened[selectId])
    },
    changeCurrentSelection (selectId, selection) {
      this.closeSelect(selectId)
      this.$set(this.currentSelection, selectId, selection)
    },
    setSearchPattern (selectId, pattern) {
      this.$set(this.isSearching, selectId, !!pattern)
      this.$set(this.searchPatterns, selectId, pattern)
    },
    loadNextPage (payload) {
      var lastVisibleEntry = payload.lastVisibleEntry
      this.currentLongListPage++
      this.$nextTick(function () {
        payload.scrollToLastEntry()
      })
    }
  } 
}
</script>
```
