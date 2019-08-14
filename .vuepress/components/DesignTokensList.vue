<template>
  <div>
    <h1>Design Tokens</h1>
    <h4>Design tokens are the atoms of the system as <a href="https://www.lightningdesignsystem.com/design-tokens/">Salesforce</a> describes them. In Geoblink Design System they are used instead of hard coded values to ensure a better consistency across any platform.</h4>
    <colors
      :tokens="colorTokens"
      class="design-token-section"
    />
    <fonts
      :tokens="fontTokens"
      class="design-token-section"
    />
    <spacing
      :tokens="spacingTokens"
      class="design-token-section"
    />
    <all-tokens
      :tokens="tokensProps"
      class="design-token-section"
    />
  </div>
</template>

<script>
import * as tokens from './../public/tokens/tokens.raw.json'

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
    },

    tokensByType () {
      return _.groupBy(this.tokensProps, 'type')
    },

    fontTokens () {
      return this.tokensByCategory.font
    },

    colorTokens () {
      return this.tokensByType.color
    },

    spacingTokens () {
      return this.tokensByCategory.space
    }
  }
}
</script>
