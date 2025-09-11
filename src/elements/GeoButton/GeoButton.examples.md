### Full flow

```vue live
<template>
  <div class="element-demo__block">
    <geo-button
      :disabled="isDisabled"
      :loading="isLoading"
      type="primary"
      @click="startLoading()"
    >
      Primary
    </geo-button>
    <geo-button
      :disabled="isDisabled"
      :loading="isLoading"
      type="secondary"
      @click="startLoading()"
    >
      Secondary
    </geo-button>
    <geo-button
      :disabled="isDisabled"
      :loading="isLoading"
      type="tertiary"
      @click="startLoading()"
    >
      Tertiary
    </geo-button>
    <geo-button
      :disabled="isDisabled"
      :loading="isLoading"
      type="danger"
      @click="startLoading()"
    >
      Danger
    </geo-button>
    <geo-button
      :disabled="isDisabled"
      :loading="isLoading"
      type="dangerLink"
      @click="startLoading()"
    >
      Danger link
    </geo-button>
    <geo-button
      :disabled="isDisabled"
      :loading="isLoading"
      type="tooltip"
      @click="startLoading()"
    >
      Tooltip
    </geo-button>
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
  <geo-button type="primary">Primary</geo-button>
  <geo-button type="secondary">Secondary</geo-button>
  <geo-button type="tertiary">Tertiary</geo-button>
  <geo-button type="danger">Danger</geo-button>
  <geo-button type="dangerLink">Danger link</geo-button>
  <geo-button type="tooltip">Tooltip</geo-button>
</div>
```

### Hover / Focus

```jsx live
<div class="element-demo__block">
  <geo-button hover type="primary">Primary</geo-button>
  <geo-button hover type="secondary">Secondary</geo-button>
  <geo-button hover type="tertiary">Tertiary</geo-button>
  <geo-button hover type="danger">Danger</geo-button>
  <geo-button hover type="dangerLink">Danger link</geo-button>
  <geo-button hover type="tooltip">Tooltip</geo-button>
</div>
```

### Disabled

```jsx live
<div class="element-demo__block">
  <geo-button disabled type="primary">Primary</geo-button>
  <geo-button disabled type="secondary">Secondary</geo-button>
  <geo-button disabled type="tertiary">Tertiary</geo-button>
  <geo-button disabled type="danger">Danger</geo-button>
  <geo-button disabled type="dangerLink">Danger link</geo-button>
  <geo-button disabled type="tooltip">Tooltip</geo-button>
</div>
```

### Disabled & Hover / Focus

```jsx live
<div class="element-demo__block">
  <geo-button disabled hover type="primary">Primary</geo-button>
  <geo-button disabled hover type="secondary">Secondary</geo-button>
  <geo-button disabled hover type="tertiary">Tertiary</geo-button>
  <geo-button disabled hover type="danger">Danger</geo-button>
  <geo-button disabled hover type="dangerLink">Danger link</geo-button>
  <geo-button disabled hover type="tooltip">Tooltip</geo-button>
</div>
```

### Loading

```jsx live
<div class="element-demo__block">
  <geo-button loading type="primary">Primary</geo-button>
  <geo-button loading type="secondary">Secondary</geo-button>
  <geo-button loading type="tertiary">Tertiary</geo-button>
  <geo-button loading type="danger">Danger</geo-button>
  <geo-button loading type="dangerLink">Danger link</geo-button>
  <geo-button loading type="tooltip">Tooltip</geo-button>
</div>
```

### Loading & Hover / Focus

```jsx live
<div class="element-demo__block">
  <geo-button loading hover type="primary">Primary</geo-button>
  <geo-button loading hover type="secondary">Secondary</geo-button>
  <geo-button loading hover type="tertiary">Tertiary</geo-button>
  <geo-button loading hover type="danger">Danger</geo-button>
  <geo-button loading error type="dangerLink">Danger link</geo-button>
  <geo-button loading error type="tooltip">Tooltip</geo-button>
</div>
```

### Loading & Disabled

```jsx live
<div class="element-demo__block">
  <geo-button loading disabled type="primary">Primary</geo-button>
  <geo-button loading disabled type="secondary">Secondary</geo-button>
  <geo-button loading disabled type="tertiary">Tertiary</geo-button>
  <geo-button loading disabled type="danger">Danger</geo-button>
  <geo-button loading disabled type="dangerLink">Danger link</geo-button>
  <geo-button loading disabled type="tooltip">Tooltip</geo-button>
</div>
```
