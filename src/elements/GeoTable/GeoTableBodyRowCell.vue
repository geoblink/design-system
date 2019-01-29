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
  status: 'missing-tests',
  release: '9.5.0',
  mixins: [cssSuffix]
}
</script>
