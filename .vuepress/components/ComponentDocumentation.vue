<template>
  <Layout class="c-component-documentation">
    <div
      slot="page-top"
      class="theme-default-content"
    >
      <h1>
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
      </h1>

      <geo-markdown-content
        v-if="componentDocumentation.description"
        :markdown="componentDocumentation.description"
        :features="markdownDescriptionFeatures"
      />

      <component-documentation-properties
        v-if="componentProperties.length"
        :component-properties="componentProperties"
      />

      <component-documentation-events
        v-if="componentEvents.length"
        :component-events="componentEvents"
      />

      <component-documentation-slots
        v-if="componentSlots.length"
        :component-slots="componentSlots"
      />

      <component-documentation-constants
        v-if="componentConstants.length"
        :component-constants="componentConstants"
      />

      <component-documentation-examples-collection
        v-if="componentExamples.length"
        :examples="componentExamples"
      />
    </div>
  </Layout>
</template>

<script>
const _ = require('lodash')
const componentUtils = require('../componentUtils')

import { AllMarkdownParserFeatures } from '../../src/elements/GeoMarkdownContent/GeoMarkdownParser'

import ComponentDocumentationConstants from './ComponentDocumentationConstants.vue'
import ComponentDocumentationProperties from './ComponentDocumentationProperties.vue'
import ComponentDocumentationEvents from './ComponentDocumentationEvents.vue'
import ComponentDocumentationSlots from './ComponentDocumentationSlots.vue'

export default {
  name: 'ComponentDocumentation',
  components: {
    ComponentDocumentationConstants,
    ComponentDocumentationProperties,
    ComponentDocumentationEvents,
    ComponentDocumentationSlots
  },
  props: {
    overridenPageSettings: {
      type: Object,
      required: true
    },

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
      return this.overridenPageSettings
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

    componentConstants () {
      return componentUtils.getComponentConstants(this.componentDefinition)
    },

    componentProperties () {
      return componentUtils.getComponentProperties(this.componentDocumentation)
    },

    componentEvents () {
      return componentUtils.getComponentEvents(this.componentDocumentation)
    },

    componentSlots () {
      return componentUtils.getComponentSlots(this.componentDocumentation)
    },

    markdownDescriptionFeatures () {
      return AllMarkdownParserFeatures
    }
  }
}
</script>
