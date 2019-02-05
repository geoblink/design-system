<template>
  <div :class="`geo-table-body-row-cell${cssSuffix}`">
    <!-- @slot Use this slot to customize cell's content -->
    <slot :css-modifier="cssModifier" />
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoTableBodyRowCell',
  status: 'ready',
  release: '10.1.0',
  mixins: [cssSuffix]
}
</script>
