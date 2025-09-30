<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <component-documentation-constants-row
        v-for="constantMetadata in componentConstants"
        :key="constantMetadata.name"
        :name="constantMetadata.name"
        :definition="constantMetadata.definition"
      />
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'ComponentDocumentationConstants',
  props: {
    componentConstants: {
      type: Array,
      required: true
    }
  }
}
</script>
