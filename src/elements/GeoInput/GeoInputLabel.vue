<template functional>
  <div
    v-bind="data.attrs"
    :class="[
      data.class,
      data.staticClass,
      `geo-input-label${$options.helpers.getCSSSuffix(props.cssModifier)}`
    ]"
    v-on="listeners"
  >
    <!-- @slot Use this slot to customize content displayed inside the label -->
    <slot />
  </div>
</template>

<script>
import cssSuffix, { getCSSSuffix } from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoInputLabel',
  status: 'ready',
  release: '24.1.0',
  helpers: {
    getCSSSuffix
  },
  mixins: [cssSuffix]
}
</script>
