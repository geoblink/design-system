<template>
  <tr>
    <td :id="`constant-${name}`"><code>{{ name }}</code></td>
    <td>
      <a
        v-if="isDefinitionVisible"
        class="u-cursor--pointer"
        @click="hideDefinition()"
      >
        Hide definition
      </a>
      <a
        v-else
        class="u-cursor--pointer"
        @click="showDefinition()"
      >
        Show definition
      </a>

      <pre v-if="isDefinitionVisible"><code>{{ definition }}</code></pre>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'ComponentDocumentationConstantsRow',
  props: {
    name: {
      type: String,
      required: true
    },

    definition: {
      type: [Object, String, Function],
      required: true
    }
  },
  data () {
    return {
      isDefinitionVisible: false
    }
  },
  methods: {
    hideDefinition () {
      this.isDefinitionVisible = false
    },

    showDefinition () {
      this.isDefinitionVisible = true
    }
  }
}
</script>
