<template>
  <tr
    class="token-item-row"
  >
    <td v-if="token.name">
      <code class="token-item-row__name">
        {{ tokenName }}
      </code>
    </td>
    <td v-else>
      N/A
    </td>

    <td v-if="tokenValue">
      <div class="token-item-row__value">
        <div
          v-if="token.type === 'color'"
          :style="{ backgroundColor: tokenValue }"
          class="token-item-row__example token-item-row__example--color"
        />
        <div
          v-if="tokenCategory === 'border-radius'"
          :style="{ borderRadius: tokenValue }"
          class="token-item-row__example token-item-row__example--border-radius"
        />
        <div
          v-if="tokenCategory === 'box-shadow'"
          :style="{ boxShadow: tokenValue }"
          class="token-item-row__example token-item-row__example--box-shadow"
        />
        <code>
          {{ tokenValue }}
        </code>
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
      return `$${this.token.name.replace(/_/g, '-')}`
    }
  }
}
</script>