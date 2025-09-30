<template>
  <div class="c-design-tokens-list__section c-design-tokens-list-all-tokens">
    <table>
      <thead>
        <tr>
          <th>Token Name</th>
          <th>Value</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        <design-tokens-list-all-tokens-item
          v-for="token in orderedTokens"
          :key="token.name"
          :token="token"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import _ from 'lodash'
import TokensMixin from './tokens.mixin'

export default {
  name: 'DesignTokensListAllTokens',
  mixins: [TokensMixin],
  computed: {
    orderedTokens () {
      return _.orderBy(this.allTokensProps, ['category', 'name'], ['asc', 'asc'])
    }
  }
}
</script>