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
/**
 * `GeoListFooterButton` is component designed to be displayed as footer of a
 * collection of [GeoListItem](./GeoListItem) that nicely fits with the rest of
 * items of the list.
 */
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
