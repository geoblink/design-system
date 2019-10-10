### Full flow

```vue live
<template>
  <div class="element-demo__block">
    <geo-compact-button
      :disabled="isDisabled"
      :loading="isLoading"
      type="primary"
      @click="startLoading()"
    >
    </geo-compact-button>
    <geo-compact-button
      :disabled="isDisabled"
      :loading="isLoading"
      type="secondary"
      @click="startLoading()"
    >
    </geo-compact-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isDisabled: false,
      isLoading: false
    }
  },
  methods: {
    startLoading () {
      this.isLoading = true
      this.isDisabled = true
      setTimeout(() => this.isLoading = false, 2000)
      setTimeout(() => this.isDisabled = false, 4000)
    }
  }
}
</script>
```

### Regular

```jsx live
<div class="element-demo__block">
  <geo-compact-button type="primary"></geo-compact-button>
  <geo-compact-button type="secondary"></geo-compact-button>
</div>
```

### Hover / Focus

```jsx live
<div class="element-demo__block">
  <geo-compact-button hover type="primary"></geo-compact-button>
  <geo-compact-button hover type="secondary"></geo-compact-button>
</div>
```

### Disabled

```jsx live
<div class="element-demo__block">
  <geo-compact-button disabled type="primary"></geo-compact-button>
  <geo-compact-button disabled type="secondary"></geo-compact-button>
</div>
```

### Disabled & Hover / Focus

```jsx live
<div class="element-demo__block">
  <geo-compact-button disabled hover type="primary"></geo-compact-button>
  <geo-compact-button disabled hover type="secondary"></geo-compact-button>
</div>
```

### Loading

```jsx live
<div class="element-demo__block">
  <geo-compact-button loading type="primary"></geo-compact-button>
  <geo-compact-button loading type="secondary"></geo-compact-button>
</div>
```

### Loading & Hover / Focus

```jsx live
<div class="element-demo__block">
  <geo-compact-button loading hover type="primary"></geo-compact-button>
  <geo-compact-button loading hover type="secondary"></geo-compact-button>
</div>
```

### Loading & Disabled

```jsx live
<div class="element-demo__block">
  <geo-compact-button loading disabled type="primary"></geo-compact-button>
  <geo-compact-button loading disabled type="secondary"></geo-compact-button>
</div>
```
