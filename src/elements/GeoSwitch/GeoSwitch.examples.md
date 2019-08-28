`GeoSwitch` is a component aimed to replace inputs of type `checkbox`. It offers
a similar API with a modern design.

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Simple switch</h3>
    <div class="element-demo__block">
      <geo-switch v-model="first" />
    </div>

    <h3 class="element-demo__header">Switch with label</h3>
    <div class="element-demo__block">
      <geo-switch v-model="second">Click to toggle</geo-switch>
    </div>

    <h3 class="element-demo__header">Disabled switch with label</h3>
    <div class="element-demo__block">
      <geo-switch v-model="third" disabled>This can't be toggled</geo-switch>
      <geo-switch v-model="first" disabled>This can be toggled with the first one</geo-switch>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      first: false,
      second: false,
      third: false
    }
  }
}
</script>
```
