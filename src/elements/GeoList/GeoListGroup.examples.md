`GeoListGroup` is a component designed to show a collection of items inside
a visually isolated group. It supports a customizable group `title` and allows
showing any kind of content inside the group, althought using
[GeoListItem](./#/Elements/GeoList?id=geolistitem)
is advised.


```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <div>
      <geo-list-group>
        <template slot="title">Group title</template>
      </geo-list-group>
    </div>

    <div>
      <geo-list-group>
        <template slot="title">Exclusive options</template>
        <geo-list-item slot="item">
          First

          <input
            slot="trailingAccessoryItem"
            type="radio"
            name="demo"
          >
        </geo-list-item>
        <geo-list-item slot="item">
          Second

          <input
            slot="trailingAccessoryItem"
            type="radio"
            name="demo"
          >
        </geo-list-item>
        <geo-list-item slot="item">
          Third

          <input
            slot="trailingAccessoryItem"
            type="radio"
            name="demo"
          >
        </geo-list-item>
      </geo-list-group>
    </div>

    <div>
      <geo-list-group :icon="['far', 'user']">
        <template slot="title">Inclusive options</template>
        <input
          slot="trailingAccessoryItem"
          type="checkbox"
        >
        <geo-list-item slot="item">
          First

          <input
            slot="trailingAccessoryItem"
            type="checkbox"
          >
        </geo-list-item>
        <geo-list-item slot="item">
          Second

          <input
            slot="trailingAccessoryItem"
            type="checkbox"
          >
        </geo-list-item>
        <geo-list-item slot="item">
          Third

          <input
            slot="trailingAccessoryItem"
            type="checkbox"
          >
        </geo-list-item>
      </geo-list-group>
    </div>

    <div>
      <geo-list-group :icon="['far', 'bell']">
        <template slot="title">Notifications</template>
        <font-awesome-icon
          slot="trailingAccessoryItem"
          :icon="['fas', 'chevron-right']"
          aria-hidden
          fixed-width
        />
        <geo-list-item slot="item">One</geo-list-item>
        <geo-list-item slot="item">Two</geo-list-item>
      </geo-list-group>
    </div>

    <div>
      <geo-list-group>
        <template slot="title">First group</template>
        <geo-list-item slot="item">One</geo-list-item>
        <geo-list-item slot="item">Two</geo-list-item>
      </geo-list-group>

      <geo-list-group>
        <template slot="title">Second group</template>
        <geo-list-item slot="item">One</geo-list-item>
        <geo-list-item slot="item">Two</geo-list-item>
      </geo-list-group>
    </div>
  </div>
</div>
```
