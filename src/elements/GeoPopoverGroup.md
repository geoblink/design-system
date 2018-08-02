`GeoPopoverGroup` is a component designed to show a collection of items inside
a visually isolated group. It supports a customizable group `title` and allows
showing any kind of content inside the group, althought using
`GeoPopoverListItem` is recommended.

```jsx
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-popover-group>
      <template slot="title">Group title</template>
    </geo-popover-group>

    <geo-popover-group>
      <template slot="title">Exclusive options</template>
      <geo-popover-list-item slot="item">
        <template slot="label">First</template>
        <input
          slot="trailingAccessoryItem"
          type="radio"
          name="demo"
        >
      </geo-popover-list-item>
      <geo-popover-list-item slot="item">
        <template slot="label">Second</template>
        <input
          slot="trailingAccessoryItem"
          type="radio"
          name="demo"
        >
      </geo-popover-list-item>
      <geo-popover-list-item slot="item">
        <template slot="label">Third</template>
        <input
          slot="trailingAccessoryItem"
          type="radio"
          name="demo"
        >
      </geo-popover-list-item>
    </geo-popover-group>

    <geo-popover-group :icon="['far', 'user']">
      <template slot="title">Inclusive options</template>
      <input
        slot="trailingAccessoryItem"
        type="checkbox"
      >
      <geo-popover-list-item slot="item">
        <template slot="label">First</template>
        <input
          slot="trailingAccessoryItem"
          type="checkbox"
        >
      </geo-popover-list-item>
      <geo-popover-list-item slot="item">
        <template slot="label">Second</template>
        <input
          slot="trailingAccessoryItem"
          type="checkbox"
        >
      </geo-popover-list-item>
      <geo-popover-list-item slot="item">
        <template slot="label">Third</template>
        <input
          slot="trailingAccessoryItem"
          type="checkbox"
        >
      </geo-popover-list-item>
    </geo-popover-group>

    <geo-popover-group :icon="['far', 'bell']">
      <template slot="title">Notifications</template>
      <font-awesome-icon
        slot="trailingAccessoryItem"
        :icon="['fas', 'chevron-right']"
        aria-hidden
        fixed-width
      />
      <geo-popover-list-item slot="item">
        <template slot="label">One</template>
      </geo-popover-list-item>
      <geo-popover-list-item slot="item">
        <template slot="label">Two</template>
      </geo-popover-list-item>
    </geo-popover-group>
  </div>
</div>
```
