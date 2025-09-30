import * as tokens from '../../docs/tokens/tokens.raw.json'
import _ from 'lodash'

export default {
  computed: {
    allTokens () {
      return tokens
    },

    allTokensProps () {
      return this.allTokens.default.props
    },

    allTokensByType () {
      return _.groupBy(this.allTokensProps, 'type')
    },

    allTokensByCategory () {
      return _.groupBy(this.allTokensProps, 'category')
    },

    colorTokens () {
      return this.allTokensByType.color
    },

    fontTokens () {
      return this.allTokensByCategory.font
    },

    spacingTokens () {
      return this.allTokensByCategory.space
    }
  }
}
