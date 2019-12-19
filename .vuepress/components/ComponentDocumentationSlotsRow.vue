<template>
  <tr>
    <td :id="`event-${name}`"><code>{{ name }}</code></td>
    <td>
      <geo-markdown-content
        :markdown="markdownDescription"
        :features="markdownDescriptionFeatures"
      />
    </td>
  </tr>
</template>

<script>
import { AllMarkdownParserFeatures } from '@/elements/GeoMarkdownContent/GeoMarkdownParser'

export default {
  name: 'ComponentDocumentationSlotsRow',
  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  computed: {
    markdownDescription () {
      return unescapeJSONString(this.description)
    },

    markdownDescriptionFeatures () {
      return AllMarkdownParserFeatures
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
