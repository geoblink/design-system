### Default variant

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around">
    <div class="element-demo__bordered-box">
      <geo-table-header-row-cell>
        Body row cell content
      </geo-table-header-row-cell>
    </div>

    <div class="element-demo__bordered-box">
      <geo-table-header-row-cell>
        <font-awesome-icon :icon="['fas', 'table']" />
        Cell with an icon
      </geo-table-header-row-cell>
    </div>

    <div class="element-demo__bordered-box">
      <geo-table-header-row-cell>
        <label>
          Cell with a checkbox
          <input type="checkbox">
        </label>
      </geo-table-header-row-cell>
    </div>
  </div>
</div>
```

### Main variant

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around">
    <div class="element-demo__bordered-box">
      <geo-table-header-row-cell variant="main">
        Body row cell content
      </geo-table-header-row-cell>
    </div>

    <div class="element-demo__bordered-box">
      <geo-table-header-row-cell variant="main">
        <font-awesome-icon :icon="['fas', 'table']" />
        Cell with an icon
      </geo-table-header-row-cell>
    </div>

    <div class="element-demo__bordered-box">
      <geo-table-header-row-cell variant="main">
        <label>
          Cell with a checkbox
          <input type="checkbox">
        </label>
      </geo-table-header-row-cell>
    </div>
  </div>
</div>
```

### Aux variant

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around">
    <div class="element-demo__bordered-box">
      <geo-table-header-row-cell variant="aux">
        Body row cell content
      </geo-table-header-row-cell>
    </div>

    <div class="element-demo__bordered-box">
      <geo-table-header-row-cell variant="aux">
        <font-awesome-icon :icon="['fas', 'table']" />
        Cell with an icon
      </geo-table-header-row-cell>
    </div>

    <div class="element-demo__bordered-box">
      <geo-table-header-row-cell variant="aux">
        <label>
          Cell with a checkbox
          <input type="checkbox">
        </label>
      </geo-table-header-row-cell>
    </div>
  </div>
</div>
```

### Single variant

```jsx live
<div class="element-demo">

  <div class="element-demo__block" style="justify-content: space-around">
    <div class="element-demo__bordered-box">
      <geo-table-header-row-cell variant="single">
        Body row cell content
      </geo-table-header-row-cell>
    </div>

    <div class="element-demo__bordered-box">
      <geo-table-header-row-cell variant="single">
        <font-awesome-icon :icon="['fas', 'table']" />
        Cell with an icon
      </geo-table-header-row-cell>
    </div>

    <div class="element-demo__bordered-box">
      <geo-table-header-row-cell variant="single">
        <label>
          Cell with a checkbox
          <input type="checkbox">
        </label>
      </geo-table-header-row-cell>
    </div>
  </div>
</div>
```

### Customizable variant

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around">
      <div class="element-demo__bordered-box" style="display: flex; flex-direction: row;">
        <geo-table-header-row-cell :variant="variant">
          Body row cell content
        </geo-table-header-row-cell>
        <geo-table-header-row-cell :variant="variant">
          <font-awesome-icon :icon="['fas', 'table']" />
          Cell with an icon
        </geo-table-header-row-cell>
        <geo-table-header-row-cell :variant="variant">
          <label>
            Cell with a checkbox
            <input type="checkbox">
          </label>
        </geo-table-header-row-cell>
      </div>

      <div class="element-demo__inline-input-group">
        <label class="element-demo__inline-input-group__field">
          Variant: <select
            v-model="variant"
          >
            <option value="main">Main</option>
            <option value="aux">Aux</option>
            <option value="single">Single</option>
          </select>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoTableHeaderRowCellDemo',
  data () {
    return {
      variant: 'main'
    }
  },
}
</script>
```
