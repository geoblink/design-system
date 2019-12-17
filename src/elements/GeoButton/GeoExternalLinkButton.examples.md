### Complete flow

```vue live
<template>
  <geo-external-link-button
    :disabled="isDisabled"
    :loading="isLoading"
    @click="startLoading()"
  >
    Full flow
  </geo-external-link-button>
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
  <geo-external-link-button>Regular</geo-external-link-button>
  <geo-external-link-button href="https://geoblink.com">Open external link</geo-external-link-button>
</div>
```

### Hover / Focus

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-external-link-button hover>Hover / Focus</geo-external-link-button>
  </div>
</div>
```

### Disabled

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-external-link-button disabled>Disabled</geo-external-link-button>
  </div>
</div>
```

### Disabled & Hover / Focus

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-external-link-button disabled hover>Disabled &amp; Hover / Focus</geo-external-link-button>
  </div>
</div>
```

### Loading

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-external-link-button loading>Loading</geo-external-link-button>
  </div>
</div>
```

### Loading & Hover / Focus

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-external-link-button loading hover>Loading &amp; Hover / Focus</geo-external-link-button>
  </div>
</div>
```

### Loading & Disabled

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-external-link-button loading disabled>Loading &amp; Disabled</geo-external-link-button>
  </div>
</div>
```
