<template>
  <div class="font-sizes__table">
    <div class="font-sizes__table__header">
      <div
        class="font-sizes__table__header-cell font-sizes__table__header-cell--big">
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
      v-for="(font, index) in tokens"
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
      }">
        {{ font.fontFamily }}
      </div>
    </div>
  </div>
</template>

<script>
import designTokens from '@/assets/tokens/tokens.raw.json'
import _orderBy from 'lodash/orderBy'
import _filter from 'lodash/filter'

/**
 * This typographic scale makes it easier to achieve visual harmony in the
 * interface. It’s purposefully designed to keep the number of separate font
 * sizes to a minimum. To edit font-sizes, see
 * [/src/tokens/font-size.yml](https://github.com/viljamis/vue-design-system/blob/master/src/tokens/font-size.yml).
 */
export default {
  name: 'FontSize',
  data () {
    return {
      styles: []
    }
  },
  computed: {
    fontTokens () {
      return _filter(designTokens.props, { category: 'font' })
    },

    tokens () {
      return _orderBy(
        this.fontTokens.map((obj, index) => {
          const styles = this.styles[index]
          const stylesObject = styles || {}
          const fontFamily = (
            stylesObject.fontFamily || ''
          ).includes('Lato')
            ? 'Lato'
            : 'Montserrat'
          return Object.assign({}, obj, {
            hasStyles: !!styles,
            styles: styles || {},
            fontFamily,
            order: `${fontFamily}-${stylesObject.fontSize}-${stylesObject.fontWeight}`
          })
        }),
        (spec, index) => spec.order,
        'desc'
      )
    },

    firstMontserratFontIndex () {
      return this.tokens.findIndex(spec => spec.fontFamily.includes('Montserrat'))
    },

    firstLatoFontIndex () {
      return this.tokens.findIndex(spec => spec.fontFamily.includes('Lato'))
    }
  },
  mounted () {
    this.collectStyles()
  },
  methods: {
    collectStyles () {
      this.styles = this.$refs.fontSamples.map(
        function (element) {
          return getComputedStyle(element)
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../docs.tokens.scss";

@each $font-mixin-name, $value in $fontMap {
  .font-#{$font-mixin-name} {
    @include font(#{$font-mixin-name});
  }
}

/* STYLES
--------------------------------------------- */

.font-sizes__table {
  position: relative;
  width: 100%;
}
.font-sizes__table__header {
  display: flex;
  justify-content: space-between;
  padding: 0 0 0 25px;
}

.font-sizes__table__header-cell {
  color: $color_grey_light;
  font-family: $font_family_heading;
  font-size: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;

  &--big {
    width: 35%;
  }
  &--small {
    width: 10%;
  }
}

.font-sizes__table__row {
  align-items: center;
  border-bottom: 1px solid $color_grey;
  display: flex;
  justify-content: space-between;
  padding: 35px 0 20px 25px;

  &--grey-bg {
    background: #F4F6F8;
  }
}

.font-sizes__table__row-cell {
  &--big {
    width: 35%;
  }

  &--small {
    width: 10%;
  }
}

.font-sizes__table__row-cell__font-family {
  color: #919EAB;
  position: absolute;
  text-transform: uppercase;
  transform: rotate(90deg);

  &--montserrat {
    top: 33%;
    right: -90px;
  }

  &--lato {
    top: 78%;
    right: -45px;
  }
}

</style>

<docs>
  ```jsx
  <FontSize/>
  ```
</docs>
