`GeoListActionableItem` is a component designed to build vertical lists with custom content which fit
properly in a [GeoList](./#/Elements/GeoList?id=geolist-1).

It can be customized in several ways, adding icons to the leading edge of the
row or more complex elements (like form inputs) to the trailing edge.

```jsx
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <div class="element-demo__item">
      <geo-list-actionable-item active="true">
        <div slot="itemTitle">List item 1 no icon</div>
        <font-awesome-icon
          slot="trailingAccessoryItem"
          :icon="['fas', 'times']"
          aria-hidden
          fixed-width
        />
        <div>Hay 11 eventos nuevos alrededor de tus tiendas.</div>
        <div>31/10/2018</div>
      </geo-list-actionable-item>
      <geo-list-actionable-item>
        <div slot="itemTitle">List item 2</div>
        <font-awesome-icon
          slot="trailingAccessoryItem"
          :icon="['fas', 'times']"
          aria-hidden
          fixed-width
        />
        <div>Hay 11 eventos nuevos alrededor de tus tiendas.</div>
        <div>31/10/2018</div>
        <geo-button slot="actions" type="secondary">Button</geo-button>
      </geo-list-actionable-item>
    </div>

    <div class="element-demo__item">
      <geo-list-actionable-item :icon="['far', 'bell']">
        <div slot="itemTitle">Actionable icon and trailing icon</div>
        <font-awesome-icon
          slot="trailingAccessoryItem"
          :icon="['fas', 'chevron-right']"
          aria-hidden
          fixed-width
        />
        <div>Hay 11 eventos nuevos alrededor de tus tiendas.</div>
        <div>31/10/2018</div>
        <geo-button slot="actions" type="secondary">Button</geo-button>
      </geo-list-actionable-item>
      <geo-list-actionable-item :icon="['far', 'bell']">
        <div slot="itemTitle">Actionable icon and trailing icon</div>
        <font-awesome-icon
          slot="trailingAccessoryItem"
          :icon="['fas', 'chevron-right']"
          aria-hidden
          fixed-width
        />
        <div>Hay 11 eventos nuevos alrededor de tus tiendas.</div>
        <div>31/10/2018</div>
        <geo-button slot="actions" type="secondary">Button</geo-button>
      </geo-list-actionable-item>
    </div>
  </div>
</div>
```
