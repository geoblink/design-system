### Isolated field

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-bordered-box-header-search-form
        v-model="value"
        placeholder="Search..."
      />

      <geo-bordered-box-header-search-form
        v-model="value"
        placeholder="Search..."
        disabled
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  }
}
</script>
```

### Inside a box

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-bordered-box>
        <geo-bordered-box-header-search-form
          v-model="value"
          placeholder="Search..."
        />
        <geo-list-clear-item>This is actually not searchable</geo-list-clear-item>
      </geo-bordered-box>

      <geo-bordered-box>
        <geo-bordered-box-header>My title</geo-bordered-box-header>
        <geo-bordered-box-header-search-form
          v-model="value"
          placeholder="Search..."
        />
        <geo-list-clear-item>This is actually not searchable</geo-list-clear-item>
      </geo-bordered-box>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  }
}
</script>
```
