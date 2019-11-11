`GeoPrefix` component can be added as an accesory item to a `GeoInput` component.

```jsx live
<div class="element-demo">
  <h3 class="element-demo__header">Prefix with text</h3>
  <div class="element-demo__block"  style="justify-content: space-around;">
    <geo-prefix>
      meters
    </geo-prefix>
  </div>
</div>
```

```jsx live
<div class="element-demo">
  <h3 class="element-demo__header">Prefix with icon</h3>
  <div class="element-demo__block"   style="justify-content: space-around;">
    <geo-prefix>
      <font-awesome-icon
        :icon="['fas', 'bell']"
        fixed-width
      />
    </geo-prefix>
  </div>
</div>
```
