<template>
  <div>
    <h2>Spacing</h2>
    <div class="spacing">
      <spacing-token
        v-for="(prop, index) in tokens"
        :key="index"
        :spacing="prop"
      />
    </div>
  </div>
</template>

<script>

/**
 * A framework for creating a predictable and harmonious spacing system. These
 * tokens are used for padding, margins, and position together with
 * [spacing utilities](https://github.com/viljamis/vue-design-system/wiki/spacing).
 * To edit spacing, see
 * [/src/tokens/spacing.yml](https://github.com/viljamis/vue-design-system/blob/master/src/tokens/spacing.yml).
 */
export default {
  name: 'Spacing',
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
