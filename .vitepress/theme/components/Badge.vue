<template>
  <span class="c-badge" :style="{ backgroundColor: badgeColor }">
    {{ text }}
  </span>
</template>

<script>
const BADGE_TYPES = {
  ready: 'Ready',
  missingTests: 'Missing tests',
  deprecated: 'Deprecated'
}

export default {
  name: 'Badge',
  props: {
    text: {
      type: String,
      required: true
    }
  },
  computed: {
    badgeColor() {
      // Replicating colors used in AllElementsListItem.vue
      // TODO: use DS tokens instead
      const colorByStatus = {
        [BADGE_TYPES.ready]: '#42b983',
        [BADGE_TYPES.missingTests]: '#e7c000',
        [BADGE_TYPES.deprecated]: '#da5961'
      }

      return colorByStatus[this.text] || '#42b983'
    }
  }
}
</script>
