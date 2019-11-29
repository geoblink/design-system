<template>
  <div :class="`geo-bordered-token${cssSuffix}`">
    <font-awesome-icon
      v-if="icon"
      :icon="icon"
      class="geo-bordered-token__icon"
    />
    <span class="geo-bordered-token__label">
      <span v-if="label">
        {{ label }}
      </span>
      <!-- @slot Use this slot to customize what's displayed in the label -->
      <slot v-else />
    </span>
  </div>
</template>

<script>

import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoBorderedToken',
  status: 'ready',
  release: '9.3.0',
  mixins: [cssSuffix],
  props: {
    /**
     * Font Awesome 5 icon to be displayed.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    icon: {
      type: Array,
      required: false
    },
    /**
     * Text to be displayed as label of the token element.
     *
     * Deprecated: use the default slot instead
     */
    label: {
      type: String,
      required: false,
      validator (value) {
        if (value) console.warn('GeoBorderedToken [component] :: Using label prop is deprecated, use default slot instead')
        return true
      }
    }
  }
}
</script>
