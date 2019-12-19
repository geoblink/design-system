### Simple switch

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-switch v-model="value" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: false
    }
  }
}
</script>
```

### Switch with label

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-switch v-model="value">Click to toggle</geo-switch>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: false
    }
  }
}
</script>
```

### Disabled switch with label

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-switch v-model="active" disabled>This can't be toggled (active)</geo-switch>
      <geo-switch v-model="inactive" disabled>This can be toggled (inactive)</geo-switch>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: true,
      inactive: false
    }
  }
}
</script>
```
