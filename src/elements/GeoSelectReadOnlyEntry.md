`GeoSelectReadOnlyEntry` is designed to be used as a non-interactible, read only
row-like container for `GeoSelect`. It's specially designed to be used to display
special messages like `No results found`.

```jsx
<div class="element-demo">
  <h3 class="element-demo__header">Simple read only entry (Only content)</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-select-read-only-entry>
      No results found
    </geo-select-read-only-entry>
  </div>
  <h3 class="element-demo__header">Read only entry with left accessory item</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-select-read-only-entry>
      <font-awesome-icon slot="leadingAccessoryItem" :icon="['fas', 'flag']" />
      No results found
    </geo-select-read-only-entry>
  </div>
  <h3 class="element-demo__header">Read only entry with right accessory item</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-select-read-only-entry>
      No results found
      <input type="checkbox" slot="trailingAccessoryItem"/>
    </geo-select-read-only-entry>
  </div>
</div>
```
