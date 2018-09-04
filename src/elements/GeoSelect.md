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
        :dropdown-icon="['fas', 'chevron-down']"
        css-modifier="select-demo"
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
        :options="filteredOptGroupsItems"
        :dropdown-icon="['fas', 'chevron-down']"
        css-modifier="select-demo__opt-groups"
        placeholder="Select option">
        <geo-select-search-entry-form
          slot="searchEntry"
          :search-icon="['fas', 'search']"
          @search-pattern="setOptGroupsPattern"
          placeholder="Search...">
          <span
            v-if="!filteredOptGroupsItems.length">No options found</span>
        </geo-select-search-entry-form>
        <template slot-scope="{option}">
          <geo-select-entry
            v-if="option.isOptGroup"
            :option="option">
            <span v-if="!isSearchingOptGroups" slot="content">{{option.name}}</span>
            <geo-highlighted-string
              v-else
              slot="content"
              css-modifier="opt-groups"
              :matched-chars-position="option.matches"
              :reference-string="option.name"/>
          </geo-select-entry>
          <geo-select-entry
            v-else
            :option="option"
            :has-opt-groups="true"
            @change-current-selection="changeOptGroupSelection(option)">
            <span v-if="!isSearchingOptGroups" slot="content">{{option.name}}</span>
            <geo-highlighted-string
              v-else
              slot="content"
              css-modifier="opt-groups"
              :matched-chars-position="option.matches"
              :reference-string="option.name"/>
          </geo-select-entry>
        </template>
      </geo-select>
    </div>
    <h3 class="element-demo__header">Select with search option</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        :value="currentSearchSelection"
        :options="filteredItemsList"
        :dropdown-icon="['fas', 'chevron-down']"
        css-modifier="select-demo"
        placeholder="Select option">
        <geo-select-search-entry-form
          slot="searchEntry"
          :search-icon="['fas', 'search']"
          @search-pattern="setListSearchPattern"
          placeholder="Search...">
          <span
            v-if="!filteredItemsList.length">No options found</span>
        </geo-select-search-entry-form>
        <geo-select-entry
          slot-scope="{option}"
          :option="option"
          @change-current-selection="changeSearchSelection(option)">
          <span v-if="!isSearchingFromList" slot="content">{{option.name}}</span>
          <geo-highlighted-string
            v-else
            slot="content"
            :matched-chars-position="option.matches"
            :reference-string="option.name"/>
        </geo-select-entry>
      </geo-select>
    </div>
    <h3 class="element-demo__header">Select with pagination</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        :value="currentLongListSelection"
        :options="chunkedLongList"
        :dropdown-icon="['fas', 'chevron-down']"
        :has-more-results="true"
        css-modifier="select-demo"
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
      optGroupsPattern: '',
      listSearchPattern: '',
      isSearchingFromList: null,
      isSearchingOptGroups: null,
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
    chunkedLongList () {
      return this.longList.slice(0, this.currentLongListPage * this.maxItemsPerPage)
    },
    filteredOptGroupsItems () {
      var self = this
      return _.filter(_.flatMap(self.optGroupsList, function (group) {
        if (group.name.indexOf(self.optGroupsPattern) !== -1) {
          var matches = group.name.match(self.optGroupsPattern)
          if (matches) {
            group.matches = _.map(matches[0].split(''), function (char, i) {
              return i + matches.index
            })
          }
          _.forEach(group.items, function (item) {
            var matches = item.name.match(self.optGroupsPattern)
            if (matches) {
              item.matches = _.map(matches[0].split(''), function (char, i) {
                return i + matches.index
              })
            }
          })
          return [group, ...group.items]
        }
        var foundItems = _.filter(group.items, function (item) {
          var matches = item.name.match(self.optGroupsPattern)
          if (matches) {
            item.matches = _.map(matches[0].split(''), function (char, i) {
              return i + matches.index
            })
          }
          return item.name.indexOf(self.optGroupsPattern) !== -1
        })
        if (foundItems.length) return [group, ...foundItems]
      }))
    },
    filteredItemsList () {
      var self = this
      return _.filter(self.itemsList, function (item) {
        var matches = item.name.match(self.optGroupsPattern)
        if (matches) {
          item.matches = _.map(matches[0].split(''), function (char, i) {
            return i + matches.index
          })
        }
        return item.name.indexOf(self.listSearchPattern) !== -1
      })
    },
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
    setListSearchPattern (pattern) {
      this.isSearchingFromList = !!pattern
      this.listSearchPattern = pattern
    },
    setOptGroupsPattern (pattern) {
      this.isSearchingOptGroups = !!pattern
      this.optGroupsPattern = pattern
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
```
