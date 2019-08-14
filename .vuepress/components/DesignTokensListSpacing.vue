<template>
  <div>
    <h2>Spacing</h2>
    <div class="c-design-tokens-list-spacing__list">
      <design-tokens-list-spacing-token
        v-for="prop in tokens"
        :key="prop.value"
        :spacing="prop"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DesignTokensListSpacing',
  props: {
    tokens: {
      type: Array,
      required: true
    }
  },
  computed: {
    orderedTokens () {
      return _.orderBy(this.tokens, 'category', 'asc')
    }
  }
}
</script>
