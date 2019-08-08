<template>
  <div>
    <h2>Design Tokens</h2>
    <p>This comes from a custom Vue component</p>
    <p>This is the automatically generated and refreshed tokens list</p>
    <pre><code>{{ JSON.stringify(tokens, undefined, 2) }}</code></pre>
  </div>
</template>

<script>
import * as tokens from '../public/tokens/tokens.raw.json'

export default {
  name: 'DesignTokenList',
  computed: {
    tokens () {
      return tokens
    }
  }
}
</script>
