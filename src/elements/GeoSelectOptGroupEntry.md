Use `GeoSelectOptGroupEntry` to display elements of an OptGroup.
These elements will be padded so they look like they are part of an OptGroup.
Take a look at `GeoSelectEntry` for a non-OptGroup equivalent of this component.

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
      <font-awesome-icon slot="leadingAccessoryItem" :icon="['fas', 'flag']" />
      Content of the Select entry
    </geo-select-opt-group-entry>
  </div>
  <h3 class="element-demo__header">Opt group entry with right accessory item</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-select-opt-group-entry>
      Content of the Select entry
      <input type="checkbox" slot="trailingAccessoryItem"/>
    </geo-select-opt-group-entry>
  </div>
</div>
```
