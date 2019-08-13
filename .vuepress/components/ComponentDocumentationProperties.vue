<template>
  <div>
    <h2 id="properties">
      <a
        href="#properties"
        class="header-anchor"
        aria-hidden
      >
        #
      </a>
      Properties
    </h2>

    <table>
      <thead>
        <tr>
          <th>Prop name</th>
          <th>Type</th>
          <th>Default value</th>
          <th>Description</th>
        </tr>
      </thead>

      <component-documentation-properties-row
        v-for="(prop, index) in componentProperties"
        :key="prop.name"
        :odd="index % 2 === 1"
        :name="prop.name"
        :description="prop.description"
        :type="prop.type"
        :required="prop.required"
        :default-value="prop.defaultValue"
        :is-default-value-a-function="prop.isDefaultValueAFunction"
      />
    </table>
  </div>
</template>

<script>
import ComponentDocumentationPropertiesRow from './ComponentDocumentationPropertiesRow.vue'

import { MarkdownParserFeatures } from '../../src/elements/GeoMarkdownContent/GeoMarkdownParser'

export default {
  name: 'ComponentDocumentationProperties',
  components: {
    ComponentDocumentationPropertiesRow
  },
  props: {
    componentProperties: {
      type: Array,
      required: true
    }
  },
  computed: {
    markdownDescriptionFeatures () {
      return {
        [MarkdownParserFeatures.smartquotes]: true,
        [MarkdownParserFeatures.replacements]: true,
        [MarkdownParserFeatures.emphasis]: true,
        [MarkdownParserFeatures.strikethrough]: true,
        [MarkdownParserFeatures.linkify]: true,
        [MarkdownParserFeatures.link]: true,
        [MarkdownParserFeatures.list]: true,
        [MarkdownParserFeatures.lheading]: true,
        [MarkdownParserFeatures.code]: true,
        [MarkdownParserFeatures.fence]: true,
        [MarkdownParserFeatures.blockquote]: true,
        [MarkdownParserFeatures.table]: true,
        [MarkdownParserFeatures.backticks]: true,
      }
    }
  }
}
</script>
