<template>
  <div
    :class="['c-element-demo-actions']"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>