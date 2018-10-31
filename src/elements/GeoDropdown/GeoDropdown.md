`GeoDropdown` is a combination of a button and a popup which can be toggled in
and out using the button. It's suitable for dropdown menus and actions which
require additional or complex user input like handling data filters.

The popup is smartly repositioned when it does not fit below the toggle button
and is pinned to right side of the button when its content overflows viewport
if pinned to left side.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Simple menu</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-dropdown
        :opened="isOpened[0]"
        @click-outside="closeMenu(0)"
      >
        <geo-dropdown-regular-button
          slot="toggleButton"
          :icon="['fas', 'user']"
          @click="toggleMenu(0)"
        >
          People: <strong>Residents</strong>, <strong>Visitors</strong>, <strong>Workers</strong>
        </geo-dropdown-regular-button>
        <geo-bordered-box slot="popupContent">
          <template v-for="(item, index) in menuItems[0]">
            <geo-bordered-box-header
              v-if="item.back"
              :icon="['fas', 'chevron-left']"
              :key="index"
              @click-icon="handleListItemClick(0, index)"
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
            <geo-bordered-box-footer v-else-if="item.footer" :key="index">
              <geo-button type="primary">{{ item.label }}</geo-button>
            </geo-bordered-box-footer>
            <geo-list-item
              v-else
              :key="index"
              :icon="item.icon"
              @click="handleListItemClick(0, index)"
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
    <h3 class="element-demo__header">Menu inside container and placed top right</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <div class="element-demo__bordered-box container-with-hidden-overflow">
      <geo-dropdown
        preferred-x-axis-position="right"
        preferred-y-axis-position="top"
        :opened="isOpened[1]"
        @click-outside="closeMenu(1)"
      >
        <geo-dropdown-regular-button
          slot="toggleButton"
          :icon="['fas', 'user']"
          @click="toggleMenu(1)"
        >
          People: <strong>Residents</strong>, <strong>Visitors</strong>, <strong>Workers</strong>
        </geo-dropdown-regular-button>
        <geo-bordered-box slot="popupContent">
          <template v-for="(item, index) in menuItems[1]">
            <geo-bordered-box-header
              v-if="item.back"
              :icon="['fas', 'chevron-left']"
              :key="index"
              @click-icon="handleListItemClick(1, index)"
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
            <geo-bordered-box-footer v-else-if="item.footer" :key="index">
              <geo-button type="primary">{{ item.label }}</geo-button>
            </geo-bordered-box-footer>
            <geo-list-item
              v-else
              :key="index"
              :icon="item.icon"
              @click="handleListItemClick(1, index)"
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
    <h3 class="element-demo__header">
      Menu inside scrollable container
      <div class="element-demo__inline-input-group">
        <label class="element-demo__inline-input-group__field">
          Force YAxis position: <select
            v-model="forcedYAxisPosition"
          >
            <option value="none">None</option>
            <option value="bottom">Bottom</option>
            <option value="top">Top</option>
          </select>
        </label>
      </div>
      <div class="element-demo__inline-input-group">
        <label class="element-demo__inline-input-group__field">
          Fixed width: <select
            v-model="fixedWidth"
          >
            <option :value="true">True</option>
            <option :value="false">False</option>
          </select>
        </label>
      </div>
    </h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <div class="element-demo__bordered-box container-with-scroll-overflow">
        <div style="margin-bottom: 300px;">
          <geo-dropdown
            :opened="isOpened[2]"
            :force-y-axis-position="dropdownForcedYAxisPosition"
            :fixed-width="fixedWidth"
            @click-outside="closeMenu(2)"
          >
            <geo-dropdown-regular-button
              slot="toggleButton"
              :icon="['fas', 'user']"
              @click="toggleMenu(2)"
            >
              People: <strong>Residents</strong>, <strong>Visitors</strong>, <strong>Workers</strong>
            </geo-dropdown-regular-button>
            <geo-bordered-box slot="popupContent">
              <template v-for="(item, index) in menuItems[2]">
                <geo-bordered-box-header
                  v-if="item.back"
                  :icon="['fas', 'chevron-left']"
                  :key="index"
                  @click-icon="handleListItemClick(2, index)"
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
                <geo-bordered-box-footer v-else-if="item.footer" :key="index">
                  <geo-button type="primary">{{ item.label }}</geo-button>
                </geo-bordered-box-footer>
                <geo-list-item
                  v-else
                  :key="index"
                  :icon="item.icon"
                  @click="handleListItemClick(2, index)"
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
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOpened: [false, false, false],
      currentPath: [[], [], []],
      forcedYAxisPosition: 'none',
      fixedWidth: false
    }
  },
  computed: {
    dropdownForcedYAxisPosition () {
      return this.forcedYAxisPosition === 'none' ? undefined : this.forcedYAxisPosition
    },

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
      return this.currentPath.map(path => {
        return path.reduce((previousMenu, item) => {
          return [
            {
              icon: ['fas', 'chevron-left'],
              label: 'Go back',
              back: true
            },
            ...previousMenu[item].submenu
          ]
        }, this.sampleItems)
      })
    }
  },
  methods: {
    closeMenu (idMenu) {
      this.$set(this.isOpened, idMenu, false)
    },

    toggleMenu (idMenu) {
      this.$set(this.isOpened, idMenu, !this.isOpened[idMenu])
    },

    handleListItemClick (idMenu, idEntry) {
      const entry = this.menuItems[idMenu][idEntry]
      if (entry.back) {
        this.currentPath[idMenu].pop()
      } else if (entry.submenu) {
        this.currentPath[idMenu].push(idEntry)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container-with-hidden-overflow {
  height: 100px;
  overflow: hidden;
}

.container-with-scroll-overflow {
  height: 100px;
  overflow-x: hidden;
  overflow-y: scroll;
  width: 300px;
}
</style>
```
