`GeoTableBodyRow` is the component that must be used to render body rows in a
[GeoTable](./#/Elements/GeoTable?id=geotable-1).
Each instance of this component represents a single `row` of a table and
features a slot to render the cells of the table.

Although not required, it is encouraged to use [GeoTableBodyRowCell](./#/Elements/GeoTable?id=geotablebodyrowcell)
instances as content of this component's slot.

```
<div class="element-demo">
  <h3 class="element-demo__header">Isolated rows</h3>
  <div class="element-demo__block">
    <div class="element-demo__bordered-box">
      <geo-table-body-row>
        <geo-table-body-row-cell>Body row cell content</geo-table-body-row-cell>
      </geo-table-body-row>
    </div>

    <div class="element-demo__bordered-box">
      <geo-table-body-row>
        <geo-table-body-row-cell>
          <font-awesome-icon :icon="['fas', 'table']" /> Cell with an icon
        </geo-table-body-row-cell>
      </geo-table-body-row>
    </div>

    <div class="element-demo__bordered-box">
      <geo-table-body-row>
        <geo-table-body-row-cell>
          <label>Cell with a checkbox <input type="checkbox"></label>
        </geo-table-body-row-cell>
      </geo-table-body-row>
    </div>
  </div>

  <h3 class="element-demo__header">Adjacent rows</h3>
  <div class="element-demo__block">
    <div class="element-demo__bordered-box">
      <geo-table-body-row>
        <geo-table-body-row-cell>Body row cell content</geo-table-body-row-cell>
        <geo-table-body-row-cell>
          <font-awesome-icon :icon="['fas', 'table']" /> Cell with an icon
        </geo-table-body-row-cell>
        <geo-table-body-row-cell>
          <label>Cell with a checkbox <input type="checkbox"></label>
        </geo-table-body-row-cell>
      </geo-table-body-row>
      <geo-table-body-row>
        <geo-table-body-row-cell>Second row, first cell</geo-table-body-row-cell>
        <geo-table-body-row-cell>Second row, second cell</geo-table-body-row-cell>
        <geo-table-body-row-cell>Second row, third cell</geo-table-body-row-cell>
      </geo-table-body-row>
      <geo-table-body-row>
        <geo-table-body-row-cell>Third row, first cell</geo-table-body-row-cell>
        <geo-table-body-row-cell>Third row, second cell</geo-table-body-row-cell>
        <geo-table-body-row-cell>Third row, third cell</geo-table-body-row-cell>
      </geo-table-body-row>
    </div>
  </div>

  <h3 class="element-demo__header">Row variants</h3>
  <div class="element-demo__block">
    <div class="element-demo__bordered-box">
      <geo-table-body-row variant="default">
        <geo-table-body-row-cell>Variant</geo-table-body-row-cell>
        <geo-table-body-row-cell>is</geo-table-body-row-cell>
        <geo-table-body-row-cell>default</geo-table-body-row-cell>
      </geo-table-body-row>
    </div>

    <div class="element-demo__bordered-box">
      <geo-table-body-row variant="alternative">
        <geo-table-body-row-cell>Variant</geo-table-body-row-cell>
        <geo-table-body-row-cell>is</geo-table-body-row-cell>
        <geo-table-body-row-cell>alternative</geo-table-body-row-cell>
      </geo-table-body-row>
    </div>

    <div class="element-demo__bordered-box">
      <geo-table-body-row variant="selected">
        <geo-table-body-row-cell>Variant</geo-table-body-row-cell>
        <geo-table-body-row-cell>is</geo-table-body-row-cell>
        <geo-table-body-row-cell>selected</geo-table-body-row-cell>
      </geo-table-body-row>
    </div>
  </div>
</div>
```