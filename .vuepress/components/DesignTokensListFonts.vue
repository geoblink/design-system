<template>
  <div class="c-design-tokens-list__section c-design-tokens-list-fonts">
    <div class="c-design-tokens-list-fonts__table">
      <div class="c-design-tokens-list-fonts__table-header">
        <div class="c-design-tokens-list-fonts__table-header-cell c-design-tokens-list-fonts__table-header-cell--big">
          Typestyle
        </div>
        <div class="c-design-tokens-list-fonts__table-header-cell">
          Font
        </div>
        <div class="c-design-tokens-list-fonts__table-header-cell">
          Weight
        </div>
        <div class="c-design-tokens-list-fonts__table-header-cell">
          Size
        </div>
        <div class="c-design-tokens-list-fonts__table-header-cell">
          Line Height
        </div>
        <div class="c-design-tokens-list-fonts__table-header-cell">
          Letter Spacing
        </div>
      </div>

      <div
        v-for="(font, index) in sortedTokens"
        :key="index"
        :class="{
          ['c-design-tokens-list-fonts__table-body-row']: true,
          ['c-design-tokens-list-fonts__table-body-row--grey-bg']: font.fontFamily.includes('Lato')
        }"
        @click="copyVariableName(font.value)"
      >
        <div
          ref="fontSamples"
          :class="{
            'font': true,
            'c-design-tokens-list-fonts__table-body-row-cell': true,
            'c-design-tokens-list-fonts__table-body-row-cell--big': true,
            [`font-${font.value}`]: true
          }"
        >
          <span>${{ font.value.replace('_', '-') }}</span>
        </div>
        <div class="c-design-tokens-list-fonts__table-body-row-cell">
          {{ font.fontFamily }}
        </div>
        <div class="c-design-tokens-list-fonts__table-body-row-cell">
          {{ font.styles.fontWeight }}
        </div>
        <div class="c-design-tokens-list-fonts__table-body-row-cell">
          {{ font.styles.fontSize }}
        </div>
        <div class="c-design-tokens-list-fonts__table-body-row-cell">
          {{ font.styles.lineHeight }}
        </div>
        <div class="c-design-tokens-list-fonts__table-body-row-cell">
          {{ font.styles.letterSpacing }}
        </div>
        <div
          v-if="index === firstMontserratFontIndex || index === firstLatoFontIndex"
          :class="{
            ['c-design-tokens-list-fonts__table-font-family-header']: true,
            [`c-design-tokens-list-fonts__table-font-family-header--${font.fontFamily.toLowerCase()}`]: true
          }"
        >
          {{ font.fontFamily }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import TokensMixin from './tokens.mixin'

const copy = require('copy-to-clipboard')

export default {
  name: 'DesignTokensListFonts',
  mixins: [TokensMixin],
  data () {
    return {
      styles: []
    }
  },
  computed: {
    styledTokens () {
      return _.map(this.fontTokens, (obj, index) => {
        const styles = this.styles[index] || {}
        const fontFamily = _.includes(styles.fontFamily, 'Lato')
          ? 'Lato'
          : 'Montserrat'
        const order = `${fontFamily}-${styles.fontSize}-${styles.fontWeight}`

        return _.assign({}, obj, { styles, fontFamily, order })
      })
    },

    sortedTokens () {
      return _.orderBy(this.styledTokens, ['order'], ['desc'])
    },

    firstMontserratFontIndex () {
      return _.findIndex(this.sortedTokens, { fontFamily: 'Montserrat' })
    },

    firstLatoFontIndex () {
      return _.findIndex(this.sortedTokens, { fontFamily: 'Lato' })
    }
  },
  mounted () {
    this.collectStyles()
  },
  methods: {
    collectStyles () {
      this.styles = _.map(this.$refs.fontSamples, (element) => getComputedStyle(element))
    },

    copyVariableName (name) {
      copy(`\$${name.replace('_', '-')}`)
    }
  }
}
</script>
