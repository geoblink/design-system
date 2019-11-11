`GeoSuffix` component can be added as an accesory item to a `GeoInput` component.

```jsx live
<div class="element-demo">
  <h3 class="element-demo__header">Suffix with text</h3>
  <div class="element-demo__block"  style="justify-content: space-around;">
    <geo-suffix>
      meters
    </geo-suffix>
  </div>
</div>
```

```jsx live
<div class="element-demo">
  <h3 class="element-demo__header">Suffix with icon</h3>
  <div class="element-demo__block"   style="justify-content: space-around;">
    <geo-suffix>
      <font-awesome-icon
        :icon="['fas', 'euro-sign']"
        fixed-width
      />
    </geo-suffix>
  </div>
</div>
```
