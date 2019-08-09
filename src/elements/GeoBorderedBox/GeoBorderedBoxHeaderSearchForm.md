`GeoBorderedBoxHeaderSearchForm` is a header featuring a search form designed to
fit nicely in a [GeoBorderedBox](/#/Elements/GeoBorderedBox?id=geoborderedbox-1).

**Note:** this component is not responsible of filtering displayed elements but
[GeoSelect](/#/Elements/GeoSelect?id=geoselect-1) is.

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-bordered-box-header-search-form
      :search-icon="['fas', 'search']"
      placeholder="Search..."
    />

    <geo-bordered-box>
      <geo-bordered-box-header-search-form
        :search-icon="['fas', 'search']"
        placeholder="Search..."
      />
      <geo-list-clear-item>This is actually not searchable</geo-list-clear-item>
    </geo-bordered-box>

    <geo-bordered-box>
      <geo-bordered-box-header>My title</geo-bordered-box-header>
      <geo-bordered-box-header-search-form
        :search-icon="['fas', 'search']"
        placeholder="Search..."
      />
      <geo-list-clear-item>This is actually not searchable</geo-list-clear-item>
    </geo-bordered-box>
  </div>
</div>
```
