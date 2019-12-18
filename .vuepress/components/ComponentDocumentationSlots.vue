<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <component-documentation-slots-row
        v-for="slotMetadata in componentSlots"
        :key="slotMetadata.name"
        :name="slotMetadata.name"
        :description="slotMetadata.description"
      />
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'ComponentDocumentationSlots',
  props: {
    componentSlots: {
      type: Array,
      required: true
    }
  }
}
</script>
