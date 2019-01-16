<template>
  <div :class="`geo-bordered-token${cssSuffix}`">
    <font-awesome-icon
      :class="`geo-bordered-token__icon${cssSuffix}`"
      :icon="icon"
    />
    <span :class="`geo-bordered-token__label${cssSuffix}`">
      {{ label }}
    </span>
  </div>
</template>

<script>

import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoBorderedToken',
  status: 'ready',
  release: '9.2.4',
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
