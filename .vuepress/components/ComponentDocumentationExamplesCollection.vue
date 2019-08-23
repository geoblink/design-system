<template>
  <div>
    <h2 id="examples">
      <a
        href="#examples"
        class="header-anchor"
        aria-hidden
      >
        #
      </a>
      Examples
    </h2>

    <component-documentation-single-example
      v-for="singleExample of examples"
      :key="`component-documentation-example-${singleExample.key}`"
      :example="singleExample"
      :show-title="examples.length > 1"
    />
  </div>
</template>

<script>
export default {
  name: 'ComponentDocumentationExamplesCollection',
  props: {
    examples: {
      type: Array,
      required: true
    }
  }
}
</script>
