`GeoSuffixSelect` is a component designed to look like a suffix of an input, but with the posibility to have a select in order to change the value of the suffix.

```vue live
<template>
<div class="element-demo">
  <h3 class="element-demo__header">Regular suffix with select</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-suffix-select
      :dropdown-icon="['fas', 'chevron-down']"
    >
      meters
    </geo-suffix-select>
  </div>
  <h3 class="element-demo__header">Disabled suffiw with select</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-suffix-select
      disabled
    >
      meters
    </geo-suffix-select>
  </div>
  <h3 class="element-demo__header">GeoInput with select suffix</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-input v-model="value">
      <geo-suffix-select slot="suffix">
        meters
      </geo-suffix-select>
    </geo-input>
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
