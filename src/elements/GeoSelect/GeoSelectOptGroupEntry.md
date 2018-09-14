`GeoSelectOptGroupEntry` is a component designed to display elements of an
`optgroup`.

These elements will be padded so they look like they are part of an isolated
group of options instead of just part of the general collection.

[GeoSelectEntry](./#/Elements/GeoSelect?id=geoselectentry) is an equivalent
component for non-`optgroup` entries.

```jsx
<div class="element-demo">
  <h3 class="element-demo__header">Opt group entry with only content</h3>
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
