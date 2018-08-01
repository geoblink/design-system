```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Simple menu</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-more-options-menu
        :opened="isOpened[0]"
        @click-outside="closeMenu(0)"
      >
        <geo-more-options-menu-regular-button
          slot="toggleButton"
          :icon="['fas', 'user']"
          @click="toggleMenu(0)"
        >
          People: <strong>Residents</strong>, <strong>Visitors</strong>, <strong>Workers</strong>
        </geo-more-options-menu-regular-button>
        <template
          slot="popupContent"
          v-for="(entry, index) in menuItems[0]"
        >
          <geo-more-options-menu-header
            v-if="entry.back"
            :icon="['fas', 'chevron-left']"
            :key="index"
            @click-icon="handleMenuEntryClick(0, index)"
          >
            {{ entry.label }}
          </geo-more-options-menu-header>
          <geo-more-options-menu-options-group
            v-else-if="entry.groupedItems"
            :key="index"
          >
            <template slot="title">{{ entry.label }}</template>
            <geo-more-options-menu-entry
              v-for="(item, index) in entry.groupedItems"
              :key="index"
              :icon="item.icon"
              slot="item"
            >
              <template slot="label">{{ item.label }}</template>
            </geo-more-options-menu-entry>
          </geo-more-options-menu-options-group>
          <geo-more-options-menu-entry
            v-else
            :key="index"
            :icon="entry.icon"
            @click="handleMenuEntryClick(0, index)"
          >
            <template slot="label">{{ entry.label }}</template>
            <template slot="rightAccessoryItem">
              <font-awesome-icon
                v-if="entry.submenu"
                :icon="['fas', 'chevron-right']"
                aria-hidden
                fixed-width
              />
              <input
                v-else-if="entry.checkbox"
                type="checkbox"
              >
            </template>
          </geo-more-options-menu-entry>
        </template>
      </geo-more-options-menu>
    </div>
    <h3 class="element-demo__header">Menu inside container</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <div class="element-demo__bordered-box container-with-hidden-overflow">
      <geo-more-options-menu
        :opened="isOpened[1]"
        @click-outside="closeMenu(1)"
      >
        <geo-more-options-menu-regular-button
          slot="toggleButton"
          :icon="['fas', 'user']"
          @click="toggleMenu(1)"
        >
          People: <strong>Residents</strong>, <strong>Visitors</strong>, <strong>Workers</strong>
        </geo-more-options-menu-regular-button>
        <template
          slot="popupContent"
          v-for="(entry, index) in menuItems[1]"
        >
          <geo-more-options-menu-header
            v-if="entry.back"
            :icon="['fas', 'chevron-left']"
            :key="index"
            @click-icon="handleMenuEntryClick(1, index)"
          >
            {{ entry.label }}
          </geo-more-options-menu-header>
          <geo-more-options-menu-options-group
            v-else-if="entry.groupedItems"
            :key="index"
          >
            <template slot="title">{{ entry.label }}</template>
            <geo-more-options-menu-entry
              v-for="(item, index) in entry.groupedItems"
              :key="index"
              :icon="item.icon"
              slot="item"
            >
              <template slot="label">{{ item.label }}</template>
            </geo-more-options-menu-entry>
          </geo-more-options-menu-options-group>
          <geo-more-options-menu-entry
            v-else
            :key="index"
            :icon="entry.icon"
            @click="handleMenuEntryClick(1, index)"
          >
            <template slot="label">{{ entry.label }}</template>
            <template slot="rightAccessoryItem">
              <font-awesome-icon
                v-if="entry.submenu"
                :icon="['fas', 'chevron-right']"
                aria-hidden
                fixed-width
              />
              <input
                v-else-if="entry.checkbox"
                type="checkbox"
              >
            </template>
          </geo-more-options-menu-entry>
        </template>
      </geo-more-options-menu>
      </div>
    </div>
    <h3 class="element-demo__header">Menu inside scrollable container</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <div class="element-demo__bordered-box container-with-scroll-overflow">
        <div style="margin-bottom: 300px;">
          <geo-more-options-menu
            :opened="isOpened[2]"
            @click-outside="closeMenu(2)"
          >
            <geo-more-options-menu-regular-button
              slot="toggleButton"
              :icon="['fas', 'user']"
              @click="toggleMenu(2)"
            >
              People: <strong>Residents</strong>, <strong>Visitors</strong>, <strong>Workers</strong>
            </geo-more-options-menu-regular-button>
            <template
              slot="popupContent"
              v-for="(entry, index) in menuItems[2]"
            >
              <geo-more-options-menu-header
                v-if="entry.back"
                :icon="['fas', 'chevron-left']"
                :key="index"
                @click-icon="handleMenuEntryClick(2, index)"
              >
                {{ entry.label }}
              </geo-more-options-menu-header>
              <geo-more-options-menu-options-group
                v-else-if="entry.groupedItems"
                :key="index"
              >
                <template slot="title">{{ entry.label }}</template>
                <geo-more-options-menu-entry
                  v-for="(item, index) in entry.groupedItems"
                  :key="index"
                  :icon="item.icon"
                  slot="item"
                >
                  <template slot="label">{{ item.label }}</template>
                </geo-more-options-menu-entry>
              </geo-more-options-menu-options-group>
              <geo-more-options-menu-entry
                v-else
                :key="index"
                :icon="entry.icon"
                @click="handleMenuEntryClick(2, index)"
              >
                <template slot="label">{{ entry.label }}</template>
                <template slot="rightAccessoryItem">
                  <font-awesome-icon
                    v-if="entry.submenu"
                    :icon="['fas', 'chevron-right']"
                    aria-hidden
                    fixed-width
                  />
                  <input
                    v-else-if="entry.checkbox"
                    type="checkbox"
                  >
                </template>
              </geo-more-options-menu-entry>
            </template>
          </geo-more-options-menu>
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
      currentPath: [[], [], []]
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

    handleMenuEntryClick (idMenu, idEntry) {
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
