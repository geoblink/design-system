<template>
  <div
    :class="`geo-select-opt-group-entry__container${cssSuffix}`"
    @click="changeCurrentSelection">
    <!-- @slot Use this slot to add elements to the opt group entry label's leading side (icons, radio buttons, etc) -->
    <slot name="leadingAccessoryItem" />
    <div
      :class="`geo-select-opt-group-entry__content${cssSuffix}`">
      <!-- @slot Use this slot to customize this entry’s content. -->
      <slot />
    </div>
    <!-- @slot Use this slot to add elements to the opt group entry label's trailing side (icons, radio buttons, etc) -->
    <slot name="trailingAccessoryItem" />
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoSelectOptGroupEntry',
  status: 'missing-tests',
  release: '8.1.0',
  mixins: [cssSuffix],
  methods: {
    changeCurrentSelection () {
      /**
       * Change GeoSelect selection event
       * @event change-current-selection
       */
      this.$emit('change-current-selection')
    }
  }
}
</script>
