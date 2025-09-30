<template>
  <div class="c-design-tokens-list__section c-design-tokens-list-colors">
    <div class="c-design-tokens-list-colors__color-tokens-list">
      <design-tokens-list-color-token
        v-for="prop in orderedTokens"
        :key="prop.name"
        :color="prop"
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import TokensMixin from './tokens.mixin'

export default {
  name: 'DesignTokensListColors',
  mixins: [TokensMixin],
  computed: {
    orderedTokens () {
      return _.orderBy(this.colorTokens, ['category', 'name'], ['asc', 'asc'])
    }
  }
}
</script>
