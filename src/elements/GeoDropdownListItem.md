`GeoDropdownListItem` is convenient helper to build vertical lists.

It can be customized in several ways, adding icons to the leading edge of the
row or more complex elements (like form inputs) to the trailing edge.

```jsx
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-dropdown-list-item>
      <template slot="label">My button</slot>
    </geo-dropdown-list-item>

    <geo-dropdown-list-item>
      <template slot="label">Enable option</slot>
      <input
        slot="trailingAccessoryItem"
        type="checkbox"
      >
    </geo-dropdown-list-item>

    <geo-dropdown-list-item :icon="['far', 'user']">
      <template slot="label">My profile</slot>
    </geo-dropdown-list-item>

    <geo-dropdown-list-item :icon="['far', 'bell']">
      <template slot="label">Notifications</slot>
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
