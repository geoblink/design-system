<template>
  <section
    :class="{
      ['geo-collapsable-box']: true,
      ['geo-collapsable-box--expanded']: isExpanded
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

      <div class="geo-collapsable-box__trailing-items">
        <!-- @slot Use this slot to customize the content before the toggle icon-->
        <div @click="toggle()">
          <slot name="trailingItems" />
        </div>

        <font-awesome-icon
          :icon="toggleIcon"
          class="geo-collapsable-box__toggle-icon"
          fixed-width
          aria-hidden
        />
      </div>
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
/**
 * `GeoCollapsableBox` is a component featuring a collapsable box that can be
 * expanded on user demand.
 */
export default {
  name: 'GeoCollapsableBox',
  status: 'ready',
  release: '24.9.0',
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
