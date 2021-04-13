### Simple dropdown menu using dropdown select button

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-dropdown
        :opened="isOpened"
        @click-outside="closeMenu()"
      >
        <geo-dropdown-select-button
          slot="toggleButton"
          @click="toggleMenu()"
        >
          People: <strong>Residents</strong>, <strong>Visitors</strong>, <strong>Workers</strong>
        </geo-dropdown-select-button>
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
          label: 'Calendar',
          showDisclosureIndicator: false
        },
        {
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