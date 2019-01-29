<template>
  <div :class="`geo-table-body-row${cssSuffix}`">
    <slot :css-modifier="cssModifier" />
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoTableBodyRow',
  status: 'missing-tests',
  release: '9.5.0',
  mixins: [cssSuffix]
}
</script>
