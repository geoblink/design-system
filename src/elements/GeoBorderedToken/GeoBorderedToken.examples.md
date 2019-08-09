`GeoBorderedToken` is a component which just renders a small static label in a button like style.

```jsx live
<div class="element-demo">
  <h3 class="element-demo__header">Bordered token with icon</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-bordered-token
      :icon="['fas','map-marker']"
      label="Geoblink"
    />
  </div>
  <h3 class="element-demo__header">Bordered token without icon</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-bordered-token
      label="Geoblink no logo"
    />
  </div>
</div>
```
