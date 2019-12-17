### Complete flow

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-danger-button
        :disabled="isDisabled"
        :loading="isLoading"
        @click="startLoading()"
      >
        Full flow
      </geo-danger-button>
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
    <geo-danger-button>Regular</geo-danger-button>
  </div>
</div>
```

### Hover / Focus

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-danger-button hover>Hover / Focus</geo-danger-button>
  </div>
</div>
```

### Disabled

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-danger-button disabled>Disabled</geo-danger-button>
  </div>
</div>
```

### Disabled & Hover / Focus

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-danger-button disabled hover>Disabled &amp; Hover / Focus</geo-danger-button>
  </div>
</div>
```

### Loading

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-danger-button loading>Loading</geo-danger-button>
  </div>
</div>
```

### Loading & Hover / Focus

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-danger-button loading hover>Loading &amp; Hover / Focus</geo-danger-button>
  </div>
</div>
```

### Loading & Disabled

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-danger-button loading disabled>Loading &amp; Disabled</geo-danger-button>
  </div>
</div>
```
