`GeoDropdownListItem` is a component designed to build vertical lists which fit
properly in a [GeoDropdown](./#/Elements/GeoDropdown?id=geodropdown-1).

It can be customized in several ways, adding icons to the leading edge of the
row or more complex elements (like form inputs) to the trailing edge.

```jsx
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-dropdown-list-item>
      My button
    </geo-dropdown-list-item>

    <geo-dropdown-list-item>
      Enable option
      <input slot="trailingAccessoryItem" type="checkbox">
    </geo-dropdown-list-item>

    <geo-dropdown-list-item :icon="['far', 'user']">
      My profile
    </geo-dropdown-list-item>

    <geo-dropdown-list-item :icon="['far', 'bell']">
      Notifications
      <font-awesome-icon
        slot="trailingAccessoryItem"
        :icon="['fas', 'chevron-right']"
        aria-hidden
        fixed-width
      />
    </geo-dropdown-list-item>
  </div>
</div>
```
