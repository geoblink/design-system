<template>
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
</template>

<script>
import ComponentDocumentationPropertiesRow from './ComponentDocumentationPropertiesRow.vue'

import { MarkdownParserFeatures } from '@/elements/GeoMarkdownContent/GeoMarkdownParser'

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
  }
}
</script>
