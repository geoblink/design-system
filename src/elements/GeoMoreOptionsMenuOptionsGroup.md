```jsx
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-more-options-menu-options-group>
      <template slot="title">Group title</template>
    </geo-more-options-menu-options-group>

    <geo-more-options-menu-options-group>
      <template slot="title">Exclusive options</template>
      <geo-more-options-menu-entry slot="item">
        <template slot="label">First</template>
        <input
          slot="rightAccessoryItem"
          type="radio"
          name="demo"
        >
      </geo-more-options-menu-entry>
      <geo-more-options-menu-entry slot="item">
        <template slot="label">Second</template>
        <input
          slot="rightAccessoryItem"
          type="radio"
          name="demo"
        >
      </geo-more-options-menu-entry>
      <geo-more-options-menu-entry slot="item">
        <template slot="label">Third</template>
        <input
          slot="rightAccessoryItem"
          type="radio"
          name="demo"
        >
      </geo-more-options-menu-entry>
    </geo-more-options-menu-options-group>

    <geo-more-options-menu-options-group :icon="['far', 'user']">
      <template slot="title">Inclusive options</template>
      <input
        slot="rightAccessoryItem"
        type="checkbox"
      >
      <geo-more-options-menu-entry slot="item">
        <template slot="label">First</template>
        <input
          slot="rightAccessoryItem"
          type="checkbox"
        >
      </geo-more-options-menu-entry>
      <geo-more-options-menu-entry slot="item">
        <template slot="label">Second</template>
        <input
          slot="rightAccessoryItem"
          type="checkbox"
        >
      </geo-more-options-menu-entry>
      <geo-more-options-menu-entry slot="item">
        <template slot="label">Third</template>
        <input
          slot="rightAccessoryItem"
          type="checkbox"
        >
      </geo-more-options-menu-entry>
    </geo-more-options-menu-options-group>

    <geo-more-options-menu-options-group :icon="['far', 'bell']">
      <template slot="title">Notifications</template>
      <font-awesome-icon
        slot="rightAccessoryItem"
        :icon="['fas', 'chevron-right']"
        aria-hidden
        fixed-width
      />
      <geo-more-options-menu-entry slot="item">
        <template slot="label">One</template>
      </geo-more-options-menu-entry>
      <geo-more-options-menu-entry slot="item">
        <template slot="label">Two</template>
      </geo-more-options-menu-entry>
    </geo-more-options-menu-options-group>
  </div>
</div>
```
