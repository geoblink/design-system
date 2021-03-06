<template>
  <tbody>
    <tr
      :class="{
        'c-component-documentation__even-row': !odd,
        'c-component-documentation__odd-row': odd
      }"
    >
      <td>
        <code>
          <strong
            v-if="required"
            title="Required"
          >
            {{ name }}
          </strong>
          <em
            v-else
            title="Optional"
          >
            {{ name }}
          </em>
        </code>
      </td>
      <td>
        <code title="Property value type">{{ type }}</code>
      </td>
      <td>
        <template v-if="defaultValue">
          <pre
            v-if="isDefaultValueAFunction"
            title="Default value is the result of running this function"
          ><code>{{ defaultValue }}</code></pre>
          <code v-else>
            {{ defaultValue }}
          </code>
        </template>
      </td>
      <td>
        <a
          v-if="isDescriptionVisible"
          class="u-cursor--pointer"
          @click="hideDescription()"
        >
          Hide description
        </a>
        <a
          v-else
          class="u-cursor--pointer"
          @click="showDescription()"
        >
          Show description
        </a>
      </td>
    </tr>
    <tr
      v-if="isDescriptionVisible"
      :class="{
        'c-component-documentation__even-row': !odd,
        'c-component-documentation__odd-row': odd
      }"
    >
      <td colspan="4">
        <geo-markdown-content
          :markdown="markdownDescription"
          :features="markdownDescriptionFeatures"
        />
      </td>
    </tr>
  </tbody>
</template>

<script>
import { AllMarkdownParserFeatures } from '@/elements/GeoMarkdownContent/GeoMarkdownParser'

export default {
  name: 'ComponentDocumentationPropertiesRow',
  props: {
    name: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    required: {
      type: Boolean,
      required: true
    },

    type: {
      type: String,
      required: true
    },

    defaultValue: {
      type: String,
      required: false
    },

    isDefaultValueAFunction: {
      type: Boolean,
      default: false
    },

    odd: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isDescriptionVisible: false
    }
  },
  computed: {
    markdownDescription () {
      return unescapeJSONString(this.description)
    },

    markdownDescriptionFeatures () {
      return AllMarkdownParserFeatures
    }
  },
  methods: {
    showDescription () {
      this.isDescriptionVisible = true
    },

    hideDescription () {
      this.isDescriptionVisible = false
    }
  }
}

function unescapeJSONString (s) {
  return s
    .replace(/&#39;/gi, `'`)
    .replace(/&#96;/gi, '`')
    .replace(/&#62;/gi, '>')
    .replace(/\\n/gi, '\\\\n')
}
</script>
