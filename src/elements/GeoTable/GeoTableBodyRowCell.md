`GeoTableBodyRowCell` is a component designed to fit nicely in a
[GeoTableBodyRow](./#/Elements/GeoTable?id=geotablebodyrow).
Each instance of this component represents a single `cell` of a table and
features a slot to render any kind of content.

```
<div class="element-demo">
  <h3 class="element-demo__header">Isolated cells</h3>
  <div class="element-demo__block">
    <div class="element-demo__bordered-box">
      <geo-table-body-row-cell>
        Body row cell content
      </geo-table-body-row-cell>
    </div>

    <div class="element-demo__bordered-box">
      <geo-table-body-row-cell>
        <font-awesome-icon :icon="['fas', 'table']" />
        Cell with an icon
      </geo-table-body-row-cell>
    </div>

    <div class="element-demo__bordered-box">
      <geo-table-body-row-cell>
        <label>
          Cell with a checkbox
          <input type="checkbox">
        </label>
      </geo-table-body-row-cell>
    </div>
  </div>

  <h3 class="element-demo__header">Adjacent cells</h3>
  <div class="element-demo__block">
    <div class="element-demo__bordered-box" style="display: flex; flex-direction: row;">
      <geo-table-body-row-cell>
        Body row cell content
      </geo-table-body-row-cell>
      <geo-table-body-row-cell>
        <font-awesome-icon :icon="['fas', 'table']" />
        Cell with an icon
      </geo-table-body-row-cell>
      <geo-table-body-row-cell>
        <label>
          Cell with a checkbox
          <input type="checkbox">
        </label>
      </geo-table-body-row-cell>
    </div>
  </div>
</div>
```