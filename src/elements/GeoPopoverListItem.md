`GeoPopoverListItem` is convenient helper to build vertical lists.

It can be customized in several ways, adding icons to the leading edge of the
row or more complex elements (like form inputs) to the trailing edge.

```jsx
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-popover-list-item>
      <template slot="label">My button</slot>
    </geo-popover-list-item>

    <geo-popover-list-item>
      <template slot="label">Enable option</slot>
      <input
        slot="trailingAccessoryItem"
        type="checkbox"
      >
    </geo-popover-list-item>

    <geo-popover-list-item :icon="['far', 'user']">
      <template slot="label">My profile</slot>
    </geo-popover-list-item>

    <geo-popover-list-item :icon="['far', 'bell']">
      <template slot="label">Notifications</slot>
      <font-awesome-icon
        slot="trailingAccessoryItem"
        :icon="['fas', 'chevron-right']"
        aria-hidden
        fixed-width
      />
    </geo-popover-list-item>
  </div>
</div>
```
