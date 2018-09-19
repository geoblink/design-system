`GeoSelectEntry` is a component designed to fit nicely as options of a
[GeoSelect](./#/Elements/GeoSelect?id=geoselect-1), including hover styles,
proper cursor and click events.

```jsx
<div class="element-demo">
  <h3 class="element-demo__header">Simple select entry (Only content)</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-select-entry>
      Content of the Select entry
    </geo-select-entry>
  </div>
  <h3 class="element-demo__header">Select entry with left accessory item</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-select-entry>
      <font-awesome-icon slot="leadingAccessoryItem" :icon="['fas', 'flag']" />
      Content of the Select entry
    </geo-select-entry>
  </div>
  <h3 class="element-demo__header">Select entry with right accessory item</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-select-entry>
      Content of the Select entry
      <input type="checkbox" slot="trailingAccessoryItem"/>
    </geo-select-entry>
  </div>
</div>
```
