`GeoDropdown` is a combination of a button and a popup which can be toggled in
and out using the button. It's suitable for dropdown menus and actions which
require additional or complex user input like handling data filters.

The popup is smartly repositioned when it does not fit below the toggle button
and is pinned to right side of the button when its content overflows viewport
if pinned to left side.

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Simple menu</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-dropdown
        :opened="isOpened"
        @click-outside="closeMenu()"
      >
        <geo-dropdown-regular-button
          slot="toggleButton"
          :icon="['fas', 'user']"
          @click="toggleMenu()"
        >
          People: <strong>Residents</strong>, <strong>Visitors</strong>, <strong>Workers</strong>
        </geo-dropdown-regular-button>
        <geo-bordered-box slot="popupContent">
          <template v-for="(item, index) in menuItems">
            <geo-bordered-box-header
              v-if="item.back"
              :icon="['fas', 'chevron-left']"
              :key="index"
              @click-icon="handleListItemClick(index)"
            >
              {{ item.label }}
            </geo-bordered-box-header>
            <geo-list-group
              v-else-if="item.groupedItems"
              :key="index"
            >
              <template slot="title">{{ item.label }}</template>
              <geo-list-item
                v-for="(item, index) in item.groupedItems"
                :key="index"
                :icon="item.icon"
                slot="item"
              >
                {{ item.label }}
              </geo-list-item>
            </geo-list-group>
            <geo-bordered-box-footer
              v-else-if="item.footer"
              :key="index"
            >
              <geo-button type="primary">{{ item.label }}</geo-button>
            </geo-bordered-box-footer>
            <geo-list-item
              v-else
              :key="index"
              :icon="item.icon"
              @click="handleListItemClick(index)"
            >
              {{ item.label }}

              <template slot="trailingAccessoryItem">
                <font-awesome-icon
                  v-if="item.submenu"
                  :icon="['fas', 'chevron-right']"
                  aria-hidden
                  fixed-width
                />
                <input
                  v-else-if="item.checkbox"
                  type="checkbox"
                >
              </template>
            </geo-list-item>
          </template>
        </geo-bordered-box>
      </geo-dropdown>
    </div>
  </div>
</template>

<script>
const goBackEntry = {
  icon: ['fas', 'chevron-left'],
  label: 'Go back',
  back: true
}

export default {
  data () {
    return {
      isOpened: false,
      currentPath: []
    }
  },
  computed: {
    sampleItems () {
      return [
        {
          icon: ['fas', 'user'],
          label: 'User',
          showDisclosureIndicator: false,
          submenu: [
            {
              label: 'Enable feature',
              checkbox: true
            },
            {
              label: 'Apply changes',
              footer: true
            }
          ]
        }, {
          icon: ['fas', 'bell'],
          label: 'Notifications',
          showDisclosureIndicator: true,
          submenu: [
            {
              label: 'Important',
              groupedItems: [
                {
                  label: 'First notification'
                },
                {
                  label: 'Second notification'
                },
                {
                  label: 'Third notification'
                }
              ]
            },
            {
              label: 'Not important',
              groupedItems: [
                {
                  label: 'Fourth notification'
                },
                {
                  label: 'Fifth notification'
                },
                {
                  label: 'Sixth notification'
                }
              ]
            }
          ]
        },
        {
          icon: ['fas', 'calendar'],
          label: 'Calendar',
          showDisclosureIndicator: false
        },
        {
          icon: ['fas', 'share'],
          label: 'Share',
          showDisclosureIndicator: true,
          submenu: [
            {
              icon: ['fab', 'facebook'],
              label: 'Facebook'
            },
            {
              icon: ['fab', 'twitter'],
              label: 'Twitter'
            }
          ]
        },
        {
          icon: ['fas', 'search'],
          label: 'Search',
          showDisclosureIndicator: false
        }
      ]
    },

    menuItems () {
      return this.currentPath.reduce(
        (previousMenu, item) => [goBackEntry, ...previousMenu[item].submenu],
        this.sampleItems
      )
    }
  },
  methods: {
    closeMenu () {
      this.isOpened = false
    },

    toggleMenu () {
      this.isOpened = !this.isOpened
    },

    handleListItemClick (idEntry) {
      const entry = this.menuItems[idEntry]
      if (entry.back) {
        this.currentPath.pop()
      } else if (entry.submenu) {
        this.currentPath.push(idEntry)
      }
    }
  }
}
</script>
```

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Menu inside container and placed top right</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <div class="element-demo__bordered-box container-with-hidden-overflow">
        <geo-dropdown
          preferred-x-axis-position="right"
          preferred-y-axis-position="top"
          :opened="isOpened"
          @click-outside="closeMenu()"
        >
          <geo-dropdown-regular-button
            slot="toggleButton"
            :icon="['fas', 'user']"
            @click="toggleMenu()"
          >
            People: <strong>Residents</strong>, <strong>Visitors</strong>, <strong>Workers</strong>
          </geo-dropdown-regular-button>
          <geo-bordered-box slot="popupContent">
            <geo-list-item>
              An element
            </geo-list-item>
          </geo-bordered-box>
        </geo-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOpened: false
    }
  },
  methods: {
    closeMenu () {
      this.isOpened = false
    },

    toggleMenu () {
      this.isOpened = !this.isOpened
    }
  }
}
</script>

<style lang="scss" scoped>
.container-with-hidden-overflow {
  height: 100px;
  overflow: hidden;
}
</style>
```

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Menu inside scrollable container
    </h3>

    <div class="element-demo__inline-input-group">
      <label class="element-demo__inline-input-group__field">
        Force Y-Axis position: <select
          v-model="forcedYAxisPosition"
        >
          <option value="none">None</option>
          <option value="bottom">Bottom</option>
          <option value="top">Top</option>
        </select>
      </label>

      <label class="element-demo__inline-input-group__field">
        Preferred X-Axis position: <select
          v-model="preferredXAxisPosition"
        >
          <option value="none">None</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
      </label>

      <label class="element-demo__inline-input-group__field">
        Fixed width: <select
          v-model="fixedWidth"
        >
          <option :value="true">True</option>
          <option :value="false">False</option>
        </select>
      </label>
    </div>

    <div class="element-demo__block" style="margin-top: 20px; justify-content: space-around;">
      <div class="element-demo__bordered-box container-with-scroll-overflow">
        <div style="margin-bottom: 300px;">
          <geo-dropdown
            :opened="isOpened"
            :force-y-axis-position="dropdownForcedYAxisPosition"
            :preferred-x-axis-position="dropdownPreferredXAxisPosition"
            :fixed-width="fixedWidth"
            @click-outside="closeMenu()"
          >
            <geo-dropdown-regular-button
              slot="toggleButton"
              :icon="['fas', 'user']"
              style="width: 100%;"
              @click="toggleMenu()"
            >
              People: <strong>Residents</strong>, <strong>Visitors</strong>, <strong>Workers</strong>
            </geo-dropdown-regular-button>
            <geo-bordered-box slot="popupContent">
              <geo-list-item>
                An element
              </geo-list-item>
            </geo-bordered-box>
          </geo-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOpened: false,
      forcedYAxisPosition: 'none',
      preferredXAxisPosition: 'none',
      fixedWidth: false
    }
  },
  computed: {
    dropdownForcedYAxisPosition () {
      return this.forcedYAxisPosition === 'none'
        ? undefined
        : this.forcedYAxisPosition
    },

    dropdownPreferredXAxisPosition () {
      return this.preferredXAxisPosition === 'none'
        ? undefined
        : this.preferredXAxisPosition
    }
  },
  methods: {
    closeMenu () {
      this.isOpened = false
    },

    toggleMenu () {
      this.isOpened = !this.isOpened
    }
  }
}
</script>

<style lang="scss" scoped>
.container-with-scroll-overflow {
  height: 100px;
  overflow-x: hidden;
  overflow-y: scroll;
  width: 300px;
}
</style>
```

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Scrollable content inside dropdown popup</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-dropdown
        :opened="isOpened"
        @click-outside="closeMenu()"
      >
        <geo-dropdown-regular-button
          slot="toggleButton"
          :icon="['fas', 'user']"
          @click="toggleMenu()"
        >
          People: <strong>Residents</strong>, <strong>Visitors</strong>, <strong>Workers</strong>
        </geo-dropdown-regular-button>
        <geo-bordered-box
          slot="popupContent"
          style="max-height: 100px"
        >
          <geo-scrollable-container>
            <geo-list-item
              v-for="index in items"
              :key="index"
            >
              Element #{{ index }}
            </geo-list-item>
          </geo-scrollable-container>
        </geo-bordered-box>
      </geo-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOpened: false
    }
  },
  computed: {
    items () {
      return _.times(6)
    }
  },
  methods: {
    closeMenu () {
      this.isOpened = false
    },

    toggleMenu () {
      this.isOpened = !this.isOpened
    }
  }
}
</script>
```