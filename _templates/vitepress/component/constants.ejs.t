---
to: .vitepress/theme/components/constants/<%= h.withoutExtension(path) %>Constants.vue
---

<template>
  <component-documentation-constants
    v-if="constants.length"
    :component-constants="constants"
  />
  <geo-markdown-content
    v-else
    markdown="This component has no exported constants."
    :features="features"
  />
</template>

<script setup>
import { computed } from 'vue'
import _ from 'lodash'
import { AllMarkdownParserFeatures } from '@/elements/GeoMarkdownContent/GeoMarkdownParser'
import <%= h.basename(h.withoutExtension(path)) %> from '@/elements/<%= (path) %>'

const constants = computed(() => {
  return _.map(<%= h.basename(h.withoutExtension(path)) %>.constants, function (definition, name) {
    return { name, definition }
  })
})

const features = computed(() => AllMarkdownParserFeatures)
</script>