<template>
  <div class="geo-list-footer-button">
    <geo-tertiary-button
      @click="handleClick($event)"
    >
      <!-- @slot Use this slot to customize the label of the button -->
      <slot />
    </geo-tertiary-button>
  </div>
</template>

<script>
export default {
  name: 'GeoListFooterButton',
  status: 'ready',
  release: '8.0.0',
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
