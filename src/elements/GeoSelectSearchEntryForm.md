`GeoSelectSearchEntry` is used to search for option items inside a select

```jsx
<div class="element-demo">
  <h3 class="element-demo__header">Simple search box</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-select-search-entry-form
      :search-icon="['fas', 'search']"
      placeholder="Search..."
    >
      <span v-if="false">No options found</span>
    </geo-select-search-entry-form>
  </div>
</div>
```
