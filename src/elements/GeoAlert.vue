<template>
  <div
    :class="{
      [`geo-alert${cssSuffix}`]: true,
      [`geo-alert--floating${cssSuffix}`]: floating
    }"
  >
    <div
      :class="{
        [`geo-alert__content${cssSuffix}`]: true,
        [`geo-alert__content--${variant}${cssSuffix}`]: variant
      }"
    >
      <div
        v-if="hasIcon"
        :class="`geo-alert__content__icon${cssSuffix}`"
      >
        <!-- @slot Use this slot to show an icon before alert message -->
        <slot name="icon" />
      </div>
      <div :class="`geo-alert__content__body${cssSuffix}`">
        <!-- @slot Use this slot to show the alert message -->
        <slot name="content" />
      </div>
      <div
        v-if="hasActions"
        :class="`geo-alert__content__actions${cssSuffix}`"
      >
        <!-- @slot Use this slot to show additional actions after alert message -->
        <slot name="actions" />
      </div>
      <font-awesome-icon
        v-if="shouldShowCloseButton"
        :icon="closeIcon"
        :class="`geo-alert__content__close-icon${cssSuffix}`"
        aria-hidden
        fixed-width
        @click="close($event)"
      />
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

const VARIANTS = {
  success: 'success',
  info: 'info',
  warn: 'warn',
  error: 'error',
  progress: 'progress'
}

export default {
  name: 'GeoAlert',
  status: 'ready',
  release: '1.0.0',
  components: {
    FontAwesomeIcon
  },
  constants: {
    VARIANTS
  },
  props: {
    /**
     * Whether this alert is floating or not. Floating alerts get special CSS
     * classes with default floating behaviour to reduce boilerplate.
     */
    floating: {
      type: Boolean,
      default: false
    },
    /**
     * Icon used for alert dismissal button.
     */
    closeIcon: {
      type: Array,
      default () {
        return ['fal', 'times']
      }
    },
    /**
     * Variant of the alert, supporting:
     *
     * - `success`
     * - `info`
     * - `warn`
     * - `error`
     * - `progress`
     *
     * Those values are exported under `VARIANTS` name.
     *
     * Variant only affects default CSS styling and no icon nor behaviour is
     * affected.
     */
    variant: {
      type: String,
      required: true,
      validator (value) {
        return value in VARIANTS
      }
    },
    /**
     * An optional suffix to be appended as BEM modifier.
     *
     * Can be used to customize the look & feel of the component by changing all
     * the CSS classes by different ones so no CSS loaded by default affects
     * them.
     *
     * To generate default styles for a modifier named `modifier-name`, you just
     * have to add `@include geo-button-make('modifier-name');` to your SCSS
     * styles.
     */
    cssModifier: {
      type: String,
      default: ''
    }
  },
  computed: {
    cssSuffix () {
      return this.cssModifier ? `--${this.cssModifier}` : ''
    },

    hasIcon () {
      return !!(this.$slots.icon || []).length
    },

    hasActions () {
      return !!(this.$slots.actions || []).length
    },

    shouldShowCloseButton () {
      return this.$listeners.close
    }
  },
  methods: {
    close (event) {
      this.$emit('close', event)
    }
  }
}
</script>
