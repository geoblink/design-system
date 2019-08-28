<template>
  <div class="c-element-demo">
    <h3
      v-if="name"
      class="c-element-demo__header"
    >
      {{ name }}
    </h3>

    <div class="c-element-demo__body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElementDemo',
  props: {
    name: {
      type: String,
      required: false
    }
  }
}
</script>
