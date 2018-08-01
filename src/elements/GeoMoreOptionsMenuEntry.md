```jsx
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-more-options-menu-entry>
      <template slot="label">My button</slot>
    </geo-more-options-menu-entry>

    <geo-more-options-menu-entry>
      <template slot="label">Enable option</slot>
      <input
        slot="rightAccessoryItem"
        type="checkbox"
      >
    </geo-more-options-menu-entry>

    <geo-more-options-menu-entry :icon="['far', 'user']">
      <template slot="label">My profile</slot>
    </geo-more-options-menu-entry>

    <geo-more-options-menu-entry :icon="['far', 'bell']">
      <template slot="label">Notifications</slot>
      <font-awesome-icon
        slot="rightAccessoryItem"
        :icon="['fas', 'chevron-right']"
        aria-hidden
        fixed-width
      />
    </geo-more-options-menu-entry>
  </div>
</div>
```
