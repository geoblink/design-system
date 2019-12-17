### Full flow

```vue live
<template>
  <div class="element-demo__block">
    <geo-compact-button
      :disabled="isDisabled"
      :loading="isLoading"
      type="primary"
      @click="startLoading()"
    />
    <geo-compact-button
      :disabled="isDisabled"
      :loading="isLoading"
      type="secondary"
      @click="startLoading()"
    />
    <geo-compact-button
      :disabled="isDisabled"
      :loading="isLoading"
      type="danger"
      @click="startLoading()"
    />
    <geo-compact-button
      :disabled="isDisabled"
      :loading="isLoading"
      type="inputAccessory"
      @click="startLoading()"
    />
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
  <geo-compact-button type="primary" />
  <geo-compact-button type="secondary" />
  <geo-compact-button type="danger" />
  <geo-compact-button type="inputAccessory" />
</div>
```

### Hover / Focus

```jsx live
<div class="element-demo__block">
  <geo-compact-button hover type="primary" />
  <geo-compact-button hover type="secondary" />
  <geo-compact-button hover type="danger" />
  <geo-compact-button hover type="inputAccessory" />
</div>
```

### Disabled

```jsx live
<div class="element-demo__block">
  <geo-compact-button disabled type="primary" />
  <geo-compact-button disabled type="secondary" />
  <geo-compact-button disabled type="danger" />
  <geo-compact-button disabled type="inputAccessory" />
</div>
```

### Disabled & Hover / Focus

```jsx live
<div class="element-demo__block">
  <geo-compact-button disabled hover type="primary" />
  <geo-compact-button disabled hover type="secondary" />
  <geo-compact-button disabled hover type="danger" />
  <geo-compact-button disabled hover type="inputAccessory" />
</div>
```

### Loading

```jsx live
<div class="element-demo__block">
  <geo-compact-button loading type="primary" />
  <geo-compact-button loading type="secondary" />
  <geo-compact-button loading type="danger" />
  <geo-compact-button loading type="inputAccessory" />
</div>
```

### Loading & Hover / Focus

```jsx live
<div class="element-demo__block">
  <geo-compact-button loading hover type="primary" />
  <geo-compact-button loading hover type="secondary" />
  <geo-compact-button loading hover type="danger" />
  <geo-compact-button loading hover type="inputAccessory" />
</div>
```

### Loading & Disabled

```jsx live
<div class="element-demo__block">
  <geo-compact-button loading disabled type="primary" />
  <geo-compact-button loading disabled type="secondary" />
  <geo-compact-button loading disabled type="danger" />
  <geo-compact-button loading disabled type="inputAccessory" />
</div>
```

### Loading & Disabled & Hover / Focus

```jsx live
<div class="element-demo__block">
  <geo-compact-button loading disabled hover type="primary" />
  <geo-compact-button loading disabled hover type="secondary" />
  <geo-compact-button loading disabled hover type="danger" />
  <geo-compact-button loading disabled hover type="inputAccessory" />
</div>
```
