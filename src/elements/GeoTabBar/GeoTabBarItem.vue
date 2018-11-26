<template>
  <a
    :class="{
      [`geo-tab-bar-item${cssSuffix}`]: true,
      [`geo-tab-bar-item--active${cssSuffix}`]: active,
    }"
    @click="handleClick($event)"
  >
    <!-- @slot Use this slot to customize what's displayed inside this tab -->
    <slot />
  </a>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoTabBarItem',
  status: 'missing-tests',
  release: '8.5.0',
  mixins: [cssSuffix],
  props: {
    /**
     * Whether this tab is active or not. Active tab is higlighted using a
     * slightly different style.
     *
     * Although technically possible, there should be only one active tab at
     * the same time for UX's sake.
     */
    active: {
      type: Boolean,
      default: false
    },
    /**
     * When a tab bar item is `disabled` it won't trigger any `click` event.
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick ($event) {
      if (this.disabled) return
      this.$emit('click', $event)
    }
  }
}
</script>
