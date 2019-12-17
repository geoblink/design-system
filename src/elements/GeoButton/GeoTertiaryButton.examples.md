### Complete flow

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-tertiary-button
        :disabled="isDisabled"
        :loading="isLoading"
        @click="startLoading()"
      >
        Full flow
      </geo-tertiary-button>
    </div>
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
<div class="element-demo">
  <div class="element-demo__block">
    <geo-tertiary-button>Regular</geo-tertiary-button>
  </div>
</div>
```

### Hover / Focus

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-tertiary-button hover>Hover / Focus</geo-tertiary-button>
  </div>
</div>
```

### Disabled

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-tertiary-button disabled>Disabled</geo-tertiary-button>
  </div>
</div>
```

### Disabled & Hover / Focus

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-tertiary-button disabled hover>Disabled &amp; Hover / Focus</geo-tertiary-button>
  </div>
</div>
```

### Loading

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-tertiary-button loading>Loading</geo-tertiary-button>
  </div>
</div>
```

### Loading & Hover / Focus

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-tertiary-button loading hover>Loading &amp; Hover / Focus</geo-tertiary-button>
  </div>
</div>
```

### Loading & Disabled

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-tertiary-button loading disabled>Loading &amp; Disabled</geo-tertiary-button>
  </div>
</div>
```
