<template>
  <tr>
    <td>
      <router-link :to="documentationPageURL">
        {{ component.name }}
      </router-link>
    </td>
    <td class="u-text-align--right">
        <code v-if="!isDeprecated">{{ component.release }}</code>
    </td>
    <td>
      <font-awesome-icon
        :icon="statusIcon"
        :style="statusIconStyle"
        fixed-width
        aria-hidden
      />

      <Badge
        v-if="statusBadgeText"
        :text="statusBadgeText"
        :type="statusBadgeType"
      />
    </td>
  </tr>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'DesignTokensListAllElementsItem',
  props: {
    componentPath: {
      type: String,
      required: true
    },

    component: {
      type: Object,
      required: true
    }
  },
  computed: {
    documentationPageURL () {
      return `/components/${this.componentPath}.html`
    },

    isDeprecated () {
      return this.component.status === 'deprecated'
    },

    statusBadgeText () {
      const badgeTextByStatus = {
        ready: 'Ready',
        'missing-tests': 'Missing tests',
        'deprecated': 'Deprecated'
      }

      if (this.component.status in badgeTextByStatus) return badgeTextByStatus[this.component.status]

      throw new Error(`Unknown component status for component ${this.component.name}: ${this.component.status}`)
    },

    statusBadgeType () {
      const badgeTypeByStatus = {
        ready: 'tip',
        'missing-tests': 'warn',
        'deprecated': 'error'
      }

      if (this.component.status in badgeTypeByStatus) return badgeTypeByStatus[this.component.status]

      throw new Error(`Unknown component status for component ${this.component.name}: ${this.component.status}`)
    },

    statusIcon () {
      const iconByStatus = {
        ready: ['fas', 'check-circle'],
        'missing-tests': ['fas', 'exclamation-triangle'],
        'deprecated': ['fas', 'times-circle']
      }

      if (this.component.status in iconByStatus) return iconByStatus[this.component.status]

      throw new Error(`Unknown component status for component ${this.component.name}: ${this.component.status}`)
    },

    statusIconStyle () {
      const colorByStatus = {
        ready: '#42b983',
        'missing-tests': '#e7c000',
        deprecated: '#da5961'
      }

      if (this.component.status in colorByStatus) {
        return {
          color: colorByStatus[this.component.status]
        }
      }

      throw new Error(`Unknown component status for component ${this.component.name}: ${this.component.status}`)
    }
  }
}
</script>