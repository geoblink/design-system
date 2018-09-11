`GeoSelectOptGroupEntry` is each one of the options that will be used in the GeoSelect inside an opt-group.
They can have a left accessory item, the content itself and another item that will be placed 
on the right side of the container.

```jsx
<div class="element-demo">
  <h3 class="element-demo__header">Opt group entry (Only content)</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-select-opt-group-entry>
      Content of the Select entry
    </geo-select-opt-group-entry>
  </div>
  <h3 class="element-demo__header">Opt group entry with left accessory item</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-select-opt-group-entry>
      <font-awesome-icon slot="leftAccessoryItem" :icon="['fas', 'flag']" />
      Content of the Select entry
    </geo-select-opt-group-entry>
  </div>
  <h3 class="element-demo__header">Opt group entry with right accessory item</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-select-opt-group-entry>
      Content of the Select entry
      <input type="checkbox" slot="rightAccessoryItem"/>
    </geo-select-opt-group-entry>
  </div>
</div>
```
