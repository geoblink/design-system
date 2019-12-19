### Regular variant

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

    <geo-select-toggle-button
      :dropdown-icon="['fas', 'chevron-down']"
      :is-empty="false"
    >
      Item 1
    </geo-select-toggle-button>

    <geo-select-toggle-button
      :dropdown-icon="['fas', 'chevron-down']"
      :is-empty="false"
      :is-value-deletable="true"
    >
      Item 1
    </geo-select-toggle-button>

    <geo-select-toggle-button
      :is-empty="false"
      disabled
    >
      Choose an option
    </geo-select-toggle-button>

    <geo-select-toggle-button
      is-empty
      disabled
    >
      Choose an option
    </geo-select-toggle-button>
  </div>
</div>
```

### inputAccessoryPrefix variant

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-select-toggle-button
      :dropdown-icon="['fas', 'chevron-down']"
      variant="inputAccessoryPrefix"
      is-empty
    >
      Choose an option
    </geo-select-toggle-button>

    <geo-select-toggle-button
      :dropdown-icon="['fas', 'chevron-down']"
      :is-empty="false"
      variant="inputAccessoryPrefix"
    >
      Item 1
    </geo-select-toggle-button>

    <geo-select-toggle-button
      :dropdown-icon="['fas', 'chevron-down']"
      :is-empty="false"
      :is-value-deletable="true"
      variant="inputAccessoryPrefix"
    >
      Item 1
    </geo-select-toggle-button>

    <geo-select-toggle-button
      :is-empty="false"
      variant="inputAccessoryPrefix"
      disabled
    >
      Choose an option
    </geo-select-toggle-button>

    <geo-select-toggle-button
      variant="inputAccessoryPrefix"
      is-empty
      disabled
    >
      Choose an option
    </geo-select-toggle-button>
  </div>
</div>
```

### GeoInput with select prefix

``` vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-input v-model="value">
        <geo-select-toggle-button
          slot="leadingAccessoryItem"
          variant="inputAccessoryPrefix"
          :is-empty="false"
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
```

### inputAccessorySuffix variant

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-select-toggle-button
      :dropdown-icon="['fas', 'chevron-down']"
      variant="inputAccessorySuffix"
      is-empty
    >
      Choose an option
    </geo-select-toggle-button>

    <geo-select-toggle-button
      :dropdown-icon="['fas', 'chevron-down']"
      :is-empty="false"
      variant="inputAccessorySuffix"
    >
      Item 1
    </geo-select-toggle-button>

    <geo-select-toggle-button
      :dropdown-icon="['fas', 'chevron-down']"
      :is-empty="false"
      :is-value-deletable="true"
      variant="inputAccessorySuffix"
    >
      Item 1
    </geo-select-toggle-button>

    <geo-select-toggle-button
      :is-empty="false"
      variant="inputAccessorySuffix"
      disabled
    >
      Choose an option
    </geo-select-toggle-button>

    <geo-select-toggle-button
      variant="inputAccessorySuffix"
      is-empty
      disabled
    >
      Choose an option
    </geo-select-toggle-button>
  </div>
</div>
```

### GeoInput with select suffix

``` vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-input v-model="value">
        <geo-select-toggle-button
          slot="trailingAccessoryItem"
          variant="inputAccessorySuffix"
          :is-empty="false"
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
```
