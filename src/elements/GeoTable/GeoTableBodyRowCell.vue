<template functional>
  <div :class="`geo-table-body-row-cell${$options.helpers.getCSSSuffix(props.cssModifier)}`">
    <!-- @slot Use this slot to customize cell's content -->
    <slot :css-modifier="props.cssModifier" />
  </div>
</template>

<script>
import cssSuffix, { getCSSSuffix } from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoTableBodyRowCell',
  status: 'ready',
  release: '10.1.0',
  helpers: {
    getCSSSuffix
  },
  mixins: [cssSuffix]
}
</script>
