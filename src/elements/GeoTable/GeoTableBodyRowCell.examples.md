### Isolated cells

```jsx live
<div class="element-demo">
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
</div>
```

### Adjacent cells

```jsx live
<div class="element-demo">
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