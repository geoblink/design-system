### Isolated rows

```jsx live
<div class="element-demo">
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
</div>
```

### Adjacent rows

```jsx live
<div class="element-demo">
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
</div>
```

### Default variant

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <div class="element-demo__bordered-box">
      <geo-table-body-row variant="default">
        <geo-table-body-row-cell>Variant</geo-table-body-row-cell>
        <geo-table-body-row-cell>is</geo-table-body-row-cell>
        <geo-table-body-row-cell>default</geo-table-body-row-cell>
      </geo-table-body-row>
    </div>
  </div>
</div>
```

### Highlighted variant

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <div class="element-demo__bordered-box">
      <geo-table-body-row variant="highlighted">
        <geo-table-body-row-cell>Variant</geo-table-body-row-cell>
        <geo-table-body-row-cell>is</geo-table-body-row-cell>
        <geo-table-body-row-cell>highlighted</geo-table-body-row-cell>
      </geo-table-body-row>
    </div>
  </div>
</div>
```

### Active variant

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <div class="element-demo__bordered-box">
      <geo-table-body-row variant="active">
        <geo-table-body-row-cell>Variant</geo-table-body-row-cell>
        <geo-table-body-row-cell>is</geo-table-body-row-cell>
        <geo-table-body-row-cell>active</geo-table-body-row-cell>
      </geo-table-body-row>
    </div>
  </div>
</div>
```

### Highlighted-active variant

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <div class="element-demo__bordered-box">
      <geo-table-body-row variant="highlighted-active">
        <geo-table-body-row-cell>Variant</geo-table-body-row-cell>
        <geo-table-body-row-cell>is</geo-table-body-row-cell>
        <geo-table-body-row-cell>highlighted-active</geo-table-body-row-cell>
      </geo-table-body-row>
    </div>
  </div>
</div>
```
