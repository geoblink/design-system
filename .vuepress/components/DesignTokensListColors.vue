<template>
  <div class="c-design-tokens-list-colors">
    <h2>Color Palette</h2>
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
const _ = require('lodash')

export default {
  name: 'DesignTokensListColors',
  props: {
    tokens: {
      type: Array,
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
