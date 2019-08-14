<template>
  <div class="all-tokens">
    <table>
      <thead>
        <tr>
          <th>Token Name</th>
          <th>Value</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(token, index) in orderedTokens"
          :key="index"
          class="token-item-row"
        >
          <td v-if="token.name">
            <code class="token-item-row__name">
              ${{ token.name.replace(/_/g, "-") }}
            </code>
          </td>
          <td v-else>
            N/A
          </td>
          <td v-if="token.value">
            <div class="token-item-row__value">
              <div
                v-if="token.type === 'color'"
                :style="{ backgroundColor: token.value }"
                class="token-item-row__example token-item-row__example--color"
              />
              <div
                v-if="token.category === 'border-radius'"
                :style="{ borderRadius: token.value }"
                class="token-item-row__example token-item-row__example--border-radius"
              />
              <div
                v-if="token.category === 'box-shadow'"
                :style="{ boxShadow: token.value }"
                class="token-item-row__example token-item-row__example--box-shadow"
              />
              <code>
                {{ token.value }}
              </code>
            </div>
          </td>
          <td v-else>
            N/A
          </td>
          <td v-if="token.category">
            {{ token.category }}
          </td>
          <td v-else>
            N/A
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'AllTokens',
  props: {
    tokens: {
      type: Object,
      required: true
    }
  },
  computed: {
    orderedTokens () {
      return _.orderBy(this.tokens, ['category', 'name'], ['asc', 'asc'])
    }
  }
}
</script>