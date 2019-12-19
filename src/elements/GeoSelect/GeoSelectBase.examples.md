### Simple select

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select-base
        :opened="isOpened"
        :fixed-width="false"
        @click-outside="closeSelect()"
      >
        <geo-select-toggle-button
          slot="toggleButton"
          :is-empty="!this.currentSelection"
          @click="toggleSelect()"
        >
          <template v-if="currentSelection">
            {{ currentSelection.label }}
          </template>
          <template v-else>
            Choose an option
          </template>
        </geo-select-toggle-button>
        <geo-list-item
          v-for="(option, index) in itemsList"
          :key="index"
          @click="changeCurrentSelection(option)"
        >
          {{ option.label }}
        </geo-list-item>
      </geo-select-base>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOpened: false,
      currentSelection: null,
      itemsList: _.times(4, idx => { return {label: `Item ${idx}`} })
    }
  },
  methods: {
    closeSelect () {
      this.isOpened = false
    },
    toggleSelect () {
      this.isOpened = !this.isOpened
    },
    changeCurrentSelection (selection) {
      this.closeSelect()
      this.currentSelection = selection
    }
  }
}
</script>
```

### Searchable select

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select-base
        :opened="isOpened"
        @click-outside="closeSelect()"
      >
        <geo-select-toggle-button
          slot="toggleButton"
          :is-empty="!this.currentSelection"
          @click="toggleSelect()"
        >
          <template v-if="currentSelection">
            {{ currentSelection.label }}
          </template>
          <template v-else>
            Choose an option
          </template>
        </geo-select-toggle-button>
        <geo-bordered-box-header-search-form
          slot="header"
          v-model="searchPattern"
          placeholder="Search..."
        />
        <template v-if="filteredItemsList.length">
          <geo-list-item
            v-for="(option, index) in filteredItemsList"
            :key="index"
            @click="changeCurrentSelection(option)"
          >
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOpened: false,
      currentSelection: null,
      searchPattern: '',
      itemsList: _.times(4, idx => { return {label: `Item ${idx}`} })
    }
  },
  computed: {
    filteredItemsList () {
      const matches = _.filter(
        this.itemsList,
        (item) => item.label.indexOf(this.searchPattern) !== -1
      )

      const matchesWithHighlights = _.map(matches, (item) => {
        const newItem = _.clone(item)
        const matches = item.label.match(this.searchPattern)

        return _.assign({}, item, {
          matches: _.map(matches[0].split(''), (char, i) => i + matches.index)
        })
      })

      return matchesWithHighlights
    }
  },
  methods: {
    closeSelect () {
      this.isOpened = false
    },
    toggleSelect () {
      this.isOpened = !this.isOpened
    },
    changeCurrentSelection (selection) {
      this.closeSelect()
      this.currentSelection = selection
    }
  }
}
</script>
```

### Select with opt-groups

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select-base
        :opened="isOpened"
        @click-outside="closeSelect()"
      >
        <geo-select-toggle-button
          slot="toggleButton"
          :is-empty="!this.currentSelection"
          @click="toggleSelect()"
        >
          <template v-if="currentSelection">
            {{ currentSelection.label }}
          </template>
          <template v-else>
            Choose an option
          </template>
        </geo-select-toggle-button>
        <geo-bordered-box-header-search-form
          slot="header"
          v-model="searchPattern"
          placeholder="Search..."
        />
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
              @click="changeCurrentSelection(option)"
            >
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOpened: false,
      currentSelection: null,
      searchPattern: '',
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
      ]
    }
  },
  computed: {
    filteredOptGroupsItems () {
      const self = this

      return _.filter(_.flatMap(this.optGroupsList, (group) => {
        const newGroup = _.cloneDeep(group)

        if (group.label.indexOf(this.searchPattern) !== -1) {
          const matches = group.label.match(self.searchPattern)

          if (matches) {
            newGroup.matches = _.map(matches[0].split(''), (char, i) => i + matches.index)
          }

          _.forEach(newGroup.items, (item) => {
            const matches = item.label.match(self.searchPattern)

            if (matches) {
              item.matches = _.map(matches[0].split(''), (char, i) => i + matches.index)
            }
          })

          return newGroup
        }

        const foundItems = _.filter(newGroup.items, (item) => {
          const matches = item.label.match(self.searchPattern)

          if (matches) {
            item.matches = _.map(matches[0].split(''), (char, i) => i + matches.index)
          }

          return item.label.indexOf(self.searchPattern) !== -1
        })

        if (foundItems.length) {
          return _.assign({}, newGroup, { items: foundItems })
        }

        return null
      }))
    }
  },
  methods: {
    closeSelect () {
      this.isOpened = false
    },
    toggleSelect () {
      this.isOpened = !this.isOpened
    },
    changeCurrentSelection (selection) {
      this.closeSelect()
      this.currentSelection = selection
    }
  }
}
</script>
```

### Paginated select

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select-base
        :opened="isOpened"
        :has-more-results="hasMoreResultsToLoad"
        @click-outside="closeSelect()"
        @load-more-results="loadNextPage($event)"
      >
        <geo-select-toggle-button
          slot="toggleButton"
          :dropdown-icon="['fas', 'chevron-down']"
          :is-empty="!this.currentSelection"
          @click="toggleSelect()"
        >
          <template v-if="currentSelection">
            {{ currentSelection.label }}
          </template>
          <template v-else>
            Choose an option
          </template>
        </geo-select-toggle-button>
        <geo-list-item
          v-for="(option, index) in chunkedLongList"
          :key="index"
          @click="changeCurrentSelection(option)"
        >
          {{option.label}}
        </geo-list-item>
        <template slot="moreResultsTextContent">
          Load more results
        </template>
      </geo-select-base>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOpened: false,
      currentSelection: null,
      currentLongListPage: 1,
      maxItemsPerPage: 5,
      longList: _.times(500, idx => { return {label: `Item ${idx}`} }),
    }
  },
  computed: {
    hasMoreResultsToLoad () {
      return this.currentLongListPage * this.maxItemsPerPage < this.longList.length
    },
    chunkedLongList () {
      return this.longList.slice(0, this.currentLongListPage * this.maxItemsPerPage)
    },
  },
  methods: {
    closeSelect () {
      this.isOpened = false
    },
    toggleSelect () {
      this.isOpened = !this.isOpened
    },
    changeCurrentSelection (selection) {
      this.closeSelect()
      this.currentSelection = selection
    },
    loadNextPage (payload) {
      this.currentLongListPage++
      this.$nextTick(() => payload.scrollToLastEntry())
    }
  }
}
</script>
```
