### Complete flow

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-primary-button
        :disabled="isDisabled"
        :loading="isLoading"
        @click="startLoading()"
      >
        Full flow
      </geo-primary-button>
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
    <geo-primary-button>Regular</geo-primary-button>
  </div>
</div>
```

### Hover / Focus

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-primary-button hover>Hover / Focus</geo-primary-button>
  </div>
</div>
```

### Disabled

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-primary-button disabled>Disabled</geo-primary-button>
  </div>
</div>
```

### Disabled & Hover / Focus

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-primary-button disabled hover>Disabled &amp; Hover / Focus</geo-primary-button>
  </div>
</div>
```

### Loading

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-primary-button loading>Loading</geo-primary-button>
  </div>
</div>
```

### Loading & Hover / Focus

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-primary-button loading hover>Loading &amp; Hover / Focus</geo-primary-button>
  </div>
</div>
```

### Loading & Disabled

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-primary-button loading disabled>Loading &amp; Disabled</geo-primary-button>
  </div>
</div>
```
