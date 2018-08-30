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
        :options="optGroupsList"
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentSelection: null,
      currentOptGroupsSelection: null,
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
          name: 'First Group'
        },
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
        },
        {
          isOptGroup: true,
          name: 'Second Group'
        },
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
      ],
    }
  },
  methods: {
    changeCurrentSelection (selection) {
      this.currentSelection = selection
    },
    changeOptGroupSelection (selection) {
      this.currentOptGroupsSelection = selection
    }
  } 
}
</script>

<style lang="scss" scoped>
</style>
```
