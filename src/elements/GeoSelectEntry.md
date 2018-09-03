`GeoSelectEntry` is each one of the options that will be used in the GeoSelect.
They can have a left accessory item, the content itself and another item that will be placed 
on the right side of the container.
```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Simple select entry (Only content)</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select-entry>
        <p slot="content"> Content of the Select entry</p>
      </geo-select-entry>
    </div>
    <h3 class="element-demo__header">Select entry with left accessory item</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select-entry>
        <font-awesome-icon slot="leftAccessoryItem" :icon="['fas', 'flag']"/>
        <p slot="content"> Content of the Select entry</p>
      </geo-select-entry>
    </div>
    <h3 class="element-demo__header">Select entry with right accessory item</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select-entry>
        <p slot="content"> Content of the Select entry</p>
        <input type="checkbox" slot="rightAccessoryItem"/>
      </geo-select-entry>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
</style>
```
