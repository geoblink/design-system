`GeoListActionableItem` is a component designed to build vertical lists with custom content which fit
properly in a [GeoBorderedBox](./#/Elements/GeoBorderedBox).

It can be customized in several ways, adding icons to the leading edge of the
row or more complex elements (like form inputs) to the trailing edge.

```jsx
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <div class="element-demo__item">
      <geo-list-actionable-item :active="true">
        <div slot="itemTitle">Title 1 no icon</div>
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
        <div slot="itemTitle">Title 2</div>
        <font-awesome-icon
          slot="trailingAccessoryItem"
          :icon="['fas', 'times']"
          aria-hidden
          fixed-width
        />
        <div>There are 27 new events around your stores.</div>
        <div>31/10/2018</div>
        <geo-button slot="actions" type="secondary">Button</geo-button>
      </geo-list-actionable-item>
    </div>

    <div class="element-demo__item">
      <geo-list-actionable-item :icon="['far', 'bell']">
        <div slot="itemTitle">Title with icon and trailing icon</div>
        <font-awesome-icon
          slot="trailingAccessoryItem"
          :icon="['fas', 'chevron-right']"
          aria-hidden
          fixed-width
        />
        <div>There are 27 new events around your stores.</div>
        <div>31/10/2018</div>
        <geo-button slot="actions" type="secondary">Button</geo-button>
      </geo-list-actionable-item>
      <geo-list-actionable-item :icon="['far', 'bell']">
        <div slot="itemTitle">Title with icon and trailing icon</div>
        <font-awesome-icon
          slot="trailingAccessoryItem"
          :icon="['fas', 'chevron-right']"
          aria-hidden
          fixed-width
        />
        <div>There are 27 new events around your stores.</div>
        <div>31/10/2018</div>
        <geo-button slot="actions" type="secondary">Button</geo-button>
      </geo-list-actionable-item>
    </div>
  </div>
</div>
```
