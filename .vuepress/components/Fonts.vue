<template>
  <div>
    <h2>Font Sizes</h2>
    <div class="font-sizes__table">
      <div class="font-sizes__table__header">
        <div
          class="font-sizes__table__header-cell font-sizes__table__header-cell--big"
        >
          Typestyle
        </div>
        <div class="font-sizes__table__header-cell font-sizes__table__header-cell--small">
          Font
        </div>
        <div class="font-sizes__table__header-cell font-sizes__table__header-cell--small">
          Weight
        </div>
        <div class="font-sizes__table__header-cell font-sizes__table__header-cell--small">
          Size
        </div>
        <div class="font-sizes__table__header-cell font-sizes__table__header-cell--small">
          Line Height
        </div>
        <div class="font-sizes__table__header-cell font-sizes__table__header-cell--small">
          Letter Spacing
        </div>
      </div>
      <div
        v-for="(font, index) in sortedTokens"
        :key="index"
        :class="{
          ['font-sizes__table__row']: true,
          ['font-sizes__table__row--grey-bg']: font.fontFamily.includes('Lato')
        }"
      >
        <div
          ref="fontSamples"
          :class="{
            'font': true,
            'font-sizes__table__row-cell': true,
            'font-sizes__table__row-cell--big': true,
            [`font-${font.value}`]: true
          }"
        >
          <span>${{ font.value }}</span>
        </div>
        <div class="font-sizes__table__row-cell font-sizes__table__row-cell--small">
          {{ font.fontFamily }}
        </div>
        <div class="font-sizes__table__row-cell font-sizes__table__row-cell--small">
          {{ font.styles.fontWeight }}
        </div>
        <div class="font-sizes__table__row-cell font-sizes__table__row-cell--small">
          {{ font.styles.fontSize }}
        </div>
        <div class="font-sizes__table__row-cell font-sizes__table__row-cell--small">
          {{ font.styles.lineHeight }}
        </div>
        <div class="font-sizes__table__row-cell font-sizes__table__row-cell--small">
          {{ font.styles.letterSpacing }}
        </div>
        <div
          v-if="index === firstMontserratFontIndex || index === firstLatoFontIndex"
          :class="{
            ['font-sizes__table__row-cell__font-family']: true,
            [`font-sizes__table__row-cell__font-family--${font.fontFamily.toLowerCase()}`]: true
          }"
        >
          {{ font.fontFamily }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const _ = require('lodash')

/**
 * This typographic scale makes it easier to achieve visual harmony in the
 * interface. It’s purposefully designed to keep the number of separate font
 * sizes to a minimum. To edit font-sizes, see
 * [/src/tokens/font-size.yml](https://github.com/viljamis/vue-design-system/blob/master/src/tokens/font-size.yml).
 */
export default {
  name: 'Fonts',
  data () {
    return {
      styles: []
    }
  },
  props: {
    fontTokens: {
      type: Array,
      required: true
    }
  },
  computed: {
    tokens () {
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
      return _.orderBy(this.tokens, ['order'], ['desc'])
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
    }
  }
}
</script>
