<script>
import cssSuffix, { getCSSSuffix } from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoTableBodyRowCell',
  status: 'ready',
  release: '10.1.0',
  functional: true,
  mixins: [cssSuffix],
  render (createElement, context) {
    return createElement('div', {
      class: `geo-table-body-row-cell${getCSSSuffix(context.props.cssModifier)}`
    }, context.children)
  }
}
</script>
