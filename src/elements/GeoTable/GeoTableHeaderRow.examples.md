### Default variant

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <div class="element-demo__bordered-box">
      <geo-table-header-row>
        <geo-table-header-row-cell>Body row cell content</geo-table-header-row-cell>
      </geo-table-header-row>
    </div>

    <div class="element-demo__bordered-box">
      <geo-table-header-row>
        <geo-table-header-row-cell>
          <font-awesome-icon :icon="['fas', 'table']" /> Cell with an icon
        </geo-table-header-row-cell>
      </geo-table-header-row>
    </div>

    <div class="element-demo__bordered-box">
      <geo-table-header-row>
        <geo-table-header-row-cell>
          <label>Cell with a checkbox <input type="checkbox"></label>
        </geo-table-header-row-cell>
      </geo-table-header-row>
    </div>
  </div>
</div>
```

### Main variant

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <div class="element-demo__bordered-box">
      <geo-table-header-row variant="main">
        <geo-table-header-row-cell variant="main">Body row cell content</geo-table-header-row-cell>
      </geo-table-header-row>
    </div>

    <div class="element-demo__bordered-box">
      <geo-table-header-row variant="main">
      <geo-table-header-row-cell variant="main">
        <font-awesome-icon :icon="['fas', 'table']" /> Cell with an icon
      </geo-table-header-row-cell>
      </geo-table-header-row>
    </div>

    <div class="element-demo__bordered-box">
      <geo-table-header-row variant="main">
        <geo-table-header-row-cell variant="main">
          <label>Cell with a checkbox <input type="checkbox"></label>
        </geo-table-header-row-cell>
      </geo-table-header-row>
    </div>
  </div>
</div>
```

### Aux variant

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <div class="element-demo__bordered-box">
      <geo-table-header-row variant="aux">
        <geo-table-header-row-cell variant="aux">Body row cell content</geo-table-header-row-cell>
      </geo-table-header-row>
    </div>

    <div class="element-demo__bordered-box">
      <geo-table-header-row variant="aux">
        <geo-table-header-row-cell variant="aux">
          <font-awesome-icon :icon="['fas', 'table']" /> Cell with an icon
        </geo-table-header-row-cell>
      </geo-table-header-row>
    </div>

    <div class="element-demo__bordered-box">
      <geo-table-header-row variant="aux">
        <geo-table-header-row-cell variant="aux">
          <label>Cell with a checkbox <input type="checkbox"></label>
        </geo-table-header-row-cell>
      </geo-table-header-row>
    </div>
  </div>
</div>
```

### Single variant

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <div class="element-demo__bordered-box">
      <geo-table-header-row variant="single">
        <geo-table-header-row-cell variant="single">Body row cell content</geo-table-header-row-cell>
      </geo-table-header-row>
    </div>

    <div class="element-demo__bordered-box">
      <geo-table-header-row variant="single">
        <geo-table-header-row-cell variant="single">
          <font-awesome-icon :icon="['fas', 'table']" /> Cell with an icon
        </geo-table-header-row-cell>
      </geo-table-header-row>
    </div>

    <div class="element-demo__bordered-box">
      <geo-table-header-row variant="single">
        <geo-table-header-row-cell variant="single">
          <label>Cell with a checkbox <input type="checkbox"></label>
        </geo-table-header-row-cell>
      </geo-table-header-row>
    </div>
  </div>
</div>
```

### multiLine variant

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <div class="element-demo__bordered-box">
      <geo-table-header-row variant="multiLine">
        <geo-table-header-row-cell variant="multiLine">
          <span>First line</span>
          <span>Second line</span>
        </geo-table-header-row-cell>
      </geo-table-header-row>
    </div>

    <div class="element-demo__bordered-box">
      <geo-table-header-row variant="multiLine">
        <geo-table-header-row-cell variant="multiLine">
          <font-awesome-icon :icon="['fas', 'table']" /> Cell with an icon
        </geo-table-header-row-cell>
      </geo-table-header-row>
    </div>

    <div class="element-demo__bordered-box">
      <geo-table-header-row variant="multiLine">
        <geo-table-header-row-cell variant="multiLine">
          <label>Cell with a checkbox <input type="checkbox"></label>
        </geo-table-header-row-cell>
      </geo-table-header-row>
    </div>
  </div>
</div>
```

### Mixed variants

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <div class="element-demo__bordered-box">
      <geo-table-header-row variant="main">
        <geo-table-header-row-cell variant="main">Body row cell content</geo-table-header-row-cell>
        <geo-table-header-row-cell variant="main">
          <font-awesome-icon :icon="['fas', 'table']" /> Cell with an icon
        </geo-table-header-row-cell>
        <geo-table-header-row-cell variant="main">
          <label>Cell with a checkbox <input type="checkbox"></label>
        </geo-table-header-row-cell>
      </geo-table-header-row>
      <geo-table-header-row variant="aux">
        <geo-table-header-row-cell variant="aux">Body row cell content</geo-table-header-row-cell>
        <geo-table-header-row-cell variant="aux">
          <font-awesome-icon :icon="['fas', 'table']" /> Cell with an icon
        </geo-table-header-row-cell>
        <geo-table-header-row-cell variant="aux">
          <label>Cell with a checkbox <input type="checkbox"></label>
        </geo-table-header-row-cell>
      </geo-table-header-row>
    </div>
  </div>
</div>
```

### Customizable

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Customizable
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
    </h3>
    <div class="element-demo__block">
      <div class="element-demo__bordered-box" style="display: flex; flex-direction: row;">
        <geo-table-header-row :variant="variant">
          <geo-table-header-row-cell :variant="variant">Body row cell content</geo-table-header-row-cell>
          <geo-table-header-row-cell :variant="variant">
            <font-awesome-icon :icon="['fas', 'table']" /> Cell with an icon
          </geo-table-header-row-cell>
          <geo-table-header-row-cell :variant="variant">
            <label>Cell with a checkbox <input type="checkbox"></label>
          </geo-table-header-row-cell>
        </geo-table-header-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      variant: 'main'
    }
  },
}
</script>
```