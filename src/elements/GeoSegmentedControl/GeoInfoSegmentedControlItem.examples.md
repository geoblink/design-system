### Regular style

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-info-segmented-control-item
        :active="active"
        @click="active = !active"
      >
        Option one
      </geo-info-segmented-control-item>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: false
    }
  }
}
</script>
```

### Regular style (active)

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-info-segmented-control-item active>
      Active option
    </geo-info-segmented-control-item>
  </div>
</div>
```

### Regular style (with icon)

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-info-segmented-control-item
        :active="active"
        @click="active = !active"
      >
        <font-awesome-icon :icon="['fas', 'cat']" fixed-width />
        <span>With icon</span>
      </geo-info-segmented-control-item>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: false
    }
  }
}
</script>
```

### Regular style (active, with icon)

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-info-segmented-control-item active>
      <font-awesome-icon :icon="['fas', 'spider']" fixed-width />
      <span>Active with icon</span>
    </geo-info-segmented-control-item>
  </div>
</div>
```

### Regular style (disabled)

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-info-segmented-control-item disabled>
      Disabled option
    </geo-info-segmented-control-item>
  </div>
</div>
```

### Regular style (disabled, active)

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-info-segmented-control-item
      disabled
      active
    >
      Active disabled option
    </geo-info-segmented-control-item>
  </div>
</div>
```

### Outline style

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-info-segmented-control-item
        :active="active"
        outline
        @click="active = !active"
      >
        Option one
      </geo-info-segmented-control-item>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: false
    }
  }
}
</script>
```

### Outline style (active)

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-info-segmented-control-item
      outline
      active
    >
      Active option
    </geo-info-segmented-control-item>
  </div>
</div>
```

### Outline style (with icon)

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-info-segmented-control-item
        :active="active"
        outline
        @click="active = !active"
      >
        <font-awesome-icon :icon="['fas', 'cat']" fixed-width />
        <span>With icon</span>
      </geo-info-segmented-control-item>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: false
    }
  }
}
</script>
```

### Outline style (active, with icon)

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-info-segmented-control-item
      active
      outline
    >
      <font-awesome-icon :icon="['fas', 'spider']" fixed-width />
      <span>Active with icon</span>
    </geo-info-segmented-control-item>
  </div>
</div>
```

### Outline style (disabled)

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-info-segmented-control-item
      outline
      disabled
    >
      Disabled option
    </geo-info-segmented-control-item>
  </div>
</div>
```

### Outline style (disabled, active)

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-info-segmented-control-item
      outline
      disabled
      active
    >
      Active disabled option
    </geo-info-segmented-control-item>
  </div>
</div>
```
