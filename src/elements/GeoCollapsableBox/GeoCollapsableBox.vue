<template>
  <section
    :class="{
      [`geo-collapsable-box${cssSuffix}`]: true,
      [`geo-collapsable-box--expanded${cssSuffix}`]: isExpanded
    }"
  >
    <header
      class="geo-collapsable-box__header"
      @click="toggle()"
    >
      <div class="geo-collapsable-box__header-content">
        <!-- @slot Use this slot to customize the content which is always visible -->
        <slot name="header" />
      </div>

      <font-awesome-icon
        :icon="toggleIcon"
        class="geo-collapsable-box__toggle-icon"
        fixed-width
        aria-hidden
      />
    </header>

    <div
      v-if="isExpanded"
      class="geo-collapsable-box__body"
    >
      <!-- @slot Use this slot to customize the content which can be visible or hidden -->
      <slot />
    </div>
  </section>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoCollapsableBox',
  status: 'ready',
  release: '24.9.0',
  mixins: [cssSuffix],
  props: {
    /**
     * Whether this box should be collapsed by default (`true`) or not.
     */
    initiallyCollapsed: {
      type: Boolean,
      default: false
    },

    /**
     * Optional Font Awesome 5 icon to be displayed next to the header's label,
     * on the leading edge.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    toggleIcon: {
      type: Array,
      default: function () {
        return ['fal', 'chevron-up']
      }
    }
  },
  data () {
    return {
      isExpanded: true
    }
  },
  beforeMount () {
    this.isExpanded = !this.initiallyCollapsed
  },
  methods: {
    toggle () {
      this.isExpanded = !this.isExpanded
    }
  }
}
</script>
