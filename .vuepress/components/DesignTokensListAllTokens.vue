<template>
  <div class="c-design-tokens-list-all-tokens">
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

export default {
  name: 'DesignTokensListAllTokens',
  props: {
    tokens: {
      type: Object,
      required: true
    }
  },
  computed: {
    orderedTokens () {
      return _.orderBy(this.tokens, ['category', 'name'], ['asc', 'asc'])
    }
  }
}
</script>