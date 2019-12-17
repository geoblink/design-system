### Complete flow

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-input-accessory-compact-button
        :icon="['fas', 'exclamation-triangle']"
        :disabled="isDisabled"
        :loading="isLoading"
        @click="startLoading()"
      />
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
    <geo-input-accessory-compact-button :icon="['fas', 'exclamation-triangle']" />
  </div>
</div>
```

### Hover / Focus

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-input-accessory-compact-button
      :icon="['fas', 'exclamation-triangle']"
      hover
    />
  </div>
</div>
```

### Disabled

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-input-accessory-compact-button
      :icon="['fas', 'exclamation-triangle']"
      disabled
    />
  </div>
</div>
```

### Disabled & Hover / Focus

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-input-accessory-compact-button
      :icon="['fas', 'exclamation-triangle']"
      disabled
      hover
    />
  </div>
</div>
```

### Loading

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-input-accessory-compact-button
      :icon="['fas', 'exclamation-triangle']"
      loading
    />
  </div>
</div>
```

### Loading & Hover / Focus

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-input-accessory-compact-button
      :icon="['fas', 'exclamation-triangle']"
      loading
      hover
    />
  </div>
</div>
```

### Loading & Disabled

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-input-accessory-compact-button
      :icon="['fas', 'exclamation-triangle']"
      loading
      disabled
    />
  </div>
</div>
```

### Loading & Disabled & Hover / Focus

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-input-accessory-compact-button
      :icon="['fas', 'exclamation-triangle']"
      loading
      disabled
      hover
    />
  </div>
</div>
```
