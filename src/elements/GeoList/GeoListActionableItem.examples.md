```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <div class="element-demo__item">
      <geo-list-actionable-item :active="true">
        <div slot="title">Title 1 no icon</div>
        <font-awesome-icon
          slot="trailingAccessoryItem"
          :icon="['fas', 'times']"
          aria-hidden
          fixed-width
        />
        <div>There are 27 new events around your stores..</div>
        <div>31/10/2018</div>
      </geo-list-actionable-item>
      <geo-list-actionable-item>
        <div slot="title">Title 2</div>
        <font-awesome-icon
          slot="trailingAccessoryItem"
          :icon="['fas', 'times']"
          aria-hidden
          fixed-width
        />
        <div>There are 27 new events around your stores.</div>
        <div>31/10/2018</div>
        <geo-secondary-button slot="actions">Button</geo-secondary-button>
      </geo-list-actionable-item>
    </div>

    <div class="element-demo__item">
      <geo-list-actionable-item :icon="['far', 'bell']">
        <div slot="title">Title with icon and trailing icon</div>
        <font-awesome-icon
          slot="trailingAccessoryItem"
          :icon="['fas', 'chevron-right']"
          aria-hidden
          fixed-width
        />
        <div>There are 27 new events around your stores.</div>
        <div>31/10/2018</div>
        <geo-secondary-button slot="actions">Button</geo-secondary-button>
      </geo-list-actionable-item>
      <geo-list-actionable-item :icon="['far', 'bell']">
        <div slot="title">Title with icon and trailing icon</div>
        <font-awesome-icon
          slot="trailingAccessoryItem"
          :icon="['fas', 'chevron-right']"
          aria-hidden
          fixed-width
        />
        <div>There are 27 new events around your stores.</div>
        <div>31/10/2018</div>
        <geo-secondary-button slot="actions">Button</geo-secondary-button>
      </geo-list-actionable-item>
    </div>
  </div>
</div>
```
