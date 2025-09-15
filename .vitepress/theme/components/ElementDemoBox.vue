<template>
  <div
    :class="['c-element-demo-box']"
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