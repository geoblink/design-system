<template>
  <div>
    <h3
      v-if="title"
      :id="`example-${example.key}`"
    >
      <a
        :href="`#example-${example.key}`"
        class="header-anchor"
        aria-hidden
      >
        #
      </a>
      {{ title }}
    </h3>

    <Content :page-key="example.key" />
  </div>
</template>

<script>
export default {
  name: 'ComponentDocumentationSingleExample',
  props: {
    example: {
      type: Object,
      required: true
    },

    showTitle: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    title () {
      if (!this.showTitle) return false
      return this.example.title
    }
  }
}
</script>
