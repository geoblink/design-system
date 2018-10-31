`GeoSelectBase` is an advance component to build select-like flows. It offers
the minimum boilerplate to create a popup-driven single-element pickers.

Use this component if you want to build a custom experience. If you just need a
drop-in replacement for HTML `<select>` tag you might probably want to use
[GeoSelect](http://localhost:6060/#/Elements/GeoSelect?id=geoselect-1) component.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Simple select</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select-base
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
        <geo-list-item
          v-for="(option, index) in itemsList"
          :key="index"
          @click="changeCurrentSelection(0, option)">
          {{option.label}}
        </geo-list-item>
      </geo-select-base>
    </div>
    <h3 class="element-demo__header">Select with search option</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select-base
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
          slot="header"
          :search-icon="['fas', 'search']"
          v-model="searchPatterns[1]"
          placeholder="Search..." />
        <template v-if="filteredItemsList.length">
          <geo-list-item
            v-for="(option, index) in filteredItemsList"
            :key="index"
            @click="changeCurrentSelection(1, option)">
            <geo-highlighted-string
              :highlighted-chars="option.matches"
              :reference-string="option.label"
            />
          </geo-list-item>
        </template>
        <geo-list-clear-item v-else>
          No Results Found
        </geo-list-clear-item>
      </geo-select-base>
    </div>
    <h3 class="element-demo__header">Select with opt-groups</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select-base
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
          slot="header"
          :search-icon="['fas', 'search']"
          v-model="searchPatterns[2]"
          placeholder="Search..." />
        <template v-if="filteredOptGroupsItems.length">
          <geo-list-group
            v-for="(optGroup, index) in filteredOptGroupsItems"
            :key="index"
          >
            <template
              slot="title"
              v-if="optGroup.isOptGroup"
            >
              <geo-highlighted-string
                :key="index"
                :highlighted-chars="optGroup.matches"
                :reference-string="optGroup.label"
              />
            </template>
            <geo-list-item
              slot="item"
              v-for="(option, index) in optGroup.items"
              :key="index"
              @click="changeCurrentSelection(2, option)">
              <geo-highlighted-string
                :highlighted-chars="option.matches"
                :reference-string="option.label"
              />
            </geo-list-item>
          </geo-list-group>
        </template>
        <geo-list-clear-item v-else>
          No Results Found
        </geo-list-clear-item>
      </geo-select-base>
    </div>
    <h3 class="element-demo__header">Select with pagination</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select-base
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
        <geo-list-item
          v-for="(option, index) in chunkedLongList"
          :key="index"
          @click="changeCurrentSelection(3, option)">
          {{option.label}}
        </geo-list-item>
        <template slot="moreResultsTextContent">Load more results</template>
      </geo-select-base>
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
      itemsList: _.times(4, idx => { return {label: `Item ${idx}`} }),
      optGroupsList: [
        {
          isOptGroup: true,
          label: 'First Group',
          items: _.times(4, idx => { return {label: `Item ${idx}`} }),
        },
        {
          isOptGroup: true,
          label: 'Second Group',
          items: _.times(4, idx => { return {label: `Item ${idx}`} }),
        },
      ],
      longList: _.times(500, idx => { return {label: `Item ${idx}`} }),
    }
  },
  computed: {
    selectLabels () {
      const PLACEHOLDER = 'Choose an option'
      return [
        this.currentSelection[0] ? this.currentSelection[0].label : PLACEHOLDER,
        this.currentSelection[1] ? this.currentSelection[1].label : PLACEHOLDER,
        this.currentSelection[2] ? this.currentSelection[2].label : PLACEHOLDER,
        this.currentSelection[3] ? this.currentSelection[3].label : PLACEHOLDER
      ]
    },
    hasMoreResultsToLoad () {
      return this.currentLongListPage * this.maxItemsPerPage < this.longList.length
    },
    chunkedLongList () {
      return this.longList.slice(0, this.currentLongListPage * this.maxItemsPerPage)
    },
    filteredOptGroupsItems () {
      const self = this
      return _.filter(_.flatMap(self.optGroupsList, function (group) {
        if (group.label.indexOf(self.searchPatterns[2]) !== -1) {
          var matches = group.label.match(self.searchPatterns[2])
          if (matches) {
            group.matches = _.map(matches[0].split(''), function (char, i) {
              return i + matches.index
            })
          }
          _.forEach(group.items, function (item) {
            var matches = item.label.match(self.searchPatterns[2])
            if (matches) {
              item.matches = _.map(matches[0].split(''), function (char, i) {
                return i + matches.index
              })
            }
          })
          return group
        }
        const foundItems = _.filter(group.items, function (item) {
          var matches = item.label.match(self.searchPatterns[2])
          if (matches) {
            item.matches = _.map(matches[0].split(''), function (char, i) {
              return i + matches.index
            })
          }
          return item.label.indexOf(self.searchPatterns[2]) !== -1
        })
        if (foundItems.length) return _.assign({}, group, {items: foundItems})
      }))
    },
    filteredItemsList () {
      const self = this
      return _.filter(self.itemsList, function (item) {
        const matches = item.label.match(self.searchPatterns[1])
        if (matches) {
          item.matches = _.map(matches[0].split(''), function (char, i) {
            return i + matches.index
          })
        }
        return item.label.indexOf(self.searchPatterns[1]) !== -1
      })
    }
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
    loadNextPage (payload) {
      this.currentLongListPage++
      this.$nextTick(function () {
        payload.scrollToLastEntry()
      })
    }
  }
}
</script>
```
