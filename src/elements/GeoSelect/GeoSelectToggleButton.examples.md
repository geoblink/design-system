`GeoSelectToggleButton` is a component designed to look like a modern HTML
`<select>` input, displaying a placeholder when no value is chosen and featuring
a trailing chevron.

### GeoSelectToggleButton with regular variant

```jsx live
<div class="element-demo">
  <h3 class="element-demo__header">Empty geo select toggle button</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-select-toggle-button
      :dropdown-icon="['fas', 'chevron-down']"
      is-empty
    >
      Choose an option
    </geo-select-toggle-button>
  </div>
  <h3 class="element-demo__header">Regular geo select toggle button</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-select-toggle-button
      :dropdown-icon="['fas', 'chevron-down']"
      :is-empty="false"
      :is-value-deletable="true"
    >
      Item 1
    </geo-select-toggle-button>
  </div>
  <h3 class="element-demo__header">Disabled geo select toggle button</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-select-toggle-button
      :is-empty="false"
      disabled
    >
      Choose an option
    </geo-select-toggle-button>
  </div>
  <h3 class="element-demo__header">Disabled empty geo select toggle button</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-select-toggle-button
      is-empty
      disabled
    >
      Choose an option
    </geo-select-toggle-button>
  </div>
</div>
```

### GeoSelectToggleButton with inputAccessory variant

``` vue live
<template>
  <div class="element-demo">
  <h3 class="element-demo__header">Regular suffix with select</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select-toggle-button
        variant="inputAccessory"
        :is-empty="false"
        :dropdown-icon="['fas', 'chevron-down']"
      >
        meters
      </geo-select-toggle-button>
    </div>

    <h3 class="element-demo__header">Disabled suffix with select</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select-toggle-button
        variant="inputAccessory"
        :is-empty="false"
        disabled
      >
        meters
      </geo-select-toggle-button>
    </div>

    <h3 class="element-demo__header">GeoInput with select prefix</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-input v-model="value">
        <geo-select-toggle-button
          variant="inputAccessory"
          :is-empty="false"
          slot="prefix"
        >
          meters
        </geo-select-toggle-button>
      </geo-input>
    </div>

    <h3 class="element-demo__header">GeoInput with select suffix</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-input v-model="value">
        <geo-select-toggle-button
          variant="inputAccessory"
          :is-empty="false"
          slot="suffix"
        >
          meters
        </geo-select-toggle-button>
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
