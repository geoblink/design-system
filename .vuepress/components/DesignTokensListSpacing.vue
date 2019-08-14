<template>
  <div class="c-design-tokens-list__section c-design-tokens-list-spacing__list">
    <design-tokens-list-spacing-token
      v-for="prop in orderedTokens"
      :key="prop.value"
      :spacing="prop"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import TokensMixin from './tokens.mixin'

export default {
  name: 'DesignTokensListSpacing',
  mixins: [TokensMixin],
  computed: {
    orderedTokens () {
      return _.orderBy(this.spacingTokens, 'category', 'asc')
    }
  }
}
</script>
