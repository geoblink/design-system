<template>
  <div class="font-sizes__table">
    <div class="font-sizes__table__header">
      <div
        class="font-sizes__table__header-cell font-sizes__table__header-cell--big">
        Typestyle
      </div>
      <div class="font-sizes__table__header-cell font-sizes__table__header-cell--big">
        <font-awesome-icon
          :icon="['fas', 'weight']"
        />
      </div>
      <div class="font-sizes__table__header-cell font-sizes__table__header-cell--small">
        Size
      </div>
      <div class="font-sizes__table__header-cell font-sizes__table__header-cell--small">
        Line
      </div>
      <div class="font-sizes__table__header-cell font-sizes__table__header-cell--small">
        Character
      </div>
    </div>
    <div
      v-for="(font, index) in tokens"
      :key="index"
      :class="{
        ['font-sizes__table__row']: true,
        ['font-sizes__table__row--grey-bg']: font.font_family === 'Lato'
      }"
    >
      <div
        :style="{
          fontFamily: font.font_family,
          fontWeight: font.weight,
          fontStyle: font.font_style,
          lineHeight: font.line_height,
          letterSpacing: font.letter_spacing,
          fontSize: font.value,
          textTransform: font.text_transform,
          color: font.color
        }"
        class="font-sizes__table__row-cell font-sizes__table__row-cell--big">
        ${{ font.name.replace(/_/g, " ") }}
      </div>
      <div class="font-sizes__table__row-cell font-sizes__table__row-cell--big">
        {{ font.font_style }} ({{ font.weight }})
      </div>
      <div class="font-sizes__table__row-cell font-sizes__table__row-cell--small">
        {{ font.originalValue }}
      </div>
      <div class="font-sizes__table__row-cell font-sizes__table__row-cell--small">
        {{ font.line_height ? font.line_height : '?' }}
      </div>
      <div class="font-sizes__table__row-cell font-sizes__table__row-cell--small">
        {{ font.letter_spacing ? font.letter_spacing : '0px' }}
      </div>
      <div
        v-if="index === 0 || index === 6"
        :class="{
          ['font-sizes__table__row-cell__font-family']: true,
          [`font-sizes__table__row-cell__font-family--${font.font_family.toLowerCase()}`]: true
      }">
        {{ font.font_family }}
      </div>
    </div>
  </div>
</template>

<script>
import designTokens from '@/assets/tokens/tokens.raw.json'
import orderBy from 'lodash/orderBy'
import filter from 'lodash/filter'

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
      tokens: this.orderData(designTokens.props)
    }
  },
  methods: {
    orderData (data) {
      let order = filter(orderBy(data, ['font_family', 'value'], ['desc', 'desc']), (d) => {
        return d.category === 'font-size'
      })
      return order
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../docs.tokens.scss";

/* STYLES
--------------------------------------------- */

.font-sizes_table {
  display: flex;
  overflow: hidden;
  position: relative;
  width: 100%;
}
.font-sizes__table__header {
  display: flex;
  justify-content: space-between;
  padding: 0 0 30px 25px;
}

.font-sizes__table__header-cell {
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
  right: 57px;
  text-transform: uppercase;
  transform: rotate(90deg);

  &--montserrat {
    top: 33%;
    right: -90px;
  }

  &--lato {
    top: 80%;
    right: -45px;
  }
}

</style>

<docs>
  ```jsx
  <FontSize/>
  ```
</docs>
