<template>
  <Layout>
    <ul
      v-if="componentExamplesItems.length"
      slot="sidebar-bottom"
      class="sidebar-links"
    >
      <li
        v-for="(item, i) in componentExamplesItems"
        :key="i"
      >
        <router-link
          :to="item.to"
          class="sidebar-link"
        >
          {{ item.title }}
        </router-link>
      </li>
    </ul>

    <div
      slot="page-top"
      class="theme-default-content"
    >
      <h2>
        {{ componentDefinition.name }}

        <Badge
          v-if="statusBadgeText"
          :text="statusBadgeText"
          :type="statusBadgeType"
        />

        <Badge
          v-if="releaseBadgeText"
          :text="releaseBadgeText"
        />
      </h2>

      <p v-if="componentDocumentation.description">
        {{ componentDocumentation.description }}
      </p>

      <pre><code>{{ JSON.stringify(componentDefinition, undefined, 2) }}</code></pre>
      <pre><code>{{ JSON.stringify(componentDocumentation, undefined, 2) }}</code></pre>
    </div>
  </Layout>
</template>

<script>
const _ = require('lodash')
const componentUtils = require('../componentUtils')

export default {
  name: 'ComponentDocumentation',
  props: {
    componentPath: {
      type: String,
      required: true
    },

    componentDefinition: {
      type: Object,
      required: true
    },

    componentDocumentation: {
      type: Object,
      required: true
    },

    componentExamples: {
      type: Array,
      required: true
    }
  },
  computed: {
    $page () {
      return componentUtils.getVuepressPageSettingsForComponent({
        path: this.componentPath,
        name: this.componentDefinition.displayName
      })
    },

    isDeprecated () {
      return this.componentDefinition.status === 'deprecated'
    },

    statusBadgeText () {
      switch (this.componentDefinition.status) {
        case 'ready':
          return 'Ready'
        case 'missing-tests':
          return 'Missing tests'
        case 'deprecated':
          return 'Deprecated'
        default:
          throw new Error(`Unknown component status for component ${this.componentDefinition.name}: ${this.componentDefinition.status}`)
      }
    },

    statusBadgeType () {
      switch (this.componentDefinition.status) {
        case 'ready':
          return 'tip'
        case 'missing-tests':
          return 'warn'
        case 'deprecated':
          return 'error'
        default:
          throw new Error(`Unknown component status for component ${this.componentDefinition.name}: ${this.componentDefinition.status}`)
      }
    },

    releaseBadgeText () {
      if (this.isDeprecated) return null

      return this.componentDefinition.release
        ? `${this.componentDefinition.release}+`
        : 'Unreleased'
    },

    componentExamplesItems () {
      const { componentExamplesByPath } = this.$site.themeConfig
      return _.map(this.componentExamples, function (example) {
        const examplePageInfo = componentExamplesByPath[example.originalRegularPath]

        return {
          title: examplePageInfo.title,
          to: example.originalRegularPath
        }
      })
    }
  }
}
</script>

