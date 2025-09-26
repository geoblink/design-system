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
        <code title="Property value type">{{ markdownType }}</code>
      </td>
      <td>
        <template v-if="defaultValue">
          <pre
            v-if="isDefaultValueAFunction"
            title="Default value is the result of running this function"
          ><code>{{ markdownDefaultValue }}</code></pre>
          <code v-else>
            {{ markdownDefaultValue }}
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
import _ from 'lodash'
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
    markdownType () {
      return unescapeJSONString(this.type)
    },

    markdownDefaultValue () {
      return unescapeJSONString(this.defaultValue)
    },

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
  if (_.isNil(s)) return ''

  return s
    .replace(/&#39;/gi, `'`)
    .replace(/&#96;/gi, '`')
    .replace(/&#62;/gi, '>')
    .replace(/\\n/gi, '\\\\n')
}
</script>
