<template>
  <div
    :style="{
      lineHeight: spacingValue,
      height: spacingValue
    }"
    class="spacing-token"
  >
    <p :class="{
      'spacing-description': true,
      'spacing-description--offset': ['5px', '10px'].includes(spacingValue)
    }">
      <span class="spacing-name">{{ spacingName }}</span> <span>({{ spacingValue }})</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'SpacingToken',
  props: {
    spacing: {
      type: Object,
      required: true
    }
  },

  computed: {
    spacingName () {
      return `$${this.spacing.name.replace(/_/g, "-")}`
    },

    spacingValue () {
      return this.spacing.value
    }
  }
}
</script>