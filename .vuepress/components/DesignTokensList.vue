<template>
  <div>
    <h2>Design Tokens</h2>
    <h3>Design tokens are the atoms of the system as <a href="https://www.lightningdesignsystem.com/design-tokens/">Salesforce</a> describes them. In Geoblink Design System they are used instead of hard coded values to ensure a better consistency across any platform.</h3>
    <!-- <color-palette
      :items="tokensByCategory.color"
    /> -->
    <pre><code>{{ JSON.stringify(tokensByCategory, undefined, 2) }}</code></pre>
  </div>
</template>

<script>
import * as tokens from '../public/tokens/tokens.raw.json'

export default {
  name: 'DesignTokenList',
  computed: {
    tokens () {
      return tokens
    },

    tokensProps () {
      return this.tokens.default.props
    },

    tokensByCategory () {
      return _.groupBy(this.tokensProps, 'category')
    }
  }
}
</script>
