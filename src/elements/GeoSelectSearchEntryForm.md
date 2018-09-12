`GeoSelectSearchEntry` is a search form designed to fit nicely in a `GeoSelect` header.
Note that filtering logic is not part of this component but of `GeoSelect`.

```jsx
<div class="element-demo">
  <h3 class="element-demo__header">Simple search box</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-select-search-entry-form
      :search-icon="['fas', 'search']"
      placeholder="Search..."
    />
  </div>
</div>
```
