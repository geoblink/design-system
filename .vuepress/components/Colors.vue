<template>
  <div>
    <h2>Color Palette</h2>
    <div class="colors">
      <color-token
        v-for="(prop, index) in orderedColorTokens"
        :key="index"
        :color="prop"
      />
    </div>
  </div>
</template>

<script>
const _ = require('lodash')

/**
 * The color palette comes with 5 different weights for each hue. These hues
 * should be used purposefully to communicate how things function in the
 * interface. Keep in mind that `vermilion` is only used in special cases
 * like destructive actions and error messages. To edit the colors, see
 * [/src/tokens/color.yml](https://github.com/viljamis/vue-design-system/blob/master/src/tokens/color.yml).
 */
export default {
  name: 'Colors',
  props: {
    colorTokens: {
      type: Array,
      required: true
    }
  },
  computed: {
    orderedColorTokens () {
      return _.orderBy(this.colorTokens, ['category', 'name'], ['asc', 'asc'])
    }
  }
}
</script>
