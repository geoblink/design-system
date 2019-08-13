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
        </tr>
      </thead>
      <tbody>
        <template v-for="(prop, index) in componentProperties">
          <tr
            :key="`metadata-${prop.name}`"
            :class="{
              'c-component-documentation__even-row': index % 2 == 0,
              'c-component-documentation__odd-row': index % 2 == 1
            }"
          >
            <td>
              <code>
                <strong
                  v-if="prop.required"
                  title="Required"
                >
                  {{ prop.name }}
                </strong>
                <em
                  v-else
                  title="Optional"
                >
                  {{ prop.name }}
                </em>
              </code>
            </td>
            <td>
              <code title="Property value type">{{ prop.type }}</code>
            </td>
            <td>
              <template v-if="prop.defaultValue">
                <pre
                  v-if="prop.isDefaultValueAFunction"
                  title="Default value is the result of running this function"
                ><code>{{ prop.defaultValue }}</code></pre>
                <code
                  v-else
                  title="Default value"
                >
                  {{ prop.defaultValue }}
                </code>
              </template>
            </td>
          </tr>
          <tr
            :key="`description-${prop.name}`"
            :class="{
              'c-component-documentation__even-row': index % 2 == 0,
              'c-component-documentation__odd-row': index % 2 == 1
            }"
          >
            <td colspan="3">
              <geo-markdown-content
                :markdown="prop.description"
                :features="markdownDescriptionFeatures"
              />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import { MarkdownParserFeatures } from '../../src/elements/GeoMarkdownContent/GeoMarkdownParser'

export default {
  name: 'ComponentDocumentationProperties',
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
