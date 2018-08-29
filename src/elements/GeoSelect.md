`GeoSelect` is a combination of a button and a popup which is toggled in and
out using that button. It's suitable for dropdown menus and actions which
require additional or complex user input like handling filters.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Simple select</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        :options="itemsList"
        :constant-width="200">
        <geo-select-entry slot-scope="{option}">
          <p slot="content">{{option.name}}</p>
        </geo-select-entry>
      </geo-select>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
```
