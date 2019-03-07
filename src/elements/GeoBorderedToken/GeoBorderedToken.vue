<template>
  <div :class="`geo-bordered-token${cssSuffix}`">
    <font-awesome-icon
      v-if="icon"
      :icon="icon"
      class="geo-bordered-token__icon"
    />
    <span class="geo-bordered-token__label">
      {{ label }}
    </span>
  </div>
</template>

<script>

import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoBorderedToken',
  status: 'missing-tests',
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
     */
    label: {
      type: String,
      required: true
    }
  }
}
</script>
