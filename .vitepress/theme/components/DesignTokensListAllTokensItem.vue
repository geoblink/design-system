<template>
  <tr class="c-design-tokens-list-all-tokens-token-item-row">
    <td v-if="token.name">
      <code>{{ tokenName }}</code>
    </td>
    <td v-else>
      N/A
    </td>

    <td v-if="tokenValue">
      <div class="c-design-tokens-list-all-tokens-token-item-row__value">
        <div
          v-if="token.type === 'color'"
          :style="{ backgroundColor: tokenValue }"
          class="c-design-tokens-list-all-tokens-token-item-row__example c-design-tokens-list-all-tokens-token-item-row__example--color"
        />
        <div
          v-else-if="tokenCategory === 'border-radius'"
          :style="{ borderRadius: tokenValue }"
          class="c-design-tokens-list-all-tokens-token-item-row__example"
        />
        <div
          v-else-if="tokenCategory === 'box-shadow'"
          :style="{ boxShadow: tokenValue }"
          class="c-design-tokens-list-all-tokens-token-item-row__example"
        />

        <code>{{ tokenValue }}</code>
      </div>
    </td>
    <td v-else>
      N/A
    </td>

    <td v-if="tokenCategory">
      {{ tokenCategory }}
    </td>
    <td v-else>
      N/A
    </td>
  </tr>
</template>

<script>
export default {
  name: 'DesignTokensListAllTokensItem',
  props: {
    token: {
      type: Object,
      required: true
    }
  },

  computed: {
    tokenCategory () {
      return this.token.category
    },

    tokenValue () {
      return this.token.value
    },

    tokenName () {
      return `\$${this.token.name.replace(/_/g, '-')}`
    }
  }
}
</script>