<template>
  <div :class="`geo-list-footer-button${cssSuffix}`">
    <div
      class="geo-list-footer-button__button"
      @click="handleClick($event)"
    >
      <geo-tertiary-button>
        <!-- @slot Use this slot to customize the label of the button -->
        <slot />
      </geo-tertiary-button>
    </div>
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoListFooterButton',
  status: 'ready',
  release: '8.0.0',
  mixins: [cssSuffix],
  methods: {
    handleClick ($event) {
      /**
       * User clicked in this button
       *
       * @event click
       * @type {MouseEvent}
       */
      this.$emit('click', $event)
    }
  }
}
</script>
