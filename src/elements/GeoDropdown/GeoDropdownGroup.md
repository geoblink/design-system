`GeoDropdownGroup` is a component designed to show a collection of items inside
a visually isolated group. It supports a customizable group `title` and allows
showing any kind of content inside the group, althought using
[GeoDropdownListItem](/#/Elements/GeoDropdown?id=geodropdownlistitem)
is advised.

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-dropdown-group>
      <template slot="title">Group title</template>
    </geo-dropdown-group>

    <geo-dropdown-group>
      <template slot="title">Exclusive options</template>
      <geo-dropdown-list-item slot="item">
        <template slot="label">First</template>
        <input
          slot="trailingAccessoryItem"
          type="radio"
          name="demo"
        >
      </geo-dropdown-list-item>
      <geo-dropdown-list-item slot="item">
        <template slot="label">Second</template>
        <input
          slot="trailingAccessoryItem"
          type="radio"
          name="demo"
        >
      </geo-dropdown-list-item>
      <geo-dropdown-list-item slot="item">
        <template slot="label">Third</template>
        <input
          slot="trailingAccessoryItem"
          type="radio"
          name="demo"
        >
      </geo-dropdown-list-item>
    </geo-dropdown-group>

    <geo-dropdown-group :icon="['far', 'user']">
      <template slot="title">Inclusive options</template>
      <input
        slot="trailingAccessoryItem"
        type="checkbox"
      >
      <geo-dropdown-list-item slot="item">
        <template slot="label">First</template>
        <input
          slot="trailingAccessoryItem"
          type="checkbox"
        >
      </geo-dropdown-list-item>
      <geo-dropdown-list-item slot="item">
        <template slot="label">Second</template>
        <input
          slot="trailingAccessoryItem"
          type="checkbox"
        >
      </geo-dropdown-list-item>
      <geo-dropdown-list-item slot="item">
        <template slot="label">Third</template>
        <input
          slot="trailingAccessoryItem"
          type="checkbox"
        >
      </geo-dropdown-list-item>
    </geo-dropdown-group>

    <geo-dropdown-group :icon="['far', 'bell']">
      <template slot="title">Notifications</template>
      <font-awesome-icon
        slot="trailingAccessoryItem"
        :icon="['fas', 'chevron-right']"
        aria-hidden
        fixed-width
      />
      <geo-dropdown-list-item slot="item">
        <template slot="label">One</template>
      </geo-dropdown-list-item>
      <geo-dropdown-list-item slot="item">
        <template slot="label">Two</template>
      </geo-dropdown-list-item>
    </geo-dropdown-group>
  </div>
</div>
```
